// src/types/Pagina.ts
export interface PaginaProps {
    children: React.ReactNode; // Tipagem para filhos do componente
    className?: string;        // A classe é opcional
    resetFilters: () => void;  // A função para resetar os filtros
  }
  