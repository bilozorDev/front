import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";
export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select();
  const user = await currentUser();
  if (!user) return <div>Not signed in</div>;

  return <pre>{JSON.stringify(products, null, 2)}</pre>;
}
