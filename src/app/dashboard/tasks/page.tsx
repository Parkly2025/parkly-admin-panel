import { DataTable } from '@/features/tasks/data-table'
import { columns } from '@/features/tasks/columns'
import { tasks } from '@/features/tasks/data/tasks'
import { Main } from '@/components/layout/main'
import { TasksDialogs } from '@/features/tasks/tasks-dialogs'

export default function Page() {
  return (
    <div className="">
      <Main>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
        <TasksDialogs />
      </Main>
    </div>
  )
}
