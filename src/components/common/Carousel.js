import React from 'react';
import {
  View,
  StatusBar,
  Platform, Image,
} from 'react-native';
import { Layout, Text, ViewPager, withStyles } from 'react-native-ui-kitten';
import { FloodImage } from '../../assets/images';

const styles = {
  tab: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginHorizontal: 8,
  },
  image: {
    maxWidth: '100%',
    borderRadius: 4,
    height: 180,
  },
  title: {
    marginVertical: 16,
  },
};


const Carousel = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}>
      <Layout
        style={styles.tab}
        level="2"
      >
        <View>
          <Image
            style={styles.image}
            source={FloodImage.imageSource}
          />
        </View>
        <Text style={styles.title} category="p1">Неймовірна гра в мафію, субота 20:00 в кімнаті Піголя</Text>
      </Layout>
      <Layout
        style={styles.tab}
        level="2"
      >
        <Image
          style={styles.image}
          source={FloodImage.imageSource}
        />
        <Text style={styles.title} category="p1">Неймовірна гра в мафію, субота 20:00 в кімнаті Піголя</Text>
      </Layout>
      <Layout
        style={styles.tab}
        level="2"
      >
        <Image
          style={styles.image}
          source={FloodImage.imageSource}
        />
        <Text style={styles.title} category="p1">Неймовірна гра в мафію, субота 20:00 в кімнаті Піголя</Text>
      </Layout>
    </ViewPager>
  )
};

export default withStyles(Carousel);
