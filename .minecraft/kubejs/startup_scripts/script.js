// priority: 0

const namedOnlyItems = [
    "cheese",
    "butter",
    "dough_sweet",
    "dough_berry",
    "dough_cocoa",
    "raw_wrap_bread",
    "raw_pie_crust",
    "raw_cookie_plain",
    "raw_cookie_berry",
    "raw_cookie_cocoa",
];

const plainFood = [
    new PlainFood("cookie_plain", 1, 1).always(),
    new PlainFood("wraped_bread", 5, 3)
]

const namedOnlyFluids = [
    //Ore processing
    new NameColorHolder("dissolvent", Color.rgba(198, 198, 32, 1.0)),
    new NameColorHolder("purifying_agent", Color.rgba(255, 255, 255, 1.0)),
    new NameColorHolder("crystallizing_fluid", Color.rgba(76, 120, 200, 1.0)),
    //Milk
    new NameColorHolder("cream", Color.rgba(255, 255, 240, 1.0)),
];

const coloredItems = [
    // This dust and that dust
    new PrefixedColoredItems("powder")
        .addItem("salt", Color.rgba(255, 255, 255, 1.0))
        .addItem("sulfur", Color.rgba(202, 144, 17, 1.0)),
    new PrefixedColoredItems("flour")
        .addItem("corn", Color.rgba(252, 189, 18, 1.0)),
    new PrefixedColoredItems("nether_flour")
        .addItem("blue", Color.rgba(82, 125, 165, 1.0))
        .addItem("brim", Color.rgba(210, 210, 70, 1.0)),
    //Doughs, remade and expanded
    new PrefixedColoredItems("sigil")
        // The basis of Minecraft, ingots and gems
        .addItem("terra", Color.rgba(214, 220, 228, 1.0))
        // Creatures, mostly food
        .addItem("animalia", Color.rgba(223, 97, 89, 1.0))
        // Crops, mostly food
        .addItem("plantae", Color.rgba(86, 171, 62, 1.0))
        // Something not friendly
        .addItem("victoris", Color.rgba(179, 173, 255, 1.0))
        // Everything
        .addItem("mundus", Color.rgba(255, 255, 255, 1.0))
        .appendHandler(builder => builder.glow(true)),
    new PrefixedColoredItems("incomplete_sigil")
        // The basis of Minecraft, ingots and gems
        .addItem("terra", Color.rgba(214, 220, 228, 1.0))
        // Creatures, mostly food
        .addItem("animalia", Color.rgba(223, 97, 89, 1.0))
        // Crops, mostly food
        .addItem("plantae", Color.rgba(86, 171, 62, 1.0))
        // Something not friendly
        .addItem("victoris", Color.rgba(179, 173, 255, 1.0))
        // Everything
        .addItem("mundus", Color.rgba(255, 255, 255, 1.0)),
    new PrefixedColoredItems("promise")
        //Terra
        .addItem("iron", Color.rgba(214, 220, 228, 1.0))
        .addItem("gold", Color.rgba(250, 242, 94, 1.0))
        .addItem("quartz", Color.rgba(177, 158, 143, 1.0))
        .addItem("redstone", Color.rgba(252, 0, 0, 1.0))
        .addItem("lava", Color.rgba(224, 138, 62, 1.0))
        //Animalia
        .addItem("pig", Color.rgba(252, 118, 118, 1.0))//honey glazed ham
        .addItem("chicken", Color.rgba(220, 104, 153, 1.0))//egg sandwich
        .addItem("bee", Color.rgba(252, 208, 44, 1.0))//Honey cake
        .addItem("fish", Color.rgba(196, 160, 112, 1.0))//fish stew
        .addItem("cow", Color.rgba(227, 227, 214, 1.0))//shephred's pie
        //Plantea
        .addItem("fruit", Color.rgba(252, 28, 42, 1.0))//steamed rice with fruits
        .addItem("pumpkin", Color.rgba(224, 136, 29, 1.0))//pumpkin soup
        .addItem("chorus", Color.rgba(168, 121, 168, 1.0)) //crystallized chorus block
        .addItem("beetroot", Color.rgba(180, 71, 75, 1.0)) //mixed salad
        .addItem("cocoa", Color.rgba(173, 107, 75, 1.0)) //hot cocoa
        //Victoris
        .addItem("zombie", Color.rgba(110, 76, 27, 1.0))//rotten flesh
        .addItem("ender", Color.rgba(138, 241, 223, 1.0))//enderpearl
        .addItem("blaze", Color.rgba(252, 161, 0, 1.0))//blaze powder
        .addItem("spider", Color.rgba(10, 56, 66, 1.0))//spider eye
        .addItem("skeleton", Color.rgba(164, 164, 164, 1.0))//bone
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

onEvent("item.registry", event => {

    event.create("white_hair_wolf_ear_loli", builder => {
        builder
            .tooltip(Text.yellow("The first thing Prunoideae created with KubeJS"))
            .translationKey("white_hair_wolf_ear_loli");
    });

    event.create("sodium_chloride", builder => {
        builder.tooltip(
            Text.translate("item.kubejs.sodium_chloride_desc").gray())
    })
    plainFood.forEach((v, i, a) => event.create(v.food, builder => builder.food(food => food.hunger(v.hunger).saturation(v.saturation).alwaysEdible(v._always)).translationKey(v.food)))
    namedOnlyItems.forEach((v, i, a) => event.create(v, builder => builder.translationKey(v)))
    coloredItems.forEach((v, i, a) => v.members.forEach((n, ii, aa) => {
        event.create(v.prefix + "_" + n.name, builder => {
            builder
                .color(0, n.color.getArgbKJS())
                .texture("kubejs:item/" + v.prefix)
                .translationKey(v.prefix + "_" + n.name)
            if (v.handler != undefined)
                v.handler(builder)
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
    tags.items.forge.ores.forEach((ore, index, array) => {
        if (tags.items.forge.ores_in_ground_deepslate.indexOf(ore) > -1) {
            return;
        }
        let ore_name = ore.startsWith("#") ? ore.split(":")[1].split("/")[1] : ore.split(":")[1];
        oreItemIntermediates.forEach((state, i, a) => {
            createColoredOre(state, ore_name)
        })
    })

});

onEvent('item.modification', event => {
    event.modify("kubejs:purified_dust_coal", prop => {
        prop.setBurnTime(1600)
    })
    event.modify("kubejs:purified_dust_lignite_ore", prop => {
        prop.setBurnTime(1400)
    })

    let giveRawFoodNausea = function (prop) {
        prop.setFoodProperties(food => { food.effect("minecraft:nausea", 400, 0, 0.7) })
    }

    let raw_meat = [
        "minecraft:porkchop",
        "minecraft:beef",
        "minecraft:chicken",
        "minecraft:mutton",
        "farmersdelight:mutton_chops",
        "farmersdelight:minced_beef",
        "farmersdelight:chicken_cuts"
    ]
    raw_meat.forEach((v, i, a) => event.modify(v, giveRawFoodNausea))

    let giveContainer = function (item, remainder) {
        event.modify(item, prop => {
            prop.setCraftingRemainder(remainder)
        })
    }

    giveContainer("kubejs:cream_bucket", "minecraft:bucket")
})

onEvent("fluid.registry", event => {
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
            builder.bucketItem
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
    tags.items.forge.ores.forEach((ore, index, array) => {
        if (tags.items.forge.ores_in_ground_deepslate.indexOf(ore) > -1) {
            return;
        }
        let ore_name = ore.startsWith("#") ? ore.split(":")[1].split("/")[1] : ore.split(":")[1];
        oreFluidIntermediates.forEach((state, i, a) => { createColoredOreFluid(state, ore_name) })
    })
});

onEvent("block.registry", event => {

});
