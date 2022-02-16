// priority: 9

/**
 * Represents a Drying Basing/Mechanical Drying Basing recipe in
 * integrated dynamics. However, removing an existed recipe needs
 * you to replace items via datapack still.
 * 
 * Use `.drying(event: RecipeEvent)` to add the recipe to normal
 * basing, `.mechanical(event)` for mechanical basin, and 
 * `.universal(event)` for both. Requires at least one of the two
 * inputs to run, or an error will be logged.
 * 
 * @param {Item} output 
 * @param {number} duration 
 * @param {Item} input 
 * @param {Fluid} fluid 
 * @return {DryingBasingRecipe}
 */
function DryingBasingRecipe(output, duration, input, fluid) {
    this.output = output
    this.duration = duration
    this.input = input
    this.fluid = fluid

    this.withFluid = function (fluid) {
        this.fluid = fluid
        return this
    }
    this.withInput = function (input) {
        this.input = input
        return this
    }
    this.withDuration = function (duration) {
        this.duration = duration
        return this
    }

    this.createOfTypes = function (event, types) {
        types.forEach((type, i, a) => {
            var jobj = {
                type: type,
                duration: this.duration,
                result: this.output.toResultJson()
            }
            if (this.input != undefined) {
                jobj.item = this.input.toJson()
            }

            if (this.fluid != undefined) {
                jobj.fluid = this.fluid.toJson()
            }
            event.custom(jobj)
        })
    }

    this.drying = function (event) { this.createOfTypes(event, ["integrateddynamics:drying_basin"]) }

    this.mechanical = function (event) { this.createOfTypes(event, ["integrateddynamics:mechanical_drying_basin"]) }

    this.universal = function (event) { this.createOfTypes(event, ["integrateddynamics:drying_basin", "integrateddynamics:mechanical_drying_basin"]) }
}