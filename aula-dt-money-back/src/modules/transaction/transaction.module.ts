import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [PrismaModule],
})
export class TransactionModule {}
