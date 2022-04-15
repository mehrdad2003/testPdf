FROM node:14.15.5-alpine

WORKDIR /app



RUN apk add --no-cache udev ttf-freefont chromium git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

RUN npm install 

COPY . /app
ADD package.json package-lock.json /
RUN npm install
EXPOSE 5000

CMD ["npm", "start"] 