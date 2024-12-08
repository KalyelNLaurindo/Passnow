# Dockerfile para o frontend React (Vite)
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json /app/

# Instalar dependências
RUN npm install

# Copiar o código fonte
COPY . /app/

# Build da aplicação (gera a pasta dist/)
RUN npm run build

# Instalar a ferramenta "serve" globalmente
RUN npm install -g serve

# Servir a aplicação React com o diretório correto (dist)
CMD ["serve", "-s", "dist", "-l", "5000"]

# Expor a porta 5000
EXPOSE 5000

