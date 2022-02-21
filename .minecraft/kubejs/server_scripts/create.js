// priority : 0

onEvent("recipes", event => {
    //TODO: Fill in the blanks

    //FIX: create precise mechanism 
    new AssemblyRecipe([
        Item.of(items.create.precision_mechanism).withChance(120.0),
        Item.of(items.create.golden_sheet).withChance(8.0),
        Item.of(items.create.andesite_alloy).withChance(8.0),
        Item.of(items.create.cogwheel).withChance(5.0),
        Item.of(items.create.shaft).withChance(2.0),
        Item.of(items.minecraft.gold_ingot).withChance(2.0),
        Item.of(items.minecraft.gold_nugget).withChance(2.0),
        items.minecraft.iron_ingot,
        items.minecraft.clock])
        .input("#forge:plates/gold")
        .intermediate(items.create.incomplete_precision_mechanism)
        .addStep(event.recipes.create.deploying, items.create.cogwheel)
        .addStep(event.recipes.create.deploying, items.create.large_cogwheel)
        .addStep(event.recipes.create.deploying, "#forge:nuggets/iron")
        .loops(1000)
        .create(event)
})