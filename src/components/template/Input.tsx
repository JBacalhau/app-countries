'use client';
import { IconSearch } from "@tabler/icons-react";
import { useTheme } from "@/hooks/useTheme";
import { InputProps } from "@/types/Input"; 

export default function Input({ onSearch }: InputProps) {
    const { isDarkMode } = useTheme(); // (dark ou light mode)

    return (
        <form
            autoComplete="off"
            className="relative"
            onSubmit={(e) => {
                e.preventDefault(); 
                const searchTerm = (e.target as HTMLFormElement).elements.namedItem("Country") as HTMLInputElement;
                onSearch(searchTerm.value); 
            }}
        >
            <IconSearch
                size={20}
                stroke={2}
                className={`absolute top-[18px] left-7 transition-colors duration-300 ${
                    isDarkMode ? "text-[var(--text-dark-mode)]" : "text-[var(--text-light-mode)]"
                }`}
            />
            <input
                type="search"
                placeholder="Search for a country..."
                name="Country"
                className={`w-full max-w-[480px] py-4 px-16 rounded shadow-md outline-none transition-colors duration-300 ${
                    isDarkMode
                        ? "bg-[var(--elements-dark-mode)] text-[var(--text-dark-mode)] placeholder:text-[var(--input-dark-mode)]"
                        : "bg-[var(--elements-light-mode)] text-[var(--text-light-mode)] placeholder:text-[var(--input-light-mode)]"
                }`}
            />
        </form>
    );
}
