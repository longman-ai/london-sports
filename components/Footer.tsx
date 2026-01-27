export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} London Sports Community</p>
        </div>
      </div>
    </footer>
  );
}
