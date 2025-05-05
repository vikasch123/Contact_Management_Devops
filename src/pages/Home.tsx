import React from 'react';
import ContactForm from '../components/contacts/ContactForm';
import Contacts from '../components/contacts/Contacts';
import ContactFilter from '../components/contacts/ContactFilter';

const Home: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;