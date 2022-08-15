const repositorios = document.getElementById('lista-repositorios')
const perfil = document.getElementById('usuario');
let listaFavoritos = document.getElementById('lista-favoritos')

function buscarUsuario() {
  var input = document.getElementById("nome");
  var nome = input.value;

  // Captura os dados do usuário e monta as informções do perfil
  fetch('https://api.github.com/users/' + nome)
  .then(async resposta => {

    if(!resposta.ok) {
      throw new Error(resposta.status)
    }

    var data = await resposta.json()
    let li = document.createElement('li')

    li.innerHTML = `
      
      <figure>
        <img src="${data.avatar_url}">
      </figure>

      <div>
        <p><b>Nome:</b> ${data.name}</p>
        <p><b>Nome de usuário:</b> ${data.login}</p>
        <p><b>Localização:</b> ${data.location}</p>
        <p><b>Seguidores:</b> ${data.followers}</p>
        <p><b>Seguindo:</b> ${data.following}</p>
        <p><b>URL do perfil:</b> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
        <button class="botaoAdicionarFavoritos">Adicionar favorito</button>
      </div>
      `
    perfil.innerHTML = ""
    perfil.appendChild(li)

  }).catch(erro => console.log(erro))

  // Captura os dados dos repositórios e monta a lista
  fetch('https://api.github.com/users/' + nome + '/repos')
    .then(async resposta => {

      if(!resposta.ok) {
        throw new Error(resposta.status)
      }

      var data = await resposta.json()

      repositorios.innerHTML = ""
      data.map(item => {
        let li = document.createElement('li')

        li.innerHTML = `
        <strong>${item.name.toUpperCase()}</strong>
        <span>URL: <a href="${item.html_url}" target="_blank">${item.html_url}</a></span>
        <span>Data de criação: 
          ${Intl.DateTimeFormat('pt-BR')
            .format(new Date(item.created_at))}
        </span>
      `
      repositorios.appendChild(li)

      })

    }).catch(erro => console.log(erro))
}

// Função de clique para adicionar na lista de favoritos
perfil.addEventListener('click', adicionarFila)

function adicionarFila(event) {
  var input = document.getElementById("nome");
  var nome = input.value;
  const buttonName = event.target.tagName

  if (buttonName == 'BUTTON') {
    fetch('https://api.github.com/users/' + nome)
    .then(async resposta => {

      if(!resposta.ok) {
        throw new Error(resposta.status)
      }

      var data = await resposta.json()
      let li = document.createElement('li')

      li.innerHTML = `
        
        <figure>
          <img src="${data.avatar_url}">
        </figure>

        <div>
          <p><b>${data.login}</b> (${data.name})</p>
          <p><a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
          <button class="botaoRemoverFavoritos">Remover favorito</button>
        </div>
        `
      listaFavoritos.appendChild(li)
    }).catch(erro => console.log(erro))
  }
}

// Função de clique para remover da lista de favoritos
listaFavoritos.addEventListener('click', removerFila)

function removerFila(event) {
  const elementoName = event.target.tagName
  const elemento = event.target

  if (elementoName == 'BUTTON') {
    if (elementoName !== 'LI') {
      elemento.closest('LI').remove()
    } else {
      elemento.remove()
    }
  }
}

buscarUsuario() 