import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, Globe, Phone, Mail, MapPin, Facebook, Instagram, ChevronLeft, ChevronRight, CreditCard, PiggyBank, Building2, Wallet, TrendingUp, Award, Users, FileText, Send } from 'lucide-react';

// Configuration Data
const topNavLinks = [
  { title: "Jismoniy shaxslarga", href: "#" },
  { title: "Korporativ mijozlarga", href: "#" },
  { title: "Bank haqida", href: "#" },
  { title: "Ekotizim", href: "#" },
  { title: "Yana", hasDropdown: true }
];

const secondaryNavLinks = [
  { title: "Omonatlar", href: "#" },
  { title: "Kreditlar", href: "#" },
  { title: "Bank kartalari", href: "#" },
  { title: "Tariflar", href: "#" },
  { title: "Interaktiv xizmatlar", href: "#" },
  { title: "Pul o'tkazmalari", href: "#" }
];

const serviceCards = [
  { icon: CreditCard, title: "Plastik kartalar", desc: "Turli xil bank kartalari" },
  { icon: PiggyBank, title: "Depozitlar", desc: "Yuqori foizli omonatlar" },
  { icon: Wallet, title: "Kreditlar", desc: "Qulay shartlarda kreditlar" },
  { icon: Building2, title: "Biznes xizmatlari", desc: "Tadbirkorlar uchun" },
  { icon: TrendingUp, title: "Internet banking", desc: "Onlayn bank xizmatlari" },
  { icon: FileText, title: "To'lovlar", desc: "Tezkor to'lov tizimlari" }
];

const newsItems = [
  {
    id: 1,
    date: "05.10.2025",
    category: "Yangiliklar",
    title: "Yangi digital xizmatlar taqdim etildi",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center"
  },
  {
    id: 2,
    date: "03.10.2025",
    category: "Aksiyalar",
    title: "Depozitlar bo'yicha maxsus taklif",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop&crop=center"
  },
  {
    id: 3,
    date: "01.10.2025",
    category: "Tadbirlar",
    title: "Kichik biznes uchun seminar",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center"
  }
];

const stats = [
  { icon: Award, number: "30+", label: "Yillik tajriba" },
  { icon: Users, number: "500K+", label: "Faol mijozlar" },
  { icon: Building2, number: "100+", label: "Filiallar" },
  { icon: TrendingUp, number: "99.8%", label: "Xizmat sifati" }
];

// Mobile Bottom Navigation Component
const MobileBottomNav = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { 
      id: 'home', 
      label: 'Bosh sahifa', 
      icon: Building2,
      href: '#'
    },
    { 
      id: 'services', 
      label: 'Xizmatlar', 
      icon: CreditCard,
      href: '#services'
    },
    { 
      id: 'banking', 
      label: 'Mening bankim', 
      icon: Wallet,
      href: '#banking'
    },
    { 
      id: 'locations', 
      label: 'Filiallar', 
      icon: MapPin,
      href: '#locations'
    },
    { 
      id: 'contact', 
      label: 'Aloqa', 
      icon: Phone,
      href: '#contact'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50/50' 
                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/30'
                }`}
              >
                <div className={`p-1 rounded-lg transition-all ${
                  isActive ? 'bg-blue-100 scale-110' : ''
                }`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs font-medium leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'}`}>
      {/* Main Navigation Bar */}
      <div className="border-b border-gray-100/50">
        <div className="max-w-9xl mx-auto px-4 lg:px-10 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 lg:gap-3 group">
                <img src="/images.png" alt="O'zMMI Logo" className="w-20 h-20 bg-black" />
              <span className="font-bold text-xl lg:text-2xl">
                <span className="text-blue-500 font-italic">O'zbekiston Milliy</span>
                <h1 className="text-blue-500 text-italic"> Metrologiya Instituti</h1>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {topNavLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg font-medium transition-all text-sm"
                >
                  {link.title}
                  {link.hasDropdown && <ChevronDown size={14} className="ml-1" />}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1 lg:gap-2">
              <button className="p-2 lg:p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all">
                <Search size={18} className="lg:hidden" />
                <Search size={20} className="hidden lg:block" />
              </button>
              
              {/* Desktop only buttons */}
              <div className="hidden lg:flex items-center gap-2">
                <button className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all">
                  <Globe size={20} />
                </button>
                <div className="hidden xl:flex items-center gap-2 ml-2">
                  <button className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all text-sm">
                    <MapPin size={16} />
                    <span>Filiallar</span>
                  </button>
                  <a href="tel:+998712307777" className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 rounded-lg transition-all text-sm font-medium">
                    <Phone size={16} />
                    <span>+998(71)230-77-77</span>
                  </a>
                </div>
                <select className="px-3 py-2 text-slate-600 hover:text-blue-600 transition-colors text-sm border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm">
                  <option>O'ZB</option>
                  <option>RU</option>
                  <option>EN</option>
                </select>
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 text-slate-600 hover:bg-blue-50/50 rounded-lg transition-all ml-1"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar - Desktop Only */}
      <div className="hidden lg:block bg-slate-50/80 backdrop-blur-sm border-b border-gray-100/50">
        <div className="max-w-9xl mx-auto px-10">
          <div className="flex items-center justify-between">
            {/* Secondary Menu */}
            <nav className="flex items-center">
              {secondaryNavLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-white/70 transition-all text-sm font-medium relative group"
                >
                  {link.title}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></div>
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-lg transition-all text-sm font-medium">
                <Award size={16} />
                <span>Investitsiyalar</span>
              </button>
              <button className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-white/70 transition-all text-sm border border-gray-200/50 rounded-lg backdrop-blur-sm">
                <span>Ariza topshirish</span>
                <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-1 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm font-medium shadow-lg hover:shadow-xl">
                <span>Mening bankim</span>
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100/50 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <nav className="space-y-1">
              {/* Quick Actions */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg">
                    <Wallet size={18} />
                    <span>Mening bankim</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-slate-700 rounded-lg font-medium">
                    <FileText size={18} />
                    <span>Ariza topshirish</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <a href="tel:+998712307777" className="flex flex-col items-center gap-2 p-3 bg-blue-50/50 rounded-lg">
                    <Phone size={20} className="text-blue-600" />
                    <span className="text-xs text-slate-600 text-center">Qo'ng'iroq qilish</span>
                  </a>
                  <button className="flex flex-col items-center gap-2 p-3 bg-blue-50/50 rounded-lg">
                    <MapPin size={20} className="text-blue-600" />
                    <span className="text-xs text-slate-600 text-center">Filiallar</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-blue-50/50 rounded-lg">
                    <Globe size={20} className="text-blue-600" />
                    <span className="text-xs text-slate-600 text-center">Til</span>
                  </button>
                </div>
              </div>

              {/* Main Navigation */}
              {topNavLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-blue-50/50 hover:text-blue-600 rounded-lg font-medium transition-all"
                >
                  <span>{link.title}</span>
                  {link.hasDropdown && <ChevronRight size={18} />}
                </a>
              ))}
              
              <div className="border-t border-gray-100 my-4 pt-4">
                <h3 className="px-4 py-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">Xizmatlar</h3>
                {secondaryNavLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="block px-4 py-3 text-slate-600 hover:bg-blue-50/50 hover:text-blue-600 rounded-lg text-sm transition-all"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

// Responsive container utility
const ResponsiveContainer = ({ children }) => (
  <div className="
    mx-auto
    px-2
    sm:px-4
    md:px-6
    lg:px-8
    xl:px-12
    2xl:px-20
    3xl:px-32
    4xl:px-48
    max-w-screen-sm
    sm:max-w-screen-md
    md:max-w-screen-lg
    lg:max-w-screen-xl
    xl:max-w-[1600px]
    2xl:max-w-[2000px]
    3xl:max-w-[3000px]
    4xl:max-w-[3840px]
  ">
    {children}
  </div>
);

// Enhanced Background Animation Component with Full Coverage
const BackgroundAnimation = ({ variant = "default" }) => {
  const getAnimationElements = () => {
    switch (variant) {
      case "hero":
        return (
          <>
            {/* Floating geometric shapes - Full Coverage */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400/20 rounded-full animate-ping"></div>
            <div className="absolute top-20 right-20 w-6 h-6 bg-indigo-300/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-8 h-8 bg-blue-200/25 rounded-full animate-bounce"></div>
            <div className="absolute top-40 left-1/2 w-3 h-3 bg-blue-300/30 rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-indigo-200/25 rounded-full animate-bounce-slow"></div>
            
            {/* Animated vertical lines */}
            <div className="absolute top-0 left-1/6 w-px h-full bg-gradient-to-b from-transparent via-blue-200/20 to-transparent animate-pulse"></div>
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-200/30 to-transparent animate-pulse delay-700"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-indigo-200/20 to-transparent animate-pulse delay-1000"></div>
            <div className="absolute top-0 right-1/6 w-px h-full bg-gradient-to-b from-transparent via-blue-200/25 to-transparent animate-pulse delay-300"></div>
            
            {/* Horizontal lines */}
            <div className="absolute top-1/6 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/15 to-transparent animate-pulse delay-1500"></div>
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-200/20 to-transparent animate-pulse delay-2000"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/18 to-transparent animate-pulse delay-2500"></div>
            
            {/* Floating squares and diamonds */}
            <div className="absolute top-32 right-32 w-3 h-3 bg-blue-300/20 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-40 right-10 w-5 h-5 bg-indigo-200/25 rotate-12 animate-float"></div>
            <div className="absolute top-60 left-40 w-4 h-4 bg-blue-200/30 rotate-45 animate-rotate-slow"></div>
            <div className="absolute bottom-60 right-40 w-6 h-6 bg-indigo-300/20 rotate-12 animate-float-reverse"></div>
            
            {/* Moving particles scattered across screen */}
            <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-blue-400/30 rounded-full animate-move-horizontal"></div>
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-indigo-300/40 rounded-full animate-move-vertical"></div>
            <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-blue-300/35 rounded-full animate-move-diagonal"></div>
            <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-indigo-400/30 rounded-full animate-move-circular"></div>
            
            {/* Large floating orbs */}
            <div className="absolute top-20 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-100/10 to-indigo-100/15 rounded-full animate-float-large"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-tl from-indigo-100/12 to-blue-100/18 rounded-full animate-float-large delay-1000"></div>
            
            {/* Constellation dots */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-blue-300/25 rounded-full animate-twinkle`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 300}ms`
                }}
              ></div>
            ))}
          </>
        );
      
      case "products":
        return (
          <>
            {/* Triangle patterns across the background */}
            <div className="absolute top-16 left-16 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-blue-200/30 animate-float-reverse"></div>
            <div className="absolute bottom-16 right-16 w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-indigo-200/25 animate-bounce-slow"></div>
            <div className="absolute top-32 right-1/3 w-0 h-0 border-l-3 border-r-3 border-b-5 border-l-transparent border-r-transparent border-b-blue-300/20 animate-float"></div>
            <div className="absolute bottom-32 left-1/3 w-0 h-0 border-l-5 border-r-5 border-b-7 border-l-transparent border-r-transparent border-b-indigo-300/22 animate-bounce-slow delay-500"></div>
            
            {/* Hexagon grid pattern */}
            <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-blue-100/20 clip-hexagon animate-rotate-slow"></div>
            <div className="absolute bottom-1/3 left-1/5 w-6 h-6 bg-indigo-100/25 clip-hexagon animate-pulse-slow"></div>
            <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-blue-200/15 clip-hexagon animate-rotate-slow delay-1000"></div>
            <div className="absolute top-3/4 right-1/5 w-7 h-7 bg-indigo-200/20 clip-hexagon animate-pulse-slow delay-1500"></div>
            
            {/* Grid of small squares */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-16 grid-rows-12 h-full w-full gap-4">
                {[...Array(192)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 bg-blue-300/20 animate-pulse`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Floating shapes */}
            <div className="absolute top-10 left-10 w-12 h-12 border-2 border-blue-200/30 rounded-lg animate-rotate-slow"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border border-indigo-200/25 rounded-full animate-pulse-slow"></div>
            <div className="absolute top-1/3 left-1/4 w-14 h-14 border-2 border-blue-300/20 rounded-xl animate-float"></div>
          </>
        );
      
      case "app":
        return (
          <>
            {/* Tech circuit pattern */}
            <div className="absolute top-20 left-20 w-12 h-12 border border-emerald-200/30 rounded-lg animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-green-200/20 rounded-full animate-spin-very-slow"></div>
            <div className="absolute top-40 right-40 w-10 h-10 border border-teal-200/25 rounded-lg animate-float"></div>
            <div className="absolute bottom-40 left-40 w-14 h-14 border-2 border-emerald-300/20 rounded-full animate-pulse-slow"></div>
            
            {/* Circuit lines - horizontal and vertical */}
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent animate-pulse-fast"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-200/20 to-transparent animate-pulse-fast delay-500"></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-200/25 to-transparent animate-pulse-fast delay-1000"></div>
            
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-200/25 to-transparent animate-pulse delay-200"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-green-200/20 to-transparent animate-pulse delay-700"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-teal-200/25 to-transparent animate-pulse delay-1200"></div>
            
            {/* Floating dot matrix */}
            <div className="absolute top-8 right-8 grid grid-cols-4 gap-3">
              {[...Array(16)].map((_, i) => (
                <div key={i} className={`w-1 h-1 bg-emerald-300/30 rounded-full animate-pulse`} style={{ animationDelay: `${i * 150}ms` }}></div>
              ))}
            </div>
            
            <div className="absolute bottom-8 left-8 grid grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-2 h-2 bg-green-300/25 rounded-full animate-twinkle`} style={{ animationDelay: `${i * 200}ms` }}></div>
              ))}
            </div>
            
            {/* Larger tech elements */}
            <div className="absolute top-1/6 left-1/6 w-20 h-20 border-2 border-emerald-200/20 rounded-2xl animate-float-large"></div>
            <div className="absolute bottom-1/6 right-1/6 w-24 h-24 border border-green-200/25 rounded-full animate-rotate-slow"></div>
            
            {/* Random floating particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-move-random`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 250}ms`
                }}
              ></div>
            ))}
          </>
        );
      
      case "stats":
        return (
          <>
            {/* Full constellation effect */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-300/40 rounded-full animate-twinkle"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/50 rounded-full animate-twinkle delay-300"></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-200/30 rounded-full animate-twinkle delay-700"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-200/40 rounded-full animate-twinkle delay-1000"></div>
            
            {/* Additional constellation points */}
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className={`absolute bg-cyan-300/20 rounded-full animate-twinkle`}
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 200}ms`
                }}
              ></div>
            ))}
            
            {/* Connection lines grid */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgb(34 211 238)" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Dynamic connecting lines */}
              <line x1="25%" y1="25%" x2="33%" y2="33%" stroke="rgb(34 211 238)" strokeWidth="1" className="animate-draw-line" />
              <line x1="67%" y1="33%" x2="75%" y2="25%" stroke="rgb(59 130 246)" strokeWidth="1" className="animate-draw-line delay-500" />
              <line x1="33%" y1="75%" x2="25%" y2="67%" stroke="rgb(34 211 238)" strokeWidth="1" className="animate-draw-line delay-1000" />
              <line x1="75%" y1="75%" x2="67%" y2="67%" stroke="rgb(59 130 246)" strokeWidth="1" className="animate-draw-line delay-1500" />
            </svg>
            
            {/* Floating data orbs */}
            <div className="absolute top-1/6 left-1/6 w-16 h-16 bg-blue-500/10 rounded-full animate-float-large"></div>
            <div className="absolute top-1/6 right-1/6 w-20 h-20 bg-cyan-500/8 rounded-full animate-float-large delay-1000"></div>
            <div className="absolute bottom-1/6 left-1/6 w-18 h-18 bg-blue-400/12 rounded-full animate-float-large delay-2000"></div>
            <div className="absolute bottom-1/6 right-1/6 w-14 h-14 bg-cyan-400/10 rounded-full animate-float-large delay-3000"></div>
          </>
        );
      
      default:
        return (
          <>
            {/* Default comprehensive background */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-100/8 to-indigo-100/12 rounded-full animate-float-large"></div>
            <div className="absolute bottom-1/3 left-1/5 w-24 h-24 bg-gradient-to-tl from-indigo-100/10 to-blue-100/15 rounded-full animate-float-large delay-1000"></div>
            <div className="absolute top-1/6 left-1/3 w-28 h-28 bg-gradient-to-br from-blue-50/15 to-indigo-50/20 rounded-full animate-float-large delay-2000"></div>
            
            {/* Scattered geometric shapes */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-blue-300/20 rounded-full animate-pulse`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 400}ms`
                }}
              ></div>
            ))}
            
            {/* Subtle grid lines */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {getAnimationElements()}
    </div>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="relative pt-20 lg:pt-32 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Background Animation */}
      <BackgroundAnimation variant="hero" />
      
      {/* Secondary Menu for Mobile */}
      <div className="lg:hidden bg-slate-50/80 backdrop-blur-sm border-b border-gray-100/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 -mx-4 px-4">
            {secondaryNavLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="flex-shrink-0 px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-white/70 transition-all text-sm font-medium rounded-lg whitespace-nowrap"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      <ResponsiveContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          {/* Left Content */}
          <div className="space-y-4">
            <div className="space-y-6">
              <h1 className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
                2xl:text-8xl
                3xl:text-9xl
                4xl:text-[7rem]
                font-bold text-slate-900 leading-[1.1] tracking-tight
              ">
                Onlayn
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  «Mikroqarz»
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Ehtiyojlaringizning tezkor va ishonchli yechimi. Minimal hujjatlar bilan, tez ko'rib chiqish.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-xl">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-bold text-blue-600">2</span>
                  <span className="text-slate-600">oy</span>
                  <span className="text-slate-400">dan</span>
                  <span className="text-3xl font-bold text-blue-600 ml-2">60</span>
                  <span className="text-slate-600">oy</span>
                  <span className="text-slate-400">gacha</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">MUDDATI</p>
              </div>
              <div className="w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden sm:block"></div>
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-slate-600">yillik</span>
                  <span className="text-3xl font-bold text-emerald-600">26</span>
                  <span className="text-slate-600">%</span>
                  <span className="text-slate-400">dan</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">FOIZ STAVKASI</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span>Ariza topshirish</span>
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-slate-700 font-semibold rounded-xl hover:bg-gray-50 transition-all">
                Batafsil ma'lumot
              </button>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-3xl blur-3xl"></div>
                <img 
                  src="main-image.png"
                  alt="Onlayn Mikroqarz - 3D Businessman" 
                  className="w-full h-auto max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(59, 130, 246, 0.25))'
                  }}
                />
                {/* Floating elements around the image */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-indigo-500/20 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-4 w-6 h-6 bg-emerald-500/20 rounded-full animate-ping"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-60 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-40 blur-2xl"></div>
            </div>
      </ResponsiveContainer>
    </section>
  );
};

// Product Cards Component
const ProductCards = () => {
  const products = [
    {
      id: 1,
      title: "Yashil Makon",
      subtitle: "Ekologik loyiha",
      description: "Mablag'laringizdan faol foydalaning va ullarni erkin boshqaring.",
      icon: "🌱",
      bgGradient: "from-emerald-500 to-green-600",
      size: "large"
    },
    {
      id: 2,
      title: "Yoshlar uchun",
      subtitle: "Maxsus dastur",
      description: "Yoshlar uchun qulay imkoniyatlar – biznesni boshlash va rivojlantirish.",
      icon: "👥",
      bgGradient: "from-blue-500 to-indigo-600",
      size: "large"
    },
    {
      id: 3,
      title: "VISA Premium",
      subtitle: "Bank kartasi",
      description: "15 daqiqada tayyor, dunyoning istalgan joyida foydalaning.",
      icon: "💳",
      bgGradient: "from-purple-500 to-pink-600",
      size: "small"
    },
    {
      id: 4,
      title: "Virtual VISA",
      subtitle: "Raqamli karta",
      description: "Onlayn to'lovlar uchun xavfsiz yechim.",
      icon: "🌐",
      bgGradient: "from-blue-500 to-cyan-600",
      size: "small"
    },
    {
      id: 5,
      title: "Virtual HUMO",
      subtitle: "Mahalliy karta",
      description: "Oddiy va xavfsiz onlayn xaridlar uchun.",
      icon: "🛡️",
      bgGradient: "from-indigo-500 to-blue-600",
      size: "small"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Animation */}
      <BackgroundAnimation variant="products" />
      
      <ResponsiveContainer>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Bizning <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">mahsulotlarimiz</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Zamonaviy moliyaviy yechimlar va qulay bank xizmatlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Cards */}
          {products.slice(0, 2).map((product, idx) => (
            <div key={product.id} className="md:col-span-6">
              <div className="group h-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 cursor-pointer hover:-translate-y-2">
                <div className={`bg-gradient-to-br ${product.bgGradient} p-8 h-64 relative overflow-hidden`}>
                  <div className="absolute top-6 right-6 text-4xl opacity-20 transform rotate-12">
                    {product.icon}
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full"></div>

                </div>
                <div className="p-8">
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {product.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group-hover:gap-3 gap-2 transition-all">
                    Batafsil ma'lumot
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Small Cards */}
          {products.slice(2).map((product) => (
            <div key={product.id} className="md:col-span-4">
              <div className="group h-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 cursor-pointer hover:-translate-y-2">
                <div className={`bg-gradient-to-br ${product.bgGradient} p-6 h-48 relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/5"></div>

                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {product.subtitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group-hover:gap-3 gap-2 transition-all text-sm">
                    Batafsil
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
};

// Mobile App Section Component
const MobileAppSection = () => {
  const appFeatures = [
    {
      id: 1,
      title: "Qulay",
      description: "Barcha mablag'laringiz qo'l ostingizda.",
      icon: "🔒",
      bgGradient: "from-emerald-400 to-emerald-600"
    },
    {
      id: 2,
      title: "Konversiya",
      description: "Dollarni so'mga tez konvertatsiya qilish va aksincha.",
      icon: "💱",
      bgGradient: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      title: "To'lovlar",
      description: "Aloqa, kommunal va boshqa xizmatlar uchun to'lovlar.",
      icon: "💳",
      bgGradient: "from-purple-400 to-purple-600"
    },
    {
      id: 4,
      title: "HUMOPay",
      description: "Smartfon orqali kontaktsiz to'lov.",
      icon: "📱",
      bgGradient: "from-orange-400 to-orange-600"
    },
    {
      id: 5,
      title: "Mening uyim",
      description: "Uy bilan bog'liq barcha to'lovlarni boshqaring.",
      icon: "🏠",
      bgGradient: "from-cyan-400 to-cyan-600"
    },
    {
      id: 6,
      title: "Mening avtomobilim",
      description: "Jarimalar haqida 2 vaqtda va bepul bilib oling.",
      icon: "🚗",
      bgGradient: "from-red-400 to-red-600"
    }
  ];

  return (
    <section className="py-20 xl:py-32 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Enhanced Background Animation */}
      <BackgroundAnimation variant="app" />
      
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-teal-200/25 rounded-full blur-xl animate-bounce"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`border-r border-emerald-300 animate-pulse`} style={{ animationDelay: `${i * 100}ms` }}></div>
            ))}
          </div>
        </div>
      </div>

      <ResponsiveContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          
          {/* Left Content - Features */}
          <div className="space-y-8 xl:space-y-12 order-2 lg:order-1">
            <div className="space-y-6 xl:space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100/80 text-emerald-700 rounded-full text-sm font-semibold backdrop-blur-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                MOBIL ILOVA
              </div>

              <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-slate-900 leading-[1.1]">
                Ikkita klik bilan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
                  kreditni so'ndirish
                </span>
                , xaridlar ma'lumoti, to'lovlar grafigi va boshqalar!
              </h2>
              
              <p className="text-xl xl:text-2xl text-slate-600 leading-relaxed">
                Barcha bank xizmatlaringizni bir mobil ilovada boshqaring va hayotingizni osonlashtiring
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
              {appFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="group bg-white/90 backdrop-blur-md p-6 xl:p-7 rounded-2xl xl:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/60 cursor-pointer hover:-translate-y-2 hover:scale-105"
                >
                  <div className="flex items-start gap-4 xl:gap-5">
                    <div className={`w-12 h-12 xl:w-14 xl:h-14 bg-gradient-to-br ${feature.bgGradient} rounded-xl xl:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      <span className="text-xl xl:text-2xl filter drop-shadow-sm">{feature.icon}</span>
                    </div>
                    <div className="space-y-2 xl:space-y-3 flex-1">
                      <h3 className="text-lg xl:text-xl 2xl:text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm xl:text-base text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Section */}
            <div className="space-y-6 xl:space-y-8 bg-white/60 backdrop-blur-sm rounded-3xl p-8 xl:p-10 border border-white/80 shadow-xl">
              <div className="text-center space-y-4">
                <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-slate-900">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                    bitta
                  </span>{" "}
                  mobil ilovada
                </h3>
                <p className="text-lg text-slate-600">Hoziroq yuklab oling va bank xizmatlarini boshqaring</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-6">
                <a
                  href="#"
                  className="group flex items-center gap-3 xl:gap-4 px-4 xl:px-6 py-4 xl:py-5 bg-white rounded-2xl xl:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 hover:scale-105"
                >
                  <div className="w-10 h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <span className="text-white text-lg xl:text-xl">▶</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs xl:text-sm text-slate-500 font-medium">Mavjud</div>
                    <div className="text-sm xl:text-base font-bold text-slate-900">Google Play</div>
                  </div>
                </a>

                <a
                  href="#"
                  className="group flex items-center gap-3 xl:gap-4 px-4 xl:px-6 py-4 xl:py-5 bg-white rounded-2xl xl:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 hover:scale-105"
                >
                  <div className="w-10 h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <span className="text-white text-lg xl:text-xl">🍎</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs xl:text-sm text-slate-500 font-medium">Yuklang</div>
                    <div className="text-sm xl:text-base font-bold text-slate-900">App Store</div>
                  </div>
                </a>

                <a
                  href="#"
                  className="group flex items-center gap-3 xl:gap-4 px-4 xl:px-6 py-4 xl:py-5 bg-white rounded-2xl xl:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 hover:scale-105"
                >
                  <div className="w-10 h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <span className="text-white text-lg xl:text-xl">⚡</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs xl:text-sm text-slate-500 font-medium">QR kod</div>
                    <div className="text-sm xl:text-base font-bold text-slate-900">Yuklab olish</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced 3D Illustration */}
          <div className="relative order-1 lg:order-2">
            {/* Background glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-green-600/30 rounded-[3rem] xl:rounded-[4rem] blur-3xl scale-110"></div>
            
            {/* Main 3D Scene Container */}
            <div className="relative bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-[3rem] xl:rounded-[4rem] p-8 xl:p-12 shadow-2xl overflow-hidden border border-white/20">
              
              {/* Animated background patterns */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
              </div>
              
              {/* 3D Elements */}
              <div className="relative h-96 xl:h-[500px] 2xl:h-[600px]">
                
                {/* Main Mobile Phone */}
                <div className="absolute top-8 right-8 xl:top-12 xl:right-12 z-30">
                  <div className="w-44 h-80 xl:w-52 xl:h-96 bg-white rounded-[2rem] shadow-2xl p-2 transform rotate-12 hover:rotate-6 transition-all duration-700 hover:scale-105 border border-gray-200">
                    <div className="w-full h-full bg-gradient-to-b from-emerald-50 to-green-50 rounded-[1.5rem] overflow-hidden">
                      {/* Phone Header */}
                      <div className="bg-white p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                          </div>
                          <div className="text-xs font-bold text-emerald-600">AloqaBank</div>
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="p-4 space-y-3">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <img 
                            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=120&h=60&fit=crop&crop=center" 
                            alt="Mobile Banking" 
                            className="w-full h-8 object-cover rounded mb-2"
                          />
                        </div>
                        <div className="bg-emerald-100 rounded-lg p-3">
                          <div className="text-xs font-bold text-emerald-700">Balans</div>
                          <div className="text-lg font-bold text-emerald-800">1 500 000</div>
                          <div className="text-xs text-emerald-600">so'm</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white rounded-lg p-2 text-center">
                            <img 
                              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=40&fit=crop&crop=center" 
                              alt="Cards" 
                              className="w-6 h-6 object-cover rounded mx-auto mb-1"
                            />
                            <div className="text-xs text-slate-600">Kartalar</div>
                          </div>
                          <div className="bg-white rounded-lg p-2 text-center">
                            <img 
                              src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=40&h=40&fit=crop&crop=center" 
                              alt="Payments" 
                              className="w-6 h-6 object-cover rounded mx-auto mb-1"
                            />
                            <div className="text-xs text-slate-600">To'lovlar</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Cards Stack */}
                <div className="absolute top-16 left-8 xl:top-20 xl:left-12 z-20">
                  <div className="relative">
                    {/* Card 1 */}
                    <div className="w-36 h-22 xl:w-44 xl:h-28 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl shadow-xl transform -rotate-12 hover:rotate-0 transition-all duration-500 border border-white/20 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=180&h=110&fit=crop&crop=center&blend=multiply&blend-alpha=30" 
                        alt="HUMO Card" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                      />
                      <div className="relative p-3 xl:p-4 text-white h-full flex flex-col justify-between">
                        <div className="text-xs xl:text-sm font-bold">AloqaBank</div>
                        <div>
                          <div className="text-xs xl:text-sm">**** **** **** 5678</div>
                          <div className="text-xs opacity-80">HUMO</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card 2 */}
                    <div className="w-36 h-22 xl:w-44 xl:h-28 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl shadow-xl transform rotate-6 -mt-4 ml-4 hover:rotate-12 transition-all duration-500 border border-white/20 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=180&h=110&fit=crop&crop=center&blend=multiply&blend-alpha=30" 
                        alt="VISA Card" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                      />
                      <div className="relative p-3 xl:p-4 text-white h-full flex flex-col justify-between">
                        <div className="text-xs xl:text-sm font-bold">VISA</div>
                        <div>
                          <div className="text-xs xl:text-sm">**** **** **** 1234</div>
                          <div className="text-xs opacity-80">Classic</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Money Icons */}
                <div className="absolute bottom-8 left-16 xl:bottom-12 xl:left-20 z-10">
                  <div className="relative">
                    <div className="w-16 h-16 xl:w-20 xl:h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce">
                      <span className="text-2xl xl:text-3xl">💰</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                      +
                    </div>
                  </div>
                </div>

                {/* Security Shield */}
                <div className="absolute top-32 left-4 xl:top-40 xl:left-8 z-10">
                  <div className="w-14 h-16 xl:w-18 xl:h-20 bg-gradient-to-b from-emerald-400 to-green-600 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center justify-center border border-white/20">
                    <span className="text-white text-xl xl:text-2xl">🔐</span>
                  </div>
                </div>

                {/* Notification Bell */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pulse">
                    <span className="text-emerald-600 text-lg xl:text-xl">🔔</span>
                  </div>
                </div>

                {/* Clock/Time Icon */}
                <div className="absolute bottom-16 right-20 xl:bottom-20 xl:right-24 z-10">
                  <div className="w-14 h-14 xl:w-16 xl:h-16 bg-white rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center justify-center border-4 border-emerald-100">
                    <span className="text-emerald-600 text-xl xl:text-2xl">⏰</span>
                  </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
                </div>
                <div className="absolute top-20 right-32">
                  <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-4 h-4 bg-white/50 rounded-full animate-bounce"></div>
                </div>
                <div className="absolute bottom-32 left-32">
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
                </div>

              </div>
            </div>

            {/* Additional Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 xl:w-40 xl:h-40 bg-emerald-300/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 xl:w-52 xl:h-52 bg-green-300/15 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-6 w-24 h-24 bg-teal-300/25 rounded-full blur-xl animate-bounce"></div>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
};

// Services Component
const Services = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Enhanced Background Animation */}
      <BackgroundAnimation variant="stats" />
      
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.05))]"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-twinkle"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-cyan-400/30 rounded-full animate-twinkle delay-500"></div>
      </div>
      
      <ResponsiveContainer>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Bizning <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">yutuqlarimiz</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Yillar davomida mijozlarimizga xizmat ko'rsatish orqali erishgan natijalarimiz
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <Icon size={36} className="text-blue-400" />
                  </div>
                </div>
                <div className="text-4xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-lg font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </ResponsiveContainer>
    </section>
  );
};

// News Component
const NewsSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Default Background Animation */}
      <BackgroundAnimation />
      
      <ResponsiveContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              So'nggi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">yangiliklar</span>
            </h2>
            <p className="text-xl text-slate-600">Eng muhim yangiliklar va e'lonlar bilan tanishing</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:gap-3">
            Barchasini ko'rish
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 cursor-pointer hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg">
                  {news.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8">
                <div className="text-sm text-slate-500 mb-3 font-medium">{news.date}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                  {news.title}
                </h3>
                <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group-hover:gap-3 gap-2 transition-all">
                  To'liq o'qish
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                           </div>
            </div>
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.05))]"></div>
      
      {/* Footer specific animations */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-twinkle"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-cyan-400/30 rounded-full animate-twinkle delay-500"></div>
      </div>
      
      <ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-white text-2xl">AloqaBank</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-md">
              O'zbekistonda ishonchli bank xizmatlari ko'rsatuvchi yetakchi moliya institutlaridan biri. 
              Mijozlarimizning ehtiyojlarini qondirish bizning asosiy maqsadimizdir.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Send].map((Social, idx) => (
                <a key={idx} href="#" className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Social size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Bank haqida</h3>
            <ul className="space-y-3">
              {["Umumiy ma'lumot", "Bank tarixi", "Rahbariyat", "Filiallar", "Karyera"].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Xizmatlar</h3>
            <ul className="space-y-3">
              {["Plastik kartalar", "Depozitlar", "Kreditlar", "Internet banking", "Mobil ilovalar"].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Aloqa markazi</p>
                <p className="text-slate-400">+998 (71) 234-56-78</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Email</p>
                <p className="text-slate-400">info@aloqabank.uz</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Manzil</p>
                <p className="text-slate-400">Toshkent sh., Amir Temur ko'chasi, 100</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400">© 2025 AloqaBank. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-8">
            {["Maxfiylik siyosati", "Foydalanish shartlari", "Sayt xaritasi"].map((link, idx) => (
              <a key={idx} href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                {link}
              </a>
            ))}
          </div>
        </div>
      </ResponsiveContainer>
    </footer>
  );
};

// Add Custom CSS animations to the document head
const CustomStyles = () => {
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes float-reverse {
        0%, 100% { transform: translateY(-10px); }
        50% { transform: translateY(10px); }
      }
      
      @keyframes float-large {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-30px) scale(1.05); }
      }
      
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes spin-very-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
      
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
      }
      
      @keyframes pulse-fast {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.6; }
      }
      
      @keyframes rotate-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes move-horizontal {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(20px); }
      }
      
      @keyframes move-vertical {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
      
      @keyframes move-diagonal {
        0%, 100% { transform: translate(0px, 0px); }
        50% { transform: translate(15px, -15px); }
      }
      
      @keyframes move-circular {
        0% { transform: translate(0px, 0px); }
        25% { transform: translate(10px, -10px); }
        50% { transform: translate(0px, -20px); }
        75% { transform: translate(-10px, -10px); }
        100% { transform: translate(0px, 0px); }
      }
      
      @keyframes move-random {
        0%, 100% { transform: translate(0px, 0px); }
        25% { transform: translate(10px, 5px); }
        50% { transform: translate(-5px, 15px); }
        75% { transform: translate(15px, -10px); }
      }
      
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      
      @keyframes draw-line {
        0% { stroke-dasharray: 0, 100; }
        100% { stroke-dasharray: 100, 0; }
      }
      
      .animate-float { animation: float 3s ease-in-out infinite; }
      .animate-float-reverse { animation: float-reverse 4s ease-in-out infinite; }
      .animate-float-large { animation: float-large 6s ease-in-out infinite; }
      .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      .animate-spin-very-slow { animation: spin-very-slow 20s linear infinite; }
      .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      .animate-pulse-fast { animation: pulse-fast 1s ease-in-out infinite; }
      .animate-rotate-slow { animation: rotate-slow 10s linear infinite; }
      .animate-move-horizontal { animation: move-horizontal 5s ease-in-out infinite; }
      .animate-move-vertical { animation: move-vertical 4s ease-in-out infinite; }
      .animate-move-diagonal { animation: move-diagonal 6s ease-in-out infinite; }
      .animate-move-circular { animation: move-circular 8s ease-in-out infinite; }
      .animate-move-random { animation: move-random 7s ease-in-out infinite; }
      .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
      .animate-draw-line { animation: draw-line 3s ease-in-out infinite; }
      
      .clip-hexagon {
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      }
      
      .delay-200 { animation-delay: 200ms; }
      .delay-300 { animation-delay: 300ms; }
      .delay-500 { animation-delay: 500ms; }
      .delay-700 { animation-delay: 700ms; }
      .delay-1000 { animation-delay: 1000ms; }
      .delay-1200 { animation-delay: 1200ms; }
      .delay-1500 { animation-delay: 1500ms; }
      .delay-2000 { animation-delay: 2000ms; }
      .delay-2500 { animation-delay: 2500ms; }
      .delay-3000 { animation-delay: 3000ms; }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);
  
  return null;
};

// Main App
const App = () => {
  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <CustomStyles />
      <Header />
      <main>
        <Hero />
        <ProductCards />
        <MobileAppSection />
        <Services />
        <NewsSection />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default App;