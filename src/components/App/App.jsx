// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from 'Redux/slices/contactsSlice';
import { filter } from 'Redux/slices/filterSlice';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container } from './App.styled';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filterValue = useSelector(state => state.filter.value);
  const dispatch = useDispatch();

  const onFilterChange = e => {
    dispatch(filter(e.target.value));
  };

  const onFilteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    if (contacts !== []) {
      const filtredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
      return filtredContacts;
    }
  };

  const onFormSubmitState = ({ ...data }) => {
    const enterName = contacts.map(contact => contact.name);
    const enterNumber = contacts.map(contact => contact.number);

    if (enterName.includes(data.name)) {
      return alert(`${data.name} is allready in contact`);
    }
    if (enterNumber.includes(data.number)) {
      return alert(`This number ${data.number} is allready in contact`);
    }

    dispatch(add(data));
  };

  const deleteContact = contactId => {
    dispatch(remove(contactId));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmitState} />

      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} value={filterValue} />
      <ContactList
        contacts={onFilteredContacts()}
        deleteContact={deleteContact}
      />
    </Container>
  );
};
