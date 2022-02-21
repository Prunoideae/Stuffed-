// priority: 9

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

const oreItemIntermediates = [
    "crushed",
    "dust",
    "purified",
    "purified_dust",
    "recrystallized",
    "recrystallized_shard"
]

const oreFluidIntermediates = [
    "slurry",
    "solution"
]

captureEvent("recipes", event => {
    event.recipes.integrateddynamics.squeezer(
        [Item.of(items.farmersdelight.rice, 9)],
        items.farmersdelight.rice_bag).duration(200);
});


captureEvent("tags.items", event => {
    event.add("kubejs:ores/nether_gold", items.minecraft.nether_gold_ore)
    event.add("forge:ores", "#kubejs:ores/nether_gold")
    tags.items.forge.ores.members.forEach((ore, index, array) => {
        oreItemIntermediates.forEach((state, i, a) => {
            if (tags.items.forge.ores_in_ground_deepslate.members.indexOf(ore) > -1) {
                return;
            }
            let ore_name = ore.startsWith("#") ? ore.split(":")[1].split("/")[1] : ore.split(":")[1];
            event.add("forge:" + state + "_kubejs", "kubejs:" + state + "_" + ore_name)
        })
    })
})


captureEvent("tags.blocks", event => {
    Object.keys(blocks.integrateddynamics).forEach((s, i, a) => { event.add(tags.blocks.create.non_movable.tag, blocks.integrateddynamics[s]) })
    Object.keys(blocks.integratedterminals).forEach((s, i, a) => { event.add(tags.blocks.create.non_movable.tag, blocks.integratedterminals[s]) })
    Object.keys(blocks.integratedtunnels).forEach((s, i, a) => { event.add(tags.blocks.create.non_movable.tag, blocks.integratedtunnels[s]) })
})

captureEvent("tags.fluids", event => {

})
