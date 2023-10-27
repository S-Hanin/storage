import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import DocumentsPage from "./pages/DocumentsPage";
import Layout from './components/Layout';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  spacing: [0, 4, 8, 16, 32, 64],
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
        }
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          lineHeight: '32px',
          fontSize: '9pt'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '0px',
        }
      }
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Layout />} >
            <Route exact path='documents' element={<DocumentsPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
