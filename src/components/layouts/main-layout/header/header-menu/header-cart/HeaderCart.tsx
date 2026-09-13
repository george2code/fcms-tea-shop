import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Heading";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function HeaderCart() {
    return (
        <Sheet>
            <SheetTrigger render={<Button variant={'ghost'} />}>
                Cart
            </SheetTrigger>
            <SheetContent>
                <Heading title="Product card" className="text-xl" description={""} />
            </SheetContent>
        </Sheet>
    )
}