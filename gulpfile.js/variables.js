const path = {
  public:'dist',
  source:'src'
}

const resources = {
  all:path.public + '/**/*',
  pug:{
    source: path.source + '/**/*.pug',
    public: path.public + '/'
  },
  sass:{
    source: path.source + '/scss/**/*.scss',
    public: path.public + '/css/',
    main:'main.css'
  },
  js:{
    source: [
      path.source + '/js/*.js'
		],
    public: path.public + '/js/',
    main:'main.js'
  },
  images:{
    source: path.source + '/images/**/*.*',
    public: path.public + '/images',
  },
  dev:{
    media:'',
    style:'',
    scripts:'',
    firebase:'https://www.gstatic.com/firebasejs',
    domain:'https://feed-shared-carousel.web.app'
  },
  prod:{
    media:'',
    style:'',
    scripts:'',
    firebase:'https://feed-shared-carousel.web.app/__/firebase/',
    domain:'https://feed-shared-carousel.web.app'
  }
}

module.exports = {
  path,
  resources
}