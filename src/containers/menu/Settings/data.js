import {
  PaletteFancyIcon,
  MapFancyIcon,
  TimetableFancyIcon,
  MessageFancyIcon,
  TVFancyIcon,
  LockFancyIcon,
} from '../../../assets/icons';

export default [
  {
    route: 'User',
    type: 'User',
  },
  {
    type: 'Empty',
  },
  {
    title: 'settings.themes.title',
    route: 'Themes',
    icon: PaletteFancyIcon('#FF3566'),
    type: 'Default',
  },
  {
    title: 'settings.languages.title',
    route: 'Language',
    icon: MapFancyIcon('#2C5CFF'),
    type: 'Default',
  },
  {
    title: 'settings.timetable.title',
    route: 'TimetableSettings',
    icon: TimetableFancyIcon('#02DB8B'),
    type: 'Default',
  },
  {
    type: 'Empty',
  },
  {
    title: 'settings.polls.title',
    route: 'PollHistory',
    icon: TVFancyIcon('#008BFF'),
    type: 'Default',
  },
  {
    title: 'settings.questions.title',
    route: 'ContactUs',
    icon: MessageFancyIcon('#FFA002'),
    type: 'Default',
  },

  {
    title: 'settings.admin.title',
    route: 'Admin',
    icon: LockFancyIcon('#8A2BE2'),
    type: 'Admin',
  },
];
