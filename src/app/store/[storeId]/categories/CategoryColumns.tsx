'use client'

import { Button } from "@/components/ui/button";
import { type DataTableFeatures } from "@/components/ui/data-loading/data-table-features";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { STORE_URL } from "@/config/url.config";
import { ICategory } from "@/shared/types/category.interface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";


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

function CategoryActionsCell({ category }: { category: ICategory }) {
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
                            <Link href={STORE_URL.categoryEdit(category.storeId, category.id)} />
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

export const columnsCategory: ColumnDef<DataTableFeatures, ICategory>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => <SortableHeader label="Title" column={column} />,
    },
    {
        accessorKey: 'description',
        header: ({ column }) => <SortableHeader label="Description" column={column} />,
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => <SortableHeader label="Created At" column={column} />,
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <CategoryActionsCell category={row.original} />,
    },
]
