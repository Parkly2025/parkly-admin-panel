import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
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
import { ParkingSpot } from "@/features/parking-spots/data/schema";
import { 
  // useUpdateParkingSpotMutation, //FIXME
  useCreateParkingSpotMutation 
} from "@/services/api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: ParkingSpot;
}

const formSchema = z.object({
  spotNumber: z.string().min(1, "Spot number is required"),
  parkingAreaId: z.number().int().positive("Parking area ID is required"),
  isAvailable: z.boolean(),
});

type ParkingSpotForm = z.infer<typeof formSchema>;

export function ParkingSpotsMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const isUpdate = !!currentRow;
  // const [updateParkingSpot] = useUpdateParkingSpotMutation();
  const [createParkingSpot] = useCreateParkingSpotMutation();

  const form = useForm<ParkingSpotForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      spotNumber: "",
      parkingAreaId: 1,
      isAvailable: true,
    },
  });

  const onSubmit = async (data: ParkingSpotForm) => {
    try {
      // FIXME
      if (currentRow?.Id && isUpdate) {
        // await updateParkingSpot({
          // id: currentRow.Id,
          // data: { 
          //   id: currentRow.Id,
          //   ...data 
          //   // parkingArea: {

          //   // }
          // },
        // }).unwrap();
      } else {
        await createParkingSpot(data).unwrap();
      }

      handleClose();
      toast({
        title: isUpdate ? "Parking Spot Updated" : "Parking Spot Created",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to process parking spot",
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
          <SheetTitle>{isUpdate ? "Update" : "Create"} Parking Spot</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? "Update the parking spot by providing necessary info."
              : "Add a new parking spot by providing necessary info."}
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
              name="spotNumber"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Spot Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter spot number (e.g. A1)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parkingAreaId"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Parking Area ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="Enter parking area ID"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Availability</FormLabel>
                    <FormDescription>
                      Mark if the parking spot is available
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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
