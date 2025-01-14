import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold max-w-3xl mb-12">
            About Studio
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
              <p className="text-neutral-600 mb-6">
                We believe in the power of minimalist design to create impactful digital
                experiences. Our approach combines aesthetic simplicity with functional
                excellence, ensuring every project we deliver exceeds expectations.
              </p>
              <p className="text-neutral-600">
                Founded in 2023, our studio has worked with clients across various
                industries, helping them achieve their digital goals through thoughtful
                design and strategic thinking.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="space-y-4 text-neutral-600">
                <li>
                  <strong className="text-black">Simplicity:</strong> We believe less is more
                  and focus on what truly matters.
                </li>
                <li>
                  <strong className="text-black">Quality:</strong> We never compromise on
                  quality and attention to detail.
                </li>
                <li>
                  <strong className="text-black">Innovation:</strong> We stay ahead of
                  digital trends and technologies.
                </li>
                <li>
                  <strong className="text-black">Impact:</strong> We create designs that
                  make a real difference for our clients.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}