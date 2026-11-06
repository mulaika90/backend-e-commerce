import { ArrowUpRight } from 'lucide-react';

export default function Hero({ onShop }) {
  return <section className="hero" id="top">
    <div className="hero-image" role="img" aria-label="A hiker stepping onto a sunlit mountain trail" />
    <div className="hero-shade" />
    <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot" /> MADE FOR THE IN-BETWEEN</p><h1>Outside,<br />your <span>way.</span></h1><p className="hero-description">Thoughtful gear for the long way round, the early start, and the detour that turns into the whole day.</p><button className="button button-lime" onClick={onShop}>Find your outside <ArrowUpRight size={17} /></button></div>
    <div className="hero-caption"><span>01 / 04</span><span>WIND RIVER RANGE, WY</span><span>43° 22' N — 109° 45' W</span></div><div className="hero-mark">O<span>↗</span></div>
  </section>;
}
