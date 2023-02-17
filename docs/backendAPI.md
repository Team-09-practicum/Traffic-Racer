## Описание ручек API

### Ручки для работы с форумом:

#### Base URL: `URL:SERVER_PORT/api/forum/`

1. `GET /` - получает список топиков и их данные

    Response: `ITopic[]`
    ```ts
    [
      {
        id: number,
        name: string,
        commentsCount: number,
        lastCommentDate: string,
      }
    ]
    ```

2. `GET /topic` - получает данные топика, включая его комментарии (рекурсивно)

    Response: `ITopicDTO`
    ```ts
    {
      id: number;
      name: string;
      body: string;
      userId: number;
      userName: string;
      createdAt: string;
      comments: Array<ICommentDTO>;
    }
    ```

3. `POST /topic` - сохраняет новый топик в БД

    body: `ICreateTopicData`
    ```javascript
    {
      name: string;
      body: string;
      userId: number;
      userName: string;
    }
    ```

4. `POST /topic/comment` - сохраняет новый комментарий в БД

    body: `ICreateForumComment`
    ```javascript
    {
      topicId: number;
      parentId: number | null;
      body: string;
      userId: number;
      userName: string;
    }
    ```

### Ручки для темы пользователя:

#### Base URL: `URL:SERVER_PORT/api/theme/`

1. `POST /` - сохраняет, а при наличии информации в БД - перезаписывает тему

    body: `ThemeAttributes`
    ```typescript
    {
      userId: number;
      theme: string;
    }
    ```
    Варианты тем сохранеы в enum `ThemeColor` по пути `server/models/Theme.ts`.

    Response:
    ```javascript
    {
      status: "Ok";
    }
    ```

2. `GET /?userId={id}` - загружает информацию о теме пользователя, где {id} - ID пользователя

    Response: `Theme`
    ```typescript
    {
      id: number;
      theme: string;
      userId: number;
    }
    ```
