import { PackageCheck, Rocket, Scaling } from "lucide-react";

export default function Ease() {
    const steps = [
        {
            icon: PackageCheck,
            title: '1. Simple Installation',
            description: 'Mount the device and plug it in. Our universal kit is designed to fit any vehicle with minimal effort.'
        },
        {
            icon: Scaling,
            title: '2. Guided Calibration',
            description: 'Follow a quick, on-screen setup process. The system calibrates itself to your specific vehicle in minutes.'
        },
        {
            icon: Rocket,
            title: '3. Drive Smarter',
            description: 'Enjoy the benefits of Level 2 autonomy on your daily commute. The system is always learning and improving.'
        }
    ];

    return (
        <section className="py-24 sm:py-32 text-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Designed for Ease of Use</h2>
                <p className="text-lg text-white/70 mb-16 max-w-3xl mx-auto">
                    Go from unboxing to autonomous driving in under an hour. We've streamlined the entire process to be as simple as possible.
                </p>
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                    <div className="absolute top-12 left-0 w-full h-0.5 bg-white/10 hidden md:block"></div>
                    {steps.map((step, index) => (
                        <div key={index} className="relative text-center">
                            <div className="absolute inset-0 bg-purple-500/15 blur-lg rounded-full scale-90 opacity-40 w-1/3 h-1/2 mx-auto bottom-1/5"></div>
                            <div className="glass relative inline-flex bg-neutral-900 bg-opacity-80 backdrop-blur-sm border border-white/10 !rounded-full after:!rounded-full p-4 mb-4">
                                <div className="bg-purple-500/0 text-purple-300/30 rounded-full p-3">
                                    <step.icon size={32} className=" text-purple-400/80" />
                                </div>
                            </div>
                            <h3 className="relative font-semibold text-xl mb-2">{step.title}</h3>
                            <p className="relative text-white/60 max-w-xs mx-auto">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}