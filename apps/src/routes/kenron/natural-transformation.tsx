import { createFileRoute } from '@tanstack/solid-router';
import { NaturalTransformation } from '../../topics/kenron/natural-transformation/NaturalTransformation';
import { SITE_TITLE } from './route';

export const Route = createFileRoute('/kenron/natural-transformation')({
  head: () => ({
    meta: [
      { title: `自然変換 | ${SITE_TITLE}` },
      {
        name: 'description',
        content:
          '圏論の自然変換を、ビーズの列を3Dで動かして説明するページ。「先に塗りかえても、あとで塗りかえても同じ」が自然の意味。',
      },
    ],
  }),
  component: NaturalTransformation,
});
