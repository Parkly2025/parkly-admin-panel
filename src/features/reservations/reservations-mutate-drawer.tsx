import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
// import { SelectDropdown } from '@/components/select-dropdown'
import { Reservation } from '@/features/reservations/data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Reservation
}

const formSchema = z.object({
  parkingSpot: z.string().min(1, 'Parking spot is required.'),
  userId: z.string().min(1, 'User is required.'),
  startTime: z.string().min(1, 'Start time is required.'),
  endTime: z.string().min(1, 'End time is required.'),
  totalCost: z.number().positive('Total cost is required.'),
})
type TasksForm = z.infer<typeof formSchema>

export function UsersMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow

  const form = useForm<TasksForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
          id: 0,
          parkingSpot: '0',
          userId: '0',
          startTime: '',
          endTime: '',
          totalCost: 0,
        },
  })

  const onSubmit = (data: TasksForm) => {
    // do something with the form data
    onOpenChange(false)
    form.reset()
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Reservation</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the reservation by providing necessary info.'
              : 'Add a new reservation by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-5'
          >
            <FormField
              control={form.control}
              name='parkingSpot'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Parking Spot</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a parking spot' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='userId'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a user' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='startTime'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a start time' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endTime'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter an end time' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name='totalCost'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Total Cost</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a total cost' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
