export const decideEnv = () => {
  if (import.meta.env.PROD) {
    return "https://riekol-server.onrender.com";
  } else {
    return "http://localhost:1337";

    //give vercel hosted url here
    // return 'https://strapi-portfolio-2021.herokuapp.com'
  }
};
