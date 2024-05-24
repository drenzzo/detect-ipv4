const inputIP = document.querySelector("#ip-input");
const btnEval = document.querySelector("#evaluate-button");
const errorMsg = document.querySelector("#error-message");
const output = document.querySelector("#output");

btnEval.addEventListener("click", function () {

    let result = {};
    let pattern = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\/([0-9]|[1-2][0-9]|3[0-2]))$|^((1|0){8}\.){3}(1|0){8}(\/([0-9]|[1-2][0-9]|3[0-2]))$/;

    if (!pattern.test(inputIP.value)) {

        errorMsg.textContent = "Por favor, ingrese una dirección IPV4 válida incluyendo máscara de subred.";

    } else {

        errorMsg.textContent = "";
        let ipAndMask = inputIP.value.split("/");
        let ipParts = ipAndMask[0].split(".");
        let mask = parseInt(ipAndMask[1]);
        let ipClass = "";

        if (ipParts[0] <= 127) {
            ipClass = "A";
        } else if (ipParts[0] <= 191) {
            ipClass = "B";
        } else if (ipParts[0] <= 223) {
            ipClass = "C";
        } else if (ipParts[0] <= 239) {
            ipClass = "D";
        } else {
            ipClass = "E";
        }

        let networkAddress = ipParts.map((part, index) => {
            return index < Math.floor(mask / 8) ? part : "0"
        }).join(".");

        let broadcastAddress = ipParts.map((part, index) => {
            return index < Math.floor(mask / 8) ? part : "255"
        }).join(".");

        let numberOfHosts = Math.pow(2, 32 - mask) - 2;

        result = {
            "broadcast_address": broadcastAddress,
            "network_address": networkAddress,
            "number_of_hosts": numberOfHosts,
            "class": ipClass
        };
    }

    output.textContent = JSON.stringify(result, undefined, 4);

});
