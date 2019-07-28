import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Input,
  Button,
  Text,
  withStyles,
} from 'react-native-ui-kitten';
import { AvoidKeyboard } from '../../../components/common';
import { StateContext } from '../../../utils/context';
import I18n from '../../../utils/i18n';
import { CirclePlusIcon, CircleMinusIcon } from '../../../assets/icons';

export class NewPoll extends Component {
  constructor(props) {
    super(props);

    this.inputs = {};
    this.state = {
      question: '',
      options: [
        {
          id: Math.random(),
          value: '',
        },
        {
          id: Math.random(),
          value: '',
        },
      ],
    };
    this.viewRef = React.createRef();
    this.shouldFocusLastInput = false;
  }

  onSubmitEditing(i) {
    if (this.inputs[i]) {
      this.focusTheField(i);
    } else {
      this.addOption();
      this.shouldFocusLastInput = true;
    }

    this.viewRef.current.scrollToEnd({ animated: true });
  }

  setInputRef(input, id) {
    this.inputs[id] = input;
    const { options } = this.state;

    if ((id + 1) === options.length && this.shouldFocusLastInput) {
      this.focusTheField(id);
      this.shouldFocusLastInput = false;
    }
  }

  setOption(newValue, i) {
    const { options } = this.state;
    const newOptions = [...options];
    newOptions[i] = {
      id: newOptions[i].id,
      value: newValue,
    };

    this.setState({ options: newOptions });
  }

  removeOption(index) {
    const { options } = this.state;
    const newOptions = [...options];
    newOptions.splice(index, 1);

    this.setState({ options: newOptions });
  }

  addOption() {
    if (this.canAddNewOption()) {
      const { options } = this.state;
      const newOptions = [...options];
      newOptions.push({
        id: Math.random(),
        value: '',
      });

      this.setState({ options: newOptions });
    }
  }

  focusTheField(id) {
    if (this.inputs[id]) {
      this.inputs[id].focus();
    }
  }

  canSubmitForm() {
    const { question, options } = this.state;
    return question !== '' && options.length > 1 && options.length <= 5 && !options.includes('');
  }

  canAddNewOption() {
    const { options } = this.state;
    return options.length < 5;
  }

  submitForm() {
  }

  keyboardOffset(height) {
    return Platform.select({
      ios: height,
      android: 0,
    });
  }

  renderIndicator(shouldRender) {
    return shouldRender ? <ActivityIndicator /> : null;
  }

  render() {
    const { question, options } = this.state;
    const { themedStyle } = this.props;

    return (
      <AvoidKeyboard
        style={{ flex: 1 }}
        autoDismiss={false}
        offset={() => 0}
      >
        <ScrollView
          ref={this.viewRef}
          style={themedStyle.container}
        >
          <View style={themedStyle.questionContainer}>
            <Text categoty="h6">{I18n.t('admin.poll.question.title')}</Text>
            <Input
              style={themedStyle.questionInput}
              placeholder={I18n.t('admin.poll.question.placeholder')}
              returnKeyType="next"
              value={question}
              onChangeText={(text) => this.setState({ question: text })}
              onSubmitEditing={() => this.onSubmitEditing(0)}
            />
          </View>
          <View style={themedStyle.optionsContainer}>
            <Text
              style={themedStyle.optionsTitle}
              categoty="h6"
            >
              {I18n.t('admin.poll.options.title')}
            </Text>
            {
              options.map((option, i) => (
                <View
                  key={option.id}
                  style={themedStyle.optionContainer}
                >
                  <TouchableOpacity onPress={() => this.removeOption(i)}>
                    {CircleMinusIcon('#FF3566')}
                  </TouchableOpacity>
                  <Input
                    style={themedStyle.optionInput}
                    placeholder={I18n.t('admin.poll.options.placeholder')}
                    returnKeyType="next"
                    value={option.value}
                    onChangeText={(text) => this.setOption(text, i)}
                    ref={(input) => this.setInputRef(input, i)}
                    onSubmitEditing={() => this.onSubmitEditing(i + 1)}
                  />
                </View>
              ))
            }
            {
               this.canAddNewOption() ? (
                 <TouchableOpacity
                   style={themedStyle.AddOptionContainer}
                   onPress={() => this.addOption()}
                 >
                   {CirclePlusIcon('#02DB8B')}
                   <Text style={themedStyle.AddOptionText}>{I18n.t('admin.poll.options.add')}</Text>
                 </TouchableOpacity>
               ) : null
            }
          </View>
          <View style={themedStyle.buttonContainer}>
            <Button
              status="success"
              appearance="ghost"
              disabled={!this.canSubmitForm()}
              onPress={() => this.submitForm()}
            >
              {I18n.t('admin.poll.submit')}
            </Button>
          </View>
        </ScrollView>
      </AvoidKeyboard>
    );
  }
}

NewPoll.contextType = StateContext;

export default withStyles(NewPoll, (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-3'],
    fontFamily: 'Roboto',
  },
  questionContainer: {
    backgroundColor: theme['background-basic-color-1'],
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  questionInput: {
    marginTop: 10,
  },
  optionsContainer: {
    backgroundColor: theme['background-basic-color-1'],
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 50,
  },
  optionsTitle: {
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  optionInput: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 2,
  },
  AddOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
  },
  AddOptionText: {
    marginLeft: 20,
    color: '#02DB8B',
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 200,
    paddingVertical: 5,
    backgroundColor: theme['background-basic-color-1'],
  },
}));
