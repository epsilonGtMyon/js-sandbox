import * as pdfjsLib from "../pdfjs/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = "../pdfjs/build/pdf.worker.mjs";

// -------
const previousPageButtonElem = document.getElementById("previousPageButton");
const nextPageButtonElem = document.getElementById("nextPageButton");
const currentPageNumberElem = document.getElementById("currentPageNumber");
const pageCountNumberElem = document.getElementById("pageCountNumber");

const pdfCanvasElem = document.getElementById("pdf-canvas");
const context = pdfCanvasElem.getContext("2d");

let currentPageNumber = 1;

// PDF ファイルの読み込み
const url = "../compressed.tracemonkey-pldi-09.pdf";
const loadingTask = pdfjsLib.getDocument(url);
const pdf = await loadingTask.promise;
console.log("pdf loaded", pdf);
await renderPage(1);

const pageCount = pdf.numPages;
pageCountNumberElem.textContent = pageCount;

async function renderPage(pageNumber) {
  // PDF ページの読み込み
  const pdfPage = await pdf.getPage(pageNumber);

  // レンダー
  const scale = 1;
  const viewport = pdfPage.getViewport({ scale: scale });
  pdfCanvasElem.height = viewport.height;
  pdfCanvasElem.width = viewport.width;
  //横幅調整
  //pdfCanvasElem.parentElement.style.width = `${pdfCanvasElem.width + 20}px`

  // Render PDF page into canvas context
  var renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  const renderTask = pdfPage.render(renderContext);
  await renderTask.promise;

  // ページ番号の設定
  currentPageNumber = pageNumber
  currentPageNumberElem.textContent = currentPageNumber;
}

previousPageButtonElem.addEventListener("click", async () => {
  if (currentPageNumber <= 1) {
    return;
  }
  await renderPage(currentPageNumber - 1);
});

nextPageButtonElem.addEventListener("click", async () => {
  if (currentPageNumber >= pageCount) {
    return;
  }
  await renderPage(currentPageNumber + 1);
});
