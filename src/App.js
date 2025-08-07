import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeLayout from './HomeLayout';

function AppRouter() {
    const { lng } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (lng && i18n.language !== lng) {
            i18n.changeLanguage(lng);
        }
    }, [lng, i18n]);

    return <HomeLayout />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/de" replace />} />
                <Route path="/:lng/*" element={<AppRouter />} />
                <Route path="*" element={<Navigate to="/de" replace />} /> {/* optional fallback */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
