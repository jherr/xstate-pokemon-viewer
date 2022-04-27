import { useReducer, useEffect, useCallback } from "react";

export const usePokemon = () => {
  const [state, dispatch] = useReducer(
    (originalState, stateUpdate) => ({
      ...originalState,
      ...stateUpdate,
    }),
    {
      error: null,
      currentPage: 0,
      pageCount: 0,
      pokemonList: [],
      selectedPokemon: null,
      selectedPokemonID: null,
    }
  );

  useEffect(() => {
    dispatch({ selectedPokemon: null });
    fetch(`/pages/${state.currentPage}.json`)
      .then((res) => res.json())
      .then(({ pageCount, list }) => {
        dispatch({ pageCount, pokemonList: list });
      })
      .catch(() => dispatch({ error: true }));
  }, [state.currentPage]);

  useEffect(() => {
    dispatch({ selectedPokemon: null });
    if (state.selectedPokemonID) {
      fetch(`/pokemon/${state.selectedPokemonID}.json`)
        .then((res) => res.json())
        .then((selectedPokemon) => dispatch({ selectedPokemon }))
        .catch(() => dispatch({ error: true }));
    }
  }, [state.selectedPokemonID]);

  const setCurrentPage = useCallback(
    (page) => dispatch({ currentPage: page }),
    []
  );
  const setSelectedPokemonID = useCallback(
    (id) => dispatch({ selectedPokemonID: id }),
    []
  );

  return {
    error: state.error,
    pageCount: state.pageCount,
    setCurrentPage,
    pokemonList: state.pokemonList,
    setSelectedPokemonID,
    selectedPokemon: state.selectedPokemon,
  };
};
