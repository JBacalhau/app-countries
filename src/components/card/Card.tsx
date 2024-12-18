'use client';

import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CountryData, BorderCountry, CardProps } from "@/types/Card";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

const Card: FC<CardProps> = ({ resetFilters }) => {
  const { country } = useParams();
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleBack = () => {
    resetFilters();  // Chama resetFilters antes de voltar para a página anterior
    router.back();
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      if (!country) {
        setError("País não encontrado.");
        setLoading(false);
        return;
      }

      try {
        const url = `https://restcountries.com/v3.1/${country.length === 3 ? "alpha" : "name"}/${country}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Erro ao carregar dados: ${response.status}`);

        const data = await response.json();
        const countryInfo = Array.isArray(data) ? data[0] : data;

        setCountryData(countryInfo);

        if (countryInfo?.borders?.length) {
          const borderData = await Promise.all(
            countryInfo.borders.map(async (borderCode: string) => {
              const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
              if (!borderResponse.ok) throw new Error(`Erro ao carregar fronteiras: ${borderResponse.status}`);
              const borderInfo = await borderResponse.json();
              return {
                code: borderInfo[0].cca3,
                name: borderInfo[0].name.common,
              };
            })
          );
          setBorderCountries(borderData);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [country]);

  if (loading) return <div className="text-center">Carregando...</div>;

  if (error) return <div className="text-center text-red-600">{error}</div>;

  if (!countryData) return <div className="text-center">Dados não encontrados.</div>;

  const flagImageUrl = `https://flagcdn.com/w640/${countryData.cca2.toLowerCase()}.jpg`;

  return (
    <div
      className={`max-w-[1310px] mx-auto px-4 flex flex-col mb-12 ${isDarkMode ? "bg-b-dark text-e-t-light" : "bg-b-light text-black"}`}
    >
      <div className="flex mt-8 mb-20">
        <button
          onClick={handleBack}  // Chama a função handleBack que inclui resetFilters
          className={`flex mt-28 items-center gap-x-[6px] py-[6px] px-6 rounded shadow-[0px_0px_6px_rgba(0,0,0,0.28)] ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
        >
          <IconArrowNarrowLeft stroke={2} />
          <span>Back</span>
        </button>
      </div>

      <div className="flex flex-col lg:gap-y-0 gap-y-12 lg:gap-x-8 lg:flex-row items-center justify-between">
        <div className="drop-shadow-[0px_0px_15px_rgba(0,0,0,0.15)]">
          <Image
            src={flagImageUrl}
            className="w-[275px] sm:w-[366px] md:w-[550px] h-[210px] sm:h-[350px] md:h-[420px]"
            alt={`${countryData.name.common} Flag`}
            width={640}
            height={480}
            priority
          />
        </div>

        <div className="flex flex-col justify-between max-w-[550px]">
          <div className="flex flex-col lg:flex-row justify-between gap-y-9 mb-16 lg:mb-20">
            <div>
              <h2 className="font-bold text-3xl mb-6">{countryData.name.common}</h2>
              <ul className="font-semibold flex flex-col gap-y-2">
                <li>
                  Native Name: <span className="font-normal">{countryData.name.common}</span>
                </li>
                <li>
                  Population: <span className="font-normal">{countryData.population.toLocaleString()}</span>
                </li>
                <li>
                  Region: <span className="font-normal">{countryData.region}</span>
                </li>
                <li>
                  Sub Region: <span className="font-normal">{countryData.subregion || "N/A"}</span>
                </li>
                <li>
                  Capital: <span className="font-normal">{countryData.capital?.join(", ") || "N/A"}</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center">
              <ul className="font-semibold flex flex-col gap-y-2">
                <li>
                  Top Level Domain: <span className="font-normal">{countryData.tld?.join(", ") || "N/A"}</span>
                </li>
                <li>
                  Currencies:{" "}
                  <span className="font-normal">
                    {Object.values(countryData.currencies || {}).map((currency) => currency.name).join(", ")}
                  </span>
                </li>
                <li>
                  Languages:{" "}
                  <span className="font-normal">
                    {Object.values(countryData.languages || {}).join(", ")}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="font-semibold flex flex-wrap gap-y-4">
            <span className="me-3">Border Countries: </span>
            {borderCountries.map((borderCountry) => (
              <Link key={borderCountry.code} href={`/pais/${borderCountry.code}`}>
                <span
                  className={`px-6 py-1 rounded shadow-[0px_0px_15px_rgba(0,0,0,0.15)] m-1 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
                >
                  {borderCountry.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
