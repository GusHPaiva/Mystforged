FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# O "--host" é OBRIGATÓRIO pro Docker expor o IP pra fora do container
CMD ["npm", "run", "dev", "--", "--host"]