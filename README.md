# fast-viewerjs

```shell
npm install fast-viewerjs
```

```js
import fastViewer from 'fast-viewerjs'
import 'fast-viewerjs/dist/fast-viewerjs.css'

const viewer = fastViewer([{
    src: 'https://i.loli.net/2021/01/17/6xTYERKO3ubfJXi.jpg'
}], {
    hide: () => {
        viewer.destroy();
    },
    errImg: 'https://i.loli.net/2021/01/17/bOHRKZ5lJWfd8i2.jpg'
});
viewer.show();
```
