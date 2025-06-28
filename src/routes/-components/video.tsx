import { PlayCircle } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Video() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    return (
        <section className='relative text-center text-white py-12 sm:py-24'>
            <style>{`
        @keyframes pulse {
          0%, 100% { 
            transform: translate(-50%, -40%) scale(1); 
            opacity: 0.3; 
          }
          50% { 
            transform: translate(-50%, -40%) scale(1.1); 
            opacity: 0.5; 
          }
        }
      `}</style>
            <div className='absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(124,58,237,0.3),transparent_70%)] blur-[120px] pointer-events-none -z-10 animate-[pulse_6s_ease-in-out_infinite]'></div>

            <div className='relative container mx-auto w-[85vw] md:px-4'>
                <h2 className='text-4xl font-bold mb-3'>
                    ADAS Powered by LanesenseAI
                </h2>
                <p className='max-w-3xl text-sm leading-5 mx-auto mb-6 md:text-lg text-white/80'>
                    LanesenseAI is our open-source ADAS engine, integrating
                    YOLOP’s real-time perception, HybridNet path planning, MiDaS
                    depth estimation, and sensor pre-processing pipelines to
                    deliver Level-2 autonomy on almost any car.
                </p>
                <div className='relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl shadow-purple-900/20'>
                    <video
                        ref={videoRef}
                        id='assistant-video'
                        src='/lansevid.mp4'
                        preload='metadata'
                        controls={false}
                        className='w-full h-auto cursor-pointer'
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onClick={handlePlayPause}
                    >
                        <source src='/lansevid.mp4' type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>
                    {!isPlaying && (
                        <div
                            className='absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-black/10 transition-colors'
                            onClick={handlePlayPause}
                        >
                            <PlayCircle className='w-16 h-16 text-white/80 hover:text-white transition-colors' />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
