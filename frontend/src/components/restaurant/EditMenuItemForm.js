import React, { useState } from 'react';
import { toast } from 'react-toastify';

const menuCategories = [
  'Main Course',
  'Appetizers',
  'Desserts',
  'Beverages',
  'Sides',
  'Snacks',
];

const EditMenuItemForm = ({ item, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description || '',
    price: item.price,
    category: item.category,
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file.', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB.', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', parseFloat(formData.price));
      formDataToSend.append('category', formData.category);
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      await onUpdate(formDataToSend);
    } catch (err) {
      toast.error(err.message || 'Failed to update menu item', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          {menuCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Current Image:</label>
        {item.image ? (
          <div>
            <img src={item.image} alt="Current menu item" />
          </div>
        ) : (
          <p>No image uploaded</p>
        )}
      </div>
      <div>
        <label htmlFor="edit-image">Upload New Image (Optional):</label>
        <input
          id="edit-image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" disabled={uploadLoading}>
        {uploadLoading ? 'Uploading...' : 'Update Menu Item'}
      </button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditMenuItemForm;