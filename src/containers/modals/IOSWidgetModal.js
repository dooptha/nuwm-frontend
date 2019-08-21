import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import {
  Text,
  Button,
  withStyles,
} from 'react-native-ui-kitten';
import { Modal } from '../../components/common';
import { IOSWidgetImage } from '../../assets/images';
import I18n from '../../utils/i18n';
import { storeKey } from '../../utils/storage';
import { LinearIOSWidgetTutorialComplete } from '../../utils/animations';

class IOSWidgetModal extends Component {
  constructor(props) {
    super(props);

    this.state = { isModalVisible: false };
    this.onBackdropPress = this.onBackdropPress.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onModalButtonPress = this.onModalButtonPress.bind(this);
  }

  onBackdropPress() {
    this.setState({ isModalVisible: false });
  }

  onButtonPress() {
    this.setState({ isModalVisible: true });
  }

  onModalButtonPress() {
    const { dispatch } = this.props;

    storeKey('IOSWidjetTutorialComplete', true);
    LayoutAnimation.configureNext(LinearIOSWidgetTutorialComplete);

    dispatch({
      type: 'setProperty',
      key: 'IOSWidjetTutorialComplete',
      value: true,
    });
  }

  render() {
    const { themedStyle } = this.props;
    const { isModalVisible } = this.state;

    return (
      <>
        <Modal
          visible={isModalVisible}
          onBackdropPress={this.onBackdropPress}
        >
          <Text
            style={themedStyle.modalText}
            category="p1"
          >
            {I18n.t('iosWidget.modal.text')}
          </Text>
          <View style={themedStyle.imageContainer}>
            <Image
              style={themedStyle.image}
              source={IOSWidgetImage.imageSource}
            />
          </View>
          <Button
            onPress={this.onModalButtonPress}
            appearance="ghost"
          >
            {I18n.t('iosWidget.modal.confirm')}
          </Button>
        </Modal>
        <TouchableOpacity
          style={themedStyle.container}
          activeOpacity={0.7}
          onPress={this.onButtonPress}
        >
          <Text
            category="h3"
            style={themedStyle.title}
          >
            {I18n.t('iosWidget.title')}
          </Text>
          <Text category="h3">{I18n.t('iosWidget.text')}</Text>
        </TouchableOpacity>
      </>
    );
  }
}

export default withStyles(IOSWidgetModal, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
    maxWidth: Dimensions.get('window').width - 100,
  },
  image: {
    resizeMode: 'contain',
    maxWidth: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').height * 0.3,
  },
  modalText: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'normal',
    color: theme['text-hint-color'],
  },
}));
