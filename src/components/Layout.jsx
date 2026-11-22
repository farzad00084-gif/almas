import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0); }, [pathname]); return null; }
export default function Layout() { return <><ScrollToTop /><Header /><main id="main-content" className="min-h-[65vh]"><Outlet /></main><Footer /></>; }
