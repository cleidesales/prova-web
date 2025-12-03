# API REST - Cursos e Alunos

API REST completa para gerenciamento de Cursos e Alunos desenvolvida para a avaliação da disciplina Programação Web II.

## 📋 Requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)
- npm

## 🚀 Instalação e Configuração

### 1. Criar o Banco de Dados

Abra o MySQL e execute o seguinte comando:

```sql
CREATE DATABASE avaliacao_web2;
```

**Ou** importe o arquivo `database.sql`:

```bash
mysql -u root -p < database.sql
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

O arquivo `.env` já está configurado com:

```
DB_NAME=avaliacao_web2
DB_USER=root
DB_PASSWORD=
HOST=localhost
DB_DIALECT=mysql
PORTA=3000
```

Se necessário, ajuste as credenciais do MySQL.

### 4. Iniciar o Servidor

```bash
node index.js
```

O servidor estará rodando em: `http://localhost:3000`

## 📚 Endpoints da API

### Cursos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/cursos` | Listar todos os cursos |
| GET | `/cursos/:id` | Buscar curso por ID |
| POST | `/cursos` | Criar novo curso |
| PUT | `/cursos/:id` | Atualizar curso |
| DELETE | `/cursos/:id` | Deletar curso |

**Exemplo de corpo da requisição (POST/PUT):**
```json
{
  "nome": "Análise e Desenvolvimento de Sistemas",
  "descricao": "Curso superior de tecnologia",
  "carga_horaria": 2400
}
```

### Alunos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/alunos` | Listar todos os alunos |
| GET | `/alunos/:id` | Buscar aluno por ID |
| POST | `/alunos` | Criar novo aluno |
| PUT | `/alunos/:id` | Atualizar aluno |
| DELETE | `/alunos/:id` | Deletar aluno |

**Exemplo de corpo da requisição (POST/PUT):**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "matricula": "2024001",
  "curso_id": 1
}
```

## 🔍 Códigos de Status HTTP

- **200 OK**: Operação bem-sucedida
- **201 Created**: Recurso criado com sucesso
- **400 Bad Request**: Erro de validação
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro interno do servidor

## 🧪 Testando a API

### Usando curl

**Criar um curso:**
```bash
curl -X POST http://localhost:3000/cursos -H "Content-Type: application/json" -d "{\"nome\":\"ADS\",\"descricao\":\"Análise e Desenvolvimento de Sistemas\",\"carga_horaria\":2400}"
```

**Listar cursos:**
```bash
curl http://localhost:3000/cursos
```

**Criar um aluno:**
```bash
curl -X POST http://localhost:3000/alunos -H "Content-Type: application/json" -d "{\"nome\":\"João Silva\",\"email\":\"joao@email.com\",\"matricula\":\"2024001\",\"curso_id\":1}"
```

**Listar alunos:**
```bash
curl http://localhost:3000/alunos
```

### Usando Postman ou Insomnia

1. Importe a coleção de requisições (se disponível)
2. Configure a URL base: `http://localhost:3000`
3. Teste cada endpoint conforme a documentação acima

## 📁 Estrutura do Projeto

```
avaliacao_etapa2/
├── config/
│   └── banco.js          # Configuração do Sequelize
├── models/
│   ├── Curso.js          # Model de Curso
│   └── Aluno.js          # Model de Aluno
├── controllers/
│   ├── CursoController.js # Controller de Cursos
│   └── AlunoController.js # Controller de Alunos
├── routes/
│   ├── cursos.js         # Rotas de Cursos
│   └── alunos.js         # Rotas de Alunos
├── .env                  # Variáveis de ambiente
├── index.js              # Arquivo principal
└── package.json          # Dependências
```

## ✅ Funcionalidades Implementadas

- ✅ CRUD completo para Cursos
- ✅ CRUD completo para Alunos
- ✅ Relacionamento entre Curso e Aluno (1:N)
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Códigos HTTP apropriados
- ✅ Respostas em JSON
- ✅ Integridade referencial (verifica se curso existe ao criar aluno)

## 👨‍💻 Autor

**Aluno:** Cleidinete Silva Sales
Disciplina: Programação Web II - IFMA
