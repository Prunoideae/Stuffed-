// priority: 0

captureEvent("jei.hide.items", event => {
	tags.items.create.crushed_ores.members.forEach((v, i, a) => {
		event.hide(v)
	})

	let items_to_hide = [
		items.create.dough,
		items.integratedterminals.part_terminal_crafting_job,
		items.integrateddynamics.part_entity_writer,
		items.integrateddynamics.part_machine_writer,
		items.integrateddynamics.part_inventory_writer,
		items.byg.brim_powder
	]
	items_to_hide.forEach((v, i, a) => event.hide(v))
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