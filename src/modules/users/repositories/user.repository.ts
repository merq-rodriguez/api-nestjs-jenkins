import { EntityRepository, Repository } from "typeorm";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async createUser(data: CreateUserDTO): Promise<User>{
    let user = new User()
    user.email = data.email;
    user.names = data.names;
    user.username = data.username;
    user.password = data.password;
    return await user.save();
  }

  async updateUser(data: UpdateUserDTO, user: User): Promise<User>{
    user.email = data.email;
    user.names = data.names;
    user.username = data.username;
    return await user.save()
  }
}