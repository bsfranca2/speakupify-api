import { Injectable } from '@nestjs/common';
import { ConnectVisitorDto } from './dto/connect-visitor.dto';
import { PrismaService } from '../prisma';
import { DisconnectVisitorDto } from './dto/disconnect-visitor.dto';

@Injectable()
export class VisitorsService {
  constructor(private prismaService: PrismaService) {}

  async connectVisitor(connectVisitorDto: ConnectVisitorDto) {
    const { accountId, connectionId, visitorId, ip } = connectVisitorDto;
    const account = await this.prismaService.account.findFirst({
      where: {
        id: accountId,
      },
      select: {
        id: true,
        idAccount: true,
      },
    });
    await this.prismaService.visitor.upsert({
      where: {
        idAccount: account.idAccount,
        id: visitorId,
      },
      create: {
        idAccount: account.idAccount,
        id: visitorId,
        connectionId,
        ip,
      },
      update: {
        connectionId,
        ip,
      },
      select: null,
    });
    // TODO: Move this temp create conversation here
    const conversation = await this.prismaService.conversation.findFirst({
      where: { id: visitorId },
    });
    if (!conversation) {
      await this.prismaService.conversation.create({
        data: {
          id: visitorId,
          idAccount: account.idAccount,
          visitorId,
        },
      });
    }
  }

  async disconnectVisitor(disconnectVisitorDto: DisconnectVisitorDto) {
    const { accountId, visitorId } = disconnectVisitorDto;
    const account = await this.prismaService.account.findFirst({
      where: {
        id: accountId,
      },
      select: {
        id: true,
        idAccount: true,
      },
    });
    await this.prismaService.visitor.update({
      where: {
        idAccount: account.idAccount,
        id: visitorId,
      },
      data: {
        connectionId: null,
      },
    });
  }

  // findAll() {
  //   return `This action returns all visitors`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} visitor`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} visitor`;
  // }
}
