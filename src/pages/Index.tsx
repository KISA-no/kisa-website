import { Navbar } from '@/components/kisa/Navbar';
import { Hero } from '@/components/kisa/Hero';
import { Problems } from '@/components/kisa/Problems';
import { AIRiskAssessment } from '@/components/kisa/AIRiskAssessment';
import { Process } from '@/components/kisa/Process';
import { Solutions } from '@/components/kisa/Solutions';
import { ValueProps } from '@/components/kisa/ValueProps';
import { EUComplianceBrief } from '@/components/kisa/EUComplianceBrief';
import { TargetAudience } from '@/components/kisa/TargetAudience';
import { CTABanner } from '@/components/kisa/CTABanner';
import { Footer } from '@/components/kisa/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-paper-light font-sans selection:bg-brand/20 selection:text-brand-dark">
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <AIRiskAssessment />
        <Process />
        <Solutions />
        <ValueProps />
        <EUComplianceBrief />
        <TargetAudience />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

