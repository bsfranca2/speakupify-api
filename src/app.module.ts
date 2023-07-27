import { Module } from '@nestjs/common';
import { PrismaService } from './modules/prisma';
import { VisitorsModule } from './modules/visitors';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './modules/config';
import { HealthModule } from './modules/health';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HealthModule,
    VisitorsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {
  static port: string | number;
  static isDev: boolean;

  constructor(private readonly config: ConfigService) {
    AppModule.port = config.get('PORT') || 3000;
    AppModule.isDev = config.get('NODE_ENV') !== 'production';
  }
}
