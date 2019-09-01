import React from 'react';
import { AutocompleteInput } from '../../components/common';

export default (props) => {
  const getDatalist = (text) => {
    return [];
  };

  return (
    <AutocompleteInput
      {...props}
      getDatalist={(text) => getDatalist(text)}
      getItemString={(item) => item}
    />
  );
};
