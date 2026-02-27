import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-text',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.15, delay: 0.2 }
            );
            gsap.fromTo('.hero-cta',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] flex items-end pb-24 md:pb-32 px-6 md:px-16 overflow-hidden bg-dark">
            {/* Background Image - Concrete/Brutalist architecture */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transform scale-105"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop")',
                }}
            />

            {/* Heavy Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark via-dark/80 to-transparent pointer-events-none" />

            {/* Content strictly bottom-left */}
            <div className="relative z-20 w-full max-w-4xl text-paper pt-32">
                <div className="flex flex-col items-start gap-1 mb-8">
                    <h1 className="hero-text font-heading font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-none">
                        Osigurajte Svoj
                    </h1>
                    <h2 className="hero-text font-drama italic text-6xl md:text-8xl lg:text-[10rem] text-accent leading-none ml-2 md:ml-4">
                        Prostor.
                    </h2>
                </div>

                <p className="hero-text font-mono text-paper/70 text-sm md:text-base max-w-lg mb-12 uppercase tracking-widest border-l-2 border-accent pl-4">
                    Pametne digitalne video špijunke za beskompromisnu kontrolu ulaza. Sistem za komercijalnu i kućnu bezbednost.
                </p>

                <div className="hero-cta flex gap-4">
                    <a href="#proizvodi" className="btn-magnetic bg-accent text-white px-8 py-4 font-heading font-bold uppercase tracking-wider text-sm md:text-base flex items-center justify-center">
                        Istražite HP2 i HP4
                    </a>
                    <a href="#karakteristike" className="btn-magnetic border border-paper/30 backdrop-blur-sm text-paper px-8 py-4 font-heading font-bold uppercase tracking-wider text-sm md:text-base hover:bg-paper/10 flex items-center justify-center">
                        Saznajte Više
                    </a>
                </div>
            </div>
        </section>
    );
}
