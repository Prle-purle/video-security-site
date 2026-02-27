import { Link } from 'react-router-dom';
import hp2Img from '../assets/hp4-gold.png';
import hp4Img from '../assets/hp4-black.png';

export default function Products() {
    return (
        <section className="py-32 px-6 md:px-16 bg-paper border-t border-dark/10" id="proizvodi">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter mb-4">Hardver</h2>
                    <p className="font-mono text-dark/60 text-sm md:text-base max-w-xl mx-auto uppercase tracking-widest">
                        Izaberite opciju koja najbolje odgovara vašoj infrastrukturi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                    {/* Card 1: HP2 */}
                    <div className="bg-background rounded-[2rem] p-8 md:p-12 border border-dark/10 flex flex-col relative interactive-lift group">
                        <div className="absolute top-8 right-8 text-xs font-mono uppercase bg-dark text-paper px-3 py-1 rounded-full">
                            Osnovno
                        </div>
                        <h3 className="font-heading font-bold text-4xl uppercase tracking-tighter mb-4">EZVIZ HP2</h3>

                        <div className="mb-8 h-52 flex items-center justify-center">
                            <img src={hp2Img} alt="EZVIZ HP2" className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105" />
                        </div>

                        <ul className="font-mono text-sm space-y-4 text-dark/70 mb-4 flex-1 uppercase tracking-wider">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> Garancija 24 meseca
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> 4.3in displej
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> 1080P REZOLUCIJA
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> Ugao snimanja 146°
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> prenos uživo na ekranu i pametnom telefonu
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> Diskretnog izgleda
                            </li>
                        </ul>

                        <div className="mb-8">
                            <Link to="/hp2-specs" className="font-mono text-xs uppercase text-accent hover:underline">Detaljnije..</Link>
                        </div>

                        <button className="w-full btn-magnetic bg-transparent border border-dark text-dark px-6 py-4 font-heading font-bold uppercase tracking-wider hover:bg-dark hover:text-paper">
                            Naruči HP2
                        </button>
                    </div>

                    {/* Product 2 Card - HP4 */}
                    <div className="flex-1 min-w-[300px] bg-dark text-paper p-10 rounded-[3rem] shadow-xl border border-white/5 flex flex-col group hover:-translate-y-2 transition-transform duration-500">
                        <div className="mb-4">
                            <h3 className="font-heading font-bold text-3xl uppercase tracking-tighter mb-2">EZVIZ HP4</h3>
                        </div>

                        <div className="mb-8 h-52 flex items-center justify-center">
                            <img src={hp4Img} alt="EZVIZ HP4" className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105" />
                        </div>

                        <ul className="font-mono text-sm space-y-4 text-paper/70 mb-4 flex-1 uppercase tracking-wider">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> Garancija 24 meseca
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> 4.3In Displej
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> 1080P REZOLUCIJA
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> ugao snimanja 155°
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> prenos uživo na ekranu i pametnom telefonu
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> NOĆNI REŽIM
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-accent block" /> dvosmerna komunikacija
                            </li>
                        </ul>

                        <div className="mb-8">
                            <Link to="/hp4-specs" className="font-mono text-xs uppercase text-accent hover:underline">Detaljnije..</Link>
                        </div>

                        <button className="w-full btn-magnetic bg-accent text-white px-6 py-4 font-heading font-bold uppercase tracking-wider border-none">
                            Naruči HP4
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
