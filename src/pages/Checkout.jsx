import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { calculateOrder, buildWhatsAppMessage, makeWhatsAppUrl, normalizeWhatsAppNumber } from '../lib/order.js';

export default function CheckoutPage() {
  const { t, cart, subtotal, formatPrice, config } = useStore();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState('pickup');
  const [error, setError] = useState('');
  const totals = calculateOrder(cart, orderType, config);
  const whatsappReady = normalizeWhatsAppNumber(config.whatsappNumber).length >= 8;
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!cart.length) { setError(t('emptyCartCheckout')); return; }
    if (orderType === 'delivery' && !config.deliveryAvailable) { setError(t('deliveryUnavailable')); return; }
    if (orderType === 'pickup' && !config.pickupAvailable) { setError(t('pickupUnavailable')); return; }
    if (!whatsappReady) { setError(t('whatsappSetup')); return; }
    const data = new FormData(form);
    const customer = { name:data.get('name'), phone:data.get('phone'), address:data.get('address'), instructions:data.get('instructions') };
    try {
      const message = buildWhatsAppMessage({ customer, orderType, cart, totals, t, formatPrice });
      const url = makeWhatsAppUrl(config.whatsappNumber, message);
      window.open(url, '_blank', 'noopener,noreferrer');
      navigate('/order-success', { state:{ whatsappUrl:url } });
    } catch { setError(t('whatsappSetup')); }
  };
  if (!cart.length) return <div className="mx-auto max-w-3xl px-5 py-20 text-center"><h1 className="section-heading">{t('emptyCart')}</h1><p className="mt-4 text-muted">{t('emptyCartCheckout')}</p><Link to="/menu" className="btn-primary mt-7">{t('browseMenu')}</Link></div>;
  return <div className="page-shell"><div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16"><p className="eyebrow">ALMAS · Aarau</p><h1 className="section-heading">{t('checkoutTitle')}</h1><div className="checkout-layout mt-9"><form className="checkout-form" onSubmit={handleSubmit}><fieldset><legend className="font-display text-2xl">{t('customerInfo')}</legend><div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><label className="form-label" htmlFor="customer-name">{t('fullName')} *</label><input id="customer-name" className="form-control" name="name" autoComplete="name" required maxLength={100}/></div><div><label className="form-label" htmlFor="customer-phone">{t('phone')} *</label><input id="customer-phone" className="form-control" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={24} pattern="[0-9+() -]{7,24}"/></div></div></fieldset>
    <fieldset className="mt-8"><legend className="font-display text-2xl">{t('orderType')}</legend><div className="mt-4 grid gap-3 sm:grid-cols-2"><label className={`choice-card ${orderType==='pickup'?'choice-selected':''} ${!config.pickupAvailable?'choice-disabled':''}`}><input type="radio" name="orderType" value="pickup" checked={orderType==='pickup'} onChange={()=>setOrderType('pickup')} disabled={!config.pickupAvailable}/><span><strong>{t('pickup')}</strong>{!config.pickupAvailable&&<small>{t('pickupUnavailable')}</small>}</span></label><label className={`choice-card ${orderType==='delivery'?'choice-selected':''} ${!config.deliveryAvailable?'choice-disabled':''}`}><input type="radio" name="orderType" value="delivery" checked={orderType==='delivery'} onChange={()=>setOrderType('delivery')} disabled={!config.deliveryAvailable}/><span><strong>{t('delivery')}</strong>{!config.deliveryAvailable&&<small>{t('deliveryUnavailable')}</small>}</span></label></div>{orderType==='delivery'&&config.deliveryAvailable&&<div className="mt-4"><label className="form-label" htmlFor="delivery-address">{t('deliveryAddress')} *</label><textarea id="delivery-address" className="form-control min-h-24" name="address" autoComplete="street-address" required maxLength={300}/></div>}</fieldset>
    <div className="mt-8"><label className="form-label" htmlFor="order-instructions">{t('extraInstructions')}</label><textarea id="order-instructions" className="form-control min-h-24" name="instructions" placeholder={t('extraPlaceholder')} maxLength={500}/></div>
    {!whatsappReady&&<div className="notice-warning mt-6"><strong>{t('whatsappNotConfigured')}</strong><p className="mb-0 mt-1">{t('whatsappSetup')}</p></div>}{error&&<p className="status-error mt-4" role="alert">{error}</p>}
    <button className="btn-primary mt-6 w-full" type="submit" disabled={!whatsappReady}>{t('whatsapp')}</button>{!whatsappReady&&<p className="mt-3 text-xs text-muted">{t('whatsappSetup')}</p>}
    </form><aside className="order-summary"><h2 className="font-display text-2xl">{t('orderSummary')}</h2><div className="mt-5 space-y-4">{cart.map((line)=><div className="summary-product" key={line.id}><div className="flex justify-between gap-3"><span>{line.quantity} × {line.name}</span><strong className="whitespace-nowrap">{formatPrice(line.price*line.quantity)}</strong></div>{line.note&&<p className="mt-1 text-xs text-muted">{t('specialInstructions')}: {line.note}</p>}</div>)}</div><div className="summary-row mt-5"><span>{t('subtotal')}</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-row"><span>{t('deliveryFee')}</span><span className="text-muted">{orderType==='delivery'?(totals.feePending?t('feeToConfirm'):formatPrice(totals.deliveryFee)):t('notApplicable')}</span></div><div className="summary-row total-row"><span>{totals.feePending?t('totalBeforeFee'):t('total')}</span><strong>{formatPrice(totals.total)}</strong></div>{totals.feePending&&<p className="mt-3 text-xs leading-5 text-muted">{t('deliveryFeeNotIncluded')}</p>}<Link className="text-link mt-5" to="/cart">{t('cart')}</Link></aside></div></div></div>;
}
