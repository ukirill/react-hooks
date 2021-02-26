// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonDataView, PokemonForm, PokemonInfoFallback, fetchPokemon} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }

    const asyncFetch = async () => {
      try {
        const result = await fetchPokemon(pokemonName)
        setPokemon(result)
      }
      catch (e) {
        setError(e)
      }
    }

    setPokemon(null)
    setError(null)
    asyncFetch()
  }, [pokemonName])

  if (!pokemonName) {
    return 'Submit a pokemon'
  }
  if (error) {
    return <Error error={error} />
  }
  if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  }
  return <PokemonDataView pokemon={pokemon} />
}

function Error({ error }) {
  return <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
