/**
 * LazyPlugin type definitions.
 *
 * All plugin wrappers (bundled or lazy-loaded) conform to this shape.
 * The interface is designed so that Phase 4 heavy-load plugins (mermaid,
 * katex, highlight.js) drop in without changing the registry or renderer.
 *
 * @module types
 */

/**
 * @typedef {Object} LazyPlugin
 * @property {string} id           Unique plugin id (kebab-case)
 * @property {string[]} provides   Capability tags (e.g., ["mark","highlight","sub"])
 * @property {string} [version]    Optional plugin/library version
 * @property {boolean} [bundled]   true if shipped inside main bundle, false if loaded from CDN
 * @property {() => Promise<Function>} load   Returns a markdown-it plugin factory
 * @property {(md: any, options?: Object) => void} [apply]
 *           Optional shortcut for bundled plugins — runs synchronously.
 * @property {Object} [options]    Default options forwarded to the plugin
 */
