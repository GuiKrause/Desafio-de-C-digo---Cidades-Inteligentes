// Cadastrar

const cadastrarUsuario = (dados) => {
    sistemaGerenciamento.usuarios.push({
        id: sistemaGerenciamento.usuarios.length + 1,
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        listaPermissao: dados.listaPermissao,
        dataCriacao: dados.dataCriacao,
        dataUltimoLogin: dados.dataUltimoLogin,
        statusAtivacao: dados.statusAtivacao
    })
}

// Listar

const listarUsuarios = () => {
    return sistemaGerenciamento.usuarios
}

// Atualizar

const atualizarUsuario = (nome, novoNome, novoEmail, novaSenha, novalistaPermissao) => {
    const index = listarUsuarios().findIndex(usuario =>
        usuario.nome === nome
    )
    const usuario = sistemaGerenciamento.usuarios[index]
    if (novoNome) {
        usuario.nome = novoNome
    }
    if (novoEmail) {
        usuario.email = novoEmail
    }
    if (novaSenha) {
        usuario.senha = novaSenha
    }
    if (novalistaPermissao) {
        usuario.listaPermissao = novalistaPermissao
    }
}

// Deletar

const deletarUsuario = (id) => {
    const listaUsuariosAtualizada = listarUsuarios().filter((usuarioAtual) => {
        return usuarioAtual.id !== id;
    })
    sistemaGerenciamento.usuarios = listaUsuariosAtualizada
}

// Sistema de gerenciamento

const sistemaGerenciamento = {
    permissoes: [cadastrarUsuario, listarUsuarios, atualizarUsuario, deletarUsuario],
    usuarios: [
        {
            id: 1,
            nome: 'admin',
            email: 'admin@gmail.com',
            senha: '12ABcd!@#',
            listaPermissoes: [],
            dataCriacao: '20/12/2023',
            dataUltimoLogin: '20/12/2023',
            statusAtivacao: []
        }
    ]
}


// Validar senha

const validarSenha = (sen) => {
    const senha = sen.split('')
    console.log(senha)
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz'
    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numeros = '0123456789'
    const caracteresEspeciais = letrasMinusculas.concat(letrasMaiusculas).concat(numeros)
    const validacao = []

    const senhaInclui = tipoCaractere => {
        for (let i = 0; i < senha.length; i++) {
            const caractere = senha[i];
            if (tipoCaractere.includes(caractere)) {
                validacao.push(true)
                break
            }
        }
    }

    const senhaIncluiEspeciais = (tipoCaractere) => {
        for (let i = 0; i < senha.length; i++) {
            let caractere = senha[i];
            if (!tipoCaractere.includes(caractere)) {
                validacao.push(true)
                break
            }
        }
    }

    senhaInclui(letrasMinusculas)
    senhaInclui(letrasMaiusculas)
    senhaInclui(numeros)
    senhaIncluiEspeciais(caracteresEspeciais)
    console.log(validacao)

    if (sen.length > 8 && validacao.length === 4) {
        return 'senha válida'
    } else {
        return 'senha inválida'
    }
}

//Ativar e desativar usuário

const ativarUsuario = (nome) => {
    const indice = listarUsuarios().findIndex(usuario =>
        usuario.nome === nome
    )
    const usuario = sistemaGerenciamento.usuarios[indice]
    usuario.statusAtivacao = 'Ativo'
}

const desativarUsuario = (nome) => {
    const indice = listarUsuarios().findIndex(usuario =>
        usuario.nome === nome
    )
    const usuario = sistemaGerenciamento.usuarios[indice]
    usuario.statusAtivacao = 'Inativo'
}

//Login e Logout

const login = (nome, senha) => {
    const listaUsuarios = sistemaGerenciamento.usuarios
    const indice = listarUsuarios().findIndex(usuario =>
        usuario.nome === nome
    )
    const nomeUsuario = listaUsuarios[indice].nome
    const senhaUsuario = listaUsuarios[indice].senha

    if (nomeUsuario === nome && senhaUsuario === senha) {
        return 'Login realizado com sucesso'
    } else {
        return 'Verifique se o usuário ou a senha estão corretos '
    }
}

const logout = () => {

}

//_____________

cadastrarUsuario({
    nome: 'Altenir',
    email: 'alt@gmail.com',
    senha: '246',
    listaPermissao: sistemaGerenciamento.permissoes,
    dataCriacao: '20/12/2023',
    dataUltimoLogin: '20/12/2023',
    statusAtivacao: ''
})
cadastrarUsuario({
    nome: 'Serjão dos Foguetes',
    email: 'serjão@gmail.com',
    senha: '111',
    listaPermissao: [],
    dataCriacao: '20/12/2023',
    dataUltimoLogin: '20/12/2023',
    statusAtivacao: ''
})