// priority: 0

captureEvent("jei.hide.items", event => {
	tags.items.create.crushed_ores.forEach((v, i, a) => {
		event.hide(v)
	})

	let items_to_hide = [
		"integrateddynamics:proto_chorus",
		"create:dough",
		"integratedterminals:part_terminal_crafting_job",
		"integrateddynamics:part_entity_writer",
		"integrateddynamics:part_machine_writer",
		"integrateddynamics:part_inventory_writer",
		"byg:brim_powder"
	]
	items_to_hide.forEach((v, i, a) => event.hide(v))
})

captureEvent("item.tooltip", event => {
	let raw_food = [
		"minecraft:porkchop",
		"minecraft:beef",
		"minecraft:chicken",
		"minecraft:mutton",
		"farmersdelight:mutton_chops",
		"farmersdelight:minced_beef",
		"farmersdelight:chicken_cuts"
	]
	event.add(raw_food, Text.translate("desc.kubejs.no_raw_meat").gray())
})