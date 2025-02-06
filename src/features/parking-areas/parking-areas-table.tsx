import { DataTable } from '@/features/parking-areas/data-table'
import { columns } from '@/features/parking-areas/columns'
import { parkingAreas } from '@/features/parking-areas/data/parking-areas'

export function ResevationsTable() {

  return (
    <DataTable data={parkingAreas} columns={columns} />
  )
}