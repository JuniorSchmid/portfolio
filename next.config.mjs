/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Os assets do repositório são pesados (retrato de 3,6 MB, logos de ~1,4 MB).
    // Com o otimizador ligado o Next serve AVIF/WebP redimensionado no lugar do original.
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
