import { z } from 'zod';

const incrementWins = z.object({
  wins: z.number().positive().optional()
});

const incrementLosses = z.object({
  losses: z.number().positive().optional()
});

export type IncrementWinsSchema = z.infer<typeof incrementWins>;
export type IncrementLossesSchema = z.infer<typeof incrementLosses>;

const winLossSchemas = {
  incrementWins,
  incrementLosses
};

export default winLossSchemas;
