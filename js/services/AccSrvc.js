(function() {
    'use strict';

    angular
        .module('app')
        .factory('AccSrvc', AccSrvc);

    AccSrvc.$inject = ['AjaxSrvc', 'CommSrvc','FieldSrvc','I18nSrvc','$uibModal','$rootScope','$compile','$timeout','appConst','EnumSrvc'];
    function AccSrvc(AjaxSrvc, CommSrvc, FieldSrvc,I18nSrvc,$uibModal,$rootScope,$compile,$timeout,appConst,EnumSrvc){

        return {
            //团队核算
            '团队核算编辑':group_accounting,
            '团队总览':group_overview,
            '删除团队核算':delete_group_accounting,
            '团队核算选择结算对象':choose_settle_obj,
            '可否录入团队核算':is_add_group_acc_ok,
            '添加团队核算明细':add_group_acc_detail,
            '录入团队核算明细':load_group_acc_detail,
            '查看团队核算明细':group_acc_detail_see,
            '删除团队核算明细':delete_group_acc_detail,
            '提交团队核算明细':submit_group_acc_detail,
        };

        function group_accounting(scope){
            scope.init = init;
            scope.calc_profit = calc_profit;
            function init(){
                calc_profit();
            }
            function calc_profit(){
                scope.num_of_people = scope.receivable = scope.received = scope.receive_diff = 0;
                angular.forEach(scope.data['团队收入'],function(item){
                    scope.receivable += + item.receivable_see;
                    scope.num_of_people += + item.num_of_people;
                    scope.received += +item.received_see;
                    scope.receive_diff += +item.receive_diff_see;
                });
                scope.payable = scope.paid = scope.pay_diff = 0;
                angular.forEach(scope.data['团队成本'],function(item){
                    scope.payable += +item.payable;
                    scope.paid += +item.paid;
                    scope.pay_diff += +item.pay_diff;
                });
                angular.forEach(['receivable','received','receive_diff','payable'
                                ,'paid','pay_diff'],function(item){
                    scope[item] = scope[item].toFixed(2);
                });
                scope.profit = (scope.receivable - scope.payable).toFixed(2);
                scope.profit_rate = (scope.profit/scope.payable).toFixed(2)*100+'%';
                var group_profix = {
                    'receivable':scope.receivable,
                    'payable':scope.payable,
                    'profit':scope.profit,
                    'profit_rate':scope.profit_rate,
                }
                scope.loadData('团队利润',[group_profix]);
            }
        }
        function group_overview(scope){
            scope.init = init;
            scope.calc_profit = calc_profit;
            function init(){
                calc_profit();
            }
            function calc_profit(){
                scope.num_of_people = scope.receivable = scope.received = scope.receive_diff = 0;
                angular.forEach(scope.data['团队收入'],function(item){
                    scope.receivable += + item.receivable_see;
                    scope.num_of_people += + item.num_of_people;
                    scope.received += +item.received_see;
                    scope.receive_diff += +item.receive_diff_see;
                });
                scope.payable = scope.paid = scope.pay_diff = 0;
                angular.forEach(scope.data['团队成本'],function(item){
                    scope.payable += +item.payable;
                    scope.paid += +item.paid;
                    scope.pay_diff += +item.pay_diff;
                });
                angular.forEach(['receivable','received','receive_diff','payable'
                                ,'paid','pay_diff'],function(item){
                    scope[item] = scope[item].toFixed(2);
                });
                scope.profit = (scope.receivable - scope.payable).toFixed(2);
                scope.profit_rate = (scope.profit/scope.payable).toFixed(2)*100+'%';
                var group_profix = {
                    'receivable':scope.receivable,
                    'payable':scope.payable,
                    'profit':scope.profit,
                    'profit_rate':scope.profit_rate,
                }
                scope.loadData('团队利润',[group_profix]);
            }
        }
        function delete_group_accounting(action,meta,cfg,store_id,data){
            $rootScope.cur_scope().delete_row(store_id,data);
            $rootScope.cur_scope().calc_profit();
        }
        function choose_settle_obj(scope){
            scope.data = {settle_obj_type:'Supplier'};

            scope.submit = function(){
                var data = scope.data;
                if(!(data.settle_obj_id > 0)){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }

                if(data.settle_obj_type == 'Supplier'){
                    scope.ref.pay_supplier_id = data.settle_obj_id;
                    scope.ref.pay_employee_id = 0;
                    scope.ref.pay_department_id = 0;
                }else if(data.settle_obj_type == 'Employee'){
                    scope.ref.pay_employee_id = data.settle_obj_id;
                    scope.ref.pay_supplier_id = 0;
                    scope.ref.pay_department_id = 0;
                }else{
                    scope.ref.pay_department_id = data.settle_obj_id;
                    scope.ref.pay_employee_id = 0;
                    scope.ref.pay_supplier_id = 0;
                }
                scope.ref.settle_obj = data.settle_obj;

                $rootScope.close_view();
            }
        }
        function is_add_group_acc_ok(data){
            if(!data.settle_obj){
                CommSrvc.error(I18nSrvc.get('SEL_SETTLE_OBJ'));
                return false;
            }
            return true;
        }
        function add_group_acc_detail(action,meta,cfg,store_id,data){          
            var settle_obj = $rootScope.cur_scope().ref.settle_obj;
            $rootScope.cur_scope().loadData(store_id,[{settle_obj:settle_obj}],'new');
        }
        function delete_group_acc_detail(action,meta,cfg,store_id,data){
            $rootScope.cur_scope().delete_row(store_id,data);
            $rootScope.cur_scope().calc_acc();
        }
        function load_group_acc_detail(scope){
            scope.init = function(){
                if(scope.ref['acc_item']){
                    if(scope.ref['acc_item']['团队核算明细']
                        &&!_.isEmpty(scope.ref['acc_item']['团队核算明细'])){
                        scope.loadData('团队核算明细',scope.ref['acc_item']['团队核算明细']);
                    }
                }
                scope.calc_acc();
            }
            scope.calc_acc = calc_acc;
            function calc_acc(){
                var data = scope.data;
                scope.amount =scope.local_currency_total =  0;
                _.each(data['团队核算明细'],function(item){
                    item.rate = EnumSrvc.CurrencyRate[item.currency_id];
                    if(item.num_of_people
                       &&item.unit_price
                       &&item.rate){
                        item.local_currency_total  = (item.num_of_people*item.unit_price).toFixed(2);
                        item.RMB_total = (item.num_of_people*item.unit_price*item.rate).toFixed(2);
                        scope.amount += +item.RMB_total;
                        scope.local_currency_total += +item.local_currency_total;
                    }else{
                        item.local_currency_total = 0;
                        item.RMB_total = 0;
                    }
                });
                scope.amount = scope.amount.toFixed(2);
                scope.local_currency_total = scope.local_currency_total.toFixed(2);
            }
        }
        function group_acc_detail_see(scope){
            scope.init = function(){
                if(scope.ref['acc_item']){
                    if(scope.ref['acc_item']['团队核算明细']
                        &&!_.isEmpty(scope.ref['acc_item']['团队核算明细'])){
                        scope.loadData('团队核算明细',scope.ref['acc_item']['团队核算明细']);
                    }
                }
                scope.calc_acc();
            }
            scope.calc_acc = calc_acc;
            function calc_acc(){
                var data = scope.data;
                scope.amount =scope.local_currency_total =  0;
                _.each(data['团队核算明细'],function(item){
                    item.rate = EnumSrvc.CurrencyRate[item.currency_id];
                    if(item.num_of_people
                       &&item.unit_price
                       &&item.rate){
                        item.local_currency_total  = (item.num_of_people*item.unit_price).toFixed(2);
                        item.RMB_total = (item.num_of_people*item.unit_price*item.rate).toFixed(2);
                        scope.amount += +item.RMB_total;
                        scope.local_currency_total += +item.local_currency_total;
                    }else{
                        item.local_currency_total = 0;
                        item.RMB_total = 0;
                    }
                });
                scope.amount = scope.amount.toFixed(2);
                scope.local_currency_total = scope.local_currency_total.toFixed(2);
            }
        }
        function submit_group_acc_detail(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var acc_item = {'团队核算明细':scope.data['团队核算明细']};
            scope.ref.acc_item = acc_item;
            scope.ref.payable = $rootScope.cur_scope().amount;
            scope.ref.paid = scope.ref.paid||0;
            scope.ref.pay_diff = scope.ref.payable - (scope.ref.paid||0);
            scope.ref.isEdit = true;
            $rootScope.pre_scope().calc_profit();
            $rootScope.close_view();
        }
    }
})();