import { BaseStructure } from "./BaseStructure";
import { Harvester } from "../creeps/Harvester";
import { IConsumer } from "../interface/IConsumer";
import { IEnergyConsumer } from "../interface/IEnergyConsumer";
import { RoomManager } from "../managers/RoomManager";

export class MSpawn extends BaseStructure implements IEnergyConsumer {

    private mSpawn: StructureSpawn;
    private mRoomManager: RoomManager;

    priority = 1;

    constructor(spawn: StructureSpawn, roomManager: RoomManager) {
        super();
        this.mSpawn = spawn;
        this.mRoomManager = roomManager;
    }

    public setHarvester(cur: number, goal: number) {
        if (cur < goal) {
            let index: number = this.mSpawn.memory.harvesterIndex;
            let errorCode = this.mSpawn.spawnCreep(Harvester.getBodyPart(this.mRoomManager.getRoom().energyCapacityAvailable),
                "Harvester" + index,
                {
                    memory: { role: "harvester" }
                });
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
        return this.getFreeCapacity();
    }

}
