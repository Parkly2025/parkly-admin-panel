import { DataTable } from '@/features/parking-spots/data-table'
import { columns } from '@/features/parking-spots/columns'
import { parkingSpots  } from '@/features/parking-spots/data/parking-spots'

export function ResevationsTable() {

  return (
    <DataTable data={parkingSpots} columns={columns} />
  )
}