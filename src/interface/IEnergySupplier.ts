import { ISupplier } from "./ISupplier";

export interface IEnergySupplier extends ISupplier {
    getEnergyReadyCount(): any
}