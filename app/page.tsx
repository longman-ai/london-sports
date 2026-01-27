import SportSelector from '@/components/SportSelector';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="text-center mb-20">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-sm font-semibold text-blue-700">
              Connect with players across London
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900">
            Find Your Sport <br className="hidden md:block" />
            <span className="text-blue-600">in London</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed text-center">
            Join local sports groups and communities. From football to padel, connect with players near you.
          </p>
        </div>

        <SportSelector />
      </main>

      <Footer />
    </div>
  );
}
