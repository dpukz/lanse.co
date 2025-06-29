import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/product/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <section className='py-24 sm:py-32 h-[80vh] text-white'>
            <div className='relative max-w-7xl mx-auto px-4 h-full drop-shadow-2xl'>
                <div className="absolute left-[calc(50%-8rem)] top-1/3 md:top-2/3 max-w-lg -translate-x-1/2 -translate-y-28 sm:-translate-y-36 lg:-translate-y-56 blur-xl lg:blur-3xl opacity-60">
                    <div className="absolute -left-20 md:-left-10 top-28 md:top-10 size-56 md:size-40 animate-blob rounded-full bg-purple-600 mix-blend-multiply blur-xl filter sm:size-60 lg:-left-32 lg:-top-12 lg:size-72 lg:blur-2xl"></div>
                    <div className="delay-2000 absolute left-32 top-5 md:top-0 size-56 md:size-40 animate-blob rounded-full bg-purple-700 mix-blend-multiply blur-xl filter sm:h-60 sm:w-60 lg:left-72 lg:-top-32 lg:size-72 lg:blur-2xl"></div>
                    <div className="delay-4000 absolute left-5 md:left-10 top-48 md:top-16 size-56 md:size-40 animate-blob rounded-full bg-purple-500 blur-xl filter sm:h-60 sm:w-60 lg:left-10 lg:top-48 lg:size-72 lg:blur-2xl"></div>
                </div>
                <div className='relative flex flex-col mx-auto text-center w-full justify-center h-full items-center my-auto'>
                    <h2 className='text-6xl font-bold mb-4'>
                        Lanesense v1.0
                    </h2>
                    <div className="glass mb-4 px-5 py-[10px] text-[26px] font-semibold shadow focus:outline-none focus:ring-none">
                        Coming Soon
                    </div>
                </div>
            </div>
        </section>
    );
}
