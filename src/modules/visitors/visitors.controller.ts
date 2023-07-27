import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { ConnectVisitorDto } from './dto/connect-visitor.dto';
import { DisconnectVisitorDto } from './dto/disconnect-visitor.dto';

@Controller('visitors')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Post('connect')
  connect(@Body() connectVisitorDto: ConnectVisitorDto) {
    return this.visitorsService.connectVisitor(connectVisitorDto);
  }

  @Post('disconnect')
  disconnect(@Body() disconnectVisitorDto: DisconnectVisitorDto) {
    return this.visitorsService.disconnectVisitor(disconnectVisitorDto);
  }

  // @Get()
  // findAll() {
  //   return this.visitorsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.visitorsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVisitorDto: UpdateVisitorDto) {
  //   return this.visitorsService.update(+id, updateVisitorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.visitorsService.remove(+id);
  // }
}
