import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction, { TransactionProps } from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transactionProps: TransactionProps): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const isOutcome = transactionProps.type === 'outcome';
    const invalidBalance = transactionProps.value > balance.total;

    if (isOutcome && invalidBalance) {
      throw new Error('Invalid balance.');
    }
    return this.transactionsRepository.create(transactionProps);
  }
}

export default CreateTransactionService;
