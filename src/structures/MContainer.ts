import { BaseStructure } from "./BaseStructure";

export class MContainer extends BaseStructure{
    private mContainer: StructureContainer

    constructor(container: StructureContainer) {
        super();
        this.mContainer = container
    }

    public getContainer() {
        return this.mContainer
    }
}