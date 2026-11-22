import { createFileRoute } from '@tanstack/react-router';
import { Hypersphere } from '../sections/Hypersphere';
import { SITE_TITLE } from './__root';

export const Route = createFileRoute('/hypersphere')({
  head: () => ({ meta: [{ title: `四次元の球 | ${SITE_TITLE}` }] }),
  component: Hypersphere,
});
