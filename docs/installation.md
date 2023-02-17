## Установка и запуск проекта

Для запуска клонируйте репозиторий и выполните следующие действия:

- Убедитесь что у вас установлен `node` и `docker`
- `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
- `yarn build` - для корректной работы SSR
- Для запуска в `dev` режиме выполните в разных консолях последовательно команды:
  - `yarn dev:sql` - запуск контейнера с PostgresSQL и PGAdmin
  - `yarn dev` - запуск SSR-сборки в режиме HMR
- Для запуска в `production` режиме выполнить команду `yarn prod`

### Пакеты включённые в проект

Проект представляет из себя `монорепозиторий` на основе [`lerna`](https://github.com/lerna/lerna) и состоит из следующих пакетов:

- **[@Traffic-Race/client](./packages/client)**
    - [React](https://github.com/facebook/react) приложение.


- **[@Traffic-Race/server](./packages/server)**
    - [Express](https://github.com/expressjs/express) приложение.
    - Использует в качестве зависимости пакет `@Traffic-Race/client` package.

### Как правильно писать коммиты?

Можно почитать в соответствующей разделе [документации](docs/README.md)

### Управление зависимостями

Чтобы добавить зависимость для клиента:
```shell
yarn lerna add {your_dep} --scope client
```

Для сервера:
```shell
yarn lerna add {your_dep} --scope server
```

И для клиента и для сервер:
```shell
yarn lerna add {your_dep}
```

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`:
```shell
yarn lerna add {your_dep} --dev --scope server
```

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)
