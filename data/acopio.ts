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
}

import rawData from "./acopio-data.json";
export const centrosAcopio: CentroAcopio[] = rawData as CentroAcopio[];
