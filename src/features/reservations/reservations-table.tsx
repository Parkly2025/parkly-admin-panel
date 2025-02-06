import { DataTable } from '@/features/reservations/data-table'
import { columns } from '@/features/reservations/columns'
import { reservations  } from '@/features/reservations/data/reservations'

export function ResevationsTable() {

  return (
    <DataTable data={reservations} columns={columns} />
  )
}