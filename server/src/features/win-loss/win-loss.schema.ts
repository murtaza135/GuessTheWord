import { z } from 'zod';

export const incrementWins = z.object({
  wins: z.number().positive().optional()
});

export const incrementLosses = z.object({
  losses: z.number().positive().optional()
});

export type IncrementWinsSchema = z.infer<typeof incrementWins>;
export type IncrementLossesSchema = z.infer<typeof incrementLosses>;
