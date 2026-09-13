import { Button } from "@/components/ui/button";
import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { ICartItem } from "@/shared/types/cart.interface";
import { Minus, Plus } from "lucide-react";
import styles from '../HeaderCart.module.scss';

interface ICartActionsProps {
    item: ICartItem;
}

export function CartActions({ item }: ICartActionsProps) {
    const { changeQuantity } = useActions();
    const { items } = useCart();

    const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity;


    return (
        <div className={styles.actions}>
            <Button 
                variant={'ghost'} 
                size={'icon'} 
                onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
                disabled={quantity === 1}
            ><Minus /></Button>
            <input disabled readOnly value={quantity} />
            <Button 
                variant={'ghost'} 
                size={'icon'} 
                onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
            ><Plus /></Button>
        </div>
    )
}