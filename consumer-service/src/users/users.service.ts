import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserList } from '../interfaces/users.interface';

interface UserService {
  getFilteredUsers(data: object): Observable<UserList>;
}

@Injectable()
export class UsersService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'users',
      protoPath: join(__dirname, '../../../proto/users.proto'),
      url: 'localhost:5001',
    },
  })
  private client: ClientGrpc;

  private userService: UserService;

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  getFilteredUsers() {
    return this.userService.getFilteredUsers({});
  }
}
