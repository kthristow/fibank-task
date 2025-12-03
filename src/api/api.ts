export type SwapiPerson = {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
};

export type SwapiPeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiPerson[];
};

const BASE_URL = "https://swapi.py4e.com/api";

export async function fetchSwapiPeople(page: number): Promise<SwapiPeopleResponse> {
  const url = `${BASE_URL}/people/?page=${page}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch people: ${res.status}`);
  }

  return res.json();
}