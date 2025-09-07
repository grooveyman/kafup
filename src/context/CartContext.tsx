import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import {toast} from "react-toastify";

export interface CartItemType{
    id: number;
    name: string;
    price: number;
    quantity: number;
    previmg: string;
}

interface CartContextTypes{
    addToCart: (cartItem: CartItemType) => void;
    removeCart: (cartItemId: number) => void;
    cartItems: CartItemType[];
}



const CartContext = createContext<CartContextTypes | undefined>(undefined);

interface CartProviderProps{
    children: ReactNode;
}


export function CartProvider({children}:CartProviderProps){
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);

    const addToCart = useCallback((cartItem:CartItemType) => {
        console.log("adding to cart");
        setCartItems((prevCart) => {
            //check if item exists
            const existingItem = prevCart.find((item)=> item.id === cartItem.id);

            if(existingItem){
                //update quantity
                return prevCart.map((item) => item.id === cartItem.id ? {...item, quantity: item.quantity+cartItem.quantity}:item);
            }else{
                toast.success(`Added ${cartItem.name} to cart`);
            }
            return [...prevCart, cartItem];
        });
        
        
    }, []);

    const removeCart = useCallback((cartItemId:number) => {
        console.log("..removing from cart");
        setCartItems((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
    }, []);

    const contextValue = useMemo(() => ({
        addToCart,
        removeCart,
        cartItems,
    }), [addToCart, removeCart, cartItems]);


    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext(): CartContextTypes{
    const ctx = useContext(CartContext);
    if(!ctx) throw new Error("useCartContext must be used inside cart provider");
    return ctx;
};