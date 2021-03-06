module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the spawn but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the spawn
        if (creep.memory.working == true) {
            if (creep.room.name == creep.memory.home) {
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                || s.structureType == STRUCTURE_EXTENSION
                                || s.structureType == STRUCTURE_TOWER)
                                && s.energy < s.energyCapacity
                });
                if (structure != undefined) {
                    // try to transfer energy, if the spawn is not in range
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                      // move towards the spawn
                      creep.moveTo(structure);
                    }
                }
            }
            else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.home.findClosestByRange(exit));
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            if (creep.room.name = creep.memory.target) {
                // find closest source
                var source = creep.room.find(FIND_SOURCES) [creep.memory.sourceIndex];

                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }
            }
            else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.home.findClosestByRange(exit));
            }
        }
    }
};
