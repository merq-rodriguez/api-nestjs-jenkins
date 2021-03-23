import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from './providers/typeorm-config.service';
import configuration from './config/environment.config';
import { join } from 'path';

const envFilePath = join(process.cwd(), 'environments/development.env')
console.log(envFilePath)
@Module({
   imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath,
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
   ]
})
export class CommonModule{}