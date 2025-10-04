export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <p>© {new Date().getFullYear()} Carbon Lens. All rights reserved.</p>
        <p className="hover:text-green-400 cursor-pointer">Privacy Policy</p>
      </div>
    </footer>
  );
}
