import React, { useState } from 'react';

const SubscriptionModal = ({ product, selectedPrice, handleClose }) => {
  const [subscriptionType, setSubscriptionType] = useState(null);

  const handleSubscribe = () => {
    // Implement your logic for subscribing here
    if (subscriptionType) {
      alert(`Subscribed to ${subscriptionType} plan for ${product.productName}`);
    } else {
      alert('Please select a subscription plan.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{product.productName}</h2>
        <img src={`data:image/jpeg;base64,${product.base64Image}`} alt={product.Title} />
        <h3>Price: ${selectedPrice}</h3>
        <div>
          <label>
            <input type="radio" name="subscription" value="daily" onChange={() => setSubscriptionType('Daily')} />
            Daily
          </label>
          <label>
            <input type="radio" name="subscription" value="weekly" onChange={() => setSubscriptionType('Weekly')} />
            Weekly
          </label>
          <label>
            <input type="radio" name="subscription" value="monthly" onChange={() => setSubscriptionType('Monthly')} />
            Monthly
          </label>
        </div>
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
