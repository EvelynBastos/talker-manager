# Talker Manager

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

 Construi uma aplicação de cadastro de talkers (palestrantes) em que foi possível cadastrar, visualizar, pesquisar, editar e excluir informações.

  1. Desenvolver uma API de um `CRUD` (**C**reate, **R**ead, **U**pdate e **D**elete) de palestrantes (talkers) e;
  2. Desenvolver alguns endpoints que irão ler e escrever em um arquivo utilizando o módulo `fs`.

</details>

<details>

<summary><strong> 🛠️ Instalando o projeto </strong></summary><br />

  1. Clone o repositório

- Use o comando: `git clone git@github.com:EvelynBastos/talker-manager.git`
- Entre na pasta do repositório que você acabou de clonar:
    - `cd <diretório-do-projeto>`

2. Instale as dependências

    - npm install
  
<summary> 🐳 Início rápido com Docker</summary><br>

> 💡 Dica: Mais detalhes sobre os comandos acima estão na seção [Node e NPM](FAQ.md#node-e-npm) do [arquivo de dúvidas frequentes (FAQ)](FAQ.md).

```bash
# em um terminal, inicie os containers
docker-compose up -d

# acesse o terminal do container inicie a aplicação
docker exec -it talker_manager bash
npm start
# ou para iniciar com live-reload
npm run dev

# em outro terminal, rode os testes
docker exec -it talker_manager bash
npm run lint # roda a verificação do linter
npm test # roda todos os testes
npm test 01 # rodando apenas o teste do requisito 01
```
<summary>🖥️ Início rápido sem Docker</summary><br>

> ⚠️ **Atenção**: O avaliador espera que a versão do `node` utilizada seja a 16.
>
> Crie um arquivo `.env` na raiz do projeto seguindo o padrão do arquivo [`env.example`](./env.example) e o modifique de acordo com a necessidade.
>
> 💡 Dica: Mais detalhes sobre os comandos abaixo estão na seção [Node e NPM](FAQ.md#node-e-npm) do [arquivo de dúvidas frequentes (FAQ)](FAQ.md).

```bash
# em um terminal, inicie a aplicação no container
npm install
env $(cat .env) npm start
# ou para iniciar com live-reload
env $(cat .env) npm run dev
```
</details>
