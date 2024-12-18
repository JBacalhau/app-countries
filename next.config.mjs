/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL, // URL da API
  },
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'https://restcountries.com/v3.1/all', // Redireciona para a API externa
      },
    ];
  },

   
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/w320/**',  // Especificando um padrão para as imagens
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/w640/**',  // Permite qualquer imagem com o padrão /w640/
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**', // Permite qualquer caminho nas imagens do Wikimedia
      },
      {
        protocol: 'https',
        hostname: 'restcountries.com',
        pathname: '/**', // Permite qualquer caminho nas imagens do RestCountries
      },
    ],
  },
};

export default nextConfig;

