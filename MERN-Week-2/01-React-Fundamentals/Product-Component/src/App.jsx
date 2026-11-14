import ProductCard from "./components/ProductCard";
import "./App.css";

// Product data lives in an array; .map() renders one card per product.
const products = [
  { id: 1, name: "Wireless Headphones", image: "/images/headphones.svg", price: 2999, description: "Noise-cancelling over-ear headphones with 30-hour battery life." },
  { id: 2, name: "Runner Sneakers", image: "/images/sneakers.svg", price: 3499, description: "Lightweight, breathable sneakers built for daily running." },
  { id: 3, name: "Smart Watch", image: "/images/watch.svg", price: 4999, description: "Track steps, heart rate and sleep with a bright AMOLED display." },
];

function App() {
  return (
    <main className="container">
      <h1>Product Information</h1>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </main>
  );
}
export default App;
