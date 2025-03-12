import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/types.t";
interface QuoteStore {
  quoteProducts: Product[];
  dueDate: string;
  quoteId: string;
  clientId: string;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  updateClientId: (clientId: string) => void;
  updateQty: (id: string, qty: number) => void;
  updateQuoteId: (quoteId: string) => void;
  updateDueDate: (dueDate: string) => void;
  resetQuote: () => void;
}

const useQuoteStore = create<QuoteStore>()(
  persist(
    (set) => ({
      quoteProducts: [],
      dueDate: new Date(new Date().setDate(new Date().getDate() + 10))
        .toISOString()
        .split("T")[0],
      clientId: "",
      quoteId: "",
      updateQuoteId: (quoteId: string) => {
        set({ quoteId });
      },
      addProduct: (product: Product) => {
        set((state) => ({
          quoteProducts: [...state.quoteProducts, product],
        }));
      },
      updateClientId: (clientId: string) => {
        set({ clientId });
      },
      updateDueDate: (dueDate: string) => {
        set({ dueDate });
      },
      removeProduct: (product: Product) => {
        set((state) => ({
          quoteProducts: state.quoteProducts.filter((p) => p.id !== product.id),
        }));
      },
      updateQty: (id: string, qty: number) => {
        set((state) => ({
          quoteProducts: state.quoteProducts.map((p) =>
            p.id === id ? { ...p, qty } : p
          ),
        }));
      },
      resetQuote: () => {
        set({ quoteProducts: [], clientId: "", dueDate: "" });
      },
    }),
    {
      name: "quote",
    }
  )
);

export default useQuoteStore;
