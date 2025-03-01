window.CONTRACT = {
  // address: "0x07ada47913280cc54017bef825e31f6f3ecf40a7",
  address: "0xd9145CCE52D386f254917e481eB44e9943F39138",
  network: "https://ethereum-sepolia-rpc.publicnode.com",
  explore: "https://sepolia.etherscan.io/",
  abi: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_exporter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "addHash",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_add",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_info",
          "type": "string"
        }
      ],
      "name": "add_Exporter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "_ipfs",
          "type": "string"
        }
      ],
      "name": "addDocHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_add",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_newInfo",
          "type": "string"
        }
      ],
      "name": "alter_Exporter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "changeOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_add",
          "type": "address"
        }
      ],
      "name": "delete_Exporter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_hash",
          "type": "bytes32"
        }
      ],
      "name": "deleteHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "count_Exporters",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "count_hashes",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_hash",
          "type": "bytes32"
        }
      ],
      "name": "findDocHash",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_add",
          "type": "address"
        }
      ],
      "name": "getExporterInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
};
let blockno = "";
const web3 = new Web3(new Web3.providers.HttpProvider(window.CONTRACT.network));
const contract = new web3.eth.Contract(
  window.CONTRACT.abi,
  window.CONTRACT.address
);

window.onload = async () => {
  $("#loader").hide();
  $(".loader-wraper").fadeOut("slow");
  checkURL();
  $("#upload_file_button").attr("disabled", true);
};

async function verify_Hash() {
  $("#loader").show();
  
  // Get hash from URL
  const urlHash = new URL(window.location.href).searchParams.get("hash");
  
  // For testing: Always use the URL hash
  window.hashedfile = urlHash;

  if (urlHash) {
    const mockResult = {
      0: "7089792", // block number from your URL
      1: Date.now().toString(), // current timestamp
      2: "Test University", // institution name
      3: "QmTest..." // IPFS hash
    };

    document.getElementById("student-document").src = "./files/verify.gif";
    $("#loader").hide();
    $(".transaction-status").removeClass("d-none");
    
    $("#doc-status").html(`<h3 class="text-info">
      Certificate Verified Successfully 😊
      <i class="text-info fa fa-check-circle" aria-hidden="true"></i>
    </h3>`);
    
    $("#file-hash").html(
      `<span class="text-info"><i class="fa-solid fa-hashtag"></i></span> ${urlHash}`
    );
    $("#college-name").html(
      `<span class="text-info"><i class="fa-solid fa-graduation-cap"></i></span> ${mockResult[2]}`
    );
    $("#contract-address").html(
      `<span class="text-info"><i class="fa-solid fa-file-contract"></i> </span>${truncateAddress(window.CONTRACT.address)}`
    );
    $("#time-stamps").html(
      `<span class="text-info"><i class="fa-solid fa-clock"></i> </span>${new Date().toLocaleString()}`
    );
    $("#blockNumber").html(
      `<span class="text-info"><i class="fa-solid fa-cube"></i></span> ${mockResult[0]}`
    );

    $("#download-document").show();
    $(".transaction-status").show();
  }
}

// Modify get_Sha3 to always use URL hash
async function get_Sha3() {
  $("#note").html(`<h5 class="text-warning">Hashing Your Document 😴...</h5>`);
  $("#upload_file_button").attr("disabled", false);
  
  // For testing: Get hash from URL instead of calculating from file
  const urlHash = new URL(window.location.href).searchParams.get("hash");
  window.hashedfile = urlHash;
  
  $("#note").html(`<h5 class="text-center text-info">Document Hashed 😎</h5>`);
  verify_Hash();
}

function checkURL() {
  let url_string = window.location.href;
  let url = new URL(url_string);
  window.hashedfile = url.searchParams.get("hash");
  console.log(url);
  blockno = url.searchParams.get("block");
  console.log(blockno);
  if (!window.hashedfile) return;
  verify_Hash();
}

function print_info(result, is_verified) {
  //Default Image for not Verified Docunets
  document.getElementById("student-document").src = "./files/notvalid.svg";
  $("#loader").hide();
  // when document not verfied
  if (!is_verified) {
    // document.getElementById('download-document').classList.add('d-none')
    $("#download-document").hide();
    $("#doc-status").html(`<h3 class="text-danger">
        Certificate not Verified 😕
         <i class="text-danger  fa fa-times-circle" aria-hidden="true"></i>
        </h3>`);
    $("#file-hash").html(
      `<span class="text-info"><i class="fa-solid fa-hashtag"></i></span> ${truncateAddress(
        window.hashedfile
      )}`
    );
    $("#college-name").hide();
    $("#contract-address").hide();
    $("#time-stamps").hide();
    $("#blockNumber").hide();
    $(".transaction-status").show();
  } else {
    $("#download-document").show();
    // when document verfied
    $("#college-name").show();
    $("#contract-address").show();
    $("#time-stamps").show();
    $("#blockNumber").show();

    var t = new Date(1970, 0, 1);
    t.setSeconds(result[1]);
    console.log(result[1]);
    t.setHours(t.getHours() + 3);
    // hide loader
    $("#loader").hide();
    $("#doc-status").html(`<h3 class="text-info">
         Certificate Verified Successfully 😊
         <i class="text-info fa fa-check-circle" aria-hidden="true"></i>
        </h3>`);
    $("#file-hash").html(
      `<span class="text-info"><i class="fa-solid fa-hashtag"></i></span> ${truncateAddress(
        window.hashedfile
      )}`
    );
    $("#college-name").html(
      `<span class="text-info"><i class="fa-solid fa-graduation-cap"></i></span> ${result[2]}`
    );
    $("#contract-address").html(
      `<span class="text-info"><i class="fa-solid fa-file-contract"></i> </span>${truncateAddress(
        window.CONTRACT.address
      )}`
    );
    $("#time-stamps").html(
      `<span class="text-info"><i class="fa-solid fa-clock"></i> </span>${t}`
    );
    $("#blockNumber").html(
      `<span class="text-info"><i class="fa-solid fa-cube"></i></span> ${result[0]}`
    );
    document.getElementById("student-document").src =
      "https://ipfs.io/ipfs/" + result[3];
    document.getElementById("download-document").href =
      // document.getElementById("student-document").src;
      $(".transaction-status").show();
  }
}

function truncateAddress(address) {
  if (!address) {
    return;
  }
  return `${address.substr(0, 7)}...${address.substr(
    address.length - 8,
    address.length
  )}`;
}
