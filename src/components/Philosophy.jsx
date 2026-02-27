import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect for the background image
            gsap.to('.philo-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // Split text reveal effect without using an extra library (basic stagger)
            gsap.fromTo('.reveal-line',
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-40 md:py-56 bg-dark overflow-hidden flex items-center justify-center">
            {/* Parallax Background */}
            <div
                className="philo-bg absolute inset-0 w-full h-[130%] -top-[15%] opacity-15 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop")' }}
            />

            <div className="relative z-10 w-full max-w-5xl px-6 md:px-16 text-center md:text-left flex flex-col items-center md:items-start gap-12">

                <p className="reveal-line font-mono text-sm md:text-base text-paper/60 uppercase tracking-widest max-w-xl">
                    Većina komercijalnih rešenja se fokusira na: <br />
                    <span className="text-paper/90 inline-block mt-2 font-semibold">komplikovane i zastarele sisteme instalacije.</span>
                </p>

                <h2 className="reveal-line font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-paper uppercase tracking-tighter leading-tight max-w-4xl">
                    Mi se fokusiramo na: <br />
                    <span className="font-drama italic text-accent text-5xl md:text-7xl lg:text-[7rem] leading-none mt-4 inline-block">Jednostavnost i Bezbednost.</span>
                </h2>

            </div>
        </section>
    );
}
