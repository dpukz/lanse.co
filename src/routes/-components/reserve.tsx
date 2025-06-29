import { CheckCircle } from 'lucide-react';

function Reserve() {
    return (
        <section className='relative p-8 my-24 text-center'>
            <div className='container relative z-10 mx-auto'>
                <div className='bg-white/5 text-white backdrop-blur border border-white/20 rounded-2xl p-8 py-12 max-w-3xl mx-auto'>
                    <h2 className='text-4xl font-semibold mb-4 tracking-wide'>
                        Reserve your Lanse build today
                    </h2>
                    <p className='text-sm md:text-base text-white/80 mb-6'>
                        Full early access to all LanesenseAI features. First-gen
                        pre-production models ship late Sept/Oct 2025. Beta
                        testers get a direct line to the Lanse team for feature
                        updates.
                    </p>
                    <div className='my-6'>
                        <h1 className="tracking-wide text-7xl font-bold text-purple-300/80 [text-shadow:0_0_3px_rgba(255,255,255,0.5)] [filter:blur(0.2px)]">
                            $49
                        </h1>
                        <div className='text-base text-white/75'>
                            fully refundable deposit
                        </div>
                    </div>
                    <div className='flex justify-center mb-12 gap-y-4 md:gap-x-16 flex-col md:flex-row'>
                        <div className='flex flex-col gap-y-4 p-0 text-left'>
                            <span className='flex items-center'>
                                <CheckCircle className='text-purple-500 mr-2 size-5' />
                                Real-Time Lane Detection
                            </span>
                            <span className='flex items-center'>
                                <CheckCircle className='text-purple-500 mr-2 size-5' />
                                Adaptive Cruise Control
                            </span>
                            <span className='flex items-center'>
                                <CheckCircle className='text-purple-500 mr-2 size-5' />
                                Dashcam Recording
                            </span>
                        </div>
                        <div className='flex flex-col gap-y-4 p-0 text-left'>
                            <li className='flex items-center'>
                                <CheckCircle className='text-purple-500 mr-2 size-5' />
                                <span>OTA Model Updates</span>
                            </li>
                            <li className='flex items-center'>
                                <CheckCircle className='text-purple-500 mr-2 size-5' />
                                <span>Night Vision Mode</span>
                            </li>
                            <li className='flex items-center'>
                                <CheckCircle className='text-purple-500 mr-2 size-5' />
                                <span>Data Logging &amp; Analytics</span>
                            </li>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            const element = document.getElementById('early-access');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className='glass hover:cursor-pointer text-lg font-semibold inline-flex items-center justify-center rounded-sm px-4 py-3 text-white shadow-sm hover:opacity-85 transition duration-200'
                    >
                        Get Early Access
                    </button>
                </div>
            </div>
            <div
                className='pointer-events-none absolute -bottom-1/5 left-1/2 -translate-x-1/2 w-[140%] h-[140%] z-0 opacity-80'
                aria-hidden='true'
                style={{
                    background:
                        'radial-gradient(circle, rgba(124,58,237,0.35), transparent 75%)',
                    filter: 'blur(120px)',
                }}
            />
        </section>
    );
}

export default Reserve;
