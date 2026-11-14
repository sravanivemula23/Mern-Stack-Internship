import "./ProductCard.css";

// Reusable component: every value comes from props, so one component
// can render any number of different products.
function ProductCard({ name, image, price, description }) {
  return (
    <article className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-body">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">₹{price.toLocaleString("en-IN")}</p>
      </div>
    </article>
  );
}

export default ProductCard;
