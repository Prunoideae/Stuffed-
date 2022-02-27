// priority : 0

onEvent("recipes", event => {

    // Shortcut for making slimeballs
    event.recipes.create.mixing("minecraft:slime_ball", ["farmersdelight:wheat_dough", "minecraft:lime_dye", Fluid.water(250)])

    // But why...?
    event.recipes.create.haunting(["minecraft:rotten_flesh"], "#forge:raw_beef")
    event.recipes.create.haunting(["minecraft:rotten_flesh"], "#forge:raw_mutton")
    event.recipes.create.haunting(["minecraft:rotten_flesh"], "#forge:raw_chicken")

    // Lava -> Magma is not allowed
    event.remove({ "type": "integrateddynamics:mechanical_drying_basin", "output": "minecraft:magma_block" })

    //The disc
    event.recipes.minecraft.crafting_shaped("minecraft:music_disc_otherside", [
        'SSS',
        'SDS',
        'SSS'
    ], {
        'S': "minecraft:purpur_block",
        'D': "minecraft:ender_eye"
    })
})