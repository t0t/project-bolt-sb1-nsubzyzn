import { promises as fs } from 'fs';
import path from 'path';
import Card from './Card';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

async function getPosts() {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.posts;
}

export default async function CardGrid() {
  const posts = await getPosts();

  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <Card key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}