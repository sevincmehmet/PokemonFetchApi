
class Pokemon {
    constructor(oParam, oIndex, oEvolution) {
        this.pokemonDetails = oParam;
        this.oIndex = oIndex;
        this.oEvolution = oEvolution;

        this.createCard(this.pokemonDetails);
    }
    createCard(pokemonDetails) {
        var oCard = this.render(pokemonDetails);

        var div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("id", `card-${this.oIndex}`);
        div.innerHTML = oCard;
        document.getElementsByClassName("container")[0].appendChild(div);
    }
    render(pokemonDetails) {
        var newCard = `
        <ul>
            <li>
                <div class="card-header">
                    <i class="pvet fa-solid fa-chevron-left"></i>
                    <div class="title">${pokemonDetails.name[0].toUpperCase()+pokemonDetails.name.slice(1).toLowerCase()}</div>
                    <i class="star fa-regular fa-star"></i>

                </div>
            </li>
            <li>
                <div class="image">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.oIndex}.svg" alt="pokemon resmi">
                </div>
            </li>
            <li>
                <div class="contend-section">
                    <div class="contend-nav">
                        <ul>
                            <li>
                                <strong class="isActive" id="1-${this.oIndex}" onclick="isActive(1, ${this.oIndex})" >About</strong>
                            </li>
                            <li>
                                <strong class="" id="2-${this.oIndex}" onclick="isActive(2, ${this.oIndex})" >Stats</strong>
                            </li>
                            <li>
                                <strong class="" id="3-${this.oIndex}" onclick="isActive(3, ${this.oIndex})" >Moves</strong>
                            </li>
                            <li>
                                <strong class="" id="4-${this.oIndex}" onclick="isActive(4, ${this.oIndex})" >Evolution</strong>
                            </li>
                           
                        </ul>
                    </div>
                    <div id='2-section-${this.oIndex}' style="display:none;" class="stats">
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
                                    <div class="ratio ${this.oIndex}" style="width: ${pokemonDetails.stats[0].base_stat}%" ></div>
                                </div>
                            </li>
                            <li>
                                <div class="stats-ratio">
                                    <div class="ratio ${this.oIndex}" style="width: ${pokemonDetails.stats[1].base_stat}%" ></div>
                                </div>
                            </li>
                            <li>
                                <div class="stats-ratio">
                                    <div class="ratio ${this.oIndex}" style="width: ${pokemonDetails.stats[3].base_stat}%" ></div>
                                </div>
                            </li>
                            <li>
                                <div class="stats-ratio">
                                    <div class="ratio ${this.oIndex}" style="width: ${pokemonDetails.stats[4].base_stat}%" ></div>
                                </div>
                            </li>
                            <li>
                                <div class="stats-ratio">
                                    <div class="ratio ${this.oIndex}" style="width: ${pokemonDetails.stats[5].base_stat}%" ></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id='1-section-${this.oIndex}' style="display: block;" class="about">
                    <div class="article">
                        <strong>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ex cum eveniet
                            rerum. 
                        </strong>
                    </div>
                    <div class="physical">
                        <strong>
                            <ul>
                                <li>Category: <strong id="catagory">${pokemonDetails.types[0].type.name}</strong></li>
                                <li>Height: <strong id="height">${pokemonDetails.height}</strong></li>
                                <li>Weight: <strong id="weight">${pokemonDetails.weight}</strong></li>
                                <li>Abilities: <strong id="abilities-${this.oIndex}">${pokemonDetails.abilities[0]?.ability.name},${pokemonDetails.abilities[1]?.ability.name}</strong></li>
                            </ul>
                        </strong>
                    </div>
                </div>
                <div style="display: none;" class="moves">
                            <ul class="ulTop">
                                <li>
                                    ${pokemonDetails.moves[0]?.move.name}
                                </li>
                                <li>
                                    ${pokemonDetails.moves[1]?.move.name}
                                </li>
                                <li>
                                    ${pokemonDetails.moves[2]?.move.name}
                                </li>
                            </ul>

                            <ul class='ulBottom'>
                                <li>
                                    ${pokemonDetails.moves[3]?.move.name}
                                </li>
                                <li>
                                    ${pokemonDetails.moves[4]?.move.name}
                                </li>
                            </ul>
                        </div>
                        <div style="display:none;" class="evolution">
                            <ul>
                                <li id="evo-1">
                                    <strong>
                                        EVO1
                                    </strong>
                                </li>

                                <li id="evo-2">
                                    <strong>
                                        EVO2
                                    </strong>
                                </li>
                        
                                <li id="evo-3">
                                    <strong>
                                        EVO3
                                    </strong>
                                </li>

                              
                            </ul>
                        </div>
                </div>
            </li>

        </ul>
`
        return newCard;
    }
}
