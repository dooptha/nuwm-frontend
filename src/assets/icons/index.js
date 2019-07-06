import {
  Icon
} from './icon.component';

export const ArrowIosBackFill = (style) => {
  const source = {
    imageSource: require('./eva/arrow-ios-back.png'),
  };

  return Icon(source, style);
};
