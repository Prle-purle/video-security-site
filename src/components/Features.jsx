import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MousePointer2, Settings, ShieldAlert } from 'lucide-react';

/* --- Micro-UI Components --- */

// Shuffler: 3 cards cycling with spring bounce
const DiagnosticShuffler = () => {
    const container = useRef(null);
    const cards = [
        { title: "Inteligentna Analiza", val: "Aktivno" },
        { title: "Noćni Infracrveni Režim", val: "Uključen" },
        { title: "Detekcija Pokreta", val: "Kalibrisano" }
    ];

    const [order, setOrder] = useState([0, 1, 2]);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrder(prev => {
                const newOrder = [...prev];
                const last = newOrder.pop();
                newOrder.unshift(last);
                return newOrder;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {cards.map((card, i) => {
                const position = order.indexOf(i);
                const yOffset = position * 12;
                const scale = 1 - (position * 0.05);
                const zIndex = 10 - position;
                const opacity = 1 - (position * 0.3);

                return (
                    <div
                        key={i}
                        className="absolute w-64 bg-background border border-dark/10 p-4 rounded-xl shadow-md flex items-center justify-between"
                        style={{
                            transform: `translateY(${yOffset}px) scale(${scale})`,
                            zIndex,
                            opacity,
                            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        <div className="flex flex-col">
                            <span className="font-heading font-bold text-xs uppercase tracking-wide text-dark">{card.title}</span>
                            <span className="font-mono text-[10px] text-dark/50">{card.val}</span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${position === 0 ? 'bg-accent animate-pulse' : 'bg-dark/20'}`} />
                    </div>
                );
            })}
        </div>
    );
};

// Typewriter: Live feed text typing
const TelemetryTypewriter = () => {
    const texts = [
        "> Inicijalizacija sistema...",
        "> EZVIZ HP4 Povezan.",
        "> Baterija 4600mAh optimalna.",
        "> Prenos šifrovanih podataka.",
        "> Bezbedna veza uspostavljena."
    ];

    const [currentTextIdx, setCurrentTextIdx] = useState(0);
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let charIdx = 0;
        const currentFullText = texts[currentTextIdx];

        // reset
        setDisplayedText('');

        const typeInterval = setInterval(() => {
            if (charIdx < currentFullText.length) {
                setDisplayedText(prev => prev + currentFullText[charIdx]);
                charIdx++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setCurrentTextIdx(prev => (prev + 1) % texts.length);
                }, 2000);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [currentTextIdx]);

    return (
        <div className="w-full bg-dark text-paper font-mono text-sm p-5 rounded-xl border border-dark/20 h-48 flex flex-col justify-between shadow-inner">
            <div>
                <div className="flex items-center gap-2 mb-4 border-b border-paper/10 pb-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="uppercase text-xs tracking-widest text-paper/70">Live Feed</span>
                </div>
                <p className="min-h-[60px]">
                    {displayedText}
                    <span className="inline-block w-2 bg-accent ml-1 animate-pulse h-4 align-middle" />
                </p>
            </div>
            <div className="text-[10px] text-paper/30 flex justify-between">
                <span>V 4.3.01</span>
                <span>SYS.OK</span>
            </div>
        </div>
    );
};

// Scheduler: Cursor moving in weekly grid
const CursorProtocolScheduler = () => {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.to('.fake-cursor', { x: 50, y: 30, duration: 0.8, ease: 'power2.out' })
                .to('.day-cell-3', { backgroundColor: '#E63B2E', color: '#fff', scale: 0.95, duration: 0.1 })
                .to('.day-cell-3', { scale: 1, duration: 0.2 })
                .to('.fake-cursor', { x: 140, y: 110, duration: 0.8, ease: 'power2.inOut', delay: 0.4 })
                .to('.fake-save', { backgroundColor: '#E63B2E', color: '#fff', scale: 0.95, duration: 0.1 })
                .to('.fake-save', { scale: 1, duration: 0.2 })
                .to('.fake-cursor', { opacity: 0, duration: 0.3, delay: 0.3 })
                .to('.day-cell-3', { backgroundColor: 'transparent', color: '#111111', duration: 0.1 }, 0)
                .to('.fake-save', { backgroundColor: '#E8E4DD', color: '#111111', duration: 0.1 }, 0)
                .set('.fake-cursor', { x: -20, y: -20, opacity: 1 });

        }, container);
        return () => ctx.revert();
    }, []);

    const days = ['N', 'P', 'U', 'S', 'Č', 'P', 'S'];

    return (
        <div ref={container} className="relative w-full bg-paper p-5 rounded-xl border border-dark/10 h-48 flex flex-col items-center justify-center overflow-hidden shadow-inner">
            <div className="w-full grid grid-cols-7 gap-1 max-w-[200px] mb-6">
                {days.map((day, i) => (
                    <div key={i} className={`day-cell-${i} flex items-center justify-center font-mono text-xs p-1 rounded transition-colors duration-200`}>
                        {day}
                    </div>
                ))}
            </div>

            <div className="fake-save px-6 py-2 rounded-full border border-dark/20 text-[10px] font-heading font-bold uppercase tracking-wider bg-paper text-dark">
                24/7 Aktivno
            </div>

            <div className="fake-cursor absolute top-0 left-0 w-6 h-6 z-10 filter drop-shadow-md text-dark">
                <MousePointer2 strokeWidth={1.5} fill="#F5F3EE" />
            </div>
        </div>
    );
};


/* --- Features Main Component --- */

export default function Features() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered reveal for cards triggered on scroll
            gsap.fromTo('.feature-card',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 md:py-40 px-6 md:px-16 bg-background">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                    {/* Card 1 */}
                    <div className="feature-card flex flex-col bg-paper rounded-[2rem] p-8 md:p-10 border border-dark/5 drop-shadow-sm interactive-lift">
                        <div className="mb-8">
                            <h3 className="font-heading font-bold text-2xl uppercase tracking-tighter mb-3 leading-none">Bezbednost pre svega</h3>
                            <p className="font-mono text-sm text-dark/60 leading-relaxed">
                                Nema kompromisa. Inteligentna procena i konstantna evidencija svakog događaja na vašim vratima. Visoko enkriptovani prenos podataka.
                            </p>
                        </div>
                        <div className="mt-auto flex-1 flex items-end">
                            <DiagnosticShuffler />
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="feature-card flex flex-col bg-paper rounded-[2rem] p-8 md:p-10 border border-dark/5 drop-shadow-sm interactive-lift">
                        <div className="mb-8">
                            <h3 className="font-heading font-bold text-2xl uppercase tracking-tighter mb-3 leading-none">Najbolji na tržištu</h3>
                            <p className="font-mono text-sm text-dark/60 leading-relaxed">
                                Industrijski standard za pouzdanost i trajnost baterije. Prikaz na ekranu od 4.3 inča visoke rezolucije.
                            </p>
                        </div>
                        <div className="mt-auto flex-1 flex items-end">
                            <TelemetryTypewriter />
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="feature-card flex flex-col bg-paper rounded-[2rem] p-8 md:p-10 border border-dark/5 drop-shadow-sm interactive-lift">
                        <div className="mb-8">
                            <h3 className="font-heading font-bold text-2xl uppercase tracking-tighter mb-3 leading-none">Uvek tu za vas</h3>
                            <p className="font-mono text-sm text-dark/60 leading-relaxed">
                                Neprekidna sigurnost, jednostavna za rukovanje. Naša podrška i sam sistem je aktivan 24-7.
                            </p>
                        </div>
                        <div className="mt-auto flex-1 flex items-end">
                            <CursorProtocolScheduler />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
