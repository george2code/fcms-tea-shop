import { useSelector } from "react-redux";
import { TypeRootState } from "@/store/store";

export const useCart = () => {
    const { items } = useSelector((state: TypeRootState) => state.cart);

    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return { items, total };
}