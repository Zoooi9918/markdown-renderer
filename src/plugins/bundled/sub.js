/**
 * @module plugins/bundled/sub
 * @implements {LazyPlugin}
 */
import markdownItSub from "markdown-it-sub";

export default {
  id: "sub",
  provides: ["sub"],
  bundled: true,
  options: {},
  apply(md, options = {}) {
    md.use(markdownItSub, options);
  },
  load() {
    return Promise.resolve(markdownItSub);
  },
};
