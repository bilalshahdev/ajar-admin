import {
    Allan,
    Antonio,
    IBM_Plex_Mono,
    Inter,
    Montserrat,
    Oswald,
    Poppins,
    Press_Start_2P,
    Space_Grotesk,
  } from "next/font/google";
  
  export const inter = Inter({ subsets: ["latin"] });
  
  export const antonio = Antonio({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"],
  });
  export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"],
  });
  
  export const ibmCode = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"],
  });
  
  export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"],
  });
  
  export const oswald = Oswald({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"],
  });
  
  export const allan = Allan({
    subsets: ["latin"],
    weight: ["400", "700"],
  });
  
  export const pressStart2P = Press_Start_2P({
    subsets: ["latin"],
    weight: ["400"],
  });
  
  export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
  });