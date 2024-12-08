import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link to="/">메인 화면</Link>
                    </li>
                    <li>
                        <Link to="/seoulbike">대여 자전거 정보</Link>
                    </li>
                    <li>
                        <Link to="/about">만든 사람</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
