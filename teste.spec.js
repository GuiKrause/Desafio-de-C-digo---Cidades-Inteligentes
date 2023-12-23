const bcrypt = require('bcrypt')
const {Usuario, usuarios} = require("./script.js")

describe('Rotina de CRUD', () => {
    usuarios
    let admin = new Usuario(
        'Guilherme',
        'gui@gmail.com',
        'Admin123@',
        [true, true, true, true]
    )
    const login = admin.login('gui@gmail.com', 'Admin123@')
    
    it("Login do usuário", () => {
        expect(login).toEqual({
            Mensage: "Login realizado com sucesso"
        })
    })
    it("Cadastro de usuário", () => {
        admin.cadastrar('Altenir', 'altenir@gmail.com', '123ABCd!@#', [null, true, null, null])
        expect(usuarios[1]).toBeInstanceOf(Object)
    })
    it("Atualização de usuário", () => {
        admin.atualizar('altenir@gmail.com', 'Adilson', 'adilson@gmail.com', '123ABCd!@%', [true])
        expect(usuarios[1].nome).toBe('Adilson')
        expect(usuarios[1].email).toBe('adilson@gmail.com')
        const senhaComparada = bcrypt.compareSync('123ABCd!@%', usuarios[1].senha)
        expect(senhaComparada).toBe(true)
    })
    it("Exclusão de usuário", () => {
        admin.listar()
        expect(usuarios.length).toEqual(2)
    })
    it("Logout do usuário", () => {
        expect(admin.logout()).toEqual({
            Mensage: 'Você desconectou do sistema'
        })
    })
})
