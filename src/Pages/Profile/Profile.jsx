import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Profile.css'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Here you would typically update the user profile
    console.log('Saving profile:', formData)
    setIsEditing(false)
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">My Profile</h1>
        
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-large">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} />
              ) : (
                <span>{user?.displayName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}</span>
              )}
            </div>
            <div className="profile-info">
              <h2>{user?.displayName || 'User'}</h2>
              <p>{user?.email}</p>
            </div>
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="profile-details">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Add your phone number"
              />
            </div>

            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your delivery address"
                rows="3"
              />
            </div>

            {isEditing && (
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Total Orders</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-heart"></i>
            </div>
            <div className="stat-info">
              <h3>8</h3>
              <p>Favorites</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-ticket-alt"></i>
            </div>
            <div className="stat-info">
              <h3>3</h3>
              <p>Active Coupons</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile