FROM node:slim
RUN npm install -g cnpm --registry=https://registry.npmmirror.com && cnpm install -g webpack
WORKDIR /app
COPY ./package.json .
RUN cnpm install
COPY . .
RUN npm run build
ENTRYPOINT ["node","./server/index.js"]

