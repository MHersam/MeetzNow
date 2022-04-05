FROM node as WEBAPP

WORKDIR /webapp

COPY webapp .

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g vue-cli
RUN npm install
RUN npm run build


FROM node:alpine

COPY server .
COPY --from=WEBAPP /webapp/dist ./public/webapp

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

EXPOSE 3000

CMD [ "node", "app.js" ]
