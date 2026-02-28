import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                toggleClass: { className: 'nav-scrolled', targets: navRef.current },
                onUpdate: (self) => {
                    setIsScrolled(self.isActive);
                }
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
            <nav
                ref={navRef}
                className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ease-out border backdrop-blur-xl ${isScrolled
                    ? 'bg-background/80 border-dark/10 text-dark shadow-sm'
                    : 'bg-transparent border-transparent text-paper'
                    } max-w-4xl w-full mx-auto`}
            >
                <Link to="/" className="font-heading font-bold text-xl tracking-tighter uppercase relative group cursor-pointer interactive-lift">
                    <span className="relative z-10">Ofanim</span>
                    {isScrolled && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>}
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-widest">
                    {['Karakteristike', 'Proizvodi', 'Kontakt'].map((item) => (
                        <a key={item} href={`/video-security-site/#${item.toLowerCase()}`} className="hover:text-accent transition-colors interactive-lift">
                            {item}
                        </a>
                    ))}
                </div>

                <a
                    href="/video-security-site/#proizvodi"
                    className={`btn-magnetic px-5 py-2 text-sm font-heading font-semibold uppercase tracking-wide border ${isScrolled
                        ? 'bg-dark text-paper border-dark hover:bg-transparent hover:text-dark'
                        : 'bg-accent text-white border-accent hover:bg-transparent hover:text-paper'
                        }`}
                >
                    Naručite
                </a>
            </nav>
        </div>
    );
}
