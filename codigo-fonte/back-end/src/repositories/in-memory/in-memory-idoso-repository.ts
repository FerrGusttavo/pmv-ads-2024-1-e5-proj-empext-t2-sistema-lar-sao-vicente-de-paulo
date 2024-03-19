
import { Idoso, Prisma } from '@prisma/client';
import { idosoRepository } from "../idoso.repository";
import { DeleteIdosoDto } from '@/app/modules/idoso/dtos/delete-idoso.dto';
import { UpdateIdosoDto } from '@/app/modules/idoso/dtos/update-idoso.dto';
import { randomUUID } from 'crypto';

export class InMemoryIdosoRepository implements idosoRepository {
    private items: Idoso[] = [];

    async create(data: Prisma.IdosoUncheckedCreateInput) {
        const idoso: Idoso = {
            id: data.id ? BigInt(data.id) : undefined,
            uid: randomUUID(),
            usuario_id: data.id ? BigInt(data.id) : undefined,
            foto: data.foto,
            nome_completo: data.nome_completo,
            data_nascimento: new Date(data.data_nascimento),
            naturalidade: data.naturalidade,
            estado: data.estado,
            pais: data.pais,
            estado_civil: data.estado_civil,
            religiao: data.religiao,
            escolaridade: data.escolaridade,
            nome_pai: data.nome_pai,
            nome_mae: data.nome_mae,
            data_ingresso: new Date(data.data_ingresso),
            cpf: data.cpf,
            cnh: data.cnh,
            rg: data.rg,
            rg_orgao_expedidor: data.rg_orgao_expedidor,
            titulo_eleitor: data.titulo_eleitor,
            titulo_eleitor_secao: data.titulo_eleitor_secao,
            titulo_eleitor_zona: data.titulo_eleitor_zona,
            certidao_nascimento: data.certidao_nascimento,
            certidao_nascimento_folha: data.certidao_nascimento_folha,
            certidao_nascimento_livro: data.certidao_nascimento_livro,
            certidao_casamento: data.certidao_casamento,
            certidao_casamento_folha: data.certidao_casamento_folha,
            certidao_casamento_livro: data.certidao_casamento_livro,
            situacao: 'ATIVO',
            motivo_inativacao: data.motivo_inativacao,
            criado_em: new Date(),
            atualizado_em: new Date()
        }

        this.items.push(idoso);

        return idoso;
    }

    async findByCpf(cpf: string) {
        return (
            this.items.find((usuario) => usuario.cpf === cpf) || null
        );
    }
    async findByUid(uid: string) {
        const idoso = this.items.find((usuario) => usuario.uid === uid)
        if (idoso) {
            return {
                ...idoso,
                Prontuario: [],
                RelatorioPia: [],
                FichaNutricional: [],
                Perroca: [],
                EscalaBraden: [],
            }
        }

        return null;
    }
    async update(data: UpdateIdosoDto, from: Idoso): Promise<Idoso> {
        const idosoIndex = this.items.findIndex(item => item.uid === from.uid);
        if (idosoIndex === -1) {
            throw new Error('Nenhum usuário encontrado');
        }
        const idoso = this.items[idosoIndex];
        this.items[idosoIndex] = {
            ...idoso,
            ...data,
            atualizado_em: new Date(),
        };
        return this.items[idosoIndex];
    }
    async delete(data: DeleteIdosoDto, from: Idoso) {
        const idosoIndex = this.items.findIndex(item => item.uid === from.uid);

        if (idosoIndex === -1) {
            throw new Error('Idoso not found.');
        }

        const idoso = this.items[idosoIndex];
        this.items[idosoIndex] = {
            ...idoso,
            ...data
        }

        return this.items[idosoIndex];
    }
}