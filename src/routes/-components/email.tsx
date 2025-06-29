import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getDatabase,
    ref,
    push,
    serverTimestamp as rtdbTimestamp,
} from 'firebase/database';
import {
    getAuth,
    signInAnonymously,
} from 'firebase/auth';
import { CheckCircle } from 'lucide-react';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const appId = import.meta.env.VITE_APP_ID || 'default-app-id';

export default function Email() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState(''); const authenticateUser = async () => {
        if (auth.currentUser) return;
        try {
            await signInAnonymously(auth);
        } catch (error) {
            console.error('Auth failed:', error);
            setStatus('error');
            setMessage('Authentication failed. Try again later.');
        }
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setStatus('error');
            setMessage('Please enter a valid email.');
            return;
        }

        if (!auth.currentUser) {
            await authenticateUser();
            if (!auth.currentUser) return;
        }

        setStatus('loading');
        try {
            const emailRef = ref(db, `/artifacts/${appId}/public/early_access_emails`);
            await push(emailRef, {
                email,
                timestamp: rtdbTimestamp(),
            });
            setEmail('');
            setStatus('success');
            setMessage("Thanks! You're on the early access list.");
        } catch (error) {
            console.error('Submit failed:', error);
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <section id='early-access' className="p-8 py-24 sm:py-32 sm:pb-40 relative">
            <div className='container relative z-10 mx-auto text-center'>
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
                            <span className='flex items-center'>
                                <CheckCircle className='text-purple-500 mr-2 size-5' />
                                OTA Model Updates
                            </span>
                            <span className='flex items-center'>
                                <CheckCircle className='text-purple-500 mr-2 size-5' />
                                Night Vision Mode
                            </span>
                            <span className='flex items-center'>
                                <CheckCircle className='text-purple-500 mr-2 size-5' />
                                Data Logging & Analytics
                            </span>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 text-center z-10 relative">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                required
                                className="flex-grow px-3 py-2 !rounded-md after:!rounded-md bg-neutral-800/50 text-white border border-white/20 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/30 outline-none transition glass"
                                disabled={status === 'loading'}
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 font-semibold text-sm !rounded-md after:!rounded-md purple-glass opacity-80 hover:opacity-65 disabled:bg-gray-600 transition duration-300 hover:cursor-pointer text-white"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Submitting…' : 'Get Early Access'}
                            </button>
                        </form>
                        {message && (
                            <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message}
                            </p>
                        )}
                        <p className="text-xs text-white/50 mt-4">
                            We respect your privacy and will only send product updates.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className='pointer-events-none absolute -bottom-1/5 left-1/2 -translate-x-1/2 w-[140%] h-[140%] z-0 opacity-80'
                aria-hidden='true'
                style={{
                    background:
                        'radial-gradient(circle, rgba(124,58,237,0.25), transparent 75%)',
                    filter: 'blur(120px)',
                }}
            />
        </section >
    );
}
