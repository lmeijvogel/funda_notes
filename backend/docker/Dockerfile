FROM ruby

RUN bundle config --global frozen 1

WORKDIR /usr/src/app

RUN git clone https://github.com/lmeijvogel/funda_notes /tmp/repo \
 && cp -R /tmp/repo/backend/* ./ \
 && rm -rf /tmp/repo

RUN bundle install

CMD ["ruby", "app.rb"]
