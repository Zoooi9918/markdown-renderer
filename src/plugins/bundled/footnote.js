/**
 * @module plugins/bundled/footnote
 * @implements {LazyPlugin}
 */
import markdownItFootnote from "markdown-it-footnote";

export default {
  id: "footnote",
  provides: ["footnote"],
  bundled: true,
  options: {},
  apply(md, options = {}) {
    md.use(markdownItFootnote, options);
  },
  load() {
    return Promise.resolve(markdownItFootnote);
  },
};
