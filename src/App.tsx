import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Menu, X, ChevronRight, Bot, Building2, MessageSquareCode, Code2, ArrowRight, Linkedin } from 'lucide-react';
import ContactForm from './components/ContactForm';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
      <img 
        src="https://ytgjvhsyqi.ufs.sh/f/zS1Fa3G0rNwvu1BStD0JEJa3h5vKs94inrRxDF6Mzt7eQpwX" 
        alt="Seaside AI Logo" 
        className="h-12 w-auto object-contain"
      />
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-wide text-gray-900">Seaside AI</span>
        <span className="text-[0.65rem] tracking-[0.2em] uppercase mt-0.5 text-gray-500">AI Automation Agency</span>
      </div>
    </Link>
  );
}

function HomePage() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleContact = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  const scrollToServices = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Logo />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
              <button 
                onClick={handleContact}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-all"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Home</Link>
              <a href="#services" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Services</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Blog</a>
              <button 
                onClick={handleContact}
                className="w-full mt-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        <div className="hero-background">
          <div className="wave-container">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
          </div>
          <div className="glow"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 animate-fade-in floating text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            DISCOVER AND RIDE THE WAVE OF <br />{' '}
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              AI AUTOMATION
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Seaside AI will streamline your operations and elevate growth with a tailored AI strategy, workflow automations, and seamless integrations.
          </p>
          <div className="mt-10 flex justify-center">
            <button 
              onClick={scrollToServices}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all flex items-center group"
            >
              Learn More <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Services
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Bot size={32} />,
                title: "AI Chat Assistant",
                description: "Build intelligent conversational agents that enhance customer engagement and support."
              },
              {
                icon: <MessageSquareCode size={32} />,
                title: "AI Workflow Automation",
                description: "Reduce manual work and eliminate repetitive tasks with efficient, personalised automation."
              },
              {
                icon: <Building2 size={32} />,
                title: "Strategic Consultancy",
                description: "Expert guidance on understanding AI’s potential for your business and how to strategically implement tailored solutions."
              },
              {
                icon: <Code2 size={32} />,
                title: "AI Website Development",
                description: "Create smart, responsive websites powered by cutting-edge AI technology."
              }
            ].map((service, index) => (
              <div 
                key={index}
                onClick={handleContact}
                className="service-card p-8 rounded-xl group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-gray-900 mb-4 bg-gray-50 p-3 rounded-xl w-fit">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <div className="mt-4 text-gray-900 flex items-center opacity-0 group-hover:opacity-100 transition-all">
                  Learn more <ArrowRight className="ml-2" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Time to Elevate Your Business with AI</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule a free intake call and see what AI can do for you.
          </p>
          <button 
            onClick={handleContact}
            className="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all"
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <a 
            href="https://www.linkedin.com/company/seaside-ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <Linkedin size={24} />
          </a>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>&copy; 2024 Seaside AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactForm />} />
    </Routes>
  );
}

export default App;