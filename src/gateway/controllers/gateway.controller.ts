import {
  Controller,
  Res,
  Get,
  Post,
  Put,
  Delete,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { GatewayService } from '../services/gateway-rep/gateway.service';
import { CreateGatewayDTO } from '../dto/CreateGatewayDTO';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('/')
  async getGateways(@Res() res) {
    const gateways = await this.gatewayService.getGateways();

    return res.status(HttpStatus.OK).json({
      gateways,
    });
  }

  @Post('/create')
  async createGateway(@Body() createGatewayDTO: CreateGatewayDTO, @Res() res) {
    const newGateway = await this.gatewayService.createGateway(
      createGatewayDTO,
    );
    if (!newGateway) throw new NotFoundException('There is something wrong!');

    return res.status(HttpStatus.OK).json({
      message: 'received',
      newGateway,
    });
  }

  @Get('/:id')
  async getGateway(@Res() res, @Param('id') id: string) {
    const gateway = await this.gatewayService.getGateway(<string>id);
    if (!gateway)
      throw new NotFoundException(
        'The gateway you are looking for is not available :(',
      );

    return res.status(HttpStatus.OK).json({
      gateway,
    });
  }

  @Put('/update/:id')
  async updateGateway(
    @Res() res,
    @Body() createGatewayDTO: CreateGatewayDTO,
    @Param('id') id: string,
  ) {
    const updatedGateway = await this.gatewayService.updateGateway(
      <string>id,
      <CreateGatewayDTO>createGatewayDTO,
    );
    if (!updatedGateway)
      throw new NotFoundException(
        'The gateway can not be updated for some reazon! :(',
      );

    return res.status(HttpStatus.OK).json({
      message: 'Gateway successfully updated! :)',
      updatedGateway,
    });
  }

  @Delete('/delete/:id')
  async deleteGateway(@Res() res, @Param('id') id: string) {
    const gatewayDeleted = await this.gatewayService.deleteGateway(<string>id);
    if (!gatewayDeleted)
      throw new NotFoundException(
        'The gateway you are looking for is not available :(',
      );

    return res.status(HttpStatus.OK).json({
      message: 'Gateway successfully deleted!',
      gatewayDeleted,
    });
  }
}
