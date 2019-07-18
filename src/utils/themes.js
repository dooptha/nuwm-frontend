import {
  dark,
  light,
} from '@eva-design/eva';

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
  'color-basic-700': '#213F51', // background 1
  'color-basic-800': '#E3E5E1', // background 2
  'color-basic-900': '#3E515F', // pressed list element
  'color-basic-1000': '#244555',
  'color-basic-1100': '#121a2b',

  'background-basic-color-1': '$color-basic-700', // <- 800 by default
  'background-basic-color-2': '$color-basic-800', // <- 900 by default
  'background-basic-color-3': '$color-basic-900', // <- etc
  'background-basic-color-4': '$color-basic-100',

  'border-basic-color-1': '$color-basic-700',
  'border-basic-color-2': '$color-basic-800',
  'border-basic-color-3': '$color-basic-900',
  'border-basic-color-4': '$color-basic-1000',
  'border-basic-color-5': '$color-basic-1100',

  'text-disabled-color': '$color-basic-600',
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
