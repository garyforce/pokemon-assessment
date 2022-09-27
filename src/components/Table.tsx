import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Props } from './Cards';
import Link from 'next/link';

import { fadeInUp } from '@/utils/animations';

type PokemonStatsKey = 'HP' | 'Attack' | 'Defense' | 'Sp. Attack' | 'Sp. Defense' | 'Speed';
const tableKey: PokemonStatsKey[] = [
  'HP',
  'Attack',
  'Defense',
  'Sp. Attack',
  'Sp. Defense',
  'Speed',
];

export const Table = ({ data }: Props) => {
  const [pokemons, setPokemons] = useState(data);
  const [sortOrder, setSortOrder] = useState(true);
  const [sortItem, setSortItem] = useState<PokemonStatsKey>('HP');
  const handleSorting = useCallback(
    (key: PokemonStatsKey) => {
      const newPokemons = pokemons.sort((pokemon1, pokemon2) => {
        if (!sortOrder && sortItem === key) {
          setSortOrder(true);
          return parseInt(pokemon1.stats[key]) - parseInt(pokemon2.stats[key]);
        } else {
          setSortOrder(false);
          return parseInt(pokemon2.stats[key]) - parseInt(pokemon1.stats[key]);
        }
      });
      if (sortItem !== key) setSortItem(key);
      setPokemons(newPokemons);
    },
    [sortOrder, sortItem],
  );
  return (
    <motion.table variants={fadeInUp} className="w-full select-none">
      <thead className="font-bold">
        <tr className="flex text-left mb-5 p-5 cursor-pointer">
          <th className="flex-1"></th>
          <th className="flex-[2_2_0%]"></th>
          {tableKey.map((headName) => (
            <th className="flex-1" onClick={() => handleSorting(headName)}>
              {headName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {pokemons.map((pokemonData) => (
          <Link
            key={pokemonData.id}
            href={`/pokemon/${pokemonData.name}`}
            data-testid={`pokemon-${pokemonData.id}`}
          >
            <motion.tr
              className="h-20 flex items-center cursor-pointer p-5 rounded-md"
              whileHover={{ backgroundColor: '#eeeeee' }}
              whileTap={{ backgroundColor: '#ffffff' }}
            >
              <td className="flex-[2_2_0%] font-bold">{pokemonData.name}</td>
              <td className="flex-1">
                <img
                  className=" rounded-lg border-slate-300 border p-2 bg-white h-14 w-14"
                  src={pokemonData.image}
                  aria-label={pokemonData.name}
                  alt={pokemonData.name}
                />
              </td>
              {tableKey.map((item: PokemonStatsKey) => (
                <td className="flex-1">{pokemonData.stats[item]}</td>
              ))}
            </motion.tr>
          </Link>
        ))}
      </tbody>
    </motion.table>
  );
};
