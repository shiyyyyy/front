(function() {
    'use strict';

    angular
    .module('app')
    .factory('RetailSrvc', RetailSrvc);

    RetailSrvc.$inject = ['AjaxSrvc', 'CommSrvc', 'I18nSrvc', 'FieldSrvc','$uibModal','$rootScope','appConst','EnumSrvc'];
    function RetailSrvc(AjaxSrvc, CommSrvc, I18nSrvc, FieldSrvc,$uibModal,$rootScope,appConst,EnumSrvc){

        return {
            '管理总社': zs_manage,

            '门市账期': set_pay_period,
            '电商账期': set_pay_period,
            '查看客户': reta_see,
            '批量设置门市账期':set_pay_period_batch,
            '批量设置电商账期':set_pay_period_batch,
            '批量设置门市协议':set_dct_agreement_batch,
            '批量设置电商协议':set_dct_agreement_batch,

            '设置门市账号':edit_reta_account,
            '新增联系人':edit_reta_contact,
            // '修改联系人':edit_reta_contact,
            '选择账期':seltet_pay_period,
            '选择协议':select_dct_agreement_done,
        };


        function zs_manage(scope){
            scope.action_map = {
                '提交':submit,
            };
            function submit(){
                if(_.isEmpty(scope.data['总社下级机构'])){
                    CommSrvc.confirm(I18nSrvc.get('EMPTY_AFF_CONFIRM')).result.then(function(){
                        var cfg = scope.cfg.submit;
                        var data = $rootScope.get_req_data(cfg.data, scope.data);
                        AjaxSrvc.submit(cfg.url,data).then(function(data){
                            CommSrvc.info(data.message).result.then(function(){
                                $rootScope.pre_scope().load();
                                $rootScope.close_view();
                            });
                        });
                    });
                }else{
                    var cfg = scope.cfg.submit;
                    var data = $rootScope.get_req_data(cfg.data, scope.data);
                    AjaxSrvc.submit(cfg.url,data).then(function(data){
                        CommSrvc.info(data.message).result.then(function(){
                            $rootScope.pre_scope().load();
                            $rootScope.close_view();
                        });
                    });
                }
            }
        }

        function edit_reta_account(scope){
            if(!scope.data.name){
                scope.data.name = scope.data.contact_name;
            }
            scope.data.password = '';
        }

        function edit_reta_contact(scope) {
            scope.data.assoc_id = $rootScope.cur_scope().ref.id;
        }


        function set_pay_period(scope){
            var _data = scope.data;
            scope.data = {
                type : 'PayPeriod',
                id : _data.id,
                selected : _data.pay_period_id,
            };
        }

        function seltet_pay_period(scope ){
            scope.data = {
                type : 'PayPeriod',
            };
            scope.submit = function(){
                var selected = $rootScope.pre_scope().gridSel[scope.assoc_store_id];
                angular.forEach(selected,function(item){
                    item.pay_period_id = scope.data.selected;
                });
                $rootScope.close_view();
            }

        }
        function reta_see(action,meta,cfg,store_id,data){
            var data = angular.copy(data)||{};
            data.read_mine = 1;
            switch(data.reta_type_id){
                case appConst.CUSTOMER_MS:
                    $rootScope.trigger('查看门市',meta,store_id,data);
                    break;
                case appConst.CUSTOMER_DS:
                    $rootScope.trigger('查看电商',meta,store_id,data);
                    break;
                case appConst.CUSTOMER_ZK:
                    $rootScope.trigger('查看直客',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }

        function select_dct_agreement_done(scope){
            var data = {
                type : 'DctAgreement',
            };
            scope.data = data;
            scope.submit = function(){
                var selected = $rootScope.pre_scope().gridSel[scope.assoc_store_id];
                angular.forEach(selected,function(item){
                    item.dct_see = [];
                    angular.forEach(data.selected,function(id){
                        item.dct_see.push(EnumSrvc[data.type][id]);
                    });
                    item.dct_id = data.selected?angular.toJson(data.selected):'';
                    item.dct_see = item.dct_see.join(',');
                });
                $rootScope.close_view();
            };
        }
        function set_pay_period_batch(scope){
            scope.action_map = {
                '删除行':delete_batch_done,
                
            };
            scope.cfg.btn_hide = scope.cfg.btn_hide || {};
            scope.init = function(){
                angular.forEach(['添加门市','添加电商'],function(i){
                        scope.cfg.btn_hide[i] = 1;
                });
                if(scope.action == '批量设置电商账期'){
                    scope.cfg.btn_hide['添加电商'] = 0;
                }
                if(scope.action == '批量设置门市账期'){
                    scope.cfg.btn_hide['添加门市'] = 0;
                }
            }
            function delete_batch_done(){
                var selected = scope.gridSel['客户-批量设置账期'];

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                _.each(selected,function(item){
                    scope.delete_row('客户-批量设置账期',item);
                });
            }


        }

        function set_dct_agreement_batch(scope){
            scope.action_map = {
                '删除行':delete_batch_done,
                
                '取消协议':cancel_dct_agreement,
                '选定多行':select_batch_done,
            };
            scope.cfg.btn_hide = scope.cfg.btn_hide || {};
            scope.init = function(){
                angular.forEach(['添加门市','添加电商'],function(i){
                        scope.cfg.btn_hide[i] = 1;
                });
                if(scope.action == '批量设置电商协议'){
                    scope.cfg.btn_hide['添加电商'] = 0;
                }
                if(scope.action == '批量设置门市协议'){
                    scope.cfg.btn_hide['添加门市'] = 0;
                }
            }
            function select_batch_done(){
                var selected = $rootScope.cur_scope().selected;
                angular.forEach(selected,function(item){
                    item.dct_see = [];
                    var dct_id = item.dct_id?angular.fromJson(item.dct_id):[];
                    dct_id = _.isArray(dct_id)?dct_id:[dct_id];
                    angular.forEach(dct_id,function(id){
                        item.dct_see.push(EnumSrvc['DctAgreement'][id]);
                    });
                    item.dct_see = item.dct_see.join(',');
                });
                if(!selected || !selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                $rootScope.pre_scope().loadData('客户-批量设置协议', selected, true);
                $rootScope.close_view();
            }
            function delete_batch_done(){
                var selected = scope.gridSel['客户-批量设置协议'];

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                _.each(selected,function(item){
                    scope.delete_row('客户-批量设置协议',item);
                });
            }

            function cancel_dct_agreement(store_id,data,meta,action){
                var selected = scope.gridSel['客户-批量设置协议'];

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                }

                angular.forEach(selected,function(item){
                    item.dct_id = '';
                    item.dct_see = '';
                });
                   
            }
        }
    }
})();