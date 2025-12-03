import type { SwapiPerson } from "../api/api";

type PeopleTableProps = {
  people: SwapiPerson[];
};

const PeopleTable = ({ people }: PeopleTableProps) => {
  if (!people.length) {
    return (
      <p className="py-4 text-sm text-slate-500">
        No characters found for this page.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Mass</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Height</th>
            <th className="px-4 py-3 font-semibold text-slate-700">
              Hair Color
            </th>
            <th className="px-4 py-3 font-semibold text-slate-700">
              Skin Color
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr
              key={person.name}
              className="border-t border-slate-100 even:bg-slate-50/50"
            >
              <td className="px-4 py-2">{person.name}</td>
              <td className="px-4 py-2">{person.mass}</td>
              <td className="px-4 py-2">{person.height}</td>
              <td className="px-4 py-2 capitalize">{person.hair_color}</td>
              <td className="px-4 py-2 capitalize">{person.skin_color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
