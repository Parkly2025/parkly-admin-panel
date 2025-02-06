import { DataTable } from '@/features/users/data-table'
import { columns } from '@/features/users/columns'
import { useGetUserByIdQuery } from '@/services/api'
import { users } from '@/features/users/data/users'

export function UsersTable() {
  const users2 = useGetUserByIdQuery(1);
  console.log("user2");
  console.log(users2);
  return (
    <DataTable data={users} columns={columns} />
  )
}