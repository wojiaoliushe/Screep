import { BaseStructure } from "./BaseStructure";
import { Harvester } from "../creeps/Harvester";
import { Consumer } from "../interface/Consumer";

export class MSpawn extends BaseStructure implements Consumer {

    private mSpawn: StructureSpawn;

    constructor(spawn: StructureSpawn) {
        super();
        this.mSpawn = spawn;
    }

    public setHarvester(cur: number, goal: number) {
        if (cur < goal) {
            let index: number = this.mSpawn.memory.harvesterIndex;
            let errorCode = this.mSpawn.spawnCreep(Harvester.getBodyPart(0), "Harvester" + index);
            console.log(errorCode);
            if (errorCode == OK) {
                index++;
                this.mSpawn.memory.harvesterIndex = index;
            }
        }
    }

    getConsumer(): any {
        return this;
    }

    getFreeCapacity(): number | null {
        return this.mSpawn.store.getFreeCapacity();
    }

    getSpawn() {
        return this.mSpawn;
    }
}
