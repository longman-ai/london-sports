import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function SubmitGroupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white w-full flex justify-center">
        <div className="w-full max-w-4xl px-6 sm:px-8 lg:px-12 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-2xl">🏆</span>
            <span className="text-sm font-semibold">Free listing for all groups</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Add Your Sports Group
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Help players discover your group. Fill out the form below and we'll review your submission within 24 hours.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-3xl px-6 sm:px-8 lg:px-12 py-10 md:py-12">
        <form
          action="/api/submit-group"
          method="POST"
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-10"
        >
          {/* Group Name */}
          <div className="mb-8">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Group Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 font-medium placeholder-slate-400"
              placeholder="e.g., Camden Running Club"
            />
          </div>

          {/* Sport & Borough */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                htmlFor="sport"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Sport <span className="text-red-500">*</span>
              </label>
              <select
                id="sport"
                name="sport"
                required
                className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 font-medium appearance-none bg-white cursor-pointer"
              >
                <option value="">Select a sport</option>
                <option value="Football">⚽ Football</option>
                <option value="Running">🏃 Running</option>
                <option value="Basketball">🏀 Basketball</option>
                <option value="Tennis">🎾 Tennis</option>
                <option value="Badminton">🏸 Badminton</option>
                <option value="Cricket">🏏 Cricket</option>
                <option value="Rugby">🏉 Rugby</option>
                <option value="Cycling">🚴 Cycling</option>
                <option value="Swimming">🏊 Swimming</option>
                <option value="Yoga">🧘 Yoga</option>
                <option value="Climbing">🧗 Climbing</option>
                <option value="Padel">🎾 Padel</option>
                <option value="Other">🏅 Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="borough"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Borough <span className="text-red-500">*</span>
              </label>
              <select
                id="borough"
                name="borough"
                required
                className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 font-medium appearance-none bg-white cursor-pointer"
              >
                <option value="">Select a borough</option>
                <option value="Camden">📍 Camden</option>
                <option value="Westminster">📍 Westminster</option>
                <option value="Hackney">📍 Hackney</option>
                <option value="Tower Hamlets">📍 Tower Hamlets</option>
                <option value="Islington">📍 Islington</option>
                <option value="Lambeth">📍 Lambeth</option>
                <option value="Southwark">📍 Southwark</option>
                <option value="Greenwich">📍 Greenwich</option>
                <option value="Lewisham">📍 Lewisham</option>
                <option value="Wandsworth">📍 Wandsworth</option>
                <option value="Hammersmith and Fulham">📍 Hammersmith and Fulham</option>
                <option value="Kensington and Chelsea">📍 Kensington and Chelsea</option>
                <option value="Other">📍 Other</option>
              </select>
            </div>
          </div>

          {/* Venue & Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                htmlFor="venue"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Venue/Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                required
                className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 font-medium placeholder-slate-400"
                placeholder="e.g., Regent's Park"
              />
            </div>

            <div>
              <label
                htmlFor="area"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Area <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="area"
                name="area"
                required
                className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 font-medium placeholder-slate-400"
                placeholder="e.g., North London"
              />
            </div>
          </div>

          {/* Skill Level */}
          <div className="mb-8">
            <label
              htmlFor="level"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Skill Level <span className="text-red-500">*</span>
            </label>
            <select
              id="level"
              name="level"
              required
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 font-medium appearance-none bg-white cursor-pointer"
            >
              <option value="">Select skill level</option>
              <option value="Beginner">🌱 Beginner - New to the sport</option>
              <option value="Intermediate">📈 Intermediate - Some experience</option>
              <option value="Advanced">🏆 Advanced - Experienced players</option>
              <option value="Mixed">🤝 Mixed - All levels welcome</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 font-medium placeholder-slate-400 resize-none"
              placeholder="Tell us about your group - when you meet, what makes it special, etc."
            />
            <p className="text-sm text-slate-500 mt-2">
              A good description helps players find and join your group
            </p>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <label
              htmlFor="contact"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Contact Info <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              required
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 font-medium placeholder-slate-400"
              placeholder="Email, phone, or how to join"
            />
          </div>

          {/* Website */}
          <div className="mb-10">
            <label
              htmlFor="sourceUrl"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Website/Social Media <span className="text-slate-400">(optional)</span>
            </label>
            <input
              type="url"
              id="sourceUrl"
              name="sourceUrl"
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 font-medium placeholder-slate-400"
              placeholder="https://..."
            />
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 pt-8 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold text-lg shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
              >
                Submit Group
              </button>
              <Link
                href="/"
                className="px-8 py-4 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 font-semibold text-center transition-all"
              >
                Cancel
              </Link>
            </div>
          </div>

          {/* Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-700">
              Your submission will be reviewed by our team before being published. This usually takes less than 24 hours.
            </p>
          </div>
        </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
