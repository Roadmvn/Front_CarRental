import { mount } from "@vue/test-utils";
import VehicleCard from "@/components/VehicleCard.vue";
import { formatCurrency, formatMileage } from "@/core/utils/formatters";

describe("VehicleCard", () => {
  const mockVehicle = {
    id: 1,
    title: "Test Vehicle",
    price: 10000,
    year: 2020,
    mileage: 50000,
    fuelType: "Essence",
    listingType: "sale" as const,
    image: "test-image.jpg",
  };

  it("renders vehicle information correctly", () => {
    const wrapper = mount(VehicleCard, {
      props: mockVehicle,
    });

    expect(wrapper.text()).toContain(mockVehicle.title);
    expect(wrapper.text()).toContain(formatCurrency(mockVehicle.price));
    expect(wrapper.text()).toContain(mockVehicle.year.toString());
    expect(wrapper.text()).toContain(formatMileage(mockVehicle.mileage));
    expect(wrapper.text()).toContain(mockVehicle.fuelType);
  });

  it("displays correct label for sale listing", () => {
    const wrapper = mount(VehicleCard, {
      props: mockVehicle,
    });

    expect(wrapper.text()).toContain("À vendre");
  });

  it("displays correct label for rent listing", () => {
    const wrapper = mount(VehicleCard, {
      props: { ...mockVehicle, listingType: "rent" },
    });

    expect(wrapper.text()).toContain("À louer");
  });

  it('emits navigate event when "Voir les détails" button is clicked', async () => {
    const wrapper = mount(VehicleCard, {
      props: mockVehicle,
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("navigate");
    expect(wrapper.emitted().navigate[0]).toEqual([mockVehicle.id]);
  });
});
