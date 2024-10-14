import { defineStore } from "pinia";
import { Vehicle, Favorite } from "@/core/types";

export const useVehicleStore = defineStore("vehicle", {
  state: () => ({
    listings: [
      {
        id: 1,
        title: "2019 Tesla Model 3",
        listingType: "sale",
        vehicleType: "Voiture",
        brand: "Tesla",
        model: "Model 3",
        year: 2019,
        mileage: 30000,
        price: 39000,
        description: "Superbe Tesla Model 3 de 2019 en excellent état.",
        fuelType: "Électrique",
        images: [
          "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8&w=1000&q=80",
        ],
        createdAt: "2023-05-01T00:00:00.000Z",
        sellerId: 1,
      },
      {
        id: 2,
        title: "2020 Ford Mustang",
        listingType: "sale",
        vehicleType: "Voiture",
        brand: "Ford",
        model: "Mustang",
        year: 2020,
        mileage: 25000,
        price: 35000,
        description: "Magnifique Ford Mustang 2020 à vendre.",
        fuelType: "Essence",
        images: [
          "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZCUyMG11c3Rhbmd8ZW58MHx8MHx8&w=1000&q=80",
        ],
        createdAt: "2023-05-02T00:00:00.000Z",
        sellerId: 2,
      },
      {
        id: 3,
        title: "2021 Volkswagen Golf - Location",
        listingType: "rent",
        vehicleType: "Voiture",
        brand: "Volkswagen",
        model: "Golf",
        year: 2021,
        mileage: 15000,
        price: 50,
        description: "Louez cette Volkswagen Golf 2021 pour vos déplacements.",
        fuelType: "Essence",
        images: [
          "https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dm9sa3N3YWdlbiUyMGdvbGZ8ZW58MHx8MHx8&w=1000&q=80",
        ],
        createdAt: "2023-05-04T00:00:00.000Z",
        sellerId: 4,
        rentalDuration: 1,
      },
    ] as Vehicle[],
    favorites: [
      { userId: 1, vehicleId: 2 },
      { userId: 1, vehicleId: 3 },
    ] as Favorite[],
  }),
  actions: {
    getListings(): Vehicle[] {
      return this.listings;
    },
    async getListingById(id: number): Promise<Vehicle | undefined> {
      // Simuler un délai court pour l'appel API
      await new Promise((resolve) => setTimeout(resolve, 300));
      return this.listings.find((listing) => listing.id === id);
    },
    getFavoritesByUserId(userId: number): Vehicle[] {
      const favoriteIds = this.favorites
        .filter((fav) => fav.userId === userId)
        .map((fav) => fav.vehicleId);
      return this.listings.filter((listing) =>
        favoriteIds.includes(listing.id)
      );
    },
    addFavorite(userId: number, vehicleId: number): void {
      this.favorites.push({ userId, vehicleId });
    },
    removeFavorite(userId: number, vehicleId: number): void {
      this.favorites = this.favorites.filter(
        (fav) => !(fav.userId === userId && fav.vehicleId === vehicleId)
      );
    },
    updateListing(id: number, updatedListing: Partial<Vehicle>): void {
      const index = this.listings.findIndex((listing) => listing.id === id);
      if (index !== -1) {
        this.listings[index] = { ...this.listings[index], ...updatedListing };
      }
    },
  },
});
