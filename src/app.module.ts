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
  static hostname: string;
  static port: string | number;
  static isDev: boolean;

  constructor(private readonly config: ConfigService) {
    AppModule.hostname = config.get('HOST') || '127.0.0.1';
    AppModule.port = config.get('PORT') || 3000;
    AppModule.isDev = config.get('NODE_ENV') !== 'production';
  }
}
