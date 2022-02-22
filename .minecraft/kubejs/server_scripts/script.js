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

captureEvent("recipes", event => { });


captureEvent("tags.items", event => {
    event.add("kubejs:ores/nether_gold", "minecraft:nether_gold_ore")
    event.add("forge:ores", "#kubejs:ores/nether_gold")
    tags.items.forge.ores.forEach((ore, index, array) => {
        oreItemIntermediates.forEach((state, i, a) => {
            if (tags.items.forge.ores_in_ground_deepslate.indexOf(ore) > -1) {
                return;
            }
            let ore_name = ore.startsWith("#") ? ore.split(":")[1].split("/")[1] : ore.split(":")[1];
            event.add("forge:" + state + "_kubejs", "kubejs:" + state + "_" + ore_name)
        })
    })
})


captureEvent("tags.blocks", event => {
    event.add("create:non_movable", /integrateddynamics:.*/)
    event.add("create:non_movable", /integratedterminals:.*/)
    event.add("create:non_movable", /integratedtunnels:.*/)
})

captureEvent("tags.fluids", event => { })
