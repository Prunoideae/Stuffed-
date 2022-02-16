// priority: 0

captureEvent("jei.hide.items", event => {
	tags.items.create.crushed_ores.members.forEach((v, i, a) => {
		event.hide(v)
	})

	event.hide(items.create.dough)
	event.hide(items.farmersdelight.wheat_dough)
})

captureEvent("item.tooltip", event => {
	let raw_food = [
		items.minecraft.porkchop,
		items.minecraft.beef,
		items.minecraft.chicken,
		items.minecraft.mutton,
		items.farmersdelight.mutton_chops,
		items.farmersdelight.minced_beef,
		items.farmersdelight.chicken_cuts
	]
	event.add(raw_food, Text.translate("desc.kubejs.no_raw_meat").gray())
})