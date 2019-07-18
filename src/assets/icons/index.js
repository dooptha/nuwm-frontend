/* eslint-disable */
import {
  Icon,
  FancyIcon,
} from './icon.component';

export const Flip2OutlineIcon = (style) => {
  const source = {
    imageSource: require('./eva/flip-2-outline.png'),
  };

  return Icon(source, style);
};

export const LoaderOutlineIcon = (style) => {
  const source = {
    imageSource: require('./eva/loader-outline.png'),
  };

  return Icon(source, style);
};

export const ArrowIosBackFill = (style) => {
  const source = {
    imageSource: require('./eva/arrow-ios-back.png'),
  };

  return Icon(source, style);
};

export const ArrowForwardOutline = (style) => {
  const source = {
    imageSource: require('./eva/arrow-forward-outline.png'),
  };

  return Icon(source, style);
};

export const GridIconOutline = (style) => {
  const source = {
    imageSource: require('./eva/grid-outline.png'),
  };

  return Icon(source, style);
};

export const LayoutIconOutline = (style) => {
  const source = {
    imageSource: require('./eva/layout-outline.png'),
  };

  return Icon(source, style);
};

export const MessageCircleIcon = (style) => {
  const source = {
    imageSource: require('./eva/message-circle.png'),
  };

  return Icon(source, style);
};

export const PaperPlaneIconFill = (style) => {
  const source = {
    imageSource: require('./eva/paper-plane.png'),
  };

  return Icon(source, style);
};

export const CheckmarkOutlineIcon = (style) => {
  const source = {
    imageSource: require('./eva/checkmark-outline.png'),
  };

  return Icon(source, style);
};

export const PeopleIcon = (style) => {
  const source = {
    imageSource: require('./eva/people.png'),
  };

  return Icon(source, style);
};

export const PaletteFancyIcon = (color) => {
  const source = {
    imageSource: require('./eva/color-palette-outline.png'),
  };

  return FancyIcon(source, color);
}
