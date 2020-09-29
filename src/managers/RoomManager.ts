import { Harvester } from "../creeps/Harvester";
import { BaseCreep } from "../creeps/BaseCreep";

export class RoomManager {

    public static STATUS_WORK = 1
    private mStatus = 0

    private mRoom: Room
    private mSource: Source[] = []
    private mCreeps: Creep[] = [] //只用作初始化其他creep, 不作功能操作
    private mHarvester: Harvester[] = []
    private mBaseCreeps: BaseCreep[] = []

    constructor(room: Room, time: number) {
        this.mRoom = room;
        this.initSource()
        this.initCreeps(time)
    }

    public setStatusWork() {
        this.mStatus = RoomManager.STATUS_WORK
    }

    private initSource() {
        if (this.mRoom.memory.resources == null || this.mRoom.memory.resources == []) {
            this.mSource = this.mRoom.find(FIND_SOURCES)
            let sourceList: Id<Source>[] = []
            this.mSource.forEach((source) => {
                sourceList.push(source.id)
            })
            this.mRoom.memory.resources = sourceList
        } else {
            let sourceList = this.mRoom.memory.resources
            sourceList.forEach((id) => {
                let source = Game.getObjectById(id)
                if (source) {
                    this.mSource.push(source)
                }
            })
        }
    }

    private initCreeps(time: number) {
        if (time % 3 == 0) {
            this.mCreeps = this.mRoom.find(FIND_CREEPS)
            let creepList: Id<Source>[] = []
            this.mSource.forEach((source) => {
                creepList.push(source.id)
            })
            this.mRoom.memory.resources = creepList
        } else {
            let creepList = this.mRoom.memory.resources
            creepList.forEach((id) => {
                let creep = Game.getObjectById(id)
                if (creep) {
                    this.mSource.push(creep)
                }
            })
        }

        this.initHarvester()
    }

    private initHarvester() {
        this.mCreeps.forEach((creep) => {
            let isHarvester = false
            creep.body.forEach((part) => {
                if (part.type == WORK) {
                    isHarvester = true
                }
            })
            this.mHarvester.push(new Harvester(creep, this))
        })
    }

    public operate() {
        if (this.mStatus == RoomManager.STATUS_WORK) {
            this.mHarvester.forEach((creep) => {
                creep.setStatusWork()
            })
        }

        this.mHarvester.forEach((creep) => {
            creep.operate()
        })
    }
}
