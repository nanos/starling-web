export interface IAppConfig {
  api_keys: string[]
}

export interface IAmount {
  currency: string,
  minorUnits: number
}

export interface ITransaction {
  feedItemUid: string,
  categoryUid: string,
  amount: IAmount,
  sourceAmount: IAmount,
  direction: string,
  updatedAt: string,
  transactionTime: string,
  settlementTime: string,
  source: string,
  sourceSubType: string,
  status: string
  counterPartyType: string,
  counterPartyUid: string,
  counterPartyName: string,
  counterPartySubEntityUid: string,
  counterPartySubEntityName: string,
  counterPartySubEntityIdentifier: string,
  counterPartySubEntitySubIdentifier: string,
  reference: string,
  country: string,
  spendingCategory: string
}

export interface IAccount {
  accountUid: string,
  defaultCategory: string,
  currency: string,
  createdAt: string,
  api_key: string,
  identifiers: {
    accountIdentifier: string,
    bankIdentifier: string,
    iban: string,
    bic: string
  },
  holder: {
    accountHolderName: string
  },
  balances: {
    clearedBalance: IAmount,
    effectiveBalance: IAmount,
    pendingTransactions: IAmount,
    availableToSpend: IAmount,
    acceptedOverdraft: IAmount,
    amount: IAmount,
  },
  grandTotal: IAmount,
  goalsBalance: IAmount,
}