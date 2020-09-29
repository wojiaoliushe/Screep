import { Harvester } from "../creeps/Harvester";
import { BaseCreep } from "../creeps/BaseCreep";
import { spawn } from "child_process";
import { MSpawn } from "../structures/MSpawn";

export class RoomManager {

    public static STATUS_WORK = 1
    private mStatus = 0

    private mRoom: Room
    private mSource: Source[] = []
    private mHarvester: Harvester[] = []
    private mBaseCreeps: BaseCreep[] = []
    private mSpawns: MSpawn[] = []

    constructor(room: Room, time: number) {
        this.mRoom = room;
        this.initSource();
        this.initCreeps(time);
        this.initSpawn();
    }

    public setStatusWork() {
        this.mStatus = RoomManager.STATUS_WORK;
    }

    private initSpawn() {
        let spawns: StructureSpawn[] = this.mRoom.find(FIND_MY_SPAWNS)
        spawns.forEach((spawn) => {
            this.mSpawns.push(new MSpawn(spawn));
        })
    }

    private initSource() {
        if (this.mRoom.memory.resources == null || this.mRoom.memory.resources == []) {
            console.log("1")
            this.mSource = this.mRoom.find(FIND_SOURCES);
            let sourceList: Id<Source>[] = [];
            this.mSource.forEach((source) => {
                sourceList.push(source.id);
            })
            this.mRoom.memory.resources = sourceList;
        } else {
            console.log("2")
            let sourceList = this.mRoom.memory.resources
            sourceList.forEach((id) => {
                let source = Game.getObjectById(id);
                if (source) {
                    this.mSource.push(source);
                }
            })
        }
    }

    private initCreeps(time: number) {
        let creeps: Creep[] = [];

        if (time % 10 == 0) {
            creeps = this.mRoom.find(FIND_CREEPS)
            let creepList: Id<Creep>[] = []
            creeps.forEach((creep) => {
                creepList.push(creep.id)
            })
            this.mRoom.memory.creeps = creepList
        } else {
            let creepList = this.mRoom.memory.creeps
            creepList.forEach((id) => {
                let creep = Game.getObjectById(id)
                if (creep) {
                    creeps.push(creep)
                }
            })
        }

        // creeps = this.mRoom.find(FIND_CREEPS)
        // let creepList: Id<Creep>[] = []
        // creeps.forEach((creep) => {
        //     creepList.push(creep.id)
        // })
        // this.mRoom.memory.creeps = creepList

        this.initHarvester(creeps)
    }

    private initHarvester(creeps: Creep[]) {
        creeps.forEach((creep) => {
            let isHarvester = false
            creep.body.forEach((part) => {
                if (part.type == WORK) {
                    isHarvester = true
                }
            })
            let harvester = new Harvester(creep, this)
            this.mHarvester.push(harvester)
            this.mBaseCreeps.push(harvester)
        })
    }

    public operate() {
        if (this.mStatus == RoomManager.STATUS_WORK) {
            this.mHarvester.forEach((creep) => {
                creep.setStatusWork()
            })
        }

        this.mBaseCreeps.forEach((creep) => {
            creep.operate()
        })

        this.mSpawns.forEach((spawn) => {
            spawn.setHarvester(this.mHarvester.length, 3)
        })
    }
}
