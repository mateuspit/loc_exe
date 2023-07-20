import prisma from "database";
import { RentalInput } from "protocols";
import { faker } from '@faker-js/faker';
import { Movie } from "@prisma/client";

const movie: Movie[] = [{
    id: 1,
    name: "sexo",
    adultsOnly: true,
    rentalId: 1
},
{
    id: 2,
    name: "sexxo",
    adultsOnly: true,
    rentalId: 2
}];




export async function createRentalData() {
    await prisma.rental.create({
        data: {
            userId: 0,
            endDate: new Date(new Date().getDate() + 2),
            closed: false
        }
    });;
}

//export async function rentalData() {
//    await createRentalData();
//    return await prisma.rental.create({
//        data: {
//            userId: ,
//            endDate: new Date(new Date().getDate() + RENTAL_LIMITATIONS.RENTAL_DAYS_LIMIT),
//        }
//    });;
//}