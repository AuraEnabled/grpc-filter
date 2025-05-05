import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  getFilteredUsers() {
    const filePath = join(__dirname, '../../src/data/users.json');
    const usersData = readFileSync(filePath, 'utf8');
    const users: User[] = JSON.parse(usersData) as User[];

    const filteredUsers = users.filter((user) => user.age > 18);

    return { users: filteredUsers };
  }
}
