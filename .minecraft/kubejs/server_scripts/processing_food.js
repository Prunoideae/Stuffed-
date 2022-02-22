// priority: 0

const flours = {
    wheat: "create:wheat_flour",
    nether: "create:cinder_flour",
    corn: "kubejs:flour_corn",
}

const doughs = {
    wheat: "farmersdelight:wheat_dough",//
    wrap: "kubejs:raw_wrap_bread",//
    sweet: "kubejs:dough_sweet",//
    berry: "kubejs:dough_berry",//
    cocoa: "kubejs:dough_cocoa",//
    cake: "createaddition:cake_base",//
    corn: "corn_delight:cornbread_batter",//
    pie: "kubejs:raw_pie_crust",//
    nether: "create:blaze_cake_base"//
}

const cookies = {
    raw_plain: "kubejs:raw_cookie_plain",
    raw_cocoa: "kubejs:raw_cookie_cocoa",
    raw_berry: "kubejs:raw_cookie_berry",
    plain: "kubejs:cookie_plain",
    cocoa: "minecraft:cookie",
    berry: "farmersdelight:sweet_berry_cookie",
    honey: "farmersdelight:honey_cookie"
}

onEvent("recipes", event => {

    function addWaterShapeless(output, inputs) {
        event.recipes.minecraft.crafting_shapeless(output, inputs.concat([Item.of("minecraft:water_bucket")])).replaceIngredient("minecraft:water_bucket", "minecraft:bucket")
        event.recipes.minecraft.crafting_shapeless(output, inputs.concat([Item.of("minecraft:potion", { Potion: "minecraft:water" })])).replaceIngredient({ item: Item.of("minecraft:potion", { Potion: "minecraft:water" }) }, "minecraft:glass_bottle")
    }

    function addMilkShapeless(output, inputs) {
        event.recipes.minecraft.crafting_shapeless(output, inputs.concat([Item.of("minecraft:milk_bucket")])).replaceIngredient("minecraft:milk_bucket", "minecraft:bucket")
        event.recipes.minecraft.crafting_shapeless(output, inputs.concat([Item.of("farmersdelight:milk_bottle")])).replaceIngredient(Item.of("farmersdelight:milk_bottle"), "minecraft:glass_bottle")
    }

    function foodSmelting(output, input) {
        event.recipes.minecraft.smelting(output, input);
        event.recipes.minecraft.smoking(output, input).cookingTime(100);
    }

    //Some materials

    //250mB water -> Salt
    new DryingBasingRecipe(Item.of("kubejs:powder_salt"), 40)
        .withFluid(Fluid.water().withAmount(250))
        .drying(event)
        .withDuration(20)
        .mechanical(event);
    //250mB milk -> cheese
    new DryingBasingRecipe(Item.of("kubejs:cheese"), 400)
        .withFluid(Fluid.of("minecraft:milk", 250))
        .drying(event)
        .withDuration(200)
        .mechanical(event);
    //1000mB milk -> 750 mB cream
    event.recipes.create.mixing(Fluid.of("kubejs:cream", 750), ["kubejs:powder_salt", Fluid.of("minecraft:milk", 1000)]).heated()
    //250mB cream -> butter 
    event.recipes.create.mixing("kubejs:butter", [Fluid.of("kubejs:cream", 250), "kubejs:powder_salt"])
    //Tomato Sauce needs some salt
    event.remove({ "output": "farmersdelight:tomato_sauce" })
    new CookingRecipe(Item.of("farmersdelight:tomato_sauce"), [
        Item.of("farmersdelight:tomato"), Item.of("farmersdelight:tomato"),
        Item.of("kubejs:powder_salt")
    ]).bowl(Item.of("minecraft:bowl")).create(event)

    //Doughs unified and expanded
    function cutting(output, input, basic, advanced) {
        event.recipes.create.cutting(Item.of(output, advanced), input)
        new CuttingRecipe([Item.of(output, basic)], [Ingredient.of(input)], "#forge:tools/knives").create(event)
    }

    let cookieCutting = (output, input) => cutting(output, input, 5, 8)

    //Normal Dough
    event.remove({ "output": "create:dough" })
    event.remove({ "input": "create:dough" })
    event.remove({ "output": doughs.wheat })
    event.remove({ "output": "minecraft:bread" })
    addWaterShapeless(doughs.wheat, [flours.wheat, flours.wheat, "kubejs:powder_salt"])
    foodSmelting("minecraft:bread", doughs.wheat)
    event.recipes.create.mixing(doughs.wheat, [flours.wheat, "kubejs:powder_salt", Fluid.water(200)])

    //Wrap bread
    new RollingRecipe(Item.of(doughs.wrap), Item.of(doughs.wheat))
        .create(event)
    foodSmelting("kubejs:wraped_bread", doughs.wrap)

    //Sweet Dough -> Plain Cookies -> Honey Cookies
    event.remove({ "output": "farmersdelight:honey_cookie" })
    event.remove({ "output": "farmersdelight:sweet_berry_cookie" })
    event.remove({ "output": "minecraft:cookie" })
    addMilkShapeless(doughs.sweet, [flours.wheat, flours.wheat, "minecraft:sugar"])
    event.recipes.create.mixing(doughs.sweet, [flours.wheat, "minecraft:sugar", Fluid.of("minecraft:milk", 100)])
    cookieCutting(cookies.raw_plain, doughs.sweet)
    foodSmelting(cookies.plain, cookies.raw_plain)
    event.remove({ "output": cookies.honey })
    event.recipes.create.filling(cookies.honey, [cookies.plain, Fluid.of("create:honey", 30)])

    //Berry Dough - Berry Cookies
    event.recipes.create.mixing(doughs.berry, [doughs.sweet, "minecraft:sweet_berries"])
    cookieCutting(cookies.raw_berry, doughs.berry)
    foodSmelting(cookies.berry, cookies.raw_berry)

    //Cocoa Dough - Cocoa Cookies (minecraft)
    event.recipes.create.mixing(doughs.cocoa, [doughs.sweet, "minecraft:cocoa_beans"])
    cookieCutting(cookies.raw_cocoa, doughs.cocoa)
    foodSmelting(cookies.cocoa, cookies.raw_cocoa)

    //Cake Dough -> Cakes
    event.remove({ "output": "createaddition:cake_base" })
    event.remove({ "output": "minecraft:cake", "type": "minecraft:crafting_shaped" })
    event.recipes.create.compacting(doughs.cake, [Item.of(doughs.sweet, 2), "minecraft:egg", Fluid.of("minecraft:milk", 250)])

    //Corn Flour -> Cornbread batter -> Cornbread/Tortilla
    event.remove({ "output": "corn_delight:cornbread_batter" })
    event.remove({ "output": "corn_delight:tortilla_raw" })
    event.recipes.create.milling([flours.corn], "corn_delight:corn")
    event.recipes.create.crushing([flours.corn, Item.of(flours.corn).withChance(0.5), Item.of("corn_delight:corn_seeds").withChance(0.2)], "corn_delight:corn")
    addMilkShapeless(doughs.corn, [flours.corn, flours.corn, "minecraft:egg"])
    event.recipes.create.mixing(doughs.corn, [flours.corn, "minecraft:egg", Fluid.of("minecraft:milk", 100)])
    new RollingRecipe(Item.of("corn_delight:tortilla_raw"), Item.of(doughs.corn))
        .create(event)

    //Pie crust 
    event.remove({ "output": "farmersdelight:pie_crust" })
    event.recipes.create.compacting(doughs.pie, [flours.wheat, flours.wheat, "kubejs:butter"])
    foodSmelting("farmersdelight:pie_crust", doughs.pie)

    //Pasta
    event.remove({ "output": "farmersdelight:raw_pasta" })
    cutting("farmersdelight:raw_pasta", doughs.wheat, 2, 3)

    //Butter and cheese for everyone
    event.remove({ "output": "farmersdelight:stuffed_potato" })
    event.recipes.minecraft.crafting_shapeless("farmersdelight:stuffed_potato", [
        "minecraft:baked_potato", "#forge:cooked_beef",
        "minecraft:carrot", "kubejs:cheese"
    ])

    //Creamed Corn
    event.remove({ "output": "corn_delight:creamed_corn" })
    new CookingRecipe(Item.of("corn_delight:creamed_corn"), [
        Item.of("kubejs:cream_bucket"), Item.of("corn_delight:corn_seeds"), Item.of("corn_delight:corn_seeds")
    ]).bowl(Item.of("minecraft:bowl")).create(event)

    //Corn Soup
    event.remove({ "output": "corn_delight:corn_soup" })
    let cornSoupRecipes = [
        new CookingRecipe(Item.of("corn_delight:corn_soup"), [
            Item.of("kubejs:cream_bucket"), Item.of("corn_delight:corn"),
            Ingredient.of("#forge:salad_ingredients"), Ingredient.of("#forge:raw_chicken")]),
        new CookingRecipe(Item.of("corn_delight:corn_soup"), [
            Item.of("kubejs:cream_bucket"), Item.of("corn_delight:corn"),
            Ingredient.of("#forge:salad_ingredients"), Item.of("minecraft:brown_mushroom")]),
        new CookingRecipe(Item.of("corn_delight:corn_soup"), [
            Item.of("kubejs:cream_bucket"), Item.of("corn_delight:corn"),
            Ingredient.of("#forge:salad_ingredients"), Ingredient.of("#forge:raw_beef")]),
        new CookingRecipe(Item.of("corn_delight:corn_soup"), [
            Item.of("kubejs:cream_bucket"), Item.of("corn_delight:corn"),
            Ingredient.of("#forge:salad_ingredients"), Ingredient.of("#forge:raw_pork")])
    ]
    cornSoupRecipes.forEach((v, i, a) => v.bowl(Item.of("minecraft:bowl")).create(event))

    //Pumpkin Soup
    event.remove({ "output": "farmersdelight:pumpkin_soup" })
    new CookingRecipe(Item.of("farmersdelight:pumpkin_soup"), [
        Item.of("farmersdelight:pumpkin_slice"), Ingredient.of("#forge:salad_ingredients"),
        Ingredient.of("#forge:raw_pork"), Item.of("kubejs:cream_bucket")
    ]).bowl("minecraft:bowl").create(event)

    //Creamy Corn Drink 
    event.remove({ "output": "corn_delight:creamy_corn_drink" })
    new CookingRecipe(Item.of("corn_delight:creamy_corn_drink"), [
        Item.of(flours.corn), Item.of("kubejs:cream_bucket"), Item.of("minecraft:sugar")
    ]).bowl("minecraft:glass_bottle").create(event)

    //Shepherd's pie
    event.remove({ "output": "farmersdelight:shepherds_pie_block" })
    event.recipes.minecraft.crafting_shaped("farmersdelight:shepherds_pie_block", [
        'PCP',
        'MMM',
        'OBO'
    ], {
        P: "minecraft:baked_potato",
        C: "kubejs:cheese",
        M: "#forge:cooked_mutton",
        O: "farmersdelight:onion",
        B: "minecraft:bowl"
    })

    //Mutton Wrap 
    event.remove({ "output": "farmersdelight:mutton_wrap" })
    event.recipes.minecraft.crafting_shapeless("farmersdelight:mutton_wrap", [
        "kubejs:wraped_bread", "#forge:cooked_mutton",
        "#forge:salad_ingredients", "farmersdelight:onion"
    ])

    //Dumplings, how dare you call this dumplings
    event.remove({ "output": "farmersdelight:dumplings" })
    new CookingRecipe(Item.of("farmersdelight:dumplings", 4), [
        Item.of(doughs.wrap), Ingredient.of("#forge:salad_ingredients"),
        Item.of("minecraft:porkchop"), Item.of("farmersdelight:onion")
    ])

})