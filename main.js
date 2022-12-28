import axios from "axios"

const pokemonDetail = async (url) => {
  const response = await axios.get(url)
  if (response.status === 200) {
    return response.data
  }
}

const getPokemons = async () => {
  const pokemonsUrl = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20')
  if (pokemonsUrl.status === 200) {
    const test = pokemonsUrl.data.results
    const arrayPromises = test.map(async(item) => await pokemonDetail(item.url))
    Promise.allSettled(arrayPromises)
    .then(response => {
      console.log(response)
    })
  }
}

getPokemons()