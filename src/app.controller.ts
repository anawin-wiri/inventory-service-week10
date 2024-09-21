import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, MessagePattern, MqttContext, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('order_created')
  handdleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    // console.log(`Pattern: ${context.getPattern()}`);
    // console.log(context.getMessage());
    // console.log(context.getChannelRef());
    const chanel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log('Order received for processing', data);
    const isInStock = true;
    if (isInStock) {
      console.log('Inventory avaliable. Processing order.');
      chanel.ack(originalMsg);
    } else {
      console.log('Order not avaliable');
      chanel.ack(originalMsg);
    }
  }
}
