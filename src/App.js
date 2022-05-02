import React from "react";
import { useMachine } from "@xstate/react";

import { PokemonImage, Pokemon, PokemonList, Pages } from "./Components";
import pokemonViewerMachine from "./pokemonViewerMachine";

import "./App.css";

function App() {
  const [
    {
      value,
      context: { pageCount, pokemonList, selectedPokemon },
    },
    send,
  ] = useMachine(pokemonViewerMachine);
  const error = value === "showError";
  const setCurrentPage = () => {};

  return (
    <div className="app">
      {error && <div>We encountered an error. Please try again later.</div>}
      {!error && (
        <div className="container">
          <div>
            <PokemonList
              pokemonList={pokemonList}
              onClick={(id) => {
                send({
                  type: "SET_SELECTED_POKEMON_ID",
                  id,
                });
              }}
            />
            <Pages
              pageCount={pageCount}
              onClick={(page) =>
                send({
                  type: "SET_CURRENT_PAGE",
                  page,
                })
              }
            />
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
