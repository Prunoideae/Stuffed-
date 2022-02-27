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
    this.handler = undefined

    /**
     * 
     * @param {string} name 
     * @param {dev.latvian.mods.rhino.mod.util.color.Color} color 
     */
    this.addItem = function (name, color) {
        this.members.push(new NameColorHolder(name, color))
        return this
    }

    /**
     * 
     * @param {function (dev.latvian.mods.kubejs.item.ItemBuilder):void} handler 
     */
    this.appendHandler = function (handler) {
        this.handler = handler
        return this
    }
}


/**
 * 
 * @param {string} food 
 * @param {number} hunger 
 * @param {number} saturation 
 */
function PlainFood(food, hunger, saturation) {
    this.food = food
    this.hunger = hunger
    this.saturation = saturation
    this._always = false
    this.always = () => { this._always = true; return this }
}