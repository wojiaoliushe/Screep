import { RoomManager } from "../managers/RoomManager";

export class BaseCreep {

    protected mCreep: Creep
    protected mRoomManager: RoomManager

    // 1,work
    protected mStatus: number = 0

    protected static STATUS_WORK = 1

    protected constructor(creep: Creep, roomManager: RoomManager) {
        this.mCreep = creep
        this.mRoomManager = roomManager
    }

    public operate() {

    }

}
