FROM node:16-alpine as builder

WORKDIR /usr/app/

COPY ./package.json . 

RUN npm install 

COPY . . 

RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /usr/app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173