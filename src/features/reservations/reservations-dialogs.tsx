import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { UsersMutateDrawer } from './reservations-mutate-drawer'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { setOpen, setCurrentRow } from '@/store/slices/reservationsSlice'

export function ReservationDialogs() {
  const dispatch = useDispatch()
  const { open, currentRow } = useSelector((state: RootState) => state.reservatios)

  return (
    <>
      <UsersMutateDrawer
        key="reservations-create"
        open={open === 'create'}
        onOpenChange={() => { 
          dispatch(setOpen('create'))
        }}
      />

      {currentRow && (
        <>
          <UsersMutateDrawer
            key={`reservations-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              dispatch(setOpen('update'))
              setTimeout(() => {
                dispatch(setCurrentRow(null))
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key="reservations-delete"
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              dispatch(setOpen('delete'))
              setTimeout(() => {
                dispatch(setCurrentRow(null))
              }, 500)
            }}
            handleConfirm={() => {
              dispatch(setOpen(null))
              setTimeout(() => {
                dispatch(setCurrentRow(null))
              }, 500)
              toast({
                title: 'The following user has been deleted:',
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(currentRow, null, 2)}
                    </code>
                  </pre>
                ),
              })
            }}
            className="max-w-md"
            title={`Delete this user: ${currentRow.id}?`}
            desc={
              <>
                You are about to delete a user with the ID{' '}
                <strong>{currentRow.id}</strong>.<br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
          />
        </>
      )}
    </>
  )
}
