import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/table/data-table-view-options'
import { DataTableFacetedFilter } from '@/components/table/data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("city") && (
          <DataTableFacetedFilter
            column={table.getColumn("city")}
            title="City"
            options={[
              { value: "New York", label: "New York" },
              { value: "San Francisco", label: "San Francisco" },
              { value: "Chicago", label: "Chicago" },
              { value: "Miami", label: "Miami" },
              { value: "Los Angeles", label: "Los Angeles" },
            ]}
          />
        )}
        {table.getColumn("hourlyRate") && (
          <DataTableFacetedFilter
            column={table.getColumn("hourlyRate")}
            title="Price Range"
            options={[
              { value: "0-10", label: "$0-$10" },
              { value: "11-20", label: "$11-$20" },
              { value: "21-30", label: "$21-$30" },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}