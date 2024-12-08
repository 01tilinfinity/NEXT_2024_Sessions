import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const imageRefs = useRef([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPost(storedPosts[id]);
    }, [id]);

    const handleImageClick = (index) => {
        const newHref = prompt('Enter new image URL');
        if (newHref) {
            const updatedImages = post.images.map((img, imgIndex) => (imgIndex === index ? newHref : img));
            const updatedPost = { ...post, images: updatedImages };
            setPost(updatedPost);

            const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
            storedPosts[id] = updatedPost;
            localStorage.setItem('posts', JSON.stringify(storedPosts));
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="detail-container">
            <h1 className="detail-title">글 제목: {post.title}</h1>
            <p className="detail-content">글 내용: {post.content}</p>
            <div className="detail-images">
                {post.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Post Image ${index}`}
                        className="detail-image"
                        onClick={() => handleImageClick(index)}
                        ref={(el) => (imageRefs.current[index] = el)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Detail;
