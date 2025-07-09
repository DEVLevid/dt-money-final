import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ category, data, price, title, type }: CreateTransactionDto) {
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        title,
        category,
        data,
        price,
        type,
      },
    });
    return createdTransaction;
  }

  async findAll(skip = 0, take = 10) {
    const transactions = await this.prisma.transaction.findMany({
      skip,
      take,
      orderBy: { data: 'desc' },
    });
    return transactions;
  }

  async findOne(id: string) {
    const foundTransaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    return foundTransaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const foundTransaction = await this.findOne(id);

    if (!foundTransaction) {
      throw new BadRequestException(`Transaction with id ${id} not found`);
    }

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
    return updatedTransaction;
  }

  async remove(id: string) {
    const foundTransaction = await this.findOne(id);

    if (!foundTransaction) {
      throw new BadRequestException(`Transaction with id ${id} not found`);
    }

    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
