import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
    const sectionRef = useRef(null);
    const [status, setStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS, ERROR
    const [error, setError] = useState(null);

    // Form ID from Formspree.io
    const FORMSPREE_ID = "meeldkbj";

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.form-element',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SUBMITTING');
        setError(null);

        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('SUCCESS');
                form.reset();
            } else {
                const result = await response.json();
                setError(result.error || 'Nešto nije u redu. Molimo pokušajte ponovo.');
                setStatus('ERROR');
            }
        } catch (err) {
            setError('Greška u konekciji. Proverite internet vezu.');
            setStatus('ERROR');
        }
    };

    return (
        <section ref={sectionRef} className="py-32 px-6 md:px-16 bg-background border-t border-dark/10" id="kontakt">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16 form-element">
                    <h2 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter mb-4">Kontakt</h2>
                    <p className="font-mono text-dark/60 text-sm md:text-base uppercase tracking-widest">
                        Pošaljite nam upit i naš tim će Vas kontaktirati u najkraćem roku.
                    </p>
                </div>

                {status === 'SUCCESS' ? (
                    <div className="bg-accent/10 border border-accent rounded-2xl p-8 text-center form-element">
                        <h3 className="font-heading font-bold text-2xl uppercase mb-4 text-accent">Hvala Vam!</h3>
                        <p className="text-dark/80 mb-6">Vaša poruka je uspešno poslata. Kontaktiraćemo Vas uskoro.</p>
                        <button
                            onClick={() => setStatus('IDLE')}
                            className="text-xs font-mono uppercase tracking-widest underline hover:text-accent transition-colors"
                        >
                            Pošalji novu poruku
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2 form-element">
                            <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-dark/50">Ime i prezime *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="bg-paper border border-dark/10 rounded-xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors"
                                placeholder="Vaše puno ime"
                            />
                        </div>

                        <div className="flex flex-col gap-2 form-element">
                            <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-dark/50">Email adresa *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="bg-paper border border-dark/10 rounded-xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors"
                                placeholder="primer@email.com"
                            />
                        </div>

                        <div className="flex flex-col gap-2 form-element md:col-span-2">
                            <label htmlFor="phone" className="font-mono text-xs uppercase tracking-widest text-dark/50">Broj telefona (opciono)</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="bg-paper border border-dark/10 rounded-xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors"
                                placeholder="+381 60 000 000"
                            />
                        </div>

                        <div className="flex flex-col gap-2 form-element md:col-span-2">
                            <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-dark/50">Poruka *</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="5"
                                className="bg-paper border border-dark/10 rounded-xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors resize-none"
                                placeholder="Kako vam možemo pomoći?"
                            ></textarea>
                        </div>

                        {status === 'ERROR' && (
                            <div className="md:col-span-2 text-red-500 text-sm font-mono text-center">
                                {error}
                            </div>
                        )}

                        <div className="form-element md:col-span-2 flex justify-center mt-4">
                            <button
                                type="submit"
                                disabled={status === 'SUBMITTING'}
                                className="btn-magnetic bg-accent text-white px-12 py-5 font-heading font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'SUBMITTING' ? 'Slanje...' : 'Pošalji Poruku'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
