import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { fullnameToAbbrivation, mod } from '../../utils/utilFunctions';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const AuthorProfile = styled.div(() => ({
  padding: '10px',
  display: 'flex',
  gap: '10px',
}));
const ProfileImage = styled.div(() => ({
  boxSizing: 'border-box',
  width: '48px',
  height: '48px',

  backgroundColor: '#7f7f7f',
  borderRadius: '50%',
  color: 'white',
  fontWeight: 'bold',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
const ProfileText = styled.div(() => ({}));
const ProfileName = styled.div(() => ({
  fontWeight: 'bold',
}));
const ProfileEmail = styled.div(() => ({
  fontSize: '0.90em',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
  top: calc(50% - 25px);
`;

const NextButton = styled(Button)`
  right: 10px;
  top: calc(50% - 25px);
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const imageRef = useRef([]);
  const currentImage = useRef(0);

  const handleNextClick = () => {
    if (
      carouselRef.current &&
      imageRef.current &&
      imageRef.current.length > 0
    ) {
      currentImage.current = mod(
        currentImage.current + 1,
        imageRef.current.length,
      );
      imageRef.current[currentImage.current].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const handlePrevClick = () => {
    if (
      carouselRef.current &&
      imageRef.current &&
      imageRef.current.length > 0
    ) {
      currentImage.current = mod(
        currentImage.current - 1,
        imageRef.current.length,
      );
      imageRef.current[currentImage.current].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  return (
    <PostContainer>
      <AuthorProfile>
        <ProfileImage>{fullnameToAbbrivation(post.user.name)}</ProfileImage>
        <ProfileText>
          <ProfileName>{post.user.name}</ProfileName>
          <ProfileEmail>{post.user.email}</ProfileEmail>
        </ProfileText>
      </AuthorProfile>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem
              ref={el => (imageRef.current[index] = el)}
              key={index}
            >
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default Post;
