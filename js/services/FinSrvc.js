
(function() {
    'use strict';

    angular
        .module('app')
        .factory('FinSrvc', FinSrvc);

    FinSrvc.$inject = ['AjaxSrvc', 'CommSrvc', 'I18nSrvc','$uibModal','$rootScope','appConst'
                        ,'FieldSrvc','EnumSrvc','$timeout'];
    function FinSrvc(AjaxSrvc, CommSrvc, I18nSrvc,$uibModal,$rootScope,appConst,FieldSrvc,EnumSrvc,$timeout){

        return {
            //收支申请
            '新增单据':doc_add,
            '修改单据':doc_map,
            '单据审批':doc_approve,
            '内转单据审批':nz_doc_approve,
            '查看单据':doc_see,

            //=======================单据新增 修改 查看=================
            '新增业务收款单':doc_edit,
            '新增业务收款单-认领':add_yw_sk_for_fund,
            '业务收款单-认领':add_yw_sk_for_fund,
            '修改业务收款单':doc_edit,
            '查看业务收款单':doc_edit,
            '清空入账':clear_fund,

            '业务收款审批':doc_edit,
            '新增资金收款单':doc_edit,
            '新增资金收款单-认领':add_zj_sk_for_fund,
            '资金收款单-认领':add_zj_sk_for_fund,
            '修改资金收款单':doc_edit,
            '查看资金收款单':doc_edit,
            '资金收款审批':doc_edit,
            '选定入账':select_fund_done,

            '新增押金单':doc_edit,
            '修改押金单':doc_edit,
            '查看押金单':doc_edit,
            '押金审批':doc_edit,


            '新增退业务收款单':doc_edit,
            '修改退业务收款单':doc_edit,
            '查看退业务收款单':doc_edit,
            '退业务收款审批':doc_edit,

            '新增退资金收款单':doc_edit,
            '修改退资金收款单':doc_edit,
            '查看退资金收款单':doc_edit,
            '退资金收款审批':doc_edit,
            '退款选定资金收款单':select_tk_ref_zjsk_done,

            '新增退押金单':doc_edit,
            '修改退押金单':doc_edit,
            '查看退押金单':doc_edit,
            '退押金审批':doc_edit,


            '新增业务借款单':doc_edit,
            '修改业务借款单':doc_edit,
            '查看业务借款单':doc_edit,
            '业务借款审批':doc_edit,

            '新增资金借款单':doc_edit,
            '修改资金借款单':doc_edit,
            '查看资金借款单':doc_edit,
            '资金借款审批':doc_edit,

            '新增业务支出单':doc_edit,
            '修改业务支出单':doc_edit,
            '查看业务支出单':doc_edit,
            '业务支出审批':doc_edit,
            '批量结清核算':settle_acc_batch,
            '业务收款单批量结清核算':sk_settle_acc_batch,

            '新增资金支出单':doc_edit,
            '修改资金支出单':doc_edit,
            '查看资金支出单':doc_edit,
            '资金支出审批':doc_edit,


            '新增预存单':doc_edit,
            '修改预存单':doc_edit,
            '查看预存单':doc_edit,
            '预存审批':doc_edit,

            '新增预支单':doc_edit,
            '修改预支单':doc_edit,
            '查看预支单':doc_edit,
            '预支审批':doc_edit,

            '新增业务内转单':doc_edit,
            '修改业务内转单':doc_edit,
            '查看业务内转单':doc_edit,
            '业务内转审批':doc_edit,

            '新增资金内转单':doc_edit,
            '修改资金内转单':doc_edit,
            '查看资金内转单':doc_edit,
            '资金内转审批':doc_edit,

            '新增调整单':doc_edit,
            '修改调整单':doc_edit,
            '查看调整单':doc_edit,
            '调整审批':doc_edit,

            //扣款单不需要审批
            '新增扣款单':doc_edit,
            '修改扣款单':doc_edit,
            '查看扣款单':doc_edit,
            '扣款审批':doc_edit,

            //扣款单不需要审批
            '新增还款单':doc_edit,
            '修改还款单':doc_edit,
            '查看还款单':doc_edit,
            '还款选定借款':hk_select_jk_done,

            '新增工资单':doc_edit,
            '修改工资单':doc_edit,
            '查看工资单':doc_edit,
            '工资审批':doc_edit,


            '新增业务退回单':doc_edit,
            '修改业务退回单':doc_edit,
            '查看业务退回单':doc_edit,
            '业务退回审批':doc_edit,
            '新增业务退回单-认领':add_yw_return_for_fund,
            '业务退回单-认领':add_yw_return_for_fund,

            '新增资金退回单':doc_edit,
            '修改资金退回单':doc_edit,
            '查看资金退回单':doc_edit,
            '资金退回审批':doc_edit,

            '新增资金退回单-认领':add_zj_return_for_fund,
            '资金退回单-认领':add_zj_return_for_fund,

            '选择供应商账户':choose_sup_account,

            //================================================
            //资金
            '导入资金':import_fund_excel,
            '搜索资金':search_for_fund,
            '选定资金-查询':selected_fund_done_search,
            '批量操作-资金':batch_op_fund,

            //扣款公式
            '新增扣款公式':add_formula,
            '新增阶梯扣款公式':ladder_formula_edit,
            '修改扣款公式':formula_modify,
            '修改阶梯扣款公式':ladder_formula_edit,
            '修改单项扣款公式':dx_formula_edit,

            '新增结算方式':settle_way_edit,
            '修改结算方式':settle_way_edit,
            '绑定币种':settle_way_bind,

            //收支审批
            '导出账目':doc_export,
            '导出支出':export_expense,
            '财务审批次数':approve_frequency,
            '批量添加-资金':add_batch,
            '批量删除-资金':delete_batch,
            '完善单据':doc_improve,

            //数据统计
            '数据统计':data_statistics,
	    
	    //扣款
            '选定扣款部门':selected_kk_department_done,            

            '扣款批量操作':setting_kk_items,
            '导入扣款部门':import_kk_excel,

            '监管明细':regulatory_details,
            '单据日志':log_see,
            '货币日志':log_see,
            '单据关联信息':doc_related_msg,
            '单据关联信息-审批':doc_related_msg,
            '导出单据':export_receipts,
            '账目导出选择':account_export_selected,
            '账目导出全部':account_export_all,
            '账目导出全部分页':account_export_page,
            '导出支出选择':export_expense_selected,
            '导出支出全部':export_expense_all,
            '导出支出全部分页':export_expense_page,
            '选定支出关联单据':selected_zc_related_doc_done,
            '导出财务监管明细':export_supervise,
            '导出内转单据审批':export_nz_approve,
            '导出内转单据选择':export_nz_doc_selected,
            '导出内转单据全部':export_nz_doc_all,
            '导出内转单据全部分页':export_nz_doc_page,
            '删除支出关联单据':delete_related_zc_doc,
            '新增资金':add_zijin,
            //'添加扣款部门':add_kk_deparment,
            '选定部门-扣款':selected_department_done_kk,

            '业务退回选定单据':yw_th_select_doc_done,
            '资金退回选定单据':zj_th_select_doc_done,
            '删除业务退回单据':delete_yw_th_select_doc,
            '删除资金退回单据':delete_zj_th_select_doc,

            '选择查看类型':select_see_type,
        };

        function select_see_type(action,meta,cfg,store_id,data){
            switch(data.order_kind){
                case appConst.ORDER_NORMAL:
                    $rootScope.trigger('查看订单已转-应转管理',meta,store_id,data);
                    break;
                case appConst.ORDER_EVENT:
                    $rootScope.trigger('查看订单已收',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }
        // 导出财务监管明细
        function export_supervise(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var parmas = {} ;
            for(var key in scope.search){
                if(_.isString(scope.search[key])){
                    parmas[key] = scope.search[key];
                }
            }
            parmas['mod'] = scope.search['mod'];
            window.open(appConst.HOST + '/fin/DocExport/export_supervise?action=' + action+'&' + $rootScope.toQueryString(parmas));
        }

        function clear_fund(action,meta,cfg,store_id,data){
            var cur = $rootScope.cur_scope();
            cur.loadData(store_id,[{'amount':cur.amount||0}]);
            cur.data['SettleWayNonAccount'] = EnumSrvc['SettleWayNonAccount'];
        }

        function data_statistics(scope){
            scope.items = [
                {img:'img/income.png',name:I18nSrvc.get("INCOME_TOTAL"),num:scope.data.income},
                {img:'img/expend.png',name:I18nSrvc.get("TOTAL_EXPENDITURE"),num:scope.data.expense},
                {img:'img/CurrentBalance.png',name:I18nSrvc.get("CURRENT_BALANCE"),num:scope.data.balance},
                {img:'img/FreezingBalance.png',name:I18nSrvc.get("FREEZING_BALANCE"),num:scope.data.freeze},
                {img:'img/AvailableBalance.png',name:I18nSrvc.get("AVAILABLE_BALANCE"),num:scope.data.avail_balance},
                {img:'img/deductAmount.png',name:I18nSrvc.get("DEDUCT_AMOUNT"),num:scope.data.deduct_amount}
            ]
        }

        function add_zijin(scope){
            scope.change_batch_word = change_batch_word;
            function change_batch_word(scope){
                var str = scope.remitter;
                var reg = /[\（]/g,reg2 = /[\）]/g,reg3 = /[\，]/g;
                str = str.replace(reg,"(").replace(reg2,")").replace(reg3,",");
                scope.remitter = str;
            }
        }
        function add_batch(scope){
            
            scope.submit  = function(){
                var pre = $rootScope.pre_scope();
                var num_of_add = scope.data.accounts_num;
                var rows =[];
                for (var i = num_of_add - 1; i >= 0; i--) {
                    var row = {};
                    angular.forEach(['settle_way_id','settle_bank_id','settle_date','currency_id'],function(key){
                        row[key] = scope.data[key];
                    });
                    rows.push(row);
                }
                pre.loadData('资金编辑',rows,'new');                

                $rootScope.close_view();
            }
        }        
        function delete_batch(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var selected = scope.gridSel[store_id];

            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            _.each(selected,function(item){
                scope.delete_row(store_id,item);
            });
        }                 
        function doc_add(scope){
            scope.data = {
                type:'DocAdd'
            };
            scope.submit = function(){
                var data = scope.data;
                var blk = '单据信息';
                var action = '';
                var params = {};
                if(data.doc_type){
                    var doc_type = data.doc_type;
                    switch(data.doc_type){
                        case appConst.DOC_ORDER_SK:
                            doc_type = appConst.DOC_ORDER_SK;
                            action  = '新增业务收款单';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code}];
                            break;
                        case appConst.DOC_ZJ_SK:
                            doc_type = appConst.DOC_ZJ_SK;
                            action = '新增资金收款单';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code,
                                'settle_obj':$rootScope.appUser.department_name}];
                            break;
                        case appConst.DOC_ACC_ZC:
                            doc_type = appConst.DOC_ACC_ZC;
                            action  = '新增业务支出单';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code}];
                            break;
                        case appConst.DOC_ZJ_ZC:
                            doc_type = appConst.DOC_ZJ_ZC;
                            action = '新增资金支出单';
                            blk = '资金支出单据信息';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code,
                                'settle_obj':$rootScope.appUser.department_name}];
                            break;
                        case appConst.DOC_YW_NZ:
                            doc_type = appConst.DOC_YW_NZ;
                            action  = '新增业务内转单';
                            blk = '业务内转单据信息';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code}];   
                            break;
                        case appConst.DOC_ZJ_NZ:
                            doc_type = appConst.DOC_ZJ_NZ;
                            action = '新增资金内转单';
                            blk = '单据信息';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code}];   
                            break;
                        case appConst.DOC_YW_TK:
                            doc_type = appConst.DOC_YW_TK;
                            action  = '新增退业务收款单';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code}];
                            break;
                        case appConst.DOC_ZJ_TK:
                            doc_type = appConst.DOC_ZJ_TK;
                            action = '新增退资金收款单';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code}];
                            break;
                        case appConst.DOC_YW_JK:
                            doc_type = appConst.DOC_YW_JK;
                            action  = '新增业务借款单';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code}];
                            break;
                        case appConst.DOC_ZJ_JK:
                            doc_type = appConst.DOC_ZJ_JK;
                            action = '新增资金借款单';
                            blk = '资金借款单据信息';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code,
                                'settle_obj':$rootScope.appUser.department_name}];
                            break;
                        case appConst.DOC_HK:
                            action = '新增还款单';
                            doc_type = appConst.DOC_HK;
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code
                            }];
                            break;
                        case appConst.DOC_GZ:
                            doc_type = appConst.DOC_GZ;
                            action = '新增工资单';
                            blk = '工资单单据信息';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code,
                                'settle_obj':$rootScope.appUser.department_name}];
                            break;
                        case appConst.DOC_ZJ_TH:
                            doc_type = appConst.DOC_ZJ_TH;
                            action = '新增资金退回单';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code,
                                'settle_obj':$rootScope.appUser.department_name}];
                            break;
                        case appConst.DOC_YW_TH:
                            doc_type = appConst.DOC_YW_TH;
                            action = '新增业务退回单';
                            params[blk] = [{'doc_type_id':doc_type,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code}];
                            break;
                        default:
                            CommSrvc.error(I18nSrvc.get('DOC_TYPE_ERR'));
                            return;
                    }
                    $rootScope.close_view();
                    $rootScope.trigger(action,{text:scope.text},null,params);
                    
               }else{
                    CommSrvc.error(I18nSrvc.get('DOC_TYPE_ERR'));
                    return;
               }
            }
        }

        function doc_map(action,meta,cfg,store_id,data){
            switch(data.doc_type_id){
                case appConst.DOC_ORDER_SK:
                    $rootScope.trigger('修改业务收款单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_SK:
                    $rootScope.trigger('修改资金收款单',meta,store_id,data);
                    break;
                case appConst.DOC_YJ:
                    $rootScope.trigger('修改押金单',meta,store_id,data);
                    break;
                case appConst.DOC_YW_TK:
                    $rootScope.trigger('修改退业务收款单',meta,store_id,data);
                    break;
                case appConst.DOC_YJ_TK:
                    $rootScope.trigger('修改退押金单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_TK:
                    $rootScope.trigger('修改退资金收款单',meta,store_id,data);
                    break;
                case appConst.DOC_YW_JK:
                    $rootScope.trigger('修改业务借款单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_JK:
                    $rootScope.trigger('修改资金借款单',meta,store_id,data);
                    break;
                case appConst.DOC_ACC_ZC:
                    $rootScope.trigger('修改业务支出单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_ZC:
                    $rootScope.trigger('修改资金支出单',meta,store_id,data);
                    break;
                case appConst.DOC_YC:
                    $rootScope.trigger('修改预存单',meta,store_id,data);
                    break;
                case appConst.DOC_YZ:
                    $rootScope.trigger('修改预支单',meta,store_id,data);
                    break;
                case appConst.DOC_YW_NZ:
                    $rootScope.trigger('修改业务内转单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_NZ:
                    $rootScope.trigger('修改资金内转单',meta,store_id,data);
                    break;
                case appConst.DOC_TZ:
                    $rootScope.trigger('修改调整单',meta,store_id,data);
                    break;
                case appConst.DOC_HK:
                    $rootScope.trigger('修改还款单',meta,store_id,data);
                    break;
                case appConst.DOC_GZ:
                    $rootScope.trigger('修改工资单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_TH:
                    $rootScope.trigger('修改资金退回单',meta,store_id,data);
                    break;
                case appConst.DOC_YW_TH:
                    $rootScope.trigger('修改业务退回单',meta,store_id,data);
                    break;
                case appConst.DOC_KK:
                    $rootScope.trigger('修改扣款单',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }

        function doc_see(action,meta,cfg,store_id,data){
            switch(data.doc_type_id){
                case appConst.DOC_ORDER_SK:
                    $rootScope.trigger('查看业务收款单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_SK:
                    $rootScope.trigger('查看资金收款单',meta,store_id,data);
                    break;
                case appConst.DOC_YJ:
                    $rootScope.trigger('查看押金单',meta,store_id,data);
                    break;
                case appConst.DOC_YW_TK:
                    $rootScope.trigger('查看退业务收款单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_TK:
                    $rootScope.trigger('查看退资金收款单',meta,store_id,data);
                    break;
                case appConst.DOC_YJ_TK:
                    $rootScope.trigger('查看退押金单',meta,store_id,data);
                    break;
                case appConst.DOC_YW_JK:
                    $rootScope.trigger('查看业务借款单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_JK:
                    $rootScope.trigger('查看资金借款单',meta,store_id,data);
                    break;
                case appConst.DOC_ACC_ZC:
                    $rootScope.trigger('查看业务支出单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_ZC:
                    $rootScope.trigger('查看资金支出单',meta,store_id,data);
                    break;
                case appConst.DOC_YC:
                    $rootScope.trigger('查看预存单',meta,store_id,data);
                    break;
                case appConst.DOC_YZ:
                    $rootScope.trigger('查看预支单',meta,store_id,data);
                    break;
                case appConst.DOC_YW_NZ:
                    $rootScope.trigger('查看业务内转单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_NZ:
                    $rootScope.trigger('查看资金内转单',meta,store_id,data);
                    break;
                case appConst.DOC_TZ:
                    $rootScope.trigger('查看调整单',meta,store_id,data);
                    break;
                case appConst.DOC_KK:
                    $rootScope.trigger('查看扣款单',meta,store_id,data);
                    break;
                case appConst.DOC_HK:
                    $rootScope.trigger('查看还款单',meta,store_id,data);
                    break;
                case appConst.DOC_GZ:
                    $rootScope.trigger('查看工资单',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_TH:
                    $rootScope.trigger('查看资金退回单',meta,store_id,data);
                    break;
                case appConst.DOC_YW_TH:
                    $rootScope.trigger('查看业务退回单',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }

        function doc_approve(action,meta,cfg,store_id,data){
            switch(data.doc_type_id){
                case appConst.DOC_ORDER_SK:
                    $rootScope.trigger('业务收款审批',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_SK:
                    $rootScope.trigger('资金收款审批',meta,store_id,data);
                    break;  
                case appConst.DOC_YJ:
                    $rootScope.trigger('押金审批',meta,store_id,data);
                    break;
                case appConst.DOC_YW_TK:
                    $rootScope.trigger('退业务收款审批',meta,store_id,data);
                    break;
                case appConst.DOC_YJ_TK:
                    $rootScope.trigger('退押金审批',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_TK:
                    $rootScope.trigger('退资金收款审批',meta,store_id,data);
                    break;
                case appConst.DOC_YW_JK:
                    $rootScope.trigger('业务借款审批',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_JK:
                    $rootScope.trigger('资金借款审批',meta,store_id,data);
                    break;
                case appConst.DOC_ACC_ZC:
                    $rootScope.trigger('业务支出审批',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_ZC:
                    $rootScope.trigger('资金支出审批',meta,store_id,data);
                    break;
                case appConst.DOC_YC:
                    $rootScope.trigger('预存审批',meta,store_id,data);
                    break;
                case appConst.DOC_YZ:
                    $rootScope.trigger('预支审批',meta,store_id,data);
                    break;
                case appConst.DOC_TZ:
                    $rootScope.trigger('调整审批',meta,store_id,data);
                    break;
                case appConst.DOC_HK:
                    $rootScope.trigger('还款审批',meta,store_id,data);
                    break;
                case appConst.DOC_GZ:
                    $rootScope.trigger('工资审批',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_TH:
                    $rootScope.trigger('资金退回审批',meta,store_id,data);
                    break;
                case appConst.DOC_YW_TH:
                    $rootScope.trigger('业务退回审批',meta,store_id,data);
                    break;
                case appConst.DOC_KK:
                    $rootScope.trigger('扣款审批',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }
        function nz_doc_approve(action,meta,cfg,store_id,data){
            switch(data.doc_type_id){
                case appConst.DOC_YW_NZ:
                    $rootScope.trigger('业务内转审批',meta,store_id,data);
                    break;
                case appConst.DOC_ZJ_NZ:
                    $rootScope.trigger('资金内转审批',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }

        //
        function doc_edit(scope){
            scope.action_map = {
                '选定收款订单': select_sk_order_done,
                '删除收款订单': delete_sk_order_done,
                '删除退款订单': delete_tk_order_done,
                '选定客户':select_cstm_done,
                '退款选定收款单':select_tk_ref_doc_done,
                '退款选定押金单':select_tk_ref_yj_done,
                '选定借款核算':select_jk_acc_done,
                '删除借款核算':delete_acc_done,
                '添加借款供应商账户':add_sup_account,
                '选定支出核算':select_zc_acc_done,
                '删除支出核算':delete_acc_done,
                '添加支出供应商账户':add_sup_account,
                '选定应转核算':select_nz_acc_done,
                '选定对账核算-内转':select_nz_acc_done,
                '选定订单核算-内转':select_nz_acc_done,
                '删除内转核算':delete_acc_done,
                '调整选定单据':select_tz_ref_doc_done,
            };
            scope.calc_doc = calc_doc;
            scope.tk_settle_info_change = tk_settle_info_change;
            scope.settle_info_change = settle_info_change;
            scope.zj_sk_settle_info_change = zj_sk_settle_info_change;
            scope.calc_fund = calc_fund;
            scope.change_settle_obj = change_settle_obj;
            scope.change_word = change_word; 
            scope.change_cn_word = change_cn_word;

            function change_word(scope){
                var str = scope.to_user_name;
                var reg = /[\（]/g,reg2 = /[\）]/g,reg3 = /[\，]/g;
                str = str.replace(reg,"(").replace(reg2,")").replace(reg3,",");
                
                scope.to_user_name = str;
            }
            function change_cn_word(scope){
                var str = scope.remitter;
                var reg = /[\（]/g,reg2 = /[\）]/g,reg3 = /[\，]/g;
                str = str.replace(reg,"(").replace(reg2,")").replace(reg3,",");
                
                scope.remitter = str;
            }
            scope.init = function(){
                scope.data['可选币种'] = EnumSrvc['Currency'];
                //扣款单
                if(scope.action == '新增扣款单'){
                    scope.data['扣款单据信息'].push({'doc_type_id':appConst.DOC_KK,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code,
                                });
                }
                if(scope.action == '新增调整单'){
                    scope.data['调整单据信息'].push({'doc_type_id':appConst.DOC_TZ,
                                'employee_name':$rootScope.appUser.employee_name,
                                'code':$rootScope.appUser.department_code});
                }

                if(scope.data['单据信息']
                    &&!_.isEmpty(scope.data['单据信息'])
                    &&scope.data['单据信息'][0].doc_type_id ==appConst.DOC_ZJ_SK){
                    scope.calc_fund();
                }else{
                    scope.calc_doc();
                }
                if(scope.data['单据信息']
                    &&scope.data['单据信息'][0].doc_type_id == appConst.DOC_ACC_ZC
                    &&!_.isUndefined(scope.data['支出核算'])
                    &&!_.isEmpty(scope.data['支出核算'])){
                    var new_cols = [];
                    if(scope.data['支出核算'][0].accounting_type == appConst.ACCOUNTING_ORDER_PAY){
                        new_cols = [
                            {field:'settle_amount',cfg:{text:I18nSrvc.get('SETTLEABLE'),ro:1,foot:'settle'}},
                            {field:'settled_amount',cfg:{text:I18nSrvc.get('SETTLED'),ro:1,trigger:['查看订单已转-应转管理'],foot:'settled'}},
                            {field:'settle_diff',cfg:{text:I18nSrvc.get('SETTLE_DIFF'),ro:1,foot:'diff'}},
                        ];
                        redraw('支出核算',scope.gridCfg['支出核算'].columnDefs,new_cols,'sign_up_employee_id','settle_obj');
                    }else {
                        new_cols = [
                            {field:'group_num',cfg:{text:I18nSrvc.get('GROUP_NUM'),ro:1,trigger:['团队总览']}}
                        ];
                        redraw('支出核算',scope.gridCfg['支出核算'].columnDefs,new_cols,'pd_name','order_id');
                    }
                    
                    _.each(scope.data['支出核算'],function(item){
                        // 对账订单并且是活动专线 把 订单，应收，已收，未收读为 应转，已转，未转
                        if((scope.data['支出核算'][0].accounting_type == appConst.ACCOUNTING_ORDER_PAY) && (item.order_kind == appConst.ORDER_EVENT)){ // 对账订单并且是活动专线
                            item.settle_amount = item.receivable;
                            item.settled_amount = item.received;
                            item.settle_diff = item.receive_diff;
                        }
                    });
                }
                if(scope.data['单据信息']
                    &&scope.data['单据信息'][0].doc_type_id == appConst.DOC_YW_JK
                    &&!_.isUndefined(scope.data['借款核算'])
                    &&!_.isEmpty(scope.data['借款核算'])){
                    var new_cols = [];
                    if(scope.data['借款核算'][0].accounting_type == appConst.ACCOUNTING_ORDER_PAY){
                        new_cols = [
                            {field:'settle_amount',cfg:{text:I18nSrvc.get('SETTLEABLE'),ro:1,foot:'settle'}},
                            {field:'settled_amount',cfg:{text:I18nSrvc.get('SETTLED'),ro:1,trigger:['查看订单已转-应转管理'],foot:'settled'}},
                            {field:'settle_diff',cfg:{text:I18nSrvc.get('SETTLE_DIFF'),ro:1,foot:'diff'}},
                        ];
                        
                        redraw('借款核算',scope.gridCfg['借款核算'].columnDefs,new_cols,'sign_up_employee_id','settle_obj');
                    }else{
                        new_cols = [{field:'group_num',cfg:{text:I18nSrvc.get('GROUP_NUM'),ro:1,trigger:['团队总览']}}];
                        redraw('借款核算',scope.gridCfg['借款核算'].columnDefs,new_cols,'pd_name','order_id');
                    }

                    _.each(scope.data['借款核算'],function(item){
                        // 对账订单并且是活动专线 把 订单，应收，已收，未收读为 应转，已转，未转
                        if((scope.data['借款核算'][0].accounting_type == appConst.ACCOUNTING_ORDER_PAY) && (item.order_kind == appConst.ORDER_EVENT)){ // 对账订单并且是活动专线
                            item.settle_amount = item.receivable;
                            item.settled_amount = item.received;
                            item.settle_diff = item.receive_diff;
                        }
                    });
                }                
                if(scope.action == '新增业务收款单' || 
                    scope.action == '新增资金收款单'||
                    scope.action == '修改业务收款单'||
                    scope.action == '修改资金收款单'||
                    scope.action == '查看资金收款单'||
                    scope.action == '查看业务收款单'||
                    scope.action == '资金收款审批'||
                    scope.action == '业务收款审批'){
                    scope.block_hide = scope.block_hide||{};
                    angular.forEach(['入账详情','入账详情-查看'],function(fund_blk){
                        if(!_.isUndefined(scope.data[fund_blk])){
                            if(_.isEmpty(scope.data[fund_blk])
                                ||_.isUndefined(scope.data[fund_blk][0]['fund_id'])
                                ||scope.data[fund_blk][0]['fund_id']=='0'){
                                scope.block_hide[fund_blk] = 1;
                            }else{
                                angular.forEach(['资金收款结算信息','业务收款结算信息'],function(i){
                                    scope.block_hide[i] =1;
                                });
                            }
                            if(!_.isEmpty(scope.data[fund_blk])
                                &&!_.isUndefined(scope.data[fund_blk][0]['fund_id'])
                                &&scope.data[fund_blk][0]['fund_id']!='0'){
                                scope.data['SettleWayNonAccount'] = angular.copy(EnumSrvc['SettleWay']); 
                            }
                        }
                    });
                }

                if(scope.action == '新增业务退回单' || 
                    scope.action == '新增资金退回单'||
                    scope.action == '修改业务退回单'||
                    scope.action == '修改资金退回单'||
                    scope.action == '查看资金退回单'||
                    scope.action == '查看业务退回单'||
                    scope.action == '资金退回审批'||
                    scope.action == '业务退回审批'){
                    scope.block_hide = scope.block_hide||{};
                    angular.forEach(['入账详情','入账详情-查看'],function(fund_blk){
                        if(!_.isUndefined(scope.data[fund_blk])){
                            if(_.isEmpty(scope.data[fund_blk])
                                ||_.isUndefined(scope.data[fund_blk][0]['fund_id'])
                                ||scope.data[fund_blk][0]['fund_id']=='0'){
                                scope.block_hide[fund_blk] = 1;
                            }else{
                                angular.forEach(['资金退回结算信息','业务退回结算信息'],function(i){
                                    scope.block_hide[i] =1;
                                });
                            }
                            if(!_.isEmpty(scope.data[fund_blk])
                                &&!_.isUndefined(scope.data[fund_blk][0]['fund_id'])
                                &&scope.data[fund_blk][0]['fund_id']!='0'){
                                scope.data['SettleWayNonAccount'] = angular.copy(EnumSrvc['SettleWay']); 
                            }
                        }
                    });
                }

                scope.cfg.btn_hide = scope.cfg.btn_hide || {};
                angular.forEach(['添加借款供应商账户','添加支出供应商账户'],function(i){
                    scope.cfg.btn_hide[i] = 1;
                });
                if(scope.action == '新增业务支出单'||scope.action == '修改业务支出单'){
                    scope.cfg.btn_hide['添加支出供应商账户'] = 0;
                }
                if(scope.action == '新增业务借款单' || scope.action == '修改业务借款单'){
                    scope.cfg.btn_hide['添加借款供应商账户'] = 0;
                }
                scope.isEdit = false;
                var EditAction = ['新增业务收款单','修改业务收款单','新增资金收款单','修改资金收款单',
                                  '新增退业务收款单','修改退业务收款单','新增退资金收款单','修改退资金收款单'
                                  ,'新增业务借款单','修改业务借款单','新增资金借款单','修改资金借款单'
                                  ,'新增还款单','修改还款单','新增业务支出单','修改业务支出单'
                                  ,'新增资金支出单','修改资金支出单','新增业务内转单','修改业务内转单'
                                  ,'新增资金内转单','修改资金内转单','新增调整单','修改调整单'
                                  ,'新增扣款单','新增工资单','修改工资单','新增资金退回单'
                                  ,'修改资金退回单','新增业务退回单','修改业务退回单'];
                if(EditAction.indexOf(scope.action)!==-1){
                    scope.isEdit = true;
                }
            }           
            function select_sk_order_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                
                var cmp = 'cstm_id';
                var arr = _.pluck(selected,cmp);
                arr = _.uniq(arr);

                var cur = $rootScope.cur_scope();
                var assoc_store_id = cur.assoc_store_id;
                var pre = $rootScope.pre_scope();
                var old = pre.data[assoc_store_id];
                var settle_blk = '单据信息';
                var settle_fd = 'settle_obj_id';
                var order_related_fd = 'cstm_id';
                var order_related_val_fd = 'short_name';

                _.each(selected,function(item){
                    item.amount = 0;
                })
                pre.loadData(assoc_store_id,selected,'order_id');
                
                pre.data[settle_blk][0][settle_fd] = selected[0][order_related_fd];
                pre.data[settle_blk][0]['settle_obj'] = selected[0][order_related_val_fd];

                $rootScope.close_view();
                scope.calc_doc();
            }

            function change_settle_obj(row,col){
                scope.data['单据信息'][0].settle_obj_id = row[col.field];
                scope.data['单据信息'][0].settle_obj =
                        EnumSrvc['Department'][row[col.field]];
                scope.data['转款明细'][0].out_department_code =
                    EnumSrvc['DepartmentCode'][row[col.field]];
                scope.data['转款明细'][0].nz_pay_employee_id = 0;
            }

            // 将人民币金额变成大写
            function convertCurrency(money) {
                //汉字的数字
                var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
                //基本单位
                var cnIntRadice = new Array('', '拾', '佰', '仟');
                //对应整数部分扩展单位
                var cnIntUnits = new Array('', '万', '亿', '兆');
                //对应小数部分单位
                var cnDecUnits = new Array('角', '分', '毫', '厘');
                //整数金额时后面跟的字符
                var cnInteger = '整';
                //整型完以后的单位
                var cnIntLast = '元';
                //最大处理的数字
                var maxNum = 999999999999999.9999;
                //金额整数部分
                var integerNum;
                //金额小数部分
                var decimalNum;
                //输出的中文金额字符串
                var chineseStr = '';
                //分离金额后用的数组，预定义
                var parts;
                if (money == '') { return ''; }
                money = parseFloat(money);
                if (money >= maxNum) {
                    //超出最大处理数字
                    return '';
                }
                if (money == 0) {
                    chineseStr = cnNums[0] + cnIntLast + cnInteger;
                    return chineseStr;
                }
                //转换为字符串
                money = money.toString();
                if (money.indexOf('.') == -1) {
                    integerNum = money;
                    decimalNum = '';
                } else {
                    parts = money.split('.');
                    integerNum = parts[0];
                    decimalNum = parts[1].substr(0, 4);
                }
                //获取整型部分转换
                if (parseInt(integerNum, 10) > 0) {
                    var zeroCount = 0;
                    var IntLen = integerNum.length;
                    for (var i = 0; i < IntLen; i++) {
                        var n = integerNum.substr(i, 1);
                        var p = IntLen - i - 1;
                        var q = p / 4;
                        var m = p % 4;
                        if (n == '0') {
                            zeroCount++;
                        } else {
                            if (zeroCount > 0) {
                                chineseStr += cnNums[0];
                            }
                            //归零
                            zeroCount = 0;
                            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                        }
                        if (m == 0 && zeroCount < 4) {
                            chineseStr += cnIntUnits[q];
                        }
                    }
                    chineseStr += cnIntLast;
                }
                //小数部分
                if (decimalNum != '') {
                    var decLen = decimalNum.length;
                    for (var i = 0; i < decLen; i++) {
                        var n = decimalNum.substr(i, 1);
                        if (n != '0') {
                            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                        }
                    }
                }
                if (chineseStr == '') {
                    chineseStr += cnNums[0] + cnIntLast + cnInteger;
                } else if (decimalNum == '') {
                    chineseStr += cnInteger;
                }
                return chineseStr;
            }

            scope.change_settle_way = change_settle_way;
            function change_settle_way(row,col){
                var currency_ids = EnumSrvc['SettleWayCurrency'][row[col.field]];
                scope.data['可选币种'] = {};
                angular.forEach(EnumSrvc['Currency'],function(i,k){
                    if(currency_ids.indexOf(k)!==-1){
                        scope.data['可选币种'][k] = i ; 
                    }
                });
            }
            function calc_doc(){
                var amount =0;
                var receivable = 0;
                var received = 0;
                var receive_diff = 0;
                var invoiced = 0;
                var invoice_remain = 0;
                var payable = 0;
                var paid = 0;
                var pay_diff = 0;
                var related_zc_amount = 0;
                var settle = 0;
                var settled = 0;
                var diff = 0;
                var related_settle_amount = 0;
                var related_used = 0;
                var related_excess_amount = 0;
                var detail_blk = '单据信息';
                var fund_blk = '入账详情';
                angular.forEach(scope.data['收款订单'],function(i){
                    receivable += +i.receivable;
                    received += +i.received;
                    i.receive_diff = i.receive_diff||(parseFloat(i.receivable)-parseFloat(i.received));
                    receive_diff += +i.receive_diff;
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount || 0);
                    if(scope.data[fund_blk]&&!_.isEmpty(scope.data[fund_blk]
                        &&!_.isUndefined(scope.data[fund_blk][0]['fund_id'])
                        &&scope.data[fund_blk][0]['fund_id']!='0')){
                        scope.data[fund_blk][0]['amount'] = amount.toFixed(2);
                    }
                });
                angular.forEach(scope.data['退款订单'],function(i){
                    received += +i.received;
                    invoiced += +i.invoiced;
                    invoice_remain += +i.invoice_remain;
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount || 0);
                });
                angular.forEach(scope.data['退款调用押金'],function(i){
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount || 0);
                });

                angular.forEach(scope.data['借款核算'],function(i){
                    if(i.accounting_type == appConst.ACCOUNTING_ORDER_PAY){
                        settle += + i.settle_amount;
                        settled += + i.settled_amount;
                        diff += + i.settle_diff;
                    }
                    payable += + i.payable;
                    paid += + i.paid;
                    pay_diff += + i.pay_diff;
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount||0);
                });
                angular.forEach(scope.data['支出核算'],function(i){
                    if(i.accounting_type == appConst.ACCOUNTING_ORDER_PAY){
                        settle += + i.settle_amount;
                        settled += + i.settled_amount;
                        diff += + i.settle_diff;
                    }
                    payable += + i.payable;
                    paid += + i.paid;
                    pay_diff += + i.pay_diff;
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount||0);
                });
                angular.forEach(scope.data['内转核算'],function(i){
                    payable += + i.payable;
                    paid += + i.paid;
                    pay_diff += + i.pay_diff;
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount||0);
                });
                angular.forEach(scope.data['退回核算'],function(i){
                    payable += + i.payable;
                    paid += + i.paid;
                    pay_diff += + i.pay_diff;
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount||0);
                });
                angular.forEach(scope.data['转款明细'],function(i){
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    i.out_amount = i.amount;
                    amount += +(i.amount||0);
                });
                angular.forEach(scope.data['调整单据'],function(i){
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount||0);
                });
                angular.forEach(scope.data['扣款详情'],function(i){
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount);
                });
                angular.forEach(scope.data['退款调用资金收款'],function(i){
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount);
                });

                angular.forEach(scope.data['还款调用借款'],function(i){
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    amount += +(i.amount);
                });

                angular.forEach(scope.data['支出关联单据'],function(i){
                    i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                    i.excess_amount = ((parseFloat(i.amount)+parseFloat(i.used)-parseFloat(i.settle_amount))>0)?(parseFloat(i.amount)+parseFloat(i.used)-parseFloat(i.settle_amount)).toFixed(2):0;
                    related_settle_amount +=+ (i.settle_amount);
                    related_excess_amount +=+ (i.excess_amount);
                    related_used +=+ (i.used);
                    related_zc_amount +=+ (i.amount);
                });

                angular.forEach(scope.data['资金退回调用单据'],function(i){
                    amount += +(i.settle_amount);
                });

                angular.forEach({receivable:receivable,received:received,
                                receive_diff:receive_diff,amount:amount,
                                invoiced:invoiced,invoice_remain:invoice_remain
                                ,payable:payable,paid:paid
                                ,pay_diff:pay_diff
                                ,related_zc_amount:related_zc_amount
                                ,settle:settle,settled:settled,diff:diff
                                ,related_settle_amount:related_settle_amount
                                ,related_excess_amount:related_excess_amount,related_used:related_used
                            },function(item,key){
                    item = item.toFixed(2);
                    scope[key] = item;
                });

                // 获取金额中文大写
                var cn_amount = convertCurrency(scope.amount);
                // alert(cn_amount);return;

                if(scope.data[detail_blk]){
                    scope.data[detail_blk][0]['settle_amount'] = scope.amount;
                    scope.data[detail_blk][0]['cn_settle_amount'] = cn_amount;
                }
                if(scope.data['业务内转单据信息']){
                    scope.data['业务内转单据信息'][0]['settle_amount'] = scope.amount;
                    scope.data['业务内转单据信息'][0]['cn_settle_amount'] = cn_amount;
                }
                if(scope.data['退款单结算信息']){
                    scope.data['退款单结算信息'][0]['rmb_total'] = scope.amount;

                    scope.data['退款单结算信息'][0]['rate'] = scope.isEdit?EnumSrvc.CurrencyRate[scope.data['退款单结算信息'][0]['currency_id']]:scope.data['退款单结算信息'][0]['rate'];
                    if(scope.data['退款单结算信息'][0]['rmb_total']&&scope.data['退款单结算信息'][0]['rate']){
                        scope.data['退款单结算信息'][0]['local_currency_total'] = (scope.data['退款单结算信息'][0]['rmb_total']/scope.data['退款单结算信息'][0]['rate']).toFixed(2);
                    }
                }

                //结算信息部分
                angular.forEach({'借款结算信息':'单据信息','支出结算信息':'单据信息'
                                ,'资金支出结算信息':'资金支出单据信息'
                                ,'资金借款结算信息':'资金借款单据信息'
                                ,'资金退款单结算信息':'单据信息'
                                ,'工资单结算信息':'工资单单据信息'
                                ,'业务收款结算信息':'单据信息'
                                ,'业务退回结算信息':'单据信息'
                                ,'资金退回结算信息':'单据信息'},function(blk,settle_blk){
                    angular.forEach(scope.data[settle_blk],function(i){
                        i.rmb_total = scope.data[blk][0]['settle_amount'];
                        if(i.currency_id){
                            i.rate = scope.isEdit?(EnumSrvc.CurrencyRate[i.currency_id]):i.rate;
                            if(i.rmb_total
                                &&i.rate){
                                i.local_currency_total = (i.rmb_total/i.rate).toFixed(2);
                            }
                        }
                    });
                });
            }
            function zj_sk_settle_info_change(){
                if(scope.data['资金收款结算信息']){
                    var settle_info = scope.data['资金收款结算信息'][0];
                    if(settle_info.currency_id){
                        settle_info.rate = scope.isEdit?(EnumSrvc.CurrencyRate[settle_info.currency_id]):settle_info.rate;
                        if(settle_info.local_currency_total
                            &&settle_info.rate){
                            settle_info.rmb_total = (settle_info.local_currency_total*settle_info.rate).toFixed(2);
                            scope.data['单据信息'][0]['settle_amount'] = settle_info.rmb_total;
                            // 获取金额中文大写
                            var cn_amount = convertCurrency(settle_info.rmb_total);
                            scope.data['单据信息'][0]['cn_settle_amount'] = cn_amount;
                        }
                    }
                }
            }

            function settle_info_change(){
                angular.forEach({'资金支出结算信息':'资金支出单据信息'
                                ,'资金借款结算信息':'资金借款单据信息'
                                ,'工资单结算信息':'工资单单据信息'},function(blk,settle_blk){
                    if(scope.data[settle_blk]){
                        var settle_info = scope.data[settle_blk][0];
                        if(settle_info.currency_id){
                            settle_info.rate = scope.isEdit ?(EnumSrvc.CurrencyRate[settle_info.currency_id]):settle_info.rate;
                            if(settle_info.local_currency_total
                                &&settle_info.rate){
                                settle_info.rmb_total = (settle_info.local_currency_total*settle_info.rate).toFixed(2);
                                scope.data[blk][0]['settle_amount'] = settle_info.rmb_total;
                                // 获取金额中文大写
                                var cn_amount = convertCurrency(settle_info.rmb_total);
                                scope.data[blk][0]['cn_settle_amount'] = cn_amount;
                            }
                        }
                    }
                });
                scope.calc_doc();
            }
            function tk_settle_info_change(){
                if(scope.data['资金退款单结算信息']){
                    var settle_info = scope.data['资金退款单结算信息'][0];
                    if(settle_info.currency_id){
                        settle_info.rate = scope.isEdit ?(EnumSrvc.CurrencyRate[settle_info.currency_id]):settle_info.rate;
                        if(settle_info.local_currency_total
                            &&settle_info.rate){
                            settle_info.rmb_total = (settle_info.local_currency_total*settle_info.rate).toFixed(2);
                            scope.data['单据信息'][0]['settle_amount'] = settle_info.rmb_total;
                            // 获取金额中文大写
                            var cn_amount = convertCurrency(settle_info.rmb_total);
                            scope.data['单据信息'][0]['cn_settle_amount'] = cn_amount;

                            if(scope.data['退款调用资金收款']
                                &&!_.isEmpty(scope.data['退款调用资金收款'])){
                                scope.data['退款调用资金收款'][0].amount = settle_info.rmb_total;
                            }
                        }
                    }
                }
            }
            function calc_fund(){
                var amount = 0;
                if(!_.isEmpty(scope.data['入账详情'])
                    &&!_.isUndefined(scope.data['入账详情'][0]['fund_id'])
                    &&scope.data['入账详情'][0]['fund_id']!='0'){
                    angular.forEach(scope.data['入账详情'],function(i){
                        i.amount = i.amount?parseFloat(i.amount).toFixed(2):0;
                        amount +=+ i.amount;
                    });
                }else{
                    angular.forEach({'资金收款结算信息':'单据信息'},function(blk,settle_blk){
                        angular.forEach(scope.data[settle_blk],function(i){
                            i.rmb_total = scope.data[blk][0]['settle_amount'];
                            if(i.currency_id){
                                i.rate = scope.isEdit?(EnumSrvc.CurrencyRate[i.currency_id]):i.rate;
                                if(i.rmb_total
                                    &&i.rate){
                                    i.local_currency_total = (i.rmb_total/i.rate).toFixed(2);
                                    amount +=+ i.rmb_total;
                                }
                            }
                        });
                    });
                }

                if(scope.data['单据信息']){
                    scope.data['单据信息'][0]['settle_amount'] = amount.toFixed(2);
                    // 获取金额中文大写
                    var cn_amount = convertCurrency(amount.toFixed(2));
                    scope.data['单据信息'][0]['cn_settle_amount'] = cn_amount;
                }
            }
            function delete_sk_order_done(store_id,data){
                scope.delete_row(store_id,data);
                scope.calc_doc();
            }
            function delete_tk_order_done(store_id,data){
                scope.delete_row(store_id,data);
                scope.calc_doc();
            }
            function delete_acc_done(store_id,data){
                scope.delete_row(store_id,data);
                if(scope.data['内转核算']&&_.isEmpty(scope.data['内转核算'])){
                    if(scope.data['业务内转单据信息']){
                        scope.data['业务内转单据信息'][0].settle_obj_id = 0;
                        scope.data['业务内转单据信息'][0].settle_obj = '';
                    } 
                }
                if(scope.data['支出核算']&&_.isEmpty(scope.data['支出核算'])){
                    if(scope.data['单据信息']){
                        scope.data['单据信息'][0].settle_obj_id = 0;
                        scope.data['单据信息'][0].settle_obj = '';
                    } 
                }
                calc_doc();
            }
            function select_acc_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var cmp = '';
                angular.forEach(['pay_department_id','pay_supplier_id','pay_employee_id'],function(item){
                    if(selected[0][item]!='0'&&cmp == ''){
                        cmp = item;
                    }
                });
                var arr = _.pluck(selected,cmp);
                arr = _.uniq(arr);

                var cur = $rootScope.cur_scope();
                var assoc_store_id = cur.assoc_store_id;
                var pre = $rootScope.pre_scope();
                var old = pre.data[assoc_store_id];
                var settle_blk = '单据信息';
                var settle_fd = 'settle_obj_id';

                if(arr.length>1){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_SETTLE_OBJ'));
                    return;
                }
                var old = _.pluck(old,cmp);
                if(old.length && old[0] != arr[0]){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_SETTLE_OBJ'));
                    return;
                }
                _.each(selected,function(item){
                    item.amount = 0;
                })
                pre.loadData(assoc_store_id,selected,'accounting_id');
                
                pre.data[settle_blk][0][settle_fd] = selected[0][cmp];
                pre.data[settle_blk][0]['settle_obj'] = selected[0]['settle_obj'];
                //如果借款核算的结算对象为供应商
                if(cmp == 'pay_supplier_id'){
                    scope.pay_supplier_id = selected[0][cmp];
                }

                $rootScope.close_view();
                scope.calc_doc();
            }
            //内转核算 要么是本人的部门的核算 要么是结算部门是本人部门的核算
            function select_nz_acc_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var cmp = 'department_id';
                var arr = _.pluck(selected,cmp);
                arr = _.uniq(arr);
                if(arr.length>1){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_DEPARTMENT_ACC'));
                    return ; 
                }
                var cmp_department_id = selected[0][cmp];

                cmp = 'pay_department_id';
                arr = _.pluck(selected,cmp);
                arr = _.uniq(arr);
                if(arr.length>1){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_SETTLE_OBJ'));
                    return ;
                }
                var cmp_settle_obj = selected[0][cmp];

                if(cmp_settle_obj!=$rootScope.appUser.department_id
                    &&cmp_department_id!=$rootScope.appUser.department_id){
                    CommSrvc.error(I18nSrvc.get('YW_NZ_ACC_LIMIT'));
                    return ; 
                }

                var cur = $rootScope.cur_scope();
                var assoc_store_id = cur.assoc_store_id;
                var pre = $rootScope.pre_scope();
                var old = pre.data[assoc_store_id];
                var settle_blk = '业务内转单据信息';
                var settle_fd = 'settle_obj_id';

                _.each(selected,function(item){
                    item.amount = 0;
                })
                pre.loadData(assoc_store_id,selected,'accounting_id');

                if(cmp_settle_obj == $rootScope.appUser.department_id){
                    //如果是对我部门结算的核算 本内转结算对象为核算人部门
                    pre.data[settle_blk][0][settle_fd] = cmp_department_id;
                    pre.data[settle_blk][0]['settle_obj'] = selected[0]['department_name'];

                }else if(cmp_department_id == $rootScope.appUser.department_id){
                    //如果是对我部门的核算 本内转的结算对象为核算的结算部门
                    pre.data[settle_blk][0][settle_fd] = cmp_settle_obj;
                    pre.data[settle_blk][0]['settle_obj'] = selected[0]['settle_obj'];
                }
                
                $rootScope.close_view();
                scope.calc_doc(); 
            }

            function select_zc_acc_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var cmp = '';
                angular.forEach(['pay_department_id','pay_supplier_id','pay_employee_id'],function(item){
                    if(selected[0][item]!='0'&&cmp == ''){
                        cmp = item;
                    }
                });
                var arr = _.pluck(selected,cmp);
                arr = _.uniq(arr);

                var cur = $rootScope.cur_scope();
                var assoc_store_id = cur.assoc_store_id;
                var pre = $rootScope.pre_scope();
                var old = pre.data[assoc_store_id];
                var settle_blk = '单据信息';
                var settle_fd = 'settle_obj_id';

                if(arr.length>1){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_SETTLE_OBJ'));
                    return;
                }
                var old = _.pluck(old,cmp);
                if(old.length && old[0] != arr[0]){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_SETTLE_OBJ'));
                    return;
                }
                //只能添加同类型的核算
                old = pre.data[assoc_store_id];
                old = _.pluck(old,'accounting_type');
                arr = _.uniq(_.pluck(selected,'accounting_type'));
                if(arr.length>1){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_ACC_TYPE'));
                    return;
                }
                if(old.length&&old[0]!=arr[0]){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_ACC_TYPE'));
                    return;    
                }
                //
                var new_cols = [];
                if(selected[0].accounting_type == appConst.ACCOUNTING_ORDER_PAY){
                    new_cols = [
                        {field:'settle_amount',cfg:{text:I18nSrvc.get('SETTLEABLE'),ro:1,foot:'settle'}},
                        {field:'settled_amount',cfg:{text:I18nSrvc.get('SETTLED'),ro:1,trigger:['选择查看类型'],foot:'settled'}},
                        {field:'settle_diff',cfg:{text:I18nSrvc.get('SETTLE_DIFF'),ro:1,foot:'diff'}},
                    ];
                    redraw(assoc_store_id,scope.gridCfg[assoc_store_id].columnDefs,new_cols,'sign_up_employee_id','settle_obj');
                    
                }else{
                    new_cols = [{field:'group_num',cfg:{text:I18nSrvc.get('GROUP_NUM'),ro:1,trigger:['团队总览']}}];
                    redraw(assoc_store_id,scope.gridCfg[assoc_store_id].columnDefs,new_cols,'pd_name','order_id');
                }
                //
                _.each(selected,function(item){
                    item.amount = 0;
                    if((selected[0].accounting_type == appConst.ACCOUNTING_ORDER_PAY) && (item.order_kind == appConst.ORDER_EVENT)){ // 对账订单并且是活动专线
                        item.settle_amount = item.receivable;
                        item.settled_amount = item.received;
                        item.settle_diff = item.receive_diff;
                    }
                });
                pre.loadData(assoc_store_id,selected,'accounting_id');
                
                pre.data[settle_blk][0][settle_fd] = selected[0][cmp];
                pre.data[settle_blk][0]['settle_obj'] = selected[0]['settle_obj'];
                if(cmp == 'pay_supplier_id'){
                    scope.pay_supplier_id = selected[0][cmp];
                }
 
                $rootScope.close_view();
                scope.calc_doc();
            }
            function select_jk_acc_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var cmp = '';
                angular.forEach(['pay_department_id','pay_supplier_id','pay_employee_id'],function(item){
                    if(selected[0][item]!='0'&&cmp == ''){
                        cmp = item;
                    }
                });
                var arr = _.pluck(selected,cmp);
                arr = _.uniq(arr);

                var cur = $rootScope.cur_scope();
                var assoc_store_id = cur.assoc_store_id;
                var pre = $rootScope.pre_scope();
                var old = pre.data[assoc_store_id];
                var settle_blk = '单据信息';
                var settle_fd = 'settle_obj_id';

                if(arr.length>1){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_SETTLE_OBJ'));
                    return;
                }
                var old = _.pluck(old,cmp);
                if(old.length && old[0] != arr[0]){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_SETTLE_OBJ'));
                    return;
                }
                //只能添加同类型的核算
                old = pre.data[assoc_store_id];
                old = _.pluck(old,'accounting_type');
                arr = _.uniq(_.pluck(selected,'accounting_type'));
                if(arr.length>1){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_ACC_TYPE'));
                    return;
                }
                if(old.length&&old[0]!=arr[0]){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_ACC_TYPE'));
                    return;    
                }
                //
                var new_cols = [];
                if(selected[0].accounting_type == appConst.ACCOUNTING_ORDER_PAY){
                    new_cols = [
                        {field:'settle_amount',cfg:{text:I18nSrvc.get('SETTLEABLE'),ro:1,foot:'settle'}},
                        {field:'settled_amount',cfg:{text:I18nSrvc.get('SETTLED'),ro:1,trigger:['选择查看类型'],foot:'settled'}},
                        {field:'settle_diff',cfg:{text:I18nSrvc.get('SETTLE_DIFF'),ro:1,foot:'diff'}},
                    ];
                    redraw(assoc_store_id,scope.gridCfg[assoc_store_id].columnDefs,new_cols,'sign_up_employee_id','settle_obj');
                }else{
                    new_cols = [{field:'group_num',cfg:{text:I18nSrvc.get('GROUP_NUM'),ro:1,trigger:['团队总览']}}];
                    redraw(assoc_store_id,scope.gridCfg[assoc_store_id].columnDefs,new_cols,'pd_name','order_id');
                }
                //
                _.each(selected,function(item){
                    item.amount = 0;
                    // 对账订单并且是活动专线 把 订单，应收，已收，未收读为 应转，已转，未转
                    if((selected[0].accounting_type == appConst.ACCOUNTING_ORDER_PAY) && (item.order_kind == appConst.ORDER_EVENT)){ // 对账订单并且是活动专线
                        item.settle_amount = item.receivable;
                        item.settled_amount = item.received;
                        item.settle_diff = item.receive_diff;
                    }
                });
                pre.loadData(assoc_store_id,selected,'accounting_id');
                
                pre.data[settle_blk][0][settle_fd] = selected[0][cmp];
                pre.data[settle_blk][0]['settle_obj'] = selected[0]['settle_obj'];
                if(cmp == 'pay_supplier_id'){
                    scope.pay_supplier_id = selected[0][cmp];
                }
 
                $rootScope.close_view();
                scope.calc_doc();
            }
        }

        function redraw(store_id,cols,new_cols,start_field,end_field){
            var start = 0;
            var end =0 ;
            var block_cfg_fields = _.keys($rootScope.blocks[store_id].list);
            var delete_fields = [];
            for (var i in cols) {
                if(!_.isUndefined(cols[i].field)&&block_cfg_fields.indexOf(cols[i].field)===-1){
                    delete_fields.push(cols[i].field);
                }
            }
            angular.forEach(delete_fields,function(field){
                for(var i in cols){
                    if(cols[i].field == field){
                        cols.splice(i,1);
                        break;
                    }
                }
            });
            for (var i in cols) {
                if(cols[i].field == start_field){
                    start = +i;
                }
                
                if(cols[i].field == end_field){
                    end = +i;
                    break;
                }
            }
            if(start == end){
                return ;
            }
            if(_.isEmpty(new_cols)){
                return ;
            }
            angular.forEach(new_cols,function(col,key){
                cols.splice(start+key+1,0,FieldSrvc.get_col(col.field,col.cfg));
            });
        }

        function add_sup_account(store_id,data,meta,action){
            var scope = $rootScope.cur_scope();
            if(!scope.pay_supplier_id){
                return ;
            }
            $rootScope.trigger('选择供应商账户',meta,store_id,{supplier_id:scope.pay_supplier_id});
        }
        function select_tk_ref_doc_done(){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            AjaxSrvc.get('/fin/DocRead/read_transfer',{id:selected[0].id}).then(function(data){
                var scope = $rootScope.pre_scope();
                scope.loadData('退款订单',data['退款订单']);
                // scope.loadData('退款单结算信息',data['入账详情']);
                scope.loadData($rootScope.cur_scope().assoc_store_id,selected);
                scope.data['单据信息'][0].settle_obj_id = selected[0].settle_obj_id;
                scope.data['单据信息'][0].settle_obj = selected[0].settle_obj;
                scope.data['对方账户'][0].to_user_name = selected[0].remitter;
                scope.calc_doc();
                $rootScope.close_view();
            });
        }

        function select_tz_ref_doc_done(){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var cur_scope = $rootScope.cur_scope();
            var pre_scope = $rootScope.pre_scope();
            pre_scope.loadData(cur_scope.assoc_store_id,selected);
            pre_scope.calc_doc();
            $rootScope.close_view();
        }

        function select_tk_ref_yj_done(){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var scope = $rootScope.pre_scope();
            scope.loadData($rootScope.cur_scope().assoc_store_id,selected);
            scope.data['单据信息'][0].settle_obj_id = selected[0].settle_obj_id;
            scope.data['单据信息'][0].settle_obj = selected[0].settle_obj;
            scope.calc_doc();
            $rootScope.close_view();
        }

        function select_cstm_done(){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var cur = $rootScope.cur_scope();
            var detail = $rootScope.pre_scope().data[cur.assoc_store_id][0];
            detail.settle_obj_id = selected[0].id;
            detail.settle_obj = selected[0].short_name;
            $rootScope.close_view();
        }

        function choose_sup_account(scope){
            var block = scope.cfg.block[0];
            scope.block = block;
            scope.gridSel = {};
            scope.gridCfg ={};
            scope.gridCfg[block] = {
                columnDefs:FieldSrvc.get_mod_col($rootScope.blocks[block],block,1),
                data:scope.data[block],
                enableColumnMenus: false,
                enableHorizontalScrollbar: $rootScope.gridScroll,
                enableVerticalScrollbar: $rootScope.gridScroll,
                enableRowHeaderSelection:true,
                multiSelect: false,
                onRegisterApi : function(gridApi){
                    gridApi.selection.on.rowSelectionChangedBatch(null,function(row){
                        scope.gridSel = gridApi.selection.getSelectedRows();
                    });  
                    gridApi.selection.on.rowSelectionChanged(null,function(row){
                        scope.gridSel = gridApi.selection.getSelectedRows();
                    });
                }
            };
            scope.submit = function(){
                var gridSel = scope.gridSel;
                if(!gridSel||!gridSel.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var pre_scope = $rootScope.pre_scope();
                var store_id = scope.assoc_store_id;
                pre_scope.data[store_id][0]['to_bank'] = gridSel[0]['bank'];
                pre_scope.data[store_id][0]['to_user_name'] = gridSel[0]['bank_account_name'];
                pre_scope.data[store_id][0]['to_account_num'] = gridSel[0]['bank_account']+'';
                pre_scope.data[store_id][0]['city'] = gridSel[0]['city'];
                pre_scope.data[store_id][0]['country'] = gridSel[0]['country'];
                $rootScope.close_view();
            }
        }


       
        // function choose_settle_obj(scope){
        //     var selected = $rootScope.cur_scope().data[scope.assoc_store_id];
        //     scope.data = {settle_obj_type:'Supplier'};

        //     scope.submit = function(){
        //         var data = scope.data;
        //         if(!(data.settle_obj_id > 0)){
        //             CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
        //             return;
        //         }
        //         angular.forEach(selected,function(item){
        //             if(data.settle_obj_type == 'Supplier'){
        //                 item.supplier_id = data.settle_obj_id;
        //                 $rootScope.trigger('选择供应商账户',{},null,{supplier_id:item.supplier_id});
        //             }else{
        //                 item.pay_employee_id = data.settle_obj_id;
        //             }
        //             item.settle_obj = data.settle_obj;
        //         });
        //         $rootScope.close_view();
        //     }
        // }

        // function receivable_export(scope){


        //     var required_filter = [{field:'dep_date_from',type:'date',text:'DEP_DATE_FROM'},
        //                             {field:'dep_date_to',type:'date',text:'DEP_DATE_TO'}];
        //     var optional_filter = [{field:'company_id',type:'Company',text:'SIGN_COMPANY'},
        //                             {field:'department_id',type:'Department',text:'SIGN_DEPARTMENT','cascade':'company_id'},
        //                             {field:'employee_id',type:'Employee',text:'SIGN_EMPLOYEE','cascade':'department_id'},
        //                             {field:'assitant_company_id',type:'Company',text:'ASSITANT_COMPANY'},
        //                             {field:'assitant_department_id',type:'Department',text:'ASSITANT_DEPARTMENT','cascade':'assitant_company_id'},
        //                             {field:'assitant_employee_id',type:'Employee',text:'ASSITANT_EMPLOYEE','cascade':'assitant_department_id'},
        //                             {field:'pd_type_id',type:'ProductType',text:'PD_TYPE'},
        //                             {field:'dep_city_id',type:'City',text:'DEP_CITY'},
        //                             {field:'receive_diff',type:'HaveId',text:'DEBT'},];
        //     var key_word = [{field:'group_num',text:'GROUP_NUM'},
        //                     {field:'id',text:'ORDER_ID'},
        //                     {field:'retail_short_name',text:'RETAIL_SHORT_NAME'},];

        //     var search = {};

        //     scope.required_filter = required_filter;
        //     scope.optional_filter = optional_filter;
        //     scope.key_word = key_word;
        //     scope.search = search;
        //     scope.preview = function(){
        //         if((_.isEmpty(search.dep_date_from)||_.isEmpty(search.dep_date_to))
        //                 &&(_.isEmpty(search.key_value))){
        //                 CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
        //                 return ;
        //         }
        //         if(!_.isEmpty(search.dep_date_from)&&!_.isEmpty(search.dep_date_to)){
        //             var start_date = new Date(search.dep_date_from);
        //             var end_date = new Date(search.dep_date_to);
        //             var start = start_date.getTime()/1000;
        //             var end = end_date.getTime()/1000;
        //             var interval = end - start;
        //             if(interval > 3600 * 24 * 30 * 3 || interval < 0) {
        //                 CommSrvc.info(I18nSrvc.get('DATE_INTERVAL_ERROR'));
        //                 return ;
        //             }
        //         }
        //         search[search.key_field] = search.key_value;
        //         $rootScope.close_view();
        //         $rootScope.trigger('应收导出预览',{},null,{search:search});
                
        //     }
        // }
        // function receivable_export_preview(scope){
        //     scope.action_map ={
        //         '应收导出选择':export_receivable_select,
        //         '应收导出全部':export_receivable_all
        //     }
        //     function export_receivable_select(store_id,data,meta,action){
        //         var selected = $rootScope.cur_scope().selected;
        //         if(!selected||!selected.length){
        //             CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
        //             return;
        //         }
        //         window.open(appConst.HOST + '/fin/DocReceivable/export?action=' + action +'&ids=' + _.pluck(selected,'id'));
        //     }
        //     function export_receivable_all(store_id,data,meta,action){
        //         var parmas = {} ;
        //         for(var key in scope.search){
        //             if(_.isString(scope.search[key])){
        //                 parmas[key] = scope.search[key];
        //             }
        //         }
        //         parmas['mod'] = scope.search['mod'];
        //         window.open(appConst.HOST + '/fin/DocReceivable/export?action=' + action+'&' + $rootScope.toQueryString(parmas));
        //     }
        // }





        // function payable_export(scope){

        //     var required_filter = [{field:'dep_date_from',type:'date',text:'DEP_DATE_FROM'},
        //                             {field:'dep_date_to',type:'date',text:'DEP_DATE_TO'}];
        //     var optional_filter = [{field:'manage_company_id',type:'Company',text:'MANAGE_COMPANY'},
        //                             {field:'manage_department_id',type:'Department',text:'MANAGE_DEPARTMENT','cascade':'manage_company_id'},
        //                             {field:'manage_employee_id',type:'Employee',text:'MANAGE','cascade':'manage_department_id'},
        //                             {field:'company_id',type:'Company',text:'ACC_COMPANY'},
        //                             {field:'department_id',type:'Department',text:'ACC_DEPARTMENT','cascade':'company_id'},
        //                             {field:'employee_id',type:'Employee',text:'ACC_EMPLOYEE','cascade':'department_id'},
        //                             {field:'pd_type_id',type:'ProductType',text:'PD_TYPE'},
        //                             {field:'dep_city_id',type:'City',text:'DEP_CITY'},
        //                             {field:'paid_diff',type:'HaveId',text:'DEBT'},];
        //     var key_word = [{field:'group_num',text:'GROUP_NUM'},
        //                     {field:'id',text:'ACC_ID'},
        //                     {field:'settle_obj',text:'SETTLE_OBJ'},];

        //     var search = {};

        //     scope.required_filter = required_filter;
        //     scope.optional_filter = optional_filter;
        //     scope.key_word = key_word;
        //     scope.search = search;

        //     scope.preview = function(){
        //         if((_.isEmpty(search.dep_date_from)||_.isEmpty(search.dep_date_to))
        //                 &&(_.isEmpty(search.key_value))){
        //                 CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
        //                 return ;
        //         }
        //         if(!_.isEmpty(search.dep_date_from)&&!_.isEmpty(search.dep_date_to)){
        //             var start_date = new Date(search.dep_date_from);
        //             var end_date = new Date(search.dep_date_to);
        //             var start = start_date.getTime()/1000;
        //             var end = end_date.getTime()/1000;
        //             var interval = end - start;
        //             if(interval > 3600 * 24 * 30 * 3 || interval < 0) {
        //                 CommSrvc.info(I18nSrvc.get('DATE_INTERVAL_ERROR'));
        //                 return ;
        //             }
        //         }
        //         search[search.key_field] = search.key_value;
        //         $rootScope.close_view();
        //         $rootScope.trigger('应付导出预览',{},null,{search:search});
        //     }
        // }

        // function payable_export_preview(scope){
        //     scope.action_map ={
        //         '应付导出选择':export_payable_select,
        //         '应付导出全部':export_payable_all
        //     }
        //     function export_payable_select(store_id,data,meta,action){
        //         var selected = $rootScope.cur_scope().selected;
        //         if(!selected||!selected.length){
        //             CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
        //             return;
        //         }
        //         var ids = _.pluck(selected, 'id');
        //         window.open(appConst.HOST + '/fin/DocPayable/export?action=' + action +'&ids=' + ids.join(','));
        //     }

        //     function export_payable_all(store_id,data,meta,action){
        //         var parmas = {} ;
        //         for(var key in scope.search){
        //             if(_.isString(scope.search[key])){
        //                 parmas[key] = scope.search[key];
        //             }
        //         }
        //         parmas['mod'] = scope.search['mod'];
        //         window.open(appConst.HOST + '/fin/DocPayable/export?action=' + action+'&' +  $rootScope.toQueryString(parmas));
        //     }
        // }
        //导出
        function export_word(store_id,data,meta,action){
            var doc = [];
            var scope = $rootScope.cur_scope();
            if(scope.data['单据信息']){
                doc = scope.data['单据信息'];
            }
            if(scope.data['预付单据信息']){
                doc = scope.data['预付单据信息'];
            }
            if(scope.data['预收单据信息']){
                doc = scope.data['预收单据信息'];
            }
            if(scope.data['借票收款单据信息']){
                doc = scope.data['借票收款单据信息'];
            }
            if(_.isEmpty(doc)){
                CommSrvc.error(I18nSrvc.get('DOC_TYPE_ERR'));
                return;
            }
            window.open(appConst.HOST + '/fin/Doc/export_word?action=' + action +'&id=' + doc[0].id);
        }

        //完善单据
        function doc_improve(action,meta,cfg,store_id,data) {
            switch(data.doc_type_id){
                case appConst.DOC_ORDER_SK:
                case appConst.DOC_ZJ_SK:
                    $rootScope.trigger('完善单据-收款',meta,store_id,data);
                    break;
                case appConst.DOC_YW_JK:
                case appConst.DOC_ZJ_JK:
                    $rootScope.trigger('完善单据-借款',meta,store_id,data);
                    break; 
                case appConst.DOC_ACC_ZC:
                case appConst.DOC_ZJ_ZC:
                    $rootScope.trigger('完善单据-支出',meta,store_id,data);
                    break;
                case appConst.DOC_YJ_TK:
                case appConst.DOC_YW_TK:
                case appConst.DOC_ZJ_TK:
                    $rootScope.trigger('完善单据-退款',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }

        //导出账目
        function doc_export(scope){
            var mod_cfg = $rootScope.mods['收支审批']||{};
            var s_regular = angular.copy(mod_cfg.s_regular);
            var s_text = angular.copy(mod_cfg.s_text);

            //var required_filter = {};
            var optional_filter = {};
            var select_filter = {};

            //angular.forEach(['submit_from','submit_to'],function(field){
            //    required_filter[field] = s_regular[field]||{};
            //});

            angular.forEach([
                            'submit_from'
                            ,'submit_to'
                            ,'approved_from'
                            ,'approved_to'
                            ,'company_id'
                            ,'settle_way_id'
                            ,'department_id'
                            ,'flow'
                            ,'employee_id'
                            ,'currency_id'
                            ],function(field){
                optional_filter[field] = s_regular[field]||{};
                optional_filter[field]['mod'] = '收支审批';
            });
            
            // 多选
            select_filter['doc_type_id'] = s_regular['doc_type_id'];
            var search = {};

            //scope.required_filter = required_filter;
            scope.optional_filter = optional_filter;
            scope.select_filter = select_filter;

            
            scope.search = search;
            scope.preview = function(){
                //if((_.isEmpty(search.submit_from)||_.isEmpty(search.submit_to)) ){
                //    CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
                //    return ;
                //}
                //search['limit'] = 999;
                search['limit'] = 100;
                if(!_.isEmpty(search['doc_type_id'])){
                    search['doc_type_id'] = search['doc_type_id'].join(',');
                }
                $rootScope.close_view();
                $rootScope.trigger('账目导出预览',{},null,{search:search});

            }
        }
        //导出支出
        function export_expense(scope){
            var mod_cfg = $rootScope.mods['收支审批-支出']||{};
            var s_regular = [];
            var s_regular = angular.copy(mod_cfg.s_regular);
            var s_text = angular.copy(mod_cfg.s_text);
            
            //var required_filter = {};
            var optional_filter = {};
            var select_filter = {};

            //angular.forEach(['submit_from','submit_to'],function(field){
            //    required_filter[field] = s_regular[field]||{};
            //});

            angular.forEach(['submit_from'
                            ,'submit_to'
                            ,'approved_from'
                            ,'approved_to'
                            ,'company_id'
                            ,'settle_way_id'
                            ,'department_id'
                            ,'flow'
                            ,'employee_id'
                            ,'currency_id'
                            ],function(field){
                optional_filter[field] = s_regular[field]||{};
                optional_filter[field]['mod'] = '收支审批-支出';
            });
            
            // 多选
            select_filter['doc_type_id'] = s_regular['doc_type_id'];
            var search = {};

            //scope.required_filter = required_filter;
            scope.optional_filter = optional_filter;
            scope.select_filter = select_filter;

            
            scope.search = search;
            scope.preview = function(){
                //if((_.isEmpty(search.submit_from)||_.isEmpty(search.submit_to)) ){
                //    CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
                //    return ;
                //}
                //search['limit'] = 999;
                search['limit'] = 100;
                if(!_.isEmpty(search['doc_type_id'])){
                    search['doc_type_id'] = search['doc_type_id'].join(',');
                }
                $rootScope.close_view();
                $rootScope.trigger('导出支出预览',{},null,{search:search});
            }
        }
        function export_receipts(action,meta,cfg,store_id,data){
            var rec = [];
            var scope = $rootScope.cur_scope();
            if(scope.data['扣款单据信息']){
                rec = scope.data['扣款单据信息'];
            }
            if(scope.data['调整单据信息']){
                rec = scope.data['调整单据信息'];
            }   
            if(scope.data['单据信息']){
                rec = scope.data['单据信息'];
            }
            if(scope.data['资金借款单据信息']){
                rec = scope.data['资金借款单据信息'];
            }
            if(scope.data['资金支出单据信息']){
                rec = scope.data['资金支出单据信息'];
            }
            if(scope.data['业务内转单据信息']){
                rec = scope.data['业务内转单据信息'];
            }
            if(_.isEmpty(rec)){
                CommSrvc.error(I18nSrvc.get('DOC_TYPE_ERR'));
                return;
            }
            window.open(appConst.HOST + '/fin/DocExport/export_receipts?action=' + action +'&id=' + rec[0].id);
        }

        // function group_variable(scope){

        //     scope.load = function(){
        //         AjaxSrvc.get(scope.cfg.read.url,{group_id:scope.ref.id}).then(function(response){
        //             scope.loadData('团队收入',response['团队收入']);
        //             scope.loadData('团队成本',response['团队成本']);
        //             scope.loadData('团队利润',response['团队利润']);
        //         });
        //     }
        // }

        // function settle_lock_set(scope){
        //     var mdata = {
        //         id:scope.ref.id,
        //         settle_state_order:scope.ref.settle_state_order,
        //         settle_state_acc:scope.ref.settle_state_acc
        //     };
        //     scope.data = mdata;
        // }

        // function settle_comment(scope){
        //     var mdata = {
        //         id:scope.ref.id,
        //         value:scope.ref.settle_comment
        //     };
        //     scope.data = mdata;
        // }

        // function settle_export(scope){

        //     var required_filter = [{field:'dep_date_from',type:'date',text:'DEP_DATE_FROM'},
        //                             {field:'dep_date_to',type:'date',text:'DEP_DATE_TO'}];
        //     var optional_filter = [{field:'company_id',type:'Company',text:'MANAGE_COMPANY'},
        //                             {field:'department_id',type:'Department',text:'MANAGE_DEPARTMENT','cascade':'company_id'},
        //                             {field:'employee_id',type:'Employee',text:'MANAGE','cascade':'department_id'},
        //                             {field:'settle_flow',type:'Flow',text:'SETTLE_FLOW'},];
        //     var key_word = [{field:'group_num',text:'GROUP_NUM'},
        //                     {field:'pd_name',text:'PD_NAME'},];

        //     var search = {};
        //     scope.search = search;
        //     scope.key_word = key_word;
        //     scope.optional_filter = optional_filter;
        //     scope.required_filter = required_filter;
        //     scope.preview = function preview(){
        //         if((_.isEmpty(search.dep_date_from)||_.isEmpty(search.dep_date_to))
        //                 &&(_.isEmpty(search.key_value))){
        //                 CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
        //                 return ;
        //         }
        //         if(!_.isEmpty(search.dep_date_from)&&!_.isEmpty(search.dep_date_to)){
        //             var start_date = new Date(search.dep_date_from);
        //             var end_date = new Date(search.dep_date_to);
        //             var start = start_date.getTime()/1000;
        //             var end = end_date.getTime()/1000;
        //             var interval = end - start;
        //             if(interval > 3600 * 24 * 30 * 3 || interval < 0) {
        //                 CommSrvc.info(I18nSrvc.get('DATE_INTERVAL_ERROR'));
        //                 return ;
        //             }
        //         }
        //         search[search.key_field] = search.key_value;
        //         $rootScope.close_view();
        //         $rootScope.trigger('结团导出预览',{},null,{search:search});
        //     }
        // }

        // function settle_export_preview(scope){
        //     scope.action_map ={
        //         '结团导出选择':export_settle_select,
        //         '结团导出全部':export_settle_all
        //     }
        //     function export_settle_select(store_id,data,meta,action){
        //         var selected = $rootScope.cur_scope().selected;
        //         if(!selected||!selected.length){
        //             CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
        //             return;
        //         }
        //         var ids = _.pluck(selected, 'id');
        //         window.open(appConst.HOST + '/op/GroupSettlement/settlement_export?action=' + action +'&ids=' + ids.join(','));
        //     }

        //     function export_settle_all(store_id,data,meta,action){
        //         var parmas = {} ;
        //         for(var key in scope.search){
        //             if(_.isString(scope.search[key])){
        //                 parmas[key] = scope.search[key];
        //             }
        //         }
        //         parmas['mod'] = scope.search['mod'];
        //         window.open(appConst.HOST + '/op/GroupSettlement/settlement_export?action=' + action+'&' +  $rootScope.toQueryString(parmas));
        //     }
        // }

        // function advance_receive_see(scope){
        //     scope.init = function(){
        //         scope.amount = 0;
        //         angular.forEach(scope.data['预收调用明细'],function(item){
        //             scope.amount +=+ item.amount;
        //         });
        //     }
        // }

        // function advance_pay_see(scope){
        //     scope.init = function(){
        //         scope.amount = 0;
        //         angular.forEach(scope.data['预付调用明细'],function(item){
        //             scope.amount +=+ item.amount;
        //         });
        //     }
        // }
        // function advance_receice_overview(scope){
        //     scope.action_map = {
        //         '客户预收':cstm_advance_rec,
        //     };
        //     function cstm_advance_rec(store_id,data,meta,action){
        //          var search = {retailer_id:data.id};
        //          $rootScope.trigger('查看客户预收',meta,null,{search:search});
        //     }
        // }

        // function advance_pay_overview(scope){
        //     scope.action_map = {
        //         '供应商预付':sup_advance_pay,
        //     };
        //     function sup_advance_pay(store_id,data,meta,action){
        //         var search = {};
        //         if(data.supplier_id){
        //              search = {supplier_id:data.id};
        //         }else{
        //             search = {pay_employee_id:data.id};
        //         }
                
        //         $rootScope.trigger('查看供应商预付',meta,null,{search:search});
        //     }
        // }
        function batch_op_fund(scope){
            scope.submit  = function(){
                var pre = $rootScope.pre_scope();
                var selected = pre.gridSel[scope.assoc_store_id];
                angular.forEach(selected,function(item){
                    angular.forEach(['settle_way_id','settle_bank_id','settle_date','currency_id'],function(key){
                        if(!_.isUndefined(scope.data[key])&&!_.isEmpty(scope.data[key])){
                            item[key] = scope.data[key];
                        }
                    });
                });
                $rootScope.close_view();
            }
        }
        function select_fund_done(action,meta,cfg,store_id,data){
            var selected = angular.copy($rootScope.cur_scope().selected);
            if(!CommSrvc.chk_sel(selected)){
                return;
            }
            var pre = $rootScope.pre_scope();
            var scope = $rootScope.cur_scope();
            _.each(selected,function(item){
                item.amount =pre.amount||0;
            });
            pre.loadData(scope.assoc_store_id,selected);
            //需要修改前一个scope的edit_path
            pre.data['SettleWayNonAccount'] = angular.copy(EnumSrvc['SettleWay']);
            $rootScope.close_view();
        }
        
        // 退款选定资金收款单
        function select_tk_ref_zjsk_done(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var scope = $rootScope.pre_scope();
            selected[0].amount = scope.data['单据信息'][0].settle_amount||0;
            scope.loadData($rootScope.cur_scope().assoc_store_id,selected);
            scope.data['单据信息'][0].settle_obj_id = selected[0].settle_obj_id;
            scope.data['单据信息'][0].settle_obj = selected[0].settle_obj;
            scope.data['对方账户'][0].to_user_name = selected[0].remitter;
            $rootScope.close_view();
        }

        function add_formula(scope){
            scope.data = {
                type:'FormulaType',
            };
            scope.submit = function(){
                var data = scope.data;
                var formula_type = '';
                var action = '';
                if(data.formula_type){
                    switch(data.formula_type){
                        case appConst.KK_FORMULA_DX:
                            formula_type = appConst.KK_FORMULA_DX;
                            action  = '新增单项扣款公式';
                            break;
                        case appConst.KK_FORMULA_JT:
                            formula_type = appConst.KK_FORMULA_JT;
                            action = '新增阶梯扣款公式';
                            break;
                        default:
                            CommSrvc.error(I18nSrvc.get('DOC_TYPE_ERR'));
                            return;
                    }
                    var params = {};
                    params['formula_type'] = formula_type;
                    $rootScope.close_view();
                    $rootScope.trigger(action,{text:scope.text},null,params);
               }else{
                    CommSrvc.error(I18nSrvc.get('DOC_TYPE_ERR'));
                    return;
               }
            }
        }
        function formula_modify(action,meta,cfg,store_id,data){
            switch(data.formula_type){
                case appConst.KK_FORMULA_DX:
                    $rootScope.trigger('修改单项扣款公式',meta,store_id,data)
                    break;
                case appConst.KK_FORMULA_JT:
                    $rootScope.trigger('修改阶梯扣款公式',meta,store_id,data)
                    break;
                default:
                    CommSrvc.error(I18nSrvc.get('INVAILD_FORMULA_TYPE'));
                    break;
            }
        }
        function dx_formula_edit(scope){
            scope.init = function(){
                if(!_.isEmpty(scope.data.formula)){
                    scope.data.formula = angular.fromJson(scope.data.formula);
                }
            }
        }
        function ladder_formula_edit(scope){
            scope.init = function(){
                var formula = angular.fromJson(scope.data.formula);
                if(!_.isNull(formula)&&!_.isUndefined(formula)){
                    scope.data.range_arr = formula.range_arr||[];
                    scope.data.upper = formula.upper||0;
                    scope.data.scale = formula.scale||0;
                    scope.data.fee_scale = formula.fee_scale||0;
                }else{
                    scope.data.range_arr = [];
                }
            }
            scope.range_add = function(){
                var range = {};
                scope.data.range_arr.push(range);
            }

            scope.range_delete = function(index){
                if(index>=1){
                    scope.data.range_arr.splice(index, 1);
                }else{
                    return false;
                }
            }
        }
        function settle_way_edit(scope){
            scope.init = function(){
                var _data = angular.copy(scope.data);
                if(!_.isEmpty(_data.kk_calc_formula)){
                    _data.kk_calc_formula = angular.fromJson(_data.kk_calc_formula);
                }
                scope.row = scope.data;
                scope.data = _data;
            }
        }
        function settle_way_bind(scope){
            scope.init = function(){
                var _data = angular.copy(scope.data);
                scope.row = scope.data;
                _data.multi_type = 'Currency';
                _data.multi_text=I18nSrvc.get('CURRENCY');
                if(_data.applicable_currency_see_type){
                    _data.multi_selected = angular.isString(_data.applicable_currency_see_type)?angular.fromJson(_data.applicable_currency_see_type):_data.applicable_currency_see_type;
                }
                scope.data = _data;
            }
        }
        function import_fund_excel(action,meta,cfg,store_id,data){
            var el = $("#comm_upload");
                el.unbind('change');
                el.bind('change', function (changeEvent) {
                  var reader = new FileReader();
                  var results = [];
                  reader.onload = function (e) {
                    try {
                         var bstr = e.target.result;
                         var workbook = XLSX.read(bstr, {type:'binary'});
                        } catch (e) {
                            CommSrvc.error(e);
                            return;
                        }
                        var fromTo = '';
                        for (var sheet in workbook.Sheets) {
                            if (workbook.Sheets.hasOwnProperty(sheet)) {
                                fromTo = workbook.Sheets[sheet]['!ref'];
                                results = results.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                                break;
                            }
                        }
                        el.val('');
                        $timeout(function(){
                            var number_check = true;
                            var error_column =0;

                            angular.forEach(results,function(v,k){
                                if(_.isUndefined(v['到账金额'])
                                    ||_.isEmpty(v['到账金额'])
                                    ||_.isNull(v['到账金额'].match(/^\d+([,.]\d+)*$/))
                                    ||_.isUndefined(v['汇款方名称'])
                                    ||_.isEmpty(v['汇款方名称'])){
                                    number_check = false;
                                    error_column = k+2;
                                }
                            });
                            if(!number_check){
                                CommSrvc.error(I18nSrvc.get('EXIST_INVALID_NUMBER')
                                    +'('+error_column+')'+I18nSrvc.get('ROW'));
                                return;
                            }
                            var scope = $rootScope.cur_scope();
                            if(results.length>scope.data['资金编辑'].length){
                                var length = results.length - scope.data['资金编辑'].length ;
                                for (var i = 0; i<length; i++) {
                                    scope.add_row('资金编辑',{},{});
                                }
                            }
                            angular.forEach(results,function(v,k){
                                scope.data['资金编辑'][k]['arrived_amount'] = v['到账金额'].replace(',','');
                                scope.data['资金编辑'][k]['remitter'] = v['汇款方名称'];
                            });
                        });
                    };
                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });
            el.click();
        }
        function selected_kk_department_done(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var departments = [];
            angular.forEach(selected,function(item){
                var department = {};
                angular.forEach(['company_id'],function(key){
                    department[key] = item[key];
                });
                department['pay_department_id'] = item['id'];
                departments.push(department);
            });
            $rootScope.pre_scope().loadData($rootScope.cur_scope().assoc_store_id,departments);
            $rootScope.close_view();
        }

        function setting_kk_items(scope){
            scope.init = function(){
                scope.setting_items = {
                    settle_amount:{ type:'number',label:I18nSrvc.get("SETTLE_AMOUNT"),field: 'settle_amount'},
                    deduct_comment:{ type:'text',label:I18nSrvc.get("DEDUCT_COMMENT"),field: 'deduct_comment'},                            
                };
            }

            scope.submit = function(){
                var pre_scope = $rootScope.pre_scope();
                var selected = $rootScope.pre_scope().gridSel[scope.assoc_store_id];
                angular.forEach(selected,function(item){
                    item['settle_amount'] = scope.data.settle_amount;
                    item['deduct_comment'] = scope.data.deduct_comment;
                });
                //pre_scope.calc_doc();
                $rootScope.close_view();
            };
        }
        function import_kk_excel(action,meta,cfg,store_id,data){
            var el = $("#comm_upload");
                el.unbind('change');
                el.bind('change', function (changeEvent) {
                  var reader = new FileReader();
                  var results = [];
                  reader.onload = function (e) {
                    try {
                        var bstr = e.target.result;
                        var workbook = XLSX.read(bstr, {type:'binary'});
                    } catch (e) {
                        CommSrvc.error(e);
                        return;
                    }
                    var fromTo = '';
                    for (var sheet in workbook.Sheets) {
                        if (workbook.Sheets.hasOwnProperty(sheet)) {
                            fromTo = workbook.Sheets[sheet]['!ref'];
                            results = results.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                            break;
                        }
                    }
                    el.val('');
                        $timeout(function(){
                            var number_check = true;
                            var code_check = true;
                            var error_column =0;
                            angular.forEach(results,function(v,k){
                                if(_.isUndefined(v['金额'])
                                    ||_.isEmpty(v['金额'])
                                    ||_.isNull(v['金额'].match(/^\d+([,.]\d+)*$/))){
                                    number_check = false;
                                    error_column = k+2;
                                }
                            });
                            if(!number_check){
                                CommSrvc.error(I18nSrvc.get('EXIST_INVALID_NUMBER')
                                    +'('+error_column+')'+I18nSrvc.get('ROW'));
                                return;
                            }
                            var scope = $rootScope.cur_scope();
                            if(results.length>scope.data['扣款详情'].length){
                                var length = results.length - scope.data['扣款详情'].length ;
                                for (var i = 0; i<length; i++) {
                                    scope.add_row('扣款详情',{},{});
                                }
                            }
                            angular.forEach(results,function(v,k){
                                AjaxSrvc.get('/org/Department/read_department_id',{code:v['部门编号']}).then(function(data){
                                    if(_.isEmpty(data)){
                                       error_column = k+2;
                                       code_check = false;
                                    } else{
                                        scope.data['扣款详情'][k]['pay_department_id'] = data['id'];
                                        scope.data['扣款详情'][k]['code'] = v['部门编号'];
                                        scope.data['扣款详情'][k]['settle_amount'] = v['金额'];
                                        scope.data['扣款详情'][k]['deduct_comment'] = v['备注'];
                                    }
                                    if(!code_check){
                                        CommSrvc.error(I18nSrvc.get('DEPARTMENT_CODE_ERROR')
                                                +'('+error_column+')'+I18nSrvc.get('ROW'));
                                        return;
                                    }
                                });
                            });
                        });
                    };
                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });
            el.click();
        }
        function search_for_fund(scope){
            scope.submit = function(){
                var search = scope.data;
                if(_.isEmpty(search.settle_date_from)
                    ||_.isEmpty(search.settle_date_to)
                    ||_.isEmpty(search.currency_id)
                    ||_.isEmpty(search.settle_way_id)
                    ||_.isEmpty(search.arrived_amount)){
                        CommSrvc.info(I18nSrvc.get(
                            'SEARCH_CONDTION_CANT_EMPTY'));
                        return ;
                }

                //$rootScope.close_view();
                $rootScope.trigger('资金查询',null,null,{search:search});
            }
        }
        function selected_fund_done_search(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            if(!(scope.selected && scope.selected.length)){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            AjaxSrvc.submit(cfg.submit.url,{funds:_.pluck(scope.selected,'id')}).then(function(res)
            {
                CommSrvc.info(res.message);
                $rootScope.pre_scope().load();
                $rootScope.close_view();
            });
        }

        function regulatory_details(action,meta,cfg,store_id,data){
            var search = {};
            search['see_department_id'] = data.id;
            $rootScope.trigger('查看监管明细',{text:data.company_name+' - '+data.name},null,{search:search});
        }

        function log_see(scope){
            scope.init = function(){
                angular.forEach(scope.data['数据日志'],function(item){
                    if(!_.isEmpty(item['additional'])){
                        item['before'] = EnumSrvc[item['additional']][item['before']]||item['before'];
                        item['after'] = EnumSrvc[item['additional']][item['after']]||item['after'];
                    }
                });
            }
        }

        function doc_related_msg(scope){
            scope.data.related_msg = [
                {text:'REF_DOC',field:'ref_doc_id'},
                {text:'REF_TZ_DOC',field:'ref_tz_doc_id_see'},
                {text:'REF_INVOICE',field:'ref_invoice_id'}
            ];
        }

        function settle_acc_batch(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();

            if(!(scope.gridSel && scope.gridSel[store_id] && scope.gridSel[store_id].length)){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var selected = scope.gridSel[store_id];
            angular.forEach(selected,function(item){
                item.amount = item.pay_diff;
            });
            scope.calc_doc();
        }
        function sk_settle_acc_batch(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            if(!(scope.gridSel && scope.gridSel[store_id] && scope.gridSel[store_id].length)){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var selected = scope.gridSel[store_id];
            angular.forEach(selected,function(item){
                item.amount = item.receive_diff;
            });
            scope.calc_doc();
        }
        function hk_select_jk_done(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            selected[0].amount = 0;//selected[0].invoice_total;
            var pre = $rootScope.pre_scope();
            var cur = $rootScope.cur_scope();
            pre.loadData(cur.assoc_store_id,selected);
            angular.forEach(['settle_obj','cstm_id','supplier_id','pay_employee_id','pay_department_id'],function(key){
                pre.data['单据信息'][0][key] = selected[0][key];
            });
            pre.data['单据信息'][0]['settle_amount'] = 0;//selected[0].invoice_total;
            $rootScope.close_view();
        }
        function account_export_selected(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var ids = _.pluck(selected,'id');
            window.open(appConst.HOST + '/fin/DocExport/export?action=' + action +'&ids=' + _.pluck(selected,'id'));
        }
        function account_export_all(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var parmas = {} ;
            for(var key in scope.search){
                if(_.isString(scope.search[key])){
                    parmas[key] = scope.search[key];
                }
            }
            parmas['mod'] = scope.search['mod'];
            window.open(appConst.HOST + '/fin/DocExport/export?action=' + action+'&' + $rootScope.toQueryString(parmas));
        }
        function account_export_page(scope){
            var preview_scope = $rootScope.cur_scope();
            var mod_cfg = $rootScope.mods['收支审批']||{};
            var s_regular = angular.copy(mod_cfg.s_regular);
            var required_filter = {};
            angular.forEach(['page_from','page_to'],function(field){
                required_filter[field] = s_regular[field]||{};
            });
            var search = {};
            scope.required_filter = required_filter;

            var parmas = {} ;
            scope.export_page = function() {
                var totalpage = Math.ceil(preview_scope.total / preview_scope.search['limit']);
                if (_.isEmpty(scope.data['page_from']) || _.isEmpty(scope.data['page_to'])) {
                    CommSrvc.info(I18nSrvc.get('REQUIRED_EMPTY'));
                    return;
                }
                if (scope.data['page_from'] <= 0 || scope.data['page_to'] <= 0) {
                    CommSrvc.info(I18nSrvc.get('REQUIRED_ROLE'));
                    return;
                }
                if(scope.data['page_from']>scope.data['page_to']){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_START'));
                    return ;
                }
                if(scope.data['page_from']>totalpage || scope.data['page_to']>totalpage){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_OVER'));
                    return ;
                }
                if (!/^\d+$/.test(scope.data['page_from']) || !/^\d+$/.test(scope.data['page_to'])){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_POSITIVE_NUMBER'));
                    return;
                }
                if((scope.data['page_to']-scope.data['page_from'])*preview_scope.search['limit']>5000){
                    if(preview_scope.search['limit'] == 50){
                        CommSrvc.info(I18nSrvc.get('REQUIRED_LIMIT_100'));
                    }else if(preview_scope.search['limit'] == 100){
                        CommSrvc.info(I18nSrvc.get('REQUIRED_LIMIT_50'));
                    }else if(preview_scope.search['limit'] == 200){
                        CommSrvc.info(I18nSrvc.get('REQUIRED_LIMIT_25'));
                    }
                    return ;
                }
                scope.search = preview_scope.search;
                scope.search['page_from'] = scope.data['page_from'];
                scope.search['page_to'] = scope.data['page_to'];
                for(var key in scope.search){
                    if(_.isString(scope.search[key])){
                        parmas[key] = scope.search[key];
                    }
                    if(_.isNumber(scope.search[key])){
                        parmas[key] = scope.search[key];
                    }
                }
                var action='账目导出全部分页';
                delete parmas['action'];
                window.open(appConst.HOST + '/fin/DocExport/export?action=' + action+'&' + $rootScope.toQueryString(parmas));
            }
        }

        function export_expense_selected(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var ids = _.pluck(selected,'id');
            window.open(appConst.HOST + '/fin/DocExport/export_expense?action=' + action +'&ids=' + _.pluck(selected,'id'));
        }
        function export_expense_all(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var parmas = {} ;
            for(var key in scope.search){
                if(_.isString(scope.search[key])){
                    parmas[key] = scope.search[key];
                }
            }
            parmas['mod'] = scope.search['mod'];
            window.open(appConst.HOST + '/fin/DocExport/export_expense?action=' + action+'&' + $rootScope.toQueryString(parmas));
        }
        function export_expense_page(scope){
            var preview_scope = $rootScope.cur_scope();

            var mod_cfg = $rootScope.mods['收支审批-支出']||{};
            var s_regular = angular.copy(mod_cfg.s_regular);
            var required_filter = {};
            angular.forEach(['page_from','page_to'],function(field){
                required_filter[field] = s_regular[field]||{};
            });
            var search = {};
            scope.required_filter = required_filter;

            var parmas = {} ;
            scope.export_page = function(){
                var totalpage = Math.ceil(preview_scope.total/preview_scope.search['limit']);
                if(_.isEmpty(scope.data['page_from']) || _.isEmpty(scope.data['page_to'])){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_EMPTY'));
                    return ;
                }
                if(scope.data['page_from']<=0 || scope.data['page_to']<=0){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_ROLE'));
                    return ;
                }
                if(scope.data['page_from']>scope.data['page_to']){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_START'));
                    return ;
                }
                if(scope.data['page_from']>totalpage || scope.data['page_to']>totalpage){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_OVER'));
                    return ;
                }
                if (!/^\d+$/.test(scope.data['page_from']) || !/^\d+$/.test(scope.data['page_to'])){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_POSITIVE_NUMBER'));
                    return;
                }
                if((scope.data['page_to']-scope.data['page_from'])*preview_scope.search['limit']>5000){
                    if(preview_scope.search['limit'] == 50){
                        CommSrvc.info(I18nSrvc.get('REQUIRED_LIMIT_100'));
                    }else if(preview_scope.search['limit'] == 100){
                        CommSrvc.info(I18nSrvc.get('REQUIRED_LIMIT_50'));
                    }else if(preview_scope.search['limit'] == 200){
                        CommSrvc.info(I18nSrvc.get('REQUIRED_LIMIT_25'));
                    }
                    return ;
                }
                scope.search = preview_scope.search;
                scope.search['page_from'] = scope.data['page_from'];
                scope.search['page_to'] = scope.data['page_to'];
                for(var key in scope.search){
                    if(_.isString(scope.search[key])){
                        parmas[key] = scope.search[key];
                    }
                    if(_.isNumber(scope.search[key])){
                        parmas[key] = scope.search[key];
                    }
                }
                var action='导出支出全部分页';
                delete parmas['action'];
                window.open(appConst.HOST + '/fin/DocExport/export_expense?action=' + action+'&' + $rootScope.toQueryString(parmas));
            }
        }

        function selected_zc_related_doc_done(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return ;
            }
            var params = {ids:_.pluck(selected,'id').join(',')};
            AjaxSrvc.get('/fin/DocRead/read_call_nz',params).then(function(res){
                if(!_.isEmpty(res['关联信息'])){
                    var pre = $rootScope.pre_scope();
                    pre.loadData($rootScope.cur_scope().assoc_store_id,res['关联信息'],'doc_id');
                    pre.calc_doc();
                    $rootScope.close_view();
                }

            });
            
        }
        function add_zj_sk_for_fund(action,meta,cfg,store_id,data){
            var params = {};
            var docblk = '单据信息';
            var fundblk = '入账详情';
            var new_action = '新增资金收款单';
            var fund_info = angular.copy(data);
            fund_info.amount = fund_info.used_diff;
            params[docblk] = [{'doc_type_id':appConst.DOC_ZJ_SK,
                       'employee_name':$rootScope.appUser.employee_name,
                       'code':$rootScope.appUser.department_code,
                       'settle_obj':$rootScope.appUser.department_name}];
            params[fundblk] = [fund_info];
            if(action == '资金收款单-认领'){
                $rootScope.close_view();
            }
            $rootScope.trigger(new_action,meta,null,params);
        } 
        function add_yw_sk_for_fund(action,meta,cfg,store_id,data){
            var params = {};
            var docblk = '单据信息';
            var fundblk = '入账详情';
            var new_action = '新增业务收款单';
            var fund_info = angular.copy(data);
            fund_info.amount = fund_info.used_diff;
            params[docblk] = [{'doc_type_id':appConst.DOC_ORDER_SK,
                       'employee_name':$rootScope.appUser.employee_name,
                       'code':$rootScope.appUser.department_code}];
            params[fundblk] = [fund_info];
            if(action=='业务收款单-认领'){
                $rootScope.close_view();
            }
            $rootScope.trigger(new_action,meta,null,params);
        }
        function add_zj_return_for_fund(action,meta,cfg,store_id,data){
            var params = {};
            var docblk = '单据信息';
            var fundblk = '入账详情';
            var new_action = '新增资金退回单';
            var fund_info = angular.copy(data);
            fund_info.amount = fund_info.used_diff;
            params[docblk] = [{'doc_type_id':appConst.DOC_ZJ_TH,
                       'employee_name':$rootScope.appUser.employee_name,
                       'code':$rootScope.appUser.department_code}];
            params[fundblk] = [fund_info];
            if(action=='资金退回单-认领'){
                $rootScope.close_view();
            }
            $rootScope.trigger(new_action,meta,null,params);
        } 
        function add_yw_return_for_fund(action,meta,cfg,store_id,data){
            var params = {};
            var docblk = '单据信息';
            var fundblk = '入账详情';
            var new_action = '新增业务退回单';
            var fund_info = angular.copy(data);
            fund_info.amount = fund_info.used_diff;
            params[docblk] = [{'doc_type_id':appConst.DOC_YW_TH,
                       'employee_name':$rootScope.appUser.employee_name,
                       'code':$rootScope.appUser.department_code}];
            params[fundblk] = [fund_info];
            if(action=='业务退回单-认领'){
                $rootScope.close_view();
            }
            $rootScope.trigger(new_action,meta,null,params);
        }
        function export_nz_approve(scope){
            var mod_cfg = $rootScope.mods['内转审批']||{};
            var s_regular = [];
            var s_regular = angular.copy(mod_cfg.s_regular); 
            //var required_filter = {};
            var optional_filter = {};
            var select_filter = {};
            //angular.forEach(['approved_from','approved_to'],function(field){
            //    required_filter[field] = s_regular[field]||{};
            //});
            angular.forEach(['approved_from'
                            ,'approved_to'
                            ,'doc_type_id'
                            ,'company_id'
                            ,'department_id'
                            ,'employee_id'
                            ,'nz_pay_company_id'
                            ,'nz_pay_department_id'
                            ,'nz_pay_employee_id'
                            ,'flow'
                            ],function(field){
                optional_filter[field] = s_regular[field]||{};
                optional_filter[field]['mod'] = '内转审批';
            });
            select_filter['doc_type_id'] = s_regular['doc_type_id'];
            var search = {};

            //scope.required_filter = required_filter;
            scope.optional_filter = optional_filter;
            scope.select_filter = select_filter;  
            scope.search = search;
            scope.preview = function(){
                //if((_.isEmpty(search.approved_from)||_.isEmpty(search.approved_to)) ){
                //    CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
                //    return ;
                //}
                //search['limit'] = 999;
                search['limit'] = 100;
                if(!_.isEmpty(search['doc_type_id'])){
                    search['doc_type_id'] = search['doc_type_id'].join(',');
                }
                $rootScope.close_view();
                $rootScope.trigger('导出内转单据预览',{},null,{search:search});
            }
        }
        function export_nz_doc_selected(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var ids = _.pluck(selected,'id');
            window.open(appConst.HOST + '/fin/DocExport/export_nz?action=' + action +'&ids=' + _.pluck(selected,'id'));
        }
        function export_nz_doc_all(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var parmas = {} ;
            for(var key in scope.search){
                if(_.isString(scope.search[key])){
                    parmas[key] = scope.search[key];
                }
            }
            parmas['mod'] = scope.search['mod'];
            window.open(appConst.HOST + '/fin/DocExport/export_nz?action=' + action+'&' + $rootScope.toQueryString(parmas));
        }
        function export_nz_doc_page(scope){
            var preview_scope = $rootScope.cur_scope();
            var mod_cfg = $rootScope.mods['内转审批']||{};
            var s_regular = angular.copy(mod_cfg.s_regular);
            var required_filter = {};
            angular.forEach(['page_from','page_to'],function(field){
                required_filter[field] = s_regular[field]||{};
            });
            var search = {};
            scope.required_filter = required_filter;

            var parmas = {} ;
            scope.export_page = function(){
                var totalpage = Math.ceil(preview_scope.total/preview_scope.search['limit']);
                if(_.isEmpty(scope.data['page_from']) || _.isEmpty(scope.data['page_to'])){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_EMPTY'));
                    return ;
                }
                if(scope.data['page_from']<=0 || scope.data['page_to']<=0){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_ROLE'));
                    return ;
                }
                if(scope.data['page_from']>scope.data['page_to']){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_START'));
                    return ;
                }
                if(scope.data['page_from']>totalpage || scope.data['page_to']>totalpage){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_OVER'));
                    return ;
                }
                if (!/^\d+$/.test(scope.data['page_from']) || !/^\d+$/.test(scope.data['page_to'])){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_POSITIVE_NUMBER'));
                    return;
                }
                if((scope.data['page_to']-scope.data['page_from'])*preview_scope.search['limit']>5000){
                    if(preview_scope.search['limit'] == 50){
                        CommSrvc.info(I18nSrvc.get('REQUIRED_LIMIT_100'));
                    }else if(preview_scope.search['limit'] == 100){
                        CommSrvc.info(I18nSrvc.get('REQUIRED_LIMIT_50'));
                    }else if(preview_scope.search['limit'] == 200){
                        CommSrvc.info(I18nSrvc.get('REQUIRED_LIMIT_25'));
                    }
                    return ;
                }
                scope.search = preview_scope.search;
                scope.search['page_from'] = scope.data['page_from'];
                scope.search['page_to'] = scope.data['page_to'];
                for(var key in scope.search){
                    if(_.isString(scope.search[key])){
                        parmas[key] = scope.search[key];
                    }
                    if(_.isNumber(scope.search[key])){
                        parmas[key] = scope.search[key];
                    }
                }
                var action='导出内转单据全部分页';
                delete parmas['action'];
                window.open(appConst.HOST + '/fin/DocExport/export_nz?action=' + action+'&' + $rootScope.toQueryString(parmas));
            }
        }
        function delete_related_zc_doc(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            scope.delete_row(store_id,data);
            scope.calc_doc();
        }
        // function add_kk_deparment(scope){
        //     var _data = scope.data;
        //     var data = {type:'FullDepartment'};
        //     scope.data = data;
        //     scope.submit = function(){
        //         var departments = [];
        //         angular.forEach(data.selected,function(item){
        //             departments.push({pay_department_id:item});
        //         });
        //         $rootScope.pre_scope().loadData($rootScope.cur_scope().assoc_store_id,departments);
        //         $rootScope.close_view();
        //     }
        // }
        function selected_department_done_kk(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var pre = $rootScope.pre_scope();   
            var departments = [];
            angular.forEach(selected,function(item){
                var department = {};
                angular.forEach(['id','code'],function(key){
                    department[key] = item[key];
                });
                department['pay_department_id'] = item['id'];
                delete department.id;
                departments.push(department);
            });
            pre.loadData('扣款详情',departments,'pay_department_id');
            $rootScope.close_view();
        }
        function yw_th_select_doc_done(action,meta,cfg,store_id,data){
            var selected =$rootScope.cur_scope().selected;
            AjaxSrvc.get('/fin/DocRead/read_yw_th_related_doc',{'id':selected[0]['id']}).then(function(data){
                var scope = $rootScope.pre_scope();
                scope.loadData($rootScope.cur_scope().assoc_store_id,selected);
                scope.loadData('退回核算',data['退回核算']);
                scope.data['单据信息'][0]['settle_obj_id'] = selected[0].settle_obj_id;
                scope.data['单据信息'][0]['settle_obj'] = selected[0].settle_obj;
                if(!_.isEmpty(scope.data['入账详情'][0])){
                    scope.data['入账详情'][0]['amount'] = selected[0].settle_amount;
                }
                scope.calc_doc();
                $rootScope.close_view();
            });
        }
        function delete_yw_th_select_doc(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            scope.delete_row(store_id,data);
            scope.loadData('退回核算',[]);
            scope.data['单据信息'][0]['settle_obj_id'] = 0;
            scope.data['单据信息'][0]['settle_obj'] = '';
            scope.calc_doc();
        }
        function zj_th_select_doc_done(action,meta,cfg,store_id,data){
            var scope = $rootScope.pre_scope();
            var selected = $rootScope.cur_scope().selected;
            scope.loadData($rootScope.cur_scope().assoc_store_id,selected);
            scope.data['单据信息'][0]['settle_obj_id'] = selected[0].settle_obj_id;
            scope.data['单据信息'][0]['settle_obj'] = selected[0].settle_obj;
            if(!_.isEmpty(scope.data['入账详情'][0])){
                scope.data['入账详情'][0]['amount'] = selected[0].settle_amount;
            }
            scope.calc_doc();
            $rootScope.close_view();
        }
        function delete_zj_th_select_doc(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            scope.delete_row(store_id,data);
            scope.data['单据信息'][0]['settle_obj_id'] = 0;
            scope.data['单据信息'][0]['settle_obj'] = '';
            scope.calc_doc();
        }
        function approve_frequency(scope){
            var mod_cfg = $rootScope.mods['收支审批统计']||{};
            var s_regular = [];
            var s_regular = angular.copy(mod_cfg.s_regular);
            var s_text = angular.copy(mod_cfg.s_text);
            
            var required_filter = {};
            var optional_filter = {};
            var select_filter = {};

            angular.forEach(['approve_at_from','approve_at_to'],function(field){
                required_filter[field] = s_regular[field]||{};
            });

            angular.forEach(['submit_from'
                            ,'submit_to'
                            ,'company_id'
                            ,'department_id'
                            ,'employee_id'
                            ],function(field){
                optional_filter[field] = s_regular[field]||{};
                optional_filter[field]['mod'] = '收支审批统计';
            });
            
            // 多选
            select_filter['doc_type_id'] = s_regular['doc_type_id'];
            var search = {'mod':'收支审批统计'};

            scope.required_filter = required_filter;
            scope.optional_filter = optional_filter;
            scope.select_filter = select_filter;

            scope.search = search;
            scope.submit = function(){
                if((_.isEmpty(search.approve_at_from)||_.isEmpty(search.approve_at_to)) ){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
                    return ;
                }
                if(!_.isEmpty(search['doc_type_id'])){
                    search['doc_type_id'] = search['doc_type_id'].join(',');
                }
                $rootScope.close_view();
                window.open(appConst.HOST + '/fin/DocExport/export_approve_frequency?action=' + scope.action+'&' + $rootScope.toQueryString(scope.search));
            }
        }
    }
})();