import React from 'react';
import styles from './about.module.css';

const About = () => {
    return (
        <div>
            <h2>제작자: 김애랑</h2>
            <h3>고려대학교 국어국문학과</h3>
            <h3>
                <a href="http://github.com/01tilinfinity" target="_blank" rel="noopener noreferrer">
                    Sandy's Github
                </a>
            </h3>
            <p>이 페이지는 React 학습 용으로 만들어졌습니다. 문의사항은 hs01151116@korea.ac.kr로 메일주세요.</p>
        </div>
    );
};

export default About;
