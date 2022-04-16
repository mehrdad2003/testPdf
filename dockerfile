FROM node:lts-alpine

WORKDIR /app

RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
    chromium \
    harfbuzz \
    "freetype>2.8" \
    ttf-freefont \
    nss



COPY . /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
RUN chmod -R o+rwx node_modules/puppeteer/.local-chromium
RUN npm install

EXPOSE 5000

CMD ["npm", "start"]  