import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// SVG Animation 1: Rotating Geometric Motif
const RotatingMotif = () => (
    <div className="w-48 h-48 relative flex items-center justify-center">
        <svg className="absolute w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#E63B2E" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#E8E4DD" strokeWidth="2" strokeDasharray="10 5" />
            <polygon points="50,15 80,75 20,75" fill="none" stroke="#E8E4DD" strokeWidth="1" className="opacity-50" />
        </svg>
        <div className="w-4 h-4 rounded-full bg-accent animate-ping absolute" />
    </div>
);

// SVG Animation 2: Scanning Laser Line
const ScanningLaser = () => {
    return (
        <div className="w-56 h-40 border-2 border-paper/10 relative overflow-hidden flex flex-wrap gap-2 p-3 bg-dark/50">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-accent shadow-[0_0_10px_#E63B2E] animate-[scan_3s_ease-in-out_infinite_alternate]" />
            {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-paper/20" />
            ))}
            <style>{`
        @keyframes scan {
          0% { transform: translateY(-5px); }
          100% { transform: translateY(155px); }
        }
      `}</style>
        </div>
    );
};

// SVG Animation 3: Pulsing Waveform
const PulsingWaveform = () => {
    return (
        <div className="w-56 h-32 flex items-center justify-center relative">
            <svg className="w-full h-full" viewBox="0 0 200 100">
                <path
                    d="M 10 50 L 50 50 L 70 20 L 90 80 L 110 50 L 150 50 L 190 50"
                    fill="none"
                    stroke="#E63B2E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[dash_2s_linear_infinite]"
                    strokeDasharray="200"
                    strokeDashoffset="200"
                />
                <style>{`
          @keyframes dash {
            0% { stroke-dashoffset: 200; }
            50% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -200; }
          }
        `}</style>
            </svg>
        </div>
    );
};


const cardsData = [
    {
        step: "01",
        title: "Mogućnosti",
        desc: "Pratite šta se dešava ispred vaših vrata gde god da se nalazite. Mogućnost snimanja i slikanja u aplikaciji. Dajte pristup ostalim članovima porodice...",
        Visual: RotatingMotif
    },
    {
        step: "02",
        title: "Jednostavna Montaža",
        desc: "Nema bušenja, nema oštećenja. Integracija sa postojećim otvorima za špijunke za komercijalnu i kućnu namenu.",
        Visual: ScanningLaser
    },
    {
        step: "03",
        title: "24/7 aktivna",
        desc: "Aplikacija koja vas obaveštava u realnom vremenu uz mogućnost detekcije pokreta i dvosmernu komunikaciju.",
        Visual: PulsingWaveform
    }
];

export default function Protocol() {
    const containerRef = useRef(null);

    useEffect(() => {
        // Only apply complex scroll interactions on non-mobile
        if (window.matchMedia("(min-width: 768px)").matches) {
            const ctx = gsap.context(() => {
                const cards = gsap.utils.toArray('.protocol-card');

                cards.forEach((card, i) => {
                    if (i === cards.length - 1) return;

                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top",
                        endTrigger: '.protocol-end-marker',
                        end: "bottom bottom",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                        animation: gsap.to(card, {
                            scale: 0.9,
                            opacity: 0.5,
                            filter: 'blur(10px)',
                            duration: 1,
                            ease: 'none'
                        })
                    });
                });

            }, containerRef);
            return () => ctx.revert();
        }
    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-background pt-24 pb-10" id="karakteristike">
            <div className="max-w-6xl mx-auto px-6 mb-16">
                <h2 className="font-heading font-bold text-4xl uppercase tracking-tighter text-dark">
                    Naš Protokol
                </h2>
            </div>

            <div className="relative w-full flex flex-col items-center">
                {cardsData.map((data, i) => (
                    <div
                        key={i}
                        className="protocol-card w-full h-[100dvh] md:h-screen flex items-center justify-center sticky top-0 md:static p-6 md:p-16"
                    >
                        <div className="w-full max-w-5xl bg-dark text-paper rounded-[3rem] p-10 md:p-20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden relative border border-dark/50">

                            <div className="flex-1 flex flex-col opacity-90 z-10">
                                <span className="font-mono text-xl md:text-3xl text-accent mb-4 tracking-widest">{data.step}.</span>
                                <h3 className="font-heading font-bold text-5xl md:text-6xl uppercase tracking-tighter mb-6 leading-none">{data.title}</h3>
                                <p className="font-mono text-sm md:text-base text-paper/60 leading-relaxed max-w-md uppercase tracking-wider">
                                    {data.desc}
                                </p>
                            </div>

                            <div className="flex-1 flex items-center justify-center z-10">
                                <data.Visual />
                            </div>

                            <div className="absolute top-0 right-0 p-8 font-mono text-accent opacity-20 pointer-events-none text-9xl font-bold italic z-0 overflow-hidden leading-none select-none">
                                {data.step}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="protocol-end-marker w-full h-[1px]"></div>
            </div>
        </section>
    );
}
