import { createFileRoute } from '@tanstack/react-router';
import Hero from './-components/hero';
import Reserve from './-components/reserve';
import Features from './-components/features';
import Video from './-components/video';
import Ease from './-components/ease';
import Email from './-components/email';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <main>
      <Hero />
      <Reserve />
      <Features />
      <Video />
      <Ease />
      <Email />
    </main>
  );
}
