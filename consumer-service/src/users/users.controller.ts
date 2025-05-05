import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('filtered')
  async getFilteredUsers() {
    const result = await lastValueFrom(this.usersService.getFilteredUsers());
    console.log('Filtered Users:', JSON.stringify(result, null, 2));
    return result;
  }
}
