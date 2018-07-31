(function() {
    'use strict';
    angular
    .module('app', [
        'ngSanitize',
        'ngCookies',
        'ui.select',
        'ui.grid',
        'ui.grid.edit', 
        'ui.grid.selection',
        'ui.grid.resizeColumns', 
        'ui.grid.moveColumns', 
        'ui.grid.pagination',
        'ui.grid.autoResize',
        'ui.grid.grouping',
        'ui.grid.pinning',
        'ui.grid.saveState',
        'ui.bootstrap',
        'ui.mask',
        // 'ui.sortable'
        'textAngular',
        'ui.bootstrap.contextMenu',
        'ui.calendar',
        'ngImgCrop',
    ]);

    angular.module('app')
    .config(config)
    .run(run);

    config.$inject = ['$provide','$qProvider','$compileProvider'];
    function config($provide,$qProvider,$compileProvider) {
        $qProvider.errorOnUnhandledRejections && $qProvider.errorOnUnhandledRejections(false);
        //$compileProvider.debugInfoEnabled(false);
        $provide.decorator('taOptions', 
            ['taRegisterTool', '$delegate', 'appConst', 'AjaxSrvc', 
            function(taRegisterTool, taOptions, appConst, AjaxSrvc){
                // $delegate is the taOptions we are decorating
                // register the tool with textAngular
                taRegisterTool('upload', {
                    iconclass: "fa fa-cloud-upload",
                    action: function(){
                        var me = this;
                        var el = $("#comm_upload");
                        el.unbind('change');
                        el.bind('change',function(){
                            var data = new FormData();
                            data.append('file', el[0].files[0]);
                            el.val('');
                            AjaxSrvc.upload(data,'editor').then(function(response){
                                me.$editor().wrapSelection('insertImage', appConst.HOST+'/'+response.save_path);
                            });
                        });
                        el.click();
                    }
                });
                // add the button to the default toolbar definition
                taOptions.toolbar[3].unshift('upload');
                return taOptions;
            }]
        );
    }

    run.$inject = ['InitSrvc','ActionSrvc'];
    function run(InitSrvc,ActionSrvc){

        Pace.options.ajax.trackMethods.push('POST');
        Pace.options.document = false;
        Pace.options.elements = false;
        Pace.options.eventLag = false;
        Pace.options.restartOnRequestAfter = 0;
        
        Pace.on("start", function(){
            $(".mask").show();
        });
        Pace.on("done", function(){
            $(".mask").hide();
        });
        InitSrvc.get_init();
    }
})();
