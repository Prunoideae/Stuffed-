// priority: 0

function WeightedName(name, weight) {
    this.weight = weight
    this.name = name
    this.withState = function (state) {
        return "kubejs:" + state + "_" + this.name
    }
    this.getWeighted = function (state) {
        return Item.of(this.withState(state)).withChance(weight)
    }
}

/**
 * Holder of an ore processing recipe.
 * 
 * If a string is given in products, the intermediate of corresponding level will be given out.
 * Otherwise the item/ingredient will be used directly.
 * 
 * NOTE: the recrystallization will have both as by-product.
 * 
 * @param rawProduct The by-products of raw processing line (grind directly).
 * @param purifiedProduct The by-products of purification processing line (wash after grind).
 * @param material The material flag, can be "metal", "crystal", "dust" or "other"
 * @param oreName The KubeJS registered ore-intermediate name
 * @param oreBlock The input ore to begin with
 * @param rawItem The input raw materials to begin with, can be left out
 */
function OreProcessing(mainProduct, rawProduct, purifiedProduct, washingProduct, material, oreName, isSub) {

    this.mainProduct = typeof mainProduct == "string" ? Item.of(mainProduct) : mainProduct;
    this.rawProduct = rawProduct;
    this.purifiedProduct = purifiedProduct;
    this.washingProduct = washingProduct;
    this.material = material;
    this.oreName = oreName;
    this.oreValues = [];
    this.isSub = isSub != undefined && isSub

    this.withState = function (state) {
        return "kubejs:" + state + "_" + this.oreName
    }

    this.transformProducts = function (products, state) {
        var r = [];
        products.forEach((t, i, a) => {
            r.push(t instanceof WeightedName ? t.getWeighted(state) : t)
        })
        return r;
    }

    this.addDustRecipe = function (event) {
        if (this.material == "metal") {
            // Dusts can be smelted into ingots
            event.recipes.minecraft.smelting(this.mainProduct, this.withState("purified_dust")).cookingTime(200);
            event.recipes.minecraft.blasting(this.mainProduct, this.withState("purified_dust")).cookingTime(100);
            event.recipes.minecraft.smelting(this.mainProduct, this.withState("dust")).cookingTime(300);
            event.recipes.minecraft.blasting(this.mainProduct, this.withState("dust")).cookingTime(150);
            event.recipes.minecraft.smelting(this.mainProduct, this.withState("recrystallized_shard")).cookingTime(100);
            event.recipes.minecraft.blasting(this.mainProduct, this.withState("recrystallized_shard")).cookingTime(50);
        } else if (this.material == "crystal") {
            // Dusts can be crystallized into crystals
            event.recipes.create.mixing(this.mainProduct.withCount(1), [this.withState("purified_dust"), Fluid.water().withAmount(1000)]).heated();
        }
        else if (this.material == "dust") {
            /* Just dust already */
            event.recipes.minecraft.crafting_shapeless(this.mainProduct, [this.withState("purified_dust")])
        }
        else if (this.material == "other") {/* Can do nothing :((*/ }

        if (!this.isSub)
            if ((this.material == "metal" && Ingredient.of("#forge:ingots").test(this.mainProduct))
                || (this.material != "metal" && this.material != "dust")) {
                event.recipes.create.crushing([this.withState("purified_dust")], this.mainProduct.withCount(1));
                event.recipes.create.milling([this.withState("purified_dust")], this.mainProduct.withCount(1));
                event.recipes.integrateddynamics.squeezer([this.withState("purified_dust")], this.mainProduct.withCount(1));
                event.recipes.integrateddynamics.mechanical_squeezer([this.withState("purified_dust")], this.mainProduct.withCount(1)).duration(40);
            }

        event.recipes.create.splashing([this.withState("purified_dust")], this.withState("dust"));
    }

    this.addCrushingRecipe = function (event) {
        // Adds ores -> raws by their value
        this.oreValues.forEach((v, i, a) => {
            if (v.value < 1.0) {
                event.recipes.create.crushing([Item.of(this.withState("crushed")).withChance(v.value), Item.of(items.create.experience_nugget).withChance(0.4 * v.value)].concat(v.addi), v.name)
                let weakened_output = [Item.of(this.withState("crushed")).withChance(v.value / 2)]
                event.recipes.create.milling(weakened_output, v.name)
                event.recipes.integrateddynamics.squeezer([Item.of(this.withState("crushed"))], v.name)
                event.recipes.integrateddynamics.mechanical_squeezer([Item.of(this.withState("crushed"))], v.name).duration(100)
            } else if (v.value >= 1.0) {
                let base_ore = Math.floor(v.value)
                let base_exp = Math.floor(v.value * 0.4)
                var outputs = [Item.of(this.withState("crushed")).withCount(base_ore)]
                if (v.value - base_ore > 0) {
                    outputs.push(Item.of(this.withState("crushed")).withChance(v.value - base_ore))
                }
                if (base_exp == 0) {
                    outputs.push(Item.of(items.create.experience_nugget).withChance(v.value * 0.4))
                } else {
                    outputs.push(Item.of(items.create.experience_nugget).withCount(base_exp))
                    if (v.value * 0.4 - base_exp > 0) {
                        outputs.push(Item.of(items.create.experience_nugget).withChance(v.value * 0.4 - base_exp))
                    }
                }
                event.recipes.create.crushing(outputs.concat(v.addi), v.name)
                event.recipes.integrateddynamics.squeezer([Item.of(this.withState("crushed"))], v.name)
                event.recipes.integrateddynamics.mechanical_squeezer([Item.of(this.withState("crushed"))], v.name).duration(500)
            }
        })

        function createCrushingWithByproducts(processing, current_state, next_state, main_bonus, byproducts, ignore_material) {

            if (processing.material == "metal" || ignore_material) {
                event.recipes.create.crushing(
                    [processing.withState(next_state), Item.of(processing.withState(next_state)).withChance(main_bonus)].concat(
                        processing.transformProducts(byproducts, next_state)
                    ),
                    processing.withState(current_state)
                )
            } else {
                event.recipes.create.crushing(
                    [processing.mainProduct, Item.of(processing.mainProduct).withChance(main_bonus)].concat(
                        processing.transformProducts(byproducts, next_state)
                    ),
                    processing.withState(current_state)
                )
            }
        }

        createCrushingWithByproducts(this, "crushed", "dust", 0.2, this.rawProduct, false)
        createCrushingWithByproducts(this, "purified", "purified_dust", 0.7, this.purifiedProduct, false)
        createCrushingWithByproducts(this, "recrystallized", "recrystallized_shard", 0.4, this.rawProduct, true)

        if (this.material == "metal") {
            event.recipes.create.crushing([this.withState("purified_dust")].concat(this.transformProducts(this.purifiedProduct, "purified_dust")), this.withState("recrystallized_shard"));
            event.recipes.integrateddynamics.squeezer([this.withState("purified_dust")], this.withState("recrystallized_shard"));
            event.recipes.integrateddynamics.mechanical_squeezer([this.withState("purified_dust")], this.withState("recrystallized_shard")).duration(20);
            event.recipes.create.milling([this.withState("dust")], this.withState("crushed"))
        } else {
            event.recipes.create.crushing([this.mainProduct].concat(this.transformProducts(this.purifiedProduct, "purified_dust")), this.withState("recrystallized_shard"));
            event.recipes.integrateddynamics.squeezer([this.mainProduct], this.withState("recrystallized_shard"));
            event.recipes.integrateddynamics.mechanical_squeezer([this.mainProduct], this.withState("recrystallized_shard")).duration(20);
            event.recipes.create.milling([this.mainProduct], this.withState("crushed"))
        }
    }

    this.addTransitionRecipe = function (event) {
        // Wash
        event.recipes.create.splashing([this.withState("purified")].concat(this.transformProducts(this.washingProduct, "purified")), this.withState("crushed"));
        //Dissolve
        event.recipes.create.mixing(
            Fluid.of(this.withState("slurry")).withAmount(1000),
            [Fluid.of(fluids.kubejs.dissolvent).withAmount(100), this.withState("purified")]
        ).superheated();
        event.recipes.create.mixing(
            Fluid.of(this.withState("solution")).withAmount(1000),
            [Fluid.of(this.withState("slurry")).withAmount(1000), Fluid.of(fluids.kubejs.purifying_agent).withAmount(100)]
        ).heated();
        event.recipes.create.compacting(
            this.withState("recrystallized"),
            [Fluid.of(this.withState("solution")).withAmount(500), Fluid.of(fluids.kubejs.crystallizing_fluid).withAmount(10)]
        );
    }

    this.addOre = function (name, value, addi) {
        this.oreValues.push({ name: name, value: value, addi: addi })
        return this
    }
}

const ore_base = {
    overworld: [Item.of(items.minecraft.cobblestone).withChance(0.4)],
    deepslate: [Item.of(items.minecraft.cobbled_deepslate).withChance(0.4)],
    nether: [Item.of(items.minecraft.netherrack).withChance(0.2)],
    nether_blue: [Item.of(items.byg.blue_netherrack).withChance(0.2)],
    nether_brim: [Item.of(items.byg.brimstone).withChance(0.2)],
    end_ether: [Item.of(items.byg.ether_stone).withChance(0.2)],
    end_cryptic: [Item.of(items.byg.cryptic_stone).withChance(0.2)]
}

const oreProductProcessings = [
    //Metals
    new OreProcessing(
        Item.of(items.minecraft.iron_ingot),
        [new WeightedName("copper", 0.2)],
        [new WeightedName("gold", 0.4)],
        [Item.of(items.minecraft.redstone).withChance(0.4)],
        "metal",
        "iron")
        .addOre(items.minecraft.iron_ore, 1, ore_base.overworld)
        .addOre(items.minecraft.deepslate_iron_ore, 2, ore_base.deepslate)
        .addOre(items.minecraft.raw_iron, 0.7, [])
        .addOre(items.minecraft.raw_iron_block, 2.7, [])
        .addOre(items.create.crimsite, 0.4, []),
    new OreProcessing(
        Item.of(items.minecraft.copper_ingot),
        [Item.of(items.kubejs.powder_salt).withChance(0.2)],
        [new WeightedName("zinc_ore", 0.2)],
        [new WeightedName("gold", 0.2)],
        "metal",
        "copper")
        .addOre(items.minecraft.copper_ore, 1, ore_base.overworld)
        .addOre(items.minecraft.deepslate_copper_ore, 2, ore_base.deepslate)
        .addOre(items.minecraft.raw_copper, 0.7, [])
        .addOre(items.minecraft.raw_copper_block, 6.3, [])
        .addOre(items.create.veridium, 0.7, [])
        .addOre("#create:stone_types/veridium", 0.7, []),
    new OreProcessing(
        Item.of(items.minecraft.gold_ingot),
        [new WeightedName("diamond", 0.05)],
        [new WeightedName("iron", 0.4)],
        [Item.of(items.minecraft.glowstone_dust).withChance(0.2)],
        "metal",
        "gold")
        .addOre(items.minecraft.gold_ore, 1, ore_base.overworld)
        .addOre(items.minecraft.deepslate_gold_ore, 2, ore_base.deepslate)
        .addOre(items.minecraft.raw_gold, 0.7, [])
        .addOre(items.minecraft.raw_gold_block, 6.3, []),
    new OreProcessing(
        Item.of(items.create.zinc_ingot),
        [new WeightedName("copper", 0.2)],
        [new WeightedName("iron", 0.2)],
        [new WeightedName("gold", 0.1)],
        "metal",
        "zinc_ore")
        .addOre(items.create.zinc_ore, 1, ore_base.overworld)
        .addOre(items.create.deepslate_zinc_ore, 2, ore_base.deepslate)
        .addOre(items.create.raw_zinc, 0.7, [])
        .addOre(items.create.raw_zinc_block, 6.3, []),
    // Nether Metals
    new OreProcessing(
        Item.of(items.minecraft.gold_nugget).withCount(4),
        [new WeightedName("coal", 0.1)],
        [new WeightedName("quartz", 0.1)],
        [Item.of(items.minecraft.gold_nugget).withChance(0.2)],
        "metal",
        "nether_gold")
        .addOre(items.minecraft.nether_gold_ore, 0.7, ore_base.nether),
    new OreProcessing(
        Item.of(items.minecraft.gold_ingot),
        [new WeightedName("pendorite_ore", 0.05)],
        [new WeightedName("quartz", 0.1)],
        [Item.of(items.minecraft.gold_nugget).withChance(0.2)],
        "metal",
        "blue_nether_gold_ore",
        true)
        .addOre(items.byg.blue_nether_gold_ore, 0.7, ore_base.nether_blue),
    new OreProcessing(
        Item.of(items.minecraft.gold_ingot),
        [new WeightedName("anthracite_ore", 0.02)],
        [new WeightedName("quartz", 0.1)],
        [Item.of(items.minecraft.gold_nugget).withChance(0.2)],
        "metal",
        "brimstone_nether_gold_ore",
        true)
        .addOre(items.byg.brimstone_nether_gold_ore, 0.7, ore_base.nether_brim),
    //Crystals
    new OreProcessing(
        Item.of(items.minecraft.diamond),
        [new WeightedName("coal", 0.3)],
        [new WeightedName("emerald", 0.1)],
        [new WeightedName("coal", 0.2)],
        "crystal",
        "diamond")
        .addOre(items.minecraft.diamond_ore, 1.3, ore_base.overworld)
        .addOre(items.minecraft.deepslate_diamond_ore, 2.6, ore_base.deepslate),
    new OreProcessing(
        Item.of(items.minecraft.emerald),
        [new WeightedName("copper", 0.2)],
        [new WeightedName("lapis", 0.4)],
        [new WeightedName("diamond", 0.1)],
        "crystal",
        "emerald")
        .addOre(items.minecraft.emerald_ore, 1.5, ore_base.overworld)
        .addOre(items.minecraft.deepslate_emerald_ore, 3.0, ore_base.deepslate),
    new OreProcessing(
        Item.of(items.minecraft.lapis_lazuli, 4),
        [new WeightedName("copper", 0.02)],
        [new WeightedName("redstone", 0.02)],
        [Item.of(items.minecraft.gold_nugget).withChance(0.02)],
        "crystal",
        "lapis")
        .addOre(items.minecraft.lapis_ore, 2, ore_base.overworld)
        .addOre(items.minecraft.deepslate_lapis_ore, 4, ore_base.overworld),
    //End crystals
    new OreProcessing(
        Item.of(items.byg.ametrine_gems),
        [new WeightedName("lignite_ore", 0.2)],
        [Item.of(items.byg.therium_shard).withChance(0.2)],
        [new WeightedName("budding_ametrine_ore", 0.1)],
        "crystal",
        "ametrine_ore")
        .addOre(items.byg.ametrine_ore, 2, ore_base.end_ether),
    new OreProcessing(
        Item.of(items.byg.ametrine_gems),
        [new WeightedName("lignite_ore", 0.1)],
        [Item.of(items.byg.therium_shard).withChance(0.1)],
        [new WeightedName("ametrine_ore", 0.2)],
        "crystal",
        "budding_ametrine_ore")
        .addOre(items.byg.budding_ametrine_ore, 2, ore_base.end_ether),
    //Nether crystals
    new OreProcessing(
        Item.of(items.minecraft.quartz, 2),
        [],
        [Item.of(items.minecraft.glowstone_dust).withChance(0.1)],
        [Item.of(items.minecraft.gold_nugget, 2).withChance(0.2)],
        "crystal",
        "quartz")
        .addOre(items.minecraft.nether_quartz_ore, 2, ore_base.nether),
    new OreProcessing(
        Item.of(items.minecraft.quartz, 2),
        [],
        [new WeightedName("pendorite_ore", 0.02)],
        [Item.of(items.minecraft.gold_nugget, 2).withChance(0.2)],
        "crystal",
        "blue_nether_quartz_ore",
        true)
        .addOre(items.byg.blue_nether_quartz_ore, 1.2, ore_base.nether_blue),
    new OreProcessing(
        Item.of(items.minecraft.quartz, 2),
        [],
        [new WeightedName("anthracite_ore", 0.02)],
        [Item.of(items.minecraft.gold_nugget, 2).withChance(0.2)],
        "crystal",
        "brimstone_nether_quartz_ore",
        true)
        .addOre(items.byg.brimstone_nether_quartz_ore, 1.2, ore_base.nether_brim),
    new OreProcessing(
        Item.of(items.minecraft.netherite_scrap),
        [Item.of(items.minecraft.soul_sand).withChance(0.3)],
        [new WeightedName("gold", 0.7)],
        [Item.of(items.minecraft.glowstone).withChance(0.1)],
        "crystal",
        "netherite_scrap")
        .addOre(items.minecraft.ancient_debris, 2, ore_base.nether),
    new OreProcessing(
        Item.of(items.byg.pendorite_scraps),
        [new WeightedName("blue_nether_quartz_ore", 0.1)],
        [new WeightedName("blue_nether_gold_ore", 0.1)],
        [new WeightedName("netherite_scrap", 0.05)],
        "metal",
        "pendorite_ore")
        .addOre(items.byg.pendorite_ore, 2, ore_base.nether_blue)
        .addOre(items.byg.raw_pendorite, 0.7, [])
        .addOre(items.byg.raw_pendorite_block, 6.3, []),
    new OreProcessing(
        Item.of(items.byg.anthracite),
        [new WeightedName("brimstone_nether_quartz_ore", 0.1)],
        [new WeightedName("brimstone_nether_gold_ore", 0.1)],
        [Item.of(items.minecraft.soul_sand).withChance(0.2)],
        "crystal",
        "anthracite_ore")
        .addOre(items.byg.anthracite_ore, 2, ore_base.nether_brim),
    // Dusts
    new OreProcessing(
        Item.of(items.minecraft.redstone, 4),
        [],
        [new WeightedName("redstone", 0.1)],
        [new WeightedName("lapis", 0.1)],
        "dust",
        "redstone")
        .addOre(items.minecraft.redstone_ore, 2, ore_base.overworld)
        .addOre(items.minecraft.deepslate_redstone_ore, 4, ore_base.deepslate),
    new OreProcessing(
        Item.of(items.minecraft.redstone, 4),
        [],
        [new WeightedName("cryptic_redstone_ore", 0.1)],
        [],
        'dust',
        'cryptic_redstone_ore',
        true)
        .addOre(items.byg.cryptic_redstone_ore, 3, ore_base.end_cryptic),
    // Others
    new OreProcessing(
        Item.of(items.minecraft.coal, 2),
        [],
        [new WeightedName("coal", 0.1)],
        [new WeightedName("diamond", 0.005)],
        "other",
        "coal")
        .addOre(items.minecraft.coal_ore, 2, ore_base.overworld)
        .addOre(items.minecraft.deepslate_coal_ore, 4, ore_base.deepslate),
    new OreProcessing(
        Item.of(items.byg.lignite, 2),
        [],
        [new WeightedName("lignite_ore", 0.1)],
        [new WeightedName("coal", 0.1)],
        "other",
        "lignite_ore")
        .addOre(items.byg.lignite_ore, 2, ore_base.end_ether)
];

onEvent("recipes", event => {
    event.remove({ "input": "#forge:ores" });
    event.remove({ "input": "#forge:raw_materials" });
    event.remove({ "input": "#create:crushed_ores" });
    event.remove({ "output": "#create:crushed_ores" });
    event.remove({ "type": "create:crushing", "input": "#create:stone_types/crimsite" });
    event.remove({ "type": "minecraft:smelting", "input": items.byg.raw_pendorite });
    event.remove({ "type": "minecraft:blasting", "input": items.byg.raw_pendorite });
    oreProductProcessings.forEach((processing, i, a) => {
        processing.addDustRecipe(event)
        processing.addCrushingRecipe(event)
        processing.addTransitionRecipe(event)
    });

    //Early game
    event.recipes.minecraft.smelting(Item.of(items.minecraft.iron_nugget, 5), items.minecraft.iron_ore)
    event.recipes.minecraft.blasting(Item.of(items.minecraft.iron_nugget, 5), items.minecraft.iron_ore).cookingTime(100)
});

captureEvent("block.loot_tables", event => {
    tags.items.forge.ores.members.forEach((v, i, a) => event.addSimpleBlock(v))
});
