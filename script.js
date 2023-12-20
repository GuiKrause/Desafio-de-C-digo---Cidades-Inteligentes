const sistemaGerenciamento = {
    usuarios: [
        {
            id: 1,
            nome: 'Guilherme',
            email: 'gui@gmail.com',
            senha: '123',
            listaPermissao: [],
            dataCriacao: '20/12/2023',
            dataUltimoLogin: '20/12/2023',
            statusAtivacao: 'Ativo'
        }
    ]
}

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

// Validar senha

const validarSenha = (sen) => {
    let senha = sen.split('')
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUV'.split('')
    const numeros = '0123456789'.split('')
    const caracteresEspeciais = letrasMinusculas.concat(letrasMaiusculas).concat(numeros)

    let validacao = []

    const senhaInclui = tipoCaractere => {
        for (let i = 0; i < senha.length; i++) {
            const caractere = senha[i];
            console.log(caractere)
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

    letrasMinusculas.forEach(senhaInclui);
    letrasMaiusculas.forEach(senhaInclui);
    numeros.forEach(senhaInclui);
    caracteresEspeciais.forEach(senhaIncluiEspeciais);

    // console.log(minusculasValidas)
    // console.log(maiusculasValidas)
    // console.log(numerosValidos)
    // console.log(especiaisValidos)

    // console.log(caracteresValidos)

    // let caracteresValidos

    // if (minusculasValidas
    //     && maiusculasValidas
    //     && numerosValidos
    //     && especiaisValidos) {
    //     caracteresValidos = true
    // } else {
    //     caracteresValidos = false
    // }



    if (sen.length > 8 && validacao.length === 4) {
        console.log(validacao)
        return 'senha válida'
    } else {
        console.log(validacao)
        return 'senha inválida'
    }
}

//_____________

cadastrarUsuario({
    nome: 'Altenir',
    email: 'alt@gmail.com',
    senha: '246',
    listaPermissao: [],
    dataCriacao: '20/12/2023',
    dataUltimoLogin: '20/12/2023',
    statusAtivacao: 'Ativo'
})
cadastrarUsuario({
    nome: 'Serjão dos Foguetes',
    email: 'serjão@gmail.com',
    senha: '111',
    listaPermissao: [],
    dataCriacao: '20/12/2023',
    dataUltimoLogin: '20/12/2023',
    statusAtivacao: 'Ativo'
})