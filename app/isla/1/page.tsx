
"use client";
import 'add-to-calendar-button';
import { Monsieur_La_Doulaise, Fraunces } from 'next/font/google';
import ImageSlider from '@/components/slider';
import { motion } from "framer-motion";
import { useState, useEffect, useRef  } from 'react';

const monsieurLaDoulaise = Monsieur_La_Doulaise({
  subsets: ['latin'],
  weight: '400', // Ajusta según tus necesidades
  display: 'swap', // Optimización de carga
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: '400', // Ajusta según tus necesidades
  display: 'swap', // Optimización de carga
});




export default function ScrollColorChange() {
  const [bgColor, setBgColor] = useState("#ffffff"); // Color inicial
  const targetRef = useRef(null); // Referencia a la sección objetivo

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setBgColor("#FCE7F3"); // Cambia el color al intersectar
        } else {
          setBgColor("#ffffff"); // Regresa al estado inicial
        }
      },
      {
        root: null, // Usa el viewport como contenedor
        threshold: 1.0, // 50% del elemento debe ser visible
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
    <>
    <div className="bg-[#fbfdff]">
    <meta property='og:title' content='Boda | Olivia & Jorge'/>
    <meta property='og:image' content='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRNmKVcIcsuaiOkYYkBfuC2gVWVPwLhIJqs7ytuzp0JGm-nCOtleWSbGOzb_smKcC2aLdCmf4AVhVSDQoy2emQPeVYNEjq7Gqb83whTujcdffzY88Xy92Y-mmyH6TOZm-6y5rcCwbnnK_wgeyGIkuwSVXHBVAu7aqbG479LDCwEAlqxM8I2xPNTYajHq0/s1600/Estas%20invitado%20%285%29.png'/>
    <meta property='og:description' content='Una noche mágica nos espera, y tu presencia la hará aún más especial.'/>
    <meta property='og:url' content='EnviaUbi.com'/>
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='627' />

      <script src="https://cdn.jsdelivr.net/npm/add-to-calendar-button@2" async defer></script>
    

    <div>
    {/* Imagen de fondo + componentes de datos y calendario */}      
    <div className="w-full  overflow-hidden">
  <div
    className="w-full h-[500px] lg:h-[650px] bg-cover bg-center bg-no-repeat" 
    style={{
      backgroundImage: `url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5M6IYRjiovXnjOWvLCC6q3qjzzZwX9Cy_jBV_35KTdADV9acLI_D2DvVT-y-5zEERnOhHvViQ8p83_CiWLbAn_L5pL394knE-VhCfhllyrNIpwo8Je77ETcWpD7Kj69RREvS4GL3EwDQc0RKk2F1dF_6qt1wlzwqqr3_7aRRwsNJucG-Dbnw900M7GQ4/s1600/White%20Cream%20Photo%20Wedding%20Invitation.png')`,
    }}
  >
    


  
      </div>
      
    {/* Separador */}    
    <div className="text-center -mt-40 p-16 lg:-mt-5 md:translate-y-20  md:bg-[#fafffa]  lg:-translate-y-20">
      <img
      className=" sm:hidden w-screen h-screen -rotate-90 sm:-mt-8 -translate-y-60 "
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrvFDlIKKOSEYdHUx1RV1SIHmBkO2OR-wFutNJ2kTW2EOpRJqKzEHe4Av3vyZTvxBDEM8sFhDhEO5WWob49nfMA4y_MaD7uFtnNLTQgtSemNMLoaM24Y0aqhKdZMdMkuQGgGfBH3-547hMcuqFxa25lnQk3jmNezRg7WLvdHqIxMyt9TdUbuY4l7LQUqA/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2818%29.png"
      alt="separador "
      />
      <div className={`${monsieurLaDoulaise.className} text-7xl text-slate-950 sm:mt-0  md:p-10 md:translate-y-20 -mt-96 -translate-y-80 md:-mt-40 relative`} data-aos="fade" data-aos-delay="300">
        <div className="hidden md:block absolute inset-0 bg-[600px] opacity-50"></div>
        <div className="relative">
          Olivia & <br />Jorge
        </div>
        

         {/* Audio Player */}
    <div>
      <div className="translate-y-10  flex items-center justify-center">
      <div className="text-center">
        <button
          onClick={togglePlayPause}
          className="bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full p-6 shadow-lg
                   transition-all duration-200 transform hover:scale-110"
        >
          {isPlaying ? (
            // Icono de pausa
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            // Icono de play
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
        
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)}>
          <source src="/102.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>
    </div>
      </div>

        {/* fecha */}
    <div className=' '>
    <div className=" p-5 m-5 flex flex-col items-center justify-center">
      <img className="w-80" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKIA8iI0OQfPJy_aeZGqm7wpoDGOW8tZ0W02CplCGnE-v4WAIdDuDef0g52w4v6nh1gxhD86iTmC0TwXea226J8X3MoK4fkrAPkIixkctoPqCF5A32yUU4jFufppK3stzKw48Ab9NcCcPbEmrVfV2MOaBu33pTzTKnn1yTy_76jpkkKjpVhsHjH5YEBU4/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2813%29.png" alt="Solo Falta" />
      <br />
      <div>
        <div className='text-center font-serif  text-black -m-2 text-2xl'>Sabado</div> 
        <div className={`${monsieurLaDoulaise.className} text-center text-7xl`}>
        25
        </div>
        <div className='text-center font-serif  text-black text-2xl'>Febrero</div> 
      </div>

      <img className="w-80 translate-y-14" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhThX6mNJcluD9QNYT87cMmC4hjcCELWK9G6Znm6oFf8QvTwnrqZHJiwKuq9Mmdd1IwJL52gKx4NohJwuBozXNfUdJdgQZJLxUwxD9-E1IIM21SPPNljoH-M_nZ8eJEdrn65PiJJYFsoMfs6sVBveqyau1JCCzWkauwDtOfQrizknkIVw2SPjAQXTPE7Mo/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2814%29.png" alt="Solo Falta" />
    </div>
    </div>
      </div>
    </div>   
    </div>
   
    {/* Separador y contador */}    
    <div className="relative justify-items-center -translate-y-64 p-10 md:translate-y-14  ">
  <div className=" flex flex-col justify-center items-center " data-aos="fade-up" data-aos-delay="600">
  <div className={`${monsieurLaDoulaise.className} text-center text-7xl translate-y-10`}>
        Solo falta
        </div>
        
    <img
      className="  md:w-60 lg:w-80 "
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJ_mtaVgR_8FPbWjj_n2SYbfslyYT3_AsKMwzzp0BSXshSYfZJ6w0U4DBUuzQtmvfcILIpNzcnlFXFP7qgQOhp1Ys3AM-03FPqnN27H8P3PWR35aKtAkzxmDb23BMub3vHyc8BZfgM_FeS8g-r1aUxaJ1HyJnN8FSkupe9SqEMlQ2_wxMz_WGDItthmY4/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2819%29.png"
      alt="separador"
    />
  </div>


  <div className="flex justify-center items-center  bg-[#f3fff4]  rounded-2xl" data-aos="fade-up" data-aos-delay="600">
    <div className="pointer-events-none">
      <iframe
        className="w-full max-w-md "
        src="https://www.tickcounter.com/widget/countdown/6425765"

        title="Contador de tiempo"
      ></iframe>
    </div>
  </div>
    </div>
    {/* Separador */}      
    <div className="flex justify-center h-60 ">
           <img
           className="-translate-y-56 md:translate-y-4 "
           src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhILF_n2fklvQJ86mHPRvgBQVX_-znS9-CcFv6XZyn4uIh54HW3TTZiWrua2CB1WDpMO5R6gMJ9xUaJD6NRVCBDZmsjvZMKDESCAANDSmJEFsk0o5nzEN62M8dYWXQYcvBefm2xZn8Re3G2MoZT6cAgyWcXdPXr3ZY4B3X9-hKV4eLCCSTVuv5XimfwKgM/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2816%29.png"
           alt="Imagen de separador vertical"
            />
    </div>
    {/* Ubicación */}       
    <div className="relative p-10">
      
    <div className=" flex flex-col justify-center items-center " data-aos="fade-up" data-aos-delay="600">
  <div className={`${monsieurLaDoulaise.className} text-center text-7xl translate-y-10`}>
        Ubicación
        </div>
        
    <img
      className="  md:w-60 lg:w-80 "
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCtLAnszppYMjehQyxS-Kzl5Xd3ndJkGtXyTzf3euuS7fMV3v00I8-Rebk0QVxGyOsCIf1B-xSmhvx0SD8sxdxohyphenhyphenn8QlxDUsuJ0Wt4eqWKW5hJIv1-S78K1XMAGVVKQ_E2b4GKpmT5jV3N8G6FvH9X_jp3jzKANxgX6w3ovcp_o61GZqfHEGERPHED0E/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2817%29.png"
      alt="separador"
    />
  </div>


    <div className="flex flex-wrap justify-center gap-5 p-4" data-aos="fade-up" data-aos-delay="600">

  <div className="bg-[#f5f9fc] flex flex-col shadow-xl border w-full sm:w-80 max-w-sm" data-aos="fade-up" data-aos-delay="600">
  <div className={`${fraunces.className} p-2 m-3 text-2xl text-slate-900 text-center`}>
  Ceremonia Religiosa
        </div>
    
    <div className="overflow-hidden rounded-md h-40 flex justify-center items-center">
      <img
        className="w-20"
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgWaaP1N6MvhL9if3GPpqIDuz_3CHl7xNn9rGzLULtK9eUXuWIG_Mve259ELWPUZEG5mxqHi3x7cQvEUDmVxMF5ae3ZhIDiNZzcIRZJXrx1r0Q4Ebu-vFhyphenhyphenxzJi6wldObtxz7y55VRwnwiDluucadriNuorrYeIGDatiWV5YxHeiczgPFLQUvQ4HVxQIpc/s1600/a%20%2813%29.png"
        alt="Iglesia"
      />
    </div>
    <div className={`${fraunces.className}p-2 text-center`}>
      <p className="text-sm  text-gray-950 uppercase">
        Sabado 26 de diciembre <br />
        17:30 HRS
      </p>
      <p className={`${fraunces.className} p-2 text-sm text-gray-950 mt-4 font-light`}>
        Parroquia de Nuestra Señora de la Luz <br />
        Av. de la Luz S/N, Santa Ana, 76116 Santiago de Querétaro, Qro.
      </p>
    </div>
    <div className="flex justify-center p-4 gap-2">
      <a
        href="https://www.google.com"
        className="text-gray-950 bg-[#d4ebf5] hover:bg-[#e2f6ff]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Ir a la Ubicación
      </a>
    </div>
  </div> 
  <div className="bg-[#f5f9fc] flex flex-col shadow-xl border  w-full sm:w-80 max-w-sm" data-aos="fade-up" data-aos-delay="600">
    <div className={`${fraunces.className} p-2 m-3 text-2xl text-gray-950 text-center `}>
      Recepción
    </div>
    <div className="overflow-hidden rounded-md h-40 flex justify-center items-center">
      <img
        className="w-20"
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgB3uF9PTjHg8gCf5nLVKk_rtjrue6OTi9xABTVpr6jUFs3sAb002YaY-R2yDb3dgugdC0295Bz3X5m9I34tSCTQrYiEUmWZch0A4MMoaI8pG27rZ-Xcw5McmP8FeVYdwHdSXPW3Ww8hTGZijzwQygDJbeGj33abtYX4y4AHLWipdvYMUxvG7VrJWCeVJI/s1600/a%20%2814%29.png"
        alt="Recepción"
      />
    </div>
    <div className={`${fraunces.className}p-2 text-center`}>
      <p className="text-sm text-gray-950 uppercase">
        Sabado 26 de diciembre <br />
        19:40 HRS
      </p>
      <p className={`${fraunces.className} p-2 text-sm text-gray-950 mt-4 font-light`}>
        Lantana Jardín y Salones <br />
        Fraccionamiento Pirámides, Unnamed Road, 76900 Corregidora, Qro.
      </p>
    </div>
    <div className="flex justify-center p-4 gap-2">
      <a
        href="https://www.google.com"
        className="text-gray-950 bg-[#d4ebf5] hover:bg-[#e2f6ff]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Ir a la Ubicación
      </a>
    </div>
  </div>
</div>
  

<div className="text-transparent p-8">
  ...
</div>

    </div>
    {/* Separador */}  
    <div className='relative flex justify-center '>
    <img
      className="w-6"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpdqmYPVdg9JyIwx2Q1Ji7pfrz3Fi2UGfMaL0oMo21qNfQ0xwMbt5D6hhwX6Ajwyw0esJrVwS3D3kUsRYIVNdinYI2rsHpuoWctXxOOIaoqAb6mz15NjVgzlw5K151iBXqs2ab8gYhH_MxJEt86pQRz3oTFJoZiBzm_EioWXpswiyFrbfVDcWG_BUel2k/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2820%29.png"
      alt="separador"
    />
    </div>
    {/* Galeria de fotos */}
    <div>
    <div className=' flex flex-col justify-center items-center " data-aos="fade-up" data-aos-delay="600" translate-y-20'>
    <div className={`${monsieurLaDoulaise.className} text-center text-6xl translate-y-10`}>
        Galeria de fotos
    </div>
    <img
      className="  md:w-60 lg:w-80 "
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyEC7T9sedGs9L7PtpLMLNJ07TGoC_F6VP3TQrPI4nbYkr34j7P8hSEAwasBFP56KYVy9RVBXtsi6TGX9ZUXZWlkyB_nYz3ruJVT2zzPej1Gn-qoGOTC5QqlPfzHgScUOsthYbTGjlmVpny1UDZuCQ0U-izd0JbRGYnEw2k95RFhxbWTZrs32OxL2d3TY/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2821%29.png"
      alt="separador"
    />
    
    </div>
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center ">
        <ImageSlider />
      </div>
    </div>
    </div>
    {/* Intinerario */}
    <div>
    <div className="flex flex-col items-center justify-center h-full text-white">
      <div className="flex flex-col justify-center items-center p-20 " data-aos="fade-up" data-aos-delay="600">
      <div className={`${monsieurLaDoulaise.className}   text-center text-6xl text-black  translate-y-10`}>
        Itinerario
      </div>
      <img
        className="md:w-60 lg:w-80 mt-4"
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizfvqWrpyPaYI2szgjjtBwbtvTuevo3DQUc1jE9jsDQ_CJmjNJAt_zItsXgqq406IJDJIy2w00sb_xRVjEJZxjNooY3FcsWNBEsMpa30J5J0i3g7M7l-wd9rADC7l1FSAhAi2UIJsrVOTbsFnGjD49qbaMVRd88oVcbMJ7JpUTAHbwKfSJLoNU4pnaw7M/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2826%29.png"
        alt="separador"
      />
      
      </div>
      </div>
    <div className="-translate-y-16">
      
      <div className=" justify-center items-center p-0  ">
      <div>
        
      <div
  ref={targetRef}
  className="flex flex-col justify-center items-center gap-4 py-4 bg-gray-50"
>
  <motion.div
    initial={{ backgroundColor: "#ffffff", color: "#000000" }}
    animate={{
      backgroundColor: bgColor,
      color: bgColor === "#ffffff" ? "#000000" : "#000000",
    }}
    transition={{ duration: 2, delay: 0 }}
    className="w-11/12 md:w-2/5 flex items-center rounded-lg shadow-md bg-white overflow-hidden"
  >
    <img
      className="h-16 w-16 p-2 border-r border-slate-900 object-cover"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhVz9OkNnvflPQ7afR1pi8hTgSrssrgSPuVZACYZGgEp98fQE55kB4xptp_egyum2AL4dSysO_cExycp3BUXWQadnrMiw0xoYEZnHtryGjHxViCyHTx3hY8mc9gMhmod9KgmV7bsqpZBsyC9wb_hSZboQy_emqzD9XNdNkCSci6YUH_Bmt_nMc0Fm44tQ/s1600/icons8-camara-de-manzana-50.png"
      alt="Sesión de fotos"
    />
    <div className="font-mono p-2 w-full text-sm">
      <div className="font-bold mb-1">Sesión de fotos con las damas de honor</div>
      <div className="text-gray-800">En casa de la novia.</div>
      <div className="text-gray-600 text-right mt-1">12:00 pm</div>
    </div>
  </motion.div>

  <motion.div
    initial={{ backgroundColor: "#ffffff", color: "#000000" }}
    animate={{
      backgroundColor: bgColor,
      color: bgColor === "#ffffff" ? "#000000" : "#000000",
    }}
    transition={{ duration: 2, delay: 1 }}
    className="w-11/12 md:w-2/5 flex items-center rounded-lg shadow-md bg-white overflow-hidden"
  >
    <img
      className="h-16 w-16 p-2 border-r border-slate-900 object-cover"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiF0NuFsqpAiThwmeUHZ3Xe60JAyji3MLFJxm1znzuM4Y5knPZwDxADM-U6EET502jFXSFjKF5zGPHevIdo9G-s0u4ovzZ3W-HkP7qhcutiY8azs4yPNGjxlhdiKpuHvDDu8DJJehoocGUzGOl8WsOBfpH0Sx3pKJwshHC2FuR4CdSRJ3yDnx_ixJ0p5IY/s1600/a%20%2815%29.png"
      alt="Reunión previa"
    />
    <div className="font-mono p-2 w-full text-sm">
      <div className="font-bold mb-1">Reunión previa</div>
      <div className="text-gray-800">En el lobby del hotel.</div>
      <div className="text-gray-600 text-right mt-1">1:30 pm</div>
    </div>
  </motion.div>

  <motion.div
    initial={{ backgroundColor: "#ffffff", color: "#000000" }}
    animate={{
      backgroundColor: bgColor,
      color: bgColor === "#ffffff" ? "#000000" : "#000000",
    }}
    transition={{ duration: 2, delay: 2 }}
    className="w-11/12 md:w-2/5 flex items-center rounded-lg shadow-md bg-white overflow-hidden"
  >
    <img
      className="h-16 w-16 p-2 border-r border-slate-900 object-cover"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3xuX8PemGaB7LmuKBT-BIC-5awhApNwT1ZwRxlApd6ppxccLztS-Up6-Okoyzp3VzRNQVQJDKif9mzK6FEips_TthUU3uLOt-JjbTQS_amlsKHJQaf4lrbfDRXFHnq__6dO3IwxDmW5qsfLD8S3VgW97lowXwuSz_VHXAZ_yjSOrZ0bJvi-I2INDf9TU/s1600/a%20%2816%29.png"
      alt="Reunión previa"
    />
    <div className="font-mono p-2 w-full text-sm">
      <div className="font-bold mb-1">Ceremonia religiosa</div>
      <div className="text-gray-800">En la capilla del hotel.</div>
      <div className="text-gray-600 text-right mt-1">2:30 pm</div>
    </div>
  </motion.div>
  
  <motion.div
    initial={{ backgroundColor: "#ffffff", color: "#000000" }}
    animate={{
      backgroundColor: bgColor,
      color: bgColor === "#ffffff" ? "#000000" : "#000000",
    }}
    transition={{ duration: 2, delay: 3 }}
    className="w-11/12 md:w-2/5 flex items-center rounded-lg shadow-md bg-white overflow-hidden"
  >
    <img
      className="h-16 w-16 p-2 border-r border-slate-900 object-cover"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiqzzgRBNaFPMyAn9Pg77g3SU1MkhHzPjKCY9JftQXB4SBtrUrInRrQfmTpSbvp7YVJw8aefcr4T4I2uedPo3CKqhtwrhF7qniT29gcjWHIFQroPbjZ7O-FHo0rSGm_QBOZe35EfSHG2KEGVEwwMwVhYLhJ7MIZIp3j4P9Z6HgNbDswf1dUDNWKUSCv7gM/s1600/a%20%2817%29.png"
      alt="Reunión previa"
    />
    <div className="font-mono p-2 w-full text-sm">
      <div className="font-bold mb-1">Recepción</div>
      <div className="text-gray-800">En el salón del hotel.</div>
      <div className="text-gray-600 text-right mt-1">3:00 pm</div>
    </div>
  </motion.div>

  <motion.div
    initial={{ backgroundColor: "#ffffff", color: "#000000" }}
    animate={{
      backgroundColor: bgColor,
      color: bgColor === "#ffffff" ? "#000000" : "#000000",
    }}
    transition={{ duration: 2, delay: 4 }}
    className="w-11/12 md:w-2/5 flex items-center rounded-lg shadow-md bg-white overflow-hidden"
  >
    <img
      className="h-16 w-16 p-2 border-r border-slate-900 object-cover"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhl-u7ts_eCg6OpHYqCqq1PpD_P7d98JWjK2HEDKH9-1-8T4SIDgV6o6k_2h0sX9dAEEk3cD9mgTGwBo9EjzHX9YDPEme5Dh0lIFNP2GxboyEZ9FccpKkX-CkuerI9qBQrX4OBTQviNXcSvI4uaI0-XbWhPLHM-fu-qtDBr1L9J45Hl_G2ZJ3FQ3bomB3Q/s1600/a%20%2818%29.png"
      alt="Reunión previa"
    />
    <div className="font-mono p-2 w-full text-sm">
      <div className="font-bold mb-1">Comida</div>
      <div className="text-gray-800">En el salón del hotel.</div>
      <div className="text-gray-600 text-right mt-1">4:00 pm</div>
    </div>
  </motion.div>

</div>



       
      </div>

      </div>
    </div>
    </div>
    {/* Información familiar mas fotos */}       
    <div className="flex flex-col items-center p-5">
    <div className=" flex flex-col justify-center items-center " data-aos="fade-up" data-aos-delay="600">
  <div className={`${monsieurLaDoulaise.className} text-center text-6xl translate-y-10`}>
  Nuestros padres
        </div>
        
    <img
      className="  md:w-60 lg:w-80 "
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgozxPbLkcfJQ5oHg-BdEch8KwHStCe22PXaemkaqQMc3rmAKyMD9dEPqul1-7blz94d0aV1hv8DAsd1jwole9vTmzOFi8pJkAoHVKWrp6p6u0XfB3ahFK6YRqfSWnuNx2UWZcB1vJaPKlQMDqZafdCxEaJGyKX_AtNFFIf-4mRuP3_HiemHu94OOp5x2U/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2828%29.png"
      alt="separador"
    />
    
  </div>
  <div className="relative flex flex-col-reverse md:flex-row shadow-sm rounded-lg justify-center max-w-screen-sm w-full" data-aos="flip-left" data-aos-delay="500">

    <div className="p-5 flex justify-center shadow-2xl">
      
      <img
        className="rounded-md md:rounded-lg max-w-xs"  
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgxRKzkzp415F-wGSqPdKDpTTfVz6GDmiBbGLq70OeUIi3fQujwl-PLLRQymi8X4_sSZRBDy-0ONVQb6P1OOtlcoOB8r97LIK0P2LrI9QLrA7lzfGDIJaMwUz9qHelrPQ1TeYesZtyczENhI9HdJeqzTizi54y4W5WKz4gNMNd4DYqMPNeIB27qt4ILLuY/s1600/a%20%2819%29.png"
        alt="card-image"
      />
    </div>

    <div className="p-4 flex flex-col items-center w-full max-w-md justify-center">
    
      <h4 className="mb-2 text-gray-900 text-3xl text-center font-serif">
       Miguel Hernández
      </h4>
      <h4 className="mb-2 text-yellow-700 text-4xl text-center font-serif">
        &
      </h4>
      <h4 className="mb-2 text-gray-900 text-3xl text-center font-serif">
      Ana Rodríguez
      </h4>
      
      <div className="absolute inset-0 -z-10 h-full w-full bg-yellow-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <h4 className="mb-2 text-gray-400 text-sm text-center font-mono uppercase">
        Padres de la novia
      </h4>
    </div>
    
  </div>

  <div className="relative flex flex-col md:flex-row shadow-sm rounded-lg justify-center max-w-screen-lg w-full" data-aos="flip-right" data-aos-delay="500">

  <div className="p-4 flex flex-col items-center w-full max-w-md justify-center">
    
    <h4 className="mb-2 text-gray-900 text-3xl text-center font-serif">
      Carlos López
    </h4>
    <h4 className="mb-2 text-yellow-700 text-4xl text-center font-serif">
      &
    </h4>
    <h4 className="mb-2 text-gray-900 text-3xl text-center font-serif">
      Sofía Ramírez
    </h4>
    
    <div className="absolute inset-0 -z-10 h-full w-full bg-yellow-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <h4 className="mb-2 text-gray-400 text-sm text-center font-mono uppercase">
      Padres del novio
    </h4>
  </div>

    <div className="p-5 flex justify-center shadow-2xl">
      <img
        className="rounded-md md:rounded-lg max-w-xs" 
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUi0hlxaQwsc-6oasCpODpVcxAUFS2ebinWxTLQDYP7efofuexgOfD76_g0cp9AMpUgXwkm8Nu5UpCjQpckLfNYULZ8SgUu9qfQk2_8q08CnnU-7mepF0tuBhSX7vO3rWJLThbcq-q0KNZJPWkb8WAE7kJMHTwJdOi8LtCRutTckynwKKMqv8k2ohVQhg/s1600/a%20%2820%29.png"
        alt="card-image"
      />
    </div>
  </div>
    </div>
    {/* Información familiar mas fotos */}       
    <div className=" items-center p-5">
    <div className=" flex flex-col justify-center items-center " data-aos="fade-up" data-aos-delay="600">
  <div className={`${monsieurLaDoulaise.className} text-center text-6xl translate-y-10`}>
  Padrinos
        </div>        
    <img
      className="  md:w-60 lg:w-80 "
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgozxPbLkcfJQ5oHg-BdEch8KwHStCe22PXaemkaqQMc3rmAKyMD9dEPqul1-7blz94d0aV1hv8DAsd1jwole9vTmzOFi8pJkAoHVKWrp6p6u0XfB3ahFK6YRqfSWnuNx2UWZcB1vJaPKlQMDqZafdCxEaJGyKX_AtNFFIf-4mRuP3_HiemHu94OOp5x2U/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2828%29.png"
      alt="separador"
    />
    
    </div>

  <div className="flex flex-row justify-center items-start space-x-3 ">
  <div className="flex flex-col h-80 items-center shadow-lg  w-1/3 bg-slate-50" data-aos="fade-up">
    <img
      className="m-1  w-32 h-32 md:w-40 md:h-40 object-cover rounded-t-full md:rounded-full border-stone-500 border-4"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEihm3QlZ5yMmYJwZ-7f3MtQjo1VhpBBIGcZzFV4LqSGuv36Upwg_37PRi5_wUggYC1jUQAxDd6tqJPRckR9QdbSWIgf6ryLmic5Q4kb_wjbTQib3Wo4TrNJavHhZ88QpGlNx7WcnBmaGcW-2Gwm_TF4kcbPhdMYD8KxJXdnMw27HfJc1_Z-xSXNaRS0VY4/s1600/a%20%2821%29.png"
      alt="card-image"
    />
    <div className="p-4 text-center">
      <p className="text-gray-900 text-xl font-serif">Roberto</p>
      <p className="text-yellow-700 text-lg font-serif">&</p>
      <p className="text-gray-900 text-xl font-serif">Claudia</p>
      <p className="text-gray-400 text-xs uppercase font-mono">Padrinos de Velación</p>
    </div>
  </div>
  <div className="flex flex-col h-80 items-center shadow-lg  w-1/3 bg-slate-50" data-aos="fade-up">
    <img
      className="m-1  w-32 h-32 md:w-40 md:h-40 object-cover rounded-t-full md:rounded-full border-stone-500 border-4"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEit2ihRc6Qoo1ecymOd77y0DpQM9Gu0jlwW4Gnyfw9KIrvfYZuTVeQt45YVJzIwsQcBbp6QFb6PY-a9gOWcootk722rGlm5nnomrPEj_sQWb7r4t3MQK6MS_7-Q-0eMOZYS3vQvQmBchbsDVq0MG2gG_Fjel09ufTCyuq0Hw2UWde3HKjN0a_e2gBuvvtE/s1600/a%20%2822%29.png"
      alt="card-image"
    />
    <div className="p-4 text-center">
      <p className="text-gray-900 text-xl font-serif">Ricardo</p>
      <p className="text-yellow-700 text-lg font-serif">&</p>
      <p className="text-gray-900 text-xl font-serif">Gabriela</p>
      <p className="text-gray-400 text-xs uppercase font-mono">Padrinos de Anillos</p>
    </div>
  </div>
  <div className="flex flex-col h-80 items-center shadow-lg  w-1/3 bg-slate-50" data-aos="fade-up">
    <img
      className="m-1  w-32 h-32 md:w-40 md:h-40 object-cover rounded-t-full md:rounded-full border-stone-500 border-4"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4rC4H1fjSLnaMHkFRvtCAzLwt_8JZcOhgIhYXy6H2XjfP5LWkl8rzsnw7s-Eh6EAom6UTJEXsTzDujQvVfPiDn27QIq41Bn_mUSwo6lDRX-8Lz4iloTJl89fgGTQEfUJli3YQ-pWRhgZpo0zj6x1tG-EzkHmx5RtDNqJI0z3IwswdhPeLC4ramlTyI9M/s1600/a%20%2823%29.png"
      alt="card-image"
    />
    <div className="p-4 text-center">
      <p className="text-gray-900 text-xl font-serif">Santiago</p>
      <p className="text-yellow-700 text-lg font-serif">&</p>
      <p className="text-gray-900 text-xl font-serif">Lucía</p>
      <p className="text-gray-400 text-xs uppercase font-mono">Padrinos de Arras</p>
    </div>
  </div>
  </div>
    </div>
    <p className="text-gray-400 text-sm  font-mono text-center">"No podríamos estar más agradecidos de tenerlos a nuestro lado."</p>
    {/* Mesa de regalos */}    
    <div className="relative mt-16">
      
    <div className=" flex flex-col justify-center items-center " data-aos="fade-up" data-aos-delay="600">
   <div className='text-3xl font-serif translate-y-10 text-center'> Mesa de </div>
  <div className={`${monsieurLaDoulaise.className} text-center text-6xl translate-y-10`}>
  Regalos
        </div>
        
    <img
      className="  md:w-60 lg:w-80 "
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVtjAKqHDOAyZ9Idc2UmEawTP-TAFduLPO42G8c4ovGxW2ngt80m6lqkGhJrtxZJc-RREJPmwZ_LJEr3GDkp02MHQjXnfkLf1DIRqtv1Of9M3PkQmJbcw92fl-F191BOCHwZ6mA2wlRmhDDwunnxgAo4YeYYCT7ajnUEkB2h-wgjxEq-J8LrALn04SWWs/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2830%29.png"
      alt="separador"
    />
    
  </div>
    
    <div className="text-lg font-serif text-center m-5 text-gray-950" data-aos="fade-up" data-aos-delay="600">
    Tu presencia es lo más valioso para nosotros, pero si deseas sorprendernos con un detalle, aquí te dejamos algunas ideas:
    </div>

    <div className="flex flex-wrap justify-center gap-5 p-4" data-aos="fade-up" data-aos-delay="600">

  <div className="flex flex-col shadow-xl border border-slate-200 w-full sm:w-80 max-w-sm" data-aos="fade-up" data-aos-delay="600">
    <h4 className="p-2 text-2xl font-serif text-slate-900 text-center">
    Lluvia de Sobres
    </h4>
    <div className="overflow-hidden rounded-md h-40 flex justify-center items-center">
      <img
        className="w-20"
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhiIya2gEZqrFbw4tHyJ9twmuRN6feifIQRbGbwoGc3iVGRn8qnt6rqfwnKtZlW_8go67ANuYOH7DTlSKuaUXVJF0_yCue64NylT560Wmkba1Ne6g0JqXyCTV-am3f-qwckUJDyY6GuUBgK1NjWpbnvlurW029jjPFII2f2IW0zlg3H2iYoqYCfBVJuKPk/s1600/a%20%2811%29.png"
        alt="Sobres"
      />
    </div>
    <div className=" text-center">
      
      <p className="p-4 text-base font-serif text-slate-900 font-light">
      Es costumbre entregar un sobre con dinero en efectivo a la quinceañera como detalle especial durante la fiesta de sus XV años
      </p>
    </div>
    
  </div>

 
  <div className="flex flex-col shadow-xl border border-slate-200 w-full sm:w-80 max-w-sm" data-aos="fade-up" data-aos-delay="600">
    <h4 className="p-2 m-3 text-2xl font-serif text-slate-900 text-center">
    Liverpool
    </h4>
    <div className="p-2 text-center">
      <p className="text-base font-serif text-slate-800  font-light">
        Código: <br />
        1234567
      </p>
    </div>
    <div className="flex justify-center p-4 gap-2">
      <a
        href="https://www.google.com"
        className="text-white bg-[#322c08a0] hover:bg-[#322c08]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
       
        Ver Regalos
      </a>
    </div>
  </div>

  <div className="flex flex-col shadow-xl border border-slate-200 w-full sm:w-80 max-w-sm" data-aos="fade-up" data-aos-delay="600">
    <h4 className="p-2 m-3 text-2xl font-serif text-slate-900 text-center">
    Datos bancarios
    </h4>

  <div className="flex flex-row items-center p-2 gap-2">
    <img
    className="h-5 w-5 mb-1"
    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEidX5isDNlySE4TujTHjaJZigUu2fcZes15nGlhMSJ3O0fJFr_GFRhdnXRmDq1RQ3jurVgz3VnpN1ZczL1raSRDCdsQB_HquEp3xISiw1TvbahdOvr_SVGZhX_x_2qhKJmoJHkoB-TUBUCxb-xQkvD3VBD9DNpLlCE9N1qam7rdmtj5QuFVP-lGKqZ0L4w/s1600/icons8-edificio-del-banco-64.png"
    alt="Ícono de un edificio de banco"
    />
    <p className="font-serif text-slate-800 font-bold">Banco:</p>
    <p className="font-serif text-slate-950 uppercase tracking-wide">Ejemplo</p>
  
  </div>
  <div className="flex flex-row items-center p-2 gap-2 -translate-y-1">
    <img
    className="h-5 w-5 mb-1"
    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiVqV4KUcGFv5jL0M3QZ8fvlMyEYWX9wEmJwOdXVkhf6e4LebNqI_uAXOisZKiL_2GfAHnxCpc6qP4DBOCKVcKMXXSrBczjR7UFlyYJ7saVgB7xI2lvo6HSOgnupuOBpahw-4Ii-BEaRIVNbL9wR876CkoJeq7n0hbw0VMCUqUv4EDmUxpyAL5rgk-OW2w/s1600/icons8-persona-de-sexo-masculino-30.png"
    alt="Ícono de un edificio de banco"
    />
    <p className="font-serif text-slate-800 font-bold ">Titular:</p>
    <p className="font-serif text-slate-950 uppercase tracking-wide">Ejemplo</p>
  
  </div>
  <div className="flex flex-row items-center p-2 gap-2 -translate-y-2">
    <img
    className="h-5 w-5 mb-1"
    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJgJJG0d69Y1cnTC-IotJJ5rClo7nPGM6-0_leZ4igA9IKKp0WG9eye4LiLl731ijsDiWwNqExh2IVnhDA2PEcinE5J1ZSUBZe_Uf3yh7BkYvKzWdrmTv8viyld9lbU9vJNTYy2ute9MlbXMi7di5dqWoy7fBQaBC1FRUiBZva3MT3hQlle5WzpfJ1RAQ/s1600/icons8-tarjeta-de-identificaci%C3%B3n-50.png"
    alt="Ícono de un edificio de banco"
    />
    <p className="font-serif text-slate-800 font-bold ">No. de Cuenta:</p>
    <p className="font-mono text-slate-950  tracking-wide">123456789</p>
  
  </div>
  <div className="flex flex-row items-center p-2 gap-2 -translate-y-3">
    <img
    className="h-5 w-5 mb-1"
    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEihsJz7DdR8Xy8jfwNcxxFYdpGXT0Tk2QMpYDN26Zi2pQoKdeRHfbWuQPBpIWROwG6TXMK7kWX4orWcra2a9PrdxSfWnv0EqIVgdCADy-QATFzqyiMlD_jile1fZnTR6KIcg8o-XRdAMiJYjaoW5OZMjtDBZ5RcbiZYCvxAJrKKaKVDsoJIiHbBz0bA3Tc/s1600/icons8-credit-card-50.png"
    alt="Ícono de un edificio de banco"
    />
    <p className="font-serif text-slate-800 font-bold ">No. de Tarjeta:</p>
    <p className="font-mono text-slate-950 tracking-tight">111 222 333 444</p>
  
  </div>
  <div className="flex flex-row items-center p-2 gap-2 -translate-y-4">
    <img
    className="h-5 w-5 mb-1"
    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEihsJz7DdR8Xy8jfwNcxxFYdpGXT0Tk2QMpYDN26Zi2pQoKdeRHfbWuQPBpIWROwG6TXMK7kWX4orWcra2a9PrdxSfWnv0EqIVgdCADy-QATFzqyiMlD_jile1fZnTR6KIcg8o-XRdAMiJYjaoW5OZMjtDBZ5RcbiZYCvxAJrKKaKVDsoJIiHbBz0bA3Tc/s1600/icons8-credit-card-50.png"
    alt="Ícono de un edificio de banco"
    />
    <p className="font-serif text-slate-800 font-bold ">Clabe:</p>
    <p className="font-mono text-slate-950 tracking-tight">1234567890123</p>
  
  </div>



  
  </div>
  
</div>
  

<div className="text-transparent p-8">
  ...
</div>

    </div>    
    {/* Separador */}      
    <div className=" flex justify-center h-40 ">
           <img
           className=" "
           src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEguwdpvOLuGdXgP20iNXknFMhq2u-7y812cJbP26IXQw4wicW6KuAkdydp2FVMOKl_8tE1oJNS28LsdtRoxC1yIvNiyArZCzI_UWSFo-eulq1h8HEqPlwVBTEca_mtYo4URRHCJN6MeyUwHT7KqYrGjCSms9Z_htTpmI43VnPzMeAzZHW5IYWIkV4MBKfw/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2831%29.png"
           alt="Imagen de separador vertical"
            />
    </div>
    {/* Confirmación de asistencia */}    
    <div className=" justify-items-center ">
    
    <div className="flex flex-col justify-center items-center" data-aos="fade-up" data-aos-delay="600">
    <div className='text-3xl font-serif translate-y-5 text-center'> Confirma la </div>
    <div className={`${monsieurLaDoulaise.className} text-center text-6xl `}>
    asistencia 
        </div>
        
    <img
      className="  md:w-60 lg:w-80 "
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVtjAKqHDOAyZ9Idc2UmEawTP-TAFduLPO42G8c4ovGxW2ngt80m6lqkGhJrtxZJc-RREJPmwZ_LJEr3GDkp02MHQjXnfkLf1DIRqtv1Of9M3PkQmJbcw92fl-F191BOCHwZ6mA2wlRmhDDwunnxgAo4YeYYCT7ajnUEkB2h-wgjxEq-J8LrALn04SWWs/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2830%29.png"
      alt="separador"
    />
    

    </div>  
    
    <div className="flex flex-wrap shadow-lg border justify-center gap-5 " data-aos="fade-up" data-aos-delay="600">
    <div className="flex flex-col  w-full sm:w-80 max-w-sm">
        <div className="flex justify-center items-center p-5">
            <svg fill="#B7B4A8" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" style={{ height: "50px", width: "50px" }}>
                <g id="XMLID_468_">
                    <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
                    c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
                    c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
                    c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
                    c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
                    c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
                    c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
                    c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
                    c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
                    C233.168,179.508,230.845,178.393,227.904,176.981z"/>
                    <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
                    c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
                    c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
                     M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
                    l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
                    c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
                    C276.546,215.678,222.799,268.994,156.734,268.994z"/>
                </g>
            </svg>
        </div>  
        <h4 className="p-2 m-3 text-2xl font-serif text-slate-900 text-center">
            Por WhatsApp
        </h4>
        <div className="flex justify-center p-4 gap-2">
            <a href="https://www.whatsapp.com" className="text-white bg-[#322c08a0] hover:bg-[#322c08]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" target="_blank" rel="noopener noreferrer">
                Con Brenda
            </a>
        </div>
        <div className="flex justify-center p-4 gap-2">
            <a href="https://www.whatsapp.com" className="text-white bg-[#322c08a0] hover:bg-[#322c08]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" target="_blank" rel="noopener noreferrer">
                Con Fernado
            </a>
        </div>
    </div>
    <div className="flex flex-col  w-full sm:w-80 max-w-sm">
        <div className="flex justify-center items-center p-5">
            <div style={{ width: "100%", maxWidth: "50px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto" }}>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z" fill="#B7B4A8"/>
                </svg>
            </div>
        </div>
        <h4 className="p-2 m-3 text-2xl font-serif text-slate-900 text-center">
            Por Teléfono
        </h4>
        
        <div className="flex justify-center p-4 gap-2">
        <a href="https://www.whatsapp.com" className="text-white bg-[#322c08a0] hover:bg-[#322c08]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" target="_blank" rel="noopener noreferrer">
                Con Brenda
            </a>
        </div>
        <div className="flex justify-center p-4 gap-2">
            <a href="https://www.whatsapp.com" className="text-white bg-[#322c08a0] hover:bg-[#322c08]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" target="_blank" rel="noopener noreferrer">
                Con Fernado
            </a>
        </div>
    </div>
    <div className="flex flex-col  w-full sm:w-80 max-w-sm">
        <div className="flex justify-center items-center p-5">
            <div style={{ width: "100%", maxWidth: "50px" }}>
            <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 25.994 25.994"
    preserveAspectRatio="xMidYMid meet"
    style={{ width: '100%', height: 'auto' }}
  >
    <g>
      <g>
        <path
          style={{ fill: '#B7B4A8' }}
          d="M21.815,0H4.18C3.707,0,3.326,0.382,3.326,0.853V25.14c0,0.472,0.381,0.854,0.853,0.854h13.083
          c0.21,0,0.413-0.077,0.57-0.218l4.55-4.072c0.181-0.162,0.285-0.394,0.285-0.636V0.853C22.667,0.382,22.285,0,21.815,0z
          M20.962,20.59h-3.97v3.648l-0.053,0.047H5.033V1.707h15.928V20.59z"
        />
        <path
          style={{ fill: '#B7B4A8' }}
          d="M14.562,15.173h-4.337c-0.247,0-0.446,0.2-0.446,0.446v4.337c0,0.247,0.199,0.446,0.446,0.446
          h4.337c0.246,0,0.446-0.2,0.446-0.446V15.62C15.009,15.374,14.809,15.173,14.562,15.173z M14.118,19.511h-3.446v-3.446h3.446
          V19.511z"
        />
        <path
          style={{ fill: '#B7B4A8' }}
          d="M14.953,8.569V8.537c0-0.218-0.177-0.394-0.394-0.394h-4.33c-0.217,0-0.394,0.176-0.394,0.394
          v4.329c0,0.219,0.177,0.395,0.394,0.395h4.331c0.217,0,0.394-0.176,0.394-0.395v-1.543l-0.696,0.696
          c-0.026,0.026-0.062,0.039-0.092,0.062v0.393h-3.543V8.93h3.543v0.426L14.953,8.569z"
        />
        <path
          style={{ fill: '#B7B4A8' }}
          d="M15.764,8.313l-2.196,2.195l-0.84-0.841c-0.227-0.227-0.593-0.227-0.82,0
          c-0.227,0.227-0.227,0.594,0,0.819l1.251,1.252c0.113,0.113,0.262,0.17,0.41,0.17c0.149,0,0.298-0.057,0.41-0.17l2.605-2.606
          c0.228-0.227,0.228-0.593,0-0.82C16.358,8.086,15.991,8.086,15.764,8.313z"
        />
        <rect
          x="7.305"
          y="4.159"
          style={{ fill: '#B7B4A8' }}
          width="11.385"
          height="1.189"
        />
      </g>
    </g>
            </svg>

            </div>
        </div>
        <h4 className="p-2 m-3 text-2xl font-serif text-slate-900 text-center">
            Formulario
        </h4>
        
        <div className="flex justify-center p-4 gap-2">
        <a href="https://www.whatsapp.com" className="text-white bg-[#322c08a0] hover:bg-[#322c08]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" target="_blank" rel="noopener noreferrer">
        RSVP 
            </a>
        </div>
        
    </div>
    </div>

    
    
    </div>
    {/* Espacio al final */} 
    <div>
    <h1 className="p-10 m-10 mb-1 border-y text-2xl font-bold text-gray-900 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.7),transparent)1] md:text-4xl"></h1>
    </div>
    </div>

    <div>
	  <a href="https://wa.me/524462562451" target="_blank" rel="noreferrer noopener" className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366] animate-pulse">
  <div className="absolute z-10 top-0 left-0 w-full h-full rounded-full bg-[#25d366] "></div>
  <div className="relative z-20">
	<svg fill="#fff" height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 308.00 308.00" xmlSpace="preserve" stroke="#fff" transform="matrix(1, 0, 0, 1, 0, 0)">
          <path d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"/> 
          <path d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"/>
    </svg>
  </div>
</a>
      </div>
    </div>
    </>
    </>
  );
}