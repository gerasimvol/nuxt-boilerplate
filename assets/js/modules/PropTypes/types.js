const image = {
  alt: 'string',
  title: 'string',
  originalSrc: 'string',
  thumb: 'string',
  default: {
    540: 'string',
    768: 'string',
    1280: 'string',
    1920: 'string'
  },
  webp: {
    540: 'string',
    768: 'string',
    1280: 'string',
    1920: 'string'
  }
}

const link = {
  label: 'string',
  url: 'string'
}

const video = {
  poster: image,
  src: {
    mp4: 'string',
    webm: 'string'
  }
}

export default {
  image,
  link,
  video
}
