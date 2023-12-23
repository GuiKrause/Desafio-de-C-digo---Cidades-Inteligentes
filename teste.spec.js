const bcrypt = require('bcrypt');

let usuarios = []

class Usuario {

    constructor(nome, email, senha, permissoes = [cadastrar = null, listar = null, atualizar = null, deletar = null]) {

        const [cadastrar, listar, atualizar, deletar] = permissoes

        cadastrar ? permissoes[0] = this.cadastrarUsuario : permissoes[0] = { Mensage: 'Você não tem permissão para cadastrar um novo usuário' }
        listar ? permissoes[1] = this.listarUsuarios : permissoes[1] = { Mensage: 'Você não tem permissão para listar os usuários' }
        atualizar ? permissoes[2] = this.atualizarUsuario : permissoes[2] = { Mensage: 'Você não tem permissão para atualizar os dados de um usuário' }
        deletar ? permissoes[3] = this.deletarUsuario : permissoes[3] = { Mensage: 'Você não tem permissão para deletar um usuário' }

        const salt = bcrypt.genSaltSync(10)
        const senhaHash = bcrypt.hashSync(senha, salt)

        this.id = usuarios.length + 1
        this.nome = nome
        this.email = email
        this.senha = senhaHash
        this.dataCriacao = new Date()
        this.statusLogin = false
        this.statusAtividade = true
        this.cadastrar = permissoes[0]
        this.listar = permissoes[1]
        this.atualizar = permissoes[2]
        this.deletar = permissoes[3]

        const emailValidado = this.validarEmail(email)
        const emailUnicoValidado = this.validarEmailUnico(email)

        if (emailValidado === true && emailUnicoValidado === true) {
            const senhaValidada = this.validarSenha(senha)
            if (senhaValidada === true) {

                const usuario = {
                    id: this.id,
                    nome: this.nome,
                    email: this.email,
                    senha: this.senha,
                    dataCriacao: this.dataCriacao,
                    statusLogin: this.statusLogin,
                    statusAtividade: this.statusAtividade,
                    login: this.login,
                    logout: this.logout,
                    cadastrar: permissoes[0],
                    listar: permissoes[1],
                    atualizar: permissoes[2],
                    deletar: permissoes[3],
                }

                usuarios.push(usuario)

                return usuario
            } else {
                return {
                    Mensage: 'Esta senha não é válida',
                    senha: senha
                }
            }
        } else {
            return {
                Mensage: 'Email inválido',
                email: email
            }
        }
    }

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

    validarSenha = (senhaTeste) => {
        const senha = senhaTeste.split('')
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

        if (senhaTeste.length > 8 && validacao.length === 4) {
            senhaValida = true
        } else {
            senhaValida = false
        }
        return senhaValida
    }

    alterarStatusAtivacao = (email, status) => {

        if (this.statusLogin === true && this.statusAtividade === true) {

            const emailValidado = this.validarEmail(email)
            const emailUnicoValidado = this.validarEmailUnico(email)

            if (emailValidado === true && emailUnicoValidado === true) {
                if (email === this.email) {
                    return 'Não é possível alterar seu prórpio status'
                } else {
                    const indice = usuarios.findIndex(user =>
                        user.email === email
                    )
                    const usuario = usuarios[indice]
                    if (usuario) {
                        if (status === false) {
                            usuario.statusAtividade = false
                        } else if (status === true) {
                            usuario.statusAtividade = true
                        }
                    } else {
                        return 'email não existe'
                    }
                }
            } else {
                return 'O email inserido não é válido'
            }
        }
    }

    cadastrarUsuario = (nome, email, senha, permissoes) => {
        if (this.statusLogin === true && this.statusAtividade === true) {

            new Usuario(
                nome,
                email,
                senha,
                permissoes
            )

            return {
                Mensage: 'Usuário cadastrado com sucesso'
            }

        } return {
            Mensage: 'Ocorreu um erro ao cadastrar'
        }
    }

    listarUsuarios = (email) => {
        if (this.statusLogin === true && this.statusAtividade === true) {
            if (email === true) {
                const indice = usuarios.findIndex(user =>
                    user.email === email
                )
                const usuario = usuarios[indice]
                if (email === usuario.email) {
                    return usuario
                } else {
                    return {
                        Mensage: 'Nenhum usuário com este email foi encontrado'
                    }
                }
            } else {
                return usuarios
            }
        }
    }

    atualizarUsuario = (email, novoNome, novoEmail, novaSenha, novasPermissoes = [cadastrar = null, listar = null, atualizar = null, deletar = null]) => {
        if (this.statusLogin === true && this.statusAtividade === true) {

            const [cadastrar, listar, atualizar, deletar] = novasPermissoes

            cadastrar ? novasPermissoes[0] = this.cadastrarUsuario : novasPermissoes[0] = { Mensage: 'Você não tem permissão para cadastrar um novo usuário' }
            listar ? novasPermissoes[1] = this.listarUsuarios : novasPermissoes[1] = { Mensage: 'Você não tem permissão para listar os usuários' }
            atualizar ? novasPermissoes[2] = this.atualizarUsuario : novasPermissoes[2] = { Mensage: 'Você não tem permissão para atualizar os dados de um usuário' }
            deletar ? novasPermissoes[3] = this.deletarUsuario : novasPermissoes[3] = { Mensage: 'Você não tem permissão para deletar um usuário' }

            const emailValidado = this.validarEmail(email)

            if (emailValidado === true) {

                const emailExisteBaseDados = !this.validarEmailUnico(email)

                if (emailExisteBaseDados) {
                    const indice = usuarios.findIndex(user =>
                        user.email === email
                    )
                    const usuario = usuarios[indice]
                    let camposAtualizados = []
                    if (novoNome !== null) {
                        usuario.nome = novoNome
                        camposAtualizados.push(1)
                    }
                    if (novoEmail !== null) {
                        usuario.email = novoEmail
                        camposAtualizados.push(2)
                    }
                    if (novaSenha !== null) {
                        const senhaValida = this.validarSenha(novaSenha)
                        if (senhaValida) {
                            const salt = bcrypt.genSaltSync(10)
                            const senhaHash = bcrypt.hashSync(novaSenha, salt)
                            usuario.senha = senhaHash
                            camposAtualizados.push(3)
                        } else {
                            return {
                                Mensage: 'Esta senha não é válida',
                                senha: novaSenha
                            }
                        }
                    }
                    if (cadastrar !== null) {
                        usuario.cadastrar = novasPermissoes[0]
                        camposAtualizados.push(4)
                    }
                    if (listar !== null) {
                        usuario.listar = novasPermissoes[1]
                        camposAtualizados.push(5)
                    }
                    if (atualizar !== null) {
                        usuario.atualizar = novasPermissoes[2]
                        camposAtualizados.push(6)
                    }
                    if (deletar !== null) {
                        usuario.deletar = novasPermissoes[3]
                        camposAtualizados.push(7)
                    }
                    if (camposAtualizados.length > 0) {
                        return {
                            Mensage: 'O usuário foi atualizado com sucesso!'
                        }
                    } else {
                        return {
                            Mensage: 'Nenhum campo foi alterado'
                        }
                    }

                } else {
                    return {
                        Mensage: 'Não existe usuário com este email',
                        statuseEmail: email,
                    }
                }
            } else {
                return {
                    Mensage: 'Este email não é válido',
                    statuseEmail: email,
                }
            }
        } else {
            return {
                Mensage: 'Ocorreu um erro ao atualizar',
                statusLogin: this.statusLogin,
                statusAtividade: this.statusAtividade
            }
        }
    }

    deletarUsuario = (email) => {
        if (this.statusLogin === true && this.statusAtividade === true) {
            if (email !== this.email) {
                const emailValidado = this.validarEmail(email)

                if (emailValidado === true) {

                    const emailExisteBaseDados = !this.validarEmailUnico(email)

                    if (emailExisteBaseDados) {
                        let listaUsuariosAtualizada = usuarios.filter((usuarioAtual) => {
                            return usuarioAtual.email !== email;
                        })
                        usuarios = listaUsuariosAtualizada
                        return {
                            Mensage: "Usuário deletado"
                        }
                    } else {
                        return {
                            Mensage: 'Não existe usuário com este email',
                            statuseEmail: email,
                        }
                    }
                } else {
                    return {
                        Mensage: 'Este email não é válido',
                        statuseEmail: email,
                    }
                }
            } else {
                return {
                    Mensage: 'Não é possível deletar seu próprio usuário',
                }
            }
        }
    }

    login = (email, senha) => {
        if (this.statusLogin !== true) {
            if (this.statusAtividade === true) {
                const comparacaoSenha = bcrypt.compareSync(senha, this.senha)
                if (email === this.email && comparacaoSenha) {
                    this.dataUltimoLogin = new Date()
                    this.statusLogin = true
                    return {
                        Mensage: 'Login realizado com sucesso'
                    }
                } else {
                    return {
                        Mensage: 'Verifique se o usuário ou a senha estão corretos',
                        email: this.email,
                        senha: this.senha
                    }
                }
            } else {
                return {
                    Mensage: 'Este usuário não está ativo',
                    statusAtividade: this.statusAtividade
                }
            }
        } else {
            return {
                Mensage: 'Você já realizou o login',
                statusLogin: this.statusLogin
            }
        }
    }

    logout = () => {
        if (this.statusLogin === true) {
            this.statusLogin = false
            return {
                Mensage: 'Você desconectou do sistema'
            }
        } else {
            return {
                Mensage: 'Realize o login'
            }
        }
    }
}

describe('Rotina de CRUD', () => {
    let gui = new Usuario(
        'Guilherme',
        'gui@gmail.com',
        'Admin123@',
        [true, true, true, true]
    )
    const login = gui.login('gui@gmail.com', 'Admin123@')
    const cadastro = gui.cadastrar('Altenir', 'altenir@gmail.com', '123ABCd!@#', [null, true, null, null])
    const atualizacao = gui.atualizar('altenir@gmail.com', 'Adilson', 'adilson@gmail.com', '123ABCd!@%', [true])
    const exclusao = gui.deletar('adilson@gmail.com')
    const logout = gui.logout()
    
    it("Login do usuário", () => {
        expect(login).toEqual({
            Mensage: "Login realizado com sucesso"
        })
    })
    it("Cadastro de usuário", () => {
        expect(cadastro).toEqual({
            Mensage: "Usuário cadastrado com sucesso"
        })
    })
    it("Atualização de usuário", () => {
        expect(atualizacao).toEqual({
            Mensage: "O usuário foi atualizado com sucesso!"
        })
    })
    it("Exclusão de usuário", () => {
        expect(exclusao).toEqual({
            Mensage: 'Usuário deletado'
        })
    })
    it("Logout do usuário", () => {
        expect(logout).toEqual({
            Mensage: 'Você desconectou do sistema'
        })
    })
})
