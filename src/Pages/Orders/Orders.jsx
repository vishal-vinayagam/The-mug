import { useState } from 'react'
import './Orders.css'

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all')
  
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-10-15',
      status: 'Delivered',
      items: [
        { name: 'Custom Printed Mug', quantity: 2, price: 15.99 },
        { name: 'Coffee Beans', quantity: 1, price: 12.99 }
      ],
      total: 44.97,
      tracking: 'TRK-789456'
    },
    {
      id: 'ORD-12346',
      date: '2023-10-10',
      status: 'Processing',
      items: [
        { name: 'Ceramic Travel Mug', quantity: 1, price: 24.99 }
      ],
      total: 24.99,
      tracking: null
    },
    {
      id: 'ORD-12347',
      date: '2023-10-05',
      status: 'Shipped',
      items: [
        { name: 'Mug Gift Set', quantity: 1, price: 35.99 },
        { name: 'Tea Sampler', quantity: 1, price: 18.99 }
      ],
      total: 54.98,
      tracking: 'TRK-123456'
    }
  ]

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === activeTab)

  return (
    <div className="orders-page">
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        
        <div className="orders-tabs">
          <button 
            className={activeTab === 'all' ? 'tab-active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Orders
          </button>
          <button 
            className={activeTab === 'processing' ? 'tab-active' : ''}
            onClick={() => setActiveTab('processing')}
          >
            Processing
          </button>
          <button 
            className={activeTab === 'shipped' ? 'tab-active' : ''}
            onClick={() => setActiveTab('shipped')}
          >
            Shipped
          </button>
          <button 
            className={activeTab === 'delivered' ? 'tab-active' : ''}
            onClick={() => setActiveTab('delivered')}
          >
            Delivered
          </button>
        </div>

        <div className="orders-list">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p>Placed on {order.date}</p>
                  </div>
                  <div className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <div className="item-price">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    Total: <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="order-actions">
                    {order.tracking && (
                      <button className="track-btn">
                        Track Order
                      </button>
                    )}
                    <button className="reorder-btn">
                      Reorder
                    </button>
                    <button className="details-btn">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-orders">
              <i className="fas fa-shopping-bag"></i>
              <h3>No orders found</h3>
              <p>You haven't placed any orders in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders