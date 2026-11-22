import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
export default function OrderSuccess() {
  const { t, clearCart } = useStore();
  const location = useLocation();
  const url = location.state?.whatsappUrl;
  return <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24"><div className="success-panel"><span className="success-icon" aria-hidden="true">{url?'✓':'!'}</span><p className="eyebrow justify-center">ALMAS · Aarau</p><h1 className="section-heading">{url?t('orderPreparedTitle'):t('orderNotConfirmed')}</h1><p className="mt-5 leading-7 text-muted">{url?t('orderPreparedText'):t('orderNotConfirmed')}</p><div className="notice-warning mt-6">{t('orderNotConfirmed')}</div>{url&&<a className="btn-primary mt-7 w-full" href={url} target="_blank" rel="noreferrer">{t('openWhatsApp')}</a>}<div className="mt-6 flex flex-wrap justify-center gap-3"><button className="btn-outline" type="button" onClick={clearCart}>{t('clearCart')}</button><Link className="text-link" to="/menu">{t('continueShopping')}</Link><Link className="text-link" to="/">{t('backHome')}</Link></div></div></div>;
}
