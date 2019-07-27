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
      options: ['', ''],
    };
  }

  setInputRef(input, id) {
    this.inputs[id] = input;
  }

  setOption(newValue, i) {
    const { options } = this.state;
    const newOptions = [...options];
    newOptions[i] = newValue;

    this.setState({ options: newOptions });
  }

  removeOption(index) {
    const { options } = this.state;
    const newOptions = [...options];
    newOptions.splice(index, 1);

    this.setState({ options: newOptions });
  }

  addOption() {
    const { options } = this.state;
    const newOptions = [...options];
    newOptions.push('');

    this.setState({ options: newOptions });
  }

  focusTheField(id) {
    this.inputs[id].focus();
  }

  canSubmitForm() {
    const { question, options } = this.state;
    return question !== '' && options.length > 1 && options.length <= 5 && !options.includes('');
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
        style={themedStyle.container}
        autoDismiss={false}
        offset={() => 0}
        keyboardOffset={this.keyboardOffset}
      >
        <ScrollView style={themedStyle.container}>
          <View style={themedStyle.questionContainer}>
            <Text categoty="h6">Question</Text>
            <Input
              style={themedStyle.questionInput}
              placeholder="Ask question"
              returnKeyType="next"
              value={question}
              onChangeText={(text) => this.setState({ question: text })}
              // onSubmitEditing={() => this.focusTheField('group')}
            />
          </View>
          <View style={themedStyle.optionsContainer}>
            <Text
              style={themedStyle.optionsTitle}
              categoty="h6"
            >
              Options
            </Text>
            {
              options.map((option, i) => (
                <View style={themedStyle.optionContainer}>
                  <TouchableOpacity onPress={() => this.removeOption(i)}>
                    {CircleMinusIcon('#FF3566')}
                  </TouchableOpacity>
                  <Input
                    style={themedStyle.optionInput}
                    placeholder="option"
                    returnKeyType="done"
                    value={option}
                    onChangeText={(text) => this.setOption(text, i)}
                    // ref={(input) => this.setInputRef(input, 'group')}
                  />
                </View>
              ))
            }
            {
               options.length < 5 ? (
                 <TouchableOpacity
                   style={themedStyle.AddOptionContainer}
                   onPress={() => this.addOption()}
                 >
                   {CirclePlusIcon('#02DB8B')}
                   <Text style={themedStyle.AddOptionText}>Add new option</Text>
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
              Create
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
    marginVertical: 50,
    paddingVertical: 5,
    backgroundColor: theme['background-basic-color-1'],
  },
}));
