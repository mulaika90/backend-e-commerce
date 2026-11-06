import { Heart, Plus } from 'lucide-react';

const imageUrl = (id, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function ProductCard({ product, isSaved, onToggleSave, onAdd }) {
  return <article className="product-card"><div className="product-image-wrap" style={{ '--product-bg': product.background }}><img src={imageUrl(product.image)} alt={product.name} loading="lazy" />{product.badge && <span className="product-badge">{product.badge}</span>}<button className={`save-button ${isSaved ? 'is-saved' : ''}`} aria-label={isSaved ? `Remove ${product.name} from saved items` : `Save ${product.name}`} onClick={() => onToggleSave(product.id)}><Heart size={17} fill={isSaved ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={() => onAdd(product)}><span>Quick add</span><Plus size={16} /></button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.color}</p></div><span className="product-price">${product.price}</span></div></article>;
}
