## Взаимодействие Frontend и Backend приложений



### 1. Общие положения

**1.1.** **Все проекты считаются мультиязычными.** Даже если на сайте используется только один язык - это "мультиязычный" сайт с одним языком.

**1.2.** Все запросы на API **должны** идти с указанием языка в заголовках: `Accept-Language: en`. По-умолчанию, берем язык браузера клиента. Если такого языка в БД нету - формируем данные с локализацией по-умолчанию.

**1.3.** Для фронтенда считаются "**зарезервированными**" следующие роуты:

- `/admin` - по-умолчанию будет использоваться для админки проекта
- `/api` - роут на апи
- `/uploads` - хранилище статики, загружаемой через админку. В большинстве случаев будет иметь полный роут вида `https://example.com/uploads/image.png`.
- `/robots.txt` 
- `/sitemap.xml`
- `/index`

Данный набор зарезирвированных роутов может менятся, в зависимости от требований к проекту и должен быть озвучен заранее ПМом или бекенд-разработчиком.

**1.4.** **Возможен** вариант, когда будет вводится версионность API. В таком случае, базовый роут на API будет иметь вид: `/api/v1/route`.

**1.5.** Всегда **обязательно** придерживаемся одного и того же типа данных или `null`. 

**1.6.** Если на проекте присутствуют календари или работа с часовыми поясами, формат даты в API – должен быть Timestamp (в секундах) в UTC. Преобразование в нужный часовый пояс и формат - на фронт-приложении. В других случаях (например, дата публикации статьи) – форматируем дату на бекенде и отдаем дату строкой в нужной локализации. [Форматы дат в PHP](https://www.php.net/manual/ru/function.date.php)

**1.7.** Ответ API всегда **должен** отдавать корректный код ответа. Фронтенд приложение **должно** всегда их обрабатывать исходя из бизнес-логики приложения. Пример часто используемых кодов:

- *200 - ОК*
- *404 - Страница не найдена*
- *422 - Ошибка валидации формы*
- *401 - Неавторизован*
- *403 - Доступ запрещен*

**1.8.** Сервер **никогда** не должен отдавать 5хх код. Пример ошибки сервера в структуре:

```json
{
  "name": "Not Found",
  "message": "Page not found.",
  "code": 0,
  "status": 404,
  "type": "yii\\web\\NotFoundHttpException",
  "previous": {
    "debug": {
      "name": "Invalid Route",
      "message": "Unable to resolve the request \"data2\".",
      "code": 0,
      "type": "yii\\base\\InvalidRouteException"
    }
  }
}
```

**1.9.** Все ключи в структуре json должны передавать в `camelCase` формате.

**1.10.** Относительные ссылки всегда должны начинаться с `/`, например `/related/path`. Абсолютные – с протокола `http/https`.



### 2. Глобальные данные (GLOBAL DATA)

**2.1.** Первым запросом на API, фронт-приложение **должно** получить глобальные (`globalData` –  общие для всего проекта) данные с набором всех доступных локалей (языков) в проекте, меню, данными для хедера/футера, данные для страницы ошибки и другие, необходимые под проект данные (`options`).

**2.2.** Глобальные данные должны обязательно стостоять из:

- `header/footer` – как правило, содержит Меню и дополнительные данные в хедере и футере проекта. Если на сайте пристутствует развернутое меню – имеет смысл вынести его в отдельный объект `menu`.
- `scripts` – вставка клиентских скриптов (например, аналитику). По-умолчанию, должны выводится перед закрывающимися тегами `</head> / </body>`, после открывающего `<body>`.
- `locales` – содержим массив доступных на сайте языковых версий. 
- `errors` – статические данные для страницы ошибок. Как правило, состоит из одного объекта `404`, но может быть и под другие коды (`5xx`).
- `options` – дополнительная информация под проект

Допускаются дополнительные структурированные объекты. Например, `translates`.

**2.3.** Пример запроса глобальных данных:

**Запрос:** `/global-data`

```json
{
  "header": {
    "links": [
      {"label": "О компании", "url": "/uk/about"},
      {
        "label": "Каталог",
        "url": "/uk/catalog",
        "items": [
          {"label" : "Мобильные телефоны", "url": "/uk/catalog/mobile"},
          {"label" : "Ноутбуки", "url": "/uk/catalog/laptop"}
        ]
      },
      {"label": "Контакты", "url": "/uk/contacts"}
    ]
  },
  "footer": {
    "links": [
      {"label": "О компании", "url": "/uk/about"},
      {"label": "События", "url": "/uk/events"},
      {
        "label": "Каталог",
        "items": [
          {"label" : "Мобильные телефоны", "url": "/uk/catalog/mobile"},
          {"label" : "Ноутбуки", "url": "/uk/catalog/laptop"}
        ]
      }
    ],
    "copyright": "Copyright (c) Vintage"
  },
  "search": {
    "title": "Поиск по сайту",
    "searchUrl": "/uk/search",
    "placeholder": "What you are looking for..?"
  },
  "scripts": {
    "head": {
      "end": "<script>console.log('end head')</script>"
    },
    "body": {
      "begin": "<script>console.log('begin body')</script>",
      "end": "<script>console.log('end body')</script>"
    }
  },
  "locales": [
    {
      "label": "EN",
      "сode": "en",
      "default": false,
      "current": true
    },
    {
      "label": "UA",
      "code": "uk",
      "default": true,
      "current": false
    }
  ],
  "cookiesBanner": {
    "label": "COOKIE POLICY POPUP",
    "content": "html content",
    "url": "/cookie",
    "button": { "label": "Accept" }
  },
  "errors": {
    "404": {
      "title": "Страница не найдена",
      "link": {
        "label": "На главную",
        "url": "/uk/"
      },
      "seo": {
        "title": "Page title",
        "description": "Page description",
        "og": {
          "title":  "OpenGraph Title",
          "description":  "OpenGraph Title",
          "image": "https://site.com/storage/og.png"
        },
        "breadcrumbs": "**breadcrumbs.json**",
        "robots": "noindex,nofollow",
        "microdata": "<script type='application/ld+json'>...</script>"
      },
    },
    "500": {
      "title": "Cайт не доступен",
      "link": {
        "label": "На главную",
        "url": "/"
      },
      "seo": "..." 
    }
  },
  "options": {
    "gooleMapKey": "..."
  }
}
```



### 3. Страницы / сущности

**3.1.** Страница каждой сущности должна обязательно иметь минимум 3 ключа:

- `id` – уникальный идентификатор старницы, не зависимый от локализации.
- `blocks` – массив с перечнем контентных (конструкторных) блоков на странице. Каждый блок – это отдельные класс/компонент,  `id`  которого соответствует названию конкретного класса/компонента (должен иметь формат именни с префиксом Block. Например, `BlockComponentName`) и иметь фиксированый набор свойств (аттрибутов/props), перечисленных в `attributes`.
- `meta` – содержить мета-информацию о странице (заголовок, мета-теги, opengraph, хлебные крошки, дополнительную микроразметку, сео-текст, данные и ссылки на данную страницу/сущность на альтернативных языках  или дополнительную информацию при необходимости (`pageOptions`)).

**3.2.** Все динамические данные по странице с пагинацией (напр., список новостей), **запрашиваем по отдельному роуту**. Т.е. первым запросом получаем блоки страницы, вторым запрашивем 1ю страницу элементов. Ccылка на запрос обязательно должна присутствовать в аттрибутах блока под ключом `"dynamicDataUrl"`.

**3.3.** Получение списка элементов с пагинацией должно быть доступно **обязательно** с возможностю управления количеством (`per-page`) и/или с возможностю управлять сортировкой (`sort=-created_at`) в идеале. 

**3.4.** Для страниц с пагинацией, изменения URL браузера (`page=n`) – **обязательное**. При "lazy load" – согласно условий задачи. Традиционная пагинация и "lazy load" для бекенд-приложения – аналогична. Все необходимые данные для пагинации передаются на фронтенд в объектах `links`, `meta` (стандартный фукцинал DataProvider  и Serializer).

- `links` - набор сервисных ссылок для получения текущей страницы, страниц пагинации, дополнительных ссылок, необходимых для конкретной страницы.
- `meta` - данные для пагинатора.

**3.5.** Всю **структуру и перечень страниц на сайте, бекенд хранит в БД**, вместе с уникальными адрессами (УРЛами) страниц. Перечень всех страниц должны быть предоставленны ПМом перед началом разработки. Вся структура должна добавлятся в проект миграцией. Смена alias страницы администраторами допускается только в том случае, если такие требования указаны в ТЗ.

**3.6.** **В проектах-конструкторах** – даем администратору  интерфейс управлять всеми страницами, их вложенностью и ссылками. Структура проекта в этом случае наполняется менеджером проекта или контент менеджером.

**3.7.** **Минимальное требование к алиасу страницы** для совместимости с роутером фронт-приложения: 3 символа.

**3.8.** Дополнительные, вспомагательные запросы на странице должны отдавать только самый необходимый контент. Например, после выбора региона, отдавать только массив с городами, без статического контента (если по условию задачи он не должен меняться).

**3.9.** Пример **запроса** страницы:  `/<alias>`, где alias – уникальный идетнификатор страницы в БД.

```json
{
  "id": "CatalogPage",
  "meta": {
    "seo": {
      "title": "Page title",
      "description": "Page description",
      "og": {
        "title":  "OpenGraph Title",
        "description":  "OpenGraph Title",
        "image": "https://site.com/storage/og.png"
      },
      "breadcrumbs": "**breadcrumbs.json**",
      "robots": "index,follow",
      "microdata": "<script type='application/ld+json'>...</script>"
    },
    "locales": [
      {
        "label": "EN",
        "code": "en",
        "default": false,
        "current": true,
        "url": "https://example.com/en/absolute/path"
      },
      {
        "label": "UA",
        "code": "uk",
        "default": true,
        "current": false,
        "url": "https://example.com/absolute/path"
      }
    ],
    "pageOptions": {
      "template": "dark",
    }
  },
  "blocks": [
    {
      "id": "BlockSlider",
      "level": 2,
      "attributes": {
        "title": "Преимущества",
        "slides": [
          {
            "title": "Внимание к деталям",
            "description": "...",
            "image": "**image.json**"
          },
          {
            "title": "Еще больше внимание к деталям",
            "description": "...",
            "image": "**image.json**"
          }
        ]
      }
    },
    {
      "id": "BlockSignUp",
      "level": 2,
      "attributes": {
        "title": "Регистрация",
        "form": "**form.json**"
      }
    },
    {
      "id": "BlockNewsList",
      "level": 2,
      "attributes": {
        "title": "Последние новости",
        "readMoreLinkLabel": "Подробнее",
        "allNewsLink": {
          "label": "Все новости",
          "url": "/uk/news"
        },
        "dynamicDataUrl": "/uk/news/list?page=1&per-page=6&sort=-created_at"
      }
    }
  ]
}
```

**3.10.** Пример запроса сущностей с пагинацией:

**Запрос**: `/news/list?page=3&per-page=2`

```json
{
  "items": [
    {
      "id": 1,
      "label": "На Вінниччині ремонтують дороги з 10-річною гарантією",
      "url": "/news/10-years-warranty",
      "date": 1423414094,
      "previewImage": "**image.json**"
    },
    {
      "id": 2,
      "label": "Дешевше і швидше, ніж в ЄС",
      "url": "/news/cheap-and-fast",
      "date": 1423414394,
      "previewImage": "**image.json**"
    }
  ],
  "links": {
    "self": "/news?page=3",
    "next": "/news?page=4",
    "last": "/news?page=18",
    "prev": "/news?page=2",
    "first": "/news"
  },
  "meta": {
    "totalCount": 20,
    "pageCount": 18,
    "currentPage": 3,
    "perPage": 6
  }
}
```

**3.11.** Пример одной сущности

**Запрос:** `/news/cheap-and-fast`

```json
{
  "id": "ArticleItem",
  "meta": {
    "seo": {
      "title": "Page title",
      "description": "Page description",
      "og": {
        "title":  "OpenGraph Title",
        "description":  "OpenGraph Title",
        "image": "https://site.com/storage/og.png"
      },
      "breadcrumbs": "**breadcrumbs.json**",
      "robots": "index,follow",
      "microdata": "<script type='application/ld+json'>...</script>"
    },
    "locales": [
      {
        "label": "EN",
        "locale": "en",
        "default": false,
        "current": true,
        "url": "https://example.com/en/absolute/path"
      },
      {
        "label": "UA",
        "locale": "uk",
        "default": true,
        "current": false,
        "url": "https://example.com/absolute/path"
      }
    ],
    "pageOptions": {
      "template": "dark",
    }
  },
  "blocks": [
    {
      "id": "BlockArticleHeader",
      "level": 1,
      "attributes": {
        "title": "Awesome article",
        "description": "Some description"
      }
    },
    {
      "id": "BlockArticleTags",
      "level": 2,
      "attributes": {
        "title": "Popular topics",
        "items": [
          {"label": "Tag 1"},
          {"label": "Tag 2"},
          {"label": "Tag 3"}
        ]
      }
    },
    {
      "id": "BlockTextEditor",
      "level": 2,
      "attributes": {
        "content": "<p>...</p>"
      }
    },
    {
      "id": "BlockControls",
      "level": 2,
      "attributes": {
        "prev": {"label": "Previous", "url": "/uk/news/article-1"},
        "next": {"label": "Next", "url": "/uk/news/article-3"}
      }
    }
  ]
}
```



### 4. Элементы страниц

**4.1.** Под элементами страниц подразумываются небольшые функциональные компоненты, такие как кнопки, ссылки, картинки, видео.

**4.2.** Все внутренние ссылки на фронт **должны** быть **относительные** (если другое не предусмотренно задачей) и передаваться уже с языковым параметром (кроме языка по-умолчанию). Например: `"url": "/catalog/laptop"`.

**4.3.** Все изображения **должны** передавать объектом со следующей структурой:

```json
{
  "image": {
    "alt": "image alt",
    "title": "image title",
    "originalSrc": "/storage/image.png",
    "thumb": "/uploads/thumb/image-50.png",
		"default": {
      "540": "/uploads/thumb/image-540.png",
      "768": "/uploads/thumb/image-768.png",
      "1280": "/uploads/thumb/image-1280.png",
      "1920": "/uploads/thumb/image-1920.png",
    },
    "webp": {
      "540": "/uploads/thumb/image-540.webp",
      "768": "/uploads/thumb/image-768.webp",
      "1280": "/uploads/thumb/image-1280.webp",
      "1920": "/uploads/thumb/image-1920.webp",
    }
  }
}
```

Формирование уменьшенных копий изображения и его конвертация – **обязательны**.

**4.4.** При загрузке видео в админ панель, ограничиваем только на загрузку видео формата `.mp4`. После загрузки, в фоновом режиме, вырезаем 1й кадр видео (постер) и обрабатываем его аналогично другим изображениям. Само видео конвертируем в `.webm` формат и сохраняем на сервере. **Данный функционал должен быть опциональным, с возможностью его включения/выключения в зависимости от нагрузок на сайт и серверным мощностям.** Пример передачи видео на фронт:

```json
{
  "video": {
    "poster": "**image.json**",
    "src": {
      "mp4": "/uploads/video.mp4",
    	"webm": "/uploads/video.webm"
    }
  }
}
```

Если функционал автоматической конвертации и нарезки видео выключен – вместе с видео файлом всегдя рядом должна быть возможность загрузить постер.

**4.5.** Каждая кнопка или ссылка должна быть объектом с названием (`label`) и/или ссылкой (`url`):

```json
{
  "link": {
    "label": "Ссылка",
    "url": "/uk/news"
  },
  "button": {
    "label": "Кнопка"
  },
  "submitButton": {
    "label": "Подтвердить",
    "url": "/uk/form/submit"
  }
}
```



### 5. Формы

**5.1.** Все формы отправлять на сервер **только** POST-запросом, за исключением поиска и фильтрации/сортировки, там только GET с изменением url в браузере.

**5.2.** Все формы с фронтенда должны отправляться как объект `FormData`  ([FormData](https://developer.mozilla.org/ru/docs/Web/API/FormData)) с установленной кодировкой `multipart/form-data`. Так же в объекте могут формироваться массивы, которые необходимо отправить на сервер в виде массива. **Пример таких данных:**

```
question[263]: 825 
question[264][]: 830
question[264][]: 831
```

**5.3.** Поля для форм бекенд описывает на своей стороне, например:

```json
{
  "submitButton": {
    "label": "Sign up",
    "url": "/uk/user/sign-up"
  },
  "fields": [
    {
      "name": "email",
      "type": "text",
      "label": "E-mail",
      "required": true,
      "placeholder": "Ваш e-mail...",
      "hint": null
    },
    {
      "name": "password",
      "type": "password",
      "label": "Пароль",
      "required": true,
      "placeholder": null,
      "hint": "Мин. 6 символов"
    },
    {
      "name": "city",
      "type": "dropdown",
      "label": "Город",
      "required": false,
      "items": [
        {"id": 1, "label": "Киев"},
        {"id": 2, "label": "Одесса"}
      ]
    },
    {
      "name": "age",
      "type": "text",
      "label": "Ваш возраст",
      "required": false,
      "placeholder": null,
      "value": "18",
      "hint": null
    },
    {
      "name": "refferer",
      "type": "hidden",
      "required": true,
      "value": "about-page"
    }
  ]
}
```

`type` – тип поля для формы.  Принимаeт стандартные значения: `text / password / textarea / password / file / dropdown / hidden / color / time / date / datetime / checkbox /. checkboxlist / radio / radiolist `.

Типы полей, которые имеют какой-то перечень значений (например, выпадающий список), указываются в объекте под ключом `items`. Допускаются так же дополнительные роуты на АПИ для получения этих списков.

 Ключ `"value"` служит для задания дефолтных значений на форме.

**5.4.** Любая форма на сайте должна отдавать  или 200 код ответа при успешном сохранении (с текстами об успешной сохранении) или 422 код с перечнем ошибок валидации (`$model->getFirstErrors()`).

```json
//error
{
  "email": "E-mail is not valid",
  "password": "Password must consist of minimum 6 symbols"
}
```

```json
//success
{
  "label": "Success!",
  "content": "We will contact you soon."
}
```



### 6. Регистрация / авторизация

**6.1.** Если на проекте есть пользователи, ЛК и другая персонализация, для авторизации используем `Bearer` токены. Всегда формируем 2 токена: auth / refresh. Получение токена авторизации: `auth/login`. Response: 

```json
{
  "token": "xSFKnNzhd37hoHClCjXlMZxPHK4F3JPT...",
  "expiredAt": 1579885912
} 
```

Обновление токена должен отдавать асболютно аналогичный ответ.   



### 7. SEO

**7.1.** `robots.txt`  и `sitemap.xml` - всегда должны быть в проекте. robots - редактируемый из админки. Файлы должены отдаваться напрямую через nginx, минуя фронтенд приложение. Content-Type, соответствующий: `text/plain`, `application/xml`.

**7.2.** Структура хлебных крошек:

```json
{
  "breadcrumbs": [
    {"label": "Main", "url": "/uk/"},
    {"label": "About", "url": "/uk/about"},
    {"label": "Special Offers", "url": "/uk/about/special-offers"}
  ]
}
```
