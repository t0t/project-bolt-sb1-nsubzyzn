import { promises as fs } from 'fs';
import path from 'path';

export type Post = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  content?: string;
  createdAt?: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

const DATA_DIR = path.join(process.cwd(), 'data');

export async function getPosts(): Promise<Post[]> {
  const filePath = path.join(DATA_DIR, 'posts.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.posts;
}

export async function getPost(id: number): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find(post => post.id === id) || null;
}

export async function getCategories(): Promise<Category[]> {
  const filePath = path.join(DATA_DIR, 'categories.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.categories;
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const category = categories.find(cat => cat.slug === categorySlug);
  if (!category) return [];
  return posts.filter(post => post.category.toLowerCase() === category.name.toLowerCase());
}