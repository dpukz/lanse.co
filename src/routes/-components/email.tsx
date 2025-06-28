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
import { Mail } from 'lucide-react';

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
        <section id='early-access' className="py-24 sm:py-32 relative">
            <div className="max-w-7xl mx-auto px-4 text-center z-10 relative">
                <Mail size={48} className="mx-auto text-purple-400 mb-4" />
                <h2 className="text-4xl font-bold text-white mb-4">Get Early Access</h2>
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                    Sign up now to be among the first to test our open-source ADAS engine and help shape the future of driving.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        className="flex-grow px-3 py-2 rounded-md bg-neutral-800/50 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                        disabled={status === 'loading'}
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 font-semibold rounded-md bg-purple-400 hover:bg-purple-500 disabled:bg-gray-600 transition-colors duration-300"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Submitting…' : 'Notify Me'}
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
            <div className="absolute top-1/6 left-1/10 md:left-1/3 w-4/5 md:w-1/3 h-2/3 rounded-full bg-purple-500/20 blur-3xl"></div>
        </section>
    );
}
