FROM node:alpine
ARG JPH_API
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
ENV REACT_APP_JPH_API ${JPH_API}
RUN npm run build

FROM nginx
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
