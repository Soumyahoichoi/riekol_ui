export const decideEnv = () => {
	if (import.meta.env.NODE_ENV === 'development') {
		return 'http://localhost:1337';
	} else {
		return 'http://localhost:1337';
		//give vercel hosted url here
		// return 'https://strapi-portfolio-2021.herokuapp.com'
	}
};
