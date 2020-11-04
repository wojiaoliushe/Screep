import { RoomManager } from "../managers/RoomManager";
import { BaseCreep } from "./BaseCreep";
import { MSource } from "../source/MSource";
import { MSpawn } from "../structures/MSpawn";

export class Harvester extends BaseCreep {

    public static BODY_PART = [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE];

    private mWorkTarget: MSource | undefined;

    constructor(creep: Creep, roomManager: RoomManager) {
        super(creep, roomManager);
    }

    operate() {
        super.operate();
        if (this.mStatus == BaseCreep.STATUS_WORK) {
            this.harvestWork();
        }
    }

    setWorkSource(source: MSource) {
        this.mWorkTarget = source;
    }

    setStatusWork() {
        this.mStatus = BaseCreep.STATUS_WORK;
    }

    harvestWork() {
        this.say("harvest")
        if (this.getFreeCapacity() > 0) {
            this.goMine();
        } else {
            this.backToStorage();
        }
    }

    private goMine() {
        if (!this.mWorkTarget) {
            return;
        }
        let source: Source = this.mWorkTarget.getSource();
        this.harvest(source)
    }

    private backToStorage() {
        if (!this.mWorkTarget) {
            return;
        }
        let container = this.mWorkTarget.getMContainer()?.getContainer();
        if (!container) {
            // let targets = this.mRoomManager.getMSpawn(); //没有container就送到spawn
            // for (let target of targets) {
            //     let capacity = target.getFreeCapacity();
            //     if (capacity != null && capacity > 0) {
            //         this.transfer(target.getSpawn(), RESOURCE_ENERGY)
            //         break;
            //     }
            // }



        } else {  //有container就送到container
            this.transfer(container, RESOURCE_ENERGY)
        }
    }

    public static isHarvester(name: String): boolean {
        return name.startsWith("Harvester");
    }

    public static getBodyPart(energyCapacity: number): BodyPartConstant[] {
        return super.getBodyPart(energyCapacity, Harvester.BODY_PART, 3);
    }
}
