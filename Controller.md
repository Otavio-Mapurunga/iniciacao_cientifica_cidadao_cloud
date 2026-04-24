# Controller

Parte que recebe as ações do usuário e conecta a View ao Model.

## Controllers principais

### UsuarioController
- Cadastrar usuário
- Realizar login
- Editar perfil

### DemandaController
- Criar demanda
- Listar demandas
- Filtrar por categoria/status/localização
- Atualizar status
- Anexar imagem

### RelatorioController
- Gerar total de demandas
- Listar demandas por categoria
- Listar demandas por status

---

## 3) Requisitos Funcionais

### ✅ Requisitos do CidadãoCloud

- O sistema deve permitir o cadastro de usuários (cidadãos).
- O sistema deve permitir o registro de demandas/problemas urbanos.
- O sistema deve permitir anexar fotos às solicitações.
- O sistema deve permitir informar localização/endereço da ocorrência.
- O sistema deve permitir classificar a demanda por categoria (ex: iluminação, lixo, buraco, segurança).
- O sistema deve exibir uma lista pública de demandas registradas.
- O sistema deve permitir visualizar o status da demanda (aberto, em andamento, resolvido).
- O sistema deve permitir a atualização do status pelo administrador.
- O sistema deve possuir um painel administrativo para gerenciamento das demandas.
- O sistema deve permitir a busca e filtro de demandas por categoria, status ou localização.
- O sistema deve gerar relatórios simples (quantidade de demandas, categorias mais frequentes).
- O sistema deve exibir demandas em um mapa interativo.

---

## 4) Requisitos Não Funcionais

- O sistema deve ser web e responsivo.
- O sistema deve ser hospedado em nuvem.
- A interface deve ser simples e intuitiva.
- O sistema deve possuir autenticação segura.
- As imagens devem ser armazenadas em serviço cloud.
- O sistema deve ter boa disponibilidade.
- O sistema deve permitir crescimento futuro.
- O tempo de resposta deve ser adequado para uso cotidiano.

---

## 5) Tecnologias Sugeridas para Iniciante

### Opção simples
| Camada | Tecnologia |
|--------|-----------|
| Frontend/View | HTML, CSS, JavaScript ou React |
| Backend/Controller | Node.js com Express |
| Banco/Model | MongoDB Atlas ou Firebase Firestore |
| Armazenamento de fotos | Firebase Storage |
| Hospedagem | Render, Vercel ou Firebase Hosting |

### Opção mais acadêmica
| Camada | Tecnologia |
|--------|-----------|
| Frontend | React |
| Backend | Node.js + Express |
| Banco | PostgreSQL ou MongoDB |
| Cloud | AWS, Azure ou Google Cloud |

---

## 6) Entregável do Projeto

O entregável final será um **protótipo funcional em nuvem** do sistema **CidadãoCloud**, contendo:

- Cadastro e login de usuários
- Registro de demandas urbanas
- Upload de fotos
- Acompanhamento de status
- Painel administrativo
- Relatórios básicos
- Visualização em mapa
