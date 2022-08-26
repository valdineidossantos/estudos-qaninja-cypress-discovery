class SignupPage {
    go() {
        //cy.viewport(1440, 900);
        //cy.visit('https://buger-eats.vercel.app/')
        cy.visit('/')
        cy.get("a[href='/deliver']").click()
        cy.get("#page-deliver form h1")
            .should("have.text", "Cadastre-se para  fazer entregas")
    }

    fillForm(deliver) {
        //Dados Pessoais
        cy.get("#page-deliver form input[name=fullName]").type(deliver.name)
        cy.get("#page-deliver form input[name=cpf]").type(deliver.cpf)
        cy.get("#page-deliver form input[name=email]").type(deliver.email)
        cy.get("#page-deliver form input[name=whatsapp]").type(deliver.whatsapp)

        //Endereço
        cy.get("input[name=postalcode]").type(deliver.address.postal_code)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name=address-number]').type(deliver.address.address_number)
        cy.get('input[name=address-details').type(deliver.address.address_details)

        //Asserts Endereço retornado pela API
        cy.get('input[name=address]').should("have.value", deliver.address.street)
        cy.get('input[name=district]').should("have.value", deliver.address.district)
        cy.get('input[name=city-uf]').should("have.value", deliver.address.city)
        cy.contains('.delivery-method li', deliver.delivery_method).click()
        cy.get('input[accept^="image"]').attachFile(deliver.cnh_image)
    }

    submit() {
        cy.get('form button.button-success[type=submit]').click()
    }

    modalContentShouldBe(expected_message) {
        cy.get('.swal2-container .swal2-html-container').should("have.text", expected_message)
    }

    alertMessageShouldBe(expected_message) {
        //cy.get('span.alert-error').should("have.text", expected_message)
        cy.contains('span.alert-error', expected_message).should("be.visible")
    }
}
export default SignupPage