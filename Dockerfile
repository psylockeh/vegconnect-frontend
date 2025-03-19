# Usa uma imagem oficial do Node.js LTS Alpine
FROM node:22-alpine

# Expo precisa disso para funcionar corretamente
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# Define a pasta de trabalho
WORKDIR /app

# Instala globalmente o Expo CLI
RUN npm install -g expo-cli

# Copia e instala dependências
COPY package*.json ./
RUN npm install

# Copia os arquivos restantes do projeto
COPY . .

# Expõe a porta padrão do Expo
EXPOSE 8081
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Executa o servidor Expo em modo desenvolvimento
CMD ["expo", "start", "--web", "--tunnel"]
