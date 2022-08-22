const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById("url").value;
    const size = document.getElementById("size").value;

    if (url === "") {
        alert("Please enter a URL");
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size);

            setTimeout(() => {
                const saveURL = qr.querySelector("img").src;
                createSaveBtn(saveURL);
            }, 100);
        }, 1000);
    }
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
        colorDark: "#DC0000",
    });
};

const showSpinner = () => {
    document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
    document.getElementById("spinner").style.display = "none";
};

const createSaveBtn = (saveURL) => {
    const link = document.createElement("a");
    link.id = "save-link";
    link.classList = "bg-red-600 hover:bg-red-800 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
    link.href = saveURL;
    link.download = "QR-Code";
    link.innerHTML = "Save Image";
    document.getElementById("generated").appendChild(link);
};

const clearUI = () => {
    qr.innerHTML = "";
    const saveLink = document.getElementById("save-link");
    if (saveLink) saveLink.remove();
};

form.addEventListener("submit", onGenerateSubmit);
