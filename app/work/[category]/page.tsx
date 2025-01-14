import { getCategories, getPostsByCategory } from '@/lib/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const posts = await getPostsByCategory(params.category);
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug === params.category);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold max-w-3xl mb-12">
            {category.name}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} {...post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}