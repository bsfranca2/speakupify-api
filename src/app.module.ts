import { Module } from '@nestjs/common';
import { PrismaService } from './modules/prisma';
import { VisitorsModule } from './modules/visitors';

@Module({
  imports: [VisitorsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
