import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { User } from "../entities/user.entity";

@Controller('users')
export class UserController{
  constructor(private readonly userService: UserService){}

  @Get()
  async getUsers(): Promise<User[]>{
    return await this.userService.getUsers()
  }
  
  @Get(':idUser')
  async findUser(@Param('idUser') idUser: number): Promise<User>{
    return await this.userService.findUser(idUser);
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO): Promise<User>{
    return await this.userService.createUser(data);
  }

  @Put()
  async updateUser(@Body() data: UpdateUserDTO): Promise<User>{
    return await this.userService.updateUser(data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User>{
    return await this.userService.deleteUser(id)
  }
}