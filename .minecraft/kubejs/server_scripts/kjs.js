// priority : 0
onEvent("recipes", event => {

    //Cinder Flours
    event.remove({ "output": "byg:brim_powder" })
    event.recipes.create.crushing(["kubejs:nether_flour_brim", Item.of("kubejs:nether_flour_brim").withChance(0.5)], "byg:brimstone")
    event.recipes.create.crushing(["kubejs:nether_flour_blue", Item.of("kubejs:nether_flour_blue").withChance(0.5)], "byg:blue_netherrack")

    //Sulfur
    event.recipes.create.splashing([
        Item.of("kubejs:powder_sulfur").withChance(0.75),
        Item.of("minecraft:gunpowder").withChance(0.25),
        Item.of("minecraft:quartz").withChance(0.1)
    ], "create:cinder_flour")
    event.recipes.create.splashing([
        Item.of("create:cinder_flour").withChance(0.75),
        Item.of("kubejs:powder_sulfur").withChance(0.15),
    ], "kubejs:nether_flour_brim")
    event.recipes.create.splashing([
        Item.of("create:cinder_flour").withChance(0.5),
    ], "kubejs:nether_flour_blue")

    //Fluids
    event.recipes.create.mixing(Fluid.of("kubejs:dissolvent", 1000), ["kubejs:powder_sulfur", Fluid.of("create:potion", 250, {"Bottle":"REGULAR", "Potion":"minecraft:strength"})])
    event.recipes.create.mixing(Fluid.of("kubejs:purifying_agent", 1000), ["kubejs:powder_salt", "kubejs:purified_dust_coal", Fluid.water(1000)])
    event.recipes.create.mixing(Fluid.of("kubejs:crystallizing_fluid", 100), ["kubejs:purified_dust_quartz", Fluid.of("kubejs:purifying_agent", 100)]).heated()

})