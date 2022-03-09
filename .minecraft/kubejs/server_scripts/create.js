// priority : 0

onEvent("recipes", event => {

    //FIX: create precise mechanism 
    new AssemblyRecipe([
        Item.of("create:precision_mechanism").withChance(120.0),
        Item.of("create:golden_sheet").withChance(8.0),
        Item.of("create:andesite_alloy").withChance(8.0),
        Item.of("create:cogwheel").withChance(5.0),
        Item.of("create:shaft").withChance(2.0),
        Item.of("minecraft:gold_ingot").withChance(2.0),
        Item.of("minecraft:gold_nugget").withChance(2.0),
        "minecraft:iron_ingot",
        "minecraft:clock"])
        .input("#forge:plates/gold")
        .intermediate("create:incomplete_precision_mechanism")
        .addStep(event.recipes.create.deploying, "create:cogwheel")
        .addStep(event.recipes.create.deploying, "create:large_cogwheel")
        .addStep(event.recipes.create.deploying, "#forge:nuggets/iron")
        .loops(5)
        .create(event)

    //FIX: diamond sandpaper
    event.remove({ "output": "createaddition:diamond_grit" })
    event.remove({ "input": "createaddition:diamond_grit" })
    event.recipes.minecraft.crafting_shapeless("minecraft:paper", ["kubejs:purified_dust_diamond", "minecraft:paper"])
})
