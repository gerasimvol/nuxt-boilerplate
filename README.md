## Старт проекта

### Создаем .env

```
cp .env.development .env
```
копируем .env.development или .env.production => .env  Файл .env находиться в .gitignore:  для удобства git merge и предотвращения затирания этого файла. В файле представлены следующее базовые глобальные переменные:

```js
API_HOST='good-uniform.com.dev11.vintagedev.com.ua' // хост API запросов. используется для axios
API_PORT=80 // порт для API, по-умолчанию 80, может менятся для локальной среды и для https
API_PREFIX='/api' // префикс для API запросов
STORAGE_PRIFIX='/storage' // префикс для статики
HTTPS=false // протокол хоста

FAKE_API_ENABLED=false // активация запросов на локальный сервер в качестве fallback

PORT=3999 // порт приложения nuxt
HOST='0.0.0.0' // хост приложения nuxt

VINTAGE_COPYRIGHT=true // enable vintage console.log assets/js/helper/vintage-console.js

```

---

## Настройка редиректов 

модуль редиректов находится в папке server/utils/path-for-redirect.js. В качестве аргмента заходит path и возвращается преобразованный path либо false. Данный модуль запускается на сервере и в middleware/redirects.js на клиенте. 

```json
switch (true) {
case /.+\/$/g.test(path): // remove slash on the end
	return path.replace(/\/$/g, '')
  
... etc.
  
default:
	return false
}
```

## Папки и файлы

---

##### `~/assets/` folder

```
.
├── js
│   ├── canvas
│   │   └── все что связано с канвасом (темлпейт, отдельные классы)
│   │
│   ├── helpers
│   │   └── переиспользуемые функции, утилитки, хелперы
│   │
│   └── modules
│       └── глобальные js модули (напрмиер Observer.js)
│
│
├── variables (переменные которые доступны в js & scss. После добавления переменной нужен ребилд)
│   ├── breakpoints.js (переменные ширин устройств)
│   ├── colors.js (нейминг: $c-disabled, $c-active, $c-black)
│   ├── fonts.js (нейминг: $f-main, $f-secondary etc.)
│   ├── index.js (импорт всех переменных)
│   └── zIndexes.js (глобальные z-indexы для меню, хедера и тд)
│
├── styles
│   ├── main.scss (тут импорт всех файлов в папке styles)
│   │
│   ├── base
│   │   ├── _fonts.scss (подключение шрифтов)
│   │   ├── _reset.scss (сброс стилей для всех браузеров)
│   │   └── _typography.scss (стили для заголовков, параграфов и текста)
│   │
│   ├── components (сюда можно добавить глобальные файлы стилей например _common.scss, _icons.scss etc.)
│   │   └── _modals.scss 
│   │
│   ├── helpers (классы хелперы)
│   │   └── _transitions.scss
│   │
│   ├── layout
│   │   ├── _grid.scss (контейнеры)
│   │   └── _layout.scss (html, body, стики футер и тд.)
│   │
│   └── utils
│       ├── functions
│       │   └── _breakpoints.scss (служебный хелпер для медиа запросов)
│       │
│       └── mixins (что бы создать новый миксин просто добавь файл)
│           ├── _breakpoints.scss (медиа запросы)
│           ├── _fonts.scss (фонт фейс)
│           └── _visually-hidden.scss
│
└── svg (свг файлы (обрабатываются SVGO - настройки в ~/nuxt-config/_build.js))
    └── close.svg
```
---

##### `~/components/` folder

```
.
├── base (имеют префикс Base и автоматически импортятся во все компоненты)
│   ├── BaseButton.vue
│   ├── BaseImage.vue
│   └── form (части форм)
│       ├── BaseCheckbox.vue
│       ├── BaseTextField.vue
│       ├── form-mixin.js
│       └── inputs-mixin.js
│
├── helpers (компоненты обертки, служебные)
│   ├── AspectRatio.vue
│   ├── DevHelpers.vue
│   └── DynamicComponent.vue
│
├── layout (имеют префикс The (используются один раз) и являются составными частями лейаута)
│   ├── TheHeader.vue
│   ├── TheBreadcrumbs.vue
│   ├── TheFooter.vue
│   └── TheMenu.vue
│
├── sections (имеют префикс Section. секции (блоки) которые приходят с бэка)
│   ├── SectionForm.vue
│   └── SectionHomeBanner.vue
│
└── shared (переиспользуемые компоненты)
    ├── SocialLinks.vue
    └── ArticleCard.vue
```
