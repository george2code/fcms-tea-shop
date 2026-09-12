"use client"

import { useTable, type ColumnDef, type ColumnFiltersState, type RowData, SortingState } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

import { features, type DataTableFeatures } from "./data-table-features"
import { useState } from "react"
import { Input } from "../input"
import styles from "./DataTable.module.scss"

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  filterKey?: string
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  filterKey,
}: DataTableProps<TData>) {


    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    
    const table = useTable({
        features,
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
        
    })

  return (
    <div>
        {filterKey && (
            <div className={styles.search}>
                <Input
                    placeholder="Search..."
                    value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                    table.getColumn(filterKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
        )}
        <div className={styles.table}>
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                        )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        <table.FlexRender cell={cell} />
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
    </div>
  )
}