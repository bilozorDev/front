import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";
interface QuoteStore {
  quote: Quote;
  addProduct: (product: QuoteProduct) => void;
  removeProduct: (product: QuoteProduct) => void;
  setMarkup: (markup: number) => void;
  increaseQuantity: (product: QuoteProduct) => void;
  decreaseQuantity: (product: QuoteProduct) => void;
}

interface QuoteProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}
export interface Quote {
  markup: number;
  products: QuoteProduct[];
}

function calculateTotalForProduct(
  price: number,
  quantity: number,
  margin: number
) {
  return price * margin * quantity;
}

const useQuoteStore = create<QuoteStore>()(
  persist(
    (set) => ({
      quote: {
        markup: 1.2,
        products: [],
      },

      addProduct: (product: QuoteProduct) => {
        set((state) => ({
          quote: {
            ...state.quote,
            products: [...state.quote.products, product],
          },
        }));
      },
      removeProduct: (product: QuoteProduct) => {
        set((state) => ({
          quote: {
            ...state.quote,
            products: state.quote.products.filter((p) => p.id !== product.id),
          },
        }));
      },
      setMarkup: (markup: number) => {
        set((state) => ({
          quote: { ...state.quote, markup },
        }));
      },
      increaseQuantity: (product: QuoteProduct) => {
        set((state) => ({
          quote: {
            ...state.quote,
            products: state.quote.products.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          },
        }));
      },
      decreaseQuantity: (product: QuoteProduct) => {
        set((state) => ({
          quote: {
            ...state.quote,
            products: state.quote.products.map((p) =>
              p.id === product.id
                ? { ...p, quantity: p.quantity > 1 ? p.quantity - 1 : 1 }
                : p
            ),
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
