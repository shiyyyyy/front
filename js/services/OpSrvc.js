(function() {
    'use strict';

    angular
    .module('app')
    .factory('OpSrvc', OpSrvc);

    OpSrvc.$inject = ['AjaxSrvc', 'CommSrvc','FieldSrvc','I18nSrvc','$rootScope','$compile','$timeout','appConst','EnumSrvc','$uibModal'];
    function OpSrvc(AjaxSrvc, CommSrvc, FieldSrvc,I18nSrvc,$rootScope,$compile,$timeout,appConst,EnumSrvc,$uibModal){

        return {

            //团队预算
            '新增团队':group_edit,
            '活动开团':group_edit,
            '修改预算':group_edit,
            '修改预算-活动':group_edit,
            '新增团队-同业':group_edit,
            '修改预算-同业':group_edit,
            '活动开团-同业':group_edit,
            '修改预算-同业活动':group_edit,
            '修改预算-同业上架管理':edit_group_ty,
            '修改预算-上架管理':edit_group,

            '产品开团':group_edit,
            '批量设置':batch_settings,                       
            '团队批量成本':set_batch_group_num,
            '团队批量填价':set_price_bacth,
            '团队批量截止':set_deadline_bacth,
            '修改控团人':group_manager_modify,
            '修改控团人-同业':group_manager_modify,

            //订单
            '订单占位时限':order_reserved,
            '订单付款时限':order_pay_reserved,
            '同业订单应转审批':order_approve,
            '订单应转审批':order_approve,
            '订单应转新增内转单':order_busneiss_nz_approve,
            '订单名单-设置':order_tourist_set_lock_state,
            '编辑订单手动优惠':order_mandual_edit,
            '录入订单手动优惠':order_mandual_add,
            '审批订单手动优惠':order_mandual_approve,


            '订单应付核算':order_pay,
            '订单应付核算-同部':order_pay_acc_tb,
            '订单应付核算-异部':order_pay_acc_yb,
            '录入订单应付明细':add_order_payable,
            '查看订单应付明细':order_payable_see,
            '查看订单对账明细':order_payable_see,
            '停用优惠协议':disable_discount,



            '查看订单-操作中心':order_see,
            '查看订单-操作中心-订单对账':order_see_check_up,
            '查看订单-应付管理':pay_acc_see_order,
            '查看订单-同业活动':order_detail,
            '查看订单-同业异部':order_detail,
            '查看订单-自营异部':order_detail,
            '查看订单-同业同部':order_detail,
            '查看订单-自营同部':order_detail,

            '查看订单-同业异部-订单对账':order_detail,
            '查看订单-自营异部-订单对账':order_detail,
            '查看订单-同业同部-订单对账':order_detail,
            '查看订单-自营同部-订单对账':order_detail,
            '查看订单-同业活动-订单对账':order_detail,



            //
            '应转提交':order_settle_submit,
            '计调订单提交':order_pay_submit,

            //订单核算
            '订单核算编辑':order_acc,
            '订单核算-异部-同业':order_acc_edit,
            '订单核算-异部-自营':order_acc_edit,
            '订单核算-同部-同业':order_acc_edit,
            '订单核算-同部-自营':order_acc_edit,
            '录入订单核算明细':add_order_acc,
            '查看订单核算明细':order_acc_see,
            '订单核算审批':order_acc_edit,

            //分团设置
            '新增分团设置':pd_subtag_dist,
            '修改分团设置':pd_subtag_dist,
            //上架
            '分配预算':dist_budget,
            '选择团队-批量分配预算':select_group_batch_budget,

            '订单应转审批-同部':approve_detail,
            '订单应转审批-异部':approve_detail,
            '订单应转审批-活动':approve_detail,

            //团队管控
            '修改库存': group_modify,
            '修改库存-同业':group_modify,
            '团队改价': group_edit_price,
            '团队改价-同业':group_edit_price,
            '团队改价-活动专区':group_edit_price,
            '批量改价-活动专区':batch_edit_modify_price,
            '批量改价':group_edit_price_batch,
            '批量改价-同业':group_edit_price_batch,
            '批量下架团队':group_under_shelf_batch,
            '批量下架团队-同业':group_under_shelf_batch,
            '团队活动设置':group_event_set,
            '批量设置活动':setting_dct_bacth,
            '新增团期':group_add,
            '天天发团':daliy_leave,
            '按周发团':weekly_leave,
            '可否新增团期':is_add_group_ok,
            '可否新增订单核算':is_add_order_acc_ok,
            '取消团队活动优惠':group_event_cancel,
            '批量删除团队-活动设置':delete_batch_event,
            '库存点击-团队管理':seat_total_click_group_manager,

            //订单时限
            '订单时限设置':order_timer_setting,
            '同业订单时限设置':order_timer_setting,
            '上传产品行程':upload_product_attach,
            '上传产品行程-同业':upload_product_attach,
            //单团
            '单团指定':group_specify,
            '查看应付总计':order_payable_statistics,
            '结团审批':group_settle_approve,
            '订单核算总计':order_accounting_statistics,
            '查看应付总计-查看明细':order_payable_total_detail,
            '查看对账总计-查看明细':order_acc_check_total_detail,
            '查看订单核算总计-查看明细':order_acc_total_detail,

            '导出受理订单':export_order,
            '导出全部受理订单':export_order_all,
            '导出选中受理订单':export_order_select,
            '导出全部受理订单分页':export_order_page,

            '对账确认导出':export_affirm_order,
            '对账导出预览':export_affirm_order_view,
            '订单转交':change_assitant,
            '添加协议新行':add_new_row,
            '删除协议行':delete_xy_row,
            '点击应付':click_yf,
            '可否批量改价活动团':enable_batch_edit_price,
            '导出团队名单':export_tourist_list,
        };
        function click_yf(store_id,data){
            var scope = $rootScope.cur_scope();
            if (scope.action == '订单应付核算-异部' || scope.action == '订单应付核算-同部') {
                $rootScope.trigger('录入订单应付明细');
            }
        }
        // bug 4143  导出订单你对账
        function export_affirm_order(scope){

            var mod_cfg = $rootScope.mods['订单对账']||{};
            var s_regular = angular.copy(mod_cfg.s_regular);
            var s_text = angular.copy(mod_cfg.s_text);

            var required_filter = {};
            var optional_filter = {};
            // var key_word = {};

            angular.forEach(['dep_date_from','dep_date_to'],function(field){
                required_filter[field] = s_regular[field]||{};
            });

            angular.forEach(['assitant_company_id','assitant_department_id','assitant_id',
                            'company_id','department_id','employee_id',
                            'submit_from','submit_to','pay_flow'],function(field){
                optional_filter[field] = s_regular[field]||{};
                optional_filter[field]['mod'] = '订单对账';
            });
            // angular.forEach(['settle_obj','settle_amount'],function(field){
            //     key_word[field] = s_text[field]||{}; 
            // });

            var search = {};

            scope.required_filter = required_filter;
            scope.optional_filter = optional_filter;
            scope.search = search;
            scope.preview = function(){
                if(_.isEmpty(search.dep_date_from) || _.isEmpty(search.dep_date_to)){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
                    return ;
                }
                // search[search.key_field] = search.key_value;
                search['limit'] = 999;
                $rootScope.close_view();
                $rootScope.trigger('对账导出预览',{},null,{search:search});
                
            }
        }
        
        function export_affirm_order_view(scope){
            scope.action_map ={
                '对账导出选择':select_export_affirm_order,
                '对帐导出全部':all_export_affirm_order,
            }
            
            function select_export_affirm_order(store_id,data,meta,action){
                var selected = $rootScope.cur_scope().selected;
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                window.open(appConst.HOST + '/sale/OrderExport/export_affirm_order?action=' + action +'&ids=' + _.pluck(selected,'id'));
            }
            function all_export_affirm_order(store_id,data,meta,action){
                var parmas = {} ;
                for(var key in scope.search){
                    if(_.isString(scope.search[key])){
                        parmas[key] = scope.search[key];
                    }
                }
                parmas['mod'] = scope.search['mod'];
                window.open(appConst.HOST + '/sale/OrderExport/export_affirm_order?action=' + action+'&' + $rootScope.toQueryString(parmas));
            }
        }




        function export_order(scope){
            var mod_cfg = $rootScope.mods['订单受理']||{};
            var s_regular = angular.copy(mod_cfg.s_regular);
            var s_text = angular.copy(mod_cfg.s_text);

            //var required_filter = {};
            var optional_filter = {};
            var key_word = {};

            //angular.forEach(['submit_from','submit_to'],function(field){
            //    required_filter[field] = s_regular[field]||{};
            //});
           
            angular.forEach(['submit_from','submit_to','dep_date_from','dep_date_to','confirm_from','confirm_to','state','settle_flow','assitant_company_id','assitant_department_id','assitant_id','pd_nav_id','pd_tag_id','pd_subtag_id'],function(field){
                optional_filter[field] = s_regular[field]||{};
                optional_filter[field]['mod'] = '订单受理';
            });

            angular.forEach(['pd_provider','group_num','id'],function(field){
                key_word[field] = s_text[field]||{}; 
            });

            var search = {};

            //scope.required_filter = required_filter;
            scope.optional_filter = optional_filter;
            scope.key_word = key_word;
            scope.search = search;
            scope.preview = function(){
                //if(_.isEmpty(search.submit_from) || _.isEmpty(search.submit_to)){
                //    CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
                //    return ;
                //}
                search[search.key_field] = search.key_value;
                //search['limit'] = 999;
                search['limit'] = 100;
                $rootScope.close_view();
                $rootScope.trigger('受理订单导出预览',{},null,{search:search});
                
            }
        }
        function export_order_page(scope){
            var preview_scope = $rootScope.cur_scope();
            var mod_cfg = $rootScope.mods['订单受理']||{};
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
                var action='导出全部受理订单分页';
                delete parmas['action'];
                window.open(appConst.HOST + '/sale/OrderExport/export_order?action=' + action+'&' + $rootScope.toQueryString(parmas));
            }
        }
        // 导出选中受理订单
        function export_order_select(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var ids = _.pluck(selected,'id');
            window.open(appConst.HOST + '/sale/OrderExport/export_order?action=' + action +'&ids=' + _.pluck(selected,'id'));
        }

        // 导出全部受理订单
        function export_order_all(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var parmas = {} ;
            for(var key in scope.search){
                if(_.isString(scope.search[key])){
                    parmas[key] = scope.search[key];
                }
            }
            parmas['mod'] = scope.search['mod'];
            delete parmas['action'];
            window.open(appConst.HOST + '/sale/OrderExport/export_order?action=' + action+'&' + $rootScope.toQueryString(parmas));
        }

        function is_add_order_acc_ok(data){
            if(!data.settle_obj){
                CommSrvc.error(I18nSrvc.get('SEL_SETTLE_OBJ'));
                return false;
            }
            return true;
        }


        function group_add(scope){
            scope.data ={
                type:'GroupTypes'
            }
            scope.submit = function(){
                var pd_group_type = scope.data.pd_group_type;
                var action = '';
                var blk = '';
                if(pd_group_type){
                    switch(pd_group_type){
                        case appConst.REGULAR_INVOICE:
                            action  = '定期发团';
                            break;
                        case appConst.DALIY_LEAVE:
                            action  = '天天发团';
                            break;
                        case appConst.WEEKLY_LEAVE:
                            action  = '按周发团';
                            break;
                        default:
                            CommSrvc.error(I18nSrvc.get('PD_GROUP_TYPE'));
                            return;
                    }
                    var params = {};
                    params['blk'] = blk;
                    params[blk] = [{'pd_group_type':pd_group_type
                            }];
                    $rootScope.close_view();
                    $rootScope.trigger(action,{text:scope.text},null,params);
                    
               }else{
                    CommSrvc.error(I18nSrvc.get('PD_GROUP_TYPE'));
                    return;
               }
            }
        }
        function daliy_leave(scope){
            scope.submit = function(){
                if(_.isEmpty(scope.data.start_date)||_.isEmpty(scope.data.end_date)){
                    CommSrvc.info(I18nSrvc.get('DATE_INTERVAL_ERROR'));
                    return ;
                }
                var start_date = new Date(scope.data.start_date);
                var end_date = new Date(scope.data.end_date);
                var start = start_date.getTime()/1000;
                var end = end_date.getTime()/1000;
                var interval = end - start;
                if(interval > 3600 * 24 * 30 * 3 || interval < 0) {
                    CommSrvc.info(I18nSrvc.get('DATE_INTERVAL_ERROR'));
                    return ;
                }
                var count = (end_date.getTime()/1000 - start_date.getTime()/1000) / (3600 * 24);
                var pre_scope = $rootScope.pre_scope();
                var days = pre_scope.data['产品详情'][0]?pre_scope.data['产品详情'][0].days:0;
                days = (days>0)?(days-1):0;
                var rows = [];
                for (var i = 0; i <= count; i++) {
                    var row = {};
                    row.dep_date = moment(start_date).add(i,'days').format('YYYY-MM-DD');
                    row.back_date = moment(row.dep_date).add(days,'days').format('YYYY-MM-DD');
                    row.seat_plan = 0;
                    row.seat_total =0;
                    row.order_confirm_way = 1;
                    if(pre_scope.action == '新增团队' || pre_scope.action == '修改预算'){
                        row.group_way = 3;
                    }
                    if(pre_scope.action == '活动开团-同业'||
                        pre_scope.action == '修改预算-同业活动'||
                        pre_scope.action == '活动开团'||
                        pre_scope.action == '修改预算-活动'){
                        row.group_way = 4;
                    }
                    rows.push(row);
                }
                if(rows.length){
                    if(pre_scope.action == '修改预算-同业' || pre_scope.action == '新增团队-同业'){
                        pre_scope.loadData('出团详情-同业',rows,'new');
                    } else if (pre_scope.action == '修改预算' || pre_scope.action == '新增团队'){
                        pre_scope.loadData('出团详情',rows,'new');
                    }else if (pre_scope.action == '活动开团-同业' || pre_scope.action == '修改预算-同业活动'
                            ||pre_scope.action == '活动开团' || pre_scope.action == '修改预算-活动'){
                        pre_scope.loadData('出团详情-活动',rows,'new');
                    }
                }
                $rootScope.close_view();
            }
        }
        function weekly_leave(scope){
            scope.data.days = [];
            scope.submit = function(){
                if(_.isEmpty(scope.data.start_date)||_.isEmpty(scope.data.end_date)){
                    CommSrvc.info(I18nSrvc.get('DATE_INTERVAL_ERROR'));
                    return ;
                }
                var start_date = new Date(scope.data.start_date);
                var end_date = new Date(scope.data.end_date);
                var start = start_date.getTime()/1000;
                var end = end_date.getTime()/1000;
                var interval = end - start;
                if(interval > 3600 * 24 * 30 * 3 || interval < 0) {
                    CommSrvc.info(I18nSrvc.get('DATE_INTERVAL_ERROR'));
                    return ;
                }
                var count = (end_date.getTime()/1000 - start_date.getTime()/1000) / (3600 * 24);
                var pre_scope = $rootScope.pre_scope();
                var days = pre_scope.data['产品详情'][0]?pre_scope.data['产品详情'][0].days:0;
                days = (days>0)?(days-1):0;
                var rows = [];
                for (var i = 0; i <= count; i++) {
                    var row = {};
                    var day = (moment(start_date).add(i,'days').day()==0?7:moment(start_date).add(i,'days').day())+'';
                    if(!_.contains(scope.data.days, day)){
                        continue;
                    }
                    row.dep_date = moment(start_date).add(i,'days').format('YYYY-MM-DD');
                    row.back_date = moment(row.dep_date).add(days,'days').format('YYYY-MM-DD');
                    row.seat_plan = 0;
                    row.seat_total =0;
                    row.order_confirm_way = 1;
                    if(pre_scope.action == '新增团队' || pre_scope.action == '修改预算'){
                            row.group_way = 3;
                    }
                    if(pre_scope.action == '活动开团-同业'||pre_scope.action == '修改预算-同业活动'){
                            row.group_way = 4;
                    }
                    rows.push(row);
                }
                if(rows.length){
                    if(pre_scope.action == '修改预算-同业' || pre_scope.action == '新增团队-同业'){
                        pre_scope.loadData('出团详情-同业',rows,'new');
                    } else if (pre_scope.action == '修改预算' || pre_scope.action == '新增团队'){
                        pre_scope.loadData('出团详情',rows,'new');
                    }else if (pre_scope.action == '活动开团-同业' || pre_scope.action == '修改预算-同业活动'){
                        pre_scope.loadData('出团详情-活动',rows,'new');
                    }
                }
                $rootScope.close_view();
            }
        }
        function is_add_group_ok(){
            if(_.isEmpty($rootScope.cur_scope().data['产品详情'][0]['product_id']))
            {
                CommSrvc.error(I18nSrvc.get('SEL_PRODUCT'));
                return false;
            }
            return true;
        };

        function group_edit(scope){
            scope.action_map = {
                '选定产品' : select_product_done,
                '选定团期' : select_date_done,
                '复制团期' : copy_date,
                '批量删除':delete_batch,
            };
            //scope.bottom_flag_change = bottom_flag_change;
            scope.cfg.btn_hide = scope.cfg.btn_hide||{};
            angular.forEach(['选择产品','选择产品-同业'],function(i){
                scope.cfg.btn_hide[i] = 1;
            });
            if(scope.action =='新增团队'||scope.action == '修改团队'
                ||scope.action == '活动开团'||scope.action == '修改预算-活动'){
                scope.cfg.btn_hide['选择产品'] = 0;
            }
            if(scope.action =='新增团队-同业'
                ||scope.action == '修改预算-同业'
                ||scope.action == '活动开团-同业'
                ||scope.action == '修改预算-同业活动'){
                scope.cfg.btn_hide['选择产品-同业'] = 0;
            }

            //预算详情
            scope.data['预算详情'] = scope.data['预算详情']?scope.data['预算详情']:[];

            // function bottom_flag_change(rowEntity){
            //     var flag = rowEntity.bottom_flag?appConst.BOTTOM_TRUE:appConst.BOTTOM_FALSE;
            //     _.each(scope.data['团队费用'],function(item){
            //         item.bottom_flag = appConst.BOTTOM_FALSE;
            //     });
            //     rowEntity.bottom_flag = flag;
            // }

            function copy_date(){
                var blk = '出团详情';
                if(scope.action == '新增团队-同业' || scope.action == '修改预算-同业'){
                    blk = '出团详情-同业';
                }
                if(scope.action == '活动开团-同业' || scope.action == '修改预算-同业活动'||scope.action == '活动开团'||scope.action == '修改预算-活动'){
                    blk = '出团详情-活动';
                }
                var selected = $rootScope.cur_scope().gridSel[blk];

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                angular.forEach(selected,function(group){
                    var item  = angular.copy(group);
                    if(!_.isUndefined(item.id)){
                        delete item.id
                    }
                    if(!_.isUndefined(item.group_num)){
                        delete item.group_num;
                    }
                    $rootScope.cur_scope().data[blk].push(item);
                });
            }

            function select_product_done(){

                var selected = $rootScope.cur_scope().selected;

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                scope.loadData('产品详情',selected);
                //重新选择产品 清空团期
                var blk = '出团详情';
                if(scope.action == '新增团队-同业' || scope.action == '修改预算-同业'){
                    blk = '出团详情-同业';
                }
                if(scope.action == '活动开团-同业' || scope.action == '修改预算-同业活动'
                    ||scope.action == '活动开团' || scope.action == '修改预算-活动'){
                    blk = '出团详情-活动';
                }
                scope.loadData(blk,[]);
                $rootScope.close_view();
            }

            function select_date_done(){
                var cur = scope.cur_scope();
                var pre = scope.pre_scope();
                var days = scope.data['产品详情'][0]?scope.data['产品详情'][0].days:0;
                days = (days>0)?(days-1):0;
                var rows = [];
                angular.forEach(cur.vm,function(arr){
                    angular.forEach(arr,function(date){
                        var row = angular.copy(cur.data);
                        row.dep_date = moment(date).format('YYYY-MM-DD');
                        row.back_date = moment(date).add(days,'days').format('YYYY-MM-DD');
                        row.seat_plan = 0;
                        row.seat_total =0;
                        row.order_confirm_way = 1;
                        if(pre.action == '新增团队'||
                            pre.action == '修改预算'){
                            row.group_way = 3;
                        }
                        if(pre.action == '活动开团-同业'||
                            pre.action == '修改预算-同业活动'||
                            pre.action == '活动开团'||
                            pre.action == '修改预算-活动'){
                            row.group_way = 4;
                        }
                        rows.push(row);
                    });
                });
                if(rows.length){
                    if(pre.action == '修改预算-同业' || pre.action == '新增团队-同业'){
                        pre.loadData('出团详情-同业',rows,'new');
                    } else if (pre.action == '修改预算' || pre.action == '新增团队'){
                        pre.loadData('出团详情',rows,'new');
                    }else if (pre.action == '活动开团-同业' || pre.action == '修改预算-同业活动'
                        ||pre.action == '活动开团'||pre.action == '修改预算-活动'){
                        pre.loadData('出团详情-活动',rows,'new');
                    }
                }
                scope.close_view();
            }

            function delete_batch(store_id,data,meta,action){
                var selected = scope.gridSel[store_id];

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                _.each(selected,function(item){
                    scope.delete_row(store_id,item);
                });
            }

        }
        function batch_settings(scope){
            scope.init = function(){
                scope.setting_items = {
                   close_date:{ type:'number',label:I18nSrvc.get("CLOSING_DATE"),field: 'close_date'},
                   seat_plan:{ type:'number',label:I18nSrvc.get("BATCH_PLANNING"),field: 'seat_plan'},
                   seat_total:{ type:'number',label:I18nSrvc.get("BATCH_INVENTORY"),field: 'seat_total'},
                   person_limit:{ type:'number',label:I18nSrvc.get("BATCH_GROUP_BENCHMARK") ,field:'person_limit'},
                   sale_comment:{ type:'text',label:I18nSrvc.get("BATCH_REMARK") ,field:'sale_comment'},
                   order_confirm_way:{ type:'OrderConfirmWay',label:I18nSrvc.get("ORDER_CONFIRM_WAY") ,field:'order_confirm_way'},                             
                };
                var pre_scope = $rootScope.pre_scope();
                if(pre_scope.action == '新增团队-同业'||pre_scope.action =='修改预算-同业'){
                    scope.setting_items['group_way'] = { type:'GroupWayEdit',label:I18nSrvc.get("GROUP_WAY") ,field:'group_way'};
                }
            }

            scope.submit = function(){
                var pre_scope = $rootScope.pre_scope();
                var selected = $rootScope.pre_scope().gridSel[scope.assoc_store_id];
                angular.forEach(selected,function(item){
                    item['close_date'] = moment(item.dep_date).subtract(scope.data.close_date,'days').format('YYYY-MM-DD');
                    item['seat_plan'] = scope.data.seat_plan;
                    item['seat_total'] = scope.data.seat_total;
                    item['person_limit'] = scope.data.person_limit;
                    item['sale_comment'] = scope.data.sale_comment;
                    item.order_confirm_way = scope.data.order_confirm_way;
                    if(pre_scope.action == '新增团队-同业'||pre_scope.action =='修改预算-同业'){
                        item.group_way = scope.data.group_way;                        
                    }
                });
                $rootScope.close_view();
            };
        }

        function set_batch_group_num(scope){
            scope.data = {
                type:'number',
                first_label:I18nSrvc.get('BATCH_PLANNING'),
                second_label:I18nSrvc.get('BATCH_INVENTORY'),
            };
            scope.submit = function(){
                var selected = $rootScope.pre_scope().gridSel[scope.assoc_store_id];
                 angular.forEach(selected,function(item){
                    item['seat_plan'] =scope.data.firstValue;
                    item['seat_total'] = scope.data.secondValue;
                 });
                 $rootScope.close_view();
            };
        }                      

        function set_price_bacth(scope){

            var data = [];
            data.push({name:I18nSrvc.get('PEER_PRICE'),field:'peer_price'});
            data.push({name:I18nSrvc.get('ZK_PRICE'),field:'zk_price'});
            scope.data = data;
            scope.submit = function(){
                var selected = $rootScope.pre_scope().gridSel[scope.assoc_store_id];
                 angular.forEach(selected,function(item){
                    angular.forEach(data,function(type){
                        if(type.field){
                            item[type.field] = type.value;
                        }
                        if(type.id){
                            item[type.id] = type.value;
                        }
                    });
                 });
                 $rootScope.close_view();
            };

        }
        function set_deadline_bacth(scope){
            scope.submit = function(){
                var selected = $rootScope.pre_scope().gridSel[scope.assoc_store_id];
                angular.forEach(selected,function(item){
                    item.close_date = moment(item.dep_date).subtract(scope.data.day,'days').format('YYYY-MM-DD');
                 });
                $rootScope.close_view();
            };
        }
        function order_reserved(scope){
            var notice_list = [
                {date:'0000-00-00',time:'00:00'}
                ,{date:'0000-00-00',time:'00:00'}
                ,{date:'0000-00-00',time:'00:00'}
            ];
            if(_.isEmpty(scope.data.timer_notice_list)){
                scope.data.timer_notice_list = notice_list;
            }else{
                var notice_list_string = angular.fromJson(scope.data.timer_notice_list);
                scope.data.timer_notice_list = [];
                angular.forEach(notice_list_string,function(item){
                    scope.data.timer_notice_list.push({
                        date:item.split(' ')[0]||'0000-00-00',
                        time:item.split(' ')[1]||'00:00',
                    })
                });
            }

            var _data = {order_id:scope.data.id
                        ,timer_end_date:scope.data.timer_end_date
                        ,timer_notice_list:scope.data.timer_notice_list};

            scope.data = _data;

            scope.submit = function(){
                var timer_end_date = new Date(scope.data.date+' '+scope.data.time);
                var start = (new Date().getTime())/1000;
                var end_time = timer_end_date.getTime()/1000;
                if(isNaN(end_time)||_.isEmpty(scope.data.date)||_.isEmpty(scope.data.time)){
                    CommSrvc.error(I18nSrvc.get('END_TIMER_ERR'));
                    return;
                }
                if(end_time<=start){
                    CommSrvc.error(I18nSrvc.get('END_TIME_BIGGER_THAN_NOW'));
                    return;
                }
                var notice_list = [];
                var notice_check = true;
                angular.forEach(scope.data.timer_notice_list,function(notice,key){
                   var notice_time = new Date(notice.date+' '+notice.time).getTime()/1000;
                   if(notice_time>end_time){
                        notice_check = false;
                   }
                   notice_list.push(new Date(notice.date+' '+notice.time));
                });
                if(!notice_check){
                    CommSrvc.error(I18nSrvc.get('END_TIME_BIGGER_THAN_NOTICE_TIME'));
                    return;
                }
                AjaxSrvc.submit(scope.cfg.submit.url,{timer_end_date:timer_end_date,id:scope.data.order_id,notice_list:notice_list}).then(function(data){
                        CommSrvc.info(data.message).result.then(function(){
                            $rootScope.pre_scope().load();
                            $rootScope.close_view();
                    });
                 });
            }
        }

        function order_pay_reserved(scope){
            var notice_list = [
                {date:'0000-00-00',time:'00:00'}
                ,{date:'0000-00-00',time:'00:00'}
                ,{date:'0000-00-00',time:'00:00'}
            ];
            if(_.isEmpty(scope.data.pay_timer_notice_list)){
                scope.data.pay_timer_notice_list = notice_list;
            }else{
                var notice_list_string = angular.fromJson(scope.data.pay_timer_notice_list);
                scope.data.pay_timer_notice_list = [];
                angular.forEach(notice_list_string,function(item){
                    scope.data.pay_timer_notice_list.push({
                        date:item.split(' ')[0]||'0000-00-00',
                        time:item.split(' ')[1]||'00:00',
                    })
                });
            }

            var _data = {order_id:scope.data.id
                        ,pay_timer_end_date:scope.data.pay_timer_end_date
                        ,pay_timer_notice_list:scope.data.pay_timer_notice_list
                        ,pay_amount_limit:parseFloat(scope.data.pay_amount_limit)};

            scope.data = _data;

            scope.submit = function(){
                var timer_end_date = new Date(scope.data.date+' '+scope.data.time);
                var start = (new Date().getTime())/1000;
                var end_time = timer_end_date.getTime()/1000;
                if(isNaN(end_time)||_.isEmpty(scope.data.date)||_.isEmpty(scope.data.time)){
                    CommSrvc.error(I18nSrvc.get('END_TIMER_ERR'));
                    return;
                }
                if(_.isUndefined(scope.data.pay_amount_limit)
                    ||scope.data.pay_amount_limit<=0){
                    CommSrvc.error(I18nSrvc.get('PAY_AMOUNT_LIMIT_ERR'));
                    return;
                }
                if(end_time<=start){
                    CommSrvc.error(I18nSrvc.get('END_TIME_BIGGER_THAN_NOW'));
                    return;
                }
                var notice_list = [];
                var notice_check = true;
                angular.forEach(scope.data.pay_timer_notice_list,function(notice,key){
                   var notice_time = new Date(notice.date+' '+notice.time).getTime()/1000;
                   if(notice_time>end_time){
                        notice_check = false;
                   }
                   notice_list.push(new Date(notice.date+' '+notice.time));
                });
                if(!notice_check){
                    CommSrvc.error(I18nSrvc.get('END_TIME_BIGGER_THAN_NOTICE_TIME'));
                    return;
                }
                AjaxSrvc.submit(scope.cfg.submit.url,{
                    pay_timer_end_date:timer_end_date
                    ,id:scope.data.order_id
                    ,notice_list:notice_list
                    ,pay_amount_limit:scope.data.pay_amount_limit
                }).then(function(data){
                        CommSrvc.info(data.message).result.then(function(){
                            $rootScope.pre_scope().load();
                            $rootScope.close_view();
                    });
                 });
            }
        }

        function order_approve(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('订单应转审批-活动',meta,store_id,data);
            }else if(data.order_yb == appConst.ORDER_YB){
                $rootScope.trigger('订单应转审批-异部',meta,store_id,data);
            }else{
                $rootScope.trigger('订单应转审批-同部',meta,store_id,data);
            }
        }
        function order_busneiss_nz_approve(action,meta,cfg,store_id,data){ 
            var params = {};
            var doc_type = appConst.DOC_YW_NZ;
            var action  = '新增业务内转单';
            var blk = '业务内转单据信息';
            var accblk = '内转核算';
            AjaxSrvc.get(cfg.read.url,{order_id:data.id}).then(function(res){
                if(!_.isEmpty(res['内转核算'])){
                    var department_id = res['内转核算'][0].department_id;
                    var settle_obj = res['内转核算'][0].pay_department_id;
                    if(settle_obj!=$rootScope.appUser.department_id
                    &&department_id!=$rootScope.appUser.department_id){
                        CommSrvc.error(I18nSrvc.get('YW_NZ_ACC_LIMIT'));
                        return; 
                    }
                    if(department_id == $rootScope.appUser.department_id){
                        params[blk] = [{'doc_type_id':doc_type,
                                        'employee_name':$rootScope.appUser.employee_name,
                                        'code':$rootScope.appUser.department_code,
                                        'settle_obj_id':settle_obj,
                                        'settle_obj':res['内转核算'][0].settle_obj}];

                    }else if(settle_obj == $rootScope.appUser.department_id){
                        params[blk] = [{'doc_type_id':doc_type,
                                        'employee_name':$rootScope.appUser.employee_name,
                                        'code':$rootScope.appUser.department_code,
                                        'settle_obj_id':department_id,
                                        'settle_obj':res['内转核算'][0].department_name}];
                    }
                    params[accblk] = res['内转核算'];
                    $rootScope.trigger(action,meta,null,params);
                } else {
                    CommSrvc.error(I18nSrvc.get('ORDER_YW_NZ_ACC_IS_NOT_ADD'));
                    return; 
                }
            });
        }
        function order_tourist_set_lock_state(scope){
            var data = scope.data;
            var order = {tourist_lock_state:data.tourist_lock_state};
            scope.submit = function(){
                var _data = {id:scope.data.id,tourist_lock_state:scope.data.tourist_lock_state};
                if(_data.tourist_lock_state == order.tourist_lock_state && _data.tourist_lock_state == 0){
                    CommSrvc.error(I18nSrvc.get('ORDER_LIST_IS_UNLOCKED'));
                    return;
                } else if(_data.tourist_lock_state == order.tourist_lock_state && _data.tourist_lock_state == 1){
                    CommSrvc.error(I18nSrvc.get('ORDER_LIST_IS_LOCKED'));
                    return;
                }
                AjaxSrvc.submit(scope.cfg.submit.url,_data).then(function(data){
                        CommSrvc.info(data.message).result.then(function(){
                            $rootScope.close_view();
                    });
                 });
            } 
        }
        function approve_detail(scope){
            scope.cfg.btn_hide = scope.cfg.btn_hide||{};
            angular.forEach(['录入订单应转明细','录入订单应收明细','录入订单手动优惠'],function(i){
                scope.cfg.btn_hide[i] = 1;
            });
            angular.forEach(['订单应转历史','订单参团历史'],function(i){
                if(scope.data[i]){
                    scope.cfg.btn_hide[i] = 0;
                }else{
                    scope.cfg.btn_hide[i] = 1;
                }
            });
            if(!_.isUndefined($rootScope.appUser.supplier_id)
                &&$rootScope.appUser.supplier_id!='0'){
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['客户详情','订单应收'],function(i){
                    scope.block_hide[i] = 1;
                });
            }
            scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
            scope.init = function(){
                if(!_.isUndefined($rootScope.appUser.supplier_id)
                    &&$rootScope.appUser.supplier_id!='0'){
                    calc_order();
                }   
            }
            function calc_order(){
                var scope = $rootScope.cur_scope();
                var data = scope.data;
                if(!_.isEmpty(data['订单应转'])){
                    _.each(data['订单应转'],function(item){
                        if(!_.isEmpty(item)){
                            var settle_items = item.acc_item;
                            item.settleable = 0;
                             _.each(['参团费用','其他费用'],function(i){

                                _.each(settle_items[i],function(_item){
                                    if(_item.num_of_people
                                       &&_item.unit_price
                                       ){
                                        item.settleable +=+ (_item.num_of_people*_item.unit_price).toFixed(2);
                                    }else{
                                        item.settleable = 0;
                                    }
                                });
                            });
                            item.settle_diff = (item.settleable - item.settled).toFixed(2);
                        }
                    });
                }
            }
        }

        function order_pay(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('订单应付核算-活动',meta,store_id,data);
            }else if(data.order_yb==appConst.ORDER_YB){
                $rootScope.trigger('订单应付核算-异部',meta,store_id,data);
            }else{
                $rootScope.trigger('订单应付核算-同部',meta,store_id,data);
            }
        }

        function order_payable_see(scope){
             scope.init = function(){
                var store_id = scope.assoc_store_id;
                var data = angular.copy($rootScope.pre_scope().data[store_id][0].acc_item)||{};
                scope.block_hide = scope.block_hide||{};
                scope.loadData('参团费用',data['参团费用']);
                scope.loadData('其他费用-应付',data['其他费用']);
                scope.loadData('协议政策',data['协议政策']);
                scope.loadData('其他扣款',data['其他扣款']);
                if(!_.isUndefined(data['其他费用'])
                    &&!_.isEmpty(data['其他费用'])){
                    scope.block_hide['其他费用-应付'] = 0;
                }else{
                    scope.block_hide['其他费用-应付'] = 1;
                }
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
                _.each(['参团费用','其他费用-应付'],function(i){

                    _.each(scope.data[i],function(item){
                        if(item.num_of_people
                           &&item.unit_price
                           ){
                            item.total  = (item.num_of_people*item.unit_price).toFixed(2);
                            scope.amount +=+ item.total;
                            if(i=='参团费用'){
                                scope.group_price_people +=+ item.num_of_people;
                                scope.group_price +=+ item.total;
                            }
                            if(i=='其他费用-应付'){
                                scope.other_fee_people +=+ item.num_of_people;
                                scope.other_fee +=+ item.total;
                            }
                        }else{
                            item.total = 0;
                        }
                    });
                });
                scope.other_calc_amount = 0;
                scope.charge_back = 0;
                

                //////////////////////
                angular.forEach(scope.data['其他费用-应付'],function(item){
                   if(item.calc_flag){
                      scope.other_calc_amount +=+ (item.num_of_people*item.unit_price).toFixed(2);
                   }
                });
                
                var xy_amount = 0;
                if(scope.data['协议政策'] ){
                    angular.forEach(scope.data['协议政策'],function(res){
                        var dct  = EnumSrvc['DctAgreementCfg'][res['dct_id']];
                        if (dct) {
                            switch(dct[0]){
                                case '1':
                                    var xy_pirce = ((scope.other_calc_amount+scope.group_price)*(dct[1]/100)).toFixed(2);
                                    break;
                                case '2':
                                    var xy_pirce = scope.group_price_people *dct[1];
                                    break;
                            }
                            res['amount'] = parseFloat(xy_pirce);
                        }
                        xy_amount += res['amount'];
                    });
                    scope.xy_amount = (parseFloat(xy_amount)).toFixed(2);
                    
                }else{
                    scope.xy_amount = 0;
                }
                var qita = 0;
                if (scope.data['其他扣款']) {
                    angular.forEach(scope.data['其他扣款'],function(item){
                        qita += parseFloat((item.num_of_people*item.unit_price).toFixed(2));
                        // scope.other_discount_amount += parseFloat(qt_total);
                    });
                }
                    scope.other_discount_amount = qita.toFixed(2);
            }
        }

        // 添加协议新行
        function add_new_row(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var row = {}

            row['pd_provider'] = $rootScope.pre_scope().data['订单详情'][0].pd_provider;
            row['pd_provider_id'] = $rootScope.pre_scope().data['订单详情'][0].pd_provider_id;
            row['dct_id'] = '';
            row['amount'] = 0;
            row['comment'] = '';

            scope.data['协议政策'].push(row);
        }

        // 删除协议行
        function delete_xy_row(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var store = scope.data['协议政策'];
            var i = store.indexOf(data);
            var del_amount = store[i]['amount'];
            if(i !== -1){
                store.splice(i,1);
                scope.xy_amount = (parseFloat(scope.xy_amount-del_amount)).toFixed(2);
            }
        }

        function add_order_payable(scope){
            scope.action_map = {
                '保存':submit,
                '删除其他扣款':delete_other_charge,
            };            

            scope.init = function(){
                var data = angular.copy($rootScope.pre_scope().data['订单应付'][0].acc_item)||{};
                var order = $rootScope.pre_scope().data['订单详情'][0];
                scope.block_hide = scope.block_hide||{};
                scope.loadData('参团费用',data['参团费用']);
                if(!_.isUndefined(data['其他费用'])
                    &&!_.isEmpty(data['其他费用'])){
                    scope.block_hide['其他费用-应付'] = 0;
                }else{
                    scope.block_hide['其他费用-应付'] = 1;
                }
                scope.loadData('其他费用-应付',data['其他费用']);
                scope.loadData('协议政策',data['协议政策']);
                scope.loadData('其他扣款',data['其他扣款']);
                if(_.isEmpty(scope.data['协议政策'][0])){
                    scope.data['协议政策'][0] = {'pd_provider':order.pd_provider
                            ,'pd_provider_id':order.pd_provider_id,'dct_id':'','amount':0};
                }
                
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
                var acc_item = {'参团费用':scope.data['参团费用'],'其他费用':scope.data['其他费用-应付'],'协议政策':scope.data['协议政策']
                    ,'其他扣款':scope.data['其他扣款']};
                var pre_scope = $rootScope.pre_scope();
                pre_scope.data['订单应付'][0].acc_item = acc_item;

                pre_scope.data['订单应付'][0].payable = $rootScope.cur_scope().group_price + $rootScope.cur_scope().other_fee - 
                    $rootScope.cur_scope().charge_back;
                pre_scope.data['订单应付'][0].paid = pre_scope.data['订单应付'][0].paid||0;
                pre_scope.data['订单应付'][0].pay_diff = pre_scope.data['订单应付'][0].payable - pre_scope.data['订单应付'][0].paid;
                $rootScope.close_view(); 
            }
            function delete_other_charge(store_id,data){
                scope.delete_row(store_id,data);
                calc_acc();
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
                scope.other_calc_amount = 0;

                scope.charge_back = 0;
                scope.other_discount_amount =0;
                scope.xy_amount = 0;

                _.each(['参团费用','其他费用-应付'],function(i){

                    _.each(scope.data[i],function(item){
                        if(item.num_of_people
                           &&item.unit_price
                           ){
                            item.total  = (item.num_of_people*item.unit_price).toFixed(2);
                            scope.amount +=+ item.total;
                            if(i=='参团费用'){
                                scope.group_price_people +=+ item.num_of_people;
                                scope.group_price +=+ item.total;
                            }
                            if(i=='其他费用-应付'){
                                scope.other_fee_people +=+ item.num_of_people;
                                scope.other_fee +=+ item.total;
                            }
                        }else{
                            item.total = 0;
                        }
                    });
                });
                
                angular.forEach(scope.data['其他费用-应付'],function(item){
                   if(item.calc_flag){
                      scope.other_calc_amount +=+ (item.num_of_people*item.unit_price).toFixed(2);
                   }
                });
                
                var xy_amount = 0;
                if(scope.data['协议政策'] ){
                    angular.forEach(scope.data['协议政策'],function(res){
                        var dct  = EnumSrvc['DctAgreementCfg'][res['dct_id']];
                        if (dct) {
                            switch(dct[0]){
                                case '1':
                                    var xy_pirce = ((scope.other_calc_amount+scope.group_price)*(dct[1]/100)).toFixed(2);
                                    break;
                                case '2':
                                    var xy_pirce = scope.group_price_people *dct[1];
                                    break;
                            }
                            res['amount'] = parseFloat(xy_pirce);
                        }
                        xy_amount += res['amount'];
                    });
                    scope.xy_amount = (parseFloat(xy_amount)).toFixed(2);
                    
                }else{
                    scope.xy_amount = 0;
                }
                if (scope.data['其他扣款']) {
                    angular.forEach(scope.data['其他扣款'],function(item){
                        item.total = (item.num_of_people*item.unit_price).toFixed(2);
                        scope.other_discount_amount += parseFloat(item.total);
                    });
                }else{
                    scope.other_discount_amount = 0;
                }
                scope.charge_back = (parseFloat(scope.other_discount_amount)+parseFloat(scope.xy_amount)).toFixed(2);
            }
        }
        function order_pay_acc_yb(scope){
            scope.init = function(){
                scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
                scope.cfg.btn_hide = scope.cfg.btn_hide || {};
                //
                var createAction = ['订单应付核算-异部','订单应付核算-同部'];
                if(createAction.indexOf(scope.action)!=-1){
                    angular.forEach(['查看订单应付明细'],function(i){
                        scope.cfg.btn_hide[i] = 1;
                    });
                    if(_.isEmpty(scope.data['订单应付'])){
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
                        scope.loadData('订单应付',[data]);
                        scope.isCreate = true;
                        scope.data['订单应付'][0].acc_item = !_.isEmpty(scope.data['订单应转'])?scope.data['订单应转'][0].acc_item:{};
                    }
                }
                angular.forEach(['录入订单应转明细','订单应转历史','录入订单应收明细'
                    ,'订单参团历史','录入订单手动优惠'],function(i){
                    scope.cfg.btn_hide[i] = 1;
                });
                //如果历史为空则不显示
                angular.forEach(['订单应付历史'],function(i){
                    if(_.isEmpty(scope.data[i])){
                        scope.cfg.btn_hide[i] = 1;
                    }else{
                        scope.cfg.btn_hide[i] = 0;
                    }
                });
                scope.calc_order = calc_order;
                calc_order();
            }
        }
        function acc_detail_see_zy(scope){
            scope.init = function(){
                var selected = $rootScope.cur_scope().gridSel['订单应付']; 
                scope.settle_obj = selected[0].settle_obj;
                var acc_item = selected[0].acc_item;
                scope.loadData('订单应付明细',acc_item['订单应付明细']);
                calc_acc();
            }
        }
        function add_acc_detail_zy(scope){
            scope.calc_acc = calc_acc;
            scope.action_map ={
                '添加核算应付':add_row,
                '删除核算应付':delete_row,
                '保存':submit,
            };
            scope.init = function(){
                var selected = $rootScope.pre_scope().gridSel['订单应付']; 
                scope.ref = selected[0];
                scope.settle_obj = selected[0].settle_obj;
                var acc_item = selected[0].acc_item;
                if(acc_item){
                    scope.loadData('订单应付明细',acc_item['订单应付明细']);
                }
                calc_acc();
            }
            function submit(){
                var acc_item = {'订单应付明细':scope.data['订单应付明细']};
                // acc_item = angular.toJson(acc_item);
                var pre_scope = $rootScope.pre_scope();
                var index = pre_scope.data['订单应付'].indexOf(scope.ref);
                pre_scope.data['订单应付'][index].acc_item = acc_item;

                pre_scope.data['订单应付'][index].payable = $rootScope.cur_scope().amount;
                pre_scope.data['订单应付'][index].paid = 0;
                pre_scope.data['订单应付'][index].pay_diff = pre_scope.data['订单应付'][index].payable;
                $rootScope.close_view(); 
            }
        }
        function order_pay_acc_tb(scope){
            scope.init = function(){
                scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
                scope.cfg.btn_hide = scope.cfg.btn_hide || {};
                //
                var createAction = ['订单应付核算-异部','订单应付核算-同部'];
                if(createAction.indexOf(scope.action)!=-1){
                    angular.forEach(['查看订单应付明细'],function(i){
                        scope.cfg.btn_hide[i] = 1;
                    });
                    if(_.isEmpty(scope.data['订单应付'])){
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
                        scope.loadData('订单应付',[$data]);
                        scope.isCreate = true;
                        scope.data['订单应付'][0].acc_item = !_.isEmpty(scope.data['订单应转'])?scope.data['订单应转'][0].acc_item:{};
                    }
                }
                angular.forEach(['录入订单应转明细','订单应转历史','录入订单应收明细','录入订单手动优惠'],function(i){
                    scope.cfg.btn_hide[i] = 1;
                });
                //历史为空隐藏历史按钮
                angular.forEach(['订单应付历史'],function(i){
                    if(_.isEmpty(scope.data[i])){
                        scope.cfg.btn_hide[i] = 1;
                    }else{
                        scope.cfg.btn_hide[i] = 0;
                    }
                });
                scope.calc_order = calc_order;
                calc_order();
            }
        }

        function order_settle_submit(action,meta,cfg,store_id,data){
            if(data.settle_flow == appConst.FLOW_NOT_SUBMIT||data.settle_flow == appConst.FLOW_REJECT){
                $rootScope.trigger('订单应转提交',meta,store_id,data);
                return;
            }else{
                if(data.settle_flow == appConst.FLOW_APPROVED&&(data.settle_change_flow == appConst.FLOW_NOT_SUBMIT
                    ||data.settle_change_flow == appConst.FLOW_REJECT)){
                    $rootScope.trigger('订单应转变更提交',meta,store_id,data);
                    return;
                }else{
                    CommSrvc.error(I18nSrvc.get('FLOW_FORBID'));
                    return;
                }
            }
        }

        function order_pay_submit(action,meta,cfg,store_id,data){
            if(data.pd_src == appConst.PD_SRC_TY){
                 $rootScope.trigger('订单应付提交',meta,store_id,data);
            }else if(data.pd_src == appConst.PD_SRC_ZY){
                $rootScope.trigger('订单核算提交',meta,store_id,data);
            }

        }

        function order_detail(scope){
            if (($rootScope.cur_mod=='订单变更受理') || ($rootScope.cur_mod== '订单手动优惠')) {
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['订单利润'],function(i){
                    scope.block_hide[i] = 1;
                });
            }
            if (($rootScope.cur_mod=='订单对账') && (!scope.data['订单核算查看'][0]) || ($rootScope.cur_mod=='订单核算') && (!scope.data['订单核算查看'][0])) {
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['订单核算查看'],function(i){
                    scope.block_hide[i] = 1;
                });
            }
            
            if (scope.data['应转变更审批日志'][0]) {
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['应转变更审批日志'],function(i){
                    scope.block_hide[i] = 0;
                });
            }else{
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['应转变更审批日志'],function(i){
                    scope.block_hide[i] = 1;
                });
            } 

            if (scope.data['应收变更审批日志'][0]) {
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['应收变更审批日志'],function(i){
                    scope.block_hide[i] = 0;
                });
            }else{
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['应收变更审批日志'],function(i){
                    scope.block_hide[i] = 1;
                });
            } 

            if (!scope.data['合同详情']||_.isEmpty(scope.data['合同详情'])) {
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['合同详情'],function(i){
                    scope.block_hide[i] = 1;
                });
            }
            scope.cfg.btn_hide = scope.cfg.btn_hide || {};
            scope.block_hide = scope.block_hide ||{};
            angular.forEach(['录入订单应收明细','录入订单应转明细','录入订单应付明细','录入订单手动优惠','选择团队-订单变更'],function(i){
                scope.cfg.btn_hide[i] = 1;
            });
            if(scope.action == '订单应转变更'){
                scope.cfg.btn_hide['录入订单应转明细'] = 0;
            }

            if(!scope.data['订单核算查看']||_.isEmpty(scope.data['订单核算查看'])){
                scope.block_hide['订单核算查看'] = 1;
            }
            angular.forEach(['订单参团历史','订单应转历史','订单应付历史','订单应收历史'],function(i){
                if(scope.data[i]&&!_.isEmpty(scope.data[i])){
                    scope.cfg.btn_hide[i] = 0;
                }else{
                    scope.cfg.btn_hide[i] = 1;
                }
            });
            scope.init = function(){
                calc_order();
                scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
            }
        }

        function order_see(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('查看订单-同业活动',meta,store_id,data);
            }else if(data.order_yb==appConst.ORDER_YB){
                if(data.pd_src == appConst.PD_SRC_TY){
                    $rootScope.trigger('查看订单-同业异部',meta,store_id,data);
                }else if(data.pd_src == appConst.PD_SRC_ZY){
                    $rootScope.trigger('查看订单-自营异部',meta,store_id,data);
                }
            }else{
                if(data.pd_src == appConst.PD_SRC_TY){
                    $rootScope.trigger('查看订单-同业同部',meta,store_id,data);
                }else if(data.pd_src == appConst.PD_SRC_ZY){
                    $rootScope.trigger('查看订单-自营同部',meta,store_id,data);
                }
            }
        }

        function order_see_check_up(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('查看订单-同业活动-订单对账',meta,store_id,data);
            }else if(data.order_yb==appConst.ORDER_YB){
                if(data.pd_src == appConst.PD_SRC_TY){
                    $rootScope.trigger('查看订单-同业异部-订单对账',meta,store_id,data);
                }else if(data.pd_src == appConst.PD_SRC_ZY){
                    $rootScope.trigger('查看订单-自营异部-订单对账',meta,store_id,data);
                }
            }else{
                if(data.pd_src == appConst.PD_SRC_TY){
                    $rootScope.trigger('查看订单-同业同部-订单对账',meta,store_id,data);
                }else if(data.pd_src == appConst.PD_SRC_ZY){
                    $rootScope.trigger('查看订单-自营同部-订单对账',meta,store_id,data);
                }
            }
        }
        function pay_acc_see_order(action,meta,cfg,store_id,data){
            if(data.order_yb==appConst.ORDER_YB){
                if(data.pd_src == appConst.PD_SRC_TY){
                    $rootScope.trigger('查看订单-同业异部',meta,store_id,{order_id:data.order_id});
                }else if(data.pd_src == appConst.PD_SRC_ZY){
                    $rootScope.trigger('查看订单-自营异部',meta,store_id,{order_id:data.order_id});
                }
            }else{
                if(data.pd_src == appConst.PD_SRC_TY){
                    $rootScope.trigger('查看订单-同业同部',meta,store_id,{order_id:data.order_id});
                }else if(data.pd_src == appConst.PD_SRC_ZY){
                    $rootScope.trigger('查看订单-自营同部',meta,store_id,{order_id:data.order_id});
                }
            }
        }

        function order_acc(action,meta,cfg,store_id,data){
            //异部订单核算
            if(data.order_yb == appConst.ORDER_YB){
                if(data.pd_src == appConst.PD_SRC_TY){
                    $rootScope.trigger('订单核算-异部-同业',meta,store_id,data);
                }else if(data.pd_src ==  appConst.PD_SRC_ZY){
                    $rootScope.trigger('订单核算-异部-自营',meta,store_id,data);
                }
            }else{
                if(data.pd_src ==  appConst.PD_SRC_TY){
                    $rootScope.trigger('订单核算-同部-同业',meta,store_id,data);
                }else if(data.pd_src ==  appConst.PD_SRC_ZY){
                    $rootScope.trigger('订单核算-同部-自营',meta,store_id,data);
                }
            }
        }
        function order_acc_edit(scope){
            scope.action_map = {
                '订单核算选择结算对象':choose_settle_obj,
            };
            scope.init = function(){
                calc_order();
                scope.cfg.btn_hide = scope.cfg.btn_hide||{};
                var createAction = ['订单核算-异部-同业','订单核算-异部-自营','订单核算-同部-同业','订单核算-同部-自营'];
                if(createAction.indexOf(scope.action)!=-1){
                    angular.forEach(['录入订单应转明细','查看订单核算明细','录入订单手动优惠'],function(i){
                        scope.cfg.btn_hide[i] = 1;
                    });
                }
                var approveAction = ['订单核算审批'];
                if(approveAction.indexOf(scope.action)!=-1){
                    angular.forEach(['录入订单应转明细','录入订单核算明细','订单核算选择结算对象','添加行','录入订单手动优惠'],function(i){
                        scope.cfg.btn_hide[i] = 1;
                    });
                }
                scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
                angular.forEach(['订单应转历史','订单参团历史','订单对账历史'],function(i){
                    if(scope.data[i]&&!_.isEmpty(scope.data[i])){
                        scope.cfg.btn_hide[i] = 0;
                    }else{
                        scope.cfg.btn_hide[i] = 1;
                    }
                });
            }
            scope.calc_acc = calc_order;
            //订单明细
            scope.add_acc_check = add_acc_check;
            function add_acc_check(){
                var selected = $rootScope.cur_scope().gridSel['订单核算'];
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return false;
                }
                if(!selected[0].settle_obj){
                    CommSrvc.error(I18nSrvc.get('SEL_SETTLE_OBJ'));
                    return false;
                }
                return true;
            }
            function choose_settle_obj(store_id,row,meta,action){
                if(row.flow){
                    if(row.flow!=appConst.FLOW_NOT_SUBMIT&&row.flow!=appConst.FLOW_REJECT){
                        CommSrvc.error(I18nSrvc.get('ACC_FLOW_NOT_ALLOW_SEL_SETTLE_OBJ'));
                        return ;
                    }            
                }
                var old = angular.copy($rootScope.cur_scope().data[store_id]);
                var old_pay_supplier_id = _.pluck(old,'pay_supplier_id');
                var old_pay_employee_id = _.pluck(old,'pay_employee_id');
                var old_pay_department_id = _.pluck(old,'pay_department_id');

                var mcfg = {
                    text : meta.text,
                    data : {settle_obj_type : 'Supplier'},
                    submit : function(){
                        var data = this.data;
                        if(!(data.settle_obj_id > 0)){
                            CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                            return;
                        }
                        if(data.settle_obj_type == 'Supplier'){
                            if(old_pay_supplier_id.indexOf(data.settle_obj_id)!=-1){
                                CommSrvc.error(I18nSrvc.get('EXIT_SAME_SETTLE_OBJ_ACC'));
                                return;
                            }
                        }else if(data.settle_obj_type == 'FullEmployee'){    // select下拉框的全名展示
                            if(old_pay_employee_id.indexOf(data.settle_obj_id)!=-1){
                                CommSrvc.error(I18nSrvc.get('EXIT_SAME_SETTLE_OBJ_ACC'));
                                return;
                            }
                        }else{
                            if(old_pay_department_id.indexOf(data.settle_obj_id)!=-1){
                                CommSrvc.error(I18nSrvc.get('EXIT_SAME_SETTLE_OBJ_ACC'));
                                return;
                            }
                        }
                        if(data.settle_obj_type == 'Supplier'){
                            row.pay_supplier_id = data.settle_obj_id;
                            row.pay_employee_id = 0;
                            row.pay_department_id = 0;
                        }else if(data.settle_obj_type == 'FullEmployee'){
                            row.pay_employee_id = data.settle_obj_id;
                            row.pay_supplier_id = 0;
                            row.pay_department_id = 0;
                        }else{
                            row.pay_department_id = data.settle_obj_id;
                            row.pay_employee_id = 0;
                            row.pay_supplier_id = 0;
                        }
                        row.settle_obj = data.settle_obj;
                        win.close();
                    }
                };
      
                var win = $uibModal.open({
                  templateUrl: 'choose_settle.html',
                  controller : 'ModalInstanceCtl',
                  backdrop: false,
                  resolve:{cfg:mcfg}
                });
            }
        }
        function order_acc_see(scope){
            scope.init = function(){
                //var selected = $rootScope.pre_scope().gridSel['订单核算']; 
                //scope.ref = selected[0];
                scope.settle_obj = scope.ref.settle_obj;
                var acc_item = scope.ref.acc_item;
                if(acc_item){
                    scope.loadData('订单核算明细',acc_item['订单核算明细']);
                    calc_acc();
                }
            }
            function calc_acc(){
                scope.amount = 0 ;
                _.each(scope.data['订单核算明细'],function(item){
                    item.rate = EnumSrvc.CurrencyRate[item.currency_id];
                    if(item.num_of_people
                       &&item.unit_price
                       &&item.rate){
                        item.local_currency_total  = (item.num_of_people*item.unit_price).toFixed(2);
                        item.RMB_total = (item.num_of_people*item.unit_price*item.rate).toFixed(2);
                        scope.amount  +=+ item.RMB_total;
                    }else{
                        item.local_currency_total = 0;
                        item.RMB_total = 0;
                    }
                });
            }
        }

        function add_order_acc(scope){
             scope.action_map = {
                '保存':submit,
                '添加核算明细':add_group_acc,
                '删除核算明细':delete_accounting_acc,
                '删除参团费用':delete_group_acc,
            };
            scope.init = function(){
                //var selected = $rootScope.pre_scope().gridSel['订单核算']; 
                //scope.ref = selected[0];
                scope.settle_obj = scope.ref.settle_obj;
                var acc_item = scope.ref.acc_item;
                if(acc_item){
                    scope.loadData('订单核算明细',acc_item['订单核算明细']);
                    calc_acc();
                }
                _.each(scope.data['订单核算明细'],function(item){
                    item.settle_obj = scope.settle_obj;
                })
            }
            scope.calc_acc = calc_acc;
            function submit(){
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                calc_acc();
                var acc_item = {'订单核算明细':scope.data['订单核算明细']};
                //var pre_scope = $rootScope.pre_scope();
                //var index = pre_scope.data['订单核算'].indexOf(scope.ref);
                scope.ref.acc_item = acc_item;
                scope.ref.payable = $rootScope.cur_scope().amount;
                scope.ref.paid = scope.ref.paid||0;
                scope.ref.pay_diff = scope.ref.payable - (scope.ref.paid||0);
                // pre_scope.data['订单核算'][index].acc_item = acc_item;

                // pre_scope.data['订单核算'][index].payable = $rootScope.cur_scope().amount;
                // pre_scope.data['订单核算'][index].paid = scope.ref.paid||0//0;
                // pre_scope.data['订单核算'][index].pay_diff = pre_scope.data['订单核算'][index].payable - pre_scope.data['订单核算'][index].paid;
                $rootScope.close_view(); 
            }
            function add_group_acc(store_id,data){
                 var row = {
                    'settle_obj':scope.settle_obj,
                };
                scope.loadData('订单核算明细',[row],'new');
            }
            function delete_group_acc(store_id,data){
                scope.delete_row(store_id,data);
                calc_acc();
            }
            function delete_accounting_acc(store_id,data){
                scope.delete_row(store_id,data);
                calc_acc();
            }
            function calc_acc(){
                scope.amount = 0 ;
                _.each(scope.data['订单核算明细'],function(item){
                    item.rate = EnumSrvc.CurrencyRate[item.currency_id];
                    if(item.num_of_people
                       &&item.unit_price
                       &&item.rate){
                        item.local_currency_total  = (item.num_of_people*item.unit_price).toFixed(2);
                        item.RMB_total = (item.num_of_people*item.unit_price*item.rate).toFixed(2);
                        scope.amount  +=+ item.RMB_total;
                    }else{
                        item.local_currency_total = 0;
                        item.RMB_total = 0;
                    }
                });
            }
        }


        function pd_subtag_dist(scope){
            scope.action_map = {
                '选定员工':select_employee_done,
            };
            function select_employee_done(store_id,data,meta,action){
                var selected = $rootScope.cur_scope().selected;
                if(!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }

                var scope = $rootScope.pre_scope();
                scope.loadData('分团绑定员工',selected,'employee_id');
                $rootScope.close_view();
            }
        }

        function dist_budget(scope){
            scope.action_map={
                '选定团队':select_group_done,
                '选定员工':select_employee_done,
            }
            function select_group_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var cmp = 'holder_ids';
                var arr = _.pluck(selected,cmp);
                arr = _.uniq(arr);
                if(arr.length>1){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_SETTLE_GROUP_MANAGE'));
                    return;
                }
                var holder_ids = angular.fromJson(selected[0]['holder_ids']);
                scope.loadData('团队详情-分配预算',selected,'id');
                var pre_scope = $rootScope.pre_scope();
                pre_scope.data['可选控团人'] = {};
                angular.forEach(EnumSrvc['FullEmployee'],function(item,key){
                    if(holder_ids.indexOf(key)!==-1){
                        pre_scope.data['可选控团人'][key] = item; 
                    }
                })
                $rootScope.close_view();
            }

            function select_employee_done(){
                var selected = $rootScope.cur_scope().selected;

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }

                scope.loadData('绑定员工-分配预算',selected);

                $rootScope.close_view();
            }
        }

        function calc_order(){
            var scope = $rootScope.cur_scope();
            var data = scope.data;
            if(!_.isEmpty(data['订单应收'])){
                _.each(data['订单应收'],function(item){
                    if(!_.isEmpty(item)){
                        item.receive_diff = (item.receivable - item.received).toFixed(2);
                    }
                });
            }
            if(!_.isEmpty(data['订单应转'])){
                _.each(data['订单应转'],function(item){
                    if(!_.isEmpty(item)){
                        item.settle_diff = (item.settleable - item.settled).toFixed(2);
                    }
                });
            }
            if(!_.isEmpty(data['订单应付'])){
                _.each(data['订单应付'],function(item){
                    if(!_.isEmpty(item)){
                        item.pay_diff = (item.payable - item.paid).toFixed(2);
                    }
                });
            }
        }

        function calc_acc(){
            var scope = $rootScope.cur_scope();
            scope.amount =0;
            scope.group_price_people = 0;
            scope.group_price = 0;

            scope.other_fee_people = 0;
            scope.other_fee = 0;
            _.each(['参团费用','其他费用'],function(i){

                _.each(scope.data[i],function(item){
                    if(item.num_of_people
                       &&item.unit_price
                       ){
                        item.total  = (item.num_of_people*item.unit_price).toFixed(2);
                        scope.amount +=+ item.total;
                        if(i=='参团费用'){
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

        function group_manager_modify(scope){
            var _data = {
                id:scope.ref.id,
                old_selected:scope.ref.manager_id,
                type:'Employee',
                edit_path:'可绑定人员',
                '可绑定人员':scope.data['可绑定人员'],
                old_selected_label:I18nSrvc.get('OLD_MANAGER_ID'),
                new_selected_label:I18nSrvc.get('NEW_MANAGER_ID'),
            };
            scope.data = _data;
        }

        function group_modify(scope){
            //scope.action_map = {'选定产品':select_product_done};

            var _data = scope.data;
            var data = {
                id:_data.id,
                product_id:_data.product_id,
                items:{
                       //  dep_date:['DEP_DATE',_data.dep_date]
                       // ,back_date:['BACK_DATE',_data.back_date]
                       seat_plan:['SEAT_PLAN',+_data.seat_plan]
                       ,seat_total:['SEAT_TOTAL',+_data.seat_total]
                       // ,sale_comment:['SALE_COMMENT',_data.seat_comment]
                       // ,product_id:['PRODUCT_ID',_data.product_id]
                   },
            };
            for (var key in data.items) {
                data[key] = data.items[key][1];
            }
            scope.data = data;
            // scope.select_product  = function(){
            //     var action = (scope.action == '修改团队')?'选择产品':'选择产品-同业';
            //     $rootScope.trigger(action);
            // }
            scope.submit = function(){
                var new_data = {
                    id: data.id,
                }
                for (var key in data.items) {
                    new_data[key] = data[key];
                }
                AjaxSrvc.submit(scope.cfg.submit.url,new_data).then(function(data){
                        CommSrvc.info(data.message).result.then(function(){
                            $rootScope.pre_scope().load();
                            $rootScope.close_view();
                        });
                });
            };

            function select_product_done(){
                var data = $rootScope.cur_scope().selected;
                if(!CommSrvc.chk_sel(data)){
                    return;
                }
                scope.data.product_id = data[0].id;
                $rootScope.close_view();
            }
        }

        function group_edit_price(scope){
            scope.action_map = {
                '提交':submit,
            };
            function submit(){
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                var data = $rootScope.get_req_data(
                        scope.cfg.submit.data,scope.data);
                data['id'] = scope.ref.id;
                AjaxSrvc.submit(scope.cfg.submit.url,data)
                        .then(function(data){
                        CommSrvc.info(data.message).result.then(function(){
                            $rootScope.pre_scope().load();
                            $rootScope.close_view();
                    });
                 })
            }
        }

        function enable_batch_edit_price(){
            var scope = $rootScope.cur_scope();
            if(!(scope.selected && scope.selected.length )){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return false;
            }
            if(scope.selected.length !=1){
                CommSrvc.error(I18nSrvc.get('ONLY_CAN_ONE_RECORD'));
                return false;
            }
            return true;
        }
        function batch_edit_modify_price(scope){
            scope.init = function(){
                var selected = $rootScope.pre_scope().selected[0];
                AjaxSrvc.get('/group/Group/read_edit',{id:selected['id']}).then(function(res){
                    scope.loadData('出团详情-活动',res['出团详情-活动']);
                    scope.loadData('团队费用-同业',res['团队费用-同业']);
                });
            }
        }

        function group_edit_price_batch(scope){
            scope.action_map = {
                '选定团队':select_group_done
            };
            function select_group_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!CommSrvc.chk_sel(selected)){
                    return;
                }
                var pre = $rootScope.pre_scope();
                AjaxSrvc.get('/group/Group/read_for_modify_price_batch',{id:selected[0]['id']}).then(function(res){
                    if(res['团队信息-批量改价']){
                        pre.loadData('团队信息-批量改价',res['团队信息-批量改价']);
                    }
                    if(res['团队费用-批量改价']){
                        pre.loadData('团队费用-批量改价',res['团队费用-批量改价']);
                    }
                    $rootScope.close_view();
                });
            }
            scope.init = function(){
                scope.cfg.btn_hide = scope.cfg.btn_hide||{};
                angular.forEach(['选择团队-批量改价','选择团队-批量改价-同业']
                    ,function(i){
                        scope.cfg.btn_hide[i] = 1;
                    });
                if(scope.action =='批量改价'){
                    scope.cfg.btn_hide['选择团队-批量改价'] = 0;
                }else if(scope.action  == '批量改价-同业'){
                    scope.cfg.btn_hide['选择团队-批量改价-同业'] =0;
                }
            }
        }
        function group_under_shelf_batch(scope){
            scope.action_map = {
                '选定团队':select_group_done
            };
            function select_group_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!CommSrvc.chk_sel(selected)){
                    return;
                }
                var under_check = true;
                var err_group_num = '';
                angular.forEach(selected,function(item,key){
                    if(item['seat_total'] != item['seat_surplus']){
                        under_check = false;
                        err_group_num = item['group_num'];
                    }
                })
                if(!under_check){
                    CommSrvc.error(err_group_num+I18nSrvc.get('ORDER_IS_EXISTING'));
                    return;
                }
                var pre = $rootScope.pre_scope();
                var cur = $rootScope.cur_scope();  
                pre.loadData(cur.assoc_store_id,selected,true);
                $rootScope.close_view();
            }
            scope.init = function(){
                scope.cfg.btn_hide = scope.cfg.btn_hide||{};
                angular.forEach(['选择团队-批量下架','选择团队-批量下架-同业']
                    ,function(i){
                        scope.cfg.btn_hide[i] = 1;
                    });
                if(scope.action =='批量下架团队'){
                    scope.cfg.btn_hide['选择团队-批量下架'] = 0;
                }else if(scope.action  == '批量下架团队-同业'){
                    scope.cfg.btn_hide['选择团队-批量下架-同业'] =0;
                }
            }
        }
        function group_event_set(scope){
            scope.action_map = {
                '选定团队':select_group_done
            };
            scope.dct_days_change = function(row,col){
                if(!_.isEmpty(row['dct_end_date'])&&!_.isEmpty(row['dct_start_date'])){
                    row['dct_days'] = moment(row['dct_end_date']).diff(row['dct_start_date'],'days')+1;
                }
            }
            function select_group_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!CommSrvc.chk_sel(selected)){
                    return;
                }
                var pre = $rootScope.pre_scope();
                var cur = $rootScope.cur_scope();
                pre.loadData(cur.assoc_store_id,selected);
                $rootScope.close_view(); 
            }
        }
        function setting_dct_bacth(scope){
            scope.data = {
                type: 'DctAgreement'
            };
            scope.submit = function(){
                var selected = $rootScope.pre_scope().gridSel[scope.assoc_store_id];
                angular.forEach(selected,function(item){
                    item['dct'] = scope.data.selected;
                });
                $rootScope.close_view();
            };
        }
        function group_event_cancel(scope){
            scope.action_map = {
                '选定团队':select_group_done
            };
            function select_group_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!CommSrvc.chk_sel(selected)){
                    return;
                }
                var pre = $rootScope.pre_scope();
                var cur = $rootScope.cur_scope();
                pre.loadData(cur.assoc_store_id,selected);
                $rootScope.close_view(); 
            }
        }
        function delete_batch_event(action,meta,cfg,store_id,data){
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
        function seat_total_click_group_manager(scope){
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
                angular.forEach(scope.data['库存-团队成本'],function(item){
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
        function order_mandual_edit(scope){
            scope.init = function(){
                scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
                scope.cfg.btn_hide = scope.cfg.btn_hide || {};
                angular.forEach(['录入订单应收明细','录入订单应转明细','查看订单应转明细'],function(i){
                    scope.cfg.btn_hide[i] = 1;
                });
                angular.forEach(['订单应转历史','订单参团历史'],function(i){
                    if(scope.data[i]){
                        scope.cfg.btn_hide[i] = 0;
                    }else{
                        scope.cfg.btn_hide[i] = 1;
                    }
                });
            }
        }
        function order_mandual_approve(scope){
            scope.init = function(){
                scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
                scope.cfg.btn_hide = scope.cfg.btn_hide || {};
                angular.forEach(['录入订单应收明细','录入订单应转明细','录入订单手动优惠','录入订单手动优惠'],function(i){
                    scope.cfg.btn_hide[i] = 1;
                });
                angular.forEach(['订单应转历史','订单参团历史'],function(i){
                    if(scope.data[i]){
                        scope.cfg.btn_hide[i] = 0;
                    }else{
                        scope.cfg.btn_hide[i] = 1;
                    }
                });
            }
        }
        function order_mandual_add(scope){
            scope.init = function(){
                var data = angular.copy($rootScope.pre_scope().data['订单应转'][0].acc_item)||{};
                scope.block_hide = scope.block_hide||{};
                scope.loadData('参团费用',data['参团费用']);
                scope.loadData('其他费用',data['其他费用']);
                scope.loadData('手动优惠',data['手动优惠']||[]);
                if(!_.isUndefined(data['自动优惠'])
                    &&!_.isEmpty(data['自动优惠'])
                    &&(_.isUndefined($rootScope.appUser.supplier_id)
                      ||$rootScope.appUser.supplier_id=='0')){
                    scope.loadData('自动优惠',data['自动优惠']);
                }else{
                    scope.block_hide['自动优惠'] =1;
                }
                if(!_.isUndefined(data['其他费用'])
                    &&!_.isEmpty(data['其他费用'])
                    &&(_.isUndefined($rootScope.appUser.supplier_id)
                      ||$rootScope.appUser.supplier_id=='0')){
                    scope.block_hide['其他费用'] =0;
                }else{
                    scope.block_hide['其他费用'] =1;
                }
                calc_acc();
                var price_type = _.indexBy($rootScope.pre_scope().price_config,'price_type');
                scope.data['团费类型选项'] = {};
                for (var i in price_type) {
                    scope.data['团费类型选项'][i] = EnumSrvc['PriceType'][i];
                }
            }
            scope.calc_acc = calc_acc;
            function calc_acc(){
                scope.amount =0;
                scope.group_price_people = 0;
                scope.group_price = 0;

                scope.other_fee_people = 0;
                scope.other_fee = 0;
                scope.manual_discount_num = 0;
                scope.manual_discount_total = 0;
                _.each(['参团费用','其他费用'],function(i){

                    _.each(scope.data[i],function(item){
                        if(item.num_of_people
                           &&item.unit_price
                           ){
                            item.total  = parseFloat((item.num_of_people*item.unit_price).toFixed(2));
                            scope.amount +=+ item.total;
                            if(i=='参团费用'){
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
                scope.discount_amount = 0;

                
                if(scope.data['自动优惠']
                    &&!_.isEmpty(scope.data['自动优惠'])
                    &&scope.data['自动优惠'][0].dct){
                    var dct = EnumSrvc['DctAgreementCfg'][scope.data['自动优惠'][0].dct];
                    if(dct){
                        switch(dct[0]){
                            //自动优惠计算时 不计算其他费用
                            case '1':
                                scope.discount_amount = parseFloat(((scope.group_price)*(dct[1]/100)).toFixed(2));
                                break;
                            case '2':
                                scope.discount_amount = scope.group_price_people *dct[1];
                                break;
                        }
                        scope.data['自动优惠'][0].amount = scope.discount_amount;
                    }else{
                        scope.data['自动优惠'][0].amount = 0;
                    }
                }

                if(scope.data['手动优惠']
                    &&!_.isEmpty(scope.data['手动优惠'])){
                    _.each(scope.data['手动优惠'],function(item){
                        item['total']  = parseFloat((item['num_of_people']*item['unit_price']).toFixed(2));
                        scope.discount_amount += +(item['total']);
                        scope.manual_discount_num += +item['num_of_people'];
                        scope.manual_discount_total += +(item['total']);
                    });
                    scope.discount_amount = scope.discount_amount.toFixed(2);
                    scope.manual_discount_num = scope.manual_discount_num.toFixed(2);
                    scope.manual_discount_total = scope.manual_discount_total.toFixed(2);
                }
            }
            function submit(){
               
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                var check = true;
                angular.forEach(scope.data['手动优惠'],function(item){
                    if(check&&item.unit_price<=0){
                        check = false;
                    }
                });
                if(!check){
                    CommSrvc.error(I18nSrvc.get('MANUALLY_DISCOUNT_BIGGER_THAN_ZERO'));
                    return;
                }
                //检验参团费用 价格类型每种只能出现一次
                //其他费用同上
                calc_acc();
                var acc_item = {'参团费用':scope.data['参团费用'],'其他费用':scope.data['其他费用']};
                if(scope.data['自动优惠']&&!_.isEmpty(scope.data['自动优惠'])){
                    acc_item['自动优惠'] = scope.data['自动优惠']
                }
                if(scope.data['手动优惠']&&!_.isEmpty(scope.data['手动优惠'])){
                    acc_item['手动优惠'] = scope.data['手动优惠']
                }
                var pre_scope = $rootScope.pre_scope();
                pre_scope.data['订单应转'][0].acc_item = acc_item;

                pre_scope.data['订单应转'][0].settleable = $rootScope.cur_scope().group_price + $rootScope.cur_scope().other_fee -$rootScope.cur_scope().discount_amount ;
                pre_scope.data['订单应转'][0].settled = pre_scope.data['订单应转'][0].settled||0;
                pre_scope.data['订单应转'][0].settle_diff = pre_scope.data['订单应转'][0].settleable;
                $rootScope.close_view(); 
            }
            scope.action_map = {
                '保存':submit,
            }
        }

        function order_timer_setting(scope){
            scope.submit = function(){
                var limit_type = scope.data.limit_type;
                if(!limit_type){
                    CommSrvc.error(I18nSrvc.get('ERR_LIMIT_TYPE'));
                }
                switch(limit_type){
                    case appConst.LIMIT_RESEVER:
                        $rootScope.close_view();
                        $rootScope.trigger('订单占位时限',null,null,scope.data);
                        break;
                    case appConst.LIMIT_PAY:
                        $rootScope.close_view();
                        $rootScope.trigger('订单付款时限',null,null,scope.data);
                        break;
                    default:
                    break;
                }
            }
        }
        //停用协议
        function disable_discount(action,meta,cfg,store_id,data){
            data.dct_id = 0;
            data.amount = 0;
            var scope = $rootScope.cur_scope();
            scope.calc_acc();
        }

        function upload_product_attach(action,meta,cfg,store_id,data){
            var product_id = data.id;
            var el = $("#comm_upload");
            el.unbind('change');
            el.bind('change',function(){
                var data = new FormData();
                data.append('file', el[0].files[0]);
                data.append('id',product_id);
                el.val('');
                AjaxSrvc.upload(data,cfg.upload).then(function(response){
                    $rootScope.cur_scope().load();
                    CommSrvc.info(response.message);
                });
            });
            el.click();
        }


        function group_specify(scope){
            var _data = {
                type : 'FullEmployee',
                id : scope.ref.id,
                selected : _.filter(scope.data['指定人员'],function(item){return $rootScope.get_enum('FullEmployee')[item]}),
            };
            scope.data = _data;
        }

        function order_payable_statistics(scope){
            scope.init = function (){
                var pre = $rootScope.pre_scope();
                var data = {amount:((pre.group_price||0) + (pre.other_fee||0) - (pre.charge_back||0)).toFixed(2)};
                scope.items = [
                    {img:'img/expend.png',name:I18nSrvc.get("ORDER_PAYABLE_TOTAL"),num:data.amount},
                ];
            }
        }
        function order_accounting_statistics(scope){
            scope.init = function (){
                var pre = $rootScope.pre_scope();
                var data = {amount:pre.amount};
                scope.items = [
                    {img:'img/expend.png',name:I18nSrvc.get("ORDER_ACCOUNTING_TOTAL"),num:data.amount},
                ];
            }
        }


        function group_settle_approve(scope){
            scope.init = init();
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
                scope.profit = scope.receivable - scope.payable;
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

        function order_payable_total_detail(scope){
            var cur = $rootScope.cur_scope();
            var pre = $rootScope.pre_scope();
            scope.loadData('订单应付',pre.data[cur.assoc_store_id]);
        }
        function order_acc_check_total_detail(scope){
            var cur = $rootScope.cur_scope();
            var pre = $rootScope.pre_scope();
            scope.loadData('订单对账',pre.data[cur.assoc_store_id])
        }
        function order_acc_total_detail(scope){
            var cur = $rootScope.cur_scope();
            var pre = $rootScope.pre_scope();
            scope.loadData('订单核算',pre.data[cur.assoc_store_id]);
        }
        function select_group_batch_budget(scope){
            var cur = $rootScope.cur_scope();
            var selected = cur.gridSel[scope.assoc_store_id];
            var holder_ids = angular.fromJson(selected[0]['holder_ids']);
            scope.data['可选控团人'] = {};
            angular.forEach(EnumSrvc['FullEmployee'],function(item,key){
                if(holder_ids.indexOf(key)!==-1){
                    scope.data['可选控团人'][key] = item; 
                }
            })
            scope.submit = function(){
                angular.forEach(selected,function(item){
                    item['manager_id'] = scope.data.id;
                });
                $rootScope.close_view();
            };
        }
        function change_assitant(scope){
            scope.submit = function(){
                AjaxSrvc.submit(scope.cfg.submit.url,{'order_id':scope.ref.order_id,'assitant_id':scope.data.assitant_id}).then(function(data){
                        CommSrvc.info(data.message).result.then(function(){
                            $rootScope.pre_scope().load();
                            $rootScope.close_view();
                        });
                });
            }
        }
        function edit_group_ty(action,meta,cfg,store_id,data){
            switch(data.group_way){
                case appConst.GROUPWAY_TY:
                case appConst.GROUP_WAY_SELF_ORG:
                    $rootScope.trigger('修改预算-同业',meta,null,data);
                    break;
                case appConst.GROUPWAY_EVENT:
                    $rootScope.trigger('修改预算-同业活动',meta,null,data);
                    break;
                default:
                    break;
            }
        }
        function edit_group(action,meta,cfg,store_id,data){
            switch(data.group_way){
                case appConst.GROUPWAY_TY:
                case appConst.GROUP_WAY_SELF_ORG:
                    $rootScope.trigger('修改预算',meta,null,data);
                    break;
                case appConst.GROUPWAY_EVENT:
                    $rootScope.trigger('修改预算-活动',meta,null,data);
                    break;
                default:
                    break;
            }
        }
        function export_tourist_list(action,meta,cfg,store_id,data){
            window.open(appConst.HOST + cfg.read.url+'?action=' + action +'&id=' + data.id);
        }
    }
})();