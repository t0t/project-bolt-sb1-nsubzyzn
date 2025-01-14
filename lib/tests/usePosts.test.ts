import { renderHook, act } from '@testing-library/react';
import { usePosts } from '../hooks/usePosts';

describe('usePosts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty posts array', () => {
    const { result } = renderHook(() => usePosts());
    expect(result.current.posts).toEqual([]);
  });

  it('should add a new post', () => {
    const { result } = renderHook(() => usePosts());
    
    const newPost = {
      title: 'Test Post',
      excerpt: 'Test Excerpt',
      category: 'Test Category',
      image: 'https://example.com/image.jpg'
    };

    act(() => {
      result.current.addPost(newPost);
    });

    expect(result.current.posts).toHaveLength(1);
    expect(result.current.posts[0]).toMatchObject(newPost);
  });

  it('should update an existing post', () => {
    const { result } = renderHook(() => usePosts());
    
    const post = {
      id: 1,
      title: 'Original Title',
      excerpt: 'Original Excerpt',
      category: 'Original Category',
      image: 'https://example.com/image.jpg'
    };

    act(() => {
      result.current.savePosts([post]);
    });

    const updatedPost = { ...post, title: 'Updated Title' };

    act(() => {
      result.current.updatePost(updatedPost);
    });

    expect(result.current.posts[0].title).toBe('Updated Title');
  });

  it('should delete a post', () => {
    const { result } = renderHook(() => usePosts());
    
    const post = {
      id: 1,
      title: 'Test Post',
      excerpt: 'Test Excerpt',
      category: 'Test Category',
      image: 'https://example.com/image.jpg'
    };

    act(() => {
      result.current.savePosts([post]);
    });

    act(() => {
      result.current.deletePost(1);
    });

    expect(result.current.posts).toHaveLength(0);
  });
});