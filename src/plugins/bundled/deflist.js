/**
 * @module plugins/bundled/deflist
 * @implements {LazyPlugin}
 */
import markdownItDeflist from "markdown-it-deflist";

export default {
  id: "deflist",
  provides: ["definition-list"],
  bundled: true,
  options: {},
  apply(md, options = {}) {
    md.use(markdownItDeflist, options);
  },
  load() {
    return Promise.resolve(markdownItDeflist);
  },
};
