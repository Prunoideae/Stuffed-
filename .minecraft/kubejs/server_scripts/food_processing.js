// priority: 0

onEvent("recipes", event => {
    //250mB water -> Salt
    new DryingBasingRecipe(Item.of(items.kubejs.powder_salt), 40)
        .withFluid(Fluid.water().withAmount(250))
        .universal(event);

    //Dough unified and expanded
    event.remove({ "input": items.farmersdelight.wheat_dough });
    event.remove({ "output": items.farmersdelight.wheat_dough });
    event.remove({ "input": items.create.dough });
    event.remove({ "output": items.create.dough });
    
})