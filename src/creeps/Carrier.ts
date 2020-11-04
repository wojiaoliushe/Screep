import { BaseCreep } from "./BaseCreep";
import { RoomManager } from "../managers/RoomManager";
import { MSource } from "../source/MSource";
import construct = Reflect.construct;
import { ISupplier } from "../interface/ISupplier";
import { IConsumer } from "../interface/IConsumer";
import { IEnergySupplier } from "../interface/IEnergySupplier";
import { MSpawn } from "../structures/MSpawn";

export class Carrier extends BaseCreep {

    public static BODY_PART = [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE];

    private mSupplierList: ISupplier[] = [];
    private mConsumeTarget: IConsumer | undefined;

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

    setConsumeTarget(consumer: IConsumer) {
        this.mConsumeTarget = consumer;
    }

    carryWork() {
        this.say("carry");
        if (this.getFreeCapacity() > 0) {
            this.findResource();
        } else {
            this.backToStorage();
        }
    }

    private findResource() {
        let target;
        let maxEnergySupplier: IEnergySupplier;
        this.mSupplierList.forEach((supplier) => {
            if (supplier instanceof MSource) {
                if (!maxEnergySupplier) {
                    maxEnergySupplier = supplier;
                }
                if (supplier.getEnergyReadyCount() > maxEnergySupplier.getEnergyReadyCount()) {
                    maxEnergySupplier = supplier;
                    target = supplier.getMContainer()!!.getContainer();
                }
            }
        });
        if (target != undefined) {
            this.withdraw(target, RESOURCE_ENERGY);
        }
    }

    private backToStorage() {
        if (this.mConsumeTarget instanceof MSpawn) {
            this.transfer(this.mConsumeTarget.getSpawn(), RESOURCE_ENERGY);
        }
    }

    public static getBodyPart(energyCapacity: number): BodyPartConstant[] {
        return super.getBodyPart(energyCapacity, Carrier.BODY_PART, 2);
    }
}