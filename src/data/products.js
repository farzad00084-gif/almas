import { menuItems } from './menu.js';

export const categoryKeys = { Pizza:'categoryPizza', Pide:'categoryPide', Lahmacun:'categoryLahmacun', Snacks:'categorySnacks', 'Box / Salat / Dessert':'categoryBoxes', Teller:'categoryPlates' };
export function slugify(value) { return value.toLowerCase().replace(/ß/g,'ss').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
export const products = menuItems.map((item,index) => {
  const match=String(item.price).replace(',','.').match(/\d+(?:\.\d+)?/);
  const slug=slugify(item.name);
  return {
    ...item,
    id:`${slug}-${index+1}`,
    slug,
    image:`/images/dishes/${slug}.webp`,
    thumbnail:`/images/dishes/thumbs/${slug}.webp`,
    priceValue:match?Number(match[0]):0,
    priceLabel:item.price,
    isExtra:String(item.price).trim().startsWith('+')
  };
});
export const categories=[...new Set(products.map((item)=>item.category))];
export const getProductBySlug=(slug)=>products.find((item)=>item.slug===slug);
export const getRelatedProducts=(product,limit=3)=>products.filter((item)=>item.category===product.category&&item.slug!==product.slug).slice(0,limit);
