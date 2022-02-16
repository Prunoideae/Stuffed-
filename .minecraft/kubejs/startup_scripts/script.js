// priority: 0

const namedOnlyItems = [

];

const namedOnlyFluids = [
    //Ore processing
    new NameColorHolder("dissolvent", Color.rgba(198, 198, 32, 1.0)),
    new NameColorHolder("purifying_agent", Color.rgba(255, 255, 255, 1.0)),
    new NameColorHolder("purifying_agent", Color.rgba(255, 255, 255, 1.0))
];

//TODO: fix item colors
const coloredItems = [
    // This dust and that dust
    new PrefixedColoredItems("powder")
        .addItem("salt", Color.rgba(255, 255, 255, 1.0))
        .addItem("sulfur", Color.rgba(255, 255, 255, 1.0)),
    //Doughs, remade and expanded
    new PrefixedColoredItems("dough")
        .addItem("wheat", Color.rgba(255, 255, 255, 1.0))
]

const oreColorMappings = {
    "iron": Color.rgba(213, 173, 145, 1.0),
    "copper": Color.rgba(230, 121, 81, 1.0),
    "redstone": Color.rgba(252, 0, 0, 1.0),
    "diamond": Color.rgba(73, 214, 234, 1.0),
    "emerald": Color.rgba(23, 218, 97, 1.0),
    "gold": Color.rgba(231, 235, 86, 1.0),
    "nether_gold": Color.rgba(200, 200, 86, 1.0),
    "coal": Color.rgba(53, 53, 53, 1.0),
    "lapis": Color.rgba(51, 93, 193, 1.0),
    "quartz": Color.rgba(209, 200, 184, 1.0),
    "netherite_scrap": Color.rgba(100, 70, 63, 1.0),
    "zinc": Color.rgba(148, 182, 156, 1.0),
    "ametrine_ore": Color.rgba(240, 192, 219, 1.0),
    "anthracite_ore": Color.rgba(90, 97, 120, 1.0),
    "budding_ametrine_ore": Color.rgba(203, 41, 161, 1.0),
    "cryptic_redstone_ore": Color.rgba(168, 15, 1, 1.0),
    "lignite_ore": Color.rgba(72, 53, 39, 1.0),
    "pendorite_ore": Color.rgba(102, 86, 171, 1.0),
    "blue_nether_gold_ore": Color.rgba(196, 211, 80, 1.0),
    "brimstone_nether_gold_ore": Color.rgba(92, 80, 19, 1.0),
    "blue_nether_quartz_ore": Color.rgba(209, 200, 220, 1.0),
    "brimstone_nether_quartz_ore": Color.rgba(198, 174, 131, 1.0),
}

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

captureEvent("item.registry", event => {

    event.create("white_hair_wolf_ear_loli", builder => {
        builder
            .tooltip(Text.yellow("The first thing Prunoideae created with KubeJS"))
            .translationKey("white_hair_wolf_ear_loli");
    });

    for (let idx = 0; idx < 8; idx++) {
        event.create("singularity_" + (idx + 1), builder => {
            builder.tooltip(Text.translate("item.kubejs.singularity_" + (idx + 1) + "_desc").gray())
                .translationKey("singularity_" + (idx + 1))

        })
    }

    event.create("sodium_chloride", builder => {
        builder.tooltip(
            Text.translate("item.kubejs.sodium_chloride_desc").gray())
    })

    namedOnlyItems.forEach((v, i, a) => event.create(v, builder => builder.translationKey(v)))
    coloredItems.forEach((v, i, a) => v.members.forEach((n, ii, aa) => {
        event.create(v.prefix + "_" + n.name, builder => {
            builder
                .color(0, n.color.getArgbKJS())
                .texture("kubejs:item/" + v.prefix)
                .translationKey(v.prefix + "_" + n.name)
        })
    }))
    function createColoredOre(prefix, name) {
        var color = oreColorMappings[name]
        if (color == undefined) {
            color = Color.rgba(255, 255, 255, 1.0)
        }
        event.create(prefix + "_" + name, builder => {
            builder
                .color(0, color.getArgbKJS())
                .texture("kubejs:item/" + prefix)
                .translationKey(prefix + "_" + name)
        })
    }

    // Unifies the ore processing intermediates
    // Mainly the raw line, purified line and recrystallized line
    tags.items.forge.ores.members.forEach((ore, index, array) => {
        if (tags.items.forge.ores_in_ground_deepslate.members.indexOf(ore) > -1) {
            return;
        }
        let ore_name = ore.startsWith("#") ? ore.split(":")[1].split("/")[1] : ore.split(":")[1];
        oreItemIntermediates.forEach((state, i, a) => {
            createColoredOre(state, ore_name)
        })
    })

});

captureEvent('item.modification', event => {
    event.modify(items.kubejs.purified_dust_coal, prop => {
        prop.setBurnTime(1600)
    })
    event.modify(items.kubejs.purified_dust_lignite_ore, prop => {
        prop.setBurnTime(1400)
    })

    let giveRawFoodNausea = function (prop) {
        prop.setFoodProperties(food => { food.effect("minecraft:nausea", 400, 0, 0.7) })
    }

    let raw_meat = [
        items.minecraft.porkchop,
        items.minecraft.beef,
        items.minecraft.chicken,
        items.minecraft.mutton,
        items.farmersdelight.mutton_chops,
        items.farmersdelight.minced_beef,
        items.farmersdelight.chicken_cuts
    ]
    raw_meat.forEach((v, i, a) => event.modify(v, giveRawFoodNausea))

})

captureEvent("fluid.registry", event => {
    function createColoredOreFluid(prefix, name) {
        var color = oreColorMappings[name]
        if (color == undefined) {
            color = Color.rgba(255, 255, 255, 1.0)
        }
        event.create(prefix + "_" + name, builder => {
            builder
                .color(color.getArgbKJS())
                .textureFlowing("kubejs:block/" + prefix + "_flow")
                .textureStill("kubejs:block/" + prefix + "_still")
                .translationKey(prefix + "_" + name)
        })
    }

    namedOnlyFluids.forEach((v, i, a) => event.create(v.name, builder => {
        builder.color(v.color.getArgbKJS()).translationKey(v.name)
        if (v.flowing != undefined) {
            builder.textureFlowing(v.flowing)
        }
        if (v.still != undefined) {
            builder.textureStill(v.still)
        }
    }))

    // Unifies the ore processing intermediates
    // Mainly recrystallized line
    tags.items.forge.ores.members.forEach((ore, index, array) => {
        if (tags.items.forge.ores_in_ground_deepslate.members.indexOf(ore) > -1) {
            return;
        }
        let ore_name = ore.startsWith("#") ? ore.split(":")[1].split("/")[1] : ore.split(":")[1];
        oreFluidIntermediates.forEach((state, i, a) => { createColoredOreFluid(state, ore_name) })
    })
});

captureEvent("block.registry", event => {

});
