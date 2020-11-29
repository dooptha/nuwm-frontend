import {
  dark,
  light,
} from '@eva-design/eva';

// #213F51
// #3E515F
// #59656F

const nuwmDark = {
  ...dark,

  'color-primary-500': '#5499b7',
  'color-primary-600': '#00779D',

  'color-basic-100': '#e3f2f5',
  'color-basic-200': '#eefafc',
  'color-basic-300': '#e8f5fa',
  'color-basic-400': '#d6e6f2',
  'color-basic-500': '#c7dbeb',
  'color-basic-600': '#a9c0db',
  'color-basic-700': '#1B4E74', // main background
  'color-basic-800': '#133B61',
  'color-basic-900': '#16405d',
  'color-basic-1000': '#071D40',
  'color-basic-1100': '#121a2b',

  'text-basic-color': '$color-basic-100',

  'background-basic-color-1': '$color-basic-700',
  'background-basic-color-2': '#184567',
  'background-basic-color-3': '$color-basic-900',
  'background-basic-color-4': '$color-basic-100',

  // icons in conversations
  'text-disabled-color': '$color-basic-800',
  'background-primary-color-1': '$color-primary-500',

  // ==== buttons, tabs
  // background
  'color-primary-default': '$color-primary-500',
  // selected background
  'color-primary-active': '$color-primary-600',
  // selected text
  'text-primary-color': '$color-primary-500',

  'border-basic-color-1': '$color-basic-700',
  'border-basic-color-2': '$color-basic-800',
  'border-basic-color-3': '$color-basic-900',
  'border-basic-color-4': '$color-basic-1000',
  'border-basic-color-5': '$color-basic-800',
};

export const themes = {
  'Eva Light': light,
  'Eva Dark': dark,
  'NUWM Dark': nuwmDark,
};

export const customMapping = {
  components: {
    Radio: {
      meta: {},
      appearances: {
        default: {
          mapping: {
            borderWidth: 2,
            // backgroundColor: 'color-warning-400',
            // borderColor: 'white',
            // state: {
            //   active: {
            //     borderColor: 'color-warning-400',
            //     outlineBackgroundColor: 'white',
            //   },
            // },
          },
        },
      },
    },
  },
};

// Parse color as #111111 from kitten theme object
export const getColorFromTheme = (color, theme) => {
  const str = theme[color];
  return str.charAt(0) === '$' ? theme[str.slice(1)] : str;
};
