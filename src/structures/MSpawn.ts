import { BaseStructure } from "./BaseStructure";
import { Harvester } from "../creeps/Harvester";

export class MSpawn extends BaseStructure{

    private mSpawn: StructureSpawn

    constructor(spawn: StructureSpawn) {
        super();
        this.mSpawn = spawn
    }

    public setHarvester(cur: number, goal: number) {
        if (cur < goal) {
            let index: number = this.mSpawn.memory.harvesterIndex
            let errorCode = this.mSpawn.spawnCreep(Harvester.getBodyPart(0), "Harvester" + index);
            console.log(errorCode)
            if (errorCode == OK) {
                index++
                this.mSpawn.memory.harvesterIndex = index
            }
        }
    }
}
