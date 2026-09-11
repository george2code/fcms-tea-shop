import { cn } from "@/lib/utils";


interface HeadingProps {
    title: string;
    description: string;
    className?: string;
}

export function Heading({ title, description, className }: HeadingProps) {
    return (
        <div className='space-y-1'>
            <h2 className={cn('text-2xl font-bold tracking-tight', className)}>{title}</h2>
            { description && <p className="text-sm text-muted-foreground">{description}</p> }
        </div>
    )
}