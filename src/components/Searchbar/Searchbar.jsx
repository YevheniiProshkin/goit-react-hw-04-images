import PropTypes from 'prop-types';
// import { Component } from 'react';
import { useState } from 'react';
import {
  Header,
  Form,
  Button,
  Input,
  Span,
} from 'components/Searchbar/Searchbar.styled';
import { MdSearch } from 'react-icons/md';
import Notiflix from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery === '') {
      Notiflix.Notify.info('Enter text!');
      return;
    }
    onSubmit(searchQuery);
  };

  const handleChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <MdSearch size={30} />
          <Span>Search</Span>
        </Button>
        <Input
          onChange={handleChange}
          value={searchQuery}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
