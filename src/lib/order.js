export function calculateOrder(cart, orderType, config) {
  const subtotal = cart.reduce((sum, line) => sum + Number(line.price) * Number(line.quantity), 0);
  const deliveryFee = orderType === 'delivery' ? config.deliveryFee : 0;
  const total = subtotal + (typeof deliveryFee === 'number' ? deliveryFee : 0);
  return { subtotal, deliveryFee, total, feePending: orderType === 'delivery' && deliveryFee == null };
}

export function normalizeWhatsAppNumber(value) {
  return String(value || '').replace(/\D/g, '');
}

export function buildWhatsAppMessage({ customer, orderType, cart, totals, t, formatPrice }) {
  const lines = [
    `${t('helloOrder')}`,
    '',
    t('customerInformation'),
    `${t('nameLabel')}: ${customer.name}`,
    `${t('phoneLabel')}: ${customer.phone}`,
    `${t('orderTypeLabel')}: ${t(orderType)}`,
  ];
  if (orderType === 'delivery') lines.push(`${t('addressLabel')}: ${customer.address}`);
  if (customer.instructions?.trim()) lines.push(`${t('extraInstructions')}: ${customer.instructions.trim()}`);
  lines.push('', t('orderDetails'));
  cart.forEach((line, index) => {
    lines.push(`${index + 1}. ${line.name}`);
    lines.push(`${t('quantity')}: ${line.quantity}`);
    lines.push(`${t('unitPrice')}: ${formatPrice(line.price)}`);
    lines.push(`${t('lineTotal')}: ${formatPrice(line.price * line.quantity)}`);
    lines.push(`${t('commentLabel')}: ${line.note?.trim() || t('noSpecialInstructions')}`);
    lines.push('');
  });
  lines.push('-------------------------', `${t('subtotal')}: ${formatPrice(totals.subtotal)}`);
  if (orderType === 'delivery') lines.push(`${t('deliveryFee')}: ${totals.feePending ? t('feeToConfirm') : formatPrice(totals.deliveryFee)}`);
  else lines.push(`${t('deliveryFee')}: ${t('notApplicable')}`);
  lines.push(`${t('total')}: ${formatPrice(totals.total)}`);
  if (totals.feePending) lines.push(t('deliveryFeeNotIncluded'));
  lines.push('', t('thankYou'));
  return lines.join('\n');
}

export function makeWhatsAppUrl(number, message) {
  const normalized = normalizeWhatsAppNumber(number);
  if (normalized.length < 8) throw new Error('WHATSAPP_NUMBER_NOT_CONFIGURED');
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
