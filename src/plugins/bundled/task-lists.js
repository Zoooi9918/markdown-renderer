/**
 * @module plugins/bundled/task-lists
 * @implements {LazyPlugin}
 */
import markdownItTaskLists from "markdown-it-task-lists";

export default {
  id: "task-lists",
  provides: ["task-list", "gfm-task"],
  bundled: true,
  options: { enabled: true },
  apply(md, options) {
    md.use(markdownItTaskLists, options || this.options);
  },
  load() {
    return Promise.resolve(markdownItTaskLists);
  },
};
