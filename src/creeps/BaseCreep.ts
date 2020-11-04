import { RoomManager } from "../managers/RoomManager";

export abstract class BaseCreep {

    private mCreep: Creep;
    protected mRoomManager: RoomManager;

    // 0, free, 1,work
    protected mStatus: number = 0;

    protected static STATUS_FREE = 0;
    protected static STATUS_WORK = 1;

    protected constructor(creep: Creep, roomManager: RoomManager) {
        this.mCreep = creep;
        this.mRoomManager = roomManager;
    }

    public operate() {

    }

    protected say(msg: string) {
        this.mCreep.say(msg);
    }

    protected transfer(target: AnyCreep | Structure, resourceType: ResourceConstant, amount?: number) {
        if (this.mCreep.transfer(target, resourceType, amount) == ERR_NOT_IN_RANGE) {
            this.mCreep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
        }
    }

    protected harvest(target: Source | Mineral | Deposit) {
        if (this.mCreep.harvest(target) == ERR_NOT_IN_RANGE) {
            this.mCreep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
        }
    }

    protected withdraw(target: Structure | Tombstone | Ruin, resourceType: ResourceConstant, amount?: number) {
        if (this.mCreep.withdraw(target, resourceType) == ERR_NOT_IN_RANGE) {
            this.mCreep.moveTo(target, { visualizePathStyle: { stroke: "#ffaaaa" } });
        }
    }

    protected build(target: ConstructionSite) {
        if (this.mCreep.build(target) == ERR_NOT_IN_RANGE) {
            this.mCreep.moveTo(target);
        }
    }

    protected getFreeCapacity() {
        return this.mCreep.store.getFreeCapacity();
    }

    protected static getBodyPart(energyCapacity: number, parts: BodyPartConstant[], minimumSize: number = 3): BodyPartConstant[] {
        let maxParts: BodyPartConstant[] = [];
        let needEnergy = 0;
        for (let i = 0; i < parts.length; i++) {
            let part: BodyPartConstant = parts[i];
            maxParts.push(parts[i]);
            let partNext: BodyPartConstant;
            if (i + 1 < parts.length) {
                partNext = parts[i + 1];
            } else {
                break;
            }
            needEnergy += BODYPART_COST[part];
            if (needEnergy + BODYPART_COST[partNext] > energyCapacity) {
                break;
            }
        }
        return maxParts;
    }
}
