/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Leaf, 
  Scissors, 
  Map, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  ChevronUp,
  Menu,
  X,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Trees
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

// --- Constants ---
const SERVICES: Service[] = [
  {
    id: 'entretien',
    title: 'Entretien de jardin',
    description: 'Soin régulier pour préserver la santé et la beauté de vos espaces verts toute l\'année.',
    icon: <Scissors className="w-6 h-6 text-primary" />
  },
  {
    id: 'taille',
    title: 'Taille & élagage',
    description: 'Interventions précises pour structurer vos arbres et arbustes en respectant leur croissance.',
    icon: <Trees className="w-6 h-6 text-primary" />
  },
  {
    id: 'creation',
    title: 'Création paysagère',
    description: 'Conception et réalisation de jardins sur mesure, alliant esthétique et durabilité.',
    icon: <Map className="w-6 h-6 text-primary" />
  },
  {
    id: 'nettoyage',
    title: 'Nettoyage extérieur',
    description: 'Remise en état de vos terrasses, allées et murets pour un extérieur impeccable.',
    icon: <Sparkles className="w-6 h-6 text-primary" />
  },
  {
    id: 'conseils',
    title: 'Conseils & accompagnement',
    description: 'Expertise personnalisée pour le choix des végétaux et l\'aménagement de votre terrain.',
    icon: <MessageSquare className="w-6 h-6 text-primary" />
  }
];

const PROJECTS: Project[] = [
  { id: 1, title: 'Jardin Méditerranéen', category: 'Création', image: 'https://picsum.photos/seed/garden1/800/800' },
  { id: 2, title: 'Taille de Haies', category: 'Entretien', image: 'https://picsum.photos/seed/garden2/800/800' },
  { id: 3, title: 'Terrasse Végétalisée', category: 'Aménagement', image: 'https://picsum.photos/seed/garden3/800/800' },
  { id: 4, title: 'Espace Zen', category: 'Création', image: 'https://picsum.photos/seed/garden4/800/800' },
  { id: 5, title: 'Élagage Chêne', category: 'Élagage', image: 'https://picsum.photos/seed/garden5/800/800' },
  { id: 6, title: 'Bordures Fleuries', category: 'Entretien', image: 'https://picsum.photos/seed/garden6/800/800' },
  { id: 7, title: 'Allée en Pierre', category: 'Aménagement', image: 'https://picsum.photos/seed/garden7/800/800' },
  { id: 8, title: 'Parc Privé', category: 'Entretien', image: 'https://picsum.photos/seed/garden8/800/800' },
  { id: 9, title: 'Jardin Sec', category: 'Création', image: 'https://picsum.photos/seed/garden9/800/800' },
];

// --- Components ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const name = "ADRIEN MOREL";
  
  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-bg-pale flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="text-center">
        <div className="flex space-x-2 mb-12">
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: i * 0.1, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              className="text-text-deep text-4xl md:text-6xl font-bold tracking-widest"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={onComplete}
          className="px-10 py-4 bg-primary text-white rounded-organic text-sm tracking-widest font-medium hover:bg-opacity-90 transition-all active:scale-95"
        >
          ACCÉDER
        </motion.button>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Paysagiste', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Réalisations', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-text-deep font-bold text-xl tracking-tight">
          ADRIEN MOREL
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-text-deep hover:text-primary transition-colors text-sm font-medium relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a 
            href="#devis" 
            className="px-6 py-2.5 bg-primary text-white rounded-organic text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            Devis
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-text-deep" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-text-deep text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#devis" 
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-primary text-white rounded-organic text-center font-medium"
              >
                Devis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="mb-8 animate-float">
          <Leaf className="w-24 h-24 text-primary stroke-[1px] opacity-80" />
          <div className="absolute inset-0 blur-2xl bg-primary/10 rounded-full -z-10" />
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center max-w-4xl mb-6"
        >
          Des extérieurs pensés avec soin, réalisés avec précision.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-text-deep/60 text-lg tracking-wide"
        >
          Votre expert paysagiste
        </motion.p>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-30">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-12 bg-text-deep" />
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <img 
            src="https://picsum.photos/seed/landscaper/800/1000" 
            alt="Adrien Morel en action" 
            className="rounded-organic w-full aspect-[4/5] object-cover organic-shadow"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -right-6 bg-accent p-8 rounded-organic text-white hidden md:block">
            <p className="text-4xl font-bold mb-1">10</p>
            <p className="text-xs uppercase tracking-widest opacity-80">Ans d'expérience</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="mb-8">Votre Paysagiste</h2>
          <p className="text-lg text-text-deep/80 leading-relaxed mb-8">
            Passionné par la nature et le design extérieur, j'accompagne les particuliers et professionnels dans la valorisation de leur patrimoine végétal. Mon approche repose sur l'équilibre entre esthétique moderne et respect des écosystèmes locaux.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {[
              { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, text: "Approche durable" },
              { icon: <ShieldCheck className="w-5 h-5 text-primary" />, text: "Engagement qualité" },
              { icon: <Clock className="w-5 h-5 text-primary" />, text: "Rigueur et soin" },
              { icon: <MapPin className="w-5 h-5 text-primary" />, text: "Rayon de 40 km" },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                {item.icon}
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          <a 
            href="#contact" 
            className="inline-block px-8 py-4 border border-primary text-primary rounded-organic font-medium hover:bg-primary hover:text-white transition-all"
          >
            En savoir plus
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4">Nos Services</h2>
          <p className="text-text-deep/60 max-w-2xl mx-auto">
            Une gamme complète de prestations pour sublimer et entretenir vos espaces extérieurs avec professionnalisme.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-bg-pale rounded-organic transition-all hover:organic-shadow-hover group"
            >
              <div className="mb-6 p-4 bg-white rounded-organic inline-block group-hover:bg-primary group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-text-deep/70 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="mb-4">Réalisations</h2>
        <p className="text-text-deep/60">Aperçu de nos derniers projets d'aménagement et d'entretien.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative group cursor-pointer overflow-hidden rounded-organic aspect-square"
            onClick={() => setSelected(project)}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center">
              <p className="text-xs uppercase tracking-widest mb-2 opacity-80">{project.category}</p>
              <h4 className="text-xl font-bold">{project.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-text-deep/95 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-organic overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                onClick={() => setSelected(null)}
              >
                <X />
              </button>
              <img src={selected.image} alt={selected.title} className="w-full h-auto max-h-[70vh] object-cover" referrerPolicy="no-referrer" />
              <div className="p-8">
                <p className="text-primary text-xs uppercase tracking-widest mb-2 font-bold">{selected.category}</p>
                <h3 className="text-2xl font-bold text-text-deep">{selected.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const QuoteForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="devis" className="py-24 bg-bg-pale px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-organic organic-shadow">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Demander un devis</h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-deep/60">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Devis gratuit</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Sans engagement</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Réponse sous 48h</span>
          </div>
        </div>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Message envoyé !</h3>
            <p className="text-text-deep/60">Nous reviendrons vers vous très rapidement.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 text-primary font-medium underline"
            >
              Envoyer une autre demande
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-text-deep/60">Nom & Prénom</label>
                <input required type="text" className="w-full px-4 py-3 bg-bg-pale border-none rounded-organic focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-text-deep/60">Email</label>
                <input required type="email" className="w-full px-4 py-3 bg-bg-pale border-none rounded-organic focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-text-deep/60">Téléphone</label>
                <input required type="tel" className="w-full px-4 py-3 bg-bg-pale border-none rounded-organic focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-text-deep/60">Type de prestation</label>
                <select className="w-full px-4 py-3 bg-bg-pale border-none rounded-organic focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                  <option>Entretien régulier</option>
                  <option>Création paysagère</option>
                  <option>Élagage / Taille</option>
                  <option>Aménagement ponctuel</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-text-deep/60">Description du projet</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-bg-pale border-none rounded-organic focus:ring-2 focus:ring-primary/20 outline-none resize-none"></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full py-4 bg-primary text-white rounded-organic font-bold tracking-widest hover:bg-opacity-90 transition-all disabled:opacity-50"
            >
              {status === 'loading' ? 'ENVOI EN COURS...' : 'ENVOYER LA DEMANDE'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="mb-8">Contactez-nous</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="p-3 bg-primary/10 rounded-organic text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Morel Paysages</h4>
                <p className="text-text-deep/60">18, allée des Cyprès<br />84240 Valmont-sur-Rive, France</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="p-3 bg-primary/10 rounded-organic text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Téléphone</h4>
                <p className="text-text-deep/60">+33 (0)4 90 00 00 00</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="p-3 bg-primary/10 rounded-organic text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email</h4>
                <p className="text-text-deep/60">contact@morel-paysages.fr</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-accent/5 rounded-organic border border-accent/10">
            <p className="text-accent font-medium italic">"Chaque jardin est une histoire que nous écrivons ensemble."</p>
            <p className="text-xs uppercase tracking-widest mt-4 font-bold text-text-deep/40">— Adrien Morel</p>
          </div>
        </div>

        <div className="h-[400px] md:h-full min-h-[400px] bg-gray-100 rounded-organic overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.4!2d5.3!3d43.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQyJzAwLjAiTiA1wrAxOCcwMC4wIkU!5e0!3m2!1sen!2sfr!4v1620000000000!5m2!1sen!2sfr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="py-12 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="font-bold text-lg text-text-deep mb-1">ADRIEN MOREL</p>
          <p className="text-xs text-text-deep/40 uppercase tracking-widest">Expert Paysagiste</p>
        </div>

        <div className="flex space-x-8 text-xs uppercase tracking-widest font-bold text-text-deep/60">
          <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex space-x-4">
            <a href="#" className="p-2 text-text-deep/40 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="p-2 text-text-deep/40 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
          </div>
          <button 
            onClick={scrollToTop}
            className="p-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all active:scale-90"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="text-center mt-12 text-[10px] text-text-deep/20 uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} Morel Paysages. Tous droits réservés.
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
            style={{ scaleX }}
          />
          
          <Navbar />
          
          <main>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <QuoteForm />
            <Contact />
          </main>
          
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
