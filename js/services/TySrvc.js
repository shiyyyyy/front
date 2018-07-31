(function() {
    'use strict';

    angular
        .module('app')
        .factory('TySrvc', TySrvc);

    TySrvc.$inject = ['$rootScope','CommSrvc','EnumSrvc','AjaxSrvc','appConst'];
    function TySrvc($rootScope,CommSrvc,EnumSrvc,AjaxSrvc,appConst){

        return {
            '订单确认':order_confirm,
            '查看订单-同业-非活动':order_see,
            '查看订单-同业-对账确认-非活动':order_see,
            '查看订单-同业-活动':order_see,
            '查看订单-同业':ty_see_order,
            '查看订单-同业-对账确认':ty_see_order_check,
            '订单应付审批':order_payable_approve,
            '非活动订单应付审批':order_approve,
            '同业订单对账导出':export_ty_order,
            '同业对账导出预览':export_ty_order_view,
        };
        function export_ty_order(scope){
            var mod_cfg = $rootScope.mods['对账确认-同业']||{};
            var s_regular = angular.copy(mod_cfg.s_regular);
            var s_text = angular.copy(mod_cfg.s_text);

            var required_filter = {};
            var optional_filter = {};

            angular.forEach(['dep_date_from','dep_date_to'],function(field){
                required_filter[field] = s_regular[field]||{};
            });

            angular.forEach(['group_employee_id','assitant_id','pay_flow'],function(field){
                optional_filter[field] = s_regular[field]||{};
                optional_filter[field]['mod'] = '对账确认-同业';
            });

            var search = {};

            scope.required_filter = required_filter;
            scope.optional_filter = optional_filter;
            scope.search = search;
            scope.preview = function(){
                if(_.isEmpty(search.dep_date_from) || _.isEmpty(search.dep_date_to)){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
                    return ;
                }
                search['limit'] = 999;
                $rootScope.close_view();
                $rootScope.trigger('同业对账导出预览',{},null,{search:search});
            }
        }
        
        function export_ty_order_view(scope){
            scope.action_map ={
                '同业对账导出选择':select_export_ty_order,
                '同业对帐导出全部':all_export_ty_order,
            }
            
            function select_export_ty_order(store_id,data,meta,action){
                var selected = $rootScope.cur_scope().selected;
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                window.open(appConst.HOST + '/ty/Order/export_ty_order?action=' + action +'&ids=' + _.pluck(selected,'id'));
            }
            function all_export_ty_order(store_id,data,meta,action){
                var parmas = {} ;
                for(var key in scope.search){
                    if(_.isString(scope.search[key])){
                        parmas[key] = scope.search[key];
                    }
                }
                parmas['mod'] = scope.search['mod'];
                window.open(appConst.HOST + '/ty/Order/export_ty_order?action=' + action+'&' + $rootScope.toQueryString(parmas));
            }
        }


        function order_confirm(scope){
            scope.action_map = {
                '提交':confirm
            }
            function confirm(){
                AjaxSrvc.submit(scope.cfg.submit.url,{id:scope.data['订单详情'][0].id,pass:true}).then(function(data){
                    CommSrvc.info(data.message);
                    $rootScope.close_view();
                    $rootScope.cur_scope().load();
                });
            }
        }
        function order_payable_approve(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('活动订单应付审批',meta,store_id,data);
            }else{
                $rootScope.trigger('非活动订单应付审批',meta,store_id,data);
            }
        }
        function order_approve(scope){
            scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
            scope.cfg.btn_hide = scope.cfg.btn_hide||{};
            angular.forEach(['录入订单应付明细'],function(i){
                scope.cfg.btn_hide[i] = 1;
            });
            angular.forEach(['订单应付历史'],function(i){
                if(scope.data[i]&&!_.isEmpty(scope.data[i])){
                    scope.cfg.btn_hide[i] = 0;
                }else{
                    scope.cfg.btn_hide[i] = 1;
                }
            });
        }
        function order_see(scope){
            if (!scope.data['应转变更审批日志'][0]) {
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['应转变更审批日志'],function(i){
                    scope.block_hide[i] = 1;
                });
            }

            if (!scope.data['合同详情']||_.isEmpty(scope.data['合同详情'])) {
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['合同详情'],function(i){
                    scope.block_hide[i] = 1;
                });
            }
            
            scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
            scope.cfg.btn_hide = scope.cfg.btn_hide||{};
            angular.forEach(['录入订单应付明细','录入订单手动优惠','录入订单应转明细','选择团队-订单变更'],function(i){
                scope.cfg.btn_hide[i] = 1;
            });
            angular.forEach(['订单应付历史','订单应转历史'],function(i){
                if(scope.data[i]){
                    scope.cfg.btn_hide[i] = 0;
                }else{
                    scope.cfg.btn_hide[i] = 1;
                }
            });
            angular.forEach(['订单参团历史','订单应转历史','订单应付历史','订单应收历史'],function(i){
                if(scope.data[i]&&!_.isEmpty(scope.data[i])){
                    scope.cfg.btn_hide[i] = 0;
                }else{
                    scope.cfg.btn_hide[i] = 1;
                }
            });
        }
        function ty_see_order(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('查看订单-同业-活动',meta,store_id,data);
            }else{
                $rootScope.trigger('查看订单-同业-非活动',meta,store_id,data);
            }
        }
        function ty_see_order_check(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('查看订单-同业-活动',meta,store_id,data);
            }else{
                $rootScope.trigger('查看订单-同业-非活动',meta,store_id,data);
            }
        }
    }
})();