// priority : 0

onEvent("recipes", event => {
    /**
     * This thing should be splited into 2 parts.
     * In early stage, and at the end of line.
     * If anything is done manually, it should be simplified,
     * if anything is done automatically, the difficulty should
     * be enhanced greatly
     * */

    // Gate Chorus after End
    event.remove({ "output": "integrateddynamics:proto_chorus" })
    event.remove({ "input": "integrateddynamics:proto_chorus" })

    // Harder Item IOs (Note: not Item Interface)
    event.remove({ "output": "integratedtunnels:part_exporter_item" })
    new AssemblyRecipe([
        Item.of("integratedtunnels:part_exporter_item").withChance(120),
        Item.of("minecraft:chest").withChance(15),
        Item.of("integrateddynamics:crystalized_menril_chunk").withChance(10),
        Item.of("integrateddynamics:variablestore").withChance(5)
    ])
        .input("integratedtunnels:part_interface_item")
        .intermediate("kubejs:incomplete_item_exporter")
        .addStep(event.recipes.create.deploying, "integrateddynamics:variable_transformer_output")
        .addStep(event.recipes.create.deploying, "integrateddynamics:logic_director")
        .addStep(event.recipes.create.filling, Fluid.of("integrateddynamics:menril_resin", 500))
        .loops(4)
        .create(event)
    event.remove({ "output": "integratedtunnels:part_importer_item" })
    new AssemblyRecipe([
        Item.of("integratedtunnels:part_importer_item").withChance(120),
        Item.of("minecraft:chest").withChance(15),
        Item.of("integrateddynamics:crystalized_menril_chunk").withChance(10),
        Item.of("integrateddynamics:variablestore").withChance(5)
    ])
        .input("integratedtunnels:part_interface_item")
        .intermediate("kubejs:incomplete_item_importer")
        .addStep(event.recipes.create.deploying, "integrateddynamics:variable_transformer_input")
        .addStep(event.recipes.create.deploying, "integrateddynamics:logic_director")
        .addStep(event.recipes.create.filling, Fluid.of("integrateddynamics:menril_resin", 500))
        .loops(4)
        .create(event)

    // Harder Fluid IOs (Note: not Fluid Interface)
    event.remove({ "output": "integratedtunnels:part_exporter_fluid" })
    new AssemblyRecipe([
        Item.of("integratedtunnels:part_exporter_fluid").withChance(120),
        Item.of("minecraft:bucket").withChance(15),
        Item.of("integrateddynamics:crystalized_menril_chunk").withChance(10),
        Item.of("integrateddynamics:bucket_menril_resin").withChance(15)
    ])
        .input("integratedtunnels:part_interface_fluid")
        .intermediate("kubejs:incomplete_fluid_exporter")
        .addStep(event.recipes.create.deploying, "integrateddynamics:variable_transformer_output")
        .addStep(event.recipes.create.deploying, "integrateddynamics:logic_director")
        .addStep(event.recipes.create.filling, Fluid.of("integrateddynamics:menril_resin", 500))
        .loops(4)
        .create(event)
    event.remove({ "output": "integratedtunnels:part_importer_fluid" })
    new AssemblyRecipe([
        Item.of("integratedtunnels:part_importer_fluid").withChance(120),
        Item.of("minecraft:bucket").withChance(15),
        Item.of("integrateddynamics:crystalized_menril_chunk").withChance(10),
        Item.of("integrateddynamics:bucket_menril_resin").withChance(5)
    ])
        .input("integratedtunnels:part_interface_fluid")
        .intermediate("kubejs:incomplete_fluid_importer")
        .addStep(event.recipes.create.deploying, "integrateddynamics:variable_transformer_input")
        .addStep(event.recipes.create.deploying, "integrateddynamics:logic_director")
        .addStep(event.recipes.create.filling, Fluid.of("integrateddynamics:menril_resin", 500))
        .loops(4)
        .create(event)

    // Harder World IOs

    // Harder redirectors
    event.remove({ "output": "integrateddynamics:logic_director" })
    new AssemblyRecipe([
        Item.of("integrateddynamics:logic_director", 2).withChance(120),
        Item.of("minecraft:diamond").withChance(10),
        Item.of("integrateddynamics:crystalized_menril_chunk").withChance(10),
        Item.of("integrateddynamics:crystalized_chorus_chunk").withChance(10)
    ])
        .input("create:precision_mechanism")
        .intermediate("kubejs:incomplete_logic_director")
        .addStep(event.recipes.create.deploying, "integrateddynamics:crystalized_chorus_chunk")
        .addStep(event.recipes.create.filling, Fluid.of("integrateddynamics:menril_resin", 500))
        .addStep(event.recipes.create.deploying, "minecraft:diamond")
        .addProcess(event.recipes.create.cutting)
        .loops(3)
        .create(event);
})