/**
 * @module plugins/bundled/sup
 * @implements {LazyPlugin}
 */
import markdownItSup from "markdown-it-sup";

export default {
  id: "sup",
  provides: ["sup"],
  bundled: true,
  options: {},
  apply(md, options = {}) {
    md.use(markdownItSup, options);
  },
  load() {
    return Promise.resolve(markdownItSup);
  },
};
