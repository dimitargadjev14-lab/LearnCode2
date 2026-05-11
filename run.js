(() => {
  const TRACK_KEY = "codelearn_selected_track";
  const RUN_PAYLOAD_KEY = "codelearn_run_payload";
  const frame = document.getElementById("result-frame");

  if (!(frame instanceof HTMLIFrameElement)) {
    return;
  }

  const track = localStorage.getItem(TRACK_KEY) || "html";
  let runPayload = null;
  try {
    runPayload = JSON.parse(localStorage.getItem(RUN_PAYLOAD_KEY) || "null");
  } catch (_error) {
    runPayload = null;
  }
  const codeStorageKey = `codelearn_${track}_code`;
  const code = runPayload && typeof runPayload.code === "string" ? runPayload.code : (localStorage.getItem(codeStorageKey) || "");
  const html = runPayload && typeof runPayload.html === "string" ? runPayload.html : "";
  const css = runPayload && typeof runPayload.css === "string" ? runPayload.css : "";
  const js = runPayload && typeof runPayload.js === "string" ? runPayload.js : "";
  const fallback = "<!DOCTYPE html><html><body><h2>No code yet</h2><p>Go back and write code, then press Run.</p></body></html>";

  if (track === "css") {
    const cssCode = css || code;
    frame.srcdoc = cssCode.trim().length > 0
      ? `<!DOCTYPE html><html><head><style>${cssCode}</style></head><body>${html || "<h1>Preview Heading</h1><button>Preview Button</button><div class='card'>Preview Card</div>"}<script>${js}<\/script></body></html>`
      : fallback;
    return;
  }

  if (track === "js") {
    const jsCode = js || code;
    frame.srcdoc = jsCode.trim().length > 0
      ? `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html || "<h2 id='title'>JS Preview</h2><button id='btn'>Click</button><div id='app'></div>"}<script>${jsCode}<\/script></body></html>`
      : fallback;
    return;
  }

  if (track === "sandbox") {
    const sandboxHtml = runPayload && typeof runPayload.html === "string" ? runPayload.html : "";
    const sandboxCss = runPayload && typeof runPayload.css === "string" ? runPayload.css : "";
    const sandboxJs = runPayload && typeof runPayload.js === "string" ? runPayload.js : "";
    frame.srcdoc = `<!DOCTYPE html><html><head><style>${sandboxCss}</style></head><body>${sandboxHtml}<script>${sandboxJs}<\/script></body></html>`;
    return;
  }

  frame.srcdoc = code.trim().length > 0
    ? `<!DOCTYPE html><html><head><style>${css}</style></head><body>${code}<script>${js}<\/script></body></html>`
    : fallback;
})();
