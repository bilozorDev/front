export function formatPrice(price: number) {
  const formatted = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatted;
}
