let addIngredientesbtn = document.getElementById('addIngredientesbtn');
let listaIngredientes = document.querySelector('.listaIngredientes');
let divIngredientes = document.querySelectorAll('.divIngredientes')[0];

addIngredientesbtn.addEventListener('click',function(){
    let novoIngredientes = divIngredientes.cloneNode(true);
    let input = novoIngredientes.getElementsByTagName('input')[0];
    input.value = '';
    listaIngredientes.appendChild(novoIngredientes);

});




