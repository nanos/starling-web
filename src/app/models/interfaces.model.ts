export interface IAppConfig {
    api_keys: any[],
    starling_url: string
}

export interface ITransaction {
  feedItemUid: string,
  categoryUid: string,
  amount: {
    currency: string,
    minorUnits: number
  },
  sourceAmount: {
    currency: string,
    minorUnits: number
  },
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

export interface IBalance {
  currency: string,
  minorUnits: number
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
    clearedBalance: {
      currency: string,
      minorUnits: number
    },
    effectiveBalance: {
      currency: string,
      minorUnits: number
    },
    pendingTransactions: {
      currency: string,
      minorUnits: number
    },
    availableToSpend: {
      currency: string,
      minorUnits: number
    },
    acceptedOverdraft: {
      currency: string,
      minorUnits: number
    },
    amount: {
      currency: string,
      minorUnits: number
    }
  }
}