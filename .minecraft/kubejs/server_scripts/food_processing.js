// priority: 0

const flours = {
    wheat: items.create.wheat_flour,
    nether: items.create.cinder_flour,
    corn: items.kubejs.flour_corn
}

const doughs = {
    wheat: items.farmersdelight.wheat_dough,//
    sweet: items.kubejs.dough_sweet,//
    berry: items.kubejs.dough_berry,//
    cocoa: items.kubejs.dough_cocoa,//
    cake: items.createaddition.cake_base,
    corn: items.corn_delight.cornbread_batter,
    pie: items.kubejs.raw_pie_crust,
    nether: items.create.blaze_cake_base
}

const cookies = {
    raw_plain: items.kubejs.raw_cookie_plain,
    raw_cocoa: items.kubejs.raw_cookie_cocoa,
    raw_berry: items.kubejs.raw_cookie_berry,
    plain: items.kubejs.cookie_plain,
    cocoa: items.minecraft.cookie,
    berry: items.farmersdelight.sweet_berry_cookie,
    honey: items.farmersdelight.honey_cookie
}

onEvent("recipes", event => {

    function addWaterShapeless(output, inputs) {
        event.recipes.minecraft.crafting_shapeless(output, inputs.concat([Item.of(items.minecraft.water_bucket)])).replaceIngredient(items.minecraft.water_bucket, items.minecraft.bucket)
        event.recipes.minecraft.crafting_shapeless(output, inputs.concat([Item.of(items.minecraft.potion, { Potion: "minecraft:water" })])).replaceIngredient({ item: Item.of(items.minecraft.potion, { Potion: "minecraft:water" }) }, items.minecraft.glass_bottle)
    }

    function foodSmelting(output, input) {
        event.recipes.minecraft.smelting(output, input);
        event.recipes.minecraft.smoking(output, input).cookingTime(100);
    }

    //Some materials

    //250mB water -> Salt
    new DryingBasingRecipe(Item.of(items.kubejs.powder_salt), 40)
        .withFluid(Fluid.water().withAmount(250))
        .drying(event)
        .withDuration(20)
        .mechanical(event);
    //250mB milk -> cheese
    new DryingBasingRecipe(Item.of(items.kubejs.cheese), 400)
        .withFluid(Fluid.of(fluids.minecraft.milk, 250))
        .drying(event)
        .withDuration(200)
        .mechanical(event);
    //1000mB milk -> 750 mB cream
    event.recipes.create.mixing(Fluid.of(fluids.kubejs.cream, 750), [items.kubejs.powder_salt, Fluid.of(fluids.minecraft.milk, 1000)]).heated()

    //Dough unified and expanded

    function cookieCutting(output, input) {
        event.recipes.create.cutting(Item.of(output, 8), input)
        new CuttingRecipe([Item.of(output, 5)], [Ingredient.of(input)], tags.items.forge.tools_knives.tag).create(event)
    }

    //Normal Dough
    event.remove({ "output": items.create.dough })
    event.remove({ "input": items.create.dough })
    event.remove({ "output": doughs.wheat })
    event.remove({ "output": items.minecraft.bread })
    addWaterShapeless(doughs.wheat, [flours.wheat, flours.wheat, items.kubejs.powder_salt])
    foodSmelting(items.minecraft.bread, doughs.wheat)
    event.recipes.create.mixing(doughs.wheat, [flours.wheat, items.kubejs.powder_salt, Fluid.water(250)])

    //Sweet Dough -> Plain Cookies -> Honey Cookies
    addWaterShapeless(doughs.wheat, [flours.wheat, flours.wheat, items.minecraft.sugar])
    event.recipes.create.mixing(doughs.sweet, [flours.wheat, items.minecraft.sugar, Fluid.water(250)])

    cookieCutting(cookies.raw_plain, doughs.sweet)
    foodSmelting(cookies.plain, cookies.raw_plain)

    event.remove({ "output": cookies.honey })
    event.recipes.create.filling(cookies.honey, [cookies.plain, Fluid.of(fluids.create.honey, 30)])

    //Berry Dough - Berry Cookies
    event.recipes.create.mixing(doughs.berry, [doughs.sweet, items.minecraft.sweet_berries])
    cookieCutting(cookies.raw_berry, doughs.berry)
    foodSmelting(cookies.berry, cookies.raw_berry)

    //Cocoa Dough - Cocoa Cookies (minecraft)
    event.recipes.create.mixing(doughs.cocoa, [doughs.sweet, items.minecraft.cocoa_beans])
    cookieCutting(cookies.raw_cocoa, doughs.cocoa)
    foodSmelting(cookies.cocoa, cookies.raw_cocoa)

    //Cake Dough -> Cakes
    event.remove({ "output": items.createaddition.cake_base })
    event.remove({ "output": items.minecraft.cake, "type": "minecraft:crafting_shaped" })
    event.recipes.create.compacting(doughs.cake, [Item.of(doughs.sweet, 2), items.minecraft.egg, Fluid.of(fluids.minecraft.milk, 250)])

})