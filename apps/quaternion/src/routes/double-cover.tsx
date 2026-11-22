import { createFileRoute } from '@tanstack/react-router';
import { DoubleCover } from '../sections/DoubleCover';
import { SITE_TITLE } from './__root';

export const Route = createFileRoute('/double-cover')({
  head: () => ({ meta: [{ title: `二重被覆 | ${SITE_TITLE}` }] }),
  component: DoubleCover,
});
