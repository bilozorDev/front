import { getProductCategories, getProducts, getProductSubcategories } from "@/app/db/queries";
import ProductsList from "@/components/ProductList";

export default async function ProductsPage() {
  const productCategories = await getProductCategories();
  const productSubcategories = await getProductSubcategories();
  const products = await getProducts();
  return (
    <ProductsList
      products={products}
      productCategories={productCategories}
      productSubcategories={productSubcategories}
    />
  );
}
