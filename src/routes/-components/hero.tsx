import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Hero3D() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        function createCirclePath(radius: number, axis: 'x' | 'y' | 'z') {
            // @ts-ignore
            const curve = new THREE.Curve();
            curve.getPoint = (t: number) => {
                const angle = t * 2 * Math.PI;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                switch (axis) {
                    case 'x': return new THREE.Vector3(0, x, y);
                    case 'y': return new THREE.Vector3(x, 0, y);
                    case 'z': return new THREE.Vector3(x, y, 0);
                }
            };
            return curve;
        }

        const globeGroup = new THREE.Group();
        const radius = 0.75;
        const tubeRadius = 0.01;
        const radialSegments = 64;
        const tubularSegments = 128;
        const color = 0x5f249f;

        const material = new THREE.MeshStandardMaterial({
            color,
            emissive: color,
            emissiveIntensity: 0.4,
            roughness: 0.4,
            metalness: 0.2,
        });

        const latLines = 8;
        const lonLines = 12;

        for (let i = 1; i < latLines; i++) {
            const phi = (i / latLines) * Math.PI - Math.PI / 2;
            const r = Math.cos(phi) * radius;
            const y = Math.sin(phi) * radius;

            const path = createCirclePath(r, 'y');
            const tube = new THREE.Mesh(
                new THREE.TubeGeometry(path, tubularSegments, tubeRadius, radialSegments, true),
                material
            );
            tube.position.y = y;
            globeGroup.add(tube);
        }

        for (let i = 0; i < lonLines; i++) {
            const angle = (i / lonLines) * 2 * Math.PI;
            const path = createCirclePath(radius, 'z');
            const ring = new THREE.Mesh(
                new THREE.TubeGeometry(path, tubularSegments, tubeRadius, radialSegments, true),
                material
            );
            ring.rotation.y = angle;
            globeGroup.add(ring);
        }

        const globeScale = window.innerWidth < 768 ? 1.1 : 1.2;
        // const globeScale = 0.9;
        globeGroup.scale.set(globeScale, globeScale, globeScale);
        scene.add(globeGroup);

        const light = new THREE.SpotLight(0xffffff, 30);
        light.position.set(camera.position.x, camera.position.y, camera.position.z);
        light.target = globeGroup;
        light.angle = Math.PI / 4;
        scene.add(light);

        scene.add(new THREE.AmbientLight(0x222222));

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            globeGroup.rotation.y += 0.003;
            globeGroup.rotation.x += 0.001;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-0"
        />
    );
}


export default function Hero() {

    return (
        <div
            className="relative w-full h-screen text-white"
        >
            <div
                className='md:hidden pointer-events-none absolute -bottom-1/5 left-1/2 -translate-x-1/2 w-[140%] h-[140%] z-0 opacity-80'
                aria-hidden='true'
                style={{
                    background:
                        'radial-gradient(circle, rgba(124,58,200,0.35), transparent 75%)',
                    filter: 'blur(120px)',
                }}
            />
            <div className="absolute left-[calc(50%-8rem)] top-1/2 max-w-lg -translate-x-1/2 -translate-y-28 sm:-translate-y-36 lg:-translate-y-56 blur-xl lg:blur-3xl opacity-70">
                <div className="absolute -left-20 md:-left-10 top-28 md:top-10 size-44 md:size-40 animate-blob rounded-full bg-purple-600 mix-blend-multiply blur-xl filter sm:h-60 sm:w-60 lg:-left-32 lg:-top-12 lg:h-96 lg:w-96 lg:blur-2xl"></div>
                <div className="delay-2000 absolute left-32 -top-5 md:top-0 size-44 md:size-40 animate-blob rounded-full bg-purple-700 mix-blend-multiply blur-xl filter sm:h-60 sm:w-60 lg:left-72 lg:-top-32 lg:h-96 lg:w-96 lg:blur-2xl"></div>
                <div className="delay-4000 absolute left-5 md:left-10 top-48 md:top-16 size-44 md:size-40 animate-blob rounded-full bg-purple-500 blur-xl filter sm:h-60 sm:w-60 lg:left-10 lg:top-48 lg:h-96 lg:w-96 lg:blur-2xl"></div>
            </div>
            <Hero3D />
            <div className="relative z-0 flex flex-col items-center justify-center h-full text-center px-4 -mt-[5vh]">
                <div className="glass mb-4 px-4 py-2 text-md font-medium shadow focus:outline-none focus:ring-none">
                    Try Lanse AI Co-Pilot
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold">An AI Co-Pilot for Every Car</h1>
                <p className="mt-4 text-md text-purple-200 max-w-xl">
                    Advanced driver assistance that integrates with the car you already own.
                </p>
            </div>
        </div>
    );
}
