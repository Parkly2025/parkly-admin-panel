import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
// import { SelectDropdown } from '@/components/select-dropdown'
import { Reservation } from "@/features/reservations/data/schema";
import {
  useUpdateReservationMutation,
  useCreateReservationMutation,
  // useGetAllUsersQuery,
  // useGetAllParkingAreasQuery
} from "@/services/api";
// import { Combobox } from '@/components/ui/combobox'

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: Reservation;
}

const formSchema = z.object({
  parkingSpotId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),
  startTime: z.string().min(1, "Start time is required."),
  endTime: z.string().min(1, "End time is required."),
  totalCost: z.coerce.number().positive("Total cost is required."),
});
type ReservationsForm = z.infer<typeof formSchema>;

export function UsersMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow;
  const [updateReservation] = useUpdateReservationMutation();
  const [createReservation] = useCreateReservationMutation();
  // const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery({ page: 0 })
  // const { data: parkingAreas, isLoading: isLoadingParkingAreas } = useGetAllParkingAreasQuery({ page: 0 })

  // const userOptions = users?.content.map(user => ({
  //   label: `${user.firstName} ${user.lastName}`,
  //   value: user.id.toString()
  // })) ?? []

  // const parkingAreaOptions = parkingAreas?.content.map(area => ({
  //   label: area.name,
  //   value: area.id.toString()
  // })) ?? []

  const form = useForm<ReservationsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      id: 0,
      parkingSpotId: 0,
      userId: 0,
      startTime: "",
      endTime: "",
      totalCost: 0,
    },
  });

  const onSubmit = async (data: ReservationsForm) => {
    try {
      if (currentRow?.id && updateReservation) {
        await updateReservation({
          id: currentRow.id,
          data: data,
        }).unwrap();
      } else {
        await createReservation(data).unwrap();
      }

      handleClose();
      toast({
        title: isUpdate ? "Reservation Updated" : "Reservation Created",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error. Failed to process reservation",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(error, null, 2)}</code>
          </pre>
        ),
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        form.reset();
      }}
    >
      <SheetContent className="flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle>{isUpdate ? "Update" : "Create"} Reservation</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? "Update the reservation by providing necessary info."
              : "Add a new reservation by providing necessary info."}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="tasks-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5"
          >
            <FormField
              control={form.control}
              name="parkingSpotId"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Parking Spot</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a parking spot" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a user" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Combobox
                      options={userOptions}
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                      placeholder="Select user"
                      emptyText="No users found"
                      loading={isLoadingUsers}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parkingSpotId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parking Area</FormLabel>
                  <FormControl>
                    <Combobox
                      options={parkingAreaOptions}
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                      placeholder="Select parking area"
                      emptyText="No parking areas found"
                      loading={isLoadingParkingAreas}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP HH:mm")
                          ) : (
                            <span>Pick a date and time</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            const currentTime = new Date();
                            date.setHours(currentTime.getHours());
                            date.setMinutes(currentTime.getMinutes());
                            field.onChange(date.toISOString());
                          }
                        }}
                        initialFocus
                      />
                      <div className="border-t border-border p-3">
                        <input
                          type="time"
                          className="w-full rounded-md border px-3 py-2"
                          onChange={(e) => {
                            const date = field.value
                              ? new Date(field.value)
                              : new Date();
                            const [hours, minutes] = e.target.value.split(":");
                            date.setHours(parseInt(hours), parseInt(minutes));
                            field.onChange(date.toISOString());
                          }}
                          value={
                            field.value
                              ? format(new Date(field.value), "HH:mm")
                              : ""
                          }
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP HH:mm")
                          ) : (
                            <span>Pick a date and time</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            const currentTime = new Date();
                            date.setHours(currentTime.getHours());
                            date.setMinutes(currentTime.getMinutes());
                            field.onChange(date.toISOString());
                          }
                        }}
                        initialFocus
                      />
                      <div className="border-t border-border p-3">
                        <input
                          type="time"
                          className="w-full rounded-md border px-3 py-2"
                          onChange={(e) => {
                            const date = field.value
                              ? new Date(field.value)
                              : new Date();
                            const [hours, minutes] = e.target.value.split(":");
                            date.setHours(parseInt(hours), parseInt(minutes));
                            field.onChange(date.toISOString());
                          }}
                          value={
                            field.value
                              ? format(new Date(field.value), "HH:mm")
                              : ""
                          }
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalCost"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Total Cost</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter a total cost" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button form="tasks-form" type="submit">
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
