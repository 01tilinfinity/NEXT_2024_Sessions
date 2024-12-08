import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Detail from './components/Detail';
import NewPost from './components/NewPost';

function App() {
    const clearLocalStorage = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <Router>
            <div>
                <button onClick={clearLocalStorage}>Clear Local Storage</button>
            </div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/new" element={<NewPost />} />
            </Routes>
        </Router>
    );
}

export default App;
