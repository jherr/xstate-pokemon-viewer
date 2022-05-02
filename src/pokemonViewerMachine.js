import { createMachine } from "xstate";

export default /** @xstate-layout N4IgpgJg5mDOIC5QAUD2BrMBbVA7AagJZgDuYATgHQwAuamOuAMobDQMQR5iWG4BuGHvWx4ipCtTB0hjFmwR9BAYwCGNQngDaABgC6iUAAdUsQhryGQAD0QBaACwBmJ5QAcLnQFY3DgEwAjE4OAGwA7AA0IACe9gFhrn5+TgCcLiFJGX4ODgC+uVEijOJkVLRFePIcFOSoVEYANuoAZnVYlBUExKVSMgyVrDSKAqhqFri6BkggJmbjVrYIdiEpOpSpYQ5eIRkhDmEpUbFLwZQpDm5eAaF+KclOHvmFsmLdkrAAFqgknVXsAMoAUQAKgB9IFMQEAYWBgIAIqDkAB5ADSgIAskiAHKggCScKss3MmlwCzibjc6z8lwC2x0bj8VwyR3spwOOzCYRCHgS2SeIE6JUk5ReuE43F4I0wHVFQrK0k6wxU6hJk0JpmJlmmi2urh5-h0YQCjJSXicLIQYS8lDCSQCAR0hr8CR0yX5gre8r6ojFNTqlEaLTaMv6XQkXsVSlGKu0+nVcxJZKWOQclC8yQCKwpOhS8QCFtNlEC-jcOhCwW2jJC7tlnson2+nQBIPBgMhMPhiNRGOxeIJ0yJ821cTZKTcKW56YOhq2FoCKRSaZ013TqVz+z5BQFtfDzbBUIAqgAlI+ArFg5AAQQA4oD45rScOluFU5nTeWnA67uaYvZnYuwldFw-BzICQi8fIt1wVAIDgKwPXDXpfkGe8h1ARY7CNAJKH2TNth2DwaQtOwAkuG1nXiDxDXApwa1DOV6y+H5RSqVDEyfRxbkoHRP3LecrVNc4HGIhxsK2bIkjuLxnFpFI6J9BiGxIQFyFqcg2K1dD7BWVMnHAhwyy2Wl4hCC0rncZc3BCe1OSNUs3Hk4o6xFUMNMfLSlmuAC9h4tIPCcHx0wtcsi1Iy4rXZYJHQgrcEJ6JTOjcpN4j8birJSW1SOdHIvAtQJUouDKnCNHivEdJw-Ec15wySjiEmtXDwJ2bkHiuYi9NTFYKvnVZpLcIJINyIA */
createMachine(
  {
    on: {
      SET_CURRENT_PAGE: {
        actions: "saveCurrentPage",
        target: ".getPokemonList",
      },
    },
    id: "PokemonViewer",
    initial: "getPokemonList",
    states: {
      getPokemonList: {
        invoke: {
          src: "fetchCurrentPage",
          onDone: [
            {
              actions: "savePokemonList",
              target: "showPokemonList",
            },
          ],
          onError: [
            {
              target: "showError",
            },
          ],
        },
      },
      showPokemonList: {
        on: {
          SET_SELECTED_POKEMON_ID: {
            actions: "saveSelectedPokemonID",
            target: "getPokemon",
          },
        },
      },
      showError: {},
      getPokemon: {
        invoke: {
          src: "getSelectedPokemon",
          onDone: [
            {
              actions: "savePokemon",
              target: "showPokemon",
            },
          ],
          onError: [
            {
              target: "showError",
            },
          ],
        },
      },
      showPokemon: {
        on: {
          SET_SELECTED_POKEMON_ID: {
            actions: "saveSelectedPokemonID",
            target: "getPokemon",
          },
        },
      },
    },
  },
  {
    context: {
      pageCount: 0,
      pokemonList: [],
      currentPage: 0,
      selectedPokemonID: null,
      selectedPokemon: null,
    },
    actions: {
      saveCurrentPage: (context, event) => {
        context.currentPage = event.page;
        context.selectedPokemon = null;
        context.selectedPokemonID = null;
      },
      savePokemon: (context, event) => {
        context.selectedPokemon = event.data;
      },
      saveSelectedPokemonID: (context, event) => {
        context.selectedPokemonID = event.id;
      },
      savePokemonList: (context, event) => {
        context.pokemonList = event.data.list;
        context.pageCount = event.data.pageCount;
      },
    },
    services: {
      getSelectedPokemon: (context) =>
        fetch(`/pokemon/${context.selectedPokemonID}.json`).then((res) =>
          res.json()
        ),
      fetchCurrentPage: (context) =>
        fetch(`/pages/${context.currentPage ?? 0}.json`).then((res) =>
          res.json()
        ),
    },
  }
);
