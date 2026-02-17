import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/kisa/Navbar';
import { Footer } from '@/components/kisa/Footer';
import { EUCompliance } from '@/components/kisa/EUCompliance';

const AILovenPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand/20 selection:text-brand-dark">
      <Navbar />
      <main className="pt-32 pb-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-light hover:text-brand transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />Tilbake til forsiden
            </Link>
          </div>
        </div>
        <EUCompliance />
      </main>
      <Footer />
    </div>
  );
};

export default AILovenPage;
