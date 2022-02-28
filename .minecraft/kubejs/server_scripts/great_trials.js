// priority : 0

function PromiseRecipe(output, input, count) {
    this._output = output
    this._input = input
    this._count = count

    this.create = function (event) {
        event.recipes.create.compacting(this._output, [Item.of(this._input, this._count)])
    }
}


function SigilRecipe(output) {
    this._output = output
    this._intermediate = undefined
    this._promises = []

    /**
     * 
     * @param {any} intermediate 
     * @returns {SigilRecipe}
     */
    this.intermediate = function (intermediate) {
        this._intermediate = intermediate
        return this
    }

    /**
     * 
     * @param {PromiseRecipe} promise 
     * @returns {SigilRecipe}
     */
    this.addPromise = function (promise) {
        this._promises.push(promise)
        return this
    }

    /**
     * 
     * @param {dev.latvian.mods.kubejs.recipe.RecipeEventJS} event 
     */
    this.create = function (event) {
        // Create assembly recipe
        var sigilRecipe = new AssemblyRecipe([Item.of(this._output).withChance(100)])
            .input("minecraft:crying_obsidian")
            .intermediate(this._intermediate)

        this._promises.forEach((v, i, a) => {
            sigilRecipe.addStep(event.recipes.create.deploying, v._output)
            v.create(event)
        })

        sigilRecipe
            .loops(64)
            .create(event)
    }
}

onEvent("recipes", event => {

    new SigilRecipe("kubejs:sigil_terra")
        .intermediate("kubejs:incomplete_sigil_terra")
        .addPromise(new PromiseRecipe("kubejs:promise_iron", "minecraft:iron_ingot", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_gold", "minecraft:gold_ingot", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_redstone", "minecraft:redstone", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_quartz", "minecraft:quartz", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_lava", "minecraft:magma_block", 16))
        .create(event)

    new SigilRecipe("kubejs:sigil_animalia")
        .intermediate("kubejs:incomplete_sigil_animalia")
        .addPromise(new PromiseRecipe("kubejs:promise_pig", "farmersdelight:honey_glazed_ham", 16))
        .addPromise(new PromiseRecipe("kubejs:promise_chicken", "farmersdelight:egg_sandwich", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_bee", "createaddition:honey_cake", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_fish", "farmersdelight:fish_stew", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_cow", "farmersdelight:shepherds_pie", 16))
        .create(event)

    new SigilRecipe("kubejs:sigil_plantae")
        .intermediate("kubejs:incomplete_sigil_plantae")
        .addPromise(new PromiseRecipe("kubejs:promise_fruit", 'fruittrees:rice_with_fruits', 16))
        .addPromise(new PromiseRecipe("kubejs:promise_pumpkin", "farmersdelight:pumpkin_soup", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_chorus", "integrateddynamics:crystalized_chorus_block", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_beetroot", "farmersdelight:mixed_salad", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_cocoa", "minecraft:cookie", 64))
        .create(event)

    new SigilRecipe("kubejs:sigil_victoris")
        .intermediate("kubejs:incomplete_sigil_victoris")
        .addPromise(new PromiseRecipe("kubejs:promise_zombie", "minecraft:rotten_flesh", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_ender", "minecraft:ender_pearl", 16))
        .addPromise(new PromiseRecipe("kubejs:promise_blaze", "minecraft:blaze_powder", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_spider", "minecraft:fermented_spider_eye", 64))
        .addPromise(new PromiseRecipe("kubejs:promise_skeleton", "minecraft:bone", 64))
        .create(event)

    new AssemblyRecipe("kubejs:sigil_mundus")
        .input("minecraft:nether_star")
        .intermediate("kubejs:incomplete_sigil_mundus")
        .addStep(event.recipes.create.deploying, "kubejs:sigil_terra")
        .addStep(event.recipes.create.deploying, "kubejs:sigil_animalia")
        .addStep(event.recipes.create.deploying, "kubejs:sigil_plantae")
        .addStep(event.recipes.create.deploying, "kubejs:sigil_victoris")
        .loops(64)
        .create(event)
    
})