import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import SimpleBottomNavigation from './components/bottom-navigation/BottomNavigation';
import Form from './components/form/Form';
import List from './components/list/List';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div className="App">
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="list" element={<List />} />
          </Routes>
        </div>
        <SimpleBottomNavigation />
      </div>
    </ThemeProvider>
  );
}

export default App;
