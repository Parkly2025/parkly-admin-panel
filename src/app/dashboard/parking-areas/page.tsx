import { ResevationsTable } from '@/features/parking-areas/parking-areas-table'
import { Main } from '@/components/layout/main'
import { PrimaryButtons } from '@/components/primary-buttons'
import { setOpen } from '@/store/slices/parkingAreasSlice'
import { ParkingAreasDialogs } from '@/features/parking-areas/parking-areas-dialogs'

export default function Page() {
  return (
    <div className="">
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Parking Areas</h2>
            <p className='text-muted-foreground'>
              {/* Here&apos;s a list of your tasks for this month! */}
            </p>
          </div>
          <PrimaryButtons setOpen={setOpen} />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <ResevationsTable />
        </div>
        <ParkingAreasDialogs />
      </Main>
    </div>
  )
}
