import Image from "next/image";
import Banner from "./home/Banner";
import InfoSection from "./home/InfoSection";
import Footer from "./home/Footer";
import ActivitySection from "./home/ActivitySection";
import MapView from "./home/MapView";
import Page from "./page2"

export default function Home() {
  return (
    <>
      <div>
        <section id="banner">
          <Banner />
        </section>
        <section >
          <Page />
        </section>
        <section id="map">
          <MapView />
        </section>


        <section id="carbon-footprint">
          <InfoSection />
        </section>

        <section id="activity">
          <ActivitySection />
        </section>

        <Footer />
      </div>
    </>
  );
}
