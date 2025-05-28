import "../assets/css/ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <li className="product-li">
      <img src={product.image} alt={product.title} width={200} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </li>
  );
}