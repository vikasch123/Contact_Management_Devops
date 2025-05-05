import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import { ContactContext } from '../../context/ContactContext';
import { UserX } from 'lucide-react';

const Contacts: React.FC = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts?.length === 0) {
    return (
      <div className="py-8 text-center">
        <UserX className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-500">No contacts yet</h3>
        <p className="text-gray-500 mt-1">Add a contact to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(contact => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map(contact => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </div>
  );
};

export default Contacts;