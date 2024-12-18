'use client';

import Pagina from "@/components/template/Pagina";
import { FC, useState } from "react";
import Card from "@/components/card/Card";

const PaginaPais: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Função para resetar o filtro de busca
  const resetFilters = (): void => {
    setSearchTerm("");  // Reseta o termo de busca
  };

  return (
    <Pagina resetFilters={resetFilters}>
      <p>Search Term: {searchTerm}</p>
      <Card searchTerm={searchTerm} resetFilters={resetFilters} />
    </Pagina>
  );
};

export default PaginaPais;


