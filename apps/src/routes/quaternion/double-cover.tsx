import { createFileRoute } from '@tanstack/solid-router';
import { DoubleCover } from '../../topics/quaternion/sections/DoubleCover';
import { SITE_TITLE } from './route';

export const Route = createFileRoute('/quaternion/double-cover')({
  head: () => ({ meta: [{ title: `二重被覆 | ${SITE_TITLE}` }] }),
  component: DoubleCover,
});
