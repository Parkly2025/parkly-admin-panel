import { z } from 'zod'

export const parkingSpotSchema = z.object({
  id: z.number(),
  spotNumber: z.string().min(1, 'Spot number is required'),
  parkingAreaId: z.number().int().positive('Parking area ID is required'),
  isAvailable: z.boolean()
})

export type ParkingSpot = z.infer<typeof parkingSpotSchema>