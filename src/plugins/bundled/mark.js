/**
 * @module plugins/bundled/mark
 * @implements {LazyPlugin}
 */
import markdownItMark from "markdown-it-mark";

export default {
  id: "mark",
  provides: ["mark", "highlight-syntax"],
  bundled: true,
  options: {},
  apply(md, options = {}) {
    md.use(markdownItMark, options);
  },
  load() {
    return Promise.resolve(markdownItMark);
  },
};
