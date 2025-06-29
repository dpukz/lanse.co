import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/')({
  component: RouteComponent,
})

function RouteComponent() {
  const blogPosts = [
    {
      title: "Introducing LanesenseAI v1.0",
      summary: "Our first open-source ADAS release is here—meet the features and roadmap.",
      date: "June 27, 2024",
      author: "Jeremy Liu"
    },
    {
      title: "Behind the Scenes of Lanesense.ai UI",
      summary: "An inside look at the design and development of our interactive interface.",
      date: "June 20, 2024",
      author: "Jeremy Liu"
    }
  ];

  return (
    <div className="text-white pt-6 md:pt-32">
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-purple-900/10 blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">News, updates, and insights from the Lanesense team.</p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto text-left">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-black/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-900/50 transition-all duration-300 hover:border-purple-400/50 hover:shadow-purple-700/40 flex flex-col hover:scale-105">
                <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
                <p className="text-white/70 mb-4 flex-grow">{post.summary}</p>
                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                  <p className="text-sm text-white/50">{post.date} by {post.author}</p>
                  <a href="#" className="font-semibold text-purple-400 hover:text-purple-300">Read more &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
