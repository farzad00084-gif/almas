import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

function SunIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>; }
function MoonIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.7 8.7 0 1 0 20.2 15.1Z"/></svg>; }
function CartIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 1.9-1.4L21 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>; }

export default function Header() {
  const { t, language, setLanguage, theme, setTheme, count } = useStore();
  const [open, setOpen] = useState(false);
  const nav = [['home', '/'], ['menu', '/menu'], ['about', '/about'], ['gallery', '/gallery'], ['contact', '/contact']];
  const close = () => setOpen(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return <header className="site-header sticky top-0 z-40 border-b border-soft"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
    <Link to="/" className="brand flex shrink-0 items-center gap-3" onClick={close} aria-label={`ALMAS Restaurant — ${t('home')}`}><span className="brand-mark grid h-10 w-10 place-items-center rounded-full border border-gold font-display text-2xl italic text-gold">A</span><span><b className="block font-display text-lg uppercase tracking-[.2em]">ALMAS</b><small className="block text-[9px] uppercase tracking-[.18em] text-muted">Restaurant · Aarau</small></span></Link>
    <button className="icon-button ml-auto lg:hidden" type="button" aria-label={open ? t('closeNavigation') : t('openNavigation')} aria-expanded={open} onClick={() => setOpen(!open)}><span className="text-xl" aria-hidden="true">{open ? '×' : '☰'}</span></button>
    <nav className={`${open ? 'flex' : 'hidden'} mobile-nav absolute inset-x-0 top-full flex-col gap-1 border-b border-soft bg-[var(--surface)] p-4 shadow-xl lg:static lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`} aria-label={t('mainNavigation')}>{nav.map(([key, to]) => <NavLink key={to} to={to} end={to === '/'} onClick={close} className={({ isActive }) => `nav-link ${isActive ? 'nav-active' : ''}`}>{t(key)}</NavLink>)}
      <Link to="/menu" className="btn-primary nav-order lg:ml-2" onClick={close}>{t('orderNow')}</Link>
    </nav>
    <div className="header-tools flex shrink-0 items-center gap-2">
      <label className="sr-only" htmlFor="language-select">{t('language')}</label><select id="language-select" className="language-select" value={language} onChange={(e) => setLanguage(e.target.value)} aria-label={t('language')}><option value="en">EN</option><option value="fa">دری</option><option value="de">DE</option></select>
      <button className="icon-button" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')} title={theme === 'dark' ? t('lightMode') : t('darkMode')}>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</button>
      <Link className="icon-button relative" to="/cart" aria-label={`${t('cart')}: ${count}`} title={t('cart')}><CartIcon />{count > 0 && <span className="cart-badge" aria-live="polite">{count > 99 ? '99+' : count}</span>}</Link>
    </div>
  </div></header>;
}
