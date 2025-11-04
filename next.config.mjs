/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
   
  },
  images:{
     
     domains: ['randomuser.me', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
        
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
         {
        protocol: "https",
        hostname: "img.clerk.com",
        
      },
         {
        protocol: "https",
        hostname: "res.cloudinary.com",
        
      },
       {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
       {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
          {
        protocol: 'https',
        hostname: 'randomuser.me',
      }, 
            {
        protocol: 'https',
        hostname:'picsum.photos',
      }, 
       {
        protocol: 'https',
        hostname:'loremflickr.com',
      },
    
    ],
    
    
  }
};

export default nextConfig;
