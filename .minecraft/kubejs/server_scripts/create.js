// priority : 0

onEvent("recipes", event => {
    //TODO: Fill in the blanks

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
        .loops(1000)
        .create(event)
})