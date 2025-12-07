import { clearConsole, clearWhenClick, log } from "../domConsole.js";

const dropzoneElem = document.getElementById("dropzone");

dropzoneElem.addEventListener("dragover", (ev) => {
  // dragoverを無効化しておかないと反応する。
  ev.preventDefault();
});
dropzoneElem.addEventListener("drop", async (ev) => {
  ev.preventDefault();
  clearConsole();

  // dataTransfer.filesよりもdataTransfer.itemsのほうがいいらしい
  const items = ev.dataTransfer.items;

  // 階層状で集める
  const collectedItems = [];
  for (const item of items) {
    // これでentryが取れる。
    const entry = item.webkitGetAsEntry();
    const collected = await collectEntries(entry);
    collectedItems.push(collected);
  }

  // 出力用に展開
  const flattenItems = flatten(collectedItems);
  for (const flattenItem of flattenItems) {
    // 深さの数だけスペースでインデント
    let text = `　`.repeat(flattenItem.level);

    // ファイル、ディレクトリのアイコンをつける
    if (flattenItem.isFile) {
      text += "📃";
    } else if (flattenItem.isDirectory) {
      text += "📁";
    }
    // 最後に名前を
    text += flattenItem.name;
    log(text);
  }
});

// -----------------------

/**
 * エントリーを再帰的に集める
 * @param {*} entry
 * @returns
 */
async function collectEntries(entry) {
  if (entry.isFile) {
    return {
      isFile: true,
      isDirectory: false,
      subItems: [],
      entry,
    };
  } else if (entry.isDirectory) {
    const directoryContentEntries = await extractDirectoryContent(entry);
    const subItems = [];
    for (const directoryContentEntry of directoryContentEntries) {
      const item = await collectEntries(directoryContentEntry);
      subItems.push(item);
    }

    return {
      isFile: false,
      isDirectory: true,
      subItems,
      entry,
    };
  } else {
    console.warn("not file or directory.", entry);
  }
}

async function extractDirectoryContent(directoryEntry) {
  const dirReader = directoryEntry.createReader();

  const allEntry = [];

  // readEntriesは100件ずつ返すので繰り返し呼び出す
  // generatorでもいいかも...
  while (true) {
    const entries = await readEntriesAsync(dirReader);
    if (entries.length === 0) {
      break;
    }
    allEntry.push(...entries);
  }
  return allEntry;
}

/**
 * readEntriesをasync/await で呼び出す
 *
 * @param {*} dirReader
 * @returns
 */
async function readEntriesAsync(dirReader) {
  return new Promise((resolve, reject) => {
    dirReader.readEntries(
      (entries) => {
        resolve(entries);
      },
      (e) => reject(e)
    );
  });
}

//---------------

const collator = new Intl.Collator("ja");
/**
 * 階層状のファイルの一覧を出力用に階層を取り除いて一次元配列に
 * @param {*} collectedItems
 * @param {*} level
 * @returns
 */
function flatten(collectedItems, level = 0) {
  const flattenItems = [];

  for (const collectedItem of collectedItems) {
    flattenItems.push({
      isFile: collectedItem.isFile,
      isDirectory: collectedItem.isDirectory,
      level,
      name: collectedItem.entry.name,
    });

    if (collectedItem.isFile) {
      //noop
    } else if (collectedItem.isDirectory) {
      // 見栄えよくするために,フォルダが前、ファイルが下になるようにソート
      const subItems = [...collectedItem.subItems];
      subItems.sort((a, b) => {
        if ((a.isFile && b.isFile) || (a.isDirectory && b.isDirectory)) {
          // 名前で比較するので何もしない
        } else {
          return a.isFile ? 1 : -1;
        }
        return collator.compare(a.name, b.name);
      });

      const flattenContent = flatten(subItems, level + 1);

      flattenItems.push(...flattenContent);
    }
  }

  return flattenItems;
}

export {};
