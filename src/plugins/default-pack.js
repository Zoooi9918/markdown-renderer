/**
 * @module plugins/default-pack
 * Returns the default array of bundled plugins.
 */
import {
  markPlugin,
  subPlugin,
  supPlugin,
  insPlugin,
  emojiPlugin,
  footnotePlugin,
  taskListsPlugin,
  deflistPlugin,
} from "./bundled/index.js";

/**
 * Get the default plugin pack.
 * @returns {LazyPlugin[]} Array of 8 bundled plugins in deterministic order
 */
export function getDefaultPack() {
  return [
    markPlugin,
    subPlugin,
    supPlugin,
    insPlugin,
    emojiPlugin,
    footnotePlugin,
    taskListsPlugin,
    deflistPlugin,
  ];
}
