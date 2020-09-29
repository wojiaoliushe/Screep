import { RoomManager } from "../managers/RoomManager";
import { BaseCreep } from "./BaseCreep";

export class Harvester extends BaseCreep {

    public static BODY_PART = [WORK, CARRY, MOVE]

    constructor(creep: Creep, roomManager: RoomManager) {
        super(creep, roomManager)
    }

    // operate() {
    //     if (this.mStatus == BaseCreep.STATUS_WORK) {
    //         this.harvest()
    //     }
    // }

    operate() {
        super.operate()
        if (this.mStatus == BaseCreep.STATUS_WORK) {
            this.harvest()
        }
    }

    setStatusWork() {
        this.mStatus = BaseCreep.STATUS_WORK
    }

    harvest() {
        this.mCreep.say("harvest")
        if(this.mCreep.store.getFreeCapacity() > 0) {
            this.goMine()
        } else {
            this.backToStorage()
        }
    }

    private goMine() {
        let sources = this.mCreep.room.find(FIND_SOURCES);
        if(this.mCreep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            this.mCreep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }

    private backToStorage() {
        let targets = this.mCreep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(targets.length > 0) {
            if(this.mCreep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.mCreep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}
