/**
 * PluginRegistry — manages a set of LazyPlugin objects.
 *
 * Provides registration, lookup, capability search, and batch
 * application of bundled plugins to a markdown-it instance.
 *
 * @module plugins/registry
 */

/**
 * Internal no-op logger. Replace with a real logger if debug output is needed.
 * @param {...*} _args
 */
function noopLogger(..._args) {}

/**
 * @typedef {Object} PluginInfo
 * @property {string} id
 * @property {string[]} provides
 * @property {boolean} [bundled]
 */

/**
 * Manages a collection of LazyPlugin objects.
 */
export class PluginRegistry {
  /**
   * Creates a PluginRegistry.
   * @param {LazyPlugin[]} [initialPlugins] - Initial plugins to register
   */
  constructor(initialPlugins = []) {
    /** @type {Map<string, LazyPlugin>} */
    this._plugins = new Map();
    /** @type {string[]} */
    this._deferred = [];
    for (const plugin of initialPlugins) {
      this.register(plugin);
    }
  }

  /**
   * Register a plugin.
   * @param {LazyPlugin} plugin
   */
  register(plugin) {
    this._plugins.set(plugin.id, plugin);
  }

  /**
   * Unregister a plugin by id.
   * @param {string} id
   * @returns {boolean} true if the plugin was removed
   */
  unregister(id) {
    return this._plugins.delete(id);
  }

  /**
   * Get a plugin by id.
   * @param {string} id
   * @returns {LazyPlugin|undefined}
   */
  getById(id) {
    return this._plugins.get(id);
  }

  /**
   * Find plugins that provide a capability.
   * @param {string} cap
   * @returns {LazyPlugin[]}
   */
  getByCapability(cap) {
    const result = [];
    for (const plugin of this._plugins.values()) {
      if (plugin.provides.includes(cap)) {
        result.push(plugin);
      }
    }
    return result;
  }

  /**
   * Check if a plugin is registered.
   * @param {string} id
   * @returns {boolean}
   */
  has(id) {
    return this._plugins.has(id);
  }

  /**
   * List all plugins as plain objects.
   * @returns {PluginInfo[]}
   */
  list() {
    const result = [];
    for (const plugin of this._plugins.values()) {
      result.push({
        id: plugin.id,
        provides: plugin.provides,
        bundled: plugin.bundled,
      });
    }
    return result;
  }

  /**
   * Apply all plugins that have a sync apply() method to a markdown-it instance.
   * Plugins without apply are skipped and recorded as deferred.
   * @param {MarkdownIt} md - The markdown-it instance
   * @param {Object<string, Object>} [optionsById] - Per-plugin option overrides
   * @param {Function} [logger] - Optional logger (defaults to no-op)
   */
  applyAll(md, optionsById = {}, logger = noopLogger) {
    this._deferred = [];
    for (const plugin of this._plugins.values()) {
      if (typeof plugin.apply === "function") {
        const opts = optionsById[plugin.id] || plugin.options || {};
        plugin.apply(md, opts);
      } else {
        this._deferred.push(plugin.id);
        logger(`[registry] deferred plugin: ${plugin.id}`);
      }
    }
  }

  /**
   * Get the list of plugin ids that were skipped by the last applyAll call.
   * @returns {string[]}
   */
  getDeferred() {
    return [...this._deferred];
  }
}
