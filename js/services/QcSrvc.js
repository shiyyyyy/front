(function() {
    'use strict';

    angular
        .module('app')
        .factory('QcSrvc', QcSrvc);

    QcSrvc.$inject = ['$rootScope','CommSrvc','EnumSrvc','AjaxSrvc','appConst'
                      ,'FieldSrvc','$timeout'];
    function QcSrvc($rootScope,CommSrvc,EnumSrvc,AjaxSrvc,appConst,FieldSrvc,$timeout){

        return {
            '修改纸质合同':modify_contract,
            '分配纸质合同':assign_contract,

            '新增电子合同':add_elccontract,
            '新增出境电子合同':elccontract_edit,
            '修改出境电子合同':elccontract_edit,
            '查看出境电子合同':elccontract_edit,
            '新增国内电子合同':elccontract_edit,
            '修改国内电子合同':elccontract_edit,
            '查看国内电子合同':elccontract_edit,
            '新增单项电子合同':elccontract_edit,
            '修改单项电子合同':elccontract_edit,
            '查看单项电子合同':elccontract_edit,
            '修改电子合同':modify_elc_contract,

            '选定订单-电子合同':select_order_related_elc_contract,
            '查看电子合同':see_elc_contract,
            '查看合同-订单':see_contract_order,
            '合同预览':elccontract_overview,
            //'电子合同关联订单':elc_contract_related_order,
        };
        function modify_contract(scope){
            scope.data = {
                'contract_num':scope.ref.contract_num,
                'id':scope.ref.id
            };
        }
        function assign_contract(scope){
            scope.action_map = {
                '选定合同-分配':select_contract_done,
                '选定员工-分配':select_employee_done,
            };
            function select_contract_done(){
                var selected = $rootScope.cur_scope().selected;

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }

                var scope = $rootScope.pre_scope();
                var assoc_id = $rootScope.cur_scope().assoc_store_id;
                scope.loadData(assoc_id,selected,'id');
                $rootScope.close_view();
            }
            function select_employee_done(){
                var selected = $rootScope.cur_scope().selected;

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }

                var scope = $rootScope.pre_scope();
                var assoc_id = $rootScope.cur_scope().assoc_store_id;
                scope.loadData(assoc_id,selected,'id');
                $rootScope.close_view();
            }
        }
        function add_elccontract(scope){
            scope.data = {
                type:'ContractType',
            };
            scope.submit = function(){
                var data = scope.data;
                var pre_scope = scope.pre_scope();
                var params = {};
                var action = '';
                if(data.contract_type){
                    switch(data.contract_type){
                        case appConst.CONTRACT_CJ:
                            action = '新增出境电子合同';
                            $rootScope.close_view();
                            params['type_id'] = appConst.CONTRACT_CJ;
                            $rootScope.trigger(action,{text:scope.text},null,params);
                            break;
                        case appConst.CONTRACT_GN:
                            action = '新增国内电子合同';
                            $rootScope.close_view();
                            params['type_id'] = appConst.CONTRACT_GN;
                            $rootScope.trigger(action,{text:scope.text},null,params);
                            break;
                        case appConst.CONTRACT_DX:
                            action = '新增单项电子合同';
                            $rootScope.close_view();
                            params['type_id'] = appConst.CONTRACT_DX;
                            $rootScope.trigger(action,{text:scope.text},null,params);
                            break;
                        default:
                            CommSrvc.error(I18nSrvc.get('CONTRACT_TYPE_ERR'));
                            return; 
                    }
                }else{
                    CommSrvc.error(I18nSrvc.get('CONTRACT_TYPE_ERR'));
                    return; 
                }
            }
        }

        function elccontract_edit(scope){
            scope.init = function(){
                var cfg = scope.cfg;
                scope.gridCfg = {};
                angular.forEach(cfg.block,function(block,index){

                    var block_cfg = $rootScope.blocks[block];
                    
                    scope.data[block] = scope.data[block] || [];
                
                    scope.gridCfg[block] = {
                        columnDefs:FieldSrvc.get_mod_col(block_cfg,block,(cfg.ro && cfg.ro[index])),
                        data:scope.data[block],
                        enableCellEditOnFocus:true,
                        enableColumnMenus: false,
                        enableSorting: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: $rootScope.gridScroll,
                        enableVerticalScrollbar: $rootScope.gridScroll,
                        onRegisterApi : function(gridApi){
                            if(!$rootScope.gridScroll){
                                $timeout(function(){
                                    $('.ui-grid-viewport').each(function () {
                                        this.ps = this.ps || new PerfectScrollbar(this);
                                    });
                                });
                            }
                            gridApi.edit.on.afterCellEdit(null,function(rowEntity, colDef, newValue, oldValue){
                                if(newValue != oldValue && colDef.change){
                                    scope[colDef.change](rowEntity, colDef);
                                }
                            });
                        }
                    };
                });
            }
            scope.insurance_agree_change = function(row,col){
                if(row['agree']==3){
                    row['product'] = '旅游人身意外险(以实际保单为准)';
                }else{
                    row['product'] = '';
                }
            }
            scope.pay_type_change = function(row,col){
                var field = col.field;
                var flag = '';
                if(field == 'payOther'){
                    flag = row[field]?row[field]:'';
                }else{
                    flag = row[field]?row[field]:0;
                }
                angular.forEach(['cash','check','credit'],function(item){
                    row[item] = 0;
                });
                row['payOther'] = '';
                row[field] = flag;
            }
            scope.change_to_bank = function(row,col){
                row['to_user_name'] = row[col.field];
                row['to_account_num'] = row[col.field];
            }
            scope.action_map = {
                '添加游客':add_tourist
            }
            function add_tourist(store_id){
                scope.loadData(store_id,[{'name':'虚拟游客'}],'new');
            }
            scope.submit_check = function(){
                var cfg = scope.cfg;
                var rq_empty = false;
                var blocks = angular.copy(cfg.block);
                angular.forEach(blocks,function(key){
                    var block_cfg = $rootScope.blocks[key];
                    var rq_list = [];
                    angular.forEach(block_cfg.list,function(item,field){
                        if(item.rq){//rq 标记必填字段
                            rq_list.push(field);
                        }
                    });
                    var data = scope.data[key];
                    angular.forEach(data,function(item){
                        angular.forEach(rq_list,function(field){
                            if(!item[field]&&!rq_empty){ // 为空 则记录空字段名称
                                rq_empty = block_cfg.list[field].text;
                                return ;
                            }
                        });
                    });
                });
                return rq_empty;
            }
        }

        function modify_elc_contract(action,meta,cfg,store_id,data){
            switch(data.type_id){
                case appConst.CONTRACT_CJ:
                    $rootScope.trigger('修改出境电子合同',meta,store_id,data);
                    break;
                case appConst.CONTRACT_GN:
                    $rootScope.trigger('修改国内电子合同',meta,store_id,data);
                    break;
                case appConst.CONTRACT_DX:
                    $rootScope.trigger('修改单项电子合同',meta,store_id,data);
                    break;
            }
        }
        function see_contract_order(action,meta,cfg,store_id,data){
            switch(data.contract_kind){
                case appConst.PAP_CONTRACT:
                    $rootScope.trigger('查看纸质合同',meta,store_id,data);
                    break;
                case appConst.ELC_CONTRACT:
                    $rootScope.trigger('查看电子合同',meta,store_id,data);
                    break;
            }
        }
        function see_elc_contract(action,meta,cfg,store_id,data){
            switch(data.type_id){
                case appConst.CONTRACT_CJ:
                    $rootScope.trigger('查看出境电子合同',meta,store_id,data);
                    break;
                case appConst.CONTRACT_GN:
                    $rootScope.trigger('查看国内电子合同',meta,store_id,data);
                    break;
                case appConst.CONTRACT_DX:
                    $rootScope.trigger('查看单项电子合同',meta,store_id,data);
                    break;
            }
        }
        function select_order_related_elc_contract(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var order = selected[0];
            AjaxSrvc.get('/sale/Order/read_for_elcContract',{id:selected[0].id}).then(function(res){
                var scope = $rootScope.pre_scope();
                scope.loadData('订单信息-合同',res['订单信息-合同']);
                scope.loadData('游客名单-合同',res['游客名单-合同']);
                var contract_type = scope.data['电子合同编辑'][0]['type_id'];
                if(contract_type == appConst.CONTRACT_CJ){
                    _.extend(scope.data['旅游费用-出境'][0],res['旅游费用'][0]); 
                }else if(contract_type == appConst.CONTRACT_GN){
                    _.extend(scope.data['旅游费用-国内'][0],res['旅游费用'][0]); 
                }else if(contract_type == appConst.CONTRACT_DX){
                    _.extend(scope.data['合同金额'][0],res['合同金额'][0]);
                }
                
                scope.data['personLimit'] = res['personLimit'];
                $rootScope.close_view();
            });
        }
        function elccontract_overview(action,meta,cfg,store_id,data){
            window.open(appConst.HOST + cfg.read.url+'?action=' + action +'&id=' + data.id);
        }
    }
})();