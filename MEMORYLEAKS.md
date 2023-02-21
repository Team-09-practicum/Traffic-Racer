# Утечки памяти

По графику `JS Heap` может показаться, что утечек нет.
Однако наше внимание привлек график `Nodes`, на котором виден непрерывный рост количества узлов.

[//]: # (memoryleak-1.png)
<img alt="memoryleak-1" src="https://user-images.githubusercontent.com/15361093/219477754-4d4d9317-d6bc-4bf4-8619-da5a2a0e7e7f.png">

С помощью [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) удалось локализовать проблему.

Скриншот ниже показывает, что происходит непрерывный перерендер счёта, а также кнопок управления звуком и полноэкранным режимом.

[//]: # (memoryleak-2.gif)
![memoryleak-2](https://user-images.githubusercontent.com/15361093/219477804-bb612484-3ae4-4ab1-8e20-b380277f4eea.gif)

У каждой из кнопок есть `EventListener`, а значит происходит утечка памяти.

Требуется рефакторинг компонента страницы игры, декомпозиция элементов и их мемоизация.
Данная проблема в дальнейшем будет исправлена.
