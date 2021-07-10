FROM node

RUN apt update && export DEBIAN_FRONTEND=noninteractive && apt-get -y install --no-install-recommends xorg openbox libnss3 libasound2 libatk-adaptor libgtk-3-0

COPY . .

RUN npm install

CMD ["./start.sh"]