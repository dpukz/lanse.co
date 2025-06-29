import { createFileRoute } from '@tanstack/react-router'
import { GaugeCircle, Layers, Server, UserSquare } from 'lucide-react';

export const Route = createFileRoute('/about/')({
    component: RouteComponent,
})

function RouteComponent() {
    const teamMembers = [
        {
            name: 'Jeremy Liu',
            role: 'Founder & CEO',
            icon: UserSquare,
            description: 'Set and execute company vision, oversee product development/operations, build the Lanse team, and lead R&D software/hardware efforts',
        },
        {
            name: 'Sanatan M.',
            role: 'Software Engineer',
            icon: Server,
            description: 'Architects the Lanse pathfinding, post-processing, and general backend systems.',
        },
        {
            name: 'Lior P.',
            role: 'Software Engineer',
            icon: Layers,
            description: 'Develops control-theory based adaptive cruise control and manages the web platform.',
        },
        {
            name: 'Bryson C.',
            role: 'Software Engineer',
            icon: GaugeCircle,
            description: 'Focuses on performance optimization and feature engineering.',
        },
    ];

    return (
        <div className="text-white pt-6 md:pt-32">
            <section className="py-20 text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-4">Meet the Team</h1>
                    <p className="text-lg text-white/70 max-w-3xl mx-auto">The minds behind the mission to democratize autonomous driving technology.</p>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-md p-8 rounded-lg border border-white/10 transition-all duration-300 hover:border-purple-400 hover:bg-white/10 hover:scale-105">
                                <div className="absolute w-full h-full max-w-md bg-purple-800/20 rounded-full blur-3xl"></div>

                                <div className="mx-auto mb-4 inline-flex items-center justify-center p-4 bg-purple-500/10 rounded-full">
                                    <member.icon size={32} className="text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold">{member.name}</h3>
                                <p className="text-purple-400 font-semibold mb-2">{member.role}</p>
                                <p className="text-white/60">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative backdrop-blur-lg">
                <div className="absolute inset-0 left-1/4 rounded-full top-1/10 w-[50%] h-[80%] bg-purple-900/15 blur-3xl -z-10"></div>
                <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
                    <p className="text-xl text-white/80 leading-relaxed">
                        At Lanse, our mission is to democratize autonomy by engineering an advanced driver assistance system that integrates seamlessly with modern vehicles. Our software combines real-time perception, depth estimation, and predictive path planning into a unified system that enhances convenience and ease of use, particularly on highways and daily commutes. Designed for efficient deployment across a wide range of today’s cars, Lanse transforms everyday driving by delivering practical Level-2 autonomy as a seamless upgrade. We aim to make intelligent driving technology not just accessible, but an intuitive and dependable part of every journey.
                    </p>
                </div>
            </section>
        </div>
    );
}

