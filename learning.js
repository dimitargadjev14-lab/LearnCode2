(() => {
  const TRACK_KEY = "codelearn_selected_track";
  const TOTAL_LESSONS = 65;
  const decodeHtml = (text) => text
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'");
  const hasTag = (code, tag) => new RegExp(`<\\s*${tag}(\\s|>)`, "i").test(code);
  const hasTextBetweenTags = (code, tag) => new RegExp(`<\\s*${tag}[^>]*>\\s*[^<\\s][\\s\\S]*?<\\s*\\/\\s*${tag}\\s*>`, "i").test(code);
  const hasInputType = (code, type) => new RegExp(`<\\s*input[^>]*type\\s*=\\s*["']${type}["']`, "i").test(code);
  const hasInputById = (code, id) => new RegExp(`<\\s*input[^>]*id\\s*=\\s*["']${id}["']`, "i").test(code);
  const hasLabelFor = (code, id) => new RegExp(`<\\s*label[^>]*for\\s*=\\s*["']${id}["']`, "i").test(code);

  const HTML_LESSONS = [
    ["What is HTML", "HTML is the language used to structure content on web pages.", "Create a page with a title and heading.", "<h1>Hello, world!</h1>\n<p>This is my first web page.</p>", "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>", (code) => hasTag(code, "title") && hasTag(code, "h1")],
    ["Basic structure", "Every page starts with <!DOCTYPE html> and contains html, head, and body.", "Make a paragraph introducing yourself.", "<!DOCTYPE html>\n<html>\n  <head><title>My page</title></head>\n  <body>Hello world</body>\n</html>", "<!DOCTYPE html>\n<html>\n  <head><title>About Me</title></head>\n  <body>\n    <p>Write one sentence about yourself.</p>\n  </body>\n</html>", (code) => hasTextBetweenTags(code, "p")],
    ["Head vs Body", "Use head for metadata and body for visible page content.", "Add a clickable link to Google.", "<head>\n  <title>Portfolio</title>\n</head>\n<body>\n  <h1>My Portfolio</h1>\n</body>", "<a href=\"https://google.com\">Open Google</a>", (code) => /<\s*a[^>]*href\s*=\s*["'][^"']*google\.[^"']*["']/i.test(code)],
    ["Headings", "Headings h1 to h6 organize titles from most important to least.", "Insert an image on the page.", "<h1>Main Title</h1>\n<h2>Section Title</h2>\n<h3>Subsection</h3>", "<img src=\"https://via.placeholder.com/180\" alt=\"Sample image\">", (code) => hasTag(code, "img")],
    ["Paragraphs", "Paragraph tags group normal text into readable blocks.", "Create an unordered list of your hobbies.", "<p>I am learning HTML.</p>\n<p>It is fun and beginner friendly.</p>", "<ul>\n  <li>Gaming</li>\n  <li>Reading</li>\n  <li>Music</li>\n</ul>", (code) => hasTag(code, "ul") && /<\s*li[\s>]/i.test(code)],
    ["Links", "Links connect pages and websites using the anchor tag.", "Create an ordered list of steps to make tea.", "<a href=\"https://example.com\">Visit Example</a>", "<ol>\n  <li>Boil water</li>\n  <li>Add tea</li>\n  <li>Serve</li>\n</ol>", (code) => hasTag(code, "ol") && /<\s*li[\s>]/i.test(code)],
    ["Images", "Use img with src and alt to show images accessibly.", "Build a simple profile card using div.", "<img src=\"profile.jpg\" alt=\"Profile photo\">", "<div>\n  <h2>John Doe</h2>\n  <p>Frontend learner</p>\n</div>", (code) => (code.match(/<\s*div[\s>]/gi) || []).length >= 1],
    ["Lists", "Use ul or ol with li items to structure grouped content.", "Add a button that says \"Click me\".", "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>", "<button type=\"button\">Click me</button>", (code) => /<\s*button[\s\S]*?>\s*click me\s*<\s*\/\s*button\s*>/i.test(code)],
    ["Div vs Span", "Div is a block container while span is inline text container.", "Create a form with name and email.", "<div>\n  <span>Inline text</span>\n</div>", "<form>\n  <input type=\"text\" placeholder=\"Name\">\n  <input type=\"email\" placeholder=\"Email\">\n</form>", (code) => hasTag(code, "form") && hasInputType(code, "text") && hasInputType(code, "email")],
    ["Buttons", "Buttons trigger actions and are useful in forms and UI controls.", "Add labels to form inputs.", "<button type=\"button\">Click me</button>", "<label for=\"name\">Name</label>\n<input id=\"name\" type=\"text\">\n<label for=\"email\">Email</label>\n<input id=\"email\" type=\"email\">", (code) => hasLabelFor(code, "name") && hasLabelFor(code, "email") && hasInputById(code, "name") && hasInputById(code, "email")],
    ["Input fields", "Inputs collect user data like text, email, and numbers.", "Build a table with 3 rows of data.", "<input type=\"text\" placeholder=\"Your name\">", "<table>\n  <tr><th>Name</th><th>Score</th></tr>\n  <tr><td>Ali</td><td>90</td></tr>\n  <tr><td>Sara</td><td>95</td></tr>\n  <tr><td>Omar</td><td>88</td></tr>\n</table>", (code) => hasTag(code, "table") && (code.match(/<\s*tr[\s>]/gi) || []).length >= 4],
    ["Forms basics", "Forms group inputs and submit user data.", "Create a navigation bar (links).", "<form>\n  <input type=\"text\" placeholder=\"Name\">\n  <button>Send</button>\n</form>", "<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">About</a>\n  <a href=\"#\">Contact</a>\n</nav>", (code) => hasTag(code, "nav") && (code.match(/<\s*a[\s>]/gi) || []).length >= 2],
    ["Labels", "Labels improve form accessibility by describing inputs.", "Use header, main, footer correctly.", "<label for=\"email\">Email</label>\n<input id=\"email\" type=\"email\">", "<header><h1>My Site</h1></header>\n<main><p>Main content</p></main>\n<footer>2026</footer>", (code) => hasTag(code, "header") && hasTag(code, "main") && hasTag(code, "footer")],
    ["Tables", "Tables organize data into rows and columns.", "Create a section about your favorite game.", "<table>\n  <tr><th>Name</th><th>Score</th></tr>\n  <tr><td>Ali</td><td>95</td></tr>\n</table>", "<section>\n  <h2>My Favorite Game</h2>\n  <p>I like this game because ...</p>\n</section>", (code) => hasTag(code, "section") && hasTextBetweenTags(code, "h2")],
    ["Semantic tags", "Semantic tags describe page regions clearly for browsers and screen readers.", "Embed a YouTube video (iframe).", "<header>Header</header>\n<main>Main content</main>\n<footer>Footer</footer>", "<iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" title=\"YouTube video\"></iframe>", (code) => /<\s*iframe[^>]*src\s*=\s*["'][^"']*youtube\.com\/embed/i.test(code)],
    ["Navigation", "Nav groups your main navigation links.", "Create a login form layout.", "<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">About</a>\n</nav>", "<form>\n  <input type=\"email\" placeholder=\"Email\">\n  <input type=\"password\" placeholder=\"Password\">\n  <button type=\"submit\">Login</button>\n</form>", (code) => hasTag(code, "form") && hasInputType(code, "email") && hasInputType(code, "password")],
    ["Sections & articles", "Section and article help structure long pages and blog content.", "Add checkbox and radio buttons.", "<section>\n  <article>\n    <h2>Post title</h2>\n  </article>\n</section>", "<label><input type=\"checkbox\"> I agree</label>\n<label><input type=\"radio\" name=\"level\"> Beginner</label>", (code) => hasInputType(code, "checkbox") && hasInputType(code, "radio")],
    ["Iframes", "Iframes embed other pages or media within your page.", "Build a simple article layout.", "<iframe src=\"https://example.com\" title=\"Example site\"></iframe>", "<article>\n  <h2>Article title</h2>\n  <p>Article content...</p>\n</article>", (code) => hasTag(code, "article") && hasTextBetweenTags(code, "h2") && hasTextBetweenTags(code, "p")],
    ["Meta tags", "Meta tags provide page metadata like charset and viewport settings.", "Create a contact form page.", "<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", "<form>\n  <label for=\"email\">Email</label>\n  <input id=\"email\" type=\"email\">\n  <label for=\"message\">Message</label>\n  <textarea id=\"message\"></textarea>\n  <button type=\"submit\">Send</button>\n</form>", (code) => hasTag(code, "form") && hasInputType(code, "email") && hasTag(code, "textarea")],
    ["Accessibility basics", "Use alt text, labels, and clear structure to improve accessibility.", "Build a full \"About Me\" page.", "<img src=\"cat.jpg\" alt=\"A brown cat sitting on a chair\">", "<!DOCTYPE html>\n<html>\n  <head><title>About Me</title></head>\n  <body>\n    <h1>About Me</h1>\n    <p>Hello! I am learning web development.</p>\n  </body>\n</html>", (code) => hasTag(code, "title") && hasTag(code, "h1") && hasTextBetweenTags(code, "p")]
  ].map(([title, description, task, exampleCode, starterCode, validate]) => ({ title, description, task, exampleCode, starterCode, validate }));

  const CSS_TOPICS = [
    "What is CSS", "Selectors (class, id)", "Colors", "Backgrounds", "Text styling", "Fonts", "Box model", "Margin vs Padding", "Borders", "Display (block, inline)", "Flexbox basics", "Flexbox alignment", "Grid basics", "Width & height", "Position (relative, absolute)", "Z-index", "Hover effects", "Transitions", "Animations", "Responsive design"
  ];
  const CSS_TASKS = [
    "Change text color of a heading", "Center text on page", "Style a button (color + hover)", "Change background color", "Add border to a box", "Create a card with padding and shadow", "Make text bigger and bold", "Change font family", "Add margin between elements", "Create a circle using border-radius", "Style a navigation bar", "Use flexbox to center content", "Create a responsive layout", "Make two columns using flexbox", "Add hover effect on image", "Create a gradient background", "Animate a button on hover", "Create a sticky header", "Use grid to make layout", "Build a modern profile card UI"
  ];

  const JS_TOPICS = [
    "What is JavaScript", "Variables (let, const)", "Data types", "Operators", "Functions", "If statements", "Comparison operators", "Loops (for, while)", "Arrays", "Objects", "Events (click)", "DOM basics", "querySelector", "Changing text", "Changing styles", "Input values", "Alerts", "setTimeout", "setInterval", "Math functions", "String methods", "Array methods", "LocalStorage", "Try/Catch (errors)", "Simple project (to-do app)"
  ];
  const JS_TASKS = [
    "Print \"Hello World\" in console", "Create a variable for your name", "Add two numbers and show result", "Create a function that returns greeting", "Check if number is bigger than 10", "Create a loop that prints 1-10", "Make an array of 5 fruits", "Print each fruit using loop", "Create an object (user info)", "Change text when button is clicked", "Show alert when page loads", "Get input value and display it", "Make a simple calculator (+ only)", "Change background color with button", "Hide and show a div", "Create a counter (+ / - buttons)", "Validate if input is empty", "Use setTimeout to show message", "Use setInterval for timer", "Save data in localStorage", "Load data from localStorage", "Create simple to-do list", "Check if user is logged in (fake logic)", "Show error using try/catch", "Build mini project: \"Random joke generator\""
  ];

  const CSS_LESSONS = CSS_TOPICS.map((topic, index) => ({
    title: topic,
    description: "Practice the core CSS concept in this lesson.",
    task: CSS_TASKS[index],
    exampleCode: "h1 {\n  color: #25d0ff;\n}",
    starterCode: "/* Write your CSS here */\n",
    validate: (code) => code.trim().length > 0
  }));

  const JS_LESSONS = JS_TOPICS.map((topic, index) => ({
    title: topic,
    description: "Practice the core JavaScript concept in this lesson.",
    task: JS_TASKS[index],
    exampleCode: "console.log('Hello World');",
    starterCode: "// Write your JavaScript here\n",
    validate: (code) => code.trim().length > 0
  }));

  const TRACK_CONFIG = {
    html: { name: "HTML", editor: "Your HTML", lessons: HTML_LESSONS },
    css: { name: "CSS", editor: "Your CSS", lessons: CSS_LESSONS },
    js: { name: "JavaScript", editor: "Your JavaScript", lessons: JS_LESSONS }
  };

  const editor = document.getElementById("html-editor");
  const runButton = document.getElementById("run-code-btn");
  const prevButton = document.getElementById("prev-lesson-btn");
  const nextButton = document.getElementById("next-lesson-btn");
  const resetButton = document.getElementById("reset-code-btn");
  const lessonLabel = document.getElementById("lesson-label");
  const lessonTitle = document.getElementById("lesson-title");
  const lessonDescription = document.getElementById("lesson-description");
  const lessonExampleCode = document.getElementById("lesson-example-code");
  const progressCount = document.getElementById("track-progress-count");
  const totalProgressText = document.getElementById("total-progress-text");
  const totalProgressFill = document.getElementById("total-progress-fill");
  const lessonTaskText = document.getElementById("lesson-task-text");
  const checkStatus = document.getElementById("check-status");
  const lessonList = document.getElementById("track-lesson-list");
  const trackNameLabel = document.getElementById("track-name-label");
  const editorLabel = document.getElementById("editor-label");
  const editorSwitcher = document.getElementById("editor-switcher");

  if (
    !(editor instanceof HTMLTextAreaElement) ||
    !(runButton instanceof HTMLButtonElement) ||
    !(prevButton instanceof HTMLButtonElement) ||
    !(nextButton instanceof HTMLButtonElement) ||
    !(resetButton instanceof HTMLButtonElement) ||
    !(lessonLabel instanceof HTMLElement) ||
    !(lessonTitle instanceof HTMLElement) ||
    !(lessonDescription instanceof HTMLElement) ||
    !(lessonExampleCode instanceof HTMLElement) ||
    !(progressCount instanceof HTMLElement) ||
    !(totalProgressText instanceof HTMLElement) ||
    !(totalProgressFill instanceof HTMLElement) ||
    !(lessonTaskText instanceof HTMLElement) ||
    !(checkStatus instanceof HTMLElement) ||
    !(lessonList instanceof HTMLElement) ||
    !(trackNameLabel instanceof HTMLElement) ||
    !(editorLabel instanceof HTMLElement) ||
    !(editorSwitcher instanceof HTMLElement)
  ) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const urlTrack = params.get("track");
  const storedTrack = localStorage.getItem(TRACK_KEY);
  const currentTrack = TRACK_CONFIG[urlTrack] ? urlTrack : (TRACK_CONFIG[storedTrack] ? storedTrack : "html");
  localStorage.setItem(TRACK_KEY, currentTrack);

  const LESSONS = TRACK_CONFIG[currentTrack].lessons;
  const CODE_STORAGE_KEY = `codelearn_${currentTrack}_code`;
  const LESSON_INDEX_KEY = `codelearn_${currentTrack}_lesson_index`;
  const LESSON_CODES_KEY = `codelearn_${currentTrack}_lesson_codes`;
  const PASSED_TASKS_KEY = `codelearn_${currentTrack}_passed_tasks`;
  const RUN_PAYLOAD_KEY = "codelearn_run_payload";
  const supportsDualSides = currentTrack === "css" || currentTrack === "js";
  const primarySideName = currentTrack === "css" ? "CSS" : "JavaScript";
  let currentEditorSide = "primary";

  const parsedIndex = Number(localStorage.getItem(LESSON_INDEX_KEY));
  let currentLessonIndex = Number.isInteger(parsedIndex) && parsedIndex >= 0 && parsedIndex < LESSONS.length ? parsedIndex : 0;
  let lessonCodes = {};

  try {
    lessonCodes = JSON.parse(localStorage.getItem(LESSON_CODES_KEY) || "{}");
  } catch (_error) {
    lessonCodes = {};
  }
  let passedTasks = {};

  try {
    passedTasks = JSON.parse(localStorage.getItem(PASSED_TASKS_KEY) || "{}");
  } catch (_error) {
    passedTasks = {};
  }

  trackNameLabel.textContent = TRACK_CONFIG[currentTrack].name;
  editorLabel.textContent = TRACK_CONFIG[currentTrack].editor;

  if (supportsDualSides) {
    editorSwitcher.classList.add("active");
    editorSwitcher.innerHTML = `
      <button type="button" class="editor-side-btn active" data-editor-side="primary">&#8226; ${primarySideName}</button>
      <button type="button" class="editor-side-btn" data-editor-side="html">&#8226; HTML</button>
    `;
  } else {
    editorSwitcher.classList.remove("active");
    editorSwitcher.innerHTML = "";
  }

  lessonList.innerHTML = LESSONS.map((lesson, index) => `<li data-lesson-index="${index}">${lesson.title}</li>`).join("");
  const lessonItems = Array.from(lessonList.querySelectorAll("li[data-lesson-index]"));

  const defaultLessonEntry = (index) => {
    if (!supportsDualSides) {
      return LESSONS[index].starterCode;
    }
    return {
      primary: LESSONS[index].starterCode,
      html: "<div class=\"preview-box\">Preview target</div>"
    };
  };

  const ensureLessonEntry = (index) => {
    const existing = lessonCodes[index];
    if (!supportsDualSides) {
      if (typeof existing === "string") {
        return existing;
      }
      const fallback = LESSONS[index].starterCode;
      lessonCodes[index] = fallback;
      return fallback;
    }
    if (existing && typeof existing === "object") {
      return {
        primary: typeof existing.primary === "string" ? existing.primary : LESSONS[index].starterCode,
        html: typeof existing.html === "string" ? existing.html : "<div class=\"preview-box\">Preview target</div>"
      };
    }
    if (typeof existing === "string") {
      return {
        primary: existing,
        html: "<div class=\"preview-box\">Preview target</div>"
      };
    }
    return defaultLessonEntry(index);
  };

  const getCurrentEditorValue = (index) => {
    const entry = ensureLessonEntry(index);
    if (!supportsDualSides) {
      return entry;
    }
    return currentEditorSide === "html" ? entry.html : entry.primary;
  };

  const persistState = () => {
    localStorage.setItem(LESSON_INDEX_KEY, String(currentLessonIndex));
    localStorage.setItem(LESSON_CODES_KEY, JSON.stringify(lessonCodes));
    localStorage.setItem(PASSED_TASKS_KEY, JSON.stringify(passedTasks));
    const entry = ensureLessonEntry(currentLessonIndex);
    const primaryCode = supportsDualSides ? entry.primary : entry;
    localStorage.setItem(CODE_STORAGE_KEY, primaryCode);
  };

  const updateCheckStatus = (state, message) => {
    checkStatus.classList.remove("pass", "fail");
    if (state === "pass") {
      checkStatus.classList.add("pass");
    }
    if (state === "fail") {
      checkStatus.classList.add("fail");
    }
    checkStatus.textContent = message;
  };

  const updateDoneClasses = () => {
    lessonItems.forEach((item) => {
      const itemIndex = Number(item.dataset.lessonIndex);
      item.classList.toggle("active", itemIndex === currentLessonIndex);
      item.classList.toggle("done", Boolean(passedTasks[itemIndex]));
    });
  };

  const updateNextButtonState = () => {
    nextButton.disabled = currentLessonIndex === LESSONS.length - 1 || !passedTasks[currentLessonIndex];
  };

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
    const pairMap = {
      "(": ")",
      "{": "}",
      "[": "]",
      "\"": "\"",
      "'": "'"
    };

    const isSelfClosingTag = (tagName) => [
      "area", "base", "br", "col", "embed", "hr", "img", "input",
      "link", "meta", "param", "source", "track", "wbr"
    ].includes(tagName);

    textarea.addEventListener("keydown", (event) => {
      const key = event.key;

      if (pairMap[key]) {
        const close = pairMap[key];
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const hasSelection = start !== end;

        event.preventDefault();
        if (hasSelection) {
          const selected = textarea.value.slice(start, end);
          insertTextAtCursor(textarea, `${key}${selected}${close}`, 1);
          textarea.setSelectionRange(start + 1 + selected.length, start + 1 + selected.length);
          return;
        }

        insertTextAtCursor(textarea, `${key}${close}`, 1);
        return;
      }

      if (key === ">") {
        const cursor = textarea.selectionStart;
        const before = textarea.value.slice(0, cursor);
        const openTagMatch = before.match(/<([a-zA-Z][\w-]*)([^<>]*)$/);

        if (!openTagMatch) {
          return;
        }

        const tagName = openTagMatch[1].toLowerCase();
        const attrs = openTagMatch[2] || "";
        const trimmedAttrs = attrs.trim();
        const isClosingTag = before.endsWith("</");
        const alreadySelfClosed = trimmedAttrs.endsWith("/");

        if (isClosingTag || alreadySelfClosed || isSelfClosingTag(tagName)) {
          return;
        }

        event.preventDefault();
        insertTextAtCursor(textarea, `></${tagName}>`, tagName.length + 3);
      }
    });
  };

  const setEditorSide = (side) => {
    if (!supportsDualSides) {
      return;
    }
    currentEditorSide = side === "html" ? "html" : "primary";
    const entry = ensureLessonEntry(currentLessonIndex);
    editor.value = currentEditorSide === "html" ? entry.html : entry.primary;
    editorLabel.textContent = currentEditorSide === "html" ? "Your HTML" : TRACK_CONFIG[currentTrack].editor;
    editorSwitcher.querySelectorAll(".editor-side-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.editorSide === currentEditorSide);
    });
  };

  const setCurrentLesson = (index) => {
    if (index < 0 || index >= LESSONS.length) {
      return;
    }
    currentLessonIndex = index;
    const lesson = LESSONS[currentLessonIndex];
    const lessonNumber = currentLessonIndex + 1;

    lessonLabel.textContent = `${TRACK_CONFIG[currentTrack].name.toUpperCase()} LESSON ${String(lessonNumber).padStart(2, "0")}`;
    lessonTitle.textContent = lesson.title;
    lessonDescription.textContent = lesson.description;
    lessonTaskText.textContent = lesson.task;
    lessonExampleCode.textContent = lesson.exampleCode;
    lessonCodes[currentLessonIndex] = ensureLessonEntry(currentLessonIndex);
    if (supportsDualSides) {
      setEditorSide("primary");
    } else {
      editor.value = ensureLessonEntry(currentLessonIndex);
    }
    updateDoneClasses();
    const passedCount = Object.values(passedTasks).filter(Boolean).length;
    progressCount.textContent = `${passedCount}/${LESSONS.length}`;
    totalProgressText.textContent = `${passedCount} / ${TOTAL_LESSONS} lessons`;
    totalProgressFill.style.width = `${(passedCount / TOTAL_LESSONS) * 100}%`;

    prevButton.disabled = currentLessonIndex === 0;
    updateNextButtonState();
    if (passedTasks[currentLessonIndex]) {
      updateCheckStatus("pass", "Task passed. You can move to the next lesson.");
    } else {
      updateCheckStatus("neutral", "Run your code to check this task.");
    }

    persistState();
  };

  editor.addEventListener("input", () => {
    if (supportsDualSides) {
      const entry = ensureLessonEntry(currentLessonIndex);
      if (currentEditorSide === "html") {
        entry.html = editor.value;
      } else {
        entry.primary = editor.value;
      }
      lessonCodes[currentLessonIndex] = entry;
    } else {
      lessonCodes[currentLessonIndex] = editor.value;
    }
    passedTasks[currentLessonIndex] = false;
    updateCheckStatus("neutral", "Code changed. Press Run to check again.");
    updateDoneClasses();
    updateNextButtonState();
    persistState();
  });

  runButton.addEventListener("click", () => {
    if (supportsDualSides) {
      const entry = ensureLessonEntry(currentLessonIndex);
      if (currentEditorSide === "html") {
        entry.html = editor.value;
      } else {
        entry.primary = editor.value;
      }
      lessonCodes[currentLessonIndex] = entry;
    } else {
      lessonCodes[currentLessonIndex] = editor.value;
    }
    const currentLesson = LESSONS[currentLessonIndex];
    const entry = ensureLessonEntry(currentLessonIndex);
    const primaryCode = supportsDualSides ? entry.primary : entry;
    const htmlCode = supportsDualSides ? entry.html : primaryCode;
    const userCode = currentTrack === "html" ? decodeHtml(primaryCode) : primaryCode;
    const isValid = currentLesson.validate(userCode);
    passedTasks[currentLessonIndex] = isValid;
    if (isValid) {
      updateCheckStatus("pass", "Great job! Task completed correctly. Next is unlocked.");
      updateNextButtonState();
      localStorage.setItem(RUN_PAYLOAD_KEY, JSON.stringify({
        track: currentTrack,
        html: htmlCode,
        code: primaryCode
      }));
      persistState();
      window.location.href = "run.html";
      return;
    }
    updateCheckStatus("fail", `Task not correct yet: ${currentLesson.task}`);
    updateDoneClasses();
    updateNextButtonState();
    persistState();
  });

  prevButton.addEventListener("click", () => {
    if (supportsDualSides) {
      const entry = ensureLessonEntry(currentLessonIndex);
      if (currentEditorSide === "html") {
        entry.html = editor.value;
      } else {
        entry.primary = editor.value;
      }
      lessonCodes[currentLessonIndex] = entry;
    } else {
      lessonCodes[currentLessonIndex] = editor.value;
    }
    setCurrentLesson(currentLessonIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    if (supportsDualSides) {
      const entry = ensureLessonEntry(currentLessonIndex);
      if (currentEditorSide === "html") {
        entry.html = editor.value;
      } else {
        entry.primary = editor.value;
      }
      lessonCodes[currentLessonIndex] = entry;
    } else {
      lessonCodes[currentLessonIndex] = editor.value;
    }
    setCurrentLesson(currentLessonIndex + 1);
  });

  resetButton.addEventListener("click", () => {
    lessonCodes[currentLessonIndex] = defaultLessonEntry(currentLessonIndex);
    if (supportsDualSides) {
      setEditorSide("primary");
    } else {
      editor.value = LESSONS[currentLessonIndex].starterCode;
    }
    passedTasks[currentLessonIndex] = false;
    updateCheckStatus("neutral", "Code reset. Press Run to validate.");
    updateDoneClasses();
    updateNextButtonState();
    persistState();
  });

  lessonItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (supportsDualSides) {
        const entry = ensureLessonEntry(currentLessonIndex);
        if (currentEditorSide === "html") {
          entry.html = editor.value;
        } else {
          entry.primary = editor.value;
        }
        lessonCodes[currentLessonIndex] = entry;
      } else {
        lessonCodes[currentLessonIndex] = editor.value;
      }
      const selectedIndex = Number(item.dataset.lessonIndex);
      setCurrentLesson(selectedIndex);
    });
  });

  if (supportsDualSides) {
    editorSwitcher.querySelectorAll(".editor-side-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const side = button.dataset.editorSide;
        if (side !== "primary" && side !== "html") {
          return;
        }
        const entry = ensureLessonEntry(currentLessonIndex);
        if (currentEditorSide === "html") {
          entry.html = editor.value;
        } else {
          entry.primary = editor.value;
        }
        lessonCodes[currentLessonIndex] = entry;
        setEditorSide(side);
        persistState();
      });
    });
  }

  const legacyCode = localStorage.getItem(CODE_STORAGE_KEY);
  if (legacyCode && !lessonCodes[currentLessonIndex]) {
    lessonCodes[currentLessonIndex] = supportsDualSides
      ? { primary: legacyCode, html: "<div class=\"preview-box\">Preview target</div>" }
      : legacyCode;
  }

  setupAutoClose(editor);
  setCurrentLesson(currentLessonIndex);
})();
