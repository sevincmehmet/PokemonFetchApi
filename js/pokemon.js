
class Pokemon{
  
    render(pokemonDetails, imgIndex) {
        var newCard = `
        <ul>
            <li>
                <div class="card-header">
                    <i class="pvet fa-solid fa-chevron-left"></i>
                    <div class="title">${Object.keys(pokemonDetails).toString()
                    }</div>
                    <i class="star fa-regular fa-star"></i>

                </div>
            </li>
            <li>
                <div class="image">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${imgIndex}.svg" alt="pokemon resmi">
                </div>
            </li>
            <li>
                <div class="contend-section">
                    <div class="contend-nav">
                        <ul>
                            <li>
                                <strong class="isActive" id="1-${imgIndex}" onclick="isActive(1, ${imgIndex})" >About</strong>
                            </li>
                            <li>
                                <strong class="" id="2-${imgIndex}" onclick="isActive(2, ${imgIndex})" >Stats</strong>
                            </li>
                            <li>
                                <strong class="" id="3-${imgIndex}" onclick="isActive(3, ${imgIndex})" >Moves</strong>
                            </li>
                            <li>
                                <strong class="" id="4-${imgIndex}" onclick="isActive(4, ${imgIndex})" >Evolution</strong>
                            </li>
                           
                        </ul>
                    </div>
                    <div id='2-section-${imgIndex}' style="display:none;" class="stats">
                        <ul class="">
                            <li>
                                <strong>HP</strong>
                            </li>
                            <li>
                                <strong>Attack</strong>
                            </li>
                            <li>
                                <strong>Sp. Attack</strong>
                            </li>
                            <li>
                                <strong>Sp. Defance</strong>
                            </li>
                            <li>
                                <strong>Speed</strong>
                            </li>
                        </ul>
                        <ul class="container-stats-ratio">
                            <li>
                                <div class="stats-ratio">
                                    <div class="ratio ${imgIndex}" style="width: ${Object.values(pokemonDetails)[0][0]['stats'][0].hp
                                }%" ></div>
                                </div>
                            </li>
                            <li>
                                <div class="stats-ratio">
                                    <div class="ratio ${imgIndex}" style="width: ${Object.values(pokemonDetails)[0][0]['stats'][1].attack}%" ></div>
                                </div>
                            </li>
                            <li>
                                <div class="stats-ratio">
                                    <div class="ratio ${imgIndex}" style="width: ${Object.values(pokemonDetails)[0][0]['stats'][2]}%" ></div>
                                </div>
                            </li>
                            <li>
                                <div class="stats-ratio">
                                    <div class="ratio ${imgIndex}" style="width: ${Object.values(pokemonDetails)[0][0]['stats'][3].spDefance}%" ></div>
                                </div>
                            </li>
                            <li>
                                <div class="stats-ratio">
                                    <div class="ratio ${imgIndex}" style="width: ${Object.values(pokemonDetails)[0][0]['stats'][3].spDefance}%" ></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id='1-section-${imgIndex}' style="display: block;" class="about">
                    <div class="article">
                        <strong>
                            ${Object.values(pokemonDetails)[0][0]['about'][0].text}
                        </strong>
                    </div>
                    <div class="physical">
                        <strong>
                            <ul>
                                <li>Category: <strong id="catagory">${Object.values(pokemonDetails)[0][0]['about'][1].catagory}</strong></li>
                                <li>Height: <strong id="height">${Object.values(pokemonDetails)[0][0]['about'][2].height} m</strong></li>
                                <li>Weight: <strong id="weight">${Object.values(pokemonDetails)[0][0]['about'][3].weight} kg</strong></li>
                            </ul>
                        </strong>
                    </div>
                </div>
                <div id="3-section-${imgIndex}" style="display: none;" class="moves">
                            <ul class="ulTop">
                                <li>
                                    ${Object.values(pokemonDetails)[0][0]['moves'][0].mv1}
                                </li>
                                <li>
                                    t${Object.values(pokemonDetails)[0][0]['moves'][1].mv1}
                                </li>
                                <li>
                                    ${Object.values(pokemonDetails)[0][0]['moves'][2].mv1}
                                </li>
                            </ul>

                            <ul class='ulBottom'>
                                <li>
                                    ${Object.values(pokemonDetails)[0][0]['moves'][3].mv1}
                                </li>
                                <li>
                                    ${Object.values(pokemonDetails)[0][0]['moves'][4].mv1}
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
`
        return newCard;
    }
}
    