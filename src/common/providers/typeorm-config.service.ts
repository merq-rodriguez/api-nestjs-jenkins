import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { User } from '../../modules/users/entities/user.entity';


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  
  constructor(private readonly config: ConfigService) {}
   
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.getOrmConfig();
   };
  

  private getOrmConfig() {
    return {
      type: this.config.get('database.DB_TYPE'),
      host: this.config.get('database.DB_HOST'),
      port: this.config.get('database.DB_PORT'),
      username: this.config.get('database.DB_USERNAME'),
      password: this.config.get('database.DB_PASSWORD'),
      database: this.config.get('database.DB_DATABASE'),
      synchronize: this.config.get('database.BD_SYNCHRONIZE'),
      entities: [User],
    }
  } 
}