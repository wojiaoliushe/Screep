// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
}

interface RoomMemory {
  sources: Id<Source>[];
  sourceContainers: Map<Id<Source>, Id<StructureContainer>>
  spawns: Id<StructureSpawn>[];
  creeps: Id<Creep>[];
}

interface SourceMemory {
  sources: Id<Source>[];
  sourceContainers: Map<Id<Source>, Id<StructureContainer>>
  spawns: Id<StructureSpawn>[];
  creeps: Id<Creep>[];
}

interface SpawnMemory {
  harvesterIndex: number;
}

interface Memory {
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
