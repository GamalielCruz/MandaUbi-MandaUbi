"use client";

import Logo from "@/components/ui/logo";
import Link from 'next/link';
import { useState } from 'react';

const islands = [
  {
    name: 'Gardenia',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbUt2q9x9u4-MJzl_It1xkaeLA4_s-ZGNDjtaSCokQmh9ZlzJJcMo6G8DC12Ok81xuY3qllO4Nb3BfT0bmfQYKeSVUHy1IYLn0pdUlDmyZkIlPfwYfZzT0__Hc3nv17SpDX7zpySuqXWcLVnu7ltqQndNH36CRYaLaLkv0mfb-zLBQyYy97wuyaYEFdUU/s1600/Sin%20t%C3%ADtulo%20%28410%20x%20844%20px%29%20%285%29.png',
    description: 'Ideal para XV años, eventos de empresa y más.',
    link: '/isla/0',
  },
  {
    name: 'Aura',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjW141G6jJAaCdGx3Z23xol4tDEfR2sZKa2Ly6-7qEdbBgd_BNtvMzFSPfGRAKvxfsyI6dQZ7MMvMGWweloLVOAN5CRjUH3YPxpULCoHeX6LRw1kD2PLP6bYET3ksq2JTgahnigw3kBWEmnk0X20jT3pTqbPBx35zWr7eP3uzM0qgPGS2v3ZeeoQKr4WlA/s1600/Sin%20t%C3%ADtulo%20%28410%20x%20844%20px%29%20%281%29.png',
    description: 'Perfecta para bodas, aniversarios y momentos únicos.',
    link: '/isla/1',
  },
  {
    name: 'Azucena',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxzEPN6sd-P1NJSE8LAAo1Eqev1d4ewsuefdNaaf6z46gTQhs0GkjzBLkWzPSWiYd38yJnnMtpHlb369l8suJEC72EKwveWw2Q_lPUlxTWeCAvZ_UGL0TxjwJCSFACl2THMfIutEOpCtOTTesblZMv-0jYLJJtcFWMOm8t8hjwLYygkCWfIAUwvurIjgQ/s1600/Sin%20t%C3%ADtulo%20%28410%20x%20844%20px%29%20%284%29.png',
    description: 'Cumpleaños y bautizos, llenan de magia cada celebración',
    link: '/isla/2',
  }
];

export default function ProgressSlider() {
  const [selectedIsland, setSelectedIsland] = useState(islands[0]);

  return (
    <>
    <title>Modelos</title>
    <meta property='og:title' content='Modelos.'/>
    <meta property='og:image' content='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5sikH1hmOBeqzxmo154PSZfx-mrTjjJ1J526pQRBydYZ3qbseWtAWsHc0EFxWc8VWWAh8tFjjuNhg9WnmFmcKlaOw5TbzTjBtgh_U91VuAuFojTG9Y_MmaJjRyqrpMSHcg1qYhNVhkr-cNWfhyqiYPhCbS7-gfAy2L2m-TFQ5Q-fIYGs0pO9dmXiCdxo/s1600/Estas%20invitado%20%286%29.png'/>
    <meta property='og:description' content='Explora nuestros modelos y encuentra el ideal.'/>
    <meta property='og:url' content='EnviaUbi.com'/>
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='627' />

      <header className="relative w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between ">
            <div className="mr-4 shrink-0">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <div className="bg-stone-100">
      <h2 className=" border-y text-3xl font-bold text-gray-950 text-center [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.7),transparent)1] md:text-4xl">
            Modelos</h2>
            <div className="flex items-center justify-center place-content-center">
      <div className="flex flex-col ">
        
        <div className="mt-4  border rounded-lg  text-center shadow-xl">
          <h2 className="text-3xl mb-2 font-serif ">{selectedIsland.name}</h2>
          <img
        src={selectedIsland.image}
        alt={selectedIsland.name}
        className="mb-4 w-48 h-auto mx-auto "
          />
          <p className="mb-4 font-mono p-4 text-center">{selectedIsland.description}</p>
            <Link href={selectedIsland.link} className=" relative inline-flex items-center btn group mb-4 bg-gradient-to-t from-indigo-200 to-indigo-200 bg-[length:100%_100%] bg-[bottom] text-black shadow hover:bg-[length:100%_150%]  w-auto">
            Ampliar vista
            </Link>
        </div>

        <div className="inline-flex rounded-md shadow-sm mt-4 items-center justify-center" role="group">
          {islands.map((island, index) => (
        <button
          key={index}
          type="button"
          className={`relative inline-flex items-center btn group mb-4 w-full bg-gradient-to-t from-indigo-200 to-indigo-300 bg-[length:100%_100%] bg-[bottom] ml-4  text-black shadow hover:bg-[length:100%_150%]  sm:w-auto`}
          onClick={() => setSelectedIsland(island)}
        >
          <div className="flex flex-col ">
         
          </div>
          <div className="flex flex-col ">
          {island.name}
          </div>
          
        </button>
          ))}
        </div>
      </div>
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
    </>
  );
}
