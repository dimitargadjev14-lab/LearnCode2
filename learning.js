<<<<<<< HEAD
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
=======
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
  const hasCssValue = (code, property, valuePattern) => new RegExp(`(?:${property})\\s*:\\s*[^;{}]*${valuePattern}`, "i").test(code);
  const hasCssSelectorValue = (code, selector, property, valuePattern) => {
    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\ /g, "\\s+");
    return new RegExp(`${escapedSelector}\\s*\\{[^}]*(?:${property})\\s*:\\s*[^;{}]*${valuePattern}`, "i").test(code);
  };
  const hasJs = (code, pattern) => pattern.test(code);

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

  const CSS_LESSON_DATA = [
    {
      title: "What is CSS",
      description: "CSS makes websites look better. It changes colors, sizes, spacing, and layouts.",
      task: "Make the title green.",
      exampleCode: ".blue-title {\n  color: blue;\n  font-size: 36px;\n}",
      starterCode: ".blue-title {\n  color: blue;\n  font-size: 36px;\n}",
      htmlCode: "<h1 class=\"blue-title\">Hello CSS!</h1>"
    },
    {
      title: "Selectors (class, id)",
      description: "Selectors tell CSS which elements to style. Classes can style many elements, but IDs are unique.",
      task: "Make the special button purple.",
      exampleCode: ".red-button {\n  background-color: red;\n  color: white;\n}\n\n#special-button {\n  background-color: gold;\n  color: black;\n}",
      starterCode: ".red-button {\n  background-color: red;\n  color: white;\n}\n\n#special-button {\n  background-color: gold;\n  color: black;\n}",
      htmlCode: "<button class=\"red-button\">Click Me</button>\n<button id=\"special-button\">Special</button>"
    },
    {
      title: "Colors",
      description: "Colors make websites more fun and easier to read. CSS can change text and background colors.",
      task: "Change the background to navy.",
      exampleCode: ".color-box {\n  background-color: black;\n  color: white;\n  padding: 20px;\n}",
      starterCode: ".color-box {\n  background-color: black;\n  color: white;\n  padding: 20px;\n}",
      htmlCode: "<div class=\"color-box\">\n  <p>Hello colors!</p>\n</div>"
    },
    {
      title: "Backgrounds",
      description: "Backgrounds add color or images behind elements. They help websites look more interesting.",
      task: "Change the gradient colors.",
      exampleCode: ".gradient-card {\n  background: linear-gradient(orange, pink);\n  padding: 30px;\n  color: white;\n  border-radius: 8px;\n}",
      starterCode: ".gradient-card {\n  background: linear-gradient(orange, pink);\n  padding: 30px;\n  color: white;\n  border-radius: 8px;\n}",
      htmlCode: "<div class=\"gradient-card\">\n  <h2>Rainbow Card</h2>\n</div>"
    },
    {
      title: "Text styling",
      description: "Text styling changes how text looks. You can align, decorate, and resize text.",
      task: "Make the heading red.",
      exampleCode: ".fancy-heading {\n  text-align: center;\n  text-decoration: underline;\n  font-size: 34px;\n  color: teal;\n}",
      starterCode: ".fancy-heading {\n  text-align: center;\n  text-decoration: underline;\n  font-size: 34px;\n  color: teal;\n}",
      htmlCode: "<h1 class=\"fancy-heading\">My Cool Heading</h1>"
    },
    {
      title: "Fonts",
      description: "Fonts change the style of text. Different fonts make websites feel different.",
      task: "Change the font to Georgia.",
      exampleCode: ".clean-text {\n  font-family: Arial, sans-serif;\n  font-size: 22px;\n  color: darkslateblue;\n}",
      starterCode: ".clean-text {\n  font-family: Arial, sans-serif;\n  font-size: 22px;\n  color: darkslateblue;\n}",
      htmlCode: "<p class=\"clean-text\">This text uses a clean font.</p>"
    },
    {
      title: "Box model",
      description: "Every HTML element is a box. The box has content, padding, borders, and margins.",
      task: "Make the border blue.",
      exampleCode: ".box-card {\n  margin: 20px;\n  padding: 20px;\n  border: 4px solid tomato;\n  background-color: lightyellow;\n}",
      starterCode: ".box-card {\n  margin: 20px;\n  padding: 20px;\n  border: 4px solid tomato;\n  background-color: lightyellow;\n}",
      htmlCode: "<div class=\"box-card\">\n  I am a box!\n</div>"
    },
    {
      title: "Margin vs Padding",
      description: "Margin adds space outside an element. Padding adds space inside an element.",
      task: "Make the padding bigger.",
      exampleCode: ".space-button {\n  margin: 20px;\n  padding: 15px 30px;\n  background-color: dodgerblue;\n  color: white;\n  border: none;\n}",
      starterCode: ".space-button {\n  margin: 20px;\n  padding: 15px 30px;\n  background-color: dodgerblue;\n  color: white;\n  border: none;\n}",
      htmlCode: "<button class=\"space-button\">Big Button</button>"
    },
    {
      title: "Borders",
      description: "Borders create lines around elements. They can have different colors and shapes.",
      task: "Change the border color to green.",
      exampleCode: ".border-card {\n  border: 4px solid purple;\n  border-radius: 8px;\n  padding: 20px;\n  background-color: lavender;\n}",
      starterCode: ".border-card {\n  border: 4px solid purple;\n  border-radius: 8px;\n  padding: 20px;\n  background-color: lavender;\n}",
      htmlCode: "<div class=\"border-card\">\n  Rounded card\n</div>"
    },
    {
      title: "Display (block, inline)",
      description: "Display controls how elements appear on the page. Some elements stay on one line and others start new lines.",
      task: "Change the links to blue.",
      exampleCode: ".nav-link {\n  display: inline-block;\n  background-color: coral;\n  color: white;\n  padding: 10px;\n  margin: 5px;\n}",
      starterCode: ".nav-link {\n  display: inline-block;\n  background-color: coral;\n  color: white;\n  padding: 10px;\n  margin: 5px;\n}",
      htmlCode: "<a class=\"nav-link\" href=\"#\">Home</a>\n<a class=\"nav-link\" href=\"#\">Games</a>\n<a class=\"nav-link\" href=\"#\">Contact</a>"
    },
    {
      title: "Flexbox basics",
      description: "Flexbox helps arrange items easily. It is useful for rows and columns.",
      task: "Make the boxes orange.",
      exampleCode: ".flex-row {\n  display: flex;\n  gap: 10px;\n}\n\n.flex-row div {\n  background-color: limegreen;\n  color: white;\n  padding: 25px;\n}",
      starterCode: ".flex-row {\n  display: flex;\n  gap: 10px;\n}\n\n.flex-row div {\n  background-color: limegreen;\n  color: white;\n  padding: 25px;\n}",
      htmlCode: "<div class=\"flex-row\">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</div>"
    },
    {
      title: "Flexbox alignment",
      description: "Flexbox alignment controls where items sit. You can center elements easily.",
      task: "Change the button color to red.",
      exampleCode: ".center-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 150px;\n  background-color: lightblue;\n}\n\n.center-box button {\n  background-color: purple;\n  color: white;\n  padding: 12px 20px;\n}",
      starterCode: ".center-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 150px;\n  background-color: lightblue;\n}\n\n.center-box button {\n  background-color: purple;\n  color: white;\n  padding: 12px 20px;\n}",
      htmlCode: "<div class=\"center-box\">\n  <button>Centered</button>\n</div>"
    },
    {
      title: "Grid basics",
      description: "Grid creates layouts with rows and columns. It is useful for complex designs.",
      task: "Make the grid boxes yellow.",
      exampleCode: ".gallery {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n\n.gallery div {\n  background-color: hotpink;\n  color: white;\n  padding: 30px;\n  text-align: center;\n}",
      starterCode: ".gallery {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n\n.gallery div {\n  background-color: hotpink;\n  color: white;\n  padding: 30px;\n  text-align: center;\n}",
      htmlCode: "<div class=\"gallery\">\n  <div>A</div>\n  <div>B</div>\n  <div>C</div>\n  <div>D</div>\n</div>"
    },
    {
      title: "Width & height",
      description: "Width and height control element size. They can use pixels or percentages.",
      task: "Make the image 250px wide.",
      exampleCode: ".small-image {\n  width: 200px;\n  height: 120px;\n  border: 4px solid blue;\n}",
      starterCode: ".small-image {\n  width: 200px;\n  height: 120px;\n  border: 4px solid blue;\n}",
      htmlCode: "<img class=\"small-image\" src=\"https://via.placeholder.com/300\" alt=\"Placeholder image\">"
    },
    {
      title: "Position (relative, absolute)",
      description: "Position changes where elements appear. Absolute positioning can place items anywhere.",
      task: "Move the badge to the left corner.",
      exampleCode: ".photo-card {\n  position: relative;\n  background-color: lightgreen;\n  padding: 50px;\n  width: 150px;\n}\n\n.badge {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  background-color: red;\n  color: white;\n  padding: 5px;\n}",
      starterCode: ".photo-card {\n  position: relative;\n  background-color: lightgreen;\n  padding: 50px;\n  width: 150px;\n}\n\n.badge {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  background-color: red;\n  color: white;\n  padding: 5px;\n}",
      htmlCode: "<div class=\"photo-card\">\n  <span class=\"badge\">NEW</span>\n  Card\n</div>"
    },
    {
      title: "Z-index",
      description: "Z-index controls which element appears on top. Bigger values appear above smaller ones.",
      task: "Make the popup pink.",
      exampleCode: ".z-area {\n  position: relative;\n  height: 130px;\n}\n\n.back-box {\n  position: absolute;\n  background-color: skyblue;\n  padding: 40px;\n  z-index: 1;\n}\n\n.popup {\n  position: absolute;\n  left: 40px;\n  top: 30px;\n  background-color: gold;\n  padding: 25px;\n  z-index: 2;\n}",
      starterCode: ".z-area {\n  position: relative;\n  height: 130px;\n}\n\n.back-box {\n  position: absolute;\n  background-color: skyblue;\n  padding: 40px;\n  z-index: 1;\n}\n\n.popup {\n  position: absolute;\n  left: 40px;\n  top: 30px;\n  background-color: gold;\n  padding: 25px;\n  z-index: 2;\n}",
      htmlCode: "<div class=\"z-area\">\n  <div class=\"back-box\">Box</div>\n  <div class=\"popup\">Popup</div>\n</div>"
    },
    {
      title: "Hover effects",
      description: "Hover effects happen when the mouse moves over an element. They make websites interactive.",
      task: "Make the hover color green.",
      exampleCode: ".hover-button {\n  background-color: blue;\n  color: white;\n  padding: 15px 25px;\n  border: none;\n}\n\n.hover-button:hover {\n  background-color: orange;\n}",
      starterCode: ".hover-button {\n  background-color: blue;\n  color: white;\n  padding: 15px 25px;\n  border: none;\n}\n\n.hover-button:hover {\n  background-color: orange;\n}",
      htmlCode: "<button class=\"hover-button\">Hover Me</button>"
    },
    {
      title: "Transitions",
      description: "Transitions make changes smooth. They improve animations and hover effects.",
      task: "Make the button grow less.",
      exampleCode: ".smooth-button {\n  background-color: teal;\n  color: white;\n  padding: 15px 25px;\n  border: none;\n  transition: transform 0.3s;\n}\n\n.smooth-button:hover {\n  transform: scale(1.2);\n}",
      starterCode: ".smooth-button {\n  background-color: teal;\n  color: white;\n  padding: 15px 25px;\n  border: none;\n  transition: transform 0.3s;\n}\n\n.smooth-button:hover {\n  transform: scale(1.2);\n}",
      htmlCode: "<button class=\"smooth-button\">Grow</button>"
    },
    {
      title: "Animations",
      description: "Animations create movement on websites. CSS can move, rotate, or fade elements.",
      task: "Make the box bounce higher.",
      exampleCode: ".bounce-box {\n  background-color: tomato;\n  color: white;\n  padding: 25px;\n  width: 80px;\n  animation: bounce 1s infinite;\n}\n\n@keyframes bounce {\n  0% {\n    transform: translateY(0);\n  }\n\n  50% {\n    transform: translateY(-25px);\n  }\n\n  100% {\n    transform: translateY(0);\n  }\n}",
      starterCode: ".bounce-box {\n  background-color: tomato;\n  color: white;\n  padding: 25px;\n  width: 80px;\n  animation: bounce 1s infinite;\n}\n\n@keyframes bounce {\n  0% {\n    transform: translateY(0);\n  }\n\n  50% {\n    transform: translateY(-25px);\n  }\n\n  100% {\n    transform: translateY(0);\n  }\n}",
      htmlCode: "<div class=\"bounce-box\">Bounce</div>"
    },
    {
      title: "Responsive design",
      description: "Responsive design helps websites work on phones and computers. Layouts change based on screen size.",
      task: "Change the card color to purple.",
      exampleCode: ".responsive-cards {\n  display: flex;\n  gap: 10px;\n}\n\n.responsive-cards div {\n  background-color: royalblue;\n  color: white;\n  padding: 25px;\n}\n\n@media (max-width: 600px) {\n  .responsive-cards {\n    flex-direction: column;\n  }\n}",
      starterCode: ".responsive-cards {\n  display: flex;\n  gap: 10px;\n}\n\n.responsive-cards div {\n  background-color: royalblue;\n  color: white;\n  padding: 25px;\n}\n\n@media (max-width: 600px) {\n  .responsive-cards {\n    flex-direction: column;\n  }\n}",
      htmlCode: "<div class=\"responsive-cards\">\n  <div>Card 1</div>\n  <div>Card 2</div>\n  <div>Card 3</div>\n</div>"
    }
  ];

  const JS_LESSON_DATA = [
    {
      title: "What is JavaScript",
      description: "JavaScript makes websites interactive. It can change content and react to user actions.",
      task: "Press Run, open the browser console, and print Hello.",
      exampleCode: "// JavaScript can talk to the console.\n// Try printing your own short message.",
      starterCode: "// Write your console.log here\n"
    },
    {
      title: "Variables (let, const)",
      description: "Variables store information. let can change, but const stays the same.",
      task: "Press Run, open the browser console, and store a username.",
      exampleCode: "let coins;\n// A variable can hold something later.",
      starterCode: "// Create a username variable\n// Then print it with console.log\n"
    },
    {
      title: "Data types",
      description: "JavaScript has different data types like text and numbers. Data types help organize information.",
      task: "Press Run, open the browser console, and create a string and a number.",
      exampleCode: "let isOnline = true;\n// true and false are boolean values.",
      starterCode: "// Create one string\n// Create one number\n// Print both with console.log\n"
    },
    {
      title: "Operators",
      description: "Operators do math and comparisons. They can add, subtract, and more.",
      task: "Press Run, open the browser console, and add two numbers.",
      exampleCode: "let score = 10 - 2;\n// Operators can change numbers.",
      starterCode: "// Add two numbers\n// Print the answer with console.log\n"
    },
    {
      title: "Functions",
      description: "Functions group code together. They run when called.",
      task: "Press Run, open the browser console, and call a greeting function.",
      exampleCode: "function double(number) {\n  return number * 2;\n}",
      starterCode: "// Create a function\n// Put console.log inside it\n// Call the function\n"
    },
    {
      title: "If statements",
      description: "If statements make decisions. Code runs only when conditions are true.",
      task: "Press Run, open the browser console, and check if age is above 18.",
      exampleCode: "let weather = \"rain\";\n\nif (weather === \"rain\") {\n  // bring an umbrella\n}",
      starterCode: "// Create an age variable\n// Use if to check if age is above 18\n"
    },
    {
      title: "Comparison operators",
      description: "Comparison operators compare values. They return true or false.",
      task: "Press Run, open the browser console, and compare two numbers.",
      exampleCode: "let canPlay = 3 < 9;\n// Comparisons make true or false.",
      starterCode: "// Compare two numbers\n// Print true or false with console.log\n"
    },
    {
      title: "Loops (for, while)",
      description: "Loops repeat code multiple times. They save time and reduce repetition.",
      task: "Press Run, open the browser console, and count from 1 to 5.",
      exampleCode: "for (let i = 0; i < 3; i++) {\n  // repeat something here\n}",
      starterCode: "// Use a loop\n// Print numbers from 1 to 5\n"
    },
    {
      title: "Arrays",
      description: "Arrays store multiple values in one place. They are useful for lists.",
      task: "Press Run, open the browser console, and store favorite games.",
      exampleCode: "let backpack = [];\n// Arrays can hold many items.",
      starterCode: "// Create an array of games\n// Print the array with console.log\n"
    },
    {
      title: "Objects",
      description: "Objects store related information together. They use keys and values.",
      task: "Press Run, open the browser console, and create a player object.",
      exampleCode: "let player = {};\n// Objects can hold details about one thing.",
      starterCode: "// Create a player object\n// Add a name and score\n// Print it with console.log\n"
    },
    {
      title: "Events (click)",
      description: "Events happen when users interact with the page. Click events are very common.",
      task: "Press Run, click the button, and open the browser console.",
      exampleCode: "// A click event runs code after a click.\n// First find an element, then listen for the click.",
      starterCode: "// Select the button\n// Add a click event\n// Change the message text\n",
      htmlCode: "<button id=\"magic-button\">Click Me</button>\n<p id=\"click-message\"></p>"
    },
    {
      title: "DOM basics",
      description: "The DOM lets JavaScript change HTML elements. It connects JS with the webpage.",
      task: "Press Run and change the heading with JavaScript.",
      exampleCode: "// The DOM is the page that JavaScript can change.\n// You can change headings, buttons, and text.",
      starterCode: "// Select the heading\n// Change its text\n",
      htmlCode: "<h1 id=\"main-title\">Old title</h1>"
    },
    {
      title: "querySelector",
      description: "querySelector finds HTML elements. It uses CSS selectors.",
      task: "Press Run, open the browser console, and select a button.",
      exampleCode: "// querySelector can find one element.\n// It uses selectors like .class or #id.",
      starterCode: "// Select the button with querySelector\n// Print it with console.log\n",
      htmlCode: "<button class=\"play-button\">Play</button>"
    },
    {
      title: "Changing text",
      description: "JavaScript can change text on a page. This makes websites dynamic.",
      task: "Press Run and change the paragraph text.",
      exampleCode: "// textContent changes words on the page.\n// Pick an element first.",
      starterCode: "// Select the paragraph\n// Change its text\n",
      htmlCode: "<p id=\"message\">Waiting...</p>"
    },
    {
      title: "Changing styles",
      description: "JavaScript can change CSS styles. This helps create effects and interactions.",
      task: "Press Run and change the background color.",
      exampleCode: "// The style property changes how an element looks.\n// Pick an element first.",
      starterCode: "// Change the page background color with JavaScript\n"
    },
    {
      title: "Input values",
      description: "JavaScript can read user input. Input fields help users enter data.",
      task: "Press Run, type a name, click the button, and open the browser console.",
      exampleCode: "// Inputs have a value.\n// Read the value after the user types.",
      starterCode: "// When the button is clicked,\n// read the input value and console.log it\n",
      htmlCode: "<input id=\"name-input\" placeholder=\"Type your name\">\n<button id=\"show-name\">Show</button>"
    },
    {
      title: "Alerts",
      description: "Alerts show popup messages. They are useful for notifications.",
      task: "Press Run and show a welcome alert.",
      exampleCode: "// alert opens a small popup.\n// Put your message inside the parentheses.",
      starterCode: "// Show a welcome alert\n"
    },
    {
      title: "setTimeout",
      description: "setTimeout runs code after a delay. It works like a timer.",
      task: "Press Run, wait 2 seconds, and open the browser console.",
      exampleCode: "// setTimeout waits before running code.\n// The time is written in milliseconds.",
      starterCode: "// Use setTimeout\n// Print a message after 2 seconds\n"
    },
    {
      title: "setInterval",
      description: "setInterval repeats code over time. It is useful for clocks and counters.",
      task: "Press Run and print numbers every second.",
      exampleCode: "// setInterval repeats code again and again.\n// 1000 milliseconds means 1 second.",
      starterCode: "// Use setInterval\n// Print numbers every second\n"
    },
    {
      title: "Math functions",
      description: "Math functions help with calculations. JavaScript has built-in math tools.",
      task: "Press Run, open the browser console, and generate a random number.",
      exampleCode: "// Math has helpful number tools.\n// random makes a surprise number.",
      starterCode: "// Use the random math tool\n// Print the random number\n"
    },
    {
      title: "String methods",
      description: "String methods change and edit text. They help format words and sentences.",
      task: "Press Run, open the browser console, and make text uppercase.",
      exampleCode: "// Strings are text.\n// String methods can change text.",
      starterCode: "// Create a word\n// Make it uppercase\n// Print the result\n"
    },
    {
      title: "Array methods",
      description: "Array methods help manage lists. They can add, remove, and change items.",
      task: "Press Run, open the browser console, and add a new game to an array.",
      exampleCode: "// Array methods help change lists.\n// One method can add a new item.",
      starterCode: "// Create an array\n// Add a game to it\n// Print the array\n"
    },
    {
      title: "LocalStorage",
      description: "LocalStorage saves data in the browser. The data stays after refreshing the page.",
      task: "Press Run, open the browser console, and save a username.",
      exampleCode: "// localStorage saves small browser data.\n// It uses a key and a value.",
      starterCode: "// Save a username in localStorage\n// Print it with console.log\n"
    },
    {
      title: "Try/Catch (errors)",
      description: "Try/Catch handles errors safely. It prevents apps from crashing.",
      task: "Press Run, open the browser console, and catch a broken function error.",
      exampleCode: "// try runs risky code.\n// catch handles the error if something breaks.",
      starterCode: "// Use try\n// Call a broken function\n// Use catch to print a safe message\n"
    },
    {
      title: "Simple project (to-do app)",
      description: "Projects combine many JavaScript skills together. Building projects improves coding skills.",
      task: "Press Run, add a task, and make it appear on the page.",
      exampleCode: "// A to-do app needs a list.\n// New tasks can be added from an input.",
      starterCode: "// When the button is clicked,\n// create an li\n// add the input text\n// put it inside the list\n",
      htmlCode: "<input id=\"todo-input\" placeholder=\"New task\">\n<button id=\"add-todo\">Add</button>\n<ul id=\"todo-list\"></ul>",
      cssCode: "#todo-list li {\n  color: purple;\n}"
    }
  ];

  const CSS_VALIDATORS = [
    (code) => hasCssSelectorValue(code, ".blue-title", "color", "(green|#008000|rgb\\(\\s*0\\s*,\\s*128\\s*,\\s*0\\s*\\))"),
    (code) => hasCssSelectorValue(code, "#special-button", "background-color|background", "(purple|#800080|rgb\\(\\s*128\\s*,\\s*0\\s*,\\s*128\\s*\\))"),
    (code) => hasCssSelectorValue(code, ".color-box", "background-color|background", "(navy|#000080|rgb\\(\\s*0\\s*,\\s*0\\s*,\\s*128\\s*\\))"),
    (code) => /linear-gradient\s*\([^)]*,[^)]*\)/i.test(code),
    (code) => hasCssSelectorValue(code, ".fancy-heading", "color", "(red|#f00|#ff0000|rgb\\(\\s*255\\s*,\\s*0\\s*,\\s*0\\s*\\))"),
    (code) => hasCssSelectorValue(code, ".clean-text", "font-family", "Georgia"),
    (code) => hasCssSelectorValue(code, ".box-card", "border", "(blue|#00f|#0000ff|rgb\\(\\s*0\\s*,\\s*0\\s*,\\s*255\\s*\\))"),
    (code) => hasCssSelectorValue(code, ".space-button", "padding", "([2-9][0-9]|[1-9][0-9]{2,})px"),
    (code) => hasCssSelectorValue(code, ".border-card", "border", "(green|#008000|rgb\\(\\s*0\\s*,\\s*128\\s*,\\s*0\\s*\\))"),
    (code) => hasCssSelectorValue(code, ".nav-link", "background-color|background", "(blue|#00f|#0000ff|rgb\\(\\s*0\\s*,\\s*0\\s*,\\s*255\\s*\\))"),
    (code) => hasCssSelectorValue(code, ".flex-row div", "background-color|background", "(orange|#ffa500|rgb\\(\\s*255\\s*,\\s*165\\s*,\\s*0\\s*\\))"),
    (code) => hasCssSelectorValue(code, ".center-box button", "background-color|background", "(red|#f00|#ff0000|rgb\\(\\s*255\\s*,\\s*0\\s*,\\s*0\\s*\\))"),
    (code) => hasCssSelectorValue(code, ".gallery div", "background-color|background", "(yellow|#ff0|#ffff00|rgb\\(\\s*255\\s*,\\s*255\\s*,\\s*0\\s*\\))"),
    (code) => hasCssSelectorValue(code, ".small-image", "width", "250px"),
    (code) => hasCssSelectorValue(code, ".badge", "left", "\\d") && !hasCssSelectorValue(code, ".badge", "right", "\\d"),
    (code) => hasCssSelectorValue(code, ".popup", "background-color|background", "(pink|hotpink|#ffc0cb|rgb\\(\\s*255\\s*,\\s*192\\s*,\\s*203\\s*\\))"),
    (code) => /\.hover-button:hover\s*\{[^}]*(background-color|background)\s*:\s*[^;{}]*(green|#008000|rgb\(\s*0\s*,\s*128\s*,\s*0\s*\))/i.test(code),
    (code) => /\.smooth-button:hover\s*\{[^}]*transform\s*:\s*scale\s*\(\s*1\.(0[1-9]|1[0-9])\s*\)/i.test(code),
    (code) => /translateY\s*\(\s*-[3-9][0-9]px\s*\)/i.test(code),
    (code) => hasCssSelectorValue(code, ".responsive-cards div", "background-color|background", "(purple|#800080|rgb\\(\\s*128\\s*,\\s*0\\s*,\\s*128\\s*\\))")
  ];

  const CSS_LESSONS = CSS_LESSON_DATA.map((lesson, index) => ({
    ...lesson,
    validate: CSS_VALIDATORS[index]
  }));

  const JS_VALIDATORS = [
    (code) => hasJs(code, /console\.log\s*\(\s*["']Hello["']\s*\)/i),
    (code) => hasJs(code, /\b(let|const)\s+\w+\s*=\s*["'][^"']+["']/),
    (code) => hasJs(code, /\b(const|let)\s+\w+\s*=\s*["'][^"']+["']/) && hasJs(code, /\b(const|let)\s+\w+\s*=\s*\d+/),
    (code) => hasJs(code, /\d+\s*\+\s*\d+/) && hasJs(code, /console\.log\s*\(/),
    (code) => hasJs(code, /function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*console\.log\s*\(/) && hasJs(code, /\w+\s*\(\s*\)\s*;?/),
    (code) => hasJs(code, /if\s*\([^)]*age[^)]*>\s*18[^)]*\)/i),
    (code) => hasJs(code, /(===|==|!==|!=|>=|<=|>|<)/) && hasJs(code, /console\.log\s*\(/),
    (code) => hasJs(code, /(for\s*\([^)]*\)|while\s*\([^)]*\))/) && hasJs(code, /5/),
    (code) => hasJs(code, /\[[\s\S]*,[\s\S]*,[\s\S]*\]/),
    (code) => hasJs(code, /\b(const|let)\s+\w+\s*=\s*\{[\s\S]*:[\s\S]*\}/),
    (code) => hasJs(code, /addEventListener\s*\(\s*["']click["']/) && hasJs(code, /(textContent|innerText|innerHTML)\s*=/),
    (code) => hasJs(code, /(textContent|innerText|innerHTML)\s*=/) && hasJs(code, /querySelector\s*\(/),
    (code) => hasJs(code, /querySelector\s*\(/) && hasJs(code, /console\.log\s*\(/),
    (code) => hasJs(code, /(textContent|innerText|innerHTML)\s*=/),
    (code) => hasJs(code, /(body|documentElement)\.style\.background(Color)?\s*=/),
    (code) => hasJs(code, /\.value/) && hasJs(code, /console\.log\s*\(/),
    (code) => hasJs(code, /alert\s*\(/),
    (code) => hasJs(code, /setTimeout\s*\(/),
    (code) => hasJs(code, /setInterval\s*\(/),
    (code) => hasJs(code, /Math\.random\s*\(/),
    (code) => hasJs(code, /\.toUpperCase\s*\(/),
    (code) => hasJs(code, /\.push\s*\(/),
    (code) => hasJs(code, /localStorage\.setItem\s*\(/),
    (code) => hasJs(code, /try\s*\{[\s\S]*\}\s*catch\s*\(/),
    (code) => hasJs(code, /createElement\s*\(/) && hasJs(code, /append|appendChild/)
  ];

  const JS_LESSONS = JS_LESSON_DATA.map((lesson, index) => ({
    ...lesson,
    validate: JS_VALIDATORS[index]
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
  const hintButton = document.getElementById("hint-code-btn");
  const lessonLabel = document.getElementById("lesson-label");
  const lessonTitle = document.getElementById("lesson-title");
  const lessonDescription = document.getElementById("lesson-description");
  const lessonExampleCode = document.getElementById("lesson-example-code");
  const lessonHintBox = document.getElementById("lesson-hint-box");
  const lessonHintCode = document.getElementById("lesson-hint-code");
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
    !(hintButton instanceof HTMLButtonElement) ||
    !(lessonLabel instanceof HTMLElement) ||
    !(lessonTitle instanceof HTMLElement) ||
    !(lessonDescription instanceof HTMLElement) ||
    !(lessonExampleCode instanceof HTMLElement) ||
    !(lessonHintBox instanceof HTMLElement) ||
    !(lessonHintCode instanceof HTMLElement) ||
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
  const LESSON_CODES_KEY = currentTrack === "js" ? "codelearn_js_lesson_codes_v2" : `codelearn_${currentTrack}_lesson_codes`;
  const PASSED_TASKS_KEY = `codelearn_${currentTrack}_passed_tasks`;
  const RUN_PAYLOAD_KEY = "codelearn_run_payload";
  const SIDE_LABELS = { html: "HTML", css: "CSS", js: "JavaScript" };
  const primarySide = currentTrack;
  let currentEditorSide = primarySide;

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

  editorSwitcher.classList.add("active");
  editorSwitcher.innerHTML = ["html", "css", "js"].map((side) => `
    <button type="button" class="editor-side-btn ${side === primarySide ? "active" : ""}" data-editor-side="${side}">&#8226; ${SIDE_LABELS[side]}</button>
  `).join("");

  lessonList.innerHTML = LESSONS.map((lesson, index) => `<li data-lesson-index="${index}">${lesson.title}</li>`).join("");
  const lessonItems = Array.from(lessonList.querySelectorAll("li[data-lesson-index]"));

  const defaultLessonEntry = (index) => {
    return {
      html: currentTrack === "html" ? LESSONS[index].starterCode : (LESSONS[index].htmlCode || ""),
      css: currentTrack === "css" ? LESSONS[index].starterCode : (LESSONS[index].cssCode || ""),
      js: currentTrack === "js" ? LESSONS[index].starterCode : ""
    };
  };

  const ensureLessonEntry = (index) => {
    const existing = lessonCodes[index];
    if (existing && typeof existing === "object") {
      const savedHtml = typeof existing.html === "string" ? existing.html : "";
      const savedCss = typeof existing.css === "string" ? existing.css : "";
      const savedJs = typeof existing.js === "string" ? existing.js : "";
      const savedPrimary = typeof existing.primary === "string" ? existing.primary : "";
      const usesOldPlaceholder = savedHtml.trim() === "<div class=\"preview-box\">Preview target</div>";
      const usesOldCssStarter = savedPrimary.trim() === "/* Write your CSS here */";
      const usesOldJsStarter = savedJs.trim() === "// Write your JavaScript here" || savedPrimary.trim() === "// Write your JavaScript here";
      return {
        html: savedHtml && !usesOldPlaceholder ? savedHtml : (currentTrack === "html" ? LESSONS[index].starterCode : (LESSONS[index].htmlCode || "")),
        css: savedCss || (currentTrack === "css" && savedPrimary && !usesOldCssStarter ? savedPrimary : "") || (currentTrack === "css" ? LESSONS[index].starterCode : (LESSONS[index].cssCode || "")),
        js: savedJs && !usesOldJsStarter ? savedJs : (currentTrack === "js" && savedPrimary && !usesOldJsStarter ? savedPrimary : "") || (currentTrack === "js" ? LESSONS[index].starterCode : "")
      };
    }
    if (typeof existing === "string") {
      const usesOldStringStarter = existing.trim() === "// Write your JavaScript here" || existing.trim() === "/* Write your CSS here */";
      return {
        html: currentTrack === "html" && !usesOldStringStarter ? existing : (currentTrack === "html" ? LESSONS[index].starterCode : (LESSONS[index].htmlCode || "")),
        css: currentTrack === "css" && !usesOldStringStarter ? existing : (currentTrack === "css" ? LESSONS[index].starterCode : (LESSONS[index].cssCode || "")),
        js: currentTrack === "js" && !usesOldStringStarter ? existing : (currentTrack === "js" ? LESSONS[index].starterCode : "")
      };
    }
    return defaultLessonEntry(index);
  };

  const getCurrentEditorValue = (index) => {
    const entry = ensureLessonEntry(index);
    return entry[currentEditorSide] || "";
  };

  const getLessonHint = (lesson) => {
    const starterLines = String(lesson.starterCode || "")
      .split("\n")
      .map((line) => line.replace(/^\/\/\s?/, "").trim())
      .filter(Boolean);

    if (starterLines.length > 0 && starterLines.every((line) => !/[{};=]/.test(line))) {
      return starterLines.slice(0, 3).join("\n");
    }

    const task = String(lesson.task || "").replace(/^Press Run,?\s*/i, "").trim();
    if (currentTrack === "js") {
      return `Use JavaScript to ${task.charAt(0).toLowerCase()}${task.slice(1)}`;
    }
    if (currentTrack === "css") {
      return `Look for the selector that matches this lesson, then change one CSS property.\nTask clue: ${task}`;
    }
    return `Use the HTML tag named in the task.\nTask clue: ${task}`;
  };

  const persistState = () => {
    localStorage.setItem(LESSON_INDEX_KEY, String(currentLessonIndex));
    localStorage.setItem(LESSON_CODES_KEY, JSON.stringify(lessonCodes));
    localStorage.setItem(PASSED_TASKS_KEY, JSON.stringify(passedTasks));
    const entry = ensureLessonEntry(currentLessonIndex);
    const primaryCode = entry[primarySide] || "";
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

  const saveCurrentEditorSide = () => {
    const entry = ensureLessonEntry(currentLessonIndex);
    entry[currentEditorSide] = editor.value;
    lessonCodes[currentLessonIndex] = entry;
  };

  const setEditorSide = (side) => {
    if (!["html", "css", "js"].includes(side)) {
      return;
    }
    currentEditorSide = side;
    const entry = ensureLessonEntry(currentLessonIndex);
    editor.value = entry[currentEditorSide] || "";
    editorLabel.textContent = `Your ${SIDE_LABELS[currentEditorSide]}`;
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
    lessonHintCode.textContent = getLessonHint(lesson);
    lessonHintBox.classList.add("hidden");
    hintButton.textContent = "Hint";
    lessonCodes[currentLessonIndex] = ensureLessonEntry(currentLessonIndex);
    setEditorSide(primarySide);
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
    saveCurrentEditorSide();
    passedTasks[currentLessonIndex] = false;
    updateCheckStatus("neutral", "Code changed. Press Run to check again.");
    updateDoneClasses();
    updateNextButtonState();
    persistState();
  });

  runButton.addEventListener("click", () => {
    saveCurrentEditorSide();
    const currentLesson = LESSONS[currentLessonIndex];
    const entry = ensureLessonEntry(currentLessonIndex);
    const primaryCode = entry[primarySide] || "";
    const htmlCode = entry.html || "";
    const cssCode = entry.css || "";
    const jsCode = entry.js || "";
    const userCode = currentTrack === "html" ? decodeHtml(primaryCode) : primaryCode;
    const isValid = currentLesson.validate(userCode);
    passedTasks[currentLessonIndex] = isValid;
    if (isValid) {
      updateCheckStatus("pass", "Great job! Task completed correctly. Next is unlocked.");
      updateNextButtonState();
      localStorage.setItem(RUN_PAYLOAD_KEY, JSON.stringify({
        track: currentTrack,
        html: htmlCode,
        css: cssCode,
        js: jsCode,
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
    saveCurrentEditorSide();
    setCurrentLesson(currentLessonIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    saveCurrentEditorSide();
    setCurrentLesson(currentLessonIndex + 1);
  });

  resetButton.addEventListener("click", () => {
    lessonCodes[currentLessonIndex] = defaultLessonEntry(currentLessonIndex);
    setEditorSide(primarySide);
    passedTasks[currentLessonIndex] = false;
    updateCheckStatus("neutral", "Code reset. Press Run to validate.");
    updateDoneClasses();
    updateNextButtonState();
    persistState();
  });

  hintButton.addEventListener("click", () => {
    const isHidden = lessonHintBox.classList.toggle("hidden");
    hintButton.textContent = isHidden ? "Hint" : "Hide Hint";
  });

  lessonItems.forEach((item) => {
    item.addEventListener("click", () => {
      saveCurrentEditorSide();
      const selectedIndex = Number(item.dataset.lessonIndex);
      setCurrentLesson(selectedIndex);
    });
  });

  editorSwitcher.querySelectorAll(".editor-side-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const side = button.dataset.editorSide;
      if (!side || !["html", "css", "js"].includes(side)) {
        return;
      }
      saveCurrentEditorSide();
      setEditorSide(side);
      persistState();
    });
  });

  const legacyCode = localStorage.getItem(CODE_STORAGE_KEY);
  if (legacyCode && currentTrack !== "js" && !lessonCodes[currentLessonIndex]) {
    const entry = defaultLessonEntry(currentLessonIndex);
    const oldStarter = legacyCode.trim() === "// Write your JavaScript here" || legacyCode.trim() === "/* Write your CSS here */";
    if (!oldStarter) {
      entry[primarySide] = legacyCode;
    }
    lessonCodes[currentLessonIndex] = entry;
  }

  setupAutoClose(editor);
  setCurrentLesson(currentLessonIndex);
})();
>>>>>>> 2807f38 (Git start)
