const pokeCount = 33;

var allPokemon = [];

var arrData = [];

let arrEvolution = [];


let arrAbility = [];

let arrImages = [];

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

const initPokemon = async () => {
    for (let i = 1; i <= pokeCount; i++) {
        await getPokemon(i); // fonksiyonumuzu bloklamaması için tamamlanmadan diğerine geçebilirsin dedik
    }
}

const getPokemon = async (id) => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) //bilgilerimi idye göre teker teker çekiyorum
    let data = await resp.json();// json formatına dönüştürdüm

    const resp1 = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`) //bilgilerimi idye göre teker teker çekiyorum
    let data1 = await resp1.json();// json formatına dönüştürdüm

    const resp2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`) //bilgilerimi idye göre teker teker çekiyorum
    let data2 = await resp2.json();// json formatına dönüştürdüm

    createPokemon(data, data1); // datamın özelliklerini kullanabilmek için fonksiyon olusturduk


    if (data1.chain) {
        arrEvolution.push({
            [data1.chain.species.name]: [data1.chain.species.name]
        });
    }

    if (data1.chain.evolves_to[0]) {
        arrEvolution[id - 1][data1.chain.species.name].push(
            data1.chain.evolves_to[0].species.name
        );
        if (data1.chain.evolves_to[0].evolves_to[0]) {
            arrEvolution[id - 1][data1.chain.species.name].push(
                data1.chain.evolves_to[0].evolves_to[0].species.name,
            );
        }
    }
    arrAbility.push({
        ['abilities']: [data.abilities[0].ability.name]
    });
    arrAbility[0]['abilities'].push(
        data.abilities[1]?.ability.name
    );


    //elimizddeki veri daha düzenli hale getiriliyor 
    allPokemon.push({
        [data.name]: [
            {
                'about': [

                    { 'text': data2.flavor_text_entries[0].flavor_text },
                    { 'catagory': data.types[0].type.name },
                    { 'height': data.height },
                    { 'weight': data.weight },
                    { 'abiliities': arrAbility[id - 1] }

                ],
                'stats': [
                    { 'hp': data.stats[0].base_stat },
                    { 'attack': data.stats[1].base_stat },
                    { 'spAttack': data.stats[3].base_stat },
                    { 'spDefance': data.stats[4].base_stat },
                    { 'speed': data.stats[5].base_stat }
                ],
                'moves': [

                    { 'mv1': data.moves[0].move.name },
                    { 'mv1': data.moves[1].move.name },
                    { 'mv1': data.moves[2].move.name },
                    { 'mv1': data.moves[3]?.move.name },
                    { 'mv1': data.moves[4]?.move.name }
                ],
                'evolutions': [

                ],
                'img': [

                ]
            }
        ]
    });
    arrData.push(data);
};







initPokemon();


let i;
let counter = 0;
let counterMainDiv;
var allValues = [];
var arrDelete = [];
var arrDeletePokemon = [];
function createPokemon(pokemon) {


    if (arrData.length === pokeCount - 1) {

        for (let i = 0; i < arrEvolution.flatMap(Object.values).length; i++) {
            for (let j = 0; j < arrEvolution.flatMap(Object.values)[0].length; j++) {
                arrEvolution.flatMap(Object.values)[i][j] == undefined ? j++ : allValues.push(arrEvolution.flatMap(Object.values)[i][j])
            }
        }


        //Bu for döngüsü kaç tane main-card almam gerektiğini söylüyor
        for (i = 1; i < arrEvolution.length; i++) {

            for (let j = 0; j < Object.values(arrEvolution[i])[0].length; j++) {
                counter++

                if (counter == pokeCount - 1) {
                    counterMainDiv = i;
                    break;
                }
            }
        }




        let poke = new Pokemon();
        let pokemonCounter = 0;
        //cartlarımı içine atacagım mainDiv lerimi olusturuyor
        for (let i = 0; i < counterMainDiv; i++) {
            let mainCardDiv = document.createElement('div');
            mainCardDiv.classList.add('main-card');
            mainCardDiv.setAttribute('id', `main-card-${i}`)
            document.getElementsByClassName('container')[0].appendChild(mainCardDiv);
        }

        for (let i = 0; i < counterMainDiv; i++) {
            for (let j = 0; j < Object.values(arrEvolution[i])[0].length; j++) {
                let card = document.createElement('div')
                card.classList.add('card');
                card.style.display = 'none'; //olusturdugum an gizliyorum
                
                pokemonCounter++;
                card.innerHTML = poke.render(allPokemon[pokemonCounter - 1], pokemonCounter);;

                document.getElementsByClassName('main-card')[i].appendChild(card)
            }
        }

        for (let i = 0; i < arrEvolution.length; i++) {
            for (let j = 1; j < Object.values(arrEvolution[0])[0].length
                ; j++) {

                if (!(Object.values(arrEvolution[i])[0][j] == undefined)) {
                    arrDelete.push(Object.values(arrEvolution[i])[0][j])
                }
            }
        }

        arrDelete.forEach(element => {
            for (let i = 0; i < allPokemon.length; i++) {
                if (element == Object.keys(allPokemon[i]).toString()) {

                    arrDeletePokemon.push(allPokemon[i])

                    allPokemon.splice(i, 1);

                }
            }
        });

        for (let i = 1; i < pokeCount; i++) {
            arrImages.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg`)            
        }
        let pushCounter = 0;
        let deleteCounter = 0;
        for (let i = 0; i < allPokemon.length; i++) {
            for (let j = 0; j < arrEvolution.length; j++) {
                if (Object.keys(arrEvolution[j]).toString() == Object.keys(allPokemon[i]).toString()) {
                    for (let k = 1; k < Object.values(arrEvolution[j])[0].length; k++) {

                        allPokemon[deleteCounter][Object.keys(allPokemon[i]).toString()][0]['evolutions'].push(arrDeletePokemon[pushCounter]);
                       
                        pushCounter++;

                        allPokemon[i][Object.keys(allPokemon[i]).toString()][0]['img'].push(arrImages[pushCounter]);

                    }
                    deleteCounter++;

                }
            }
        }




        if (Object.keys(allPokemon[0]).toString() == Object.keys(arrEvolution[0]).toString()) {

        }


        ilkSlaytGoster();

        //slayt değiştirme tusuna basma kontrolü
        for (let i = 0; i < document.getElementsByClassName('main-card').length; i++) {
            for (let j = 0; j < document.getElementsByClassName('main-card')[i].getElementsByClassName('card').length; j++) {
                document.getElementsByClassName('main-card')[i].getElementsByClassName('card')[j].getElementsByClassName('pvet')[0].addEventListener('click', function () {
                    slaytGoster(i, j);
                })
                document.getElementsByClassName('main-card')[i].getElementsByClassName('card')[j].getElementsByClassName('star')[0].addEventListener('click', function () {
                    favEkle(i, j);
                })
            }
        }
       


    }// burda tek sefer doner

}
let pokemonCounter = 0;
let favMainCardCounter = 0;


function favEkle(mainNum, cardNum) {


    if(favMainCardCounter == 0) {
        let mainTitle = document.getElementsByClassName('fav-container')[0].getElementsByClassName('main-title')[0]
        
        mainTitle.style.display='block'
        mainTitle.classList.add('slide-out-blurred-right')
        setTimeout(function() {
            mainTitle.classList.remove('slide-out-blurred-right')
        },700)
    }

    console.log(`mainNum : ${mainNum}\ncardNum : ${cardNum}`);

    //favori kartların mainleri burda olusuyor
    let favMainCardDiv = document.createElement('div');
    favMainCardDiv.classList.add('slide-out-blurred-right')
    setTimeout(function() {
        favMainCardDiv.classList.remove('slide-out-blurred-right')

    },700)
    favMainCardDiv.classList.add('fav-main-card');
    favMainCardDiv.setAttribute('id',`fav-main-card-${favMainCardCounter}`)

    setTimeout(function () {
        favMainCardDiv.classList.add('slide-out-blurred-left')
        setTimeout(function() {
            favMainCardDiv.classList.remove('slide-out-blurred-left')
    
        })
    }, 700)
    document.getElementsByClassName('fav-container')[0].appendChild(favMainCardDiv);

    let favPoke = new Pokemon();

    //main cardına göre alınan tamamını ekrana bastırıyorum
            
    let favCard = document.createElement('div')
                favCard.classList.add('fav-card');

                
                //burda mainNumarası ve resim numarası alınan pokemonu olusturuyor
                for (let i = 0; i <document.getElementsByClassName('main-card').length; i++) {
                    for (let j = 0; j < document.getElementsByClassName('main-card')[i].getElementsByClassName('card').length; j++) {
                        if (i == mainNum && j == cardNum) {
                           favCard.innerHTML = favPoke.render(allPokemon[mainNum], pokemonCounter+1);
                            break; 
                        }
                        pokemonCounter++
                    }                    
                }


                document.getElementsByClassName('fav-main-card')[favMainCardCounter].appendChild(favCard)             
                pokemonCounter=0 
    for (let counter = 0; counter < Object.values(arrEvolution[mainNum])[0].length; counter++) {
                
                  
            }

            for (let i = 0; i < favMainCardCounter+1; i++) {
                document.getElementById(`fav-main-card-${i}`).getElementsByTagName('i')[1].removeAttribute('class', 'fa-regular fa-star')
                document.getElementById(`fav-main-card-${i}`).getElementsByTagName('i')[1].setAttribute('class', 'star fa-solid fa-star')
                document.getElementById(`fav-main-card-${i}`).getElementsByTagName('i')[1].style.color = "yellow"
            }
            document.getElementById(`fav-main-card-${favMainCardCounter}`).getElementsByTagName('i')[1].setAttribute('onclick',`favRemove(${favMainCardCounter})`)

            

            favMainCardCounter++

                

                document.getElementById(`main-card-${mainNum}`).classList.add('slide-out-blurred-left');
                setTimeout(function() {
                    document.getElementById(`main-card-${mainNum}`).style.display = "none" 
                    document.getElementById(`main-card-${mainNum}`).classList.remove('slide-out-blurred-left');

                },700)

               
}


function favRemove(idNum) {

  
    for (let i = 0; i < document.getElementsByClassName('main-card').length; i++) {
        if ( document.getElementById(`main-card-${i}`).getElementsByClassName('title')[0].innerHTML == document.getElementById(`fav-main-card-${idNum}`).getElementsByClassName('title')[0].innerHTML) {
            document.getElementById(`main-card-${i}`).style.display = "block";
            console.log('eşit');
            break;
        }        
    }

    document.getElementById(`fav-main-card-${idNum}`).classList.add('slide-out-blurred-left');
    setTimeout(function () {
        document.getElementById(`fav-main-card-${idNum}`).classList.remove('slide-out-blurred-left');
        document.getElementById(`fav-main-card-${idNum}`).remove();
    },700)

    if (document.getElementsByClassName('fav-main-card').length <= 1) {
        document.getElementsByClassName('fav-container')[0].getElementsByClassName('main-title')[0]
        .classList.add('slide-out-blurred-left');
        
    }
    
    


}

//slaytımın ilk elemmanını gösteriyor
function ilkSlaytGoster() {
    var mainCard = document.getElementsByClassName('main-card');
    var card = document.getElementsByClassName('card')

    for (let i = 0; i < mainCard.length; i++) {
        for (let j = 0; j < card.length; j++) {
            mainCard[i].getElementsByClassName('card')[0].style.display = 'block';
        }
    }
}




function slaytGoster(mainNum, slaytNo) {

    let mainCard = document.getElementsByClassName('main-card');
    //eğer son sılayta gelirse başa dönüyor
    if (slaytNo >= document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card').length - 1) {
        slaytNo = 0;
        document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card').length - 1].classList.add('slide-out-blurred-left');
        document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[slaytNo].style.display = 'block';
        document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[slaytNo].classList.add('slide-out-blurred-right');

        setTimeout(function () {
            document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card').length - 1].classList.remove('slide-out-blurred-left');
            document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[slaytNo].classList.remove('slide-out-blurred-right');
            document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card').length - 1].style.display = 'none';

        }, 1000)
        return ""
    }

    //ilkini gizleyip sağa atarken ikincisini gösterip sola atıyor
    document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[slaytNo].classList.add('slide-out-blurred-left');
    document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[slaytNo + 1].style.display = 'block';
    document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[slaytNo + 1].classList.add('slide-out-blurred-right');

    setTimeout(function () {
        document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[slaytNo].classList.remove('slide-out-blurred-left');
        document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[slaytNo + 1].classList.remove('slide-out-blurred-right');
        document.getElementById(`main-card-${mainNum}`).getElementsByClassName('card')[slaytNo].style.display = 'none';
    }, 1000)

    return "";

}

function isActive(oItemIndex, oIndex) {

    for (let i = 1; i < 4; i++) {
        document.getElementById(`${i}-${oIndex}`).setAttribute('class', 'isPasive');
        document.getElementById(`${i}-section-${oIndex}`).style.cssText = "display:none";
    }
    document.getElementById(`${oItemIndex}-${oIndex}`).removeAttribute('class', 'isPasive')

    document.getElementById(`${oItemIndex}-${oIndex}`).setAttribute('class', 'isActive')
    document.getElementById(`${oItemIndex}-section-${oIndex}`).style.cssText = "display:block";

}

function searchFunc() {
    let input, filter, card, title, i, txtValue;
    input = document.getElementById("searchInp");
    filter = input.value.toLowerCase();
    card = document.getElementsByClassName('card')
    title = document.getElementsByClassName('title');
    for (i = 0; i < title.length; i++) {
        if (!title[i].innerHTML.toLowerCase().includes(filter)) {
            card[i].style.display = "none";

        }
        else {
            card[i].style.display = "block";
        }
    }
}
