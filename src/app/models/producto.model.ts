export interface Producto {
  id: number;
  nombre: string;
  descripcion: null | string;
  cantidadDisponible: number;
  cantidadInicial: number;
  caracteristicas: string;
  imagenes: string;
  precio: number;
  createdAt: string;
  updatedAt: string;
  Opinions?: Opinion[];
  CategoriaProductos?: CategoriaProducto[];
}

export interface CategoriaProducto {
  categoria: string;
  createdAt: string;
  updatedAt: string;
  Categoria?: Categoria;
  Interes?: Interes;
}

export interface Categoria {
  createdAt: string;
  updatedAt: string;
  ProductoId: number;
  CategoriaProductoCategoria?: string;
}

export interface Opinion {
  id?: number;
  valoracion: number;
  opinion: string;
  createdAt?: string;
  updatedAt?: string;
  ClienteId: number;
  ProductoId: number;
  Cliente?: Cliente;
  Producto?: Producto;
}

export interface Cliente {
  id?: number;
  username: string;
  email: string;
  imageURL?: string;
  favoritos?: string;
  _favoritos?: number[];
  historial?: string;
  _historial?: string[];
  imageBLOB?: any;
  createdAt?: string;
  updatedAt?: string;
  Opinions?: Opinion[];
  CategoriaProductos?: CategoriaProducto[];
}

export interface Interes {
  createdAt: string;
  updatedAt: string;
  ClienteId: number;
  CategoriaProductoCategoria: string;
}

export interface ProductoCantidad {
  producto: Producto;
  cantidad: number;
}


