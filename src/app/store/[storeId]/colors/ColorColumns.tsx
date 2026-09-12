'use client'

import { Button } from "@/components/ui/button";
import { type DataTableFeatures } from "@/components/ui/data-loading/data-table-features";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PUBLIC_URL, STORE_URL } from "@/config/url.config";
import { IColor } from "@/shared/types/color.interface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from "lucide-react";
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

function ColorActionsCell({ color }: { color: IColor }) {
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
                            <Link href={STORE_URL.colorEdit(color.storeId, color.id)} />
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

export const columnsColor: ColumnDef<DataTableFeatures, IColor>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <SortableHeader label="Name" column={column} />,
    },
    {
        accessorKey: 'value',
        header: ({ column }) => <SortableHeader label="Value" column={column} />,
        cell: ({ row }) => (
            <div className="flex items-center gap-x-3">
                {row.original.value}
                <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: row.original.value }}
                />
            </div>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => <SortableHeader label="Created At" column={column} />,
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <ColorActionsCell color={row.original} />,
    },
]
