import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0); }, [pathname]); return null; }
export default function Layout() { return <><ScrollToTop /><Header /><main id="main-content" className="min-h-[65vh]"><Suspense fallback={<div className="route-loading" aria-hidden="true"><span/></div>}><Outlet /></Suspense></main><Footer /></>; }
