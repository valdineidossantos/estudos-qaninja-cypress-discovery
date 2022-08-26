import SignupPage from '../pages/SignupPage';

import signFactory from '../factories/SignupFactory'

describe('Signup', () => {

    // before(function () {
    //     cy.log("Tudo aqui é executado uma unica vez antes de todos os casos de testes")
    // })
    // after(() => {
    //     cy.log("Tudo aqui é executado uma unica vez depois de todos os casos de testes")
    // })

    // beforeEach(() => {
    //     cy.log("Tudo aqui é executado SEMPRE antes de todos os testes")
    // })
    // afterEach(() => {
    //     cy.log("Tudo aqui é executado SEMPRE depois de todos os testes")
    // })

    // beforeEach(function () {
    //     cy.fixture('deliver').then(function (data) {
    //         this.deliver = data;
    //     })

    // })



    it('User signup success', function () {

        const success_message = "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato."

        const signupPage = new SignupPage()

        //Factory    
        var deliver = signFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.modalContentShouldBe(success_message)
        cy.contains('button.swal2-confirm', "Fechar").click()
    })


    it('User fail signup invalid document', function () {
        const signupPage = new SignupPage()
        //Factory    
        var deliver = signFactory.deliver()

        deliver.cpf = "000000141AA"

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        const error_message = "Oops! CPF inválido"
        signupPage.alertMessageShouldBe(error_message)
    })

    it('User fail signup invalid email', function () {
        const signupPage = new SignupPage()
        //Factory    
        var deliver = signFactory.deliver()
        deliver.email = "email.invalido.com.br"

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        const error_message = "Oops! Email com formato inválido."
        signupPage.alertMessageShouldBe(error_message)
    })

    context('Check required fields', function () {
        const signupPage = new SignupPage()
        before(() => {
            signupPage.go()
            signupPage.submit()
        })
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'address code', output: 'É necessário informar o CEP' },
            { field: 'address number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery method', output: 'Selecione o método de entrega' },
        ]

        messages.forEach(message => {
            it(`${message.field} is required`, function () {
                signupPage.alertMessageShouldBe(message.output)
            })
        })
    })

});