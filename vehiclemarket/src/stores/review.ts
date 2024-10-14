import { defineStore } from "pinia";

interface Review {
  id: number;
  userId: number;
  rating: number;
  comment: string;
  date: string;
  authorName: string;
}

export const useReviewStore = defineStore("review", {
  state: () => ({
    reviews: [] as Review[],
  }),
  actions: {
    async getReviewsForUser(userId: number): Promise<Review[]> {
      // Simuler un appel API asynchrone
      return new Promise((resolve) => {
        setTimeout(() => {
          const userReviews = this.reviews.filter(
            (review) => review.userId === Number(userId)
          );
          resolve(userReviews);
        }, 100);
      });
    },
    async addReview(review: Omit<Review, "id" | "authorName">): Promise<void> {
      // Simuler un appel API asynchrone
      return new Promise((resolve) => {
        setTimeout(() => {
          const newReview = {
            ...review,
            id: this.reviews.length + 1,
            authorName: "Utilisateur anonyme", // Dans une vraie application, cela serait l'utilisateur connecté
          };
          this.reviews.push(newReview);
          resolve();
        }, 100);
      });
    },
  },
});
