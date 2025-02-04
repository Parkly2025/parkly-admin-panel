import { DataTable } from '@/features/users/data-table'
import { columns } from '@/features/users/columns'
import { users } from '@/features/users/data/users'
import { Main } from '@/components/layout/main'

export default function Page() {
  return (
    <div className="">
      <Main>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={users} columns={columns} />
        </div>
      </Main>
    </div>
  )
}
