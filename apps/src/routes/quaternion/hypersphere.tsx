import { createFileRoute } from '@tanstack/react-router';
import { Hypersphere } from '../../topics/quaternion/sections/Hypersphere';
import { SITE_TITLE } from './route';

export const Route = createFileRoute('/quaternion/hypersphere')({
  head: () => ({ meta: [{ title: `四次元の球 | ${SITE_TITLE}` }] }),
  component: Hypersphere,
});
