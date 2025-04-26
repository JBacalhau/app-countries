'use client';

import Pagina from "@/components/template/Pagina";
import { FC, useState } from "react";
import Card from "@/components/card/Card";

const PaginaPais: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  
  const resetFilters = (): void => {
    setSearchTerm(""); 
  };

  return (
    <Pagina resetFilters={resetFilters}>
      <p>Search Term: {searchTerm}</p>
      <Card searchTerm={searchTerm} resetFilters={resetFilters} />
    </Pagina>
  );
};

export default PaginaPais;


