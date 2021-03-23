import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, UserModule],
})
export class AppModule {}
