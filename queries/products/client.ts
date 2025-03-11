import { Product, ProductInsert } from "@/types/types.t";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

//create product
const createProduct = async (product: ProductInsert) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").insert(product);
  return data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["products-by-product-category-id"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};



// get all products
const getProducts = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select(
    `
    id,
    name,
    image_url,
    qty,
    description,
    product_category(name, slug)
    `
  );
  return data as unknown as ProductWithCategory[];
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};