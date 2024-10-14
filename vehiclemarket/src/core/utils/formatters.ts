// Utilitaires pour le formatage des données
export const formatCurrency = (
  amount: number,
  currency: string = "EUR"
): string => {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(
    amount
  );
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("fr-FR");
};

export const formatMileage = (mileage: number): string => {
  return new Intl.NumberFormat("fr-FR").format(mileage) + " km";
};
