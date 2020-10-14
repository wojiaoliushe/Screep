import { MContainer } from "../structures/MContainer";
import { ISupplier } from "../interface/ISupplier";
import { IEnergySupplier } from "../interface/IEnergySupplier";

export class MSource implements IEnergySupplier{
    private mSource: Source;
    private mContainer: MContainer | undefined;

    constructor(source: Source) {
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

    getEnergyReadyCount(): any {
        if (this.isHasContainer() && this.getMContainer()?.getContainer) {
            return this.getMContainer()!!.getStore(RESOURCE_ENERGY)
        }
        return 0
    }
}