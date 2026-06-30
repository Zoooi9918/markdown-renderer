/**
 * demo.js — Demo site wiring.
 *
 * Loads the renderer from CDN, wires the editor → preview pipeline,
 * theme toggle, and sample file loader.
 */

(function () {
  "use strict";

  const editor = document.getElementById("editor");
  const preview = document.getElementById("preview");
  const sampleSelect = document.getElementById("sample-select");
  const themeSelect = document.getElementById("theme-select");

  // Create renderer with injectStyles so CSS is baked in
  const renderer = new MarkdownRenderer({ injectStyles: true });

  let debounceTimer = null;

  function render() {
    const md = editor.value;
    renderer.renderInto(preview, md).catch(function (err) {
      preview.innerHTML = "<pre style='color:red'>" + escapeHtml(err.toString()) + "</pre>";
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Debounced render on input
  editor.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(render, 200);
  });

  // Theme toggle
  themeSelect.addEventListener("change", function () {
    preview.setAttribute("data-theme", this.value);
  });

  // Sample loader
  sampleSelect.addEventListener("change", function () {
    const sample = this.value;
    fetch("samples/" + sample + ".md")
      .then(function (res) { return res.text(); })
      .then(function (text) {
        editor.value = text;
        render();
      })
      .catch(function (err) {
        editor.value = "# Error\n\nCould not load sample: " + err.message;
        render();
      });
  });

  // Initial load: load the first sample
  (function init() {
    const sample = sampleSelect.value;
    fetch("samples/" + sample + ".md")
      .then(function (res) { return res.text(); })
      .then(function (text) {
        editor.value = text;
        render();
      })
      .catch(function () {
        editor.value = "# markdown-renderer\n\nStart typing markdown here...";
        render();
      });
  })();
})();
