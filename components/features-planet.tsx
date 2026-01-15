import Image from "next/image";
import PlanetImg from "@/public/images/planet.png";
import PlanetOverlayImg from "@/public/images/planet-overlay.svg";
import PlanetTagImg01 from "@/public/images/planet-tag-01.png";
import PlanetTagImg02 from "@/public/images/planet-tag-02.png";
import PlanetTagImg03 from "@/public/images/planet-tag-03.png";
import PlanetTagImg04 from "@/public/images/planet-tag-04.png";

export default function FeaturesPlanet() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20">
      <div className="mx-auto ">
      <h1     className="pt-11 font-serif m-3  text-4xl  text-black text-center"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
            Funciones Avanzadas             
            </h1>
        <div className="">
          {/* Section header */}
          <div className="mx-auto max-w-2xl">
          <img className=" data-aos="zoom-y-out  items-center 
              data-aos-delay={150} alt=""  height="335" width="640" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiTr9JkoLiyvo2muN95GL17tGFU-8eBYfu6phwymng1YfNBUbFERo-0cN6B5muwA9grFrxprcZvjO8pZP2Wn5YYbdsBommOpJLM1xhaM5CFwJfELfnyhXo_NFXK4I5e3VBZGFwuFhTRcxXzTA31twAXRsIX5TkoCcgI4_p3f6U2Y7SIXNvZ1qLp8JxHSbw/s1600/Green%20Graphic%20New%20Arrivals%20Website%20Homepage%20Banner%20%288%29.png"/>          
          </div>
        </div>
      </div>
    </section>
  );
}
