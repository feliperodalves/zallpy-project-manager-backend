# Desafio Técnico - Fullstack Javascript

![Zallpy](https://zallpy.com/img/zallpy_footer_logo.png)

## Desafio - BackEnd

Desenvolver uma aplicação web que gerencie alocação de profissionais em projetos. O objetivo do sistema deve ser controlar as horas trabalhadas do profissional em cada projeto, ou seja, cada profissional deverá ter a possibilidade de registrar quantas horas e em qual projeto trabalhou.

### Ações

- Criação e edição de usuários
- Autenticação de usuários usando JWT
- Criação, edição e exclusão de projetos
- Atribuição de usuários aos projetos
- Criação, edição e exclusão de tarefas

### Recursos Utilizados

- Express
- JWT / bcrypt - para autenticação e criptografia
- Sequelize / Postgres - para base de dados
- Yup - para validação de dados
- date-fns / moment - para validação de datas
- Eslint / Prettier - para estilização de código
- Nodemon / Sucrase - para auxiliar no desenvolvimento (live checking e uso imports)

### Para execução

- Clonar o repositório
- Rodar 'yarn' ou 'npm install'
- Após o banco de dados estiver online, executar 'yarn migrate-seed' para criar a base de dados com os dados já preparados.

> Estes procedimentos podem ser executados pelo docker-compose no arquivo docker-compose.yml encontrado no repositório
