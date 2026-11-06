import { ArrowRight, ArrowUpRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';

const imageUrl = (id, width = 220) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function CartDrawer({ isOpen, items, onClose, onQuantity }) {
  if (!isOpen) return null;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><aside className="cart-drawer" aria-label="Shopping bag"><div className="drawer-header"><div><p className="eyebrow">YOUR NEXT OUTING</p><h2>Your bag <span>({count})</span></h2></div><button className="icon-button" aria-label="Close bag" onClick={onClose}><X size={20} /></button></div>{items.length === 0 ? <div className="empty-cart"><ShoppingBag size={28} /><p>Your bag is taking the scenic route.</p><button className="text-link" onClick={onClose}>Explore the gear <ArrowRight size={15} /></button></div> : <><div className="cart-items">{items.map((item) => <div className="cart-item" key={item.id}><img src={imageUrl(item.image)} alt="" /><div className="cart-item-copy"><h3>{item.name}</h3><p>{item.color}</p><div className="quantity-control"><button aria-label={`Remove one ${item.name}`} onClick={() => onQuantity(item.id, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label={`Add one ${item.name}`} onClick={() => onQuantity(item.id, 1)}><Plus size={13} /></button></div></div><span className="cart-item-price">${item.price * item.quantity}</span></div>)}</div><div className="cart-summary"><p><span>Subtotal</span><strong>${total}</strong></p><span className="shipping-note">{total >= 100 ? 'You unlocked free shipping.' : `You are $${100 - total} away from free shipping.`}</span><button className="button button-lime checkout-button" onClick={() => window.alert('Thanks for exploring Offgrid. Checkout is coming soon.')}>Continue to checkout <ArrowUpRight size={16} /></button><p className="tax-note">Taxes and shipping calculated at checkout.</p></div></>}</aside></div>;
}
