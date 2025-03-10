import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
//get product categories
const getProductCategories = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("product_category").select("*");
  return data;
};

export const useGetProductCategories = () => {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: getProductCategories,
  });
};

//get all products by product-category slug
const getProductsByProductCategoryID = async (categoryId: string) => {
  const supabase = createClient();
  if (!categoryId || categoryId === "all") {
    console.log("No category ID provided");
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      throw error;
    }
    return data;
  }
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      cost,
      price_to_client,
      qty,
      description,
      image_url,
      status,
      vendor,
      product_category(name, slug)
    `
    )
    .eq("category_id", categoryId)
    .order("name");
  return data;
};

export const useGetProductsByProductCategoryID = (categoryId: string) => {
  return useQuery({
    queryKey: ["products-by-product-category-id", categoryId],
    queryFn: () => getProductsByProductCategoryID(categoryId),
  });
};
