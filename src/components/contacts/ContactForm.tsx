import React, { useState, useContext, useEffect } from 'react';
import { ContactContext, Contact } from '../../context/ContactContext';

const ContactForm: React.FC = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent } = contactContext;

  const [contact, setContact] = useState<Omit<Contact, 'id'>>({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (current) {
      setContact({
        name: current.name,
        email: current.email,
        phone: current.phone,
        type: current.type,
      });
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle radio buttons for type
    if (name === 'type') {
      setContact({
        ...contact,
        type: value as 'personal' | 'professional',
      });
    } else {
      setContact({ ...contact, [name]: value });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (current) {
      updateContact({ ...contact, id: current.id });
    } else {
      addContact(contact);
    }
    
    // Clear the form
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
    
    clearCurrent();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
            className="form-input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            className="form-input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700 mb-2">Contact Type</span>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="type"
                id="personal"
                value="personal"
                checked={type === 'personal'}
                onChange={onChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="personal" className="ml-2 text-sm text-gray-700">
                Personal
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="type"
                id="professional"
                value="professional"
                checked={type === 'professional'}
                onChange={onChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="professional" className="ml-2 text-sm text-gray-700">
                Professional
              </label>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="btn btn-primary">
            {current ? 'Update Contact' : 'Add Contact'}
          </button>
          {current && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearAll}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;