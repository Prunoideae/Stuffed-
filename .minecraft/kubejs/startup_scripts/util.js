//priority: 9


/**
 * 
 * @param {string} name 
 * @param {dev.latvian.mods.rhino.mod.util.color.Color} color 
 */
function NameColorHolder(name, color) {
    this.name = name
    this.color = color
}

/**
 * 
 * @param {string} prefix 
 */
function PrefixedColoredItems(prefix) {
    this.prefix = prefix
    this.members = []

    /**
     * 
     * @param {string} name 
     * @param {dev.latvian.mods.rhino.mod.util.color.Color} color 
     */
    this.addItem = function (name, color) {
        this.members.push(new NameColorHolder(name, color))
        return this
    }
}