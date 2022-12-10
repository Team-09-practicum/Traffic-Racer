### Как использовать Redux

Добавление данных:

1. Создаем `actions` и `reducers` через `slice` в `@/utils/store/reducers`
2. Тип новых данных добавляем интерфейсом в IStateScheme `@/typings/IStateScha.ts`
3. Добавляем редюсер в `rootReducer` в `@/utils/store/store.ts`
4. Описываем данные, которые будем доставать из `state` в `@/utils/store/selectors`

Использование в компанентах:

1. `import { useDispatch, useSelector } from 'react-redux'`
2. Получить данные `const value = useSelector(getUserFull)`
3. Сохранить данные:
   `const dispatch = useDispatch();`
   `dispatch(userActions.changeUserFullInfo(data))`
