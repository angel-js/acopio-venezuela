import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="es">
      <body className="bg-[#F5F0E8] min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#00247D] mb-4">404</h1>
          <p className="text-lg text-gray-700 mb-8">
            Página no encontrada / Page not found
          </p>
          <Link
            href="/es"
            className="inline-flex px-6 py-3 bg-[#CF142B] text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Ir al inicio / Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
