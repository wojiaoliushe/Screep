import { MContainer } from "../structures/MContainer";
import { ISupplier } from "../interface/ISupplier";
import { IEnergySupplier } from "../interface/IEnergySupplier";
import { RoomManager } from "../managers/RoomManager";

export class MSource implements IEnergySupplier{
    private mSource: Source;
    private mContainer: MContainer | undefined;
    // private mRoomManager: RoomManager

    constructor(source: Source) {
        this.mSource = source;
        // this.mRoomManager = roomManager;

        // Memory.spawns
        // let containerId = this.mRoomManager.getRoom().memory.sourceContainers.get(this.mSource.id)
        // if (containerId) {
        //     let container = Game.getObjectById<StructureContainer>(containerId)
        //     if (container) {
        //         this.mContainer = new MContainer(container)
        //     }
        // }
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