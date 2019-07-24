import config from '../../../../config';

import {
  DiscordIcon,
  EmailIcon,
  GithubIcon,
} from '../../../assets/icons';

export default [
  {
    title: 'contactUs.discord.title',
    description: 'contactUs.discord.description',
    url: config.DISCORD_URL,
    icon: DiscordIcon,
  },
  {
    title: 'contactUs.github.title',
    description: 'contactUs.github.description',
    url: config.GITHUB_URL,
    icon: GithubIcon,
  },
  {
    title: 'contactUs.mail.title',
    description: 'contactUs.mail.description',
    url: `mailto:${config.CONTACT_EMAIL}`,
    icon: EmailIcon,
  },
];
