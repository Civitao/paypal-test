export function convertToPrice(total: number) {
  const converted = (total / 100).toFixed(2);
  return converted;
}

export function convertToPriceWithShipping(total: number) {
  const shipping = 800;
  const converted = ((total + shipping) / 100).toFixed(2);
  return converted;
}

export function convertTotalToPaypalTotal(total: number) {
  const shipping = 800;
  const converted = ((total + shipping) / 100).toFixed(2);
  
  return converted.toString();
}
