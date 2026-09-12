'use client'

import { Button } from "@/components/ui/button";
import { type DataTableFeatures } from "@/components/ui/data-loading/data-table-features";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PUBLIC_URL, STORE_URL } from "@/config/url.config";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

export interface IProductColumn {
    id: string;
    title: string;
    price: string;
    category: string;
    color: string;
    storeId: string;
}

function SortableHeader({
    label,
    column,
}: {
    label: string
    column: {
        toggleSorting: (desc?: boolean) => void
        getIsSorted: () => false | 'asc' | 'desc'
    }
}) {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {label}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
}

function ProductActionsCell({ product }: { product: IProductColumn }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        render={
                            <Link href={PUBLIC_URL.product(product.id)} target="_blank" />
                        }
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Page with the product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        render={
                            <Link href={STORE_URL.productEdit(product.storeId, product.id)} />
                        }
                    >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<DataTableFeatures, IProductColumn>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => <SortableHeader label="Title" column={column} />,
    },
    {
        accessorKey: 'price',
        header: ({ column }) => <SortableHeader label="Price" column={column} />,
    },
    {
        accessorKey: 'category',
        header: ({ column }) => <SortableHeader label="Category" column={column} />,
    },
    {
        accessorKey: 'color',
        header: ({ column }) => <SortableHeader label="Color" column={column} />,
        cell: ({ row }) => (
            <div className="flex items-center gap-x-3">
                {row.original.color}
                <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: row.original.color }}
                />
            </div>
        ),
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <ProductActionsCell product={row.original} />,
    },
]
