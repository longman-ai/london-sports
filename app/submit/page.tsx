import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function SubmitGroupPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero */}
      <div className="bg-stone-900 text-white w-full flex justify-center">
        <div className="w-full max-w-3xl px-5 sm:px-8 py-10 md:py-14 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Add Your Sports Group</h1>
          <p className="text-stone-400">
            Free listing · Reviewed within 24 hours
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-2xl px-5 sm:px-8 py-8 md:py-10">
          <form
            action="/api/submit-group"
            method="POST"
            className="bg-white rounded-xl border border-stone-200 p-6 md:p-8 shadow-sm"
          >
            {/* Group Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
                Group Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text" id="name" name="name" required
                className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900 placeholder-stone-400"
                placeholder="e.g., Camden Running Club"
              />
            </div>

            {/* Sport & Borough */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="sport" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Sport <span className="text-red-500">*</span>
                </label>
                <select id="sport" name="sport" required
                  className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900 appearance-none bg-white cursor-pointer"
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
                <label htmlFor="borough" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Borough <span className="text-red-500">*</span>
                </label>
                <select id="borough" name="borough" required
                  className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Select a borough</option>
                  <option value="Camden">Camden</option>
                  <option value="Westminster">Westminster</option>
                  <option value="Hackney">Hackney</option>
                  <option value="Tower Hamlets">Tower Hamlets</option>
                  <option value="Islington">Islington</option>
                  <option value="Lambeth">Lambeth</option>
                  <option value="Southwark">Southwark</option>
                  <option value="Greenwich">Greenwich</option>
                  <option value="Lewisham">Lewisham</option>
                  <option value="Wandsworth">Wandsworth</option>
                  <option value="Hammersmith and Fulham">Hammersmith and Fulham</option>
                  <option value="Kensington and Chelsea">Kensington and Chelsea</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Venue & Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="venue" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Venue/Location <span className="text-red-500">*</span>
                </label>
                <input type="text" id="venue" name="venue" required
                  className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900 placeholder-stone-400"
                  placeholder="e.g., Regent's Park"
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Area <span className="text-red-500">*</span>
                </label>
                <input type="text" id="area" name="area" required
                  className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900 placeholder-stone-400"
                  placeholder="e.g., North London"
                />
              </div>
            </div>

            {/* Level */}
            <div className="mb-6">
              <label htmlFor="level" className="block text-sm font-medium text-stone-700 mb-1.5">
                Skill Level <span className="text-red-500">*</span>
              </label>
              <select id="level" name="level" required
                className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900 appearance-none bg-white cursor-pointer"
              >
                <option value="">Select skill level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Mixed">All levels welcome</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-stone-700 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea id="description" name="description" required rows={4}
                className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900 placeholder-stone-400 resize-none"
                placeholder="When you meet, what to expect, how to join..."
              />
            </div>

            {/* Contact */}
            <div className="mb-6">
              <label htmlFor="contact" className="block text-sm font-medium text-stone-700 mb-1.5">
                Contact Info <span className="text-red-500">*</span>
              </label>
              <input type="text" id="contact" name="contact" required
                className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900 placeholder-stone-400"
                placeholder="Email, phone, or WhatsApp link"
              />
            </div>

            {/* Website */}
            <div className="mb-8">
              <label htmlFor="sourceUrl" className="block text-sm font-medium text-stone-700 mb-1.5">
                Website <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <input type="url" id="sourceUrl" name="sourceUrl"
                className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900 placeholder-stone-400"
                placeholder="https://..."
              />
            </div>

            {/* Actions */}
            <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row gap-3">
              <button type="submit"
                className="flex-1 px-6 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 font-semibold text-sm transition-colors"
              >
                Submit Group
              </button>
              <Link href="/"
                className="px-6 py-3 text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200 font-medium text-sm text-center transition-colors"
              >
                Cancel
              </Link>
            </div>

            {/* Notice */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-3.5 mt-6 flex items-start gap-2.5">
              <span className="text-stone-400 text-sm mt-0.5">ℹ️</span>
              <p className="text-xs text-stone-500 leading-relaxed">
                Submissions are reviewed before going live. This usually takes less than 24 hours.
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
