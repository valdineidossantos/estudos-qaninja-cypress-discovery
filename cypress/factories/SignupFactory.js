var faker = require('faker');
var cpf = require('gerador-validador-cpf');

var firstName = faker.name.firstName();
var lastName = faker.name.lastName();

export default {
    deliver: function () {
        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(),
            whatsapp: "11999999999",
            address: {
                postal_code: "04534011",
                street: "Rua Joaquim Floriano",
                address_number: "1000",
                address_details: "Apto 402",
                district: "Itaim Bibi",
                city: "São Paulo/SP"
            },
            delivery_method: "Van/Carro",
            cnh_image: "cnh-digital.jpg"
        }
        return data;
    }
}