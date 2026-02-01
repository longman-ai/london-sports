import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function SubmitSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-10 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Submission Received!
            </h1>

            {/* Description */}
            <p className="text-slate-600 mb-8 leading-relaxed">
              Thank you for submitting your sports group. Our team will review it and publish it to the site within 24 hours.
            </p>

            {/* What's Next */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-left">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What happens next?
              </h3>
              <ul className="text-sm text-blue-700 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  We'll review your submission for accuracy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Your group will be published within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Players can then find and join your group
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/browse"
                className="block w-full px-6 py-3.5 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
              >
                Browse Groups
              </Link>
              <Link
                href="/submit"
                className="block w-full px-6 py-3.5 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 font-semibold transition-all"
              >
                Submit Another Group
              </Link>
            </div>
          </div>

          {/* Confetti Effect (decorative) */}
          <div className="flex justify-center gap-4 mt-8">
            <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🎉</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '100ms' }}>🏆</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '200ms' }}>⚽</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
