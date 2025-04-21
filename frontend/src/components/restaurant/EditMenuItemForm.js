import React, { useState } from 'react';

const EditMenuItemForm = ({ item, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description || '',
    price: item.price,
    category: item.category,
    image: item.image || '',
    isAvailable: item.isAvailable,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(item._id, {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || undefined,
      isAvailable: formData.isAvailable,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="edit-name">Name:</label>
        <input
          id="edit-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="edit-description">Description:</label>
        <textarea
          id="edit-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="edit-price">Price:</label>
        <input
          id="edit-price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <label htmlFor="edit-category">Category:</label>
        <select
          id="edit-category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>
      </div>
      <div>
        <label htmlFor="edit-image">Image URL (Optional):</label>
        <input
          id="edit-image"
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="edit-isAvailable">
          <input
            id="edit-isAvailable"
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
          />
          Available
        </label>
      </div>
      <button type="submit">Update Menu Item</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditMenuItemForm;