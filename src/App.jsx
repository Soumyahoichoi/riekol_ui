import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
function App() {
    return (
        <BrowserRouter>
            <Toaster richColors />
            <Router />
            <Analytics />;
        </BrowserRouter>
    );
}

export default App;
