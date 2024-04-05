export interface IUsuario {
  id: bigint;
  uid: string;
  foto: Buffer;
  id_cargo: bigint;
  nome: string;
  cpf_cnh: string;
  email: string;
  senha: string;
  situacao: string;
  criado_em: Date;
  atualizado_em: Date;
}

export interface ICreateUsuario {
  foto: Buffer;
  id_cargo: bigint;
  nome: string;
  cpf_cnh: string;
  email: string;
  senha: string;
  situacao: string;
}
