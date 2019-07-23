import config from '../../../utils/config';

import {
  DiscordIcon,
  EmailIcon,
  GithubIcon,
} from '../../../assets/icons';

export default [
  {
    title: 'contactUs.discord.title',
    description: 'contactUs.discord.description',
    url: 'https://discord.gg/NEqGFEa',
    icon: DiscordIcon,
  },
  {
    title: 'contactUs.github.title',
    description: 'contactUs.github.description',
    url: 'https://github.com/dooptha/nuwm-frontend',
    icon: GithubIcon,
  },
  {
    title: 'contactUs.mail.title',
    description: 'contactUs.mail.description',
    url: `mailto:${config.CONTACT_EMAIL}`,
    icon: EmailIcon,
  },
];
