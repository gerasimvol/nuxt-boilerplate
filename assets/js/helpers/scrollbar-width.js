export default function () {
  const outer = createEl('div', {
    attrs: {
      style: 'visibility: hidden; width: 100px; ms-overflow-style: scrollbar;'
    }
  })

  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = createEl('div', {
    attrs: {
      style: 'width: 100%;'
    }
  })
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)

  return (widthNoScroll - widthWithScroll)
}

function createEl (tag, options) {
  if (!tag) return

  const HTMLTags = 'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'

  if (!HTMLTags.split(',').includes(tag)) throw new Error('Not valid HTML tag')

  const el = document.createElement(tag)

  if (typeof options === 'object') {
    if (options.hasOwnProperty('attrs')) {
      for (const key in options.attrs) {
        el.setAttribute(key, options.attrs[key])
      }
    }

    if (options.hasOwnProperty('style')) {
      for (const key in options.style) {
        el.style[key] = options.style[key]
      }
    }

    if (options.hasOwnProperty('dataset')) {
      for (const key in options.dataset) {
        el.dataset[key] = options.dataset[key]
      }
    }

    if (options.hasOwnProperty('events')) {
      for (const key in options.events) {
        el.addEventListener(key, options.events[key])
      }
    }
  }
  return el
}
