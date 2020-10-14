import { BaseCreep } from "./BaseCreep";
import { RoomManager } from "../managers/RoomManager";
import { MSource } from "../source/MSource";
import construct = Reflect.construct;
import { ISupplier } from "../interface/ISupplier";
import { IConsumer } from "../interface/IConsumer";
import { IEnergySupplier } from "../interface/IEnergySupplier";

export class Carrier extends BaseCreep {

    public static BODY_PART = [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE];

    private mSupplierList: ISupplier[] = [];
    private mConsumerList: IConsumer[] = [];

    constructor(creep: Creep, roomManager: RoomManager) {
        super(creep, roomManager);
    }

    operate() {
        super.operate();
        if (this.mStatus == BaseCreep.STATUS_WORK) {
            this.carryWork();
        }
    }

    setStatusWork() {
        this.mStatus = BaseCreep.STATUS_WORK;
    }

    setSupplierList(supplierList: ISupplier[]) {
        this.mSupplierList = supplierList;
    }

    setConsumerList(consumerList: IConsumer[]) {
        this.mConsumerList = consumerList
    }

    carryWork() {
        this.say("carry")
        if (this.getFreeCapacity() > 0) {
            this.findResource();
        } else {
            this.backToStorage();
        }
    }

    private findResource() {
        let target;
        let maxEnergySupplier: IEnergySupplier
        this.mSupplierList.forEach((supplier) => {
            if (supplier instanceof MSource) {
                if (!maxEnergySupplier) {
                    maxEnergySupplier = supplier
                }
                if (supplier.getEnergyReadyCount() > maxEnergySupplier.getEnergyReadyCount()) {
                    maxEnergySupplier = supplier
                    target = supplier.getMContainer()!!.getContainer()
                }
            }
        })
        if (target != undefined) {
            this.withdraw(target, RESOURCE_ENERGY)
        }
    }

    private backToStorage() {

        let maxPriority = 0;
        this.mConsumerList.forEach((consumer) => {
            if (consumer.priority > 0) {
                maxPriority = consumer.priority
            }
        })


        // let targets = this.mCreep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
        //             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        //     }
        // });
        // if (targets.length > 0) {
        //     if (this.mCreep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         this.mCreep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        //     }
        // }
    }
}