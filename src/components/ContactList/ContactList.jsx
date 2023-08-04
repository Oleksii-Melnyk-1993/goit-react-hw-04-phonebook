import PropTypes from 'prop-types';
import { ContactListItem } from './ContactItemList/ContactListItem';
import css from './ContactList.module.css';

export const ContactList = ({ filteredContactList, removeContact }) => {
  return (
    <ul className={css.list}>
      {filteredContactList.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          removeContact={removeContact}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filteredContactList: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
  removeContact: PropTypes.func.isRequired,
};
