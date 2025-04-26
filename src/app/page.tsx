'use client';
import Cards from "@/components/cards/Cards";
import Pagina from "@/components/template/Pagina";
import Pesquisa from "@/components/template/Pesquisa";
import { useState } from "react";


export default function Home() {
    
    const [searchTerm, setSearchTerm] = useState<string>("");

    
    const [filterRegion, setFilterRegion] = useState<string>("All");

   
    const resetFilters = () => {
        setSearchTerm("");
        setFilterRegion("All");
    };

    return (
        <Pagina resetFilters={resetFilters}>
            <Pesquisa onSearch={setSearchTerm} onFilterChange={setFilterRegion} />
            <div className="flex gap-5 flex-wrap justify-center">
                <Cards searchTerm={searchTerm} filterRegion={filterRegion} />
            </div>
        </Pagina>
    );
}
