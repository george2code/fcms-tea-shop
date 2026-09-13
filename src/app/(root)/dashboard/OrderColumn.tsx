import { Button } from "@/components/ui/button";
import { DataTableFeatures } from "@/components/ui/data-loading/data-table-features";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export interface IOrderColumn {
    createdAt: string;
    status: string;
    total: string;
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

export const orderColumns: ColumnDef<DataTableFeatures, IOrderColumn>[] = [
    {
        accessorKey: 'createdAt',
        header: ({ column }) => <SortableHeader label="Created At" column={column} />,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <SortableHeader label="Status" column={column} />,
    },
    {
        accessorKey: 'total',
        header: ({ column }) => <SortableHeader label="Total" column={column} />,
    },
]