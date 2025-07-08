# await-semaphore-sandbox
`await-semaphore` を試してみる  
長いこと更新されてないけど、ライブラリのコード自体少なくてシンプル

せっかくなんで `vite` で動かしてみる

## 準備

### インストール系
`vite` でプロジェクトを作る

```
npm create vite@latest await-semaphore-sandbox -- --template vanilla-ts

cd await-semaphore-sandbox
npm ci
```

`await-semaphore` を使う

```
npm install await-semaphore
```

`setImmediate` を使っているのでポリフィル入れる

```
npm install setimmediate
npm install --save @types/setimmediate
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


`vite` のディレクトリの構成とかもやってみたいけど 
今回は `await-semaphore` の検証をしたいので 別の機会に..
