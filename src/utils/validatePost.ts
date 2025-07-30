import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  categoryId: z.number().optional(),
  tags: z.array(z.string()).optional(),
});
