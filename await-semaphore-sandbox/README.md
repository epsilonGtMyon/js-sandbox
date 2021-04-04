# await-semaphore-sandbox
`await-semaphore` を試してみる

せっかくなんで `vite` で動かしてみる

## 準備

### インストール系
`vite` でプロジェクトを作る

```
npm init @vitejs/app await-semaphore-sandbox --template vanilla

cd await-semaphore-sandbox
npm install
```

`await-semaphore` を使う

```
npm install await-semaphore
```

`setImmediate` を使っているのでポリフィル入れる

```
npm install setimmediate
```

### `vite.config.js` ファイルを作る

```js
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": {}
  },
  server: {
    open: true
  }
});
```

- `process` が無いといわれるので `define` で定義
- ブラウザを自動で開く設定

### `VSCode` の設定
せっかくなので `task.json` も作ってみる

ターミナル -> タスクの実行 -> タスクの構成 あたりから作れる

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "dev",
            "type": "npm",
            "script": "dev",
            "group": {
              "kind": "build",
              "isDefault": true
            }
        }
    ]
}
```

とりあえず こんな感じで
- `group.kind` を `build`
- `group.isDefault` を `true`

としておいたら `npm run dev` の代わりに `Ctrl` + `Shift` + `B` で起動できる  
(本当は`npm run build` を登録すべきなんだろうが 頻度がコッチのが多い)
