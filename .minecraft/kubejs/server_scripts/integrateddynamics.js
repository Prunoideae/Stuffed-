// priority : 0

onEvent("recipes", event => {
    /**
     * This thing should be splited into 2 parts.
     * In early stage, and at the end of line.
     * If anything is done manually, it should be simplified,
     * if anything is done automatically, the difficulty should
     * be enhanced greatly, or stripped off.
     * */

    //Most item/fluid features in ID are stripped off.
    event.remove({ "output": "integrateddynamics:proto_chorus" })
    event.remove({ "input": "integrateddynamics:proto_chorus" })
    event.remove({ "output": "integratedtunnels:part_exporter_item" })
    event.remove({ "output": "integratedtunnels:part_importer_item" })
    event.remove({ "output": "integratedtunnels:part_exporter_fluid" })
    event.remove({ "output": "integratedtunnels:part_importer_fluid" })
    event.remove({ "output": "integratedtunnels:part_exporter_world_block" })
    event.remove({ "output": "integratedtunnels:part_exporter_world_item" })
    event.remove({ "output": "integratedtunnels:part_exporter_world_fluid" })
    event.remove({ "output": "integratedtunnels:part_importer_world_block" })
    event.remove({ "output": "integratedtunnels:part_importer_world_item" })
    event.remove({ "output": "integratedtunnels:part_importer_world_fluid" })
    event.remove({ "output": "integratedtunnels:part_player_simulator" })
})