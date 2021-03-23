import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { UserRepository } from '../repositories/user.repository';
import { User } from "../entities/user.entity";

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    ){}

  async getUsers():Promise<User[]>{
    return await this.userRepository.find();
  }
  
  async findUser(idUser: number): Promise<User>{
    return await this.userRepository.findOne(idUser, {relations: ["role"]});
  }
 
  async findByUsername(username: string): Promise<User>{
    return await this.userRepository.findOne({
      relations: ["role"],
      where: {username}
    });
  }

  async createUser(data: CreateUserDTO): Promise<User>{
    return await this.userRepository.createUser(data)
  }

  async updateUser(data: UpdateUserDTO): Promise<User>{
    let user = await this.findUser(data.idUser);
    if(!user)
      throw new NotFoundException('User not exists')

    user.email = data.email;
    user.names = data.names;
    user.username = data.username;
    return await this.userRepository.updateUser(data, user);
  }

  async deleteUser(id: number): Promise<any>{
    return await this.userRepository.delete(id);
  }
  
}