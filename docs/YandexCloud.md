## Способ поиска ошибок на Yandex Cloud:

1. Зайти на Виртуальную машину через терминал по команде 
```shell
`ssh {userlogin}@158.160.6.29` 
```

2. Проверить загруженные контейнеры 
```shell    
`sudo docker ps -a`
```

3. Проверить логи по выбранному контейнеру 
```shell
`sudo docker logs {conteinerID}`
```

4. Если контейнеров нет, или они не запущены проверить логи запуска контейнеров
```shell
 `sudo journalctl -u yc-container-daemon`
```

Документация по Yandex Container Solution:

https://cloud.yandex.ru/docs/cos/
