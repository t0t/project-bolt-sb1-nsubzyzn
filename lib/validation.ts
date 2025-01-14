import { z } from 'zod';

export const postSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required').max(100),
  excerpt: z.string().min(1, 'Excerpt is required').max(500),
  category: z.string().min(1, 'Category is required').max(50),
  content: z.string().min(1, 'Content is required'),
  image: z.string().url().optional(),
});

export type PostInput = z.infer<typeof postSchema>;

export function validatePost(data: unknown) {
  try {
    return { data: postSchema.parse(data), error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { data: null, error: error.errors[0].message };
    }
    return { data: null, error: 'Invalid post data' };
  }
}