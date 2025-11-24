import React, { useEffect, useState } from 'react';
import { getProducts, saveProducts, getSession } from '../utils/storage';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

function Dashboard({ user, onLogout }) {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [view, setView] = useState('list'); // 'list' | 'report'

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const addProduct = (product) => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: nextId,
      name: product.name,
      category: product.category,
      price: Number(product.price) || 0,
      stock: Number(product.stock) || 0
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updated) => {
    setProducts(products.map(p => p.id === updated.id ? {
      ...p,
      name: updated.name,
      category: updated.category,
      price: Number(updated.price) || 0,
      stock: Number(updated.stock) || 0
    } : p));
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const subtotal = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const itbis = subtotal * 0.18;
  const total = subtotal + itbis;

  // Permisos
  const isAdmin = user.role === 'admin';
  const isEmployee = user.role === 'employee';

  return (
    <div>
      <div className="topbar">
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{fontWeight:700}}>Papelería</div>
          <input style={{width:360, padding:8, borderRadius:8, border:'none'}} placeholder="Buscar artículo..." />
        </div>

        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div>{user.name} ({user.role})</div>
          <button className="btn btn-secondary" onClick={onLogout}>Cerrar Sesión</button>
        </div>
      </div>

      <div className="layout">
        <aside className="sidebar">
          <h3>Menú</h3>
          <div className="menu-item" onClick={() => setView('list')}>Inventario</div>
          <div className="menu-item" onClick={() => setView('report')}>Reporte</div>
          <div style={{height:12}}></div>
          <div style={{fontSize:13, color:'#94a3b8'}}>Usuario:</div>
          <div style={{fontSize:14, fontWeight:600}}>{user.username}</div>
        </aside>

        <main className="content">
          <div className="cuadro">
            <div className="header-row">
              <h2>{view === 'list' ? 'Gestión de Productos' : 'Reporte de Inventario'}</h2>
              <div className='no-print'>
                <span style={{marginRight:12}}>Items: <b>{products.length}</b></span>
                {view === 'report' ? (
                   <button className="btn btn-primary" onClick={() => window.print()}>
                    Imprimir Reporte
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={() => { setEditingProduct(null); setView('list'); }}>
                    + Agregar Producto
                  </button>
                )}
              </div>
            </div>

            {view === 'list' && (
              <>
                {/* Formulario: permitir agregar/editar según rol:
                    - empleados y admin pueden añadir/editar
                    */}
                {(isEmployee || isAdmin) && (
                  <ProductForm
                    addProduct={addProduct}
                    updateProduct={updateProduct}
                    editingProduct={editingProduct}
                    setEditingProduct={setEditingProduct}
                  />
                )}

                <ProductList
                  products={products}
                  deleteProduct={isAdmin ? deleteProduct : () => {}}
                  setEditingProduct={(p) => {
                    // empleados pueden editar también
                    if (isEmployee || isAdmin) setEditingProduct(p);
                  }}
                  showDelete={isAdmin}
                />

                {/* Totales */}
                <div style={{marginTop:18, display:'flex', justifyContent:'flex-end', gap:12}}>
                  <div style={{textAlign:'right'}}>
                    <div>Subtotal: <b>${subtotal.toFixed(2)}</b></div>
                    <div>ITBIS (18%): <b>${itbis.toFixed(2)}</b></div>
                    <div style={{fontSize:18, marginTop:6}}>TOTAL: <b>${total.toFixed(2)}</b></div>
                  </div>
                </div>
              </>
            )}

            {view === 'report' && (
              <>
                {/* Vista de reporte estilo la imagen (sin imágenes) */}
                <div className="report-meta">
                  <div>
                    <div style={{fontWeight:700}}>LISTA DE ENTREGA DE ARTÍCULOS DE PAPELERÍA Y OFICINA</div>
                    <div style={{marginTop:8}}>FECHA: {new Date().toLocaleDateString()}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div>ENTREGADO POR:</div>
                    <div style={{marginTop:30}}>______________________</div>
                    <div>Nombre</div>
                  </div>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>ARTÍCULO</th>
                        <th style={{width:140}}>CANTIDAD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td style={{textAlign:'right'}}>{p.stock} Unidades</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
