import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import {
  Layout,
  Text,
  ViewPager,
  withStyles,
} from 'react-native-ui-kitten';

const styles = {
  tab: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginHorizontal: 8,
    shadowColor: '#6c6c6c',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 4,
    // resizeMode : 'cover',
  },
  title: {
    marginTop: 16,
  },
  titleImage: {
    width: '100%',
    height: 180,
    borderRadius: 4,
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  empty: {
    height: 250,
  },
};

const Carousel = ({ items, handleClick }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  if (!items || items.length === 0) {
    return <View style={styles.empty}/>;
  }

  const elements = items.map((item) => {
    const onlyText = !item.image;

    const content = onlyText ? (
      <Text
        style={styles.titleImage}
        category="p1"
        numberOfLines={10}
      >
        {item.title}
      </Text>
    ) : (
      <>
        <Image
          style={styles.image}
          source={{ uri: item.image }}
        />
        <Text
          style={styles.title}
          category="p1"
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </>
    );
    return (
      <Layout
        level="2"
        key={item.id}
      >
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleClick(item)}
          activeOpacity={0.8}
        >
          {content}
        </TouchableOpacity>
      </Layout>
    );
  });

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      {elements}
    </ViewPager>
  );
};

export default withStyles(Carousel);
