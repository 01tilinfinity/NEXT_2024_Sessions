import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/header';
import Main from './pages/Main/main';
import About from './pages/About/about';
import Footer from './components/Footer/footer';
import SeoulBike from './pages/SeoulBike/SeoulBike';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main className="MainContent">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/seoulbike" element={<SeoulBike />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
