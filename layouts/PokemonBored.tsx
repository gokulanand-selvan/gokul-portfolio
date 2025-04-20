import React, { useEffect, useState } from "react";

// Define a TypeScript type for the Pokémon data
type Pokemon = {
  name: string;
  image: string;
  types: string[];
  characteristic: string;
  sound: string; // Added a new field for Pokémon cries
};

const PokemonBored: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setPokemon(null);
    const randomId = Math.floor(Math.random() * 1010) + 1;

    // Check if Pokémon is already in session storage
    const cachedPokemon = sessionStorage.getItem(`pokemon-${randomId}`);
    if (cachedPokemon) {
      setPokemon(JSON.parse(cachedPokemon));
      return;
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const data = await response.json();

      const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${data.name.toLowerCase()}.mp3`;

      const newPokemon = {
        name: data.name,
        image: data.sprites?.other["official-artwork"]?.front_default || "",
        types: data.types.map((typeInfo: any) => typeInfo.type.name),
        characteristic: "No characteristic available",
        sound: cryUrl,
      };

      // Store in session storage
      sessionStorage.setItem(`pokemon-${randomId}`, JSON.stringify(newPokemon));

      setPokemon(newPokemon);
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
      setPokemon(null);
    }
  };

  return (
    <section className="bg-black text-white min-h-[380px] px-28 flex items-center justify-evenly flex-col md:flex-row ">
      <div className="py-4 flex flex-col items-center">
        {pokemon && (
          <div className="border-2 md:w-fit p-4 rounded-lg">
            <div className="min-h-64 min-w-64 ">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="mx-auto bg-white w-64 object-contain h-64 shadow-md"
              />
            </div>
            <h1 className="text-2xl text-center font-bold capitalize mt-4">
              {pokemon.name}
            </h1>
            <p className="mt-2">
              <strong>Type:</strong> &nbsp;
              <span className="text-xl text-pink-400">
                {pokemon.types.join(", ")}
              </span>
            </p>
            <p className="mt-2 text-center">
              <strong>It sounds like</strong> &nbsp;
              {pokemon.sound && (
                <audio controls className="mt-2">
                  <source src={pokemon.sound} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </p>
            {/* <p className="mt-2">
              <strong>Characteristic:</strong> {pokemon.characteristic}
            </p> */}
          </div>
        )}
        {!pokemon && (
          <div className="min-h-72 flex justify-center items-center border-emerald-100 min-w-64 ">
            <p className="text-xl text-center">Loading Pokémon...</p>
          </div>
        )}
      </div>
      <div className="py-4 flex flex-col items-center gap-10 font-semibold text-xl text-center">
        "A fun way to showcase dynamic data fetching—who's your surprise Pokémon
        today?"
        <button
          onClick={fetchPokemon}
          className="ml-2 bg-blue-500 px-4 py-2 rounded"
        >
          Switch Pokemon
        </button>
      </div>
    </section>
  );
};

export default PokemonBored;
