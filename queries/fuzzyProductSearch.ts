// import { supabase } from "@/utils/supabase/client";
// import { useQuery } from "@tanstack/react-query";

// async function searchProducts(search: string) {
//   // Don't search if empty
//   if (!search?.trim()) {
//     return [];
//   }

//   try {
//     const { data, error } = await supabase.rpc(
//       "search_products_by_name_prefix",
//       {
//         prefix: search.trim(),
//       }
//     );

//     if (error) {
//       // Log error but return empty array to prevent UI breaking
//       console.error("Search error:", error);
//       return [];
//     }

//     return data || [];
//   } catch (error) {
//     console.error("Failed to search products:", error);
//     return [];
//   }
// }
// // fuzzy product search using react query
// export function useFuzzyProductSearch(search: string) {
//   return useQuery({
//     queryKey: ["products", search],
//     queryFn: () => searchProducts(search),
//     enabled: !!search?.trim(), // Only enable if search has non-whitespace characters
//   });
// }
