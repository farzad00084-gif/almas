import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FoodCard from '../components/FoodCard.jsx';
import { categories, categoryKeys, products } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';
import { categoryNotes } from '../data/menu.js';

export default function MenuPage() {
  const { t } = useStore();
  const [params, setParams] = useSearchParams();
  const initial = params.get('category') || 'all';
  const [active, setActive] = useState(categories.includes(initial) ? initial : 'all');
  const [query, setQuery] = useState('');
  const shown = useMemo(() => products.filter((item) => (active === 'all' || item.category === active) && `${item.name} ${item.description || ''}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [active, query]);
  const choose = (category) => { setActive(category); setParams(category === 'all' ? {} : { category }); };
  return <div className="page-shell"><section className="page-intro"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20"><p className="eyebrow">ALMAS · Aarau</p><h1 className="section-heading">{t('menuTitle')}</h1><p className="mt-4 max-w-2xl leading-7 text-muted">{t('menuIntro')}</p></div></section><div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
    <div className="menu-toolbar"><label className="search-box"><span className="sr-only">{t('searchMenu')}</span><svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5" strokeLinecap="round"/></svg><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('searchMenu')}/></label><div className="category-filters" role="group" aria-label={t('allCategories')}><button className={`filter-chip ${active === 'all' ? 'selected' : ''}`} onClick={() => choose('all')} aria-pressed={active === 'all'}>{t('allCategories')}</button>{categories.map((category) => <button key={category} className={`filter-chip ${active === category ? 'selected' : ''}`} onClick={() => choose(category)} aria-pressed={active === category}>{t(categoryKeys[category])}</button>)}</div></div>
    <div className="flex items-center justify-between gap-4 py-4 text-xs text-muted"><span>{t('resultCount', { count: shown.length })}</span><span>{t('priceIn')}</span></div>
    {active === 'Pizza' && categoryNotes.Pizza && <p className="menu-note mb-7">{categoryNotes.Pizza}</p>}
    {shown.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{shown.map((product) => <FoodCard key={product.slug} product={product}/>)}</div> : <div className="empty-panel"><h2 className="font-display text-2xl">{t('noResults')}</h2></div>}
    <p className="mt-8 max-w-3xl text-xs leading-6 text-muted">{t('originalMenuNotice')}</p>
  </div></div>;
}
