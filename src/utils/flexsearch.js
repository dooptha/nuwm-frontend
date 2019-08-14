import FlexSearch from 'flexsearch/dist/flexsearch.min';

function loadDataToFlexSearchInstance(index, data) {
  index.clear();

  data.forEeach((group, i) => {
    index.add(i, group);
  });
}

const groups = new FlexSearch({
  encode: 'advanced',
  tokenize: 'reverse',
  suggest: true,
  cache: true,
});

const loadGroups = (data) => loadDataToFlexSearchInstance(groups, data);

export default {
  groups,
  loadGroups,
};
