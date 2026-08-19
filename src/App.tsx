import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastProvider } from './context/ToastContext';
import { FullPageSpinner } from './components/common/Spinner';

// Lazy-loaded pages for optimal load performance
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Apply = lazy(() => import('./pages/Apply').then((m) => ({ default: m.Apply })));
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })));
const Rates = lazy(() => import('./pages/Rates').then((m) => ({ default: m.Rates })));
const Documents = lazy(() => import('./pages/Documents').then((m) => ({ default: m.Documents })));
const ApplicationStatus = lazy(() =>
  import('./pages/ApplicationStatus').then((m) => ({ default: m.ApplicationStatus }))
);
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ToastProvider>
            <Header />
            <Suspense fallback={<FullPageSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/rates" element={<Rates />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/application-status" element={<ApplicationStatus />} />
                {/* Catch-all 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </ToastProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
