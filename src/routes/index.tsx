import { createFileRoute } from '@tanstack/react-router';
import Hero from './-components/hero';
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
      <Ease />
      <Features />
      <Video />
      <Email />
    </main>
  );
}
