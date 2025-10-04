import Banner from "./Banner";
import InfoSection from "./InfoSection";
import Footer from "./Footer";

export default function HomePage() {
  return (
    <div>
      {/* Banner */}
      <section id="banner">
        <Banner />
      </section>

      {/* Map Section */}
      <section id="map" className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold">MAP Section</h1>
      </section>

      {/* Carbon Footprint Section */}
      <section id="carbon-footprint">
        <InfoSection />
      </section>

      {/* Activity Section */}
      <section id="activity" className="h-screen flex items-center justify-center bg-gray-200">
        <h1 className="text-4xl font-bold">Activity Section</h1>
      </section>

      <Footer />
    </div>
  );
}
