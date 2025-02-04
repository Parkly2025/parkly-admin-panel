import { DataTable } from '@/features/reservations/data-table'
import { columns } from '@/features/reservations/columns'
import { reservations } from '@/features/reservations/data/reservations'
import { Main } from '@/components/layout/main'

export default function Page() {
  return (
    <div className="">
      <Main>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={reservations} columns={columns} />
        </div>
      </Main>
    </div>
  )
}
