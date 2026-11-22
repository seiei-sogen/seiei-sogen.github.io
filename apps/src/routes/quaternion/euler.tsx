import { createFileRoute } from '@tanstack/solid-router';
import { EulerCompare } from '../../topics/quaternion/sections/EulerCompare';
import { SITE_TITLE } from './route';

export const Route = createFileRoute('/quaternion/euler')({
  head: () => ({ meta: [{ title: `オイラー角とくらべる | ${SITE_TITLE}` }] }),
  component: EulerCompare,
});
