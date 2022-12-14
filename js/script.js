const pokeCount = 500;
const colors = {
    fire: "tomato",
    grass: "lightgreen",
    electric: "#FCF7DE",
    water: "lightblue",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#d6b3ff",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#e0f5ff ",
};

const initPokemon = async() => {
    for (let i = 1; i <=  pokeCount; i++) {
        await getPokemon(i); // fonksiyonumuzu bloklamaması için tamamlanmadan diğerine geçebilirsin dedik
    }
}

const getPokemon = async(id) => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) //bilgilerimi idye göre teker teker çekiyorum
    let data = await resp.json();// json formatına dönüştürdüm
    const resp1 = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`) //bilgilerimi idye göre teker teker çekiyorum
    let data1 = await resp1.json();// json formatına dönüştürdüm
    createPokemon(data, data1); // datamın özelliklerini kullanabilmek için fonksiyon olusturduk
    console.log(data);
};

initPokemon();

function createPokemon(pokemon, evolution) {
    
    const id = pokemon.id; //yeni parametrelerin kaç olacagını gööstermektedir.
    const type = pokemon.types[0].type.name;
    const color = colors[type];
       
    new Pokemon(pokemon, id, evolution);
    document.getElementById(`card-${id}`).style.cssText = `background:repeating-linear-gradient(${color}, white);`

    for (let i = 0; i < 5; i++) {
        document.getElementsByClassName(`${id}`)[i].style.background = `${color}`;
    }
  
}


function isActive(oItemIndex, oIndex) {
    document.getElementById(`${oItemIndex}-${oIndex}`).setAttribute('class', 'isActive')
    document.getElementById(`${oItemIndex}-section-${oIndex}`).style.cssText = "display:block";
}
