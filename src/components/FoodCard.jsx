import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { categoryKeys } from '../data/products.js';
export default function FoodCard({ product }) {
  const { t, addToCart, formatPrice } = useStore();
  const categoryLabel=t(categoryKeys[product.category]||product.category);
  const shownPrice=product.isExtra?product.priceLabel:formatPrice(product.priceValue);
  return <article className="food-card group overflow-hidden rounded-[26px] border border-soft bg-[var(--surface)] shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"><Link to={`/menu/${product.slug}`} className="relative block overflow-hidden rounded-t-[25px]" aria-label={`${t('viewDetails')}: ${product.name}`}><img src={product.image} alt={product.name} className="food-card-image aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" loading="lazy" decoding="async"/><span className="absolute bottom-3 left-3 rounded-full bg-[var(--surface)]/90 px-3 py-1 text-[10px] font-medium text-muted backdrop-blur">{categoryLabel}</span></Link><div className="p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><h3 className="font-display text-xl leading-snug">{product.name}</h3><span className="shrink-0 text-sm font-semibold tabular-nums">{shownPrice}</span></div>{product.description&&<p className="mt-2 min-h-10 text-sm leading-6 text-muted">{product.description}</p>}<div className="mt-5 grid grid-cols-2 gap-2"><Link className="btn-outline text-center" to={`/menu/${product.slug}`}>{t('viewDetails')}</Link><button className="btn-primary" type="button" onClick={()=>addToCart(product,1,'')}>{t('addToCart')}</button></div></div></article>;
}
