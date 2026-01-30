import { redirect } from "next/navigation"

export default function SubmitGroupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submit a Sports Group
          </h1>
          <p className="text-gray-600">
            Help grow the London sports community by adding your group
          </p>
        </div>

        <form
          action="/api/submit-group"
          method="POST"
          className="bg-white shadow-md rounded-lg p-8 space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Group Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Camden Running Club"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="sport"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sport *
              </label>
              <select
                id="sport"
                name="sport"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a sport</option>
                <option value="Football">Football</option>
                <option value="Running">Running</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Badminton">Badminton</option>
                <option value="Cricket">Cricket</option>
                <option value="Rugby">Rugby</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Yoga">Yoga</option>
                <option value="Climbing">Climbing</option>
                <option value="Padel">Padel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="borough"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Borough *
              </label>
              <select
                id="borough"
                name="borough"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="venue"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Venue/Location *
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Regent's Park"
              />
            </div>

            <div>
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Area *
              </label>
              <input
                type="text"
                id="area"
                name="area"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., North London"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Skill Level *
            </label>
            <select
              id="level"
              name="level"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select skill level</option>
              <option value="Beginner">Beginner - New to the sport</option>
              <option value="Intermediate">Intermediate - Some experience</option>
              <option value="Advanced">Advanced - Experienced players</option>
              <option value="Mixed">Mixed - All levels welcome</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about your group - when you meet, what makes it special, etc."
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Info *
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email, phone, or how to join"
            />
          </div>

          <div>
            <label
              htmlFor="sourceUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Website/Social Media (optional)
            </label>
            <input
              type="url"
              id="sourceUrl"
              name="sourceUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              Submit Group
            </button>
            <a
              href="/"
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium text-center"
            >
              Cancel
            </a>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Your submission will be reviewed by our team before being published
          </p>
        </form>
      </div>
    </div>
  )
}
