import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
export default function NotFound() { const { t } = useStore(); return <div className="mx-auto max-w-2xl px-5 py-24 text-center"><p className="eyebrow justify-center">ALMAS · Aarau</p><h1 className="section-heading">{t('notFoundTitle')}</h1><p className="mt-4 text-muted">{t('notFoundText')}</p><Link className="btn-primary mt-7" to="/">{t('goHome')}</Link></div>; }
