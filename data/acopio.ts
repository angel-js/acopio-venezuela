export interface CentroAcopio {
  id: string;
  nombre: string;
  organizacion: string;
  direccion: string;
  ciudad: string;
  pais: string;
  telefono?: string;
  email?: string;
  horario?: string;
  insumos: string[];
  activo: boolean;
  coordenadas?: { lat: number; lng: number };
}

export const centrosAcopio: CentroAcopio[] = [
  {
    id: "acopio-santiago-1",
    nombre: "Centro de Acopio Solidaridad Venezuela",
    organizacion: "Venezolanos en Chile",
    direccion: "Av. Providencia 1234, Oficina 56",
    ciudad: "Santiago",
    pais: "CL",
    telefono: "+56 9 1234 5678",
    email: "acopio@vzlachile.org",
    horario: "Lunes a Viernes 9:00 - 18:00",
    insumos: ["alimentos", "medicamentos", "higiene"],
    activo: true,
  },
  {
    id: "acopio-madrid-1",
    nombre: "Punto de Recogida Venezuela",
    organizacion: "Venezolanos en España",
    direccion: "Calle Gran Vía 45, Local 3",
    ciudad: "Madrid",
    pais: "ES",
    telefono: "+34 612 345 678",
    horario: "Lunes a Sábado 10:00 - 20:00",
    insumos: ["alimentos", "medicamentos", "ropa", "higiene"],
    activo: true,
  },
  {
    id: "acopio-miami-1",
    nombre: "Venezuela Aid Collection Center",
    organizacion: "Venezuelan American Association",
    direccion: "8500 NW 25th St, Suite 100",
    ciudad: "Miami",
    pais: "US",
    telefono: "+1 (305) 555-0199",
    email: "aid@vzlamiami.org",
    horario: "Monday to Friday 9:00 AM - 5:00 PM",
    insumos: ["medicamentos", "ropa", "higiene"],
    activo: true,
  },
  {
    id: "acopio-bogota-1",
    nombre: "Centro Humanitario Venezuela",
    organizacion: "Fundación Venezolanos en Colombia",
    direccion: "Carrera 7 #45-12",
    ciudad: "Bogotá",
    pais: "CO",
    telefono: "+57 301 234 5678",
    horario: "Lunes a Viernes 8:00 - 17:00",
    insumos: ["alimentos", "medicamentos", "ropa"],
    activo: true,
  },
  {
    id: "acopio-lima-1",
    nombre: "Acopio Hermanos Venezolanos",
    organizacion: "Unión Venezolana en Perú",
    direccion: "Av. Arequipa 3456",
    ciudad: "Lima",
    pais: "PE",
    email: "acopio@vzlaperu.org",
    horario: "Lunes a Viernes 9:00 - 17:00",
    insumos: ["alimentos", "higiene"],
    activo: true,
  },
];
