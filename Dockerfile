ARG   DOCKER_REGISTRY

FROM $DOCKER_REGISTRY/node:14-alpine as builder

# EXPOSE 3002

RUN mkdir -p /app

COPY ./ /app
WORKDIR /app


RUN  apk add yarn && cd /app && yarn config delete registry && yarn install && ls -la && yarn build  

# ENTRYPOINT [ "yarn" , "start" ]

# FROM $DOCKER_REGISTRY/nginx:1.21.6
# COPY ./nginx.conf /etc/nginx/nginx.conf
# RUN rm -rf /usr/share/nginx/html
# COPY --from=builder /app/dist /usr/share/nginx/html
# # RUN ls -la
# EXPOSE 3002
# ENTRYPOINT [ "nginx" ]
# CMD [ "-g", "daemon off;"]



FROM scratch AS export-stage


COPY --from=builder /app/dist /