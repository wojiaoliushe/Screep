// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  room: string;
  working: boolean;
}

interface RoomMemory {
  resources: Id<Source>[];
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
