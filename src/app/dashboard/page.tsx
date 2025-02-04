import { DataTable } from '@/components/table/data-table'
import { columns } from '@/components/table/columns'
import { tasks } from '@/data/tasks'
import { Main } from '@/components/layout/main'

export default function Page() {
  return (
    <div className="">
      <Main>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
      </Main>
    </div>
  )
}
