import SportSelector from '@/components/SportSelector';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-sm font-semibold text-blue-700">
              Connect with players across London
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900">
            Find Your Sport <br className="hidden md:block" />
            <span className="text-blue-600">in London</span>
          </h1>
          <div className="flex justify-center">
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl text-center leading-relaxed mb-4">
              Join local sports groups and communities. From football to padel, connect with players near you.
            </p>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Local groups across London • No sign-up required
          </p>
        </div>

        {/* Popular near you - Quick access with premium interactions */}
        <div className="mb-14">
          <h2 className="text-lg font-semibold text-slate-900 mb-5 text-center">
            Popular near you
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8 px-4">
            <a
              href="/padel-westminster"
              className="px-5 py-3 bg-white border-2 border-slate-200 rounded-full text-sm font-medium text-slate-900 hover:border-blue-500 hover:text-blue-600 hover:shadow-md active:scale-95 transition-all duration-200 touch-manipulation min-h-[44px] flex items-center"
            >
              🎾 Padel in Westminster
            </a>
            <a
              href="/running-camden"
              className="px-5 py-3 bg-white border-2 border-slate-200 rounded-full text-sm font-medium text-slate-900 hover:border-blue-500 hover:text-blue-600 hover:shadow-md active:scale-95 transition-all duration-200 touch-manipulation min-h-[44px] flex items-center"
            >
              🏃 Running in Camden
            </a>
            <a
              href="/football-hackney"
              className="px-5 py-3 bg-white border-2 border-slate-200 rounded-full text-sm font-medium text-slate-900 hover:border-blue-500 hover:text-blue-600 hover:shadow-md active:scale-95 transition-all duration-200 touch-manipulation min-h-[44px] flex items-center"
            >
              ⚽ Football in Hackney
            </a>
            <a
              href="/tennis-kensington-chelsea"
              className="px-5 py-3 bg-white border-2 border-slate-200 rounded-full text-sm font-medium text-slate-900 hover:border-blue-500 hover:text-blue-600 hover:shadow-md active:scale-95 transition-all duration-200 touch-manipulation min-h-[44px] flex items-center"
            >
              🎾 Tennis in Kensington & Chelsea
            </a>
          </div>
        </div>

        {/* Guiding question */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            What do you feel like playing today?
          </h2>
        </div>

        <SportSelector />
      </main>

      <Footer />
    </div>
  );
}
