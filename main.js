import axios from "axios"

const wrapper = document.querySelector('#wrapper')

const pokemonDetail = async (url) => {
  const response = await axios.get(url)
  if (response.status === 200) {
    return response.data
  } else {
    return []
  }
}

const getPokemons = async () => {
  const pokemonsUrl = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20')
  if (pokemonsUrl.status === 200) {
    const test = pokemonsUrl.data.results
    const arrayPromises = test.map(async(item) => await pokemonDetail(item.url))
    Promise.allSettled(arrayPromises)
    .then(response => {
      const valores = response.map((item) => item.value)
      const pokemons = valores.map(pokemon => {
        return {
          name: pokemon.name,
          img: pokemon.sprites.other["official-artwork"].front_default,
          stats: pokemon.stats
        }
      })
      pokemons.forEach((pokemon) => {

        const hp = pokemon.stats.find(stat => stat.stat.name === 'hp')
        const attack = pokemon.stats.find(stat => stat.stat.name === 'attack')
        const defense = pokemon.stats.find(stat => stat.stat.name === 'defense')
        const card = document.createElement('div')
        card.innerHTML = `
        <div id="card" class="pokemon_card">
        <h5>${pokemon.name}</h5>
        <img src="${pokemon.img}" alt="imagen pokemon">
        <div class="stats_elements">
          <span>hp <strong>${hp.base_stat}</strong></span>
          <span>attack <strong>${attack.base_stat}</strong></span>
          <span>Defense <strong>${defense.base_stat}</strong></span>
        </div>
      </div>
        `
        wrapper.appendChild(card)
      })
    })
  }
}

getPokemons()