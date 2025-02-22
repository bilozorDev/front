import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Product } from "@/types/types.t";
import { persist } from "zustand/middleware";
interface QuoteStore {
  quote: Quote;
  addProduct: (product: Partial<Product>) => void;
  removeProduct: (product: Partial<Product>) => void;
}

interface Quote {
  id: string;
  products: Partial<Product>[];
}

const useQuoteStore = create<QuoteStore>()(
  persist(
    (set) => ({
      quote: {
        id: uuidv4(),
        products: [
          {
            id: uuidv4(),
            name: "Product 1",
            price: 100,
            quantity: 1,
            total: 100,
          },
        ],
      },
      addProduct: (product: Partial<Product>) => {
        set((state) => ({
          quote: {
            ...state.quote,
            products: [...state.quote.products, product],
          },
        }));
        alert("addProduct");
      },
      removeProduct: (product: Partial<Product>) => {
        set((state) => ({
          quote: {
            ...state.quote,
            products: state.quote.products.filter((p) => p.id !== product.id),
          },
        }));
      },
    }),
    {
      name: "quote",
    }
  )
);

export default useQuoteStore;
