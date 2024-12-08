import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(storedPosts);
    }, []);

    const handleDelete = (index) => {
        const confirmDelete = window.confirm('글 날아가유!');
        if (confirmDelete) {
            const updatedPosts = posts.filter((_, i) => i !== index);
            setPosts(updatedPosts);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
        }
    };

    return (
        <div className="main-container">
            <h1 className="main-title">무려 사진이 올라가는 블로그</h1>
            <Link to="/new">
                <button className="add-post-button">새 글 쓰기</button>
            </Link>
            {posts.map((post, index) => (
                <div key={index} className="post">
                    <Link to={`/detail/${index}`}>
                        <h2 className="post-title">{post.title}</h2>
                    </Link>
                    <p className="post-content">{post.content}</p>
                    <div className="post-images">
                        {post.images.map((image, imgIndex) => (
                            <img
                                key={imgIndex}
                                src={image}
                                alt={`Post ${index} Image ${imgIndex}`}
                                className="post-image"
                            />
                        ))}
                    </div>
                    <button className="delete-post-button" onClick={() => handleDelete(index)}>
                        Delete Post
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Main;
