"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Post } from '@/lib/content';

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Partial<Post>>({});

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  const handleExport = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ posts }, null, 2)
    )}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'posts.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPosts = currentPost.id
      ? posts.map(p => (p.id === currentPost.id ? { ...p, ...currentPost } : p))
      : [...posts, { ...currentPost, id: Date.now() }];
    setPosts(newPosts);
    setCurrentPost({});
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-extrabold">Content Manager</h1>
            <button
              onClick={handleExport}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-neutral-800"
            >
              Export JSON
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Add/Edit Post</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={currentPost.title || ''}
                    onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={currentPost.excerpt || ''}
                    onChange={e => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={currentPost.category || ''}
                    onChange={e => setCurrentPost({ ...currentPost, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={currentPost.image || ''}
                    onChange={e => setCurrentPost({ ...currentPost, image: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-neutral-800"
                >
                  {currentPost.id ? 'Update Post' : 'Add Post'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Posts</h2>
              <div className="space-y-4">
                {posts.map(post => (
                  <div
                    key={post.id}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-neutral-50"
                    onClick={() => setCurrentPost(post)}
                  >
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-neutral-600">{post.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}