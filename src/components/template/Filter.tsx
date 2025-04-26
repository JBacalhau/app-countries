'use client';
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { useTheme } from "@/hooks/useTheme"; 
import { FilterProps } from "@/types/filter"; 

// Component Filter
export default function Filter({ onFilterChange }: FilterProps) {
    
    const [openFilter, setOpenFilter] = useState<boolean>(false); 

    
    const { isDarkMode } = useTheme();

    
    const handleFilterClick = (region: string): void => {
        onFilterChange(region);
        setOpenFilter(false);
    };

    return (
        <div className="relative">
            <button
                className={`flex text-sm items-center gap-x-10 rounded font-semibold px-6 py-4 shadow-md transition-colors duration-300 ${
                    isDarkMode 
                        ? "bg-[var(--elements-dark-mode)] text-[var(--text-dark-mode)] hover:bg-[var(--elements-dark-mode)]/80"
                        : "bg-[var(--elements-light-mode)] text-[var(--text-light-mode)] hover:bg-[var(--elements-light-mode)]/80"
                }`}
                onClick={() => setOpenFilter(!openFilter)}
            >
                <span>Filter by Region</span>
                <IconChevronDown size={15} stroke={2} />
            </button>

            {openFilter && (
                <ul
                    className={`absolute text-sm z-10 top-[56px] w-[204px] rounded py-2 px-6 shadow-md transition-colors duration-300 ${
                        isDarkMode
                            ? "bg-[var(--elements-dark-mode)] text-[var(--text-dark-mode)]"
                            : "bg-[var(--elements-light-mode)] text-[var(--text-light-mode)]"
                    }`}
                >
                    {["All", "Africa", "Americas", "Asia", "Europe", "Oceania"].map((region) => (
                        <li
                            key={region}
                            onClick={() => handleFilterClick(region)}
                            className="cursor-pointer py-1"
                        >
                            {region}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
