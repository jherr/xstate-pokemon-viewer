import React from "react";

export const PokemonList = ({ pokemonList, onClick }) =>
  (pokemonList ?? []).map((p) => (
    <div key={p.id}>
      <a
        href="/"
        onClick={(evt) => {
          evt.preventDefault();
          onClick(p.id);
        }}
      >
        {p.name}
      </a>
    </div>
  ));

export const Pages = ({ pageCount, onClick }) => (
  <div className="pages">
    Page:{" "}
    {new Array(pageCount ?? 0).fill(0).map((_, i) => (
      <React.Fragment key={i}>
        {i > 0 && " "}
        <a
          href="/"
          onClick={(evt) => {
            evt.preventDefault();
            onClick(i);
          }}
        >
          {i + 1}
        </a>
      </React.Fragment>
    ))}
  </div>
);

export const Pokemon = ({ pokemon }) =>
  pokemon && (
    <div className="value-grid">
      {Object.entries(pokemon).map(([key, value]) => (
        <React.Fragment key={key}>
          <div className="parameter">{key}</div>
          <div>{Array.isArray(value) ? value.join(", ") : value}</div>
        </React.Fragment>
      ))}
    </div>
  );

export const PokemonImage = ({ pokemon }) =>
  pokemon && (
    <img
      src={`/pokemon/${pokemon.id}.jpg`}
      alt={pokemon.name}
      className="pokemon-image"
    />
  );
