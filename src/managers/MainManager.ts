import { RoomManager } from "./RoomManager";

export class MainManager {

    private static mRoom: RoomManager[] = []

    public static operate(time: number) {
        for (const roomName in Game.rooms) {
            const room = Game.rooms[roomName]
            const roomManager = new RoomManager(room, time)
            roomManager.setStatusWork()
            roomManager.operate()
            this.mRoom.push(roomManager)
        }
    }
}
