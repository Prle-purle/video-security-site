import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dp2Schematic from '../assets/dp2-schematic.jpg';
import gsap from 'gsap';
import { ArrowLeft, Box, Camera, Globe, Power, ShieldCheck, Smartphone, Wifi, Mic, Speaker, HardDrive, MousePointer2 } from 'lucide-react';

export default function DP2Specs() {
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
            title: "Opšte Specifikacije",
            icon: <Box size={20} className="text-accent" />,
            items: [
                { label: "Dimenzije (Ekran)", value: "115.5 x 85.5 x 24.5 mm" },
                { label: "Dimenzije (Kamera)", value: "71 x 71 x 48.3 mm" },
                { label: "Težina", value: "320 g" },
                { label: "Ekran", value: "4.3-inčni Color Touch Screen" },
                { label: "Boja", value: "Srebrna" },
                { label: "Tasteri", value: "Zvono, napajanje, buđenje ekrana" }
            ]
        },
        {
            title: "Instalacija",
            icon: <HardDrive size={20} className="text-accent" />,
            items: [
                { label: "Prečnik špijunke", value: "16.5 mm do 50 mm" },
                { label: "Debljina vrata", value: "35 mm do 105 mm" },
                { label: "Zaštita", value: "IP54 (spoljna kamera)" },
                { label: "Radni uslovi", value: "-10°C do 45°C, Vlažnost < 95%" }
            ]
        },
        {
            title: "Parametri Kamere",
            icon: <Camera size={20} className="text-accent" />,
            items: [
                { label: "Senzor", value: "1/2.7\" Progressive Scan CMOS" },
                { label: "Objektiv", value: "2.0mm @ F2.0, ugao: 166° (D), 136° (H), 80° (V)" },
                { label: "Rezolucija", value: "1080p / 2MP" },
                { label: "Dan/Noć", value: "ICR infracrveni filter" },
                { label: "Noćni domet", value: "Do 5 metara" }
            ]
        },
        {
            title: "Video i Audio",
            icon: <Mic size={20} className="text-accent" />,
            items: [
                { label: "Frame Rate", value: "15 fps" },
                { label: "WDR", value: "DWDR" },
                { label: "Audio ulaz", value: "Ugrađen mikrofon visoke osetljivosti" },
                { label: "Audio izlaz", value: "Ugrađen zvučnik velike snage" },
                { label: "Melodije", value: "Do 5 melodija, podesiva jačina" }
            ]
        },
        {
            title: "Pametne Funkcije",
            icon: <ShieldCheck size={20} className="text-accent" />,
            items: [
                { label: "Detekcija", value: "Napredna PIR detekcija pokreta" },
                { label: "PIR Ugao/Daljina", value: "110° / Do 6 metara" },
                { label: "Osetljivost", value: "Podesiva" },
                { label: "Skladištenje", value: "MicroSD (do 256 GB) / CloudPlay" }
            ]
        },
        {
            title: "Mreža",
            icon: <Wifi size={20} className="text-accent" />,
            items: [
                { label: "Protokol", value: "EZVIZ Cloud sopstveni protokol" },
                { label: "Video Interfon", value: "Lokalni i daljinski" },
                { label: "Wi-Fi Standard", value: "IEEE802.11b/g/n, 2.4 GHz" },
                { label: "Sigurnost", value: "64/128-bit WEP, WPA/WPA2, WPS" }
            ]
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-background text-dark py-24 px-6 md:px-16">
            <div className="max-w-5xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent hover:gap-4 transition-all mb-12">
                    <ArrowLeft size={16} /> Nazad na početnu
                </Link>

                <div className="flex flex-col md:flex-row gap-16 items-start mb-24">
                    <div className="flex-1 spec-block">
                        <h1 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter mb-4 leading-none">
                            EZVIZ <span className="text-accent italic font-drama lg:text-8xl">DP2</span>
                        </h1>
                        <p className="font-mono text-sm text-dark/60 uppercase tracking-widest mb-12">
                            Ultra-Široki Pametni Touch Video Interfon
                        </p>

                        <div className="bg-dark/5 border border-dark/5 p-8 rounded-[2rem] overflow-hidden shadow-sm flex items-center justify-center min-h-[400px]">
                            <img
                                src={dp2Schematic}
                                alt="EZVIZ DP2 Schematic"
                                className="max-w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>

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

                    <div className="spec-block md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 bg-dark text-paper p-10 rounded-[3rem] mt-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Box size={20} className="text-accent" />
                                <h3 className="font-heading font-bold text-xl uppercase tracking-tight">U Kutiji</h3>
                            </div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 font-mono text-xs uppercase tracking-wider text-paper/60">
                                <li>- DP2 Kamera i Panel</li>
                                <li>- Nosač i Kopča</li>
                                <li>- Šrafovi × 6</li>
                                <li>- Kabl za napajanje</li>
                                <li>- Regulatorne informacije</li>
                                <li>- Kratko uputstvo</li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-paper/10 pt-8 md:pt-0 md:pl-12">
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldCheck size={20} className="text-accent" />
                                <h3 className="font-heading font-bold text-lg uppercase tracking-tight">Sertifikati</h3>
                            </div>
                            <p className="font-mono text-sm tracking-widest text-accent uppercase">UL / CE / FCC / REACH / WEEE / RoHS / UKCA</p>
                        </div>
                    </div>
                </div>

                <div className="mt-24 text-center spec-block">
                    <button className="btn-magnetic bg-accent text-white px-12 py-5 font-heading font-bold uppercase tracking-widest text-sm shadow-xl">
                        Naruči DP2
                    </button>
                </div>
            </div>
        </div>
    );
}
