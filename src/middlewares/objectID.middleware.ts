import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ObjectIDMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (id && !ObjectId.isValid(id)) {
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);
    }
    next();
  }
}
