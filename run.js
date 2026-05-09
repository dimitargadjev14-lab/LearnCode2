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
  const fallback = "<!DOCTYPE html><html><body><h2>No code yet</h2><p>Go back and write code, then press Run.</p></body></html>";

  if (track === "css") {
    frame.srcdoc = code.trim().length > 0
      ? `<!DOCTYPE html><html><head><style>${code}</style></head><body>${html || "<h1>Preview Heading</h1><button>Preview Button</button><div class='card'>Preview Card</div>"}</body></html>`
      : fallback;
    return;
  }

  if (track === "js") {
    frame.srcdoc = code.trim().length > 0
      ? `<!DOCTYPE html><html><body>${html || "<h2 id='title'>JS Preview</h2><button id='btn'>Click</button><div id='app'></div>"}<script>${code}<\/script></body></html>`
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

  frame.srcdoc = code.trim().length > 0 ? code : fallback;
})();
