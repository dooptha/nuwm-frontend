import React from 'react';
import Fuse from 'fuse.js';
import { AutocompleteInput } from '../../components/common';
import { useGlobalState } from '../../utils/context';

const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'title',
  ],
};

export default (props) => {
  const [{ app }] = useGlobalState();

  const getDatalist = (text) => {
    const fuse = new Fuse(app.groups, options);

    return fuse.search(text).splice(0, 5);
  };

  return (
    <AutocompleteInput
      {...props}
      clearInput
      getDatalist={(text) => getDatalist(text)}
      getItemString={(item) => item.title}
    />
  );
};
