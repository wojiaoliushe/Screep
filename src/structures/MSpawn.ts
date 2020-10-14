import { BaseStructure } from "./BaseStructure";
import { Harvester } from "../creeps/Harvester";
import { IConsumer } from "../interface/IConsumer";
import { IEnergyConsumer } from "../interface/IEnergyConsumer";

export class MSpawn extends BaseStructure implements IEnergyConsumer {

    private mSpawn: StructureSpawn;

    priority = 1

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

    getFreeCapacity(): number | null {
        return this.mSpawn.store.getFreeCapacity();
    }

    getSpawn() {
        return this.mSpawn;
    }

    getEnergyNeedCount(): any {
        return this.getFreeCapacity()
    }

}
