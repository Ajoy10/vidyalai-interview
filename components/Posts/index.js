import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidthContext } from '../contexts/WindowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  const { isSmallerDevice } = useWindowWidthContext();

  const paginationIndex = useRef(0);

  const fetchPost = async (start = 0, smallerDevice = false) => {
    const { data } = await axios.get('/api/v1/posts', {
      params: {
        start: start,
        limit: smallerDevice ? 5 : 10,
      },
    });
    return data;
  };

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const { posts: newPosts } = await fetchPost(0, isSmallerDevice);
      setPosts(newPosts);
      paginationIndex.current += newPosts.length;
    };

    fetchInitialPosts();
  }, [isSmallerDevice]);

  const handleClick = async () => {
    setIsLoading(true);

    const { posts: newPosts, remaining } = await fetchPost(
      paginationIndex.current,
      isSmallerDevice,
    );

    setPosts(prev => [...prev, ...newPosts]);
    paginationIndex.current += newPosts.length;

    if (remaining <= 0) {
      setShowLoadMoreButton(false);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {showLoadMoreButton && (
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}
