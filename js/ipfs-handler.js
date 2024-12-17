let ipfs;

async function uploadToPinata(file) {
    const apiKey = '3db4f4343bc539e239b9';
    const apiSecret = '9b901b94986547f0aec3cb6a034df81e21eedc84b1d7d79b9746addb7e49288d';
    
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                'pinata_api_key': apiKey,
                'pinata_secret_api_key': apiSecret,
            },
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result.IpfsHash;
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw error;
    }
}

async function handleFileUpload() {
    const fileInput = document.getElementById('doc-file');
    const file = fileInput.files[0];
    if (!file) {
        document.getElementById('note').textContent = 'Please select a file first';
        return;
    }
    await get_Sha3(); // Your existing hash function
}

async function uploadToIPFSAndBlockchain() {
    try {
        const fileInput = document.getElementById('doc-file');
        const file = fileInput.files[0];
        
        if (!file) {
            document.getElementById('note').textContent = 'Please select a file first';
            return;
        }

        // Ensure web3 and contract are initialized
        if (!window.web3 || !window.contract) {
            window.web3 = new Web3(window.ethereum);
            window.contract = new window.web3.eth.Contract(
                window.CONTRACT.abi,
                window.CONTRACT.address
            );
        }

        // Show loader
        $("#loader").removeClass("d-none");
        $("#upload_file_button").slideUp();
        $("#note").html(`<h5 class="text-info">Uploading to IPFS... 🚀</h5>`);
        
        // Upload to Pinata
        const ipfsCid = await uploadToPinata(file);
        
        // Store hash in blockchain
        $("#note").html(`<h5 class="text-info">Storing in blockchain... ⛓️</h5>`);
        
        // Call contract method directly here instead of using sendHash
        const result = await window.contract.methods
            .addDocHash(window.hashedfile, ipfsCid)
            .send({ from: window.userAddress })
            .on("transactionHash", function (hash) {
                $("#note").html(`<h5 class="text-info p-1 text-center">Please wait for transaction to be mined 😴</h5>`);
            })
            .on("receipt", function (receipt) {
                printUploadInfo(receipt);
                generateQRCode();
            });
        
        // Update download link
        const downloadLink = document.getElementById('ipfs-download');
        downloadLink.href = `https://gateway.pinata.cloud/ipfs/${ipfsCid}`;
        downloadLink.style.display = 'inline-block';
        
    } catch (error) {
        console.error('Upload error:', error);
        $("#note").html(`<h5 class="text-danger">Upload failed: ${error.message}</h5>`);
        $("#loader").addClass("d-none");
        $("#upload_file_button").slideDown();
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('doc-file');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
});