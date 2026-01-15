"use client"; 
import { useState, useRef } from 'react';
import { Bodoni_Moda } from '@next/font/google';

const bodoni = Bodoni_Moda ({
    subsets: ['latin'],
    weight: '400', // Ajusta según tus necesidades
    display: 'swap', // Optimización de carga
  });


export default function () {

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
        <div className="bg-gradient-to-r from-gray-100 to-gray-100">
       </div>
{/* Imagen de fondo + componentes de datos y calendario */}      
<div className="w-full bg-gray-100 overflow-hidden shadow-xl  ">
  <div
    className="w-full h-screen bg-cover bg-top bg-no-repeat " 
    style={{
      backgroundImage: `url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEheLRcxSzD0jF5TjCCmXyBykkQ-4wehus4YViHe08Co2MsRQZeyQ63rkohXyZcDljmoGwytKcB9OXafp03A4VfD3ONtpOxjrjKH1XOgNbYxom2CjoI4xqip_6UESekhycSbdWNgcu1-6vVn3Su2ghbosavnZUZuVDq-1PXv7Jf5wSNqOeJRZ99Ynn3KGbk/s1600/laura-gomez-UnytEYxuNPQ-unsplash.jpg')`,
    }}
  >

    <div className="flex flex-col items-center justify-center max-w-screen-lg mx-auto ">
      <div className="my-4">
      
     
      <div className='m-3 p-3 flex justify-center items-center'>
      <img className='w-20 translate-x-4' src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEglrBUk9gwagcUngMLLYBpCB31L6EKfvmOalOyMVOp1HybxE1ScAc43CI6w8GMJX7NR5EqBY2EmgxKO4FMUbxw4QPxKB-n9roVs71Ej6W70EeLzvqQsrwZud0jaP4p_OqdVpA3Ul1NYg7cW8yDqm0ff8tqDGr2zRXzv3F_Ws1awV4txyO0Vj-sco5lREcc/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2864%29.png" alt="" />
     
      <h1 className={`${bodoni.className} text-7xl text-rose-300 "`} data-aos="fade" data-aos-delay="300">
        lison
      </h1> </div>
      <h1 className={`${bodoni.className} text-gray-50 text-center  text-2xl`} data-aos="fade" data-aos-delay="300">
        XV AÑOS
      </h1>
      
      <p className={`${bodoni.className} " py-3 text-2xl text-white text-center "`} data-aos="fade" data-aos-delay="300">
        26 / DIC / 2024
      </p>


      </div>
    </div>
    </div>

 
  
      </div>

      {/* Audio Player */}
      <div>
      <div className="  flex items-center justify-center">
      <div className="text-center">
        <button
          onClick={togglePlayPause}
          className="bg-sky-500 hover:bg-blue-600 text-white rounded-full p-6 shadow-lg
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
          <source src="/103.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>
    </div>
      </div>
        
        </>
  );
}