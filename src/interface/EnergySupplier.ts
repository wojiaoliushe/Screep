import { Supplier } from "./Supplier";

export abstract class EnergySupplier implements Supplier{

    abstract getEnergySupplyCount(): any

    protected constructor() {
    }

    getSupplyCount(): any {
        return this.getEnergySupplyCount()
    }

    // getSupplyCount(): any {
    //     return this.getEnergySupplyCount()
    // }
}