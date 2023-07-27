import { Module } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { VisitorsController } from './visitors.controller';
import { PrismaService } from '../prisma';

@Module({
  controllers: [VisitorsController],
  providers: [PrismaService, VisitorsService],
})
export class VisitorsModule {}
