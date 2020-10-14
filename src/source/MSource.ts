import { MContainer } from "../structures/MContainer";
import { Supplier } from "../interface/Supplier";
import { EnergySupplier } from "../interface/EnergySupplier";

export class MSource extends EnergySupplier{
    private mSource: Source;
    private mContainer: MContainer | undefined;

    constructor(source: Source) {
        super();
        this.mSource = source;
    }

    public setMContainer(container: MContainer) {
        this.mContainer = container;
    }

    public isHasContainer() {
        return this.mContainer != undefined
    }

    public getMContainer() {
        return this.mContainer
    }

    public getSource(): Source {
        return this.mSource;
    }

    getEnergySupplyCount(): any {
        if (this.isHasContainer() && this.getMContainer()?.getContainer) {
            return this.getMContainer()!!.getContainer().store[RESOURCE_ENERGY]
        }
        return 0
    }
}