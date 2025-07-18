import streamsaver from "https://cdn.jsdelivr.net/npm/streamsaver@2.0.6/+esm";
import { clearConsole, clearWhenClick, log } from "../domConsole.js";

const simpleButtonElem = document.getElementById("simpleButton");
const fetchStreamButtonElem = document.getElementById("fetchStreamButton");
const clearButtonElem = document.getElementById("clearButton");

const url = location.pathname.replaceAll(
  "/sandbox01/index.html",
  "/2MBファイル.dat"
);

clearWhenClick(clearButtonElem)

function resolveFileName(headers) {
  const disposition = headers.get("Content-Disposition");
  let filename = undefined;

  if (disposition) {
    // filename* を優先して取得
    const matchFilenameStar = disposition.match(/filename\*=([^;]+)/i);
    if (matchFilenameStar) {
      // 例: filename*=UTF-8''%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB.txt
      const value = matchFilenameStar[1].trim();
      // エンコーディング指定を省いてデコード
      const filenameEncoded = value.replace(/^UTF-8''/i, "");
      filename = decodeURIComponent(filenameEncoded);
    } else {
      // フォールバック: 通常のfilename
      const matchFilename = disposition.match(/filename="?(.*?)"?($|;)/i);
      if (matchFilename) {
        filename = matchFilename[1];
      }
    }
  }
  return filename;
}

async function fetchFile() {
  log("[request]:begin");
  const resp = await fetch(url);
  console.log(resp)
  log("[request]:end");

  const fileSize = Number(resp.headers.get("content-length"));
  const fileName = resolveFileName(resp.headers);

  return {
    rawResponse: resp,
    fileSize,
    fileName,
  };
}

simpleButtonElem.addEventListener("click", async () => {
  clearConsole()
  let { rawResponse, fileName } = await fetchFile();
  fileName ||= decodeURIComponent(rawResponse.url.split("/").pop());

  log("[blob]:begin");
  const blob = await rawResponse.blob();
  log("[blob]:end");

  try {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = "_blank";
    a.download = fileName;
    a.click();
  } finally {
    URL.revokeObjectURL(blob);
  }
});

fetchStreamButtonElem.addEventListener("click", async () => {
  clearConsole()
  let { rawResponse, fileSize, fileName } = await fetchFile();
  fileName ||= decodeURIComponent(rawResponse.url.split("/").pop());

  const fileStream = streamsaver.createWriteStream(fileName, {
    size: fileSize,
  });

  log("[pipeTo]:begin");
  await rawResponse.body.pipeTo(fileStream);
  log("[pipeTo]:end");
});

export {};
