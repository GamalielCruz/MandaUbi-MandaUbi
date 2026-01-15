import PageIllustration from "@/components/page-illustration";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from "next/link";


export default function HeroHome() {
  return (
    <section className="relative">
	<title>EnviaUbi</title>
	<meta property='og:title' content='EnviaUbi'/>
    <meta property='og:image' content='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2ICm-L0P7f1IahZPrfyP8Lts8FC8ujs2YFxCx3K_tIMWr4egHI22KfTH-rxfHElgHzFnjpoNvYCH1ggG6QiNjvpsBTzFy1CN2KtbgVEFD7gaRtPdmOpjkAn55bOyGL1gWE9ocGG1lK3BmbtXybgkAXzFYfkp1p1AxyHOnCKnxoUhLXUNTs2ghxMdfGwA/s1600/Estas%20invitado%20%283%29.png'/>
    <meta property='og:description' content='El inicio de un momento inolvidable.'/>
    <meta property='og:url' content='EnviaUbi.com'/>
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='627' />
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-20">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              	<div className=" relative flex justify-center items-center" data-aos="fade-up" data-aos-delay="600">
				
				  <img alt=""  width="520"   src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHcrW2aJ-yl4AGIaSZ7TanIcCLnIbf8-tZsbvIIDyGKX_ZWkbc3_IjBR7yEmmrLMZqEnuEerrSHvwcygOImzSRtoyNFAJiiQY08RFWnEjZQ4I4aDx-1iTqzWYpdB3idYZKXQbgcToAcsP3B2iSvp3qXGaI4knjyLPYV_WVDOXw5caKO7j0BqLjEcNO72s/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2863%29.png"/>
				
				
			</div>
                

            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Todos los detalles para <br className="max-lg:hidden" />
              tu gran dia.
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Invitaciones digitales, diseñadas para comunicar a tus invitados de manera elegante y eficiente.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                 
                    
                    <Link
                href="/examples"
                className="relative inline-flex items-center btn group mb-4 w-full bg-gradient-to-t from-indigo-200 to-indigo-300 bg-[length:100%_100%] bg-[bottom] text-black shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
              >
                Ver Ejemplos
              </Link>

			  <Link
                href="#pricing"
                className="relative inline-flex items-center btn group mb-4 w-full bg-white text-gray-800 shadow hover:bg-gray-50 sm:ml-4  hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
              >
              Precios
              </Link>
                 
                  
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
          <div
            className="mx-auto max-w-5xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative aspect-video rounded-xl bg-indigo-200 px-5 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,theme(colors.slate.300/.8),transparent)1]">
              
            <h1
              className="mb-6 py-5 border-y text-4xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-4xl text-center text-black"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Más allá del papel.
            </h1>

            <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 [&>*]:relative [&>*]:p-6 [&>*]:before:absolute [&>*]:before:bg-gray-800 [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:bg-gray-800 [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] md:[&>*]:p-10">
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
              <img
                  className="box-content border-gray-50"
                  width={60}
                  height={60}
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgC5ZZHCj5iwJe0Ghbm0TtYMKEfrnRUan2ZA4FBcRq-dwMKfEzK6iVvyVi5L5EDK5Rb9qq-WDEugi9QrUt5rrFO0c82Tsl8pd6n3C2ykHphVsnlzsrZGPy9yW7MPQ20mUKBK3l6cLjB7zRejq_5bVr-IAXK0k8FTc5afFwAdOn02LY1QPNcJNESjdy3DgE/s1600/1%20%281%29.png"
                />   
                            
                <p className="text-black text-2xl">Ahorra y disfruta más</p>
              </h3>
              <p className="text-[15px] text-black">
              Una sola invitación, infinitas posibilidades.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
              <img
                  className="box-content border-gray-50"
                  width={60}
                  height={60}
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9Mqz-QahOpcObNdjO8yq6NRzOXkrZqQxRidQxhiyIRVuRbltiE5XPZN5dcrD0fsGwFjQ16djQKIPEzsNpqi7dcDdLruBLo2161lwQzpIXKzqvANxK1yK8u5BiNIjecKU5dQUxOOBThcNSvTDCqMS-OzrMlATcmUHoGAKWn0LwkWDCl-S8ACsqcAz0OEs/s1600/1%20%282%29.png"
                />   
                
                <p className="text-black text-2xl">Obra de arte</p>
              </h3>
              <p className="text-[15px] text-black">
              Nos apasiona crear diseños impecables, únicos y a medida para cada cliente.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
              <img
                  className="box-content border-gray-50"
                  width={70}
                  height={70}
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiuwPD1LRp7VV8xpp9TmgAnPpvBbT8eynm8yTqvoWxEQvhc5svzyBdRFHgVRI3D7sLDDCKAaBeOGQjy_VSWHukmhXQnSedQ90Iw7gGf2GMTdNQKVIUh_c2F5N6gTp9ojXjl9zyOIbR1LQ47mDl-S1Ftpn9SUmT9x4tN4gMWCSt9tl3LWqWozdbAuLxrLCs/s1600/1%20%283%29.png"
                />   
                <p className="text-black text-2xl">Entrega express</p>
              </h3>
              <p className="text-[15px] text-black">
              Tu invitación, lista en 72 horas como máximo.
                </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
              <img
                  className="box-content border-gray-50"
                  width={60}
                  height={60}
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_nJXazAWCa2ZPIEveaxClatGZW6ZvzzprHCWsEsJr-7dFs22G6FAj_WOm_6oy-Tyoy-fsOO31T0BZpTdXb8q4_ZY5UieoCKawMRNfmHbqKXhyphenhypheneoqa0R9vjV02i5eOwxVMPmQ6qwsf1fRYmQyoEm7QCobraQM0tYgOXUEGQONMfkbnZhSaFk6agbpXTs0/s1600/1%20%284%29.png"
                />   
                <p className="text-black text-2xl">Altamente funcionales</p>
              </h3>
              <p className="text-[15px] text-black">
              Incluye GPS, confirmación de asistencia y muchas herramientas más.
                </p>
            </article>
            <article>
            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
              <img
                  className="box-content border-gray-50"
                  width={60}
                  height={60}
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHY9kB3UNN96dKk7ZgTburum1hSypBj-d_lEhK5I58EUj3atflovZoGo3CEkk9BvwibKI6_XH_rBexdn_zAHFFOOabQ4V4PScfWCxDrBU6jTfsWZKEcd7t5Mm3Aw3u_fcOJJtqJiJcn0hmJXBKGb2nmo7x3GeTGk8u33bmcn__AKElBcH8D7Rnur0Ltqc/s1600/1%20%285%29.png"
                />   
                <p className="text-black text-2xl">En todo evento</p>
              </h3>
              <p className="text-[15px] text-black">
              Desde un bautizo, XV, Fiestas Improvisadas, Bodas; Tenemos el diseño perfecto.
                </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
              <img
                  className="box-content border-gray-50"
                  width={60}
                  height={60}
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbMLoEl6VBGrk_lWj_cq9QF91-arCO9s0_4kCYfxbon-9s3vwxLtTuVV7t0OPQnb10KfvhgK82z4KtHGETFpE1YiOcWTqWnU2KLUxJ84TyzGeRJr0uEHnq-N3sSsqLK151bRvwKUZeFP6b0O9xzor0KXwaPeAEXQLQ0NEac5GqIrMkKgWR827Hec8eHT0/s1600/a%20%2827%29.png"
                />   
                <p className="text-black text-2xl">Consultor personal</p>
              </h3>
              <p className="text-[15px] text-black">
                 Diseñador exclusivo que colabora con los anfitriones para un diseño único.
                </p>
            </article>
          </div>
           
              
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
    </section>
  );
}
