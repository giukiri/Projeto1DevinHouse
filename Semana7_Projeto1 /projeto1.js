// validação dos inputs nos formularios
// input obrigatório
const fields = document.querySelectorAll("[required]")

function ValidateField(field){

        function verifyErrors(){
            let foundError = false

            for( let error in field.validity){

                if(field.validity[error] && !field.validity.valid){
                    foundError = error

                }

            }
            return foundError;
        } 

        function customMessage(typeError){
            const messages = {
                
                text:{
                    valueMissing: "Preencher este campo é obrigatório"
                },
                submit: { 
                    valueMissing: "É obrigatório selecionar uma opção"

                },
                textarea: {
                    valueMissing:" É obrigatório adicionar uma descrição " 
                    
                }
            }

            return messages[field.type][typeError]
        }

        function setCustomMessage(message){
            const spanError = field.parentNode.querySelector("span.input_erro");
            
            if(message){

                spanError.classList.add('active')
                spanError.innerHTML = message
    
                
    
            }else {
                spanError.classList.remove('active')
                spanError.innerHTML = ''
    
                
    
            }
        }

        return function(){

            const error = verifyErrors()

        if(error){
            const message = customMessage(error)

            field.style.borderColor = 'red'
            setCustomMessage(message)
        } else{
            field.style.borderColor = 'green'
            setCustomMessage()
        }

        }
    }

    
function customValidation (event){
    const field = event.target 
    const validation = ValidateField(field)

    validation();
}

for ( const field of fields) {
    field.addEventListener("invalid", event =>{
        event.preventDefault()
        customValidation(event)
    })
    
    field.addEventListener("blur",customValidation)

}

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

})

// segunda validação: maximo de caracteres

// : titulo

let caracteresTitulo = document.querySelector("#input1");

input = caracteresTitulo.querySelector('.input_form');

numeroMin = caracteresTitulo.querySelector(".min")


input.addEventListener("keyup", ()=>{
    let valLength = input.value.length;

 

    numeroMin.innerHTML = valLength;

    valLength > 8 
    ? input.classList.add("active")
    : input.classList.remove("active")

    valLength > 64 
    ? input.classList.add("error")
    : input.classList.remove("error")

})

const texto = document.getElementById("texto");

input.addEventListener('blur', ()=>{
    let valLength = input.value.length;

    if(valLength < 8){
       
        texto.innerHTML = 'Serão aceitas respostas apenas com mais de 8 caracteres'
        
    } 
    if(valLength > 64){

        texto.innerHTML = 'Serão aceitas respostas apenas com menos de 64 caracteres'
    } 

})

// : linguagem/skill

let caracteresLinguagem = document.querySelector("#input2");

input2 = caracteresLinguagem.querySelector('#input_form2');

numeroMin2 = caracteresLinguagem.querySelector(".min2")


input2.addEventListener("keyup", ()=>{
    let valLength2 = input2.value.length;

    numeroMin2.innerHTML = valLength2;

    valLength2 > 4 
    ? input2.classList.add("active")
    : input2.classList.remove("active")

    valLength2 > 16 
    ? input2.classList.add("error")
    : input2.classList.remove("error")

})

const texto2 = document.getElementById("texto2");

input.addEventListener('blur', ()=>{
    let valLength2 = input2.value.length;

    if(valLength2 < 4){
       
        texto2.innerHTML = 'Serão aceitas respostas apenas com mais de 4 caracteres'
        
    } 
    if(valLength2 > 16){

        texto2.innerHTML = 'Serão aceitas respostas apenas com menos de 16 caracteres'
    } 

})


// : descrição

let caracteresDescricao = document.querySelector("#input3");

input3 = caracteresDescricao.querySelector('#input_form3');

numeroMin3 = caracteresDescricao.querySelector(".min3")


input3.addEventListener("keyup", ()=>{
    let valLength3 = input3.value.length;

    numeroMin3.innerHTML = valLength3;

    valLength3 > 32 
    ? input3.classList.add("active")
    : input3.classList.remove("active")

    valLength3 > 512
    ? input3.classList.add("error")
    : input3.classList.remove("error")

})

const texto3 = document.getElementById("texto3");

input3.addEventListener('blur', ()=>{
    let valLength3 = input3.value.length;

    if(valLength3 < 32){
       
        texto3.innerHTML = 'Serão aceitas respostas apenas com mais de 32 caracteres'
        
    } 
    if(valLength3 > 512){

        texto3.innerHTML = 'Serão aceitas respostas apenas com menos de 512 caracteres'
    } 

})


// Salvar os dados do formulário no Local Storage

function salvarFormulario () {

    var inputTitulo = document.getElementById('input_form1').value;
    var inputLinguagem = document.getElementById('input_form2').value;
    var inputCategoriaSelect = document.getElementById('input_form_Categoria');
    var indexCategoria = inputCategoriaSelect.selectedIndex;
    var inputCategoria = inputCategoriaSelect.options[indexCategoria].value;
    var inputDescricao = document.getElementById('input_form3').value;
    var inputUrl = document.getElementById ('input_form_url').value;
    var inputIdentificador = document.getElementsByName('ïdentificador').value;

    var dadosFormulario = JSON.parse(localStorage.getItem("dadosFormulario"))

    if(dadosFormulario == null){
        localStorage.setItem("dadosFormulario", '[]');
        dadosFormulario = [];
    }

    if (typeof inputIdentificador == 'undefined') {
        inputIdentificador = dadosFormulario.length + 1;
    

        var dadosRegistrados =  {
            titulo: inputTitulo,
            linguagem: inputLinguagem,
            categoria: inputCategoria,
            categoriaIndex: indexCategoria,
            descricao:inputDescricao,
            url: inputUrl,
            identificador: inputIdentificador
        }


  
        dadosFormulario.push(dadosRegistrados);

        localStorage.setItem("dadosFormulario", JSON.stringify(dadosFormulario));

        adicionaFormularioNaLista(dadosRegistrados);

        alert("Sua dica foi cadastrada!")

    } else {
        for (dadosRegistrados of dadosFormulario) {
            if (dadosRegistrados != null && dadosRegistrados.identificador == inputIdentificador) {
                dadosRegistrados.titulo= inputTitulo;
                dadosRegistrados.linguagem= inputLinguagem;
                dadosRegistrados.categoria= inputCategoria;
                dadosRegistrados.categoriaIndex= indexCategoria;
                dadosRegistrados.descricao=inputDescricao;
                dadosRegistrados.url= inputUrl;
                atualizaFormularioNaLista(dadosRegistrados);
            }
        }
    }

    // limpaFormulario();
    contadorTotal();
    contadorFront();
    contadorBack();
    contadorFull();
    contadorSkills();

}

// add mais itens no local storage


const btn = document.getElementById('btn_submit');

btn.addEventListener('click',()=>{

        let arrayForm = [];
        if(localStorage.dadosFormulario){
            arrayForm = JSON.parse(localStorage.getItem('dadosFormulario'));

        }

let novoItem = document.getElementsByTagName('input').value;

arrayForm.push(novoItem)

document.getElementsByTagName('input').value = " ";

localStorage.dadosFormulario = JSON.stringify(arrayForm);

})

limpaFormulario = function() {
    document.getElementById('input_form1').value = '';
    document.getElementById('input_form2').value = '';
    var inputCategoriaSelect = document.getElementById('input_form_Categoria');
    inputCategoriaSelect.selectedIndex =0;
    document.getElementById('input_form3').value = '';
    document.getElementById ('input_form_url').value = '';
    document.getElementById('ïdentificador').value = '';

}

adicionaFormularioNaLista = function(dados) {
    var html = "<div  id='item_lista_"+ "<br/>" +dados.identificador+ "<br/>" + "'><div>"+dados.titulo+
               "</div><div>"+ "<br/>" +dados.linguagem+"</div><div>"+ "<br/>" +dados.categoria+
               "</div><div>"+ "<br/>" +dados.descricao+"</div><div>"+ "<br/>" +dados.url+"</div></div>"+
               "<div id='item_botoes_"+dados.identificador+"'></div>";
    var botoes = "<div> <br/> <button onclick='deletarItem("+dados.identificador+")'>Deletar"+
               "</button><button onclick='editarItem("+dados.identificador+")'>Editar"+
               "</button><a href='"+dados.url+"' target='_blank'>Video</a></div>";
    document.getElementById('lista').innerHTML += html;
    document.getElementById('item_botoes_' + dados.identificador).innerHTML = botoes;

}

deletarItem = function(identificador) {
    var dadosFormulario = JSON.parse(localStorage.getItem("dadosFormulario"))
    var deletarConfirm = window.confirm("Você tem certeza que quer deletar este item?")
    if(deletarConfirm === true){
    for (dadosRegistrados of dadosFormulario) {
        if (dadosRegistrados != null && dadosRegistrados.identificador == identificador) {
            var index = dadosFormulario.indexOf(dadosRegistrados);
            dadosFormulario.splice(index, 1);
            document.getElementById('item_lista_' + identificador).innerHTML = '';
            document.getElementById('item_botoes_' + identificador).innerHTML = '';

            alert("Seu card foi deletado!")
        }
    }
} 


}

editarItem = function(identificador) {
    var dadosFormulario = JSON.parse(localStorage.getItem("dadosFormulario"))
    var confirm = window.confirm("Você realmente deseja editar este card?")
    
    if(confirm === true){
    for (dadosRegistrados of dadosFormulario) {
        if (dadosRegistrados != null && dadosRegistrados.identificador == identificador) {
            document.getElementById('input_form1').value = dadosRegistrados.titulo;
            document.getElementById('input_form2').value = dadosRegistrados.linguagem;
            var inputCategoriaSelect = document.getElementById('input_form_Categoria');
            inputCategoriaSelect.selectedIndex = dadosRegistrados.categoriaIndex;
    
            document.getElementById('input_form3').value = dadosRegistrados.descricao;
            document.getElementById ('input_form_url').value = dadosRegistrados.url;
            document.getElementsByName('ïdentificador').value = dadosRegistrados.identificador;

        }
    }
} else {
    return limpaFormulario()
}



}

atualizaFormularioNaLista = function(dados) {
    deletarItem(dados.identificador);
    adicionaFormularioNaLista(dados);
}

function contadorTotal () {
    var count = 0 ;
    var dadosFormulario = JSON.parse(localStorage.getItem("dadosFormulario"));
    if(dadosFormulario != null){
        for(dados of dadosFormulario){
            if(dados != null && dados != " "){
                count++;
            }
            
           }
        document.getElementById("cards_total").innerHTML = count; 
    }
}

function contadorFront () {
   var count = 0 ;
   var dadosFormulario = JSON.parse(localStorage.getItem("dadosFormulario"));
    if(dadosFormulario != null){

   for(dados of dadosFormulario){
    if(dados!= null && dados.categoria == "Front-End"){
        count++;
    }
    
   }
}
   document.getElementById("cards_Front").innerHTML = count;
}

function contadorBack () {
    var count = 0 ;
    var dadosFormulario = JSON.parse(localStorage.getItem("dadosFormulario"));
    if(dadosFormulario != null){
    for(dados of dadosFormulario){
     if(dados!= null && dados.categoria == "BackEnd"){
         count++;
     }
     
    }
}
    document.getElementById("cards_Back").innerHTML = count;
 }

 function contadorFull () {
    var count = 0 ;
    var dadosFormulario = JSON.parse(localStorage.getItem("dadosFormulario"));
    if(dadosFormulario != null){
    for(dados of dadosFormulario){
     if(dados!= null && dados.categoria == "FullStack"){
         count++;
     }
     
    }
}
    document.getElementById("cards_Full").innerHTML = count;
 }

 function contadorSkills () {
    var count = 0 ;
    var dadosFormulario = JSON.parse(localStorage.getItem("dadosFormulario"));
    if(dadosFormulario != null){
    for(dados of dadosFormulario){
     if(dados!= null && dados.categoria == "Comportamental/Soft"){
         count++;
     }
     
    }
}
    document.getElementById("cards_Skills").innerHTML = count;
 }

 contadorTotal();
    contadorFront();
    contadorBack();
    contadorFull();
    contadorSkills();


    // Barra de pesquisa