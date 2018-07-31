(function() {
    'use strict';

    angular
        .module('app')
        .factory('EventOrderSrvc', EventOrderSrvc);

    EventOrderSrvc.$inject = ['AjaxSrvc', 'CommSrvc','FieldSrvc','I18nSrvc','$uibModal','$rootScope','$compile','$timeout','appConst','EnumSrvc'];
    function EventOrderSrvc(AjaxSrvc, CommSrvc, FieldSrvc,I18nSrvc,$uibModal,$rootScope,$compile,$timeout,appConst,EnumSrvc){

        return {
            '订单应付核算-活动':order_pay_acc_event,
            '录入订单应付明细-活动':add_order_payable,
            '查看订单应付明细-活动':order_payable_see,
            '选定团费类型-活动':selected_group_price_type_done,
            '选择团费类型-活动':select_group_price_type,
            '活动订单应付审批':order_approve,
        };
        function select_group_price_type(scope){
            var price_config = scope.pre_scope().price_config;
            scope.loadData('团队费用-活动订单',price_config);
        }

        function selected_group_price_type_done(){
            var scope = $rootScope.cur_scope();
            var ref = scope.ref;
            if(_.isEmpty(scope.gridSel['团队费用-活动订单'])){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var selected = scope.gridSel['团队费用-活动订单'][0];
            ref.price_type = selected.price_type;
            ref.unit_price = selected.settle_price;
            ref.price_type_comment  = selected.comment||'';
            $rootScope.close_view();
        }
        function order_pay_acc_event(scope){
            scope.init = function(){
                scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
                scope.cfg.btn_hide = scope.cfg.btn_hide || {};
                //
                var createAction = ['订单应付核算-活动'];
                if(createAction.indexOf(scope.action)!=-1){
                    angular.forEach(['查看订单应付明细-活动'],function(i){
                        scope.cfg.btn_hide[i] = 1;
                    });
                    if(_.isEmpty(scope.data['订单应付-活动'])){
                        var data = {};
                        if(scope.data['订单详情'][0].pd_department_id !=0){//社内部门团
                            //这笔核算的结算对象为接单人部门 因为核算的付款方式 为内转
                            data['settle_obj']= scope.data['订单详情'][0].assitant_department_name;
                            data['pay_department_id'] = scope.data['订单详情'][0].assitant_department_id;//scope.data['订单详情'][0].pd_provider_id;
                        }else{//供应商团
                            //这笔核算的结算对象为供应商 因为核算的付款方式 为支出
                            data['settle_obj'] = scope.data['订单详情'][0].pd_provider;
                            data['pay_supplier_id'] = scope.data['订单详情'][0].pd_provider_id;
                        }
                        scope.loadData('订单应付-活动',[data]);
                        scope.isCreate = true;
                        scope.data['订单应付-活动'][0].acc_item = {};
                    }
                }
                angular.forEach(['录入订单应收明细'],function(i){
                    scope.cfg.btn_hide[i] = 1;
                });
                //历史为空隐藏历史按钮
                angular.forEach(['订单应付历史-活动'],function(i){
                    if(_.isEmpty(scope.data[i])){
                        scope.cfg.btn_hide[i] = 1;
                    }else{
                        scope.cfg.btn_hide[i] = 0;
                    }
                });
            }
        }

        function add_order_payable(scope){
            scope.action_map = {
                '保存':submit,
                '删除参团费用':delete_group_price,
                '删除其他费用':delete_other_fee,
            };
            scope.init = function(){
                var data = angular.copy($rootScope.pre_scope().data[scope.assoc_store_id][0].acc_item)||{};
                var order = $rootScope.pre_scope().data['订单详情'][0];
                scope.block_hide = scope.block_hide||{};
                scope.loadData('参团费用-活动',data['参团费用']);
                scope.loadData('其他费用',data['其他费用']);

                calc_acc();
                var price_type = _.indexBy($rootScope.pre_scope().price_config,'price_type');
                scope.data['团费类型选项'] = {};
                for (var i in price_type) {
                    scope.data['团费类型选项'][i] = EnumSrvc['PriceType'][i];
                }
            }
            scope.price_type_change = price_type_change;
            scope.calc_acc = calc_acc;
            function submit(){
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                calc_acc();
                var acc_item = {'参团费用':scope.data['参团费用-活动']
                                ,'其他费用':scope.data['其他费用']};
                var pre_scope = $rootScope.pre_scope();
                pre_scope.data[scope.assoc_store_id][0].acc_item = acc_item;

                pre_scope.data[scope.assoc_store_id][0].payable = $rootScope.cur_scope().group_price + $rootScope.cur_scope().other_fee ;
                pre_scope.data[scope.assoc_store_id][0].paid = pre_scope.data[scope.assoc_store_id][0].paid||0;
                pre_scope.data[scope.assoc_store_id][0].pay_diff = pre_scope.data[scope.assoc_store_id][0].payable - pre_scope.data[scope.assoc_store_id][0].paid;
                $rootScope.close_view(); 
            }
            function price_type_change(row){
                var price_type = _.indexBy($rootScope.pre_scope().price_config,'price_type');
                row.unit_price = price_type[row.price_type].peer_price;
            }
            function calc_acc(){
                var scope = $rootScope.cur_scope();
                scope.amount =0;
                scope.group_price_people = 0;
                scope.group_price = 0;

                scope.other_fee_people = 0;
                scope.other_fee = 0;


                _.each(['参团费用-活动','其他费用'],function(i){
                    _.each(scope.data[i],function(item){
                        if(item.num_of_people
                           &&item.unit_price
                           ){
                            item.total  = (item.num_of_people*item.unit_price).toFixed(2);
                            scope.amount +=+ item.total;
                            if(i=='参团费用-活动'){
                                scope.group_price_people +=+ item.num_of_people;
                                scope.group_price +=+ item.total;
                            }
                            if(i=='其他费用'){
                                scope.other_fee_people +=+ item.num_of_people;
                                scope.other_fee +=+ item.total;
                            }
                        }else{
                            item.total = 0;
                        }
                    });
                });
            }
            function delete_group_price(store_id,data){
                scope.delete_row(store_id,data);
                calc_acc();
            }
            function delete_other_fee(store_id,data){
                scope.delete_row(store_id,data);
                calc_acc();
            }
        }
        function order_payable_see(scope){
             scope.init = function(){
                var store_id = scope.assoc_store_id;
                var data = angular.copy($rootScope.pre_scope().data[store_id][0].acc_item)||{};
                scope.block_hide = scope.block_hide||{};
                scope.loadData('参团费用-活动',data['参团费用']);
                scope.loadData('其他费用',data['其他费用']);
                calc_acc();
                var price_type = _.indexBy($rootScope.pre_scope().price_config,'price_type');
                scope.data['团费类型选项'] = {};
                for (var i in price_type) {
                    scope.data['团费类型选项'][i] = EnumSrvc['PriceType'][i];
                }
            }
            function calc_acc(){
                var scope = $rootScope.cur_scope();
                scope.amount =0;
                scope.group_price_people = 0;
                scope.group_price = 0;

                scope.other_fee_people = 0;
                scope.other_fee = 0;


                _.each(['参团费用-活动','其他费用'],function(i){
                    _.each(scope.data[i],function(item){
                        if(item.num_of_people
                           &&item.unit_price
                           ){
                            item.total  = (item.num_of_people*item.unit_price).toFixed(2);
                            scope.amount +=+ item.total;
                            if(i=='参团费用-活动'){
                                scope.group_price_people +=+ item.num_of_people;
                                scope.group_price +=+ item.total;
                            }
                            if(i=='其他费用'){
                                scope.other_fee_people +=+ item.num_of_people;
                                scope.other_fee +=+ item.total;
                            }
                        }else{
                            item.total = 0;
                        }
                    });
                });
            }
        }
        function order_approve(scope){
            scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
            scope.cfg.btn_hide = scope.cfg.btn_hide||{};
            angular.forEach(['录入订单应付明细-活动'],function(i){
                scope.cfg.btn_hide[i] = 1;
            });
            angular.forEach(['订单应付历史-活动'],function(i){
                if(scope.data[i]&&!_.isEmpty(scope.data[i])){
                    scope.cfg.btn_hide[i] = 0;
                }else{
                    scope.cfg.btn_hide[i] = 1;
                }
            });
        }
    }
})();