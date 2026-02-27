import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hp2Img from '../assets/hp4-gold.png';
import hp2Schematic from '../assets/hp2-schematic.png';
import gsap from 'gsap';
import { ArrowLeft, Box, Camera, Globe, Power, ShieldCheck, Smartphone, Wifi } from 'lucide-react';

export default function HP2Specs() {
    const containerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.fromTo('.spec-block',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const specGroups = [
        {
            title: "Instalacioni Parametri",
            icon: <Box size={20} className="text-accent" />,
            items: [
                { label: "Prečnik otvora", value: "14 do 26 mm" },
                { label: "Debljina vrata", value: "35 do 105 mm" }
            ]
        },
        {
            title: "Parametri Kamere",
            icon: <Camera size={20} className="text-accent" />,
            items: [
                { label: "Senzor", value: "1/3\" Progressive Scan CMOS" },
                { label: "Objektiv", value: "2.0 mm @ F1.6, ugao (dijagonalno): 146°" },
                { label: "Rezolucija", value: "1080p / 2MP" },
                { label: "Frame Rate", value: "15fps" }
            ]
        },
        {
            title: "Mreža i Funkcije",
            icon: <Globe size={20} className="text-accent" />,
            items: [
                { label: "Protokol", value: "EZVIZ Cloud sopstveni protokol" },
                { label: "Video pregled", value: "Lokalni i daljinski pregled" },
                { label: "Glavne funkcije", value: "Cloud enkripcija videa i slike" }
            ]
        },
        {
            title: "Bežična Veza",
            icon: <Wifi size={20} className="text-accent" />,
            items: [
                { label: "Wi-Fi Standard", value: "IEEE802.11b, 802.11g, 802.11n" },
                { label: "Frekvencijski opseg", value: "2.4 GHz ~ 2.4835 GHz" },
                { label: "Sigurnost", value: "64/128-bit WEP, WPA/WPA2, WPA-PSK/WPA2-PSK" }
            ]
        },
        {
            title: "Opšte Specifikacije",
            icon: <Smartphone size={20} className="text-accent" />,
            items: [
                { label: "Ekran", value: "4.3-inčni ekran u boji" },
                { label: "Radna temperatura", value: "-10°C do 45°C" },
                { label: "Napajanje", value: "DC 5V (±10%)" },
                { label: "Potrošnja", value: "Max. 2W" },
                { label: "Težina", value: "190g" }
            ]
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-background text-dark py-24 px-6 md:px-16">
            <div className="max-w-5xl mx-auto">
                {/* Navigation Back */}
                <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent hover:gap-4 transition-all mb-12">
                    <ArrowLeft size={16} /> Nazad na početnu
                </Link>

                <div className="flex flex-col md:flex-row gap-16 items-start mb-24">
                    <div className="flex-1 spec-block">
                        <h1 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter mb-4 leading-none">
                            EZVIZ <span className="text-accent italic font-drama lg:text-8xl">HP2</span>
                        </h1>
                        <p className="font-mono text-sm text-dark/60 uppercase tracking-widest mb-12">
                            Detaljne Tehničke Specifikacije
                        </p>

                        {/* Schematic Image */}
                        <div className="bg-paper border border-dark/5 p-8 rounded-[2rem] overflow-hidden shadow-sm flex items-center justify-center min-h-[400px]">
                            <img
                                src={hp2Schematic}
                                alt="EZVIZ HP2 Schematic"
                                className="max-w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Spec Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {specGroups.map((group, gIdx) => (
                        <div key={gIdx} className="spec-block bg-paper/50 border-l border-accent p-8 rounded-r-2xl h-full">
                            <div className="flex items-center gap-3 mb-6">
                                {group.icon}
                                <h3 className="font-heading font-bold text-xl uppercase tracking-tight">{group.title}</h3>
                            </div>
                            <div className="space-y-4">
                                {group.items.map((item, iIdx) => (
                                    <div key={iIdx} className="flex flex-col border-b border-dark/5 pb-2">
                                        <span className="font-mono text-[10px] uppercase text-dark/40 tracking-widest">{item.label}</span>
                                        <span className="font-heading font-medium text-sm text-dark/80">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* In the box & Certificates */}
                    <div className="spec-block md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 bg-dark text-paper p-10 rounded-[3rem] mt-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Box size={20} className="text-accent" />
                                <h3 className="font-heading font-bold text-xl uppercase tracking-tight">U Kutiji</h3>
                            </div>
                            <ul className="grid grid-cols-2 gap-y-2 font-mono text-xs uppercase tracking-wider text-paper/60">
                                <li>- Kamera</li>
                                <li>- Displej</li>
                                <li>- Nosač</li>
                                <li>- Kabl</li>
                                <li>- Šrafovi x8</li>
                                <li>- Uputstvo</li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-paper/10 pt-8 md:pt-0 md:pl-12">
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldCheck size={20} className="text-accent" />
                                <h3 className="font-heading font-bold text-lg uppercase tracking-tight">Sertifikati</h3>
                            </div>
                            <p className="font-mono text-sm tracking-widest text-accent">CE / WEEE / ROHS / REACH</p>
                        </div>
                    </div>
                </div>

                <div className="mt-24 text-center spec-block">
                    <button className="btn-magnetic bg-accent text-white px-12 py-5 font-heading font-bold uppercase tracking-widest text-sm shadow-xl">
                        Naruči HP2
                    </button>
                </div>
            </div>
        </div>
    );
}
