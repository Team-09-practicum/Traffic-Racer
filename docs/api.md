## Как подключать "ручки"

1. Добавляем path ручки в `src/utils/constants/api` в `apiPaths`
2. Создаем api definition в `src/utils/api/defs`, в начале имени указываем метод запроса (например, `postSignUp.ts`), не забываем реэкспортить из `index.ts`

```ts
// post-sign-up.ts
export const postSignUp = createApiDef<string>({
  // можно сразу обозначить ожидаемый в ответе тип
  url: apiPaths.postSignUp,
  type: 'post',
  // принимаемые параметры можно посмотреть в src/utils/api/typings.ts, тип ApiDefParams
});
```

3. Готово, теперь можно использовать ручку в компонентах, например:

```tsx
// ...
import { api } from '@/utils/api';

export const Component = () => {
  const handleClick = async () => {
    // ...

    await api.postSignUp<'success'>({   // тут тоже можно передать тип ответа, он расширяет тип, переданный в definition (если он был)
                                        // в данном случае тип 'success' (допустим, если все ок, сервер возвращает эту строку) расширяет тип string,
                                        // объявленный в definition
      data: {   // тело запроса. Для get-запроса можно передать urlParams
        login: 'login',
      },
      onSuccess: (res) => {         // Коллбэк, вызываемый в случае удачного запроса. res будет переданного нами типа
        console.log(res.length);    // получим 7 (7 букв в 'success')
      },
      
      onError: (err) => {
        console.error('Ошибка во время выполнения запроса', err);    // Коллбэк, вызываемый если запрос не удался. На входе - ошибка, пойманная функцией 'catch'. (Возможные действия: вывести уведомление, дополнительно обработать и т.д.)
        // !!! Стандартные ответы с ошибками от сервера обрабатываются автоматически в компоненте makeRequest.ts с выводом информации пользователю !!!
        
      }
    });
  };

  // ...

  return <button onClick={handleClick}>Click to send request</button>;
};
```
