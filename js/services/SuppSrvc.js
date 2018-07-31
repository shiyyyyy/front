(function() {
    'use strict';

    angular
        .module('app')
        .factory('SuppSrvc', SuppSrvc);

    SuppSrvc.$inject = ['$rootScope','CommSrvc','AjaxSrvc','EnumSrvc','appConst','I18nSrvc'];
    function SuppSrvc($rootScope,CommSrvc,AjaxSrvc,EnumSrvc,appConst,I18nSrvc){

        return {
            '签约供应商':supplier_sign,
            '维护供应商':supplier_maintain,
            '新增供应商联系人':contact_edit,
            '修改供应商联系人':contact_edit,
            '选择协议':select_dct_agreement_done,
            '供应商信息':supplier_info,
            '账号可选线路绑定':supplier_account_bind_pd_tag,
            '选定产品线路':select_product_line_done,
        };
        function supplier_info(action,meta,cfg,store_id,data){
            if(data.pd_src == appConst.PD_SRC_TY){
                $rootScope.trigger('供应商联系方式',meta,store_id,data);
            }else if(data.pd_src == appConst.PD_SRC_ZY){
                $rootScope.trigger('控团人联系方式',meta,store_id,data);
            }
        }
        function supplier_sign(scope){
            scope.action_map = {
                '提交':submit,
                '取消协议':cancel_dct_agreement,
            };
            scope.init = function(){
                var sign_record = scope.data['供应商历史签约'];
                angular.forEach(sign_record,function(item){
                    item.dct_see = [];
                    var dct_id = item.dct_id?angular.fromJson(item.dct_id):[];
                    dct_id = _.isArray(dct_id)?dct_id:[dct_id];
                    angular.forEach(dct_id,function(id){
                        item.dct_see.push(EnumSrvc['DctAgreement'][id]);
                    });
                    item.dct_see = item.dct_see.join(',');
                });
                $rootScope.pre_scope().loadData('供应商历史签约', selected, true);
            }
            function submit(){
                AjaxSrvc.submit(scope.cfg.submit.url,{'供应商本次签约':scope.data['供应商本次签约'],'id':scope.ref.id}).then(function(data){
                    CommSrvc.info(data.message).result.then(function(){
                        $rootScope.pre_scope().load();
                        $rootScope.close_view();
                    });
                });
            }
        }
        function cancel_dct_agreement(store_id,data,meta,action){
            data.dct_id = '';
            data.dct_see = '';
        }
        function contact_edit(scope){
            scope.init = function(){
                scope.data = scope.data||{};
                scope.data.supplier_id = $rootScope.pre_scope().ref.id;
            }
            scope.submit = function(){
                    AjaxSrvc.submit(scope.cfg.submit.url,scope.data).then(function(data){
                    CommSrvc.info(data.message).result.then(function(){
                        $rootScope.pre_scope().load();
                        $rootScope.close_view();
                    });
                });
            }
        }
        function select_dct_agreement_done(scope){
            var data = {
                type : 'DctAgreement',
            };
            scope.data = data;
            scope.submit = function(){
                var pre_data = scope.ref;
                pre_data.dct_see = [];
                angular.forEach(data.selected,function(id){
                        pre_data.dct_see.push(EnumSrvc[data.type][id]);
                });
                pre_data.dct_id = data.selected?angular.toJson(data.selected):'';
                pre_data.dct_see = pre_data.dct_see.join(',');
                $rootScope.close_view();
            };
        }
        function supplier_maintain(scope){
            scope.action_map = {
                '取消协议':cancel_dct_agreement,
            };
            scope.init = function(){
                var sign_record = scope.data['供应商本次签约'];
                angular.forEach(sign_record,function(item){
                    item.dct_see = [];
                    var dct_id = item.dct_id?angular.fromJson(item.dct_id):[];
                    dct_id = _.isArray(dct_id)?dct_id:[dct_id];
                    angular.forEach(dct_id,function(id){
                        item.dct_see.push(EnumSrvc['DctAgreement'][id]);
                    });
                    item.dct_see = item.dct_see.join(',');
                });
                $rootScope.pre_scope().loadData('供应商本次签约', selected, true);
            }
        }

        function supplier_account_bind_pd_tag(scope){
            scope.data.id = scope.ref.id;
        }
        function select_product_line_done(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            $rootScope.pre_scope().loadData($rootScope.cur_scope().assoc_store_id,selected,'new');
            $rootScope.close_view();
        }
    }
})();