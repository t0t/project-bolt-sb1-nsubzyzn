"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { usePosts } from '@/lib/hooks/usePosts';

export default function BlogPage() {
  const { posts, isLoading } = usePosts();

  return (
    <>
      <Header />
      <main className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold max-w-3xl mb-12">
            Datos
          </h1>
          
          {isLoading ? (
            <p>Cargando datos...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} {...post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}