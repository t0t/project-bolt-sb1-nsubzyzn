"use client";

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Post } from '@/lib/content';
import { Upload } from 'lucide-react';
import { usePosts } from '@/lib/hooks/usePosts';
import { validatePost } from '@/lib/validation';
import RichTextEditor from '@/components/RichTextEditor';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80';

export default function AdminPage() {
  const { posts, isLoading, error: postsError, addPost, updatePost, deletePost } = usePosts();
  const [currentPost, setCurrentPost] = useState<Partial<Post>>({});
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewUrl(imageUrl);
        setCurrentPost(prev => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const postData = {
      ...currentPost,
      image: currentPost.image || DEFAULT_IMAGE,
    };

    const { data, error: validationError } = validatePost(postData);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!data) return;

    try {
      if (currentPost.id) {
        updatePost(data as Post);
      } else {
        addPost(data);
      }
      
      setSaveStatus('Saved successfully!');
      setCurrentPost({});
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setError('Failed to save post');
    }
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    deletePost(id);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-extrabold">Admin</h1>
            {(saveStatus || error || postsError) && (
              <p className={`text-sm ${
                error || postsError ? 'text-red-500' : 'text-green-500'
              }`}>
                {error || postsError || saveStatus}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Add/Edit Post</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={currentPost.title || ''}
                    onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={currentPost.excerpt || ''}
                    onChange={e => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Content *
                  </label>
                  <RichTextEditor
                    value={currentPost.content || ''}
                    onChange={(content) => setCurrentPost({ ...currentPost, content })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={currentPost.category || ''}
                    onChange={e => setCurrentPost({ ...currentPost, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Image
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-neutral-50"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Image
                      </button>
                      <span className="text-sm text-neutral-500">or</span>
                      <input
                        type="url"
                        value={currentPost.image || ''}
                        onChange={e => setCurrentPost({ ...currentPost, image: e.target.value })}
                        placeholder="Enter image URL"
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                      />
                    </div>
                    {previewUrl && (
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors"
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
                    className="p-4 border rounded-lg hover:bg-neutral-50 group"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow flex justify-between items-start">
                        <div 
                          className="cursor-pointer"
                          onClick={() => setCurrentPost(post)}
                        >
                          <h3 className="font-medium">{post.title}</h3>
                          <p className="text-sm text-neutral-600">{post.category}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
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