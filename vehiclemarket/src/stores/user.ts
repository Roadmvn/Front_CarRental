import { defineStore } from "pinia";

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  listings: any[]; // Vous pouvez définir un type plus précis pour les annonces si nécessaire
}

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [
      {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        createdAt: "2023-01-01T00:00:00.000Z",
        listings: [], // Vous pouvez ajouter des annonces ici si nécessaire
      },
      // Ajoutez d'autres utilisateurs si nécessaire
    ] as User[],
  }),
  actions: {
    async getUserById(id: number): Promise<User | null> {
      // Simuler un appel API asynchrone
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = this.users.find((u) => u.id === Number(id));
          resolve(user || null);
        }, 100);
      });
    },
    async getCurrentUser(): Promise<User | null> {
      // Simuler un appel API asynchrone pour récupérer l'utilisateur actuellement connecté
      return new Promise((resolve) => {
        setTimeout(() => {
          // Pour le moment, on retourne toujours le premier utilisateur
          // Dans une vraie application, cela dépendrait de l'utilisateur connecté
          resolve(this.users[0] || null);
        }, 100);
      });
    },
  },
});
