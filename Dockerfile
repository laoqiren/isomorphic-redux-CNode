FROM node:slim
RUN mkdir /app
WORKDIR /app
COPY ./package.json /app/
RUN npm install --production -d --registry=https://registry.npm.taobao.org \
    && npm install --save babel-plugin-import babel-plugin-transform-react-jsx \
    babel-preset-es2015 babel-preset-react
COPY . /app/
RUN ["node","./server/index.js"]

