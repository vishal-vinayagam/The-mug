import { useState } from 'react'
import './Coupons.css'

const Coupons = () => {
  const [activeTab, setActiveTab] = useState('available')

  const availableCoupons = [
    {
      id: 1,
      code: 'WELCOME15',
      discount: '15% OFF',
      description: 'Get 15% off on your first order',
      validUntil: '2023-12-31',
      minPurchase: 25,
      category: 'All Products'
    },
    {
      id: 2,
      code: 'FREESHIP',
      discount: 'Free Shipping',
      description: 'Free shipping on orders over $50',
      validUntil: '2023-11-30',
      minPurchase: 50,
      category: 'All Orders'
    },
    {
      id: 3,
      code: 'MUGLOVER',
      discount: '20% OFF',
      description: '20% off on all mugs',
      validUntil: '2023-12-15',
      minPurchase: 30,
      category: 'Mugs Only'
    }
  ]

  const usedCoupons = [
    {
      id: 4,
      code: 'SUMMER10',
      discount: '10% OFF',
      description: 'Summer special discount',
      usedOn: '2023-08-15',
      orderId: 'ORD-12340'
    }
  ]

  const expiredCoupons = [
    {
      id: 5,
      code: 'SPRING20',
      discount: '20% OFF',
      description: 'Spring clearance sale',
      expiredOn: '2023-06-30'
    }
  ]

  const getCurrentCoupons = () => {
    switch (activeTab) {
      case 'available': return availableCoupons
      case 'used': return usedCoupons
      case 'expired': return expiredCoupons
      default: return availableCoupons
    }
  }

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
    // You could show a toast notification here
    alert(`Coupon code ${code} copied to clipboard!`)
  }

  return (
    <div className="coupons-page">
      <div className="container">
        <h1 className="page-title">Coupons & Offers</h1>
        
        <div className="coupons-tabs">
          <button 
            className={activeTab === 'available' ? 'tab-active' : ''}
            onClick={() => setActiveTab('available')}
          >
            Available
          </button>
          <button 
            className={activeTab === 'used' ? 'tab-active' : ''}
            onClick={() => setActiveTab('used')}
          >
            Used
          </button>
          <button 
            className={activeTab === 'expired' ? 'tab-active' : ''}
            onClick={() => setActiveTab('expired')}
          >
            Expired
          </button>
        </div>

        <div className="coupons-grid">
          {getCurrentCoupons().length > 0 ? (
            getCurrentCoupons().map(coupon => (
              <div key={coupon.id} className="coupon-card">
                <div className="coupon-header">
                  <div className="coupon-discount">
                    {coupon.discount}
                  </div>
                  {activeTab === 'available' && (
                    <button 
                      className="copy-btn"
                      onClick={() => copyToClipboard(coupon.code)}
                    >
                      Copy Code
                    </button>
                  )}
                </div>

                <div className="coupon-code">
                  <span>{coupon.code}</span>
                </div>

                <div className="coupon-info">
                  <p>{coupon.description}</p>
                  
                  {activeTab === 'available' && (
                    <>
                      <div className="coupon-detail">
                        <i className="fas fa-calendar"></i>
                        <span>Valid until: {coupon.validUntil}</span>
                      </div>
                      <div className="coupon-detail">
                        <i className="fas fa-shopping-cart"></i>
                        <span>Min. purchase: ${coupon.minPurchase}</span>
                      </div>
                      <div className="coupon-detail">
                        <i className="fas fa-tag"></i>
                        <span>Category: {coupon.category}</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'used' && (
                    <div className="coupon-detail">
                      <i className="fas fa-check-circle"></i>
                      <span>Used on: {coupon.usedOn} (Order #{coupon.orderId})</span>
                    </div>
                  )}

                  {activeTab === 'expired' && (
                    <div className="coupon-detail">
                      <i className="fas fa-times-circle"></i>
                      <span>Expired on: {coupon.expiredOn}</span>
                    </div>
                  )}
                </div>

                {activeTab === 'available' && (
                  <div className="coupon-footer">
                    <button className="apply-btn">
                      Apply Coupon
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-coupons">
              <i className="fas fa-ticket-alt"></i>
              <h3>No coupons found</h3>
              <p>You don't have any coupons in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Coupons