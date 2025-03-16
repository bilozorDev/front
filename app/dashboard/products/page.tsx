import { getProductCategories, getProducts } from "@/app/db/queries";
import ProductsList from "@/components/ProductList";

export default async function ProductsPage() {
  const productCategories = await getProductCategories();
  const products = await getProducts();
  return (
    <ProductsList products={products} productCategories={productCategories} />
  );
}
