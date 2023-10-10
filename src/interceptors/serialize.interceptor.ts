import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log(context.getArgs());
    const request = context.switchToHttp().getRequest();

    if (request?.params?.id && request?.params?.id.toString().length !== 24) {
      throw new BadRequestException(
        `Param id: ${request.params.id} is not in the correct format!`,
      );
    }

    if (request?.body?.products) {
      request?.body?.products.forEach((product: string) => {
        if (product.length !== 24) {
          throw new BadRequestException(
            `Product id: ${product} is not in the correct format!`,
          );
        }
      });
    }

    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
