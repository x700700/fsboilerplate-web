# Stage 1 - Build React app
FROM node:8.10.0 as build-os

# Configuration
ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

# build
RUN mkdir -p /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
COPY .env.prod /app/.env
RUN yarn build


# Stage 2 - Build the production environment
FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d
COPY config/nginx/conf /etc/nginx
COPY --from=build-os /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
