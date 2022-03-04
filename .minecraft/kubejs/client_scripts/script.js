// priority: 0

onEvent("jei.hide.items", event => {
	tags.items.create.crushed_ores.forEach((v, i, a) => {
		event.hide(v)
	})

	let items_to_hide = [
		"integrateddynamics:proto_chorus",
		"create:dough",
		"createaddition:diamond_grit",
		"integratedterminals:part_terminal_crafting_job",
		"integrateddynamics:part_entity_writer",
		"integrateddynamics:part_machine_writer",
		"integrateddynamics:part_inventory_writer",
		"byg:brim_powder",
		"integratedtunnels:part_exporter_item",
		"integratedtunnels:part_importer_item",
		"integratedtunnels:part_exporter_fluid",
		"integratedtunnels:part_importer_fluid",
		"integratedtunnels:part_exporter_world_block",
		"integratedtunnels:part_exporter_world_item",
		"integratedtunnels:part_exporter_world_fluid",
		"integratedtunnels:part_importer_world_block",
		"integratedtunnels:part_importer_world_item",
		"integratedtunnels:part_importer_world_fluid",
		"integratedtunnels:part_player_simulator",
		"minecraft:music_disc_otherside"
	]
	items_to_hide.forEach((v, i, a) => event.hide(v))
})

onEvent("item.tooltip", event => {
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