import Image from "next/image";
import Banner from "./home/Banner";
import InfoSection from "./home/InfoSection";
import Footer from "./home/Footer";
import ActivitySection from "./home/ActivitySection";


export default function Home() {
  return (
   <>
       <div>
      <section id="banner">
        <Banner />
      </section>

<div className="w-full max-w-7xl rounded-xl shadow-lg overflow-hidden m-auto">
  <iframe
    src="https://waqi.info/#/c/18.36/71.447/6.1z"
    className="w-full h-[500px]"
    title="Air Quality Map"
    frameBorder="0"
  ></iframe>
</div>


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
