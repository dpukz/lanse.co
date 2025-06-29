import {
    CarFront,
    Video,
    GaugeCircle,
    CloudDownload,
    TriangleAlert,
    Moon,
    Cog,
    UserCircle2
} from 'lucide-react';

export default function Features() {
    const featureData = [
        { icon: CarFront, title: 'Lane Centering', description: 'Keeps your car perfectly centered on the road.' },
        { icon: Video, title: 'Dashcam Recording', description: 'Continuous HD video of every drive.' },
        { icon: GaugeCircle, title: 'Adaptive Cruise', description: 'Maintains distance with dynamic speed control.' },
        { icon: CloudDownload, title: 'OTA Updates', description: 'New capabilities delivered automatically.' },
        { icon: TriangleAlert, title: 'Collision Warning', description: 'Alerts you to potential obstacles ahead.' },
        { icon: UserCircle2, title: 'Driver Monitoring', description: 'Detects drowsiness or distraction in real time.' },
        { icon: Moon, title: 'Night Vision', description: 'Enhanced low-light object detection.' },
        { icon: Cog, title: 'Edge-Optimized Hardware', description: 'Runs smoothly on Jetson Nano & Android with sub-50 ms latency.' },
    ];

    return (
        <section className="relative py-24 text-white text-center sm:py-32">
            <style>{`
        @keyframes move-sideways {
          0%, 100% {
            transform: translate(-50%, -50%) translateX(-75%);
          }
          50% {
            transform: translate(-50%, -50%) translateX(75%);
          }
        }
      `}</style>

            <div className="absolute top-1/2 left-1/2 w-[85vw] md:w-[70vw] max-w-3xl aspect-square bg-purple-600/15 rounded-full blur-3xl animate-[move-sideways_15s_ease-in-out_infinite]"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10 mx-4">
                    {featureData.map((feature, index) => {
                        return (
                            <div
                                key={index}
                                className="bg-white/5 py-5 px-4 border-r border-b border-white/10 transition-all duration-200 hover:bg-white/10"
                            >
                                <feature.icon size={28} className="mx-auto mb-4 text-purple-400" />
                                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                                <p className="text-base text-white/75">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}