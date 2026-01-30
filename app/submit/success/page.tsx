export default function SubmitSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Submission Received!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for submitting your sports group. Our team will review it and
          publish it to the site shortly.
        </p>

        <div className="space-y-3">
          <a
            href="/"
            className="block w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-medium"
          >
            Browse Groups
          </a>
          <a
            href="/submit"
            className="block w-full px-6 py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 font-medium"
          >
            Submit Another Group
          </a>
        </div>
      </div>
    </div>
  )
}
