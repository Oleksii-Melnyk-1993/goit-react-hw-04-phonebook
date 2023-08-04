import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Oksana Ivanenko', number: '521-34-87' },
        { id: 'id-2', name: 'Vasyl Kovalchuk', number: '765-98-12' },
        { id: 'id-3', name: 'Nadia Hrytsenko', number: '332-56-71' },
        { id: 'id-4', name: 'Taras Petrenko', number: '126-54-87' },
        { id: 'id-5', name: 'Marina Shevchenko', number: '421-89-33' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const generateId = () => {
    return nanoid(6);
  };

  const formSubmitHandler = data => {
    if (contacts.some(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contact list`);
      return;
    }
    setContacts([
      ...contacts,
      { id: generateId(), name: data.name, number: data.number },
    ]);
  };

  const handleChangeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const renderFilteredContacts = () => {
    const normalizedContacts = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedContacts)
    );
  };

  const removeContact = deleteId => {
    setContacts(PrevState =>
      PrevState.filter(contact => contact.id !== deleteId)
    );
    setFilter('');
  };
  const filteredContactList = renderFilteredContacts();
  return (
    <div
      style={{
        paddingTop: '60px',
        paddingBottom: '60px',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#010101',
      }}
    >
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={css.subtitle}>Contacts</h2>
      <p className={css.total}>
        Total contacts:{' '}
        <span className={css.total_count}>{contacts.length}</span>
      </p>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        filteredContactList={filteredContactList}
        removeContact={removeContact}
      />
    </div>
  );
};
