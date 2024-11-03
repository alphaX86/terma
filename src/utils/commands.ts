import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => 'Available commands: \n' + Object.keys(commands).join(', \n'),
  hostname: () => hostname,
  whoami: () => 'guest',
  whois: () => `Hey there! Glad you're here. 
  I'm Aadhitya!👋
  I’m a software engineer living in India. Currently, I’m working as SDE 1 at Citi.
  My interest in computers started back in Grade 1 when I decided to tinker few things both in hardware and software.
  Graudally, I started to learn more about computers and programming which piqued interest.
  
  Want to know more about me? Try 'github', 'linkedin', 'twitter', 'email', 'donate', 'repo'`,
  date: () => new Date().toLocaleString(),
  vi: () => `why use vi? try 'emacs'`,
  vim: () => `why use vim? try 'emacs'`,
  emacs: () => `why use emacs? try 'vim'`,
  cat: () => `why use cat? try 'less'`,
  less: () => `why use less? try 'more'`,
  beep: () => `beep! beep!`,
  bump: () => `(≧∇≦)ﾉ`,
  pwd: () => '/',
  ls: () => 'bin  etc  home  lib  usr  var',
  cd: () => `^_____^ you can't do it here`,
  mkdir: () => `（＞人＜；）not possible. Sorry!`,
  touch: () => `Umm... I'm just a static website, I don't have a file system.`,
  rm: () => `(。_。) you serious?`,
  echo: (args: string[]) => args.join(' '),
  sudo: (args: string[]) => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    return `Permission denied: You're not admin! (╬▔皿▔)╯`;
  },
  github: () => {
    window.open(packageJson.author.github, '_blank');

    return 'Opening GitHub...';
  },
  linkedin: () => {
    window.open(packageJson.author.linkedin, '_blank');

    return 'Opening LinkedIn...';
  },
  twitter: () => {
    window.open(packageJson.author.twitter, '_blank');

    return 'Opening Twitter...';
  },
  gui: () => {
    window.open(packageJson.author.url, '_blank');

    return 'Opening GUI...';
  },
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case 'ls': {
        let result = themes.map((t) => t.name.toLowerCase()).join(', ');
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

        return result;
      }

      case 'set': {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },
  clear: () => {
    history.set([]);

    return '';
  },
  email: () => {
    window.open(`mailto:${packageJson.author.email}`);

    return `Opening email client...`;
  },
  repo: () => 
    `Not yet implemented (┬┬﹏┬┬). But you can check my repos here: ${packageJson.author.github}`,
  donate: () => {
    window.open(packageJson.funding.url, '_blank');

    return 'Opening donation url...';
  },
  weather: async (args: string[]) => {
    const city = args.join('+');

    if (!city) {
      return 'Usage: weather [city]. Example: weather Brussels';
    }

    const weather = await fetch(`https://wttr.in/${city}?ATm`);

    return weather.text();
  },
  exit: () => {
    return 'Please close the tab to exit.';
  },
  curl: async (args: string[]) => {
    if (args.length === 0) {
      return 'curl: no URL provided';
    }

    const url = args[0];

    try {
      const response = await fetch(url);
      const data = await response.text();

      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}. Details: ${error}`;
    }
  },
  banner: () => `

  █████╗ ██╗  ██╗██████╗  ██████╗ 
  ██╔══██╗╚██╗██╔╝██╔══██╗██╔═══██╗
  ███████║ ╚███╔╝ ██████╔╝██║   ██║
  ██╔══██║ ██╔██╗ ██╔══██╗██║   ██║
  ██║  ██║██╔╝ ██╗██║  ██║╚██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ 
                                   
   v${packageJson.version}

Type 'help' to see list of available commands.
`,
};
