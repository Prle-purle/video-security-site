import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Minus, Plus, CheckCircle2, ShoppingCart, Package, HardDrive, Calculator } from 'lucide-react';

const PRODUCTS = {
    'HP2': { name: 'EZVIZ HP2', price: 9599.99 },
    'HP4': { name: 'EZVIZ HP4', price: 10399.99 },
    'DP2': { name: 'EZVIZ DP2', price: 22499.99 }
};

const INSTALLATION_PRICE = 6500.00;

export default function OrderForm() {
    const location = useLocation();
    const containerRef = useRef(null);

    // Initial state based on navigation or default to HP2
    const initialProduct = location.state?.product && PRODUCTS[location.state.product]
        ? location.state.product
        : 'HP2';

    const [formData, setFormData] = useState({
        imePrezime: '',
        telefon: '',
        email: '',
        gradMesto: '',
        ulicaBroj: '',
        postanskiBroj: '',
        proizvod: initialProduct,
        kolicina: 1,
        saUgradnjom: false
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from('.form-animate', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const updateQuantity = (amount) => {
        setFormData(prev => ({
            ...prev,
            kolicina: Math.max(1, prev.kolicina + amount)
        }));
    };

    const calculateTotals = () => {
        const productPrice = PRODUCTS[formData.proizvod].price;
        const totalProducts = productPrice * formData.kolicina;
        const totalInstallation = formData.saUgradnjom ? INSTALLATION_PRICE * formData.kolicina : 0;
        const grandTotal = totalProducts + totalInstallation;

        return {
            productPrice,
            totalProducts,
            totalInstallation,
            grandTotal
        };
    };

    const totals = calculateTotals();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formSpreeUrl = "https://formspree.io/f/xvzbydyw";

        // Prepare data for Formspree
        const submissionData = {
            ...formData,
            productName: PRODUCTS[formData.proizvod].name,
            productPrice: PRODUCTS[formData.proizvod].price,
            totalInstallation: totals.totalInstallation,
            grandTotal: totals.grandTotal.toFixed(2) + " RSD"
        };

        try {
            const response = await fetch(formSpreeUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                setIsSubmitted(true);
                gsap.from('.success-animate', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out' });
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Došlo je do greške prilikom slanja. Molimo pokušajte ponovo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center success-animate border border-accent/10">
                    <CheckCircle2 size={80} className="text-accent mx-auto mb-6" />
                    <h2 className="font-heading font-bold text-4xl uppercase tracking-tighter mb-4">Hvala na poverenju!</h2>
                    <p className="font-mono text-dark/60 text-sm mb-8 uppercase tracking-widest">Vaša narudžbina je uspešno primljena. Kontaktiraćemo vas uskoro radi potvrde.</p>
                    <Link to="/" className="inline-block bg-dark text-paper px-8 py-4 font-heading font-bold uppercase tracking-wider rounded-full hover:bg-accent transition-colors">
                        Nazad na početnu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-background py-32 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent hover:gap-4 transition-all mb-12">
                    <ArrowLeft size={16} /> Nazad
                </Link>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Form Section */}
                    <div className="flex-[1.5] form-animate">
                        <header className="mb-12">
                            <h1 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter mb-4">
                                Naručite <span className="text-accent italic font-drama">Odmah</span>
                            </h1>
                            <p className="font-mono text-sm text-dark/60 uppercase tracking-widest">
                                Popunite podatke ispod i naš tim će Vas kontaktirati u najkraćem roku.
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-dark/40 ml-4">Ime i Prezime</label>
                                    <input required name="imePrezime" value={formData.imePrezime} onChange={handleChange} type="text" placeholder="Marko Marković" className="w-full bg-white border border-dark/5 rounded-[2rem] px-6 py-4 outline-none focus:border-accent transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-dark/40 ml-4">Broj Telefona</label>
                                    <input required name="telefon" value={formData.telefon} onChange={handleChange} type="tel" placeholder="060 123 4567" className="w-full bg-white border border-dark/5 rounded-[2rem] px-6 py-4 outline-none focus:border-accent transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-dark/40 ml-4">Email Adresa</label>
                                <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="vas@email.com" className="w-full bg-white border border-dark/5 rounded-[2rem] px-6 py-4 outline-none focus:border-accent transition-colors" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-dark/40 ml-4">Grad / Mesto</label>
                                    <input required name="gradMesto" value={formData.gradMesto} onChange={handleChange} type="text" placeholder="Beograd" className="w-full bg-white border border-dark/5 rounded-[2rem] px-6 py-4 outline-none focus:border-accent transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-dark/40 ml-4">Poštanski Broj</label>
                                    <input required name="postanskiBroj" value={formData.postanskiBroj} onChange={handleChange} type="text" placeholder="11000" className="w-full bg-white border border-dark/5 rounded-[2rem] px-6 py-4 outline-none focus:border-accent transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-dark/40 ml-4">Ulica i Broj</label>
                                <input required name="ulicaBroj" value={formData.ulicaBroj} onChange={handleChange} type="text" placeholder="Knez Mihailova 1" className="w-full bg-white border border-dark/5 rounded-[2rem] px-6 py-4 outline-none focus:border-accent transition-colors" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-dark/40 ml-4">Odaberite Proizvod</label>
                                    <select name="proizvod" value={formData.proizvod} onChange={handleChange} className="w-full bg-white border border-dark/5 rounded-[2rem] px-6 py-4 outline-none focus:border-accent appearance-none cursor-pointer transition-colors">
                                        {Object.entries(PRODUCTS).map(([id, p]) => (
                                            <option key={id} value={id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-dark/40 ml-4">Količina</label>
                                    <div className="flex items-center bg-white border border-dark/5 rounded-[2rem] px-4 py-2">
                                        <button type="button" onClick={() => updateQuantity(-1)} className="p-2 hover:text-accent transition-colors">
                                            <Minus size={20} />
                                        </button>
                                        <span className="flex-1 text-center font-heading font-bold text-xl">{formData.kolicina}</span>
                                        <button type="button" onClick={() => updateQuantity(1)} className="p-2 hover:text-accent transition-colors">
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            name="saUgradnjom"
                                            checked={formData.saUgradnjom}
                                            onChange={handleChange}
                                            type="checkbox"
                                            className="sr-only peer"
                                        />
                                        <div className="w-12 h-6 bg-dark/10 rounded-full peer peer-checked:bg-accent transition-colors"></div>
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                                    </div>
                                    <span className="font-mono text-xs uppercase tracking-widest group-hover:text-accent transition-colors">
                                        Sa ugradnjom i podešavanjem aplikacije (+6500.00 RSD po komadu)
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-magnetic bg-accent text-white py-6 rounded-[2rem] font-heading font-bold uppercase tracking-widest shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-12"
                            >
                                {isSubmitting ? 'Slanje...' : 'Naruči'}
                            </button>
                        </form>
                    </div>

                    {/* Summary Section */}
                    <div className="flex-1 form-animate">
                        <div className="sticky top-32 bg-dark text-paper p-10 rounded-[3rem] shadow-2xl border border-white/5 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <ShoppingCart size={200} />
                            </div>

                            <h3 className="font-heading font-bold text-3xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                                <Calculator className="text-accent" /> Pregled <span className="italic text-accent">Računa</span>
                            </h3>

                            <div className="space-y-6 font-mono text-sm uppercase tracking-wider relative z-10">
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-paper/60">Proizvod:</span>
                                    <div className="text-right">
                                        <div>{PRODUCTS[formData.proizvod].name}</div>
                                        <div className="text-[10px] text-accent">{totals.productPrice.toLocaleString('sr-RS', { minimumFractionDigits: 2 })} RSD x {formData.kolicina}</div>
                                    </div>
                                </div>

                                {formData.saUgradnjom && (
                                    <div className="flex justify-between items-start gap-4 border-t border-white/10 pt-6">
                                        <span className="text-paper/60">Ugradnja:</span>
                                        <div className="text-right">
                                            <div>Usluga Montaže</div>
                                            <div className="text-[10px] text-accent">{INSTALLATION_PRICE.toLocaleString('sr-RS', { minimumFractionDigits: 2 })} RSD x {formData.kolicina}</div>
                                        </div>
                                    </div>
                                )}

                                <div className="border-t-2 border-accent/20 pt-8 mt-12">
                                    <div className="flex justify-between items-end">
                                        <span className="text-paper/60 text-xs">Ukupno za uplatu:</span>
                                        <div className="text-right">
                                            <div className="font-heading font-bold text-4xl text-accent leading-none">
                                                {totals.grandTotal.toLocaleString('sr-RS', { minimumFractionDigits: 2 })}
                                            </div>
                                            <div className="text-[10px] text-paper/40 mt-1">RSD (Cena sa PDV-om)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <Package size={20} className="text-accent" />
                                    <div className="font-mono text-[10px] text-paper/60">Besplatna isporuka za sve narudžbine</div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <HardDrive size={20} className="text-accent" />
                                    <div className="font-mono text-[10px] text-paper/60">Garancija 24 meseca na kompletan paket</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
