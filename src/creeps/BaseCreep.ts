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
        this.mCreep.say(msg)
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

    protected getFreeCapacity() {
        return this.mCreep.store.getFreeCapacity()
    }
}
