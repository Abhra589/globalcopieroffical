export const calculateCourierCharge = (pageCount: number, deliveryType: string) => {
  return deliveryType === "pickup" ? 0 : (pageCount <= 400 ? 80 : 150);
};

export const calculateTotal = (
  pageCount: number,
  copies: number,
  selectedGsm: string,
  selectedType: string,
  selectedSides: string,
  deliveryType: string
) => {
  const pricingOptions = [
    { gsm: "70", type: "bw", sides: "single", pricePerPage: 0.8 },
    { gsm: "70", type: "bw", sides: "double", pricePerPage: 1.0 },
    { gsm: "70", type: "color", sides: "single", pricePerPage: 2.5 },
    { gsm: "70", type: "color", sides: "double", pricePerPage: 4.5 },
    { gsm: "100", type: "bw", sides: "single", pricePerPage: 2.0 },
    { gsm: "100", type: "bw", sides: "double", pricePerPage: 3.0 },
    { gsm: "100", type: "color", sides: "single", pricePerPage: 3.0 },
    { gsm: "100", type: "color", sides: "double", pricePerPage: 5.0 },
  ];

  const selectedOption = pricingOptions.find(
    (option) =>
      option.gsm === selectedGsm &&
      option.type === selectedType &&
      option.sides === selectedSides
  );

  if (!selectedOption || !pageCount) return 0;

  const printingCost = selectedOption.pricePerPage * pageCount * copies;
  const courierCharge = calculateCourierCharge(pageCount, deliveryType);
  return printingCost + courierCharge;
};