"use client";
import Image from "next/image";
import Stripes from "@/public/images/stripes-dark.svg";
import Link from 'next/link';
import { useState } from 'react';

const islands = [
  {
    name: 'Paquete Básico',
    description: 'Ideal para eventos sencillos y prácticos.', 
    description2: '$100', 
    description3: 'Diseño de plantilla.',
    description4: 'Cuenta regresiva, GPS, Itinerario, RSVP.', 
    description5: 'Soporte técnico.', 
    description6: 'Entrega programada.', 
    link: 'https://wa.me/524462562451',
  },
  {
    name: 'Paquete Clásico',
    description: 'Perfecto para eventos con funcionalidades esenciales.', 
    description2: '$500', 
    description3: 'Diseño de galería personalizado.',
    description4: 'Funcionalidades del Plan básico +  mesas de regalos, galería de fotos.', 
    description5: 'Soporte técnico prioritario.', 
    description6: 'Entrega en 72 horas.', 
    link: 'https://wa.me/524462562451',
  },
  {
    name: 'Paquete Premium',
    description: 'Para quienes buscan una experiencia completa y personalizada.', 
    description2: '$1,500', 
    description3: 'Consultor de diseño personal. ',
    description4: 'Funcionalidades del Plan Clásico + servicios complementarios.', 
    description5: 'EnviaUbi Rewind (resumen digital del evento).', 
    description6: 'Mensajes personalizados.', 
    link: 'https://wa.me/524462562451',}
];

export default function Modelos() {
  const [selectedIsland, setSelectedIsland] = useState(islands[0]);


  return (
    <section id="pricing">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative aspect-video rounded-xl bg-indigo-950 px-5 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,theme(colors.slate.300/.8),transparent)1]"
          data-aos="zoom-y-out"
          data-aos-delay={600}
        >
          {/* Glow */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] border-indigo-400 blur-3xl" />
          </div>
          {/* Stripes illustration */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src={Stripes}
              width={768}
              height={432}
              alt="Stripes"
            />
          </div>
          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="text-center mb-1 border-y text-4xl font-bold text-gray-100 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.7),transparent)1] md:text-4xl">
            Precios</h2>
            
            <div className="flex justify-center items-center p-5">
            <div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-y-6  ">
        
        <div className="rounded-3xl  bg-white/90 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:p-10 lg:mx-0  lg:rounded-bl-3xl">
          <h2 className="text-base/7 font-semibold text-indigo-600">{selectedIsland.name}</h2>
          <p className="text-3xl font-semibold tracking-tight text-gray-900 ">{selectedIsland.description2}           
          <span className=" text-base text-gray-500"> / Pago unico</span></p>
          <p className="mt-6 text-base/7 text-gray-600">{selectedIsland.description}</p>
          <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10">
        <li className="flex gap-x-3">
          <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
          </svg>
          <p className="">{selectedIsland.description3}</p>
        </li>
        <li className="flex gap-x-3">
          <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
          </svg>
          <p className="">{selectedIsland.description4}</p>

        </li>
        <li className="flex gap-x-3">
          <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
          </svg>
          <p className="">{selectedIsland.description5}</p>
        </li>
        <li className="flex gap-x-3">
          <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
          </svg>
          <p className="">{selectedIsland.description6}</p>
        </li>
      </ul>

      <div className="flex justify-center items-center translate-y-7 m-2">
        <Link href={selectedIsland.link} className=" relative inline-flex items-center btn group mb-4 w-full bg-gradient-to-t from-indigo-200 to-indigo-300 bg-[length:100%_100%] bg-[bottom] text-black shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto">
            Comprar Ahora
            </Link>
        </div>
            
        </div>

            </div>
            </div>
        
        <div className="flex justify-center items-center">
        <div className="inline-flex rounded-md shadow-sm mt-4 items-center justify-center" role="group">
          {islands.map((island, index) => (
        <button
          key={index}
          type="button"
          className={`m-1 px-4 py-4 text-sm font-medium   border border-gray-50 rounded-md flex bg-gray-200
          } hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-50 dark:border-gray-100 dark:text-black dark:hover:text-black dark:hover:bg-gray-300 dark:focus:ring-blue-500 dark:focus:text-black`}
          onClick={() => setSelectedIsland(island)}
        >
          
          <div className="flex flex-col ">
          {island.name}
          </div>
          
        </button>
          ))}
        </div>
        </div>
        
          </div>
        </div>
      </div>
    </section>
  );
}
