import {
  dark,
  light,
} from '@eva-design/eva';

// #213F51
// #3E515F
// #59656F

const nuwmDark = {
  ...dark,

  'color-primary-100': '#E3E5E1',
  'color-primary-200': '#C9CCCA',
  'color-primary-300': '#E3E5E1',
  'color-primary-400': '#E3E5E1',
  'color-primary-500': '#E3E5E1', // Selected tab
  'color-primary-600': '#7b51db',
  'color-primary-700': '#5a37b8',
  'color-primary-800': '#3e2494',
  'color-primary-900': '#29157a',

  'color-basic-100': 'white',
  'color-basic-200': '#eefafc',
  'color-basic-300': '#e8f5fa',
  'color-basic-400': '#d6e6f2',
  'color-basic-500': '#c7dbeb',
  'color-basic-600': '#a9c0db',
  'color-basic-700': '#213F51',
  'color-basic-800': '#285F78', // background 1 top bar flood card
  'color-basic-900': '#E3E6E4',
  'color-basic-1000': '#59656F',
  'color-basic-1100': '#121a2b',

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
            backgroundColor: 'color-warning-400',
            borderColor: 'white',
            state: {
              active: {
                borderColor: 'color-warning-400',
                outlineBackgroundColor: 'white',
              },
            },
          },
        },
      },
    },
  },
};
