import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(`${method} ${url} ${statusCode} - ${userAgent} ${ip}`);
      if (method === 'POST') {
        this.logger.log(JSON.stringify(request.body));
      }
    });

    next();
  }
}
