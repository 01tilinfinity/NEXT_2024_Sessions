import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState(['', '', '']);
    const navigate = useNavigate();

    const resizeImage = (file, maxWidth, maxHeight, callback) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                callback(dataUrl);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleImageChange = (index, file) => {
        resizeImage(file, 800, 800, (resizedImage) => {
            const newImages = [...images];
            newImages[index] = resizedImage;
            setImages(newImages);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { title, content, images };
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        storedPosts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(storedPosts));
        navigate('/');
    };

    const inputStyle = {
        width: '100%',
        fontSize: '16px',
        padding: '8px',
        margin: '8px 0',
    };

    const textareaStyle = {
        width: '100%',
        height: '150px',
        fontSize: '16px',
        padding: '8px',
        margin: '8px 0',
    };

    return (
        <div className="new-post-container">
            <h1 className="new-post-title">새 글 쓰기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="new-post-label">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label className="new-post-label">Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={textareaStyle}
                    ></textarea>
                </div>
                <div>
                    <label className="new-post-label">Image 1:</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(0, e.target.files[0])}
                        required
                        style={inputStyle}
                    />
                    {images[0] && <img src={images[0]} alt="Preview 1" style={{ width: '100px', height: '100px' }} />}
                </div>
                <div>
                    <label className="new-post-label">Image 2:</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(1, e.target.files[0])}
                        required
                        style={inputStyle}
                    />
                    {images[1] && <img src={images[1]} alt="Preview 2" style={{ width: '100px', height: '100px' }} />}
                </div>
                <div>
                    <label className="new-post-label">Image 3:</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(2, e.target.files[0])}
                        required
                        style={inputStyle}
                    />
                    {images[2] && <img src={images[2]} alt="Preview 3" style={{ width: '100px', height: '100px' }} />}
                </div>
                <button type="submit">글 작성!</button>
            </form>
        </div>
    );
};

export default NewPost;
