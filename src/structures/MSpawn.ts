import { BaseStructure } from "./BaseStructure";

export class MSpawn extends BaseStructure{

    private mSpawn: StructureSpawn

    constructor(spawn: StructureSpawn) {
        super();
        this.mSpawn = spawn
    }

    public setHarvester(cur: number, goal: number) {
        if (cur < goal) {
            let index: number = this.mSpawn.memory.harvesterIndex
            let errorCode = this.mSpawn.spawnCreep([WORK, CARRY, MOVE], "Harvester" + index);
            console.log(errorCode)
            if (errorCode == OK) {
                index++
                this.mSpawn.memory.harvesterIndex = index
            }
        }
    }
}
