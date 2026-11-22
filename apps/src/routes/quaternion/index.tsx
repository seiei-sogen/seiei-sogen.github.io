import { createFileRoute } from '@tanstack/solid-router';
import { AxisAngle } from '../../topics/quaternion/sections/AxisAngle';

export const Route = createFileRoute('/quaternion/')({
  component: AxisAngle,
});
