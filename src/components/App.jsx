import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Oksana Ivanenko', number: '521-34-87' },
      { id: 'id-2', name: 'Vasyl Kovalchuk', number: '765-98-12' },
      { id: 'id-3', name: 'Nadia Hrytsenko', number: '332-56-71' },
      { id: 'id-4', name: 'Taras Petrenko', number: '126-54-87' },
      { id: 'id-5', name: 'Marina Shevchenko', number: '421-89-33' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parcelContacts = JSON.parse(contacts);
    if (parcelContacts) {
      this.setState({ contacts: parcelContacts });
    }
  }
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  generateId = () => {
    return nanoid(6);
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;
    if (contacts.some(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contact list`);
      return;
    }
    this.setState({
      contacts: [
        ...contacts,
        { id: this.generateId(), name: data.name, number: data.number },
      ],
    });
  };

  handleChangeFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  renderFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedContacts = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedContacts)
    );
  };
  removeContact = deleteId => {
    this.setState(PrevState => ({
      contacts: PrevState.contacts.filter(contact => contact.id !== deleteId),
    }));
    this.setState({ filter: '' });
  };

  render() {
    const filteredContactList = this.renderFilteredContacts();
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
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={css.subtitle}>Contacts</h2>
        <p className={css.total}>
          Total contacts:{' '}
          <span className={css.total_count}>{this.state.contacts.length}</span>
        </p>
        <Filter value={this.state.filter} onChange={this.handleChangeFilter} />
        <ContactList
          filteredContactList={filteredContactList}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}
