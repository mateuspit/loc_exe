import supertest from "supertest";
import app from "../../src/app";
import httpStatus from "http-status";
import prisma from "database";

const api = supertest(app);

describe("Rentals Service Unit Tests", () => {
    it("Escolher no mínimo 1 filme e no máximo 4 filmes.", async () => {
        const dataToSend1 = {
            userId: 1,
            moviesId: []
        }
        const dataToSend2 = {
            userId: 1,
            moviesId: [0,1,2,3,4]
        }
        const response1 = await api.post("/rentals").send(dataToSend1);
        const response2 = await api.post("/rentals").send(dataToSend2);
        expect(response1.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(response2.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    })

    it("Não estiver com uma locação pendente.", async () => {
        const dataToSend1 = {
            userId: 1,
            moviesId: [0,1,2]
        };

        await prisma.user.create({
            data:{
                birthDate: new Date(),
                firstName: "Sun",
                lastName: "set",
                cpf: "03326596369",
                email: "mateuspit@gmail.com",                
            }
        })

        await prisma.rental.create({
            data: {
                userId: 1,
                endDate: new Date(new Date().getDate() + 2),
                closed: false
            }
        });

        const response1 = await api.post("/rentals").send(dataToSend1);

        

        expect(response1.status).toBe(httpStatus.PAYMENT_REQUIRED);
    })

    it("Se o usuário for menor de idade, não pode haver nenhum filme adulto.", () => {
        expect(true).toBe(true);
    })

    //it("Só pode ser alugado se estiver disponível ", () => {
    //    expect(true).toBe(true);
    //})

    //it("Só existe uma unidade de cada um.", () => {
    //    expect(true).toBe(true);
    //})
})