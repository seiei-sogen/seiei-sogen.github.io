import { createFileRoute } from '@tanstack/react-router';
import { EulerCompare } from '../sections/EulerCompare';
import { SITE_TITLE } from './__root';

export const Route = createFileRoute('/euler')({
  head: () => ({ meta: [{ title: `オイラー角とくらべる | ${SITE_TITLE}` }] }),
  component: EulerCompare,
});
