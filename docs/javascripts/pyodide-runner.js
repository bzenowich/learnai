/**
 * In-Browser Python Execution with Pyodide + NumPy
 * Supports running, editing, and viewing output directly on lesson pages.
 * Handles both standard lesson code blocks and interactive exercise workspaces.
 */

let pyodideReadyPromise = null;

async function getPyodideInstance(statusCallback) {
  if (!pyodideReadyPromise) {
    if (typeof loadPyodide === "undefined") {
      throw new Error("Pyodide CDN script is not loaded.");
    }
    statusCallback("Loading Python runtime (Pyodide)...");
    pyodideReadyPromise = (async () => {
      const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
      });
      statusCallback("Loading NumPy...");
      await pyodide.loadPackage(["numpy"]);
      statusCallback("Ready!");
      return pyodide;
    })();
  }
  return pyodideReadyPromise;
}

/**
 * Execute Python code in Pyodide, capturing stdout and stderr.
 */
async function executePythonScript(code, runBtn, statusSpan, outputContainer, outputPre) {
  runBtn.disabled = true;
  statusSpan.textContent = "Running...";
  outputContainer.style.display = "block";
  outputPre.className = "pyodide-output pyodide-running";
  outputPre.textContent = "Initializing Python execution...";

  const startTime = performance.now();
  try {
    const pyodide = await getPyodideInstance(msg => {
      outputPre.textContent = msg;
    });

    let stdoutText = "";
    let stderrText = "";
    pyodide.setStdout({ batched: (str) => { stdoutText += str + "\n"; } });
    pyodide.setStderr({ batched: (str) => { stderrText += str + "\n"; } });

    await pyodide.runPythonAsync(code);

    const duration = Math.round(performance.now() - startTime);
    let finalOut = "";
    if (stdoutText) finalOut += stdoutText;
    if (stderrText) finalOut += (finalOut ? "\n" : "") + "[stderr]\n" + stderrText;
    if (!finalOut) finalOut = "(Code finished with no output)";

    outputPre.className = "pyodide-output pyodide-success";
    outputPre.textContent = finalOut;
    statusSpan.textContent = `Completed in ${duration}ms`;
  } catch (err) {
    outputPre.className = "pyodide-output pyodide-error";
    outputPre.textContent = err.toString();
    statusSpan.textContent = "Error during execution";
  } finally {
    runBtn.disabled = false;
  }
}

/**
 * Enable code editing ergonomics: Tab for 4-space indent, Ctrl/Cmd+Enter to run, plain text paste.
 */
function setupEditorErgonomics(codeEl, runBtn) {
  codeEl.addEventListener("keydown", (e) => {
    if (codeEl.getAttribute("contenteditable") !== "true") return;

    if (e.key === "Tab") {
      e.preventDefault();
      document.execCommand("insertText", false, "    ");
    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runBtn.click();
    }
  });

  codeEl.addEventListener("paste", (e) => {
    if (codeEl.getAttribute("contenteditable") !== "true") return;
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand("insertText", false, text);
  });
}

/**
 * Check if an element is under an Exercises section.
 */
function isUnderExercises(el) {
  const exercisesHeader = document.querySelector("#exercises, h2#exercises, h3#exercises");
  if (!exercisesHeader) return false;
  return (exercisesHeader.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
}

/**
 * Setup an interactive exercise workspace before the solution details.
 * Allows user to enter their own code without seeing the solution, and provides
 * a button to overwrite the editor with the suggested solution.
 */
function setupExerciseWorkspace(container, codeEl, solutionDetails) {
  const solutionCode = (codeEl.innerText || codeEl.textContent).trim();
  const defaultStarter = "# Write your code here\n";

  // Mark solution container as ready so it doesn't get duplicate Pyodide controls
  container.dataset.pyodideReady = "true";

  // Create exercise workspace container
  const workspace = document.createElement("div");
  workspace.className = "pyodide-exercise-workspace";
  workspace.dataset.pyodideReady = "true";

  // Action Toolbar
  const toolbar = document.createElement("div");
  toolbar.className = "pyodide-toolbar pyodide-exercise-toolbar";

  const runBtn = document.createElement("button");
  runBtn.type = "button";
  runBtn.className = "pyodide-btn pyodide-run-btn";
  runBtn.title = "Run code in browser (Ctrl+Enter)";
  runBtn.innerHTML = '<span class="pyodide-btn-icon">▶</span> Run in Browser';

  const solutionBtn = document.createElement("button");
  solutionBtn.type = "button";
  solutionBtn.className = "pyodide-btn pyodide-solution-btn";
  solutionBtn.title = "Replace editor code with the suggested solution";
  solutionBtn.innerHTML = '<span class="pyodide-btn-icon">💡</span> Overwrite with Solution';

  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.className = "pyodide-btn pyodide-reset-btn";
  resetBtn.title = "Reset code to starter template";
  resetBtn.innerHTML = '<span class="pyodide-btn-icon">↺</span> Reset';

  const statusSpan = document.createElement("span");
  statusSpan.className = "pyodide-status";
  statusSpan.textContent = "Ready";

  toolbar.appendChild(runBtn);
  toolbar.appendChild(solutionBtn);
  toolbar.appendChild(resetBtn);
  toolbar.appendChild(statusSpan);

  // Editable Code Editor Container
  const editorContainer = document.createElement("div");
  editorContainer.className = "language-python highlight pyodide-exercise-container";
  editorContainer.dataset.pyodideReady = "true";


  const preEl = document.createElement("pre");
  const spanEl = document.createElement("span");
  const exerciseCodeEl = document.createElement("code");
  exerciseCodeEl.className = "language-python pyodide-editable pyodide-exercise-code";
  exerciseCodeEl.contentEditable = "true";
  exerciseCodeEl.spellcheck = false;
  exerciseCodeEl.textContent = defaultStarter;

  preEl.appendChild(spanEl);
  preEl.appendChild(exerciseCodeEl);
  editorContainer.appendChild(preEl);

  // Output Box
  const outputContainer = document.createElement("div");
  outputContainer.className = "pyodide-output-wrapper";
  outputContainer.style.display = "none";

  const outputHeader = document.createElement("div");
  outputHeader.className = "pyodide-output-header";
  outputHeader.innerHTML = '<span>Output</span>';

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "pyodide-clear-btn";
  clearBtn.textContent = "Clear";
  clearBtn.onclick = () => {
    outputContainer.style.display = "none";
    outputPre.textContent = "";
  };
  outputHeader.appendChild(clearBtn);

  const outputPre = document.createElement("pre");
  outputPre.className = "pyodide-output";

  outputContainer.appendChild(outputHeader);
  outputContainer.appendChild(outputPre);

  // Assemble Workspace
  workspace.appendChild(toolbar);
  workspace.appendChild(editorContainer);
  workspace.appendChild(outputContainer);

  // Insert workspace directly before solution details
  solutionDetails.parentNode.insertBefore(workspace, solutionDetails);

  // Setup ergonomics (Tab, Ctrl+Enter, paste)
  setupEditorErgonomics(exerciseCodeEl, runBtn);

  // Run handler
  runBtn.addEventListener("click", () => {
    const code = exerciseCodeEl.innerText || exerciseCodeEl.textContent;
    executePythonScript(code, runBtn, statusSpan, outputContainer, outputPre);
  });

  // Overwrite with Solution handler
  function overwriteWithSolution() {
    const current = (exerciseCodeEl.innerText || exerciseCodeEl.textContent).trim();
    if (current && current !== defaultStarter.trim() && current !== solutionCode) {
      if (!window.confirm("This will overwrite your current code with the suggested solution. Continue?")) {
        return;
      }
    }
    exerciseCodeEl.textContent = solutionCode + "\n";
    solutionDetails.open = true;
    statusSpan.textContent = "Loaded suggested solution";
    exerciseCodeEl.focus();
  }

  solutionBtn.addEventListener("click", overwriteWithSolution);

  // Reset handler
  resetBtn.addEventListener("click", () => {
    const current = (exerciseCodeEl.innerText || exerciseCodeEl.textContent).trim();
    if (current && current !== defaultStarter.trim()) {
      if (!window.confirm("Reset editor to starter template?")) {
        return;
      }
    }
    exerciseCodeEl.textContent = defaultStarter;
    outputContainer.style.display = "none";
    outputPre.textContent = "";
    statusSpan.textContent = "Reset to starter code";
  });

  // Add header banner above solution block inside solutionDetails
  const solutionHeader = document.createElement("div");
  solutionHeader.className = "pyodide-solution-header";
  solutionHeader.innerHTML = '<span>Suggested Solution</span>';

  const copyToEditorBtn = document.createElement("button");
  copyToEditorBtn.type = "button";
  copyToEditorBtn.className = "pyodide-btn pyodide-load-btn";
  copyToEditorBtn.title = "Load this suggested solution into the editor above";
  copyToEditorBtn.innerHTML = '<span class="pyodide-btn-icon">💡</span> Overwrite Editor with Solution';
  copyToEditorBtn.addEventListener("click", overwriteWithSolution);

  solutionHeader.appendChild(copyToEditorBtn);
  container.parentNode.insertBefore(solutionHeader, container);
}

/**
 * Setup standard lesson code blocks with Run and Edit buttons.
 */
function setupLessonBlock(container, codeEl) {
  container.dataset.pyodideReady = "true";

  // Action Bar
  const bar = document.createElement("div");
  bar.className = "pyodide-toolbar";

  const runBtn = document.createElement("button");
  runBtn.type = "button";
  runBtn.className = "pyodide-btn pyodide-run-btn";
  runBtn.title = "Run code in browser (Ctrl+Enter)";
  runBtn.innerHTML = '<span class="pyodide-btn-icon">▶</span> Run in Browser';

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "pyodide-btn pyodide-edit-btn";
  editBtn.innerHTML = '<span class="pyodide-btn-icon">✏</span> Edit';

  const statusSpan = document.createElement("span");
  statusSpan.className = "pyodide-status";

  bar.appendChild(runBtn);
  bar.appendChild(editBtn);
  bar.appendChild(statusSpan);

  // Output Box
  const outputContainer = document.createElement("div");
  outputContainer.className = "pyodide-output-wrapper";
  outputContainer.style.display = "none";

  const outputHeader = document.createElement("div");
  outputHeader.className = "pyodide-output-header";
  outputHeader.innerHTML = '<span>Output</span>';

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "pyodide-clear-btn";
  clearBtn.textContent = "Clear";
  clearBtn.onclick = () => {
    outputContainer.style.display = "none";
    outputPre.textContent = "";
  };
  outputHeader.appendChild(clearBtn);

  const outputPre = document.createElement("pre");
  outputPre.className = "pyodide-output";

  outputContainer.appendChild(outputHeader);
  outputContainer.appendChild(outputPre);

  // Insert toolbar before code block and output container after it
  container.parentNode.insertBefore(bar, container);
  container.parentNode.insertBefore(outputContainer, container.nextSibling);

  // Setup ergonomics (Tab, Ctrl+Enter, paste)
  setupEditorErgonomics(codeEl, runBtn);

  // Edit button click handler
  let isEditing = false;
  editBtn.addEventListener("click", () => {
    isEditing = !isEditing;
    if (isEditing) {
      codeEl.contentEditable = "true";
      codeEl.spellcheck = false;
      codeEl.classList.add("pyodide-editable");
      editBtn.innerHTML = '<span class="pyodide-btn-icon">🔒</span> Lock Code';
      codeEl.focus();
    } else {
      codeEl.contentEditable = "false";
      codeEl.classList.remove("pyodide-editable");
      editBtn.innerHTML = '<span class="pyodide-btn-icon">✏</span> Edit';
    }
  });

  // Run button click handler
  runBtn.addEventListener("click", () => {
    const code = codeEl.innerText || codeEl.textContent;
    executePythonScript(code, runBtn, statusSpan, outputContainer, outputPre);
  });
}

function initPyodideBlocks() {
  document.querySelectorAll(".language-python").forEach(el => {
    // Ignore any code elements inside already constructed exercise workspaces
    if (el.closest(".pyodide-exercise-workspace")) return;

    // Find closest container highlight div
    const container = el.classList.contains("highlight") ? el : el.closest(".highlight");
    if (!container || container.dataset.pyodideReady === "true") return;

    const codeEl = container.querySelector("code");
    if (!codeEl) return;

    // Check if this block belongs to an exercise solution inside <details>
    const details = container.closest("details");
    const summary = details ? details.querySelector("summary") : null;
    const isExerciseSolution = details && (
      (summary && /solution/i.test(summary.textContent)) ||
      isUnderExercises(details)
    );

    if (isExerciseSolution) {
      setupExerciseWorkspace(container, codeEl, details);
    } else {
      setupLessonBlock(container, codeEl);
    }
  });
}

// Initialize on DOM load and subscribe to Material for MkDocs page navigation observable
function setupInit() {
  if (typeof document$ !== "undefined") {
    document$.subscribe(() => {
      initPyodideBlocks();
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPyodideBlocks);
  } else {
    initPyodideBlocks();
  }
}
setupInit();

