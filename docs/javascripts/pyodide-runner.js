/**
 * In-Browser Python Execution with Pyodide + NumPy
 * Supports running, editing, and viewing output directly on lesson pages.
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

function initPyodideBlocks() {
  // Find all python code blocks rendered by pymdownx
  const pyBlocks = document.querySelectorAll(".language-python.highlight, div.highlight > pre > code.language-python");
  
  document.querySelectorAll(".language-python").forEach(el => {
    // Find closest container highlight div
    const container = el.classList.contains("highlight") ? el : el.closest(".highlight");
    if (!container || container.dataset.pyodideReady === "true") return;
    
    // Ignore blocks that explicitly say not to run, or are in excluded contexts if any
    const codeEl = container.querySelector("code");
    if (!codeEl) return;
    
    container.dataset.pyodideReady = "true";

    // Create Action Bar
    const bar = document.createElement("div");
    bar.className = "pyodide-toolbar";
    
    const runBtn = document.createElement("button");
    runBtn.type = "button";
    runBtn.className = "pyodide-btn pyodide-run-btn";
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

    // Create Output Box
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

    // Edit button click handler
    let isEditing = false;
    editBtn.addEventListener("click", () => {
      isEditing = !isEditing;
      if (isEditing) {
        codeEl.contentEditable = "true";
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
    runBtn.addEventListener("click", async () => {
      const code = codeEl.innerText || codeEl.textContent;
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
    });
  });
}

// Subscribe to Material for MkDocs page navigation observable
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    initPyodideBlocks();
  });
} else {
  document.addEventListener("DOMContentLoaded", initPyodideBlocks);
}
