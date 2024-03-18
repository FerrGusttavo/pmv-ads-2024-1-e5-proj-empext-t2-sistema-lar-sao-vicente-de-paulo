import { Prisma } from "@prisma/client";
import { idosoRepository } from "../idoso.repository";
import { prisma } from "@/database/prisma.service";

export class PrismaIdosoRepository implements idosoRepository {

    async create(data: Prisma.IdosoUncheckedCreateInput) {
        const idoso = await prisma.idoso.create({
            data,
        })

        return idoso
    }

    async findByCpf(cpf_cnh: string) {
        const idoso = await prisma.idoso.findUnique({
            where: {
                cpf_cnh
            }
        })

        return idoso
    }

    async findByUid(uid: string) {
        const idoso = await prisma.idoso.findUnique({
            where: {
                uid
            },
            include: {
                Prontuario: true,
                RelatorioPia: true,
                FichaNutricional: true,
                Perroca: true,
                EscalaBraden: true
            }

        })

        return idoso
    }
}