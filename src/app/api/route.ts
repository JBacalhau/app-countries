import { NextResponse } from 'next/server';
import { Country } from "@/types/Cards";

export async function GET() {
  try {
    const apiUrl =
      'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3';
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch data from API. Status: ${res.status}`);
    }

    const responseData: Partial<Country>[] = await res.json();

    const countries: Country[] = responseData.map((country) => ({
      name: country.name || { common: '', official: '' },
      flags: country.flags || { png: '', svg: '' },
      population: country.population || 0,
      region: country.region || 'Unknown',
      capital: country.capital || [],
      cca3: country.cca3 || 'N/A',
    }));

    return NextResponse.json(countries);
  } catch (error) {
    console.error('API Error:', (error as Error).message);
    return NextResponse.json(
      { error: 'Failed to fetch data from external API' },
      { status: 500 }
    );
  }
}
