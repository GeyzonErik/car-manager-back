# 🚗Car Manager - Backend API

> Sistema de Gestão de Veículos - API REST

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![MikroORM](https://img.shields.io/badge/MikroORM-000000?style=for-the-badge&logo=mikroorm&logoColor=white)](https://mikro-orm.io/)

## 📋 Sobre o Projeto

Sistema de gestão de veículos que permite o controle total da frota através de uma API REST robusta e uma interface web moderna.

### 🌐 Links do Projeto

- **Frontend (Next.js)**: [GitHub Repository](https://github.com/GeyzonErik/car-manager-front)
- **Aplicação Online**: [car-manager.vercel.app](https://car-manager-front.vercel.app)
- **Backend API**: Este repositório

## ✨ Funcionalidades Principais

### 🔐 Autenticação e Usuários
- **Registro de usuários** com validação de dados
- **Login seguro** com JWT tokens
- **Proteção de rotas** com middleware de autenticação
- **Gerenciamento de perfis** de usuários

### 🚗 Gestão de Veículos
- **Cadastro completo** de veículos (modelo, placa, status)
- **Ativação/desativação** de veículos da frota
- **Edição de informações** dos veículos
- **Exclusão segura** com soft delete
- **Listagem com filtros** e paginação

### 📊 Histórico e Relatórios
- **Log de atividades** de todos os veículos
- **Histórico de mudanças** de status
- **Relatórios detalhados** de movimentações
- **Auditoria completa** de ações

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação tipada
- **Express.js** - Framework web para Node.js
- **MikroORM** - ORM moderno com TypeScript
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Criptografia de senhas
- **CORS** - Cross-Origin Resource Sharing

### Arquitetura
- **Clean Architecture** - Separação clara de responsabilidades
- **Domain-Driven Design (DDD)** - Modelagem orientada ao domínio
- **Repository Pattern** - Abstração de acesso a dados
- **Use Case Pattern** - Casos de uso bem definidos
- **Dependency Injection** - Inversão de controle

## 📁 Estrutura do Projeto

```
src/
├── app.ts                          # Ponto de entrada da aplicação
├── config/
│   └── mikro-orm.config.ts        # Configuração do ORM
├── common/
│   ├── errors/                     # Classes de erro customizadas
│   └── loggers/                    # Sistema de logging
├── modules/
│   ├── auth/                       # Módulo de autenticação
│   │   ├── api/                    # Controllers, rotas, guards
│   │   ├── application/            # Use cases e serviços
│   │   └── auth.module.ts
│   ├── users/                      # Módulo de usuários
│   │   ├── api/                    # Controllers, rotas, presenters
│   │   ├── application/            # Use cases e repositories
│   │   ├── data/                   # Implementações de dados
│   │   └── domain/                 # Entidades e value objects
│   └── vehicles/                   # Módulo de veículos
│       ├── api/                    # Controllers, rotas, presenters
│       ├── application/            # Use cases e repositories
│       ├── data/                   # Implementações de dados
│       └── domain/                 # Entidades e value objects
└── migrations/                     # Migrações do banco de dados
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 12+
- Yarn ou npm

### ⚠️ Importante: Configuração de Aliases

O projeto utiliza **module aliases** para facilitar as importações. Na linha 1 do `src/app.ts`:

```typescript
import "module-alias/register";
```

**O que faz:** Esta linha registra os aliases de módulos definidos no `package.json` (`_moduleAliases`), permitindo importações como:
- `@/users/user.module` em vez de `../../users/user.module`
- `@common/errors/bad-request.error` em vez de `../../common/errors/bad-request.error`

**Problema em desenvolvimento:** Em alguns ambientes de desenvolvimento, especialmente com `ts-node-dev`, pode haver conflitos entre o `module-alias` e o TypeScript. Se você encontrar erros de importação, tente:

1. **Remover temporariamente** a linha `import "module-alias/register";` do `src/app.ts`
2. **Usar importações relativas** durante o desenvolvimento
3. **Manter a linha** para produção (onde funciona perfeitamente)

**Solução alternativa:** Se o problema persistir, você pode configurar o `ts-node-dev` para usar o `tsconfig-paths`:
```bash
yarn add -D tsconfig-paths
```
E modificar o script no `package.json`:
```json
"start:dev": "ts-node-dev --cls --respawn --require tsconfig-paths/register src/app.ts"
```

### 1. Clone o repositório
```bash
git clone https://github.com/GeyzonErik/car-manager-back.git
cd car-manager-back
```

### 2. Instale as dependências
```bash
yarn install
# ou
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=car_manager

# Application
APP_PORT=3001
CORS_ORIGIN=http://localhost:3000

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

### 4. Configure o banco de dados
```bash
# Usando Docker (recomendado)
docker-compose up -d

# Ou configure manualmente o PostgreSQL
```

### 5. Execute as migrações
```bash
yarn mikro:up
# ou
npm run mikro:up
```

### 6. Inicie o servidor
```bash
# Desenvolvimento
yarn start:dev
# ou
npm run start:dev

# Produção
yarn build
yarn start
# ou
npm run build
npm start
```

## 📚 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `yarn start:dev` | Inicia o servidor de desenvolvimento |
| `yarn build` | Compila o projeto TypeScript |
| `yarn start` | Inicia o servidor de produção |
| `yarn mikro:generate` | Gera nova migração |
| `yarn mikro:up` | Executa migrações pendentes |
| `yarn mikro:down` | Reverte última migração |

## 🔌 Endpoints da API

### Autenticação
- `POST /api/v1/auth/register` - Registro de usuário
- `POST /api/v1/auth/login` - Login de usuário

### Usuários
- `GET /api/v1/users` - Obter dados do usuário logado
- `PUT /api/v1/users` - Atualizar dados do usuário

### Veículos
- `POST /api/v1/vehicles` - Criar veículo
- `GET /api/v1/vehicles` - Listar veículos
- `GET /api/v1/vehicles/status-summary` - Resumo quantidade de veiculos por status
- `GET /api/v1/vehicles/:id` - Obter detalhes do veículo
- `PATCH /api/v1/vehicles/:id` - Atualizar veículo
- `PATCH /api/v1/vehicles/:id/toggle-active` - Ativar/desativar veículo
- `DELETE /api/v1/vehicles/:id` - Excluir veículo

### Histórico
- `GET /api/v1/vehicles/vehicles-history` - Resumo de auditoria da frota

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture** com as seguintes camadas:

### Domain Layer
- **Entities**: Entidades de negócio (User, Vehicle, VehicleLog)
- **Value Objects**: Objetos de valor (Email, Password, Plate, Model)
- **Errors**: Erros específicos do domínio

### Application Layer
- **Use Cases**: Casos de uso da aplicação
- **Services**: Serviços de aplicação
- **Repositories**: Interfaces de acesso a dados

### Infrastructure Layer
- **Controllers**: Controladores HTTP
- **Routes**: Definição de rotas
- **Presenters**: Formatação de respostas
- **Guards**: Middlewares de autenticação

### Data Layer
- **MikroORM Repositories**: Implementações concretas
- **Mappers**: Conversão entre entidades e schemas
- **Schemas**: Definições do banco de dados

## 🔒 Segurança

- **JWT Tokens** para autenticação
- **bcryptjs** para hash de senhas
- **CORS** configurado adequadamente
- **Validação de dados** em todas as entradas
- **Soft Delete** para exclusão segura
- **Auditoria** de todas as ações


### Produção
1. Configure as variáveis de ambiente
2. Execute `yarn build`
3. Inicie com `yarn start`


## 👨‍💻 Autor

**Erikles Geyzon**
- GitHub: [@GeyzonErik](https://github.com/GeyzonErik)
- Email: geyzon100@gmail.com

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório! 
