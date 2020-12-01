import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import {Inject, Logger, UseGuards} from '@nestjs/common';
import {Socket, Server} from 'socket.io';
import {LikeService} from "./like.service";
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";
import {User} from "../decorators/user.decorator";

@WebSocketGateway( {namespace: 'like'})
export class LikeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @Inject()
    private like: LikeService

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('LikeGateway');

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        this.server.emit('msgToClient', payload);
    }

    @UseGuards(JwtAuthGuard)
    @SubscribeMessage('addLike')
    async addLikeToUser(client: Socket, payload: any,@User() user: any): Promise<any> {
        await this.like.addLike(payload, user);
        this.server.emit('msgToClient', {success: true});
    }

    @UseGuards(JwtAuthGuard)
    @SubscribeMessage('deleteLike')
    async deleteLikeToUser(client: Socket, payload: any,@User() user: any): Promise<any> {
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