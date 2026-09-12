import { DataTableFeatures } from "@/components/ui/data-loading/data-table-features";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export interface IReviewColumn {
    id: string;
    createdAt: string;
    rating: string;
    username: string;
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

export const columnsReview: ColumnDef<DataTableFeatures, IReviewColumn>[] = [
    {
        accessorKey: 'createdAt',
        header: ({ column }) => <SortableHeader label="Created At" column={column} />,
    },
    {
        accessorKey: 'username',
        header: ({ column }) => <SortableHeader label="Username" column={column} />,
    },
    {
        accessorKey: 'rating',
        header: ({ column }) => <SortableHeader label="Rating" column={column} />,
    },


]