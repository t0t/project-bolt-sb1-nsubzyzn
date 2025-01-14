"use client";

import Card from './Card';
import { usePosts } from '@/lib/hooks/usePosts';

export default function CardGrid() {
  const { posts, isLoading } = usePosts();

  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Base de datos</h2>
        {isLoading ? (
          <p>Loading posts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} {...post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}