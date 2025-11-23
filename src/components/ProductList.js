// src/components/ProductList.js
import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, deleteProduct, setEditingProduct, showDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <ProductItem
              key={p.id}
              product={p}
              deleteProduct={deleteProduct}
              setEditingProduct={setEditingProduct}
              showDelete={showDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
