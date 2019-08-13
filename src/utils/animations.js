import {
  LayoutAnimation,
  UIManager,
} from 'react-native';

export const DropdownSpring = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.8,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.8,
  },
};

export const androidUseLayoutAnimations = () => (
  UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true)
);
