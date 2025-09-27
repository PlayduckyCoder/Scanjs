# ScanJS

ScanJS is a lightweight JavaScript library for scanning QR codes from images. It supports drag-and-drop or file selection and copies the QR code data directly to your clipboard.

**Project GitHub:** [https://github.com/PlayduckyCoder/Scanjs](https://github.com/PlayduckyCoder/Scanjs)

## Installation

Include the script directly in your HTML:

```html
<script src="https://raw.githubusercontent.com/PlayduckyCoder/Scanjs/main/scanjs.js"></script>
```
# -------------------- Example Usage --------------------
## ScanJS.load.SCANJS();                     // Load ScanJS
## ScanJS.enable["drag.n.drop"] = true;     // Enable drag and drop
## ScanJS.start.scan('qr.code', 'myQR');    // Scan QR code from image
## ScanJS.finish.scan('qr.code');           // Finish scanning
## ScanJS.debug.fetch(ScanJS.load.SCANJS);  // Debug if needed

# -------------------- Method Summary --------------------
Method                               | Description
------------------------------------ | -----------------------------------------------
load.SCANJS()                        | Loads the main ScanJS script and prepares it for scanning.
enable.drag.n.drop = true            | Enables drag-and-drop support for QR code images.
start.scan('qr.code', 'image-name')  | Starts scanning the QR code from the selected image.
finish.scan('qr.code')               | Ends the scanning session.
debug.fetch(SCANJS)                  | Debug method to check if the script is loaded properly.
