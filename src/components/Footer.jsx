export default function Footer() {
    return (
        <footer className="bg-dark text-paper rounded-t-[4rem] px-6 md:px-16 pt-24 pb-8 border-t-[0.5rem] border-accent">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-4 mb-24">

                <div className="flex-1 max-w-sm">
                    <h2 className="font-heading font-bold text-4xl uppercase tracking-tighter mb-4">Ofanim</h2>
                    <p className="font-mono text-sm text-paper/50 uppercase tracking-widest leading-relaxed mb-8">
                        Digitalne špijunke za komercijalnu upotrebu i domaćinstva. Bezbednost pre svega.
                    </p>
                    <div className="flex items-center gap-3 font-mono text-xs uppercase bg-paper/5 w-max px-4 py-2 rounded-full border border-paper/10">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Sistem Operativan
                    </div>
                </div>

                <div className="flex gap-16 font-mono text-sm uppercase tracking-widest text-paper/60">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-paper font-heading font-bold mb-2">Navigacija</h4>
                        <a href="#" className="hover:text-accent transition-colors">Početna</a>
                        <a href="#karakteristike" className="hover:text-accent transition-colors">Karakteristike</a>
                        <a href="#proizvodi" className="hover:text-accent transition-colors">Proizvodi</a>
                    </div>
                </div>

            </div>

            <div className="max-w-6xl mx-auto border-t border-paper/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono uppercase tracking-widest text-paper/40">
                <p>&copy; {new Date().getFullYear()} Ofanim. Sva prava zadržana.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-paper transition-colors">Politika privatnosti</a>
                    <a href="#" className="hover:text-paper transition-colors">Uslovi korišćenja</a>
                </div>
            </div>
        </footer>
    );
}
