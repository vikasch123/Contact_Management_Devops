import React, { useContext, useRef, useEffect } from 'react';
import { ContactContext } from '../../context/ContactContext';
import { Search, X } from 'lucide-react';

const ContactFilter: React.FC = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (filtered === null && text.current) {
      text.current.value = '';
    }
  }, [filtered]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  const handleClear = () => {
    if (text.current) {
      text.current.value = '';
      clearFilter();
    }
  };

  return (
    <div className="mb-6 relative">
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
        <div className="px-3 py-2 text-gray-500">
          <Search className="h-5 w-5" />
        </div>
        <input
          ref={text}
          type="text"
          placeholder="Filter Contacts..."
          onChange={onChange}
          className="w-full py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
        />
        {filtered && (
          <button 
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactFilter;