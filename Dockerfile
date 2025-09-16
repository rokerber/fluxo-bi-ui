# --- ESTÁGIO 1: Build da Aplicação Angular ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Agora copia o resto do código fonte
COPY . .

# Roda o build de produção UMA ÚNICA VEZ
RUN npx ng build --configuration production

# --- ESTÁGIO 2: Servidor de Produção com Nginx ---
FROM nginx:alpine

# Copia nossa configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos da aplicação já compilados para produção
# O caminho '/app/dist/fluxo-bi-ui/browser' foi gerado no estágio anterior
COPY --from=builder /app/dist/fluxo-bi-ui/browser /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
