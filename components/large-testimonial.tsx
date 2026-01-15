import Image from "next/image";
import TestimonialImg from "@/public/images/large-testimonial.jpg";

export default function LargeTestimonial() {
  return (
    <section id="instructions">
      <div className="mx-auto max-w-5xl "
            data-aos="zoom-y-out"
            data-aos-delay={600}>
        <div
          className="relative  rounded-xl bg-indigo-400 px-5 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,theme(colors.slate.300/.8),transparent)1]"
          data-aos="zoom-y-out"
          data-aos-delay={600}
        >
           <h1
              className="mb-6 py-5 border-y text-4xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-4xl text-center text-white"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              ¿Como funciona?
            </h1>   
            <div className="text-2xl font-bold w-1/3 text-white ">
        <h1 className="text-center">1. Elige un paquete</h1>
        
        </div>       
        </div>
      </div>

      <div className="p-10"></div>
    </section>
  );
}
