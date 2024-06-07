import './App.css'
import Navbar from "./components/shared/Navbar";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    return (
        <Router>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>

                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/device/:id" element={<Dashboard />} />
                </Routes>
            </ThemeProvider>
        </Router>
    )
}

export default App
