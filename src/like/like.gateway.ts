import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import {Inject, Logger} from '@nestjs/common';
import {Socket, Server} from 'socket.io';
import {LikeService} from "./like.service";

@WebSocketGateway(4000)
export class LikeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @Inject()
    private like: LikeService

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('LikeGateway');

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        this.server.emit('msgToClient', payload);
    }


    @SubscribeMessage('addLike')
    async addLikeToUser(client: Socket, payload: any): Promise<any> {
        const user = {
            id: 1,
            last_name: 'Pirmmamadov',
            name: 'Ilham',
            email: 'ilham.prim@gmail.com',
        }
        await this.like.addLike(payload, user);
        this.server.emit('msgToClient', {success: true});
    }

    @SubscribeMessage('deleteLike')
    async deleteLikeToUser(client: Socket, payload: any): Promise<any> {
        const user = {
            id: 1
        }
        await this.like.deleteLike(payload, user);
        this.server.emit('msgToClient', {success: true});
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}