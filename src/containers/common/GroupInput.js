import React from 'react';
import { AutocompleteInput } from '../../components/common';
import { useGlobalState } from '../../utils/context';

export default (props) => {
  const [{ app }] = useGlobalState();

  const getDatalist = (text) => (
    app.groups
      .filter((group) => group.includes(text))
      .slice(0, 5)
  );

  return (
    <AutocompleteInput
      {...props}
      getDatalist={(text) => getDatalist(text)}
    />
  );
};
