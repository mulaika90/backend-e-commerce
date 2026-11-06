import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import CartDrawer from './components/CartDrawer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProductCard from './components/ProductCard.jsx';

const products = [
  { id: 1, name: 'Daybreak Shell', category: 'Apparel', price: 189, color: 'Moss / 3 colors', badge: 'BESTSELLER', image: 'photo-1551028719-00167b16eac5', background: '#c4c6b7' },
  { id: 2, name: 'Ridge 28 Pack', category: 'Packs', price: 148, color: 'Cinder / 2 colors', badge: 'NEW COLOR', image: 'photo-1553062407-98eeb64c6a62', background: '#d3cec1' },
  { id: 3, name: 'Trail Form 01', category: 'Footwear', price: 164, color: 'Stone / 4 colors', badge: '', image: 'photo-1542291026-7eec264c27ff', background: '#d5c9bb' },
  { id: 4, name: 'Field Notes Kit', category: 'Accessories', price: 42, color: 'Set of 3', badge: 'LOW STOCK', image: 'photo-1517842645767-c639042777db', background: '#bbbca8' },
];
const categories = ['All gear', 'Apparel', 'Packs', 'Footwear', 'Accessories'];
const sortOptions = ['Featured', 'Price: low to high', 'Price: high to low'];

function SearchPanel({ query, setQuery, onClose, onSearch }) {
  return <div className="search-panel"><Search size={18} /><input autoFocus aria-label="Search gear" placeholder="Try ‘daybreak’ or ‘packs’" value={query} onChange={(event) => { setQuery(event.target.value); onSearch(); }} /><button onClick={onClose} aria-label="Close search"><X size={18} /></button></div>;
}

function ProductFilters({ activeCategory, onCategoryChange, sortBy, onSortChange }) {
  const [sortOpen, setSortOpen] = useState(false);

  return <div className="shop-controls">
    <div className="category-tabs" role="tablist" aria-label="Product categories">{categories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} role="tab" aria-selected={activeCategory === category} onClick={() => onCategoryChange(category)}>{category}</button>)}</div>
    <div className="sort-wrap"><button className="sort-button" onClick={() => setSortOpen(!sortOpen)}><SlidersHorizontal size={15} /><span>{sortBy}</span><ChevronDown size={14} /></button>{sortOpen && <div className="sort-menu">{sortOptions.map((option) => <button key={option} onClick={() => { onSortChange(option); setSortOpen(false); }}>{option}{sortBy === option && <Check size={14} />}</button>)}</div>}</div>
  </div>;
}

function StorySection() {
  return <section className="story-strip" id="story"><div className="story-image" role="img" aria-label="A trail through a green mountain valley" /><div className="story-content"><p className="eyebrow">LESS, BUT BETTER</p><h2>Go further.<br /><span>Carry lighter.</span></h2><p>We make the pieces you reach for every time you head out. Considered materials, no-fuss details, and a lighter footprint on the places we love.</p><a className="text-link" href="#journal">What we stand for <ArrowUpRight size={15} /></a></div><div className="story-index">A NOTE FROM THE TRAIL <span>002 / 024</span></div></section>;
}

function JournalSection() {
  return <section className="journal-section" id="journal"><p className="eyebrow"><span className="section-number">02</span> POSTCARDS FROM OUT THERE</p><div className="journal-row"><h2>Keep a little<br />room for <span>wonder.</span></h2><div className="journal-side"><p>Trail notes, faraway places, and good things spotted along the way. A field letter, now and then.</p><a className="text-link" href="mailto:hello@offgrid.example">Get the field letter <ArrowUpRight size={15} /></a></div><div className="journal-decoration">OG<br /><span>FIELD<br />NOTES</span><ArrowUpRight size={22} /></div></div></section>;
}

function Footer() {
  return <footer className="footer"><a className="wordmark" href="#top">offgrid<span>.</span></a><span>TAKE THE LONG WAY HOME.</span><div><a href="#shop">Shop</a><a href="#story">Our approach</a><a href="mailto:hello@offgrid.example">Get in touch</a></div><span className="copyright">© OFFGRID 2026</span></footer>;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All gear');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [saved, setSaved] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [sortBy, setSortBy] = useState('Featured');

  const visibleProducts = useMemo(() => {
    const matching = products.filter((product) => (activeCategory === 'All gear' || product.category === activeCategory) && product.name.toLowerCase().includes(query.toLowerCase()));
    return [...matching].sort((a, b) => sortBy === 'Price: low to high' ? a.price - b.price : sortBy === 'Price: high to low' ? b.price - a.price : a.id - b.id);
  }, [activeCategory, query, sortBy]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timeout);
    notify.timeout = window.setTimeout(() => setToast(''), 2400);
  }
  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
    });
    notify(`${product.name} added to your bag`);
  }
  function changeQuantity(id, amount) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  }
  function toggleSaved(id) {
    setSaved((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
    notify(saved.includes(id) ? 'Removed from saved gear' : 'Saved for later');
  }
  function scrollToShop() { document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }

  return <>
    <Header cartCount={cartCount} onCart={() => setCartOpen(true)} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    {searchOpen && <SearchPanel query={query} setQuery={setQuery} onClose={() => { setQuery(''); setSearchOpen(false); }} onSearch={scrollToShop} />}
    <main>
      <Hero onShop={scrollToShop} />
      <section className="shop-section" id="shop">
        <div className="section-heading"><div><p className="eyebrow"><span className="section-number">01</span> THE GOOD STUFF</p><h2>Go-to gear<span className="heading-period">.</span></h2></div><a className="text-link collection-link" href="#shop">View the full collection <ArrowUpRight size={15} /></a></div>
        <ProductFilters activeCategory={activeCategory} onCategoryChange={setActiveCategory} sortBy={sortBy} onSortChange={setSortBy} />
        {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} isSaved={saved.includes(product.id)} onToggleSave={toggleSaved} onAdd={addToCart} />)}</div> : <div className="no-results"><Search size={23} /><p>No gear found for “{query}”.</p><button className="text-link" onClick={() => { setQuery(''); setActiveCategory('All gear'); }}>Clear filters <ArrowRight size={15} /></button></div>}
        <div className="shop-footer"><span>SHOWING {visibleProducts.length} OF {products.length} PIECES</span><button onClick={() => { setActiveCategory('All gear'); setQuery(''); }}>Explore everything <ArrowDownRight size={15} /></button></div>
      </section>
      <StorySection />
      <JournalSection />
    </main>
    <Footer />
    <CartDrawer isOpen={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQuantity={changeQuantity} />
    {toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}
  </>;
}
