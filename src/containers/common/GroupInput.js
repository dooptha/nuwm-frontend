import React from 'react';
import { AutocompleteInput } from '../../components/common';
import flexsearch from '../../utils/flexsearch';

export default (props) => {
  const getDatalist = (text) => flexsearch.groups.search(text, 6);

  return (
    <AutocompleteInput
      {...props}
      getDatalist={(text) => getDatalist(text)}
      getItemString={(item) => item}
    />
  );
};
