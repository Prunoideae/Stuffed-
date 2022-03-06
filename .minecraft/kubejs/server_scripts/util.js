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
 * @param {Internal.ItemStackJS} output 
 * @param {number} duration 
 * @param {Internal.IngredientJS} input 
 * @param {Internal.FluidStackJS} fluid 
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

    this.drying = function (event) { this.createOfTypes(event, ["integrateddynamics:drying_basin"]); return this; }

    this.mechanical = function (event) { this.createOfTypes(event, ["integrateddynamics:mechanical_drying_basin"]); return this; }

    this.universal = function (event) { this.createOfTypes(event, ["integrateddynamics:drying_basin", "integrateddynamics:mechanical_drying_basin"]) }
}

function CuttingRecipe(output, input, tool) {
    this.output = []
    this.input = []
    output.forEach((v, i, a) => this.output.push(v.toResultJson()))
    input.forEach((v, i, a) => this.input.push(v.toJson()))
    this.tool = tool

    /**
     * 
     * @param {Internal.RecipeEventJS} event 
     */
    this.create = function (event) {
        event.custom({
            type: "farmersdelight:cutting",
            ingredients: this.input,
            tool: this.tool,
            result: this.output
        })
    }
}

/**
 * 
 * @param {Internal.ItemStackJS} output 
 * @param {Internal.IngredientJS[]} inputs 
 */
function CookingRecipe(output, inputs) {
    this.output = output
    this.inputs = inputs
    this._bowl = undefined
    this._xp = 1
    this._duration = 200

    /**
     * 
     * @param {any} bowl 
     * @returns {CookingRecipe}
     */
    this.bowl = function (bowl) {
        this._bowl = bowl
        return this
    }

    this.xp = function (xp) {
        this._xp = xp
        return this
    }

    this.duration = function (duration) {
        this._duration = duration
        return this
    }

    /**
     * 
     * @param {Internal.RecipeEventJS} event 
     */
    this.create = function (event) {
        var transformed_inputs = []
        this.inputs.forEach((v, i, a) => { transformed_inputs.push(v.toJson()) })
        var recipeJson = {
            type: "farmersdelight:cooking",
            ingredients: transformed_inputs,
            result: this.output.toResultJson(),
            experience: this._xp,
            cookingtime: this._duration
        }
        if (this._bowl != undefined) {
            recipeJson.container = this._bowl.toJson()
        }
        console.log(this._bowl)
        console.log(recipeJson)
        event.custom(recipeJson)
    }
}

function RollingRecipe(output, input) {
    this.input = input
    this.output = output

    /**
     * 
     * @param {Internal.RecipeEventJS} event 
     */
    this.create = function (event) {
        event.custom({
            type: "createaddition:rolling",
            input: this.input.toJson(),
            result: this.output.toResultJson()
        })
    }
}

/**
 * 
 * @param {object[]} outputs 
 */
function AssemblyRecipe(outputs) {
    this._outputs = outputs
    this._input = undefined
    this._intermediate = undefined
    this._steps = []
    this._loops = 1

    /**
     * 
     * @param {number} loops 
     * @returns {AssemblyRecipe}
     */
    this.loops = function (loops) {
        this._loops = loops
        return this
    }

    /**
     * 
     * @param {Internal.IngredientJS} intermediate 
     * @returns {AssemblyRecipe}
     */
    this.intermediate = function (intermediate) {
        this._intermediate = intermediate
        return this
    }

    /**
     * 
     * @param {Internal.IngredientJS} input 
     * @returns {AssemblyRecipe}
     */
    this.input = function (input) {
        this._input = input
        return this
    }

    /**
     * 
     * @param {function (Internal.IngredientJS, Internal.IngredientJS): Internal.RecipeJS} method 
     * @param {Internal.IngredientJS} ingredient 
     * @returns {AssemblyRecipe}
     */
    this.addStep = function (method, ingredient) {
        this._steps.push(method(this._intermediate, [this._intermediate, ingredient]))
        return this
    }

    /**
     * 
     * @param {function (Internal.IngredientJS):Internal.RecipeJS} method 
     * @param {Internal.IngredientJS} ingredient 
     * @returns {AssemblyRecipe}
     */
    this.addProcess = function (method) {
        this._steps.push(method(this._intermediate, this._intermediate))
        return this
    }

    /**
     * 
     * @param {Internal.RecipeEventJS} event 
     * @returns {AssemblyRecipe}
     */
    this.create = function (event) {
        event.recipes.create.sequenced_assembly(
            this._outputs,
            this._input,
            this._steps)
            .transitionalItem(this._intermediate)
            .loops(this._loops)
        return this
    }
}