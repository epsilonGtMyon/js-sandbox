import * as pdfjsLib from "../pdfjs/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = "../pdfjs/build/pdf.worker.mjs";

// -------
const pdfContainerElem = document.getElementById("pdfContainer");

// PDF ファイルの読み込み
const url = "../compressed.tracemonkey-pldi-09.pdf";
const loadingTask = pdfjsLib.getDocument(url);
const pdfDocument = await loadingTask.promise;
console.log("pdf loaded", pdfDocument);

const pageCount = pdfDocument.numPages;

// 全ページ分のcanvasを作って一気に追加
for (let i = 1; i <= pageCount; i++) {
  const canvasElem = document.createElement("canvas");
  canvasElem.style.display = "block";
  pdfContainerElem.append(canvasElem);
  renderPage(canvasElem, pdfDocument, i);
}

async function renderPage(canvasElem, pdfDocument, pageNumber) {
  const context = canvasElem.getContext("2d");

  // PDF ページの読み込み
  const pdfPage = await pdfDocument.getPage(pageNumber);

  // レンダー
  const scale = 1;
  const viewport = pdfPage.getViewport({ scale: scale });
  canvasElem.height = viewport.height;
  canvasElem.width = viewport.width;

  // Render PDF page into canvas context
  var renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  const renderTask = pdfPage.render(renderContext);
  await renderTask.promise;
}
