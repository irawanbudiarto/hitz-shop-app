const mainColors = {
  red500: '#C13333',
  gray800: '#E0E0E0',
  gray400: '#969696',
  gray200: '#BABABA',
  gray100: '#000000',
  gray50: '#EFEFEF',
  purple500: '#A6A4F0',
  purple100: '#252732',
  purple50: '#1B1A23',
  Razzmatazz: '#E0004D',
  white: '#FFFFFF',
  pizza: '#B98714',
  green1: '#32CD32'
} as const;

export const AppearanceColors = {
  primary: mainColors.green1,
  black: mainColors.gray100,
  white: mainColors.white,
  border: mainColors.gray200,
  border800: mainColors.gray800,
  border400: mainColors.gray400,
  border200: mainColors.gray200,
  text: {
    primary: mainColors.gray100,
    secondary: mainColors.gray800,
    menuActive: mainColors.green1,
    menuInactive: mainColors.gray400,
    subTitle: mainColors.gray100,
  },
} as const;

export const AppearanceFonts = {
  primary: {
    normal: 'Reboto_regular',
    medium: 'Roboto-Medium',
    italic: 'Roboto-Italic',
    bold: 'Roboto-Bold',
  },
} as const;

export default {
  AppearanceColors,
  AppearanceFonts,
};
