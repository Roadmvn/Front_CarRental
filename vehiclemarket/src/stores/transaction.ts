import { defineStore } from "pinia";
import { Transaction } from "@/core/types";

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    transactions: [
      {
        id: 1,
        userId: 1,
        vehicleId: 1,
        vehicleTitle: "2019 Tesla Model 3",
        type: "purchase",
        amount: 39000,
        date: "2023-05-15T10:30:00.000Z",
      },
      {
        id: 2,
        userId: 1,
        vehicleId: 3,
        vehicleTitle: "2021 Volkswagen Golf - Location",
        type: "rental",
        amount: 150,
        date: "2023-05-20T14:00:00.000Z",
      },
      {
        id: 3,
        userId: 2,
        vehicleId: 2,
        vehicleTitle: "2020 Ford Mustang",
        type: "purchase",
        amount: 35000,
        date: "2023-05-22T09:15:00.000Z",
      },
    ] as Transaction[],
  }),
  actions: {
    async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
      // Simuler un appel API asynchrone
      return new Promise((resolve) => {
        setTimeout(() => {
          const userTransactions = this.transactions.filter(
            (transaction) => transaction.userId === userId
          );
          resolve(userTransactions);
        }, 300);
      });
    },
    async addTransaction(transaction: Omit<Transaction, "id">): Promise<void> {
      // Simuler un appel API asynchrone
      return new Promise((resolve) => {
        setTimeout(() => {
          const newTransaction = {
            ...transaction,
            id: this.transactions.length + 1,
          };
          this.transactions.push(newTransaction);
          resolve();
        }, 300);
      });
    },
  },
});
