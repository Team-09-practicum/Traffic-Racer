### ручки для темы пользователя:

Base URL: `URL:SERVER_PORT/api/theme/`
    1. `POST` - сохраняет, а при наличии налии информации в БД - перезаписывает
        body:
        {
            `"userId"`: number,
            `"theme"`: string
        }
        Варинты тем сохранеы в enum `ThemeColor` по пути `server/models/Theme.ts`
        Response:   `status`: 200
                    `body`: "Ok"
    2. `GET` - загружает информацию о теме пользователя
        body: 
        {
            `"userId"`: number,
        }
         Response:   `status`: 200
                    `body`: {
                                `"id"`: number,
                                `"theme"`: string,
                                `"userId"`: number
                            }
