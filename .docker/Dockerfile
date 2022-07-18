FROM ubuntu:20.04
SHELL ["/bin/bash", "-c"]
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update &&\
    apt-get upgrade -y &&\
    apt-get install -y curl nano wget rsync sudo gnupg gnupg2 ruby ruby-dev bundler nodejs npm zip unzip
RUN mkdir -p /home/dev/src
RUN useradd -UM -d /home/dev -G sudo dev
RUN echo "dev:dev" | chpasswd
RUN chown -R dev:dev /home/dev
RUN gem install compass
USER dev
RUN touch ~/.bashrc
RUN echo "cd /home/dev/src" >> ~/.bashrc
ENTRYPOINT ["tail", "-f", "/dev/null"]