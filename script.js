let usuarios = []

class Usuario {


    validarEmail = (emailTeste) => {
        let emailValido = true
        const validacaoEmail = /\S+@\S+\.\S+/;
        if (validacaoEmail.test(emailTeste) !== true) {
            emailValido = false
        }
        
        return emailValido
    }

    validarEmailUnico = (emailTesteUnico) => {
        let emailUnicoValido = true
        for (let i = 0; i < usuarios.length; i++) {
            const usuarioEmail = usuarios[i].email
            if (emailTesteUnico === usuarioEmail) {
                emailUnicoValido = false
                break
            }
        }
        return emailUnicoValido
    }

    validarSenha = (sen) => {
        const senha = sen.split('')
        const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz'
        const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const numeros = '0123456789'
        const caracteresEspeciais = letrasMinusculas.concat(letrasMaiusculas).concat(numeros)
        const validacao = []
        let senhaValida

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

        if (sen.length > 8 && validacao.length === 4) {
            senhaValida = true
        } else {
            senhaValida = false
        }
        return senhaValida
    }

    alterarStatusAtivacao = (dados) => {

        const [email, status] = dados

        if (this.statusLogin === true && this.statusAtividade === true) {

            const emailValidado = this.validarEmail(email)

            if (emailValidado === true) {
                const indice = usuarios.findIndex(user =>
                    user.email === email
                )
                if (email === this.email) {
                    return 'Não é possível alterar seu prórpio status'
                } else {
                    const usuario = usuarios[indice]
                    if (status === false) {
                        usuario.statusAtividade = false
                    } else if (status === true) {
                        usuario.statusAtividade = true
                    }
                }
            } else {
                return 'O email inserido não é válido'
            }
        }
    }

    constructor(nome, email, senha, permissoes = []) {
        this.id = usuarios.length + 1
        this.nome = nome
        this.email = email
        this.senha = senha
        this.permissoes = permissoes
        this.dataCriacao = new Date()
        this.statusLogin = false
        this.statusAtividade = true
    }

    // Cadastrar

    cadastrarUsuario = (dados) => {
        if (this.statusLogin === true && this.statusAtividade === true) {

            const emailValidado = this.validarEmail(dados[1])
            const emailUnicoValidado = this.validarEmailUnico(dados[1])
            
            if (emailValidado === true && emailUnicoValidado === true) {
                const senhaValidada = this.validarSenha(dados[2])
                if (senhaValidada === true) {
                    let usuario = new Usuario(
                        dados[0],
                        dados[1],
                        dados[2],
                        dados[3]
                    )
                    usuarios.push(usuario)
                    return usuario
                } else {
                    return 'Modelo de senha incorreta'
                }
            } else {
                return 'Email já cadastrado tente outro'
            }
        }
    }

    // Listar

    listarUsuarios = () => {
        return usuarios
    }

    // Atualizar

    atualizarUsuario = (email, novoNome, novoEmail, novaSenha, novasPermissoes) => {
        const index = usuarios.findIndex(usuario =>
            usuario.email === email
        )
        const usuario = usuarios[index]
        if (novoNome) {
            usuario.nome = novoNome
        }
        if (novoEmail) {
            usuario.email = novoEmail
        }
        if (novaSenha) {
            usuario.senha = novaSenha
        }
        if (novasPermissoes) {
            usuario.permissoes = novasPermissoes
        }
    }

    // Deletar

    deletarUsuario = (id) => {
        let listaUsuariosAtualizada = usuarios.filter((usuarioAtual) => {
            return usuarioAtual.id !== id;
        })
        usuarios = listaUsuariosAtualizada
    }

    // Login

    login = (email, senha) => {
        if (email === this.email && senha === this.senha) {
            this.dataUltimoLogin = new Date()
            this.statusLogin = true
            return 'Login realizado com sucesso'
        } else {
            return 'Verifique se o usuário ou a senha estão corretos '
        }
    }

    //Login e Logout

    logout = () => {
        if (this.statusLogin === true) {
            this.statusLogin = false
        }
    }
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
        return senha
    } else {
        return 'senha inválida, tente outra'
    }
}


//Validar Email

const validarEmail = (email) => {
    const validacaoEmail = /\S+@\S+\.\S+/;
    validacaoEmail.test(email)

    for (let i = 0; i < usuarios.length; i++) {
        const usuarioEmail = usuarios[i].email
        if (email === usuarioEmail) {
            return 'email já existente'
        } else {
            break
        }
    }
}

//Ativar e desativar usuário

const alterarStatusAtivacao = (email, status) => {
    const indice = usuarios.findIndex(usuario =>
        usuario.email === email
    )
    const usuario = usuarios[indice]
    if (status === false) {
        usuario.statusAtividade = true
    } else if (status === true) {
        usuario.statusAtivacao = false
    }
}


// Sistema de gerenciamento



//_____________

let gui = new Usuario(
    'Guilherme',
    'gui@gmail.com',
    'Admin123@',
    [true]
)
    
// cadastrarUsuario({
//     nome: 'Guilherme',
//     email: 'gui@gmail.com',
//     senha: '111',
//     permissoes: [],
// })

// cadastrarUsuario({
//     nome: 'Serjão dos Foguetes',
//     email: 'serjão@gmail.com',
//     senha: '333',
//     permissoes: [],
// })

//Criptografia

// const string = 'djfghksd'
// let newString = []
// for (let i = 0; i < string.length; i++) {
//     newString.push(string.charCodeAt(i))
// }
// console.log(newString)