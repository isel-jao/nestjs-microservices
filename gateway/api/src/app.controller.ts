import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HeroesServiceClient } from './proto/hero';

@Controller()
export class AppController implements OnModuleInit {
  private heroService: HeroesServiceClient;

  constructor(
    @Inject('TCP_SERVICE') private userServiceClient: ClientProxy,
    @Inject('GRPC_SERVICE') private grpcServiceClient: ClientGrpc,
  ) {}

  @Get('tcp')
  getUsers(): Observable<any> {
    return this.userServiceClient.send({ cmd: 'get-data' }, {}).pipe(
      catchError((error) => {
        console.error(error);
        return of({
          error: 'An error occurred while processing your request',
        });
      }),
    );
  }

  onModuleInit() {
    this.heroService =
      this.grpcServiceClient.getService<HeroesServiceClient>('HeroesService');
  }

  @Get('grpc')
  getGrpcData() {
    console.log('getGrpcData');
    return 'Hello';
    return this.heroService.findOne({ id: 1 }).pipe(
      catchError((error) => {
        console.error(error);
        return of({
          error: 'An error occurred while processing your request',
        });
      }),
    );
  }
}
