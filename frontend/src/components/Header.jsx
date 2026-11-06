import { useState } from 'react';
import { ArrowUpRight, Menu, Search, ShoppingBag, X } from 'lucide-react';

export default function Header({ cartCount, onCart, searchOpen, setSearchOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return <>
    <div className="announcement"><span>GOOD GEAR. GREAT OUT THERE.</span><span>Free shipping on orders over $100 <ArrowUpRight size={12} /></span></div>
    <header className="header">
      <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21} /></button>
      <a className="wordmark" href="#top" aria-label="Offgrid home">offgrid<span>.</span></a>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation"><a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a><a href="#story" onClick={() => setMenuOpen(false)}>Our approach</a><a href="#journal" onClick={() => setMenuOpen(false)}>Field notes</a></nav>
      <div className="header-actions"><button className="icon-button" aria-label={searchOpen ? 'Close search' : 'Search'} onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X size={19} /> : <Search size={19} />}</button><button className="bag-button" onClick={onCart} aria-label={`Open bag, ${cartCount} items`}><ShoppingBag size={18} /><span>Bag</span><span className="bag-count">{cartCount}</span></button></div>
    </header>
  </>;
}
