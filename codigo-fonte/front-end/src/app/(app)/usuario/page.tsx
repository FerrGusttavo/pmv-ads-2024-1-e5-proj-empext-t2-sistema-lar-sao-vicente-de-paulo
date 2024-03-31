"use client";

import { Button, Input, Select, Table } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useFetch } from "@/utils/hooks/useFetch";
import { useState } from "react";
import { IUsuario } from "./Interface/IUsuario";
import { queryBuilder } from "@/utils/functions/query-builder";
import { Situacao } from "@/interface/ISituacao";
import { Filter } from "@/interface/IQuery";

const columns = [
  {
    title: "Nome",
    dataIndex: "nome",
    key: "nome",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
  {
    key: "ação",
    render: () => (
      <div className="flex justify-end opacity-70 cursor-pointer">
        <a className="text-black">
          <EditOutlined style={{ fontSize: 18 }} />
        </a>
      </div>
    ),
  },
];

export default function Usuario() {
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pesquisa, setPesquisa] = useState<string>("");
  const [situacao, setSituacao] = useState<Situacao>(Situacao.ATIVO);

  let filtros = new Array();

  if (pesquisa !== "")
    filtros.push({
      path: "nome",
      operator: "contains",
      value: pesquisa,
      insensitive: true,
    });

  if (situacao)
    filtros.push({
      path: "situacao",
      operator: "equals",
      value: situacao,
    });

  const { data, isLoading } = useFetch<IUsuario[]>(
    "/usuarios",
    [pesquisa, situacao, pageLimit, currentPage],
    {
      params: queryBuilder({
        page_limit: pageLimit,
        page_number: currentPage,
        filter: filtros as Filter | undefined,
      }),
    }
  );
  return (
    <>
      <div className="flex mt-7 gap-5">
        <Button type="primary" size="large" icon={<UserAddOutlined />}>
          Cadastrar
        </Button>

        <Input
          placeholder="Buscar"
          onChange={(e) => setPesquisa(e.target.value)}
          suffix={<SearchOutlined className="cursor-pointer opacity-50" />}
        />

        <Select
          className="w-[105px]"
          size="large"
          onChange={(e) => setSituacao(e as Situacao)}
          defaultValue="ATIVO"
          options={[
            { value: "ATIVO", label: "Ativos" },
            { value: "INATIVO", label: "Inativos" },
            { value: "", label: "Todos" },
          ]}
        />
      </div>
      <div className="mt-[15px]">
        <Table
          dataSource={data}
          columns={columns}
          size="large"
          loading={isLoading}
          pagination={{}}
        />
      </div>
    </>
  );
}
