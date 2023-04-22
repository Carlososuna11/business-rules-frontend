import { z } from 'zod';

export const newProjectSchema = z.object({
  // name. Required, string, min 3 chars
  name: z.string().min(3).nonempty(),
  // description. string, min 3 chars
  description: z.string().optional(),
});
