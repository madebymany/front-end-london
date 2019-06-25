FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /site
WORKDIR /site
ADD Gemfile /site/Gemfile
ADD Gemfile.lock /site/Gemfile.lock
RUN bundle install
ADD . /site
