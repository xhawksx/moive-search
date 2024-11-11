# Movie Search App

Uma aplicação full-stack que permite aos usuários pesquisar filmes usando The One API e visualizar seu histórico de pesquisas.

## Tecnologias Utilizadas

### Backend
- Python 3.10.7
- FastAPI
- Motor (MongoDB driver assíncrono)
- Uvicorn
- Docker

### Frontend
- React.js
- Axios
- React Router
- Docker

### Banco de Dados
- MongoDB

## Pré-requisitos

- Docker
- Docker Compose
- Token de API do [The One API](https://the-one-api.dev/)

## Estrutura do Projeto

```
movie-search-app/
├── backend/              # Backend em FastAPI
├── frontend/             # Frontend em React
├── docker-compose.yml    # Configuração Docker Compose
├── .env                  # Variáveis de ambiente
└── README.md             # Este arquivo
```

## Configuração e Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd movie-search-app
```

2. Configure as variáveis de ambiente:
```bash
# Edite o arquivo .env com suas configurações
# Principalmente o ONE_API_TOKEN
```

3. Construa e inicie os containers:
```bash
docker-compose up --build
```

## Serviços e Portas

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Backend Documentação: http://localhost:5000/docs
- MongoDB: mongodb://localhost:27017

## Endpoints da API

### Backend API (FastAPI)

#### Buscar Filmes
```
POST /api/search
Content-Type: application/json

{
    "userName": "string",
    "movieName": "string"
}
```

#### Obter Histórico
```
GET /api/history
```

## Desenvolvimento Local

### Backend

1. Entre no diretório do backend:
```bash
cd backend
```

2. Crie e ative um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Execute o servidor de desenvolvimento:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 5000
```

### Frontend

1. Entre no diretório do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm start
```

## Documentação da API

A documentação interativa da API está disponível em:
- Swagger UI: http://localhost:5000/docs
- ReDoc: http://localhost:5000/redoc

## Arquivos de Ambiente (.env)

```env
# Backend
MONGODB_URI=mongodb://mongodb:27017/
ONE_API_TOKEN=seu_token_aqui

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
```

## Docker

### Construir e Executar com Docker Compose

```bash
# Construir e iniciar todos os serviços
docker-compose up --build

# Executar em segundo plano
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Visualizar logs
docker-compose logs -f
```

### Comandos Docker Individuais

```bash
# Construir imagem do backend
docker build -t movie-search-backend ./backend

# Construir imagem do frontend
docker build -t movie-search-frontend ./frontend

# Executar container do MongoDB
docker run --name mongodb -d -p 27017:27017 mongo
```

## Problemas Comuns

1. **Erro de Conexão com MongoDB**
   - Verifique se o serviço do MongoDB está rodando
   - Confirme se a string de conexão está correta no arquivo .env

2. **Erro de API Token**
   - Verifique se o token do The One API está configurado corretamente no .env
   - Confirme se o token ainda é válido em https://the-one-api.dev/

