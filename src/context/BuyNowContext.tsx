import React, { createContext, useState } from "react";
import { CartItemType } from "./CartContext";

export interface BuyNowContextType {
    buyNowItem: CartItemType | null;
    setBuyNowItem: (item: CartItemType | null) => void;
    clearBuyNow: () => void;
}

interface BuyNowProviderProps {
    children: React.ReactNode;
}
const buyNowContext = createContext<BuyNowContextType | undefined>(undefined);


export const BuyNowProvider: React.FC<BuyNowProviderProps> = ({ children }) => {
    const [buyNowItem, setBuyNowItem] = useState<CartItemType | null>(null);

    const clearBuyNow = () => {
        setBuyNowItem(null);
    };

    return (
        <buyNowContext.Provider value={{ buyNowItem, setBuyNowItem, clearBuyNow }}>
            {children}
        </buyNowContext.Provider>
    );
}

export const useBuyNowContext = (): BuyNowContextType => {
    const context = React.useContext(buyNowContext);
    if (!context) {
        throw new Error("useBuyNowContext must be used within a BuyNowProvider");
    }
    return context;
};

