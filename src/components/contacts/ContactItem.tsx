import React, { useContext } from 'react';
import { Contact, ContactContext } from '../../context/ContactContext';
import { Mail, Phone, Edit, Trash2 } from 'lucide-react';

interface ContactItemProps {
  contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <div className="contact-card mb-4">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <span className={`badge ${type === 'personal' ? 'badge-personal' : 'badge-professional'}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
        <ul className="space-y-2 mb-4">
          {email && (
            <li className="flex items-center text-gray-600">
              <Mail className="h-4 w-4 mr-2 text-indigo-600" />
              {email}
            </li>
          )}
          {phone && (
            <li className="flex items-center text-gray-600">
              <Phone className="h-4 w-4 mr-2 text-indigo-600" />
              {phone}
            </li>
          )}
        </ul>
        <div className="flex space-x-2">
          <button
            className="btn btn-primary flex items-center"
            onClick={() => setCurrent(contact)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button 
            className="btn btn-danger flex items-center"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;