# File to Base64 in the browser

Convert a ZIP or any other file into copyable Base64 text, then decode it to
recover the exact original bytes. No dependencies, build step, or upload service.

## Use as a local page

Download or clone this repository and open `index.html` in Chrome. Keep
`console.js` in the same folder. Select your file and click **Copy Base64**.
If clipboard access is unavailable, the text is selected for you: press
**Ctrl+C** (Linux/Windows) or **Command+C** (macOS).

Paste the result into a plain-text file named `archive.b64`.

## Use from Chrome's Console

1. Open `about:blank` in a new Chrome tab.
2. Open Developer Tools → Console (Ctrl+Shift+J, or Command+Option+J on macOS).
3. Paste and run the entire contents of `console.js`.
4. Select your file and copy the Base64 text as above.

## Recover the original file

On Windows 10 with MinGW/Git Bash, copy the Base64 text from Chrome, then run:

```sh
bash clipboard_to_zip.sh
```

The script reads the Windows clipboard directly through PowerShell, avoiding
slow terminal pasting. It saves to `%USERPROFILE%\Downloads\recovered.zip`
and replaces that file if it already exists. Empty or invalid Base64 input
produces an error before the output file is written.

On Ubuntu/Linux:

```sh
base64 --decode archive.b64 > recovered.zip
```

On macOS:

```sh
base64 -D -i archive.b64 -o recovered.zip
```

Use the appropriate output filename for files other than ZIP archives.
Base64 is an encoding, not encryption. Its text is approximately 33% larger
than the original file. The whole file and encoded text are held in memory,
so this simple tool is intended for files small enough to copy and paste.
