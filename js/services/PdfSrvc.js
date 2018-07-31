(function() {
    'use strict';

    angular
    .module('app')
    .factory('PdfSrvc', PdfSrvc);

    PdfSrvc.$inject = ['$rootScope','appConst'];
    function PdfSrvc($rootScope,appConst) {

        var pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'lib/pdf/pdf.worker.js';
        var pdfLoadingTask;
        var pdfDoc;
        var pdfCanvas;
        var pdfCtWidth;
        var pdfCanvasCxt;
        var pdfRendering;
        var scaleMin;
        var scaleMax=4;
        var pdfScale;
        var pageNum=1;

        function renderInit(cb) {
            pdfDoc.getPage(pageNum).then(
                page=>{

                    pdfRendering = true;
                    scaleMin = 1;
                    var viewport = page.getViewport(1);

                    if(pdfCtWidth<viewport.width){
                        scaleMin = pdfCtWidth / viewport.width;
                        viewport = page.getViewport(scaleMin);
                    }  

                    pdfScale = scaleMin;
                    pdfCanvas.height = viewport.height;
                    pdfCanvas.width = viewport.width;

                    var renderContext = {
                      canvasContext: pdfCanvasCxt,
                      viewport: viewport
                    };
                    page.render(renderContext).then(
                        r=>{
                            pdfRendering=false;
                            cb && cb(pdfDoc.numPages);
                        }
                    );
                }
            );

        }

        function _loadPdf(url,canvas,width,cb) {

            pdfLoadingTask = pdfjsLib.getDocument(url);
            pdfLoadingTask.promise.then(
                r=>{
                    pdfDoc=r;
                    pdfCanvas=canvas;
                    pdfCanvasCxt=canvas.getContext('2d');
                    pdfCtWidth=width;
                    renderInit();
                },
                e=>{
                    log(e);
                    error('文档加载失败');
                }
            );
        }
        function loadPdf(url,canvas,width,cb) {
            if (pdfLoadingTask) {
                pdfLoadingTask.destroy().then(_=>{
                    pdfLoadingTask = null;
                    pdfDoc = null;
                    pageNum = 1;
                    pdfRendering = false;
                    _loadPdf(url,canvas,width);
                });
            }else{
                _loadPdf(url,canvas,width);
            }
        }
        function renderPage() {
            if(pdfRendering){
                return;
            }

            pdfDoc.getPage(pageNum).then(
                page=>{
                    pdfRendering = true;
                    var viewport = page.getViewport(pdfScale);
                    pdfCanvas.height = viewport.height;
                    pdfCanvas.width = viewport.width;

                    var renderContext = {
                      canvasContext: pdfCanvasCxt,
                      viewport: viewport
                    };
                    page.render(renderContext).then(r=>pdfRendering=false);
                }
            );
        }
        function zoomIn() {
            if(pdfScale > scaleMax){
                return 'stop';
            }
            pdfScale += 0.5;
            renderPage();
        }
        function zoomOut() {
            if(pdfScale < scaleMin+0.1){
                return 'stop';
            }
            pdfScale -= 0.5;
            renderPage();
        }
        function prePage() {
            if(pageNum <= 1){
                return 'stop';
            }
            pageNum--;
            renderPage();
            return pageNum;
        }
        function nextPage() {
            if(pageNum >= pdfDoc.numPages){
                return 'stop';
            }
            pageNum++;
            renderPage();
            return pageNum;
        }

        return {
            loadPdf:loadPdf,
            zoomIn:zoomIn,
            zoomOut:zoomOut,
            prePage:prePage,
            nextPage:nextPage
        };


    }
})();