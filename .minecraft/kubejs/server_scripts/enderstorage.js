onEvent("recipes", event => {
    //Harder EnderStorage recipes, mostly gated right before the end.
    //Actually I'd say it's still a bit too OP... Since you can have 36 channels of items anyway.

    event.remove({ "output": Item.of("endertanks:ender_tank").ignoreNBT() })
    event.remove({ "output": Item.of("enderchests:ender_chest").ignoreNBT() })

    let castTank = (code) => Item.of("endertanks:ender_tank", { code: code, owner: "all" })
    let castChest = (code) => Item.of("enderchests:ender_chest", { code: code, owner: "all" })

    new AssemblyRecipe([
        Item.of("enderchests:ender_chest").withChance(160)
    ])
        .input("enderchests:ender_pouch")
        .intermediate("minecraft:ender_chest")
        .addStep(event.recipes.create.deploying, "create:precision_mechanism")
        .addStep(event.recipes.create.deploying, "minecraft:blaze_rod")
        .addStep(event.recipes.create.deploying, "minecraft:ender_eye")
        .loops(3)
        .create(event)

    new AssemblyRecipe([
        Item.of("endertanks:ender_tank").withChance(160)
    ])
        .input(Item.of("endertanks:ender_bucket").ignoreNBT())
        .intermediate("endertanks:ender_bucket")
        .addStep(event.recipes.create.deploying, "create:precision_mechanism")
        .addStep(event.recipes.create.deploying, "minecraft:blaze_rod")
        .addStep(event.recipes.create.deploying, "minecraft:ender_eye")
        .loops(3)
        .create(event)

    function createColored(flag) {
        let codec = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
        let dyes = [
            "minecraft:white_dye",
            "minecraft:orange_dye",
            "minecraft:magenta_dye",
            "minecraft:light_blue_dye",
            "minecraft:yellow_dye",
            "minecraft:lime_dye",
            "minecraft:pink_dye",
            "minecraft:gray_dye"
        ]

        let code = codec[flag] + codec[flag] + codec[flag]
        let first = second = third = dyes[flag]

        new AssemblyRecipe([castTank(code)])
            .input(Item.of("endertanks:ender_tank").ignoreNBT())
            .intermediate(Item.of("endertanks:ender_tank"))
            .addStep(event.recipes.create.deploying, first)
            .addStep(event.recipes.create.deploying, second)
            .addStep(event.recipes.create.deploying, third)
            .loops(2)
            .create(event)

        new AssemblyRecipe([castChest(code)])
            .input(Item.of("enderchests:ender_chest").ignoreNBT())
            .intermediate(Item.of("enderchests:ender_chest"))
            .addStep(event.recipes.create.deploying, first)
            .addStep(event.recipes.create.deploying, second)
            .addStep(event.recipes.create.deploying, third)
            .loops(2)
            .create(event)

    }

    for (let i = 0; i < 4; i++)
        createColored(i)
})