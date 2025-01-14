"use client";

import { useState, useEffect, useCallback } from 'react';
import { Post } from '@/lib/content';
import { validatePost } from '@/lib/validation';

const STORAGE_KEY = 'studio_posts';

interface UsePostsReturn {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  addPost: (post: Omit<Post, 'id'>) => Promise<boolean>;
  updatePost: (post: Post) => Promise<boolean>;
  deletePost: (id: number) => Promise<boolean>;
}

export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const savedPosts = localStorage.getItem(STORAGE_KEY);
      setPosts(savedPosts ? JSON.parse(savedPosts) : []);
    } catch (error) {
      setError('Failed to load posts');
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const savePosts = useCallback(async (newPosts: Post[]): Promise<boolean> => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
      setPosts(newPosts);
      return true;
    } catch (error) {
      setError('Failed to save posts');
      console.error('Error saving posts:', error);
      return false;
    }
  }, []);

  const addPost = useCallback(async (post: Omit<Post, 'id'>): Promise<boolean> => {
    const { data, error: validationError } = validatePost({ ...post, id: Date.now() });
    if (validationError || !data) {
      setError(validationError || 'Invalid post data');
      return false;
    }
    return savePosts([data, ...posts]);
  }, [posts, savePosts]);

  const updatePost = useCallback(async (post: Post): Promise<boolean> => {
    const { data, error: validationError } = validatePost(post);
    if (validationError || !data) {
      setError(validationError || 'Invalid post data');
      return false;
    }
    const newPosts = posts.map(p => p.id === post.id ? data : p);
    return savePosts(newPosts);
  }, [posts, savePosts]);

  const deletePost = useCallback(async (id: number): Promise<boolean> => {
    const newPosts = posts.filter(p => p.id !== id);
    return savePosts(newPosts);
  }, [posts, savePosts]);

  return {
    posts,
    isLoading,
    error,
    addPost,
    updatePost,
    deletePost,
  };
}