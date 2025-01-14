import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CardGrid from '@/components/CardGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CardGrid />
      </main>
      <Footer />
    </>
  );
}