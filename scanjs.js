// Scanjs - QR Code Scanner API
// Author: Frost Dominus
// Project: Scanjs

const ScanJS = (() => {
    let dragDropEnabled = false;

    const load = {
        SCANJS: () => {
            console.log("[ScanJS] Main script loaded successfully.");
        }
    };

    const enable = {
        "drag.n.drop": (value) => {
            dragDropEnabled = !!value;
            if (dragDropEnabled) {
                console.log("[ScanJS] Drag and drop enabled.");
            }
        }
    };

    const start = {
        scan: (type, fileName) => {
            if (!dragDropEnabled) {
                console.error("[ScanJS] Drag and drop not enabled. Enable first with enable.drag.n.drop=true");
                return;
            }

            if (type === "qr.code") {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = async (ev) => {
                        const imgData = ev.target.result;

                        // Using QR code API
                        try {
                            const res = await fetch(`https://api.qrserver.com/v1/read-qr-code/`, {
                                method: "POST",
                                body: createFormData(imgData, file.name)
                            });
                            const json = await res.json();
                            const qrText = json[0]?.symbol[0]?.data;
                            if (qrText) {
                                navigator.clipboard.writeText(qrText);
                                console.log(`[ScanJS] QR code copied to clipboard: ${qrText}`);
                            } else {
                                console.error("[ScanJS] QR code not found in image.");
                            }
                        } catch (err) {
                            console.error("[ScanJS] Error scanning QR code:", err);
                        }
                    };
                    reader.readAsDataURL(file);
                };
                input.click();
            }
        }
    };

    const finish = {
        scan: (type) => {
            if (type === "qr.code") {
                console.log("[ScanJS] QR code scan finished.");
            }
        }
    };

    const debug = {
        fetch: (loadMethod) => {
            if (!loadMethod) console.error("[ScanJS] No load method provided.");
            else console.log(`[ScanJS] Debug fetch: ${loadMethod}`);
        }
    };

    const createFormData = (imgData, fileName) => {
        const blob = dataURLtoBlob(imgData);
        const formData = new FormData();
        formData.append("file", blob, fileName);
        return formData;
    };

    const dataURLtoBlob = (dataurl) => {
        const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]); let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while(n--) u8arr[n] = bstr.charCodeAt(n);
        return new Blob([u8arr], {type:mime});
    };

    return { load, enable, start, finish, debug };
})();
