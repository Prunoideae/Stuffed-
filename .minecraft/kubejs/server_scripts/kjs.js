// priority : 0
onEvent("recipes", event => {
    //TODO: Fill in the blanks

    //Cinder Flours
    event.remove({ "output": items.byg.brim_powder })
    event.recipes.create.crushing([items.kubejs.nether_flour_brim, Item.of(items.kubejs.nether_flour_brim).withChance(0.5)], items.byg.brimstone)
    event.recipes.create.crushing([items.kubejs.nether_flour_blue, Item.of(items.kubejs.nether_flour_blue).withChance(0.5)], items.byg.blue_netherrack)

    //Sulfur
    event.recipes.create.splashing([
        Item.of(items.kubejs.powder_sulfur).withChance(0.75),
        Item.of(items.minecraft.gunpowder).withChance(0.25),
        Item.of(items.minecraft.quartz).withChance(0.1)
    ], items.create.cinder_flour)
    event.recipes.create.splashing([
        Item.of(items.create.cinder_flour).withChance(0.75),
        Item.of(items.kubejs.powder_sulfur).withChance(0.15),
    ], items.kubejs.nether_flour_brim)
    event.recipes.create.splashing([
        Item.of(items.create.cinder_flour).withChance(0.5),
    ], items.kubejs.nether_flour_blue)

    //Fluids
    event.recipes.create.mixing(Fluid.of(fluids.kubejs.dissolvent, 1000), [items.kubejs.powder_sulfur, items.minecraft.blaze_powder, Fluid.of(fluids.minecraft.water, 1000)])
    event.recipes.create.mixing(Fluid.of(fluids.kubejs.purifying_agent, 1000), [items.kubejs.powder_salt, items.kubejs.purified_dust_coal, Fluid.of(fluids.minecraft.water, 1000)])
    event.recipes.create.mixing(Fluid.of(fluids.kubejs.crystallizing_fluid, 100), [items.kubejs.purified_dust_quartz, Fluid.of(fluids.kubejs.purifying_agent, 100)]).heated()

})