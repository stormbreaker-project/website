import type { APIRoute } from 'astro';
import { SITE, SOCIAL } from '../../../config/site';

export const prerender = true;

const SCHEMA_VERSION = 1;

const absolute = (path: string): string => new URL(path, SITE.url).href;

type Item = {
  id: string;
  label: string;
  description: string | null;
  url: string | null;
  external: boolean;
  soon?: boolean;
};

type Section = { id: string; title: string; items: Item[] };

const link = (
  id: string,
  label: string,
  description: string | null,
  url: string | null,
  external: boolean,
  soon = false,
): Item => ({ id, label, description, url, external, soon });

const SECTIONS: Section[] = [
  {
    id: 'community',
    title: 'Community',
    items: [
      link('telegram', 'Telegram', 'Release updates and support', SOCIAL.telegram, true),
      link('discord', 'Discord', 'Chat with maintainers and testers', SOCIAL.discord, true),
      link('twitter', 'Twitter / X', 'Announcements', SOCIAL.twitter, true),
      link('email', 'Email the team', SOCIAL.email, `mailto:${SOCIAL.email}`, true),
    ],
  },
  {
    id: 'contribute',
    title: 'Contribute',
    items: [
      link('projects', 'Where to contribute', 'Areas that need help right now', absolute('/contribute/projects/'), false),
      link('guide', 'Contributing guide', 'How to send your first patch', absolute('/contribute/guide/'), false),
      link('donate', 'Donate', 'Fund build servers and devices', absolute('/contribute/donate/'), false),
      link('sponsors', 'Sponsors', 'Who keeps the lights on', absolute('/contribute/sponsors/'), false),
      link('careers', 'Join the team', 'Become a maintainer', absolute('/careers/'), false),
    ],
  },
  {
    id: 'project',
    title: 'Project',
    items: [
      link('about', 'About Team StormBreaker', null, absolute('/about/'), false),
      link('maintainers', 'Maintainers', 'Who builds for which device', absolute('/about/maintainers/'), false),
      link('charter', 'Maintenance charter', 'What "supported" means', absolute('/devices/charter/'), false),
      link('github', 'Source on GitHub', 'Every kernel tree and tool', SOCIAL.github, true),
      link('issues', 'Report a bug', 'Issue tracker', SOCIAL.issues, true),
      link('docs', 'Documentation', null, null, false, true),
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    items: [
      link('coc', 'Code of Conduct', null, absolute('/about/coc/'), false),
      link('privacy', 'Privacy', null, absolute('/privacy/'), false),
      link('terms', 'Terms', null, absolute('/terms/'), false),
    ],
  },
];

export const GET: APIRoute = async () =>
  new Response(JSON.stringify({ schema: SCHEMA_VERSION, sections: SECTIONS }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
