import React from "react";

import { PokemonImage, Pokemon, PokemonList, Pages } from "./Components";
import { usePokemon } from "./usePokemon";

import "./App.css";

function App() {
  const {
    error,
    pageCount,
    setCurrentPage,
    pokemonList,
    setSelectedPokemonID,
    selectedPokemon,
  } = usePokemon();

  return (
    <div className="app">
      {error && <div>We encountered an error. Please try again later.</div>}
      {!error && (
        <div className="container">
          <div>
            <PokemonList
              pokemonList={pokemonList}
              onClick={setSelectedPokemonID}
            />
            <Pages pageCount={pageCount} onClick={setCurrentPage} />
          </div>
          <div>
            <Pokemon pokemon={selectedPokemon} />
          </div>
          <div>
            <PokemonImage pokemon={selectedPokemon} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
