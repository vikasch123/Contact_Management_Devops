import React, { createContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'personal' | 'professional';
}

type ContactState = {
  contacts: Contact[];
  filtered: Contact[] | null;
  current: Contact | null;
};

type ContactAction =
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'DELETE_CONTACT'; payload: string }
  | { type: 'SET_CURRENT'; payload: Contact }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'UPDATE_CONTACT'; payload: Contact }
  | { type: 'FILTER_CONTACTS'; payload: string }
  | { type: 'CLEAR_FILTER' };

// Create context
interface ContactContextValue {
  contacts: Contact[];
  filtered: Contact[] | null;
  current: Contact | null;
  addContact: (contact: Omit<Contact, 'id'>) => void;
  deleteContact: (id: string) => void;
  setCurrent: (contact: Contact) => void;
  clearCurrent: () => void;
  updateContact: (contact: Contact) => void;
  filterContacts: (text: string) => void;
  clearFilter: () => void;
}

export const ContactContext = createContext<ContactContextValue>({
  contacts: [],
  filtered: null,
  current: null,
  addContact: () => {},
  deleteContact: () => {},
  setCurrent: () => {},
  clearCurrent: () => {},
  updateContact: () => {},
  filterContacts: () => {},
  clearFilter: () => {},
});

// Reducer
const contactReducer = (state: ContactState, action: ContactAction): ContactState => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
        filtered: state.filtered
          ? state.filtered.filter(contact => contact.id !== action.payload)
          : null,
      };
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: null,
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        filtered: state.filtered
          ? state.filtered.map(contact =>
              contact.id === action.payload.id ? action.payload : contact
            )
          : null,
      };
    case 'FILTER_CONTACTS':
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            contact.name.match(regex) ||
            contact.email.match(regex) ||
            contact.phone.match(regex)
          );
        }),
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};

// Provider
export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: ContactState = {
    contacts: [],
    filtered: null,
    current: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState, () => {
    const savedContacts = localStorage.getItem('contacts');
    return {
      ...initialState,
      contacts: savedContacts ? JSON.parse(savedContacts) : [],
    };
  });

  // Save contacts to localStorage when they change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  // Actions
  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      ...contact,
      id: uuidv4(),
    };
    dispatch({ type: 'ADD_CONTACT', payload: newContact });
  };

  const deleteContact = (id: string) => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  const setCurrent = (contact: Contact) => {
    dispatch({ type: 'SET_CURRENT', payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  const updateContact = (contact: Contact) => {
    dispatch({ type: 'UPDATE_CONTACT', payload: contact });
  };

  const filterContacts = (text: string) => {
    dispatch({ type: 'FILTER_CONTACTS', payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        filtered: state.filtered,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};