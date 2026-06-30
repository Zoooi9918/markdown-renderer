/**
 * @module plugins/bundled/ins
 * @implements {LazyPlugin}
 */
import markdownItIns from "markdown-it-ins";

export default {
  id: "ins",
  provides: ["ins"],
  bundled: true,
  options: {},
  apply(md, options = {}) {
    md.use(markdownItIns, options);
  },
  load() {
    return Promise.resolve(markdownItIns);
  },
};
