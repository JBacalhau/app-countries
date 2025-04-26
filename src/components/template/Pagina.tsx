
'use client';

import { useEffect } from "react";
import Cabecalho from "./Cabecalho";
import { useTheme } from "@/hooks/useTheme";
import { PaginaProps } from "@/types/Pagina";

const Pagina: React.FC<PaginaProps> = ({ children, className, resetFilters }) => {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode
            ? "var(--background-dark-mode)"
            : "var(--background-light-mode)";
        document.body.style.color = isDarkMode
            ? "var(--text-dark-mode)"
            : "var(--text-light-mode)";
    }, [isDarkMode]);

    return (
        <div>
            <Cabecalho resetFilters={resetFilters} />
            <main className={`${className ?? ""} p-5`}>{children}</main>
        </div>
    );
};

export default Pagina;
