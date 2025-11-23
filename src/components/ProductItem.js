// src/components/ProductItem.js
import React from 'react';

function ProductItem({ product, deleteProduct, setEditingProduct, showDelete }) {
  const subtotal = (Number(product.price) || 0) * (Number(product.stock) || 0);

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>${Number(product.price || 0).toFixed(2)}</td>
      <td>{product.stock}</td>
      <td>${subtotal.toFixed(2)}</td>
      <td className="product-actions">
        <button className="btn btn-small btn-secondary" onClick={() => setEditingProduct(product)}>Editar</button>
        {showDelete ? (
          <button className="btn btn-small btn-danger" onClick={() => deleteProduct(product.id)}>Eliminar</button>
        ) : null}
      </td>
    </tr>
  );
}

export default ProductItem;
