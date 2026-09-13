import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Heading";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";

import styles from './HeaderCart.module.scss';
import { formatPrice } from "@/utils/string/format-price";
import { CartItem } from "./cart-item/CartItem";
import { useCheckout } from "./useCheckout";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import { PUBLIC_URL } from "@/config/url.config";

export function HeaderCart() {
    const router = useRouter();
    const { createPayment, isLoadingCreate } = useCheckout();
    const { user } = useProfile();
    const { items, total } = useCart();

    const handleClick = () => {
        if (user) {
            createPayment();
        } else {
            router.push(PUBLIC_URL.auth());
        }
    }

    return (
        <Sheet>
            <SheetTrigger render={<Button variant={'ghost'} />}>
                Cart
            </SheetTrigger>
            <SheetContent className={styles.cart}>
                <Heading title="Product card" className="text-xl" description={""} />
                <div className={styles.items}>
                    {items.length ? (
                        items.map(item => (
                            <CartItem item={item} key={item.id} />
                        ))
                    ) : (
                        <div className={styles.not_found}>Cart is empty</div>
                    )}
                </div>
                { items.length ? (
                    <>
                        <div className={styles.total}>
                            Total: {formatPrice(total)}
                        </div>
                        <Button variant={'primary'} onClick={() => {handleClick()}} disabled={isLoadingCreate}>Checkout</Button>
                    </>
                ) : null }
            </SheetContent>
        </Sheet>
    )
}