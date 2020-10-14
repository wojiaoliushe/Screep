import { BaseCreep } from "./BaseCreep";
import { RoomManager } from "../managers/RoomManager";
import { MSource } from "../source/MSource";
import construct = Reflect.construct;
import { Supplier } from "../interface/Supplier";
import { Consumer } from "../interface/Consumer";
import { EnergySupplier } from "../interface/EnergySupplier";

export class Carrier extends BaseCreep {

    public static BODY_PART = [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE];

    private mSupplierList: Supplier[] = [];
    private mConsumerList: Consumer[] = [];

    constructor(creep: Creep, roomManager: RoomManager) {
        super(creep, roomManager);
    }

    operate() {
        super.operate();
        if (this.mStatus == BaseCreep.STATUS_WORK) {
            this.carry();
        }
    }

    setStatusWork() {
        this.mStatus = BaseCreep.STATUS_WORK;
    }

    setSupplierList(supplierList: Supplier[]) {
        this.mSupplierList = supplierList;
    }

    setConsumerList(consumerList: Consumer[]) {
        this.mConsumerList = consumerList
    }

    carry() {
        this.mCreep.say("carry");
        if (this.mCreep.store.getFreeCapacity() > 0) {
            this.findResource();
        } else {
            this.backToStorage();
        }
    }

    private findResource() {
        let target;
        let maxEnergySupplier: Supplier
        this.mSupplierList.forEach((supplier) => {
            if (supplier instanceof EnergySupplier) {
                if (!maxEnergySupplier) {
                    maxEnergySupplier = supplier
                }
                if (supplier.getEnergySupplyCount() > maxEnergySupplier.getSupplyCount()) {
                    if (supplier instanceof MSource) {
                        target = supplier.getMContainer()!!.getContainer()
                    }
                }
            }
        })
        if (target != undefined) {
            this.withdraw(target, RESOURCE_ENERGY)
        }
    }

    private backToStorage() {
        let targets = this.mCreep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (targets.length > 0) {
            if (this.mCreep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.mCreep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
            }
        }
    }
}