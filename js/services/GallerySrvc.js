(function() {
    'use strict';

    angular
        .module('app')
        .factory('GallerySrvc', GallerySrvc);

    GallerySrvc.$inject = ['$rootScope','CommSrvc','EnumSrvc','AjaxSrvc','appConst','I18nSrvc','FieldSrvc','$compile','$timeout'];
    function GallerySrvc($rootScope,CommSrvc,EnumSrvc,AjaxSrvc,appConst,I18nSrvc,FieldSrvc,$compile,$timeout){

        return {
            '新增图片':gallery_edit,
            '新增图片-同业':gallery_edit,
            '新增图片-编辑':gallery_add,
        };
        function gallery_edit(scope){
            scope.init = function () {
                var ct = $rootScope.stack_content[$rootScope.stack_content.length-1];
                $timeout(function() {
                    ct.find('div.panel-body').append($compile('<ng-include src="\'picture_edit.html\'"></ng-include>')(scope));
                });
                scope.data.picture_arr = [];
                for (var i = 0 ; i <= 3; i++) {
                    scope.data.picture_arr.push({});
                }
            };
            scope.picture_upload = function(index){
                var el = $("#comm_upload");
                el.unbind('change');
                el.bind('change',function(){
                    var data = new FormData();
                    data.append('file', el[0].files[0]);
                    el.val('');
                    AjaxSrvc.upload(data,'gallery').then(function(response){
                        CommSrvc.info(response.message);
                        var picture = scope.data.picture_arr[index];
                        picture.path = response.save_path;
                        picture.thumbnail = response.thumbnail;
                    });
                });
                el.click();
            }
            scope.action_map = {
                '提交':submit,
            }
            function submit(){
                var picture_arr = [];
                var miss_param = false;
                _.each(scope.data.picture_arr,function(item){
                    if((_.isEmpty(item.name))&&!_.isEmpty(item.thumbnail)){
                        miss_param = true;
                        return;
                    }
                });
                if(miss_param){
                    CommSrvc.error(I18nSrvc.get('MISS')+I18nSrvc.get('NAME'));
                    return;
                }
                _.each(scope.data.picture_arr,function(item){
                    if((!_.isEmpty(item.name))&&!_.isEmpty(item.thumbnail)){
                        picture_arr.push(item);
                    }
                });
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                var data = angular.copy(scope.data);
                data.picture_arr = picture_arr;
                AjaxSrvc.submit(scope.cfg.submit.url,data).then(function(response){
                    CommSrvc.info(response.message).result.then(function(){
                        $rootScope.pre_scope().load();
                        $rootScope.close_view();
                    });
                });
            }
            scope.picture_delete = function(index){
                if(index>=0){
                    scope.data.picture_arr.splice(index, 1);
                }else{
                    return false;
                }
            }
        }
        function gallery_add(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            if(!_.isUndefined(scope.data.picture_arr)){
                scope.data.picture_arr.push({});
            }
        }
    }
})();