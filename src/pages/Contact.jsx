import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { siteConfig } from '../data/config.js';
const maps='https://www.google.com/maps/search/?api=1&query=Bahnhofstrasse%2092%2C%205000%20Aarau';
export default function Contact(){
  const {t}=useStore();
  return <div className="page-shell"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20"><p className="eyebrow">ALMAS | Aarau</p><h1 className="section-heading">{t('contactTitle')}</h1><div className="contact-layout mt-10"><div className="contact-details"><ContactBlock label={t('address')}><address className="not-italic">Bahnhofstrasse 92<br/>5000 Aarau<br/>Switzerland</address></ContactBlock><ContactBlock label={t('phoneLabel')}><a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phoneDisplay}</a></ContactBlock><ContactBlock label={t('emailLabel')}><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></ContactBlock><div className="mt-5 flex flex-wrap gap-3"><a className="btn-primary" href={`tel:${siteConfig.phoneHref}`}>{t('callRestaurant')}</a><a className="btn-outline" href={maps} target="_blank" rel="noreferrer">{t('openMaps')}</a></div><Link className="text-link mt-5" to="/menu">{t('browseMenu')}</Link></div><a className="map-card" href={maps} target="_blank" rel="noreferrer" aria-label={t('openMaps')}><span className="map-lines" aria-hidden="true"/><span className="map-pin" aria-hidden="true"/><span className="map-label"><small>ALMAS RESTAURANT</small><strong>Bahnhofstrasse 92<br/>5000 Aarau</strong><em>{t('openMaps')} &gt;</em></span></a></div></div></div>;
}
function ContactBlock({label,children}){return <div className="contact-block"><h2>{label}</h2><div className="text-base leading-7">{children}</div></div>;}
