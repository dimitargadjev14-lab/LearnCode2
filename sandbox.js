<<<<<<< HEAD
(() => {
  const TRACK_KEY = "codelearn_selected_track";
  const RUN_PAYLOAD_KEY = "codelearn_run_payload";
  const SANDBOX_KEY = "codelearn_sandbox_code";
  const editor = document.getElementById("sandbox-editor");
  const editorLabel = document.getElementById("sandbox-editor-label");
  const switcher = document.getElementById("sandbox-switcher");
  const runButton = document.getElementById("sandbox-run-btn");
  const resetButton = document.getElementById("sandbox-reset-btn");
  const statusLine = document.getElementById("sandbox-status");
  const contextMenu = document.getElementById("sandbox-context-menu");
  const fileDialog = document.getElementById("sandbox-file-dialog");
  const fileForm = document.getElementById("sandbox-file-form");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogFileName = document.getElementById("dialog-file-name");
  const dialogFileType = document.getElementById("dialog-file-type");
  const dialogExtWrap = document.getElementById("dialog-ext-wrap");
  const dialogSubmitBtn = document.getElementById("dialog-submit-btn");
  const dialogCancelBtn = document.getElementById("dialog-cancel-btn");
  const deleteDialog = document.getElementById("sandbox-delete-dialog");
  const deleteForm = document.getElementById("sandbox-delete-form");
  const deleteDialogText = document.getElementById("delete-dialog-text");
  const deleteCancelBtn = document.getElementById("delete-cancel-btn");
  const deleteAcceptBtn = document.getElementById("delete-accept-btn");

  if (
    !(editor instanceof HTMLTextAreaElement) ||
    !(editorLabel instanceof HTMLElement) ||
    !(switcher instanceof HTMLElement) ||
    !(runButton instanceof HTMLButtonElement) ||
    !(resetButton instanceof HTMLButtonElement) ||
    !(statusLine instanceof HTMLElement) ||
    !(contextMenu instanceof HTMLElement) ||
    !(fileDialog instanceof HTMLDialogElement) ||
    !(fileForm instanceof HTMLFormElement) ||
    !(dialogTitle instanceof HTMLElement) ||
    !(dialogFileName instanceof HTMLInputElement) ||
    !(dialogFileType instanceof HTMLSelectElement) ||
    !(dialogExtWrap instanceof HTMLElement) ||
    !(dialogSubmitBtn instanceof HTMLElement) ||
    !(dialogCancelBtn instanceof HTMLElement) ||
    !(deleteDialog instanceof HTMLDialogElement) ||
    !(deleteForm instanceof HTMLFormElement) ||
    !(deleteDialogText instanceof HTMLElement) ||
    !(deleteCancelBtn instanceof HTMLButtonElement) ||
    !(deleteAcceptBtn instanceof HTMLButtonElement)
  ) {
    return;
  }

  const defaultFiles = [
    { id: "file-html", name: "index", type: "html", content: "<h1>My Sandbox</h1>\n<p>Start building here.</p>" },
    { id: "file-css", name: "styles", type: "css", content: "h1 {\n  color: #25d0ff;\n}\n\np {\n  font-size: 18px;\n}" },
    { id: "file-js", name: "app", type: "js", content: "console.log('Sandbox ready');" }
  ];
  let files = defaultFiles.map((file) => ({ ...file }));
  let activeFileId = files[0].id;
  let menuFileId = null;
  let dialogMode = "new-file";
  let dialogTargetId = null;
  let deleteTargetId = null;

  try {
    const saved = JSON.parse(localStorage.getItem(SANDBOX_KEY) || "null");
    if (saved && Array.isArray(saved.files) && saved.files.length > 0) {
      files = saved.files
        .filter((file) => file && typeof file.id === "string" && typeof file.name === "string" && ["html", "css", "js"].includes(file.type) && typeof file.content === "string")
        .map((file) => ({ id: file.id, name: file.name, type: file.type, content: file.content }));
      if (files.length === 0) {
        files = defaultFiles.map((file) => ({ ...file }));
      }
      activeFileId = files.some((file) => file.id === saved.activeFileId) ? saved.activeFileId : files[0].id;
    }
  } catch (_error) {
    files = defaultFiles.map((file) => ({ ...file }));
    activeFileId = files[0].id;
  }

  const getFileById = (id) => files.find((file) => file.id === id) || null;

  const saveState = () => {
    localStorage.setItem(SANDBOX_KEY, JSON.stringify({ files, activeFileId }));
  };

  const hideContextMenu = () => {
    contextMenu.classList.remove("visible");
    menuFileId = null;
  };

  const renderTabs = () => {
    switcher.innerHTML = files.map((file) => {
      const label = `&#8226; ${file.name}.${file.type}`;
      const activeClass = file.id === activeFileId ? "active" : "";
      return `<button type="button" class="editor-side-btn ${activeClass}" data-file-id="${file.id}">${label}</button>`;
    }).join("");

    switcher.querySelectorAll(".editor-side-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const nextId = button.dataset.fileId;
        if (!nextId) {
          return;
        }
        const active = getFileById(activeFileId);
        if (active) {
          active.content = editor.value;
        }
        activeFileId = nextId;
        applyActiveFile();
        saveState();
      });

      button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        menuFileId = button.dataset.fileId || null;
        if (!menuFileId) {
          return;
        }
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.classList.add("visible");
      });
    });
  };

  const applyActiveFile = () => {
    const active = getFileById(activeFileId);
    if (!active) {
      return;
    }
    editor.value = active.content;
    editorLabel.textContent = `Your ${active.type.toUpperCase()} (${active.name}.${active.type})`;
    renderTabs();
  };

  const openFileDialog = ({ mode, targetFileId = null }) => {
    dialogMode = mode;
    dialogTargetId = targetFileId;
    if (mode === "rename") {
      const target = getFileById(targetFileId);
      if (!target) {
        return;
      }
      dialogTitle.textContent = "Change file name";
      dialogSubmitBtn.textContent = "Save";
      dialogFileName.value = target.name;
      dialogFileType.value = target.type;
      dialogFileType.disabled = true;
      dialogExtWrap.style.opacity = "0.6";
    } else {
      dialogTitle.textContent = "Create new file";
      dialogSubmitBtn.textContent = "Create";
      dialogFileName.value = "";
      dialogFileType.disabled = false;
      dialogFileType.value = "html";
      dialogExtWrap.style.opacity = "1";
    }
    fileDialog.showModal();
    dialogFileName.focus();
  };

  contextMenu.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const action = target.dataset.action;
    const targetFileId = menuFileId;
    hideContextMenu();
    if (action === "rename" && targetFileId) {
      openFileDialog({ mode: "rename", targetFileId });
      return;
    }
    if (action === "new-file") {
      openFileDialog({ mode: "new-file" });
      return;
    }
    if (action === "delete-file" && targetFileId) {
      const targetFile = getFileById(targetFileId);
      if (!targetFile) {
        return;
      }
      if (files.length <= 1) {
        statusLine.textContent = "You must keep at least one file.";
        return;
      }
      deleteTargetId = targetFileId;
      deleteDialogText.textContent = `Delete ${targetFile.name}.${targetFile.type}? This cannot be undone.`;
      deleteDialog.showModal();
    }
  });

  window.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (!contextMenu.contains(event.target)) {
      hideContextMenu();
    }
  });

  dialogCancelBtn.addEventListener("click", () => {
    fileDialog.close();
  });

  deleteCancelBtn.addEventListener("click", () => {
    deleteTargetId = null;
    deleteDialog.close();
  });

  deleteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!deleteTargetId) {
      deleteDialog.close();
      return;
    }

    const target = getFileById(deleteTargetId);
    files = files.filter((file) => file.id !== deleteTargetId);
    if (files.length === 0) {
      files = defaultFiles.map((file) => ({ ...file }));
    }

    if (activeFileId === deleteTargetId) {
      activeFileId = files[0].id;
    }

    deleteTargetId = null;
    deleteDialog.close();
    applyActiveFile();
    saveState();
    if (target) {
      statusLine.textContent = `Deleted ${target.name}.${target.type}`;
    }
  });

  fileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const rawName = dialogFileName.value.trim();
    const cleanName = rawName.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, "-");
    if (!cleanName) {
      statusLine.textContent = "Please enter a valid file name.";
      return;
    }

    const active = getFileById(activeFileId);
    if (active) {
      active.content = editor.value;
    }

    if (dialogMode === "rename" && dialogTargetId) {
      const target = getFileById(dialogTargetId);
      if (target) {
        target.name = cleanName;
        statusLine.textContent = `Renamed to ${target.name}.${target.type}`;
      }
    } else {
      const type = dialogFileType.value;
      if (!["html", "css", "js"].includes(type)) {
        statusLine.textContent = "Select a valid extension.";
        return;
      }
      const newFile = {
        id: `file-${Date.now()}`,
        name: cleanName,
        type,
        content: type === "html" ? "<div>New file</div>" : ""
      };
      files.push(newFile);
      activeFileId = newFile.id;
      statusLine.textContent = `Created ${newFile.name}.${newFile.type}`;
    }

    fileDialog.close();
    applyActiveFile();
    saveState();
  });

  const insertTextAtCursor = (textarea, text, moveCursorBy = 0) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);
    textarea.value = `${before}${text}${after}`;
    const nextPos = start + text.length - moveCursorBy;
    textarea.setSelectionRange(nextPos, nextPos);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const setupAutoClose = (textarea) => {
    const pairMap = { "(": ")", "{": "}", "[": "]", "\"": "\"", "'": "'" };
    const selfClosing = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta"];

    textarea.addEventListener("keydown", (event) => {
      const key = event.key;
      if (pairMap[key]) {
        event.preventDefault();
        insertTextAtCursor(textarea, `${key}${pairMap[key]}`, 1);
        return;
      }
      if (key === ">") {
        const active = getFileById(activeFileId);
        if (!active || active.type !== "html") {
          return;
        }
        const cursor = textarea.selectionStart;
        const before = textarea.value.slice(0, cursor);
        const match = before.match(/<([a-zA-Z][\w-]*)([^<>]*)$/);
        if (!match) return;
        const tag = match[1].toLowerCase();
        const attrs = (match[2] || "").trim();
        if (before.endsWith("</") || attrs.endsWith("/") || selfClosing.includes(tag)) return;
        event.preventDefault();
        insertTextAtCursor(textarea, `></${tag}>`, tag.length + 3);
      }
    });
  };

  editor.addEventListener("input", () => {
    const active = getFileById(activeFileId);
    if (!active) {
      return;
    }
    active.content = editor.value;
    statusLine.textContent = `Editing ${active.name}.${active.type}...`;
    saveState();
  });

  resetButton.addEventListener("click", () => {
    files = defaultFiles.map((file) => ({ ...file }));
    activeFileId = files[0].id;
    applyActiveFile();
    saveState();
    statusLine.textContent = "Sandbox reset to default starter code.";
  });

  runButton.addEventListener("click", () => {
    const active = getFileById(activeFileId);
    if (active) {
      active.content = editor.value;
    }
    const html = files.filter((file) => file.type === "html").map((file) => file.content).join("\n");
    const css = files.filter((file) => file.type === "css").map((file) => file.content).join("\n");
    const js = files.filter((file) => file.type === "js").map((file) => file.content).join("\n");
    saveState();
    localStorage.setItem(TRACK_KEY, "sandbox");
    localStorage.setItem(RUN_PAYLOAD_KEY, JSON.stringify({
      track: "sandbox",
      html,
      css,
      js
    }));
    window.location.href = "run.html";
  });

  setupAutoClose(editor);
  renderTabs();
  applyActiveFile();
})();
=======
(() => {
  const TRACK_KEY = "codelearn_selected_track";
  const RUN_PAYLOAD_KEY = "codelearn_run_payload";
  const SANDBOX_KEY = "codelearn_sandbox_code";
  const editor = document.getElementById("sandbox-editor");
  const editorLabel = document.getElementById("sandbox-editor-label");
  const switcher = document.getElementById("sandbox-switcher");
  const runButton = document.getElementById("sandbox-run-btn");
  const resetButton = document.getElementById("sandbox-reset-btn");
  const statusLine = document.getElementById("sandbox-status");
  const contextMenu = document.getElementById("sandbox-context-menu");
  const fileDialog = document.getElementById("sandbox-file-dialog");
  const fileForm = document.getElementById("sandbox-file-form");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogFileName = document.getElementById("dialog-file-name");
  const dialogFileType = document.getElementById("dialog-file-type");
  const dialogExtWrap = document.getElementById("dialog-ext-wrap");
  const dialogSubmitBtn = document.getElementById("dialog-submit-btn");
  const dialogCancelBtn = document.getElementById("dialog-cancel-btn");
  const deleteDialog = document.getElementById("sandbox-delete-dialog");
  const deleteForm = document.getElementById("sandbox-delete-form");
  const deleteDialogText = document.getElementById("delete-dialog-text");
  const deleteCancelBtn = document.getElementById("delete-cancel-btn");
  const deleteAcceptBtn = document.getElementById("delete-accept-btn");

  if (
    !(editor instanceof HTMLTextAreaElement) ||
    !(editorLabel instanceof HTMLElement) ||
    !(switcher instanceof HTMLElement) ||
    !(runButton instanceof HTMLButtonElement) ||
    !(resetButton instanceof HTMLButtonElement) ||
    !(statusLine instanceof HTMLElement) ||
    !(contextMenu instanceof HTMLElement) ||
    !(fileDialog instanceof HTMLDialogElement) ||
    !(fileForm instanceof HTMLFormElement) ||
    !(dialogTitle instanceof HTMLElement) ||
    !(dialogFileName instanceof HTMLInputElement) ||
    !(dialogFileType instanceof HTMLSelectElement) ||
    !(dialogExtWrap instanceof HTMLElement) ||
    !(dialogSubmitBtn instanceof HTMLElement) ||
    !(dialogCancelBtn instanceof HTMLElement) ||
    !(deleteDialog instanceof HTMLDialogElement) ||
    !(deleteForm instanceof HTMLFormElement) ||
    !(deleteDialogText instanceof HTMLElement) ||
    !(deleteCancelBtn instanceof HTMLButtonElement) ||
    !(deleteAcceptBtn instanceof HTMLButtonElement)
  ) {
    return;
  }

  const defaultFiles = [
    { id: "file-html", name: "index", type: "html", content: "<h1>My Sandbox</h1>\n<p>Start building here.</p>" },
    { id: "file-css", name: "styles", type: "css", content: "h1 {\n  color: #25d0ff;\n}\n\np {\n  font-size: 18px;\n}" },
    { id: "file-js", name: "app", type: "js", content: "console.log('Sandbox ready');" }
  ];
  let files = defaultFiles.map((file) => ({ ...file }));
  let activeFileId = files[0].id;
  let menuFileId = null;
  let dialogMode = "new-file";
  let dialogTargetId = null;
  let deleteTargetId = null;

  try {
    const saved = JSON.parse(localStorage.getItem(SANDBOX_KEY) || "null");
    if (saved && Array.isArray(saved.files) && saved.files.length > 0) {
      files = saved.files
        .filter((file) => file && typeof file.id === "string" && typeof file.name === "string" && ["html", "css", "js"].includes(file.type) && typeof file.content === "string")
        .map((file) => ({ id: file.id, name: file.name, type: file.type, content: file.content }));
      if (files.length === 0) {
        files = defaultFiles.map((file) => ({ ...file }));
      }
      activeFileId = files.some((file) => file.id === saved.activeFileId) ? saved.activeFileId : files[0].id;
    }
  } catch (_error) {
    files = defaultFiles.map((file) => ({ ...file }));
    activeFileId = files[0].id;
  }

  const getFileById = (id) => files.find((file) => file.id === id) || null;

  const saveState = () => {
    localStorage.setItem(SANDBOX_KEY, JSON.stringify({ files, activeFileId }));
  };

  const hideContextMenu = () => {
    contextMenu.classList.remove("visible");
    menuFileId = null;
  };

  const renderTabs = () => {
    switcher.innerHTML = files.map((file) => {
      const label = `&#8226; ${file.name}.${file.type}`;
      const activeClass = file.id === activeFileId ? "active" : "";
      return `<button type="button" class="editor-side-btn ${activeClass}" data-file-id="${file.id}">${label}</button>`;
    }).join("");

    switcher.querySelectorAll(".editor-side-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const nextId = button.dataset.fileId;
        if (!nextId) {
          return;
        }
        const active = getFileById(activeFileId);
        if (active) {
          active.content = editor.value;
        }
        activeFileId = nextId;
        applyActiveFile();
        saveState();
      });

      button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        menuFileId = button.dataset.fileId || null;
        if (!menuFileId) {
          return;
        }
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.classList.add("visible");
      });
    });
  };

  const applyActiveFile = () => {
    const active = getFileById(activeFileId);
    if (!active) {
      return;
    }
    editor.value = active.content;
    editorLabel.textContent = `Your ${active.type.toUpperCase()} (${active.name}.${active.type})`;
    renderTabs();
  };

  const openFileDialog = ({ mode, targetFileId = null }) => {
    dialogMode = mode;
    dialogTargetId = targetFileId;
    if (mode === "rename") {
      const target = getFileById(targetFileId);
      if (!target) {
        return;
      }
      dialogTitle.textContent = "Change file name";
      dialogSubmitBtn.textContent = "Save";
      dialogFileName.value = target.name;
      dialogFileType.value = target.type;
      dialogFileType.disabled = true;
      dialogExtWrap.style.opacity = "0.6";
    } else {
      dialogTitle.textContent = "Create new file";
      dialogSubmitBtn.textContent = "Create";
      dialogFileName.value = "";
      dialogFileType.disabled = false;
      dialogFileType.value = "html";
      dialogExtWrap.style.opacity = "1";
    }
    fileDialog.showModal();
    dialogFileName.focus();
  };

  contextMenu.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const action = target.dataset.action;
    const targetFileId = menuFileId;
    hideContextMenu();
    if (action === "rename" && targetFileId) {
      openFileDialog({ mode: "rename", targetFileId });
      return;
    }
    if (action === "new-file") {
      openFileDialog({ mode: "new-file" });
      return;
    }
    if (action === "delete-file" && targetFileId) {
      const targetFile = getFileById(targetFileId);
      if (!targetFile) {
        return;
      }
      if (files.length <= 1) {
        statusLine.textContent = "You must keep at least one file.";
        return;
      }
      deleteTargetId = targetFileId;
      deleteDialogText.textContent = `Delete ${targetFile.name}.${targetFile.type}? This cannot be undone.`;
      deleteDialog.showModal();
    }
  });

  window.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (!contextMenu.contains(event.target)) {
      hideContextMenu();
    }
  });

  dialogCancelBtn.addEventListener("click", () => {
    fileDialog.close();
  });

  deleteCancelBtn.addEventListener("click", () => {
    deleteTargetId = null;
    deleteDialog.close();
  });

  deleteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!deleteTargetId) {
      deleteDialog.close();
      return;
    }

    const target = getFileById(deleteTargetId);
    files = files.filter((file) => file.id !== deleteTargetId);
    if (files.length === 0) {
      files = defaultFiles.map((file) => ({ ...file }));
    }

    if (activeFileId === deleteTargetId) {
      activeFileId = files[0].id;
    }

    deleteTargetId = null;
    deleteDialog.close();
    applyActiveFile();
    saveState();
    if (target) {
      statusLine.textContent = `Deleted ${target.name}.${target.type}`;
    }
  });

  fileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const rawName = dialogFileName.value.trim();
    const cleanName = rawName.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, "-");
    if (!cleanName) {
      statusLine.textContent = "Please enter a valid file name.";
      return;
    }

    const active = getFileById(activeFileId);
    if (active) {
      active.content = editor.value;
    }

    if (dialogMode === "rename" && dialogTargetId) {
      const target = getFileById(dialogTargetId);
      if (target) {
        target.name = cleanName;
        statusLine.textContent = `Renamed to ${target.name}.${target.type}`;
      }
    } else {
      const type = dialogFileType.value;
      if (!["html", "css", "js"].includes(type)) {
        statusLine.textContent = "Select a valid extension.";
        return;
      }
      const newFile = {
        id: `file-${Date.now()}`,
        name: cleanName,
        type,
        content: type === "html" ? "<div>New file</div>" : ""
      };
      files.push(newFile);
      activeFileId = newFile.id;
      statusLine.textContent = `Created ${newFile.name}.${newFile.type}`;
    }

    fileDialog.close();
    applyActiveFile();
    saveState();
  });

  const insertTextAtCursor = (textarea, text, moveCursorBy = 0) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);
    textarea.value = `${before}${text}${after}`;
    const nextPos = start + text.length - moveCursorBy;
    textarea.setSelectionRange(nextPos, nextPos);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const setupAutoClose = (textarea) => {
    const pairMap = { "(": ")", "{": "}", "[": "]", "\"": "\"", "'": "'" };
    const selfClosing = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta"];

    textarea.addEventListener("keydown", (event) => {
      const key = event.key;
      if (pairMap[key]) {
        event.preventDefault();
        insertTextAtCursor(textarea, `${key}${pairMap[key]}`, 1);
        return;
      }
      if (key === ">") {
        const active = getFileById(activeFileId);
        if (!active || active.type !== "html") {
          return;
        }
        const cursor = textarea.selectionStart;
        const before = textarea.value.slice(0, cursor);
        const match = before.match(/<([a-zA-Z][\w-]*)([^<>]*)$/);
        if (!match) return;
        const tag = match[1].toLowerCase();
        const attrs = (match[2] || "").trim();
        if (before.endsWith("</") || attrs.endsWith("/") || selfClosing.includes(tag)) return;
        event.preventDefault();
        insertTextAtCursor(textarea, `></${tag}>`, tag.length + 3);
      }
    });
  };

  editor.addEventListener("input", () => {
    const active = getFileById(activeFileId);
    if (!active) {
      return;
    }
    active.content = editor.value;
    statusLine.textContent = `Editing ${active.name}.${active.type}...`;
    saveState();
  });

  resetButton.addEventListener("click", () => {
    files = defaultFiles.map((file) => ({ ...file }));
    activeFileId = files[0].id;
    applyActiveFile();
    saveState();
    statusLine.textContent = "Sandbox reset to default starter code.";
  });

  runButton.addEventListener("click", () => {
    const active = getFileById(activeFileId);
    if (active) {
      active.content = editor.value;
    }
    const html = files.filter((file) => file.type === "html").map((file) => file.content).join("\n");
    const css = files.filter((file) => file.type === "css").map((file) => file.content).join("\n");
    const js = files.filter((file) => file.type === "js").map((file) => file.content).join("\n");
    saveState();
    localStorage.setItem(TRACK_KEY, "sandbox");
    localStorage.setItem(RUN_PAYLOAD_KEY, JSON.stringify({
      track: "sandbox",
      html,
      css,
      js
    }));
    window.location.href = "run.html";
  });

  setupAutoClose(editor);
  renderTabs();
  applyActiveFile();
})();
>>>>>>> 2807f38 (Git start)
