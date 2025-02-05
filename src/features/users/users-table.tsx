
import { DataTable } from '@/features/users/data-table'
import { columns } from '@/features/users/columns'
// import { useGetAllUsersQuery } from '@/services/api'
import { users } from '@/features/users/data/users'

export function UsersTable() {
  // const users = useGetAllUsersQuery({
  //   page: 0,
  //   size: 10,
  // });

  console.log(users);
  return (
    <DataTable data={users} columns={columns} />
  )
}