import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

export interface CartVariation {
  size: string;
  color: string;
  price: number;
  quantity: number;
}
export interface DesignerType {
  id: string;
}

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  previmg?: string;
  variations?: CartVariation;
  designer: string;
}

interface CartContextTypes {
  addToCart: (cartItem: CartItemType) => void;
  removeCart: (cartItem: CartItemType) => void;
  cartItems: CartItemType[];
  reduceQuantity: (cartItem: CartItemType) => void;
  increaseQuantity: (cartItem: CartItemType) => void;
}

const CartContext = createContext<CartContextTypes | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const addToCart = useCallback((cartItem: CartItemType) => {
    console.log("adding to cart");

    if (cartItem.quantity <= 0) {
      toast.error("Quantity must be greater than zero");
      return;
    }

    if (!cartItem.variations) {
      toast.error("No variations provided");
      return;
    }

    const newVariation = cartItem.variations;

    if (newVariation.quantity <= 0) {
      toast.error("Variation quantity must be greater than zero");
      return;
    }

    setCartItems((prevCart) => {

      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.name === cartItem.name &&
          item.id === cartItem.id &&
          item.variations?.size === newVariation.size &&
          item.variations?.color === newVariation.color
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += cartItem.quantity;
        updatedCart[existingItemIndex].variations!.quantity +=
          newVariation.quantity;
        updatedCart[existingItemIndex].total += (cartItem.price * cartItem.quantity);

        toast.success(
          `Updated quantity for ${cartItem.name} (${newVariation.size}, ${newVariation.color})`
        );
        return updatedCart;
      }

      // No matching variation found → create a new cart item
      const newCartItem: CartItemType = {
        ...cartItem,
        // id: `${cartItem.id}-${prevCart.length + 1}`, // Ensure unique ID
        variations: newVariation,
        total: cartItem.price * cartItem.quantity,
      };

      toast.success(
        `Added ${cartItem.name} (${newVariation.size}, ${newVariation.color}) to cart`
      );
      return [...prevCart, newCartItem];
    });
  }, []);

  const removeCart = useCallback((cartItem: CartItemType) => {
    console.log("..removing from cart");
    setCartItems((prevCart) =>
      prevCart.filter((item) => !(item.id === cartItem.id && item.variations?.color === cartItem.variations?.color && item.variations?.size === cartItem.variations?.size))
    );
  }, []);

  const reduceQuantity = useCallback(
    (cartItem: CartItemType) => {
      setCartItems((prevCart) =>
        prevCart.map((item) => {
          const isSameItem =
            item.id === cartItem.id &&
            item.variations?.color === cartItem.variations?.color &&
            item.variations?.size === cartItem.variations?.size;

          if (isSameItem) {
            const newQuantity = Math.max(item.quantity - 1, 1);

            return {
              ...item,
              quantity: newQuantity,
              total: item.price * newQuantity,
            };
          }

          return item;
        })
      );
    },
    []
  );

  const increaseQuantity = useCallback(
    (cartItem: CartItemType) => {
      setCartItems((prevCart) =>
        prevCart.map((item) => {
          const isSameItem =
            item.id === cartItem.id &&
            item.variations?.color === cartItem.variations?.color &&
            item.variations?.size === cartItem.variations?.size;

          if (isSameItem) {
            const newQuantity = item.quantity + 1;

            return {
              ...item,
              quantity: newQuantity,
              variations: item.variations
                ? {
                  ...item.variations,
                  quantity: item.variations.quantity + 1,
                }
                : undefined,
              total: item.price * newQuantity,
            };
          }

          return item;
        })
      );
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      addToCart,
      removeCart,
      cartItems,
      reduceQuantity,
      increaseQuantity,
    }),
    [addToCart, removeCart, cartItems, reduceQuantity, increaseQuantity]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCartContext(): CartContextTypes {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used inside cart provider");
  return ctx;
}
