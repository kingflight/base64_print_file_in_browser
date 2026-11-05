// Open about:blank and run this entire snippet in Chrome's DevTools Console.
(() => {
  document.body.innerHTML = `
    <h1>File to Base64</h1>
    <p>Select a file, copy the Base64 text, and save it in a plain-text file.
       Conversion happens locally; no files are uploaded.</p>
    <label>File: <input type="file"></label>
    <button type="button" disabled>Copy Base64</button>
    <p role="status"></p>
    <label for="base64-output">Base64 text</label>
    <textarea id="base64-output" readonly spellcheck="false"
      style="display:block;width:100%;height:65vh;box-sizing:border-box"></textarea>
  `;

  const input = document.querySelector('input');
  const button = document.querySelector('button');
  const output = document.querySelector('textarea');
  const status = document.querySelector('[role="status"]');

  input.onchange = () => {
    const file = input.files[0];
    output.value = '';
    button.disabled = true;
    if (!file) return;

    input.disabled = true;
    status.textContent = `Reading ${file.name}...`;
    const reader = new FileReader();
    reader.onload = () => {
      // Remove the data URL prefix, leaving only the Base64 payload.
      output.value = reader.result.slice(reader.result.indexOf(',') + 1);
      button.disabled = false;
      status.textContent = `${file.name}: ready to copy (${file.size} bytes)`;
    };
    reader.onerror = () => {
      status.textContent = 'Could not read the file. Please select it again.';
    };
    reader.onloadend = () => { input.disabled = false; };
    reader.readAsDataURL(file);
  };

  button.onclick = async () => {
    output.focus();
    output.select();
    try {
      await navigator.clipboard.writeText(output.value);
      status.textContent = 'Copied';
    } catch {
      status.textContent = 'Press Ctrl+C / Command+C to copy the selected text.';
    }
  };
})();
