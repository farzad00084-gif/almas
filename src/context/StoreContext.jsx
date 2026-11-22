import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { siteConfig } from '../data/config.js';
import { translate } from '../i18n/translations.js';

const StoreContext = createContext(null);
const CART_KEY = 'almas-order-cart-v2';
const LANGUAGE_KEY = 'almas-language-v1';
const THEME_KEY = 'almas-theme-v1';

function readStorage(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

export function StoreProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = readStorage(LANGUAGE_KEY, null);
    return siteConfig.supportedLanguages.includes(saved) ? saved : 'en';
  });
  const [theme, setTheme] = useState(() => {
    const saved = readStorage(THEME_KEY, null);
    if (saved === 'light' || saved === 'dark') return saved;
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    try { localStorage.setItem(THEME_KEY, JSON.stringify(theme)); } catch {}
  }, [theme]);
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language === 'fa' ? 'fa-AF' : language === 'de' ? 'de-CH' : 'en';
    root.dir = language === 'fa' ? 'rtl' : 'ltr';
    root.classList.toggle('rtl', language === 'fa');
    try { localStorage.setItem(LANGUAGE_KEY, JSON.stringify(language)); } catch {}
  }, [language]);
  useEffect(() => {
    try { localStorage.removeItem(CART_KEY); } catch {}
    const resetRestoredCart = (event) => { if (event.persisted) setCart([]); };
    window.addEventListener('pageshow', resetRestoredCart);
    return () => window.removeEventListener('pageshow', resetRestoredCart);
  }, []);

  const addToCart = (product, quantity = 1, note = '') => {
    const cleanNote = note.trim();
    setCart((current) => {
      const existing = current.find((line) => line.slug === product.slug && (line.note || '') === cleanNote);
      if (existing) return current.map((line) => line.id === existing.id ? { ...line, quantity: line.quantity + quantity } : line);
      const id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      return [...current, { id, slug: product.slug, name: product.name, category: product.category, image: product.image, thumbnail: product.thumbnail || product.image, price: product.priceValue, quantity, note: cleanNote }];
    });
  };
  const updateQuantity = (id, quantity) => setCart((current) => current.map((line) => line.id === id ? { ...line, quantity: Math.max(1, Number(quantity) || 1) } : line));
  const updateNote = (id, note) => setCart((current) => current.map((line) => line.id === id ? { ...line, note } : line));
  const removeFromCart = (id) => setCart((current) => current.filter((line) => line.id !== id));
  const clearCart = () => setCart([]);
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const t = (key, values) => translate(language, key, values);
  const locale = siteConfig.localeByLanguage[language] || 'en-CH';
  const formatPrice = (value) => new Intl.NumberFormat(locale, { style: 'currency', currency: siteConfig.currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value) || 0);

  const value = useMemo(() => ({ language, setLanguage, theme, setTheme, cart, count, subtotal, addToCart, updateQuantity, updateNote, removeFromCart, clearCart, t, locale, formatPrice, config: siteConfig }), [language, theme, cart, count, subtotal]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
}
