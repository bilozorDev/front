import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
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

export type ProductWithCategory =
  Database["public"]["Tables"]["products"]["Row"] & {
    product_category: Pick<
      Database["public"]["Tables"]["product_category"]["Row"],
      "name" | "slug"
    >;
  };

//get all products by product-category slug
const getProductsByProductCategoryID = async (categoryId: string) => {
  const supabase = createClient();
  if (!categoryId || categoryId === "all") {
    const { data, error } = await supabase.from("products").select(
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
    );
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
  return useQuery<ProductWithCategory[], Error, ProductWithCategory[]>({
    queryKey: ["products-by-product-category-id", categoryId],
    queryFn: async () => {
      const data = await getProductsByProductCategoryID(categoryId);
      if (!data) return [];
      return data as unknown as ProductWithCategory[];
    },
  });
};
