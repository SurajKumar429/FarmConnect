// client/src/components/BuyerDashboard.jsx
import React, { useEffect, useState } from 'react';

function MarketCard({ listing }) {
  const { crop_name, quantity, price_per_kg, seller_name, seller_email, seller_phone, seller_location } = listing;

  const mailto = seller_email ? `mailto:${seller_email}?subject=Interested in ${encodeURIComponent(crop_name)}` : null;
  const tel = seller_phone ? `tel:${seller_phone.replace(/\s+/g, '')}` : null;

  return (
    <div className="market-card">
      <h3>{crop_name}</h3>
      <p><strong>Available:</strong> {quantity} kg</p>
      <p><strong>Price:</strong> ₹{price_per_kg} / kg</p>
      <p><strong>Seller:</strong> {seller_name} • {seller_location || '—'}</p>
      <div className="actions">
        {mailto && <a className="button" href={mailto}>Email</a>}
        {tel && <a className="button" href={tel}>Call</a>}
        {/* optional: show modal with more details */}
      </div>
    </div>
  );
}

export default function BuyerDashboard() {
  const [listings, setListings] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchListings() {
    try {
      const token = localStorage.getItem('token'); // adjust if storing elsewhere
      const res = await fetch('/api/buyer/marketplaces', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setListings(data.listings || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchMarketPrices() {
    try {
      const res = await fetch('/api/market-prices');
      const data = await res.json();
      setMarketPrices(data.prices || data); // adjust to your API response shape
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchListings(), fetchMarketPrices()]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="buyer-dashboard container">
      <h1>Buyer Dashboard</h1>

      <section className="market-prices">
        <h2>Market Prices</h2>
        {marketPrices.length === 0 ? <p>No price data.</p> : (
          <div className="prices-grid">
            {marketPrices.map((p, i) => (
              <div key={i} className="price-card">
                <strong>{p.crop_name}</strong>
                <div>₹{p.price_per_kg} / kg • {p.mandi_name || p.market || p.location}</div>
                <div className="price-date">{new Date(p.price_date || p.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="market-listings">
        <h2>Available Listings</h2>
        {loading ? <p>Loading...</p> : (
          listings.length === 0 ? <p>No listings right now.</p> : (
            <div className="listings-grid">
              {listings.map(l => <MarketCard key={l.id} listing={l} />)}
            </div>
          )
        )}
      </section>
 </div>
 );
}