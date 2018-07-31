(function() {
    'use strict';

    angular
        .module('app')
        .factory('SaleSrvc', SaleSrvc);

    SaleSrvc.$inject = ['$rootScope','CommSrvc','EnumSrvc','AjaxSrvc','appConst','I18nSrvc','FieldSrvc','$timeout'];
    function SaleSrvc($rootScope,CommSrvc,EnumSrvc,AjaxSrvc,appConst,I18nSrvc
        ,FieldSrvc,$timeout){

        return {
            //订单
            '占位订单':hold_seat,
            '占位订单-单团':hold_seat,
            '占位订单-活动专区':hold_seat,

            '实报订单':sign_up,
            '实报订单-单团':sign_up,
            '实报订单-异部':order_edit,
            '实报订单-同部':order_edit,
            '实报订单-活动专区':order_edit,

            '修改订单':order_modify,
            '修改订单-活动':order_edit,
            '修改订单-同部':order_edit,
            '修改订单-异部':order_edit,

            '订单名单':modify_order_tourist_list,
            '查看订单-销售中心':order_see,
            '查看订单-销售-活动':order_detail,
            '查看订单-销售-同部':order_detail,
            '查看订单-销售-异部':order_detail,

            //detail
            '订单新增客户':order_new_cstm,
            '占位新增客户':hold_new_cstm,

            //小核算
            '录入订单应收明细':add_order_receivable,
            '查看订单应收明细':order_receivable_see,
            '录入订单应转明细':order_settleable,
            '查看订单应转明细':order_settleable_see,
            '销售订单核算编辑':order_acc,

            '订单应转变更':order_change_edit,
            '活动订单应转变更':order_change_edit,
            '销售订单变更':order_change,
           // '订单应转审批':order_detail,
            '同业订单应转变更审批': ty_order_change_approve,
            '订单应转变更审批':order_change_approve,


            '订单应转变更审批-非活动':order_detail,
            '同业订单应转变更审批-非活动':order_detail,
            '订单应转变更审批-活动':order_detail,
            '同业订单应转变更审批-活动':order_detail,
            '订单应收变更审批-异部':order_detail,
            '订单应收变更审批-同部':order_detail,

            '订单应转历史':order_history,
            '订单应付历史':order_history,
            '订单对账历史':order_history,
            '订单参团历史':order_history,
            '订单应收历史':order_history,
            '订单团队历史':order_history,
            '订单应付历史-活动':order_history,
            '订单客户历史':order_history,
            '还原应转变更':restore_change,
            //应转管理
            '查看核算明细':acc_detail_see,
            '查看应转核算明细':settle_acc_detail_see,
            '查看应转总计-查看明细':settle_acc_total_see,
            '批量增加游客':add_visitor_bacth,
            '纸质合同关联订单':papcontract_relate_order,
            //询单
            '新增询单':inquiry_edit,
            '修改询单':inquiry_edit,
            '询单选定客户':inquiry_select_cstm,
            '询单新增客户':inquiry_add_cstm,
            '询单关联订单':inquiry_related_order,
            '选定订单-关联询单':select_order_related_inquiry,
            //订单
            '可否修改订单应收':is_order_change_ok,
            '可否进行应转变更':is_order_change_ok,
            '修改订单应收':order_modify_receivable,
            '订单应收变更审批':order_receivable_approve,
            '修改订单应收-异部':order_edit,
            '修改订单应收-同部':order_edit,
            //下载参团模板
            '下载参团模板':download_tourist_template,
            '上传参团':order_upload_tourist_excel,
            '订单上传参团':upload_tourist_excel,
            '订单批量设置证件类型':order_set_certificate_type_batch,
            '订单查看合同':order_contract_see,
            '选择团费类型':select_group_price_type,
            '选定团费类型':selected_group_price_type_done,
            '可否选择团费类型':is_select_group_price_type_ok,
            '删除其他费用':delete_other_fee,

            '查看应转总计':order_settleable_statistics,

            '查看订单已收-订单详情':order_received_see,
            '查看订单已转-订单详情':order_settled_see,
            '选择团队-订单变更':select_group_order_change,
            '选定团队-订单应转变更':select_group_done_order_change,
        };
        function select_group_price_type(scope){
            var price_config = scope.pre_scope().price_config;
            scope.loadData('团队费用-订单',price_config);
        }

        function selected_group_price_type_done(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var ref = scope.ref;
            if(_.isEmpty(scope.gridSel['团队费用-订单'])){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var selected = scope.gridSel['团队费用-订单'][0];
            ref.price_type = selected.price_type;
            ref.unit_price = selected.peer_price;
            ref.price_type_comment  = selected.comment||'';
            $rootScope.close_view();
        }

        function is_select_group_price_type_ok(data,store_id){
            var scope = $rootScope.cur_scope();
            if(scope.cfg.ro){
                var index = scope.cfg.block.indexOf(store_id);
                if(scope.cfg.ro[index]){
                    return false;
                }
            }
            return true;
        }
        function delete_other_fee(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            //scope.other_fee_change = other_fee_change;
            scope.calc_acc = calc_acc;
            scope.delete_row(store_id,data);
            calc_acc();
            function calc_acc(){
                scope.other_fee_people = 0;
                scope.other_fee = 0;
                scope.total = 0;
                _.each(scope.data['其他费用'],function(item){
                    if(item.num_of_people && item.unit_price){
                        item.total  = (item.num_of_people*item.unit_price).toFixed(2); 
                        scope.other_fee_people +=+ item.num_of_people;
                        scope.other_fee +=+ item.total;
                    }
                }); 
            }
            // function other_fee_change(row){
            //     var other_fee_types = _.filter(_.pluck(scope.data['其他费用'],'settle_item_id'),function(item){
            //         return !_.isUndefined(item);
            //     });
            // }
        }
        function add_visitor_bacth(scope){
            scope.text = I18nSrvc.get('ADD_VISITOR_BATCH');
            scope.type = 'number';
            scope.submit = function(){
                var pre_scope = $rootScope.pre_scope();
                var num_of_add = scope.data.value;
                for (var i = num_of_add - 1; i >= 0; i--) {
                    var row = {};
                    row.name = '虚拟游客';
                    row.index =  pre_scope.data['订单参团'].length+1;
                    pre_scope.loadData('订单参团',[row],'new');
                }
                pre_scope.data['订单详情'][0].num_of_people = pre_scope.data['订单参团'].length;
                if(pre_scope.action == '订单应转变更')
                pre_scope.tourist_change =true;
                $rootScope.close_view();
            }
        }
        //占位订单
        function hold_seat(scope){
            scope.data.group_id = scope.ref.id;
            scope.data.edit_path = '可接单人';
            scope.action_map = {
                '选定客户':select_cstm_done,
            };
            function select_cstm_done(){
                var selected = $rootScope.cur_scope().selected;

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var scope = $rootScope.pre_scope();
                scope.data.cstm_id  = selected[0].id;
                scope.data.short_name = selected[0].short_name;
                $rootScope.close_view();
            }
            scope.submit = function(){
                if(!scope.data.cstm_id||_.isEmpty(scope.data.cstm_id)){
                    CommSrvc.error(I18nSrvc.get('SEL_CSTM'));
                    return;
                }
                if(!scope.data.assitant_id||_.isEmpty(scope.data.assitant_id)){
                    CommSrvc.error(I18nSrvc.get('SEL_ASSITANT'));
                    return;
                }
                AjaxSrvc.submit(scope.cfg.submit.url,{group_id:scope.data.group_id,cstm_id:scope.data.cstm_id,
                                num_of_people:scope.data.num_of_people,assitant_id:scope.data.assitant_id}).then(function(data){
                    CommSrvc.info(data.message).result.then(function(){
                        $rootScope.pre_scope().load();
                        $rootScope.close_view();
                    });
                });
            }
        }
        //报名trigger
        function sign_up(action,meta,cfg,store_id,data){
            if(data.manager_department_id!=$rootScope.appUser.department_id){
                $rootScope.trigger('实报订单-异部',meta,store_id,data);
            }else{
                $rootScope.trigger('实报订单-同部',meta,store_id,data);
            }
        }

        function order_modify(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('修改订单-活动',meta,store_id,data);
            }else if(data.order_yb==appConst.ORDER_YB){
                $rootScope.trigger('修改订单-异部',meta,store_id,data);
            }else{
                $rootScope.trigger('修改订单-同部',meta,store_id,data);
            }
        }

        function IdCard(UUserCard){
            var birthday=UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
            var gender = (parseInt(UUserCard.substr(16, 1)) % 2 == 1) ? '0' : '1';
            return [birthday,gender];
        }

        function id_changed(rowEntity,colDef){
            var card_type = rowEntity['certificate_type'];
            if ((card_type==1) && IdentityCodeValid(rowEntity['certificate_num'])) {     // 身份证类型
                var data = IdCard(rowEntity['certificate_num']);
                rowEntity['birthday']  = data[0];
                rowEntity['gender']  = data[1];
            }
        }

        function IdentityCodeValid(code) { 
            var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
            var pass= true;

            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
                pass = false;
            }

            else if(!city[code.substr(0,2)]){
                pass = false;
            }
            else{
                //18位身份证需要验证最后一位校验位
                if(code.length == 18){
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17]){
                        pass =false;
                    }
                }
            }
            return pass;
        }

        function order_edit(scope){
            scope.id_changed = id_changed;

            scope.action_map = {
                '选定客户':select_cstm_done,
                '选定团队':select_group_done,
                '订单实报-修改':real_sign_up,
                // '添加参团':add_tourist,
                // '批量增加游客':add_visitor_bacth,
                '批量删除参团':batch_delete_tourist,
                '删除参团':delete_tourist,
                '选定纸质合同-订单':select_pap_contract_done,
            };
            scope.init = function(){
                if (!scope.data['合同详情']||_.isEmpty(scope.data['合同详情'])) {
                    scope.block_hide = scope.block_hide||{};
                    angular.forEach(['合同详情'],function(i){
                        scope.block_hide[i] = 1;
                    });
                }
                scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
                scope.cfg.btn_hide = scope.cfg.btn_hide || {};
                //
                var createAction = ['实报订单-异部','实报订单-同部','实报订单-活动专区'];
                if(createAction.indexOf(scope.action)!=-1){
                    angular.forEach(['查看订单应收明细','查看订单应转明细','录入订单手动优惠','订单团队历史'],function(i){
                        scope.cfg.btn_hide[i] = 1;
                    });
                    if(scope.data['订单应转']){
                        var settle_data = {settle_obj_id:scope.data['订单团队'][0].manager_department_id,acc_item:{}};
                        if(scope.data['订单团队'][0].dct != '0'
                            &&moment().isBetween(scope.data['订单团队'][0].dct_start_date,moment(scope.data['订单团队'].dct_end_date).add(1,'days'))){
                            settle_data['acc_item']['自动优惠'] = [{dct:scope.data['订单团队'][0].dct,amount:0}];
                        }
                        scope.loadData('订单应转',[settle_data]);
                    }
                    scope.isCreate = true;
                }
                var modifyAction  = ['修改订单-同部','修改订单-异部'
                                    ,'修改订单应收-异部','修改订单应收-同部'];
                if(modifyAction.indexOf(scope.action)!=-1){
                    angular.forEach(['查看订单应收明细','查看订单应转明细','录入订单手动优惠'],function(i){
                        scope.cfg.btn_hide[i] = 1;
                    });
                    scope.isModify = true;
                    //修改变团时 订单应转特殊处理
                    if(scope.action == '修改订单-异部'&&_.isEmpty(scope.data['订单应转'])){
                        scope.loadData('订单应转',[{settle_obj_id:scope.data['订单团队'][0].manager_department_id}]);
                    }
                }
                angular.forEach(['订单应转历史','订单参团历史','订单应收历史','订单团队历史','订单客户历史'],function(i){
                    if(scope.data[i] && !_.isEmpty(scope.data[i])){
                        scope.cfg.btn_hide[i] = 0;
                    }else{
                        scope.cfg.btn_hide[i] = 1;
                    }
                });
                calc_order(scope);
            }

            // function add_tourist(store_id,data,meta,action ){
            //     scope.loadData(store_id,[{'name':'虚拟游客'}],'new');
            //     var num_of_people = scope.data[store_id].length;
            //     scope.data['订单详情'][0].num_of_people = num_of_people;
            // }
            function delete_tourist(store_id,data){
                scope.delete_row(store_id,data);
                var num_of_people = scope.data[store_id].length;
                scope.data['订单详情'][0].num_of_people = num_of_people;
            }
            function batch_delete_tourist(store_id,data,meta,action){
                var selected = scope.gridSel[store_id];

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                _.each(selected,function(item){
                    scope.delete_row(store_id,item);
                });
                var num_of_people = scope.data[store_id].length;
                scope.data['订单详情'][0].num_of_people = num_of_people;
            }

            function select_cstm_done(){
                var selected = $rootScope.cur_scope().selected;

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var scope = $rootScope.pre_scope();
                scope.loadData('客户详情',selected);
                //订单应收
                if(scope.data['订单应收']){
                    scope.data['订单应收'][0].settle_obj = selected[0].id;
                }
                $rootScope.close_view();
            }
            function select_group_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var scope = $rootScope.pre_scope();
                if(selected[0].id == scope.data['订单团队'][0].id){
                    $rootScope.close_view();
                }else{
                    var group = selected[0];
                    $rootScope.close_view();
                    if(scope.isCreate){
                        if(group.manager_department_id!=$rootScope.appUser.department_id){
                            $rootScope.close_view();
                            $rootScope.trigger('实报订单-异部',{text:scope.text},null,group);
                        }else{
                            $rootScope.close_view();
                            $rootScope.trigger('实报订单-同部',{text:scope.text},null,group);
                        }
                    }else if(scope.isModify){
                        var order = angular.copy(scope.ref);
                        order['group_id'] = group.id;
                        if(group.manager_department_id!=$rootScope.appUser.department_id){
                            $rootScope.close_view();
                            $rootScope.trigger('修改订单-异部',{text:scope.text},null,order);
                        }else{
                            $rootScope.close_view();
                            $rootScope.trigger('修改订单-同部',{text:scope.text},null,order);
                        }
                    }
                }
            }
            function real_sign_up(){
                var data = $rootScope.get_req_data(scope.cfg.submit.data, scope.data);
                data.real_sign_up = true;
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                AjaxSrvc.submit(scope.cfg.submit.url,data).then(function(data){
                    CommSrvc.info(data.message);
                    $rootScope.close_view();
                    $rootScope.cur_scope().load();
                });
            }
            function select_pap_contract_done(){
                var selected = $rootScope.cur_scope().selected;

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                selected[0].contract_kind = appConst.PAP_CONTRACT;

                var scope = $rootScope.pre_scope();
                var assoc_id = $rootScope.cur_scope().assoc_store_id;
                scope.loadData(assoc_id,selected);
                $rootScope.close_view();
            }
        }
        function calc_order(scope){
            scope.receivable = 0 ;
            scope.settleable = 0;
            var data = scope.data;
            if(!_.isEmpty(data['订单应收'])){
                _.each(data['订单应收'],function(item){
                    if(!_.isEmpty(item)){
                        item.receive_diff = item.receivable - item.received;
                        scope.receivable +=+ item.receivable;
                    }
                });
            }
            if(!_.isEmpty(data['订单应转'])){
                _.each(data['订单应转'],function(item){
                    if(!_.isEmpty(item)){
                        item.settle_diff = (item.settleable - item.settled).toFixed(2);
                        scope.settleable +=+ item.settleable;
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
            scope.data['订单利润-销售'] = scope.data['订单利润-销售']||[];
            if(!_.isEmpty(data['订单应收'])&&!_.isEmpty(data['订单应转'])){
                var row = {'receivable':scope.receivable,'settleable':scope.settleable,
                            'profit':(scope.receivable-scope.settleable).toFixed(2)};
                var profit_rate =  (100*(scope.receivable-scope.settleable)/scope.receivable).toFixed(2)+'%';
                row['profit_rate'] = profit_rate;
                scope.loadData('订单利润-销售',[row]);
            }
        }
        function modify_order_tourist_list(scope){
            scope.action_map = {
                '提交':submit,
            };
            function submit(){
                AjaxSrvc.submit(scope.cfg.submit.url,{id:scope.ref.id,data:scope.data}).then(function(data){
                    CommSrvc.info(data.message);
                    $rootScope.close_view();
                    $rootScope.cur_scope().load();
                });
            }
        }

        function order_see(action,meta,cfg,store_id,data){
            //根据控团人与报名人所在部门 trigger
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('查看订单-销售-活动',meta,store_id,data);
            }else if(data.order_yb==appConst.ORDER_YB){
                $rootScope.trigger('查看订单-销售-异部',meta,store_id,data);
            }else{
                $rootScope.trigger('查看订单-销售-同部',meta,store_id,data);
            }
        }

        function order_change(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('活动订单应转变更',meta,store_id,data);
            }else{
                $rootScope.trigger('订单应转变更',meta,store_id,data);
            }
        }

        function order_change_edit(scope){
            scope.init = function(){
                calc_order(scope);
                scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
                scope.cfg.btn_hide = scope.cfg.btn_hide || {};
                angular.forEach(['录入订单应收明细','录入订单应转明细','录入订单手动优惠'],function(i){
                    scope.cfg.btn_hide[i] = 1;
                });
                if(scope.action == '订单应转变更'){
                    scope.cfg.btn_hide['录入订单应转明细'] = 0;
                }
                angular.forEach(['订单应转历史','订单参团历史','订单团队历史'],function(i){
                    if(scope.data[i]&&!_.isEmpty(scope.data[i])){
                        scope.cfg.btn_hide[i] = 0;
                    }else{
                        scope.cfg.btn_hide[i] = 1;
                    }
                });
                scope.settle_change = scope.data['应转变更情况'];
                scope.tourist_change = scope.data['游客变更情况'];
                scope.group_change = scope.data['团队变更情况'];
            }
            scope.action_map = {
                '添加参团':add_tourist,
                '批量删除参团':batch_delete_tourist,
                '删除参团':delete_tourist,
            };
            function add_tourist(store_id,data,meta,action){
                scope.loadData(store_id,[{'name':'虚拟游客'}],'new');
                var num_of_people = scope.data[store_id].length;
                scope.data['订单详情'][0].num_of_people = num_of_people;
                if(scope.action == '订单应转变更')
                scope.tourist_change =true;
            }
            function delete_tourist(store_id,data){
                scope.delete_row(store_id,data);
                var num_of_people = scope.data[store_id].length;
                scope.data['订单详情'][0].num_of_people = num_of_people;
                if(scope.action == '订单应转变更')
                scope.tourist_change =true;
            }
            function batch_delete_tourist(store_id,data,meta,action){
                var selected = scope.gridSel[store_id];

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                _.each(selected,function(item){
                    scope.delete_row(store_id,item);
                });
                var num_of_people = scope.data[store_id].length;
                scope.data['订单详情'][0].num_of_people = num_of_people;
                scope.tourist_change = true;
            }
        }

        function ty_order_change_approve(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('同业订单应转变更审批-活动',meta,store_id,data);
            }else{
                $rootScope.trigger('同业订单应转变更审批-非活动',meta,store_id,data);
            }
        }
        function order_change_approve(action,meta,cfg,store_id,data){
            if(data.order_kind == appConst.ORDER_EVENT){
                $rootScope.trigger('订单应转变更审批-活动',meta,store_id,data);
            }else{
                $rootScope.trigger('订单应转变更审批-非活动',meta,store_id,data);
            }
        }

        function order_detail(scope){
            scope.init = function(){
                calc_order(scope);
                // 展示或隐藏应转变更审批
                if (!scope.data['应转变更审批日志']||_.isEmpty(scope.data['应转变更审批日志'])) {
                    scope.block_hide = scope.block_hide||{};
                    angular.forEach(['应转变更审批日志'],function(i){
                        scope.block_hide[i] = 1;
                    });
                }
                if (!scope.data['应收变更审批日志']||_.isEmpty(scope.data['应收变更审批日志'])) {
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

                scope.price_config = angular.fromJson(scope.data['订单团队'][0].budget);
                scope.cfg.btn_hide = scope.cfg.btn_hide || {};
                angular.forEach(['录入订单应收明细','录入订单应转明细'
                                ,'添加参团','批量删除参团','删除参团','录入订单手动优惠'
                                ,'批量增加游客','下载参团模板','上传参团','选择团队-订单变更'
                                ,'订单选择客户','订单新增客户','订单批量设置证件类型']
                    ,function(i){
                    scope.cfg.btn_hide[i] = 1;
                });
                if(scope.action == '订单应转变更'){
                    scope.cfg.btn_hide['录入订单应转明细'] = 0;
                }
                angular.forEach(['订单应转历史','订单参团历史','订单团队历史','订单应付历史','订单应收历史','订单客户历史'],function(i){
                    if(scope.data[i]&&!_.isEmpty(scope.data[i])){
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

                scope.settle_change = scope.data['应转变更情况'];
                scope.receive_change = scope.data['应收变更情况'];
                scope.tourist_change = scope.data['游客变更情况'];
                scope.cstm_change = scope.data['客户变更情况'];
                scope.group_change = scope.data['团队变更情况'];
            }
        }

        function order_history(scope){
            scope.gridCfg = {};
            scope.price_config = $rootScope.cur_scope().price_config;
            scope.data = angular.copy($rootScope.cur_scope().data);
            var block = {'订单应转历史':'订单应转历史',
                        '订单应付历史':'订单应付历史',
                        '订单对账历史':'订单对账历史',
                        '订单参团历史':'订单参团历史',
                        '订单应收历史':'订单应收历史',
                        '订单团队历史':'订单团队历史',
                        '订单应付历史-活动':'订单应付历史-活动',
                        '订单客户历史':'订单客户历史'
                        }[scope.action];
            var block_cfg = $rootScope.blocks[block];
            scope.repeat_block = [];
            scope.gridCfg[block] = {
                columnDefs:FieldSrvc.get_mod_col(block_cfg,block,1),
                enableColumnMenus: false,
                enableHorizontalScrollbar: $rootScope.gridScroll,
                enableVerticalScrollbar: $rootScope.gridScroll,
                enableRowHeaderSelection:false,
            };
            angular.forEach(scope.data[block],function(his_data,index){
                scope.repeat_block[index] = block;
            });
            angular.forEach(scope.data[block],function(his_data,index){
                scope.gridCfg[block+index] = angular.copy(scope.gridCfg[block]);
               // scope.gridCfg[block+index].data = his_data;
               scope.data[block+index] = his_data;
               scope.gridCfg[block+index].data = scope.data[block+index];
            });
        }
        
        function calc_profit(){
            var scope = $rootScope.cur_scope();
            var data = scope.data;
            var profit = data['订单利润'][0];
            profit.receivable =0;
            profit.payable = 0;
            _.each(data['订单应收'],function(item){
                if(item['receivable']){
                    profit.receivable +=+ item['receivable'];
                    item.receivable = item.RMB_total;
                }
            });
            _.each(data['订单应转'],function(item){
                if(item['settleable']){
                    profit.payable +=+ item['settleable'];
                }
            });
            profit.profit = profit.receivable - profit.payable;
            profit.profit_rate = 'NAN';
            if(profit.payable&&profit.payable!=0){
                profit.profit_rate = ((profit.profit/profit.payable)*100).toFixed(2)+'%';    
            }                
        }

        function order_new_cstm(scope){
            scope.submit = submit;
            function submit(){
                AjaxSrvc.submit(scope.cfg.submit.url,scope.data).then(function(data){
                    CommSrvc.info(I18nSrvc.get('SAVE_SUC')).result.then(function(){
                        $rootScope.close_view();
                        $rootScope.cur_scope().loadData('客户详情',data);
                        if($rootScope.cur_scope().data['订单应收']){
                            $rootScope.cur_scope().data['订单应收'][0].settle_obj = data[0].id;
                        }
                    });
                });
            }
        }

        function hold_new_cstm(scope){
            scope.submit = submit;
            function submit(){
                AjaxSrvc.submit(scope.cfg.submit.url,scope.data).then(function(data){
                    CommSrvc.info(I18nSrvc.get('SAVE_SUC')).result.then(function(){
                        var pre = $rootScope.pre_scope();
                        pre.data.cstm_id  = data[0].id;
                        pre.data.short_name = data[0].short_name;
                        $rootScope.close_view();
                    });
                });
            }
        }

        function add_order_receivable(scope){
            scope.action_map = {
                '保存':submit,
            };
            scope.calc_rec = function(){
                scope.amount = 0;
                _.each(scope.data['应收明细'],function(item){
                    //item.rate = EnumSrvc.CurrencyRate[item.currency_id];
                    if(item.num_of_people
                       &&item.unit_price
                       ){
                        item.total  = (item.num_of_people*item.unit_price).toFixed(2);
                        scope.amount +=+ item.total;
                    }else{
                        item.total = 0;
                    }
                });
                scope.amount = scope.amount.toFixed(2);
            }
            scope.init = function(){
                var data = angular.copy($rootScope.pre_scope().data['订单应收'][0].receive_item);
                scope.loadData('应收明细',data);
                scope.calc_rec();
            }
            function submit(){
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                scope.calc_rec();
                var receive_item = angular.copy($rootScope.cur_scope().data['应收明细']);
                var pre_scope = $rootScope.pre_scope();
                pre_scope.data['订单应收'][0].receive_item = receive_item;
                pre_scope.data['订单应收'][0].receivable = $rootScope.cur_scope().amount;
                pre_scope.data['订单应收'][0].received = 0;
                pre_scope.data['订单应收'][0].receive_diff = pre_scope.data['订单应收'][0].receivable;
                calc_order(pre_scope);
                $rootScope.close_view();
            }
        }
        function order_receivable_see(scope){
            scope.calc_rec = function(){
                scope.amount = 0;
                _.each(scope.data['应收明细'],function(item){
                    //item.rate = EnumSrvc.CurrencyRate[item.currency_id];
                    if(item.num_of_people
                       &&item.unit_price
                       ){
                        item.total  = (item.num_of_people*item.unit_price).toFixed(2);
                        scope.amount +=+ item.total;
                    }else{
                        item.total = 0;
                    }
                });
                scope.amount = scope.amount.toFixed(2);
            }
            scope.init = function(){
                var data = angular.copy($rootScope.pre_scope().data[scope.assoc_store_id][0].receive_item);
                scope.loadData('应收明细',data);
                scope.calc_rec();
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
        function order_settleable_see(scope){
            scope.init = function(){
                var assoc_store_id = scope.assoc_store_id;
                var data = angular.copy($rootScope.pre_scope().data[assoc_store_id][0].acc_item)||{};
                scope.loadData('参团费用',data['参团费用']);
                scope.loadData('其他费用',data['其他费用']);
                scope.block_hide = scope.block_hide||{};
                scope.old_group_price_config = angular.copy($rootScope.pre_scope().data[assoc_store_id][0].old_group_price_config)||{};
                scope.old_group_price_config = scope.old_group_price_config['参团费用']||{};
                scope.old_num_people = 0;
                _.each(scope.old_group_price_config,function(item){
                    scope.old_num_people += +item.num_of_people;
                });
                if(!_.isUndefined(data['其他费用'])
                    &&!_.isEmpty(data['其他费用'])){
                    scope.block_hide['其他费用'] = 0;
                }else{
                    scope.block_hide['其他费用'] = 1;
                }

                if(!_.isUndefined(data['自动优惠'])
                    &&!_.isEmpty(data['自动优惠'])
                    &&(_.isUndefined($rootScope.appUser.supplier_id)
                      ||$rootScope.appUser.supplier_id=='0')){
                    scope.loadData('自动优惠',data['自动优惠']);
                }else{
                    scope.block_hide['自动优惠'] =1;
                }

                if(!_.isUndefined(data['手动优惠'])
                    &&!_.isEmpty(data['手动优惠'])
                    &&(_.isUndefined($rootScope.appUser.supplier_id)
                      ||$rootScope.appUser.supplier_id=='0')){
                    scope.loadData('手动优惠',data['手动优惠']);
                }else{
                    scope.block_hide['手动优惠'] = 1;
                }

                calc_acc();
                // var price_type = _.indexBy($rootScope.pre_scope().price_config,'price_type');
                // scope.data['团费类型选项'] = {};
                // var price_config = angular.copy($rootScope.pre_scope().price_config);
                // angular.forEach(price_config,function(item){
                //     var name = item.price_type+'-'+(item.comment||'');
                //     scope.data['团费类型选项'][name] = name;
                // });
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
                scope.discount_amount = 0;

                if(scope.data['自动优惠']
                    &&!_.isEmpty(scope.data['自动优惠'])
                    &&scope.data['自动优惠'][0].dct){
                    var dct = EnumSrvc['DctAgreementCfg'][scope.data['自动优惠'][0].dct];
                    if(dct){
                        switch(dct[0]){
                            //自动优惠计算时 不计算其他费用
                            case '1':
                                scope.discount_amount = ((scope.group_price)*(dct[1]/100)).toFixed(2);
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
                        item['total'] = (item['num_of_people']*item['unit_price']).toFixed(2);
                        scope.discount_amount += +(item['total']);
                        scope.manual_discount_num += +item['num_of_people'];
                        scope.manual_discount_total += +(item['total']); 
                    });
                }
            }
        }

        function order_settleable(scope){
            scope.action_map = {
                '保存':submit,
                '删除参团费用':delete_group_price,
                '删除其他费用':delete_other_fee,
            };
            scope.init = function(){
                var data = angular.copy($rootScope.pre_scope().data['订单应转'][0].acc_item)||{};
                scope.loadData('参团费用',data['参团费用']);
                scope.loadData('其他费用',data['其他费用']);
                scope.num_of_people = $rootScope.pre_scope().data['订单参团'].length;
                scope.block_hide = scope.block_hide||{};
                scope.isDiscount = ($rootScope.pre_scope().data['订单团队'][0].dct!=0&&moment().isBetween($rootScope.pre_scope().data['订单团队'][0].dct_start_date,moment($rootScope.pre_scope().data['订单团队'].dct_end_date).add(1,'days')))?true:false;
                //变更标记
                scope.isChange =false;
                scope.old_group_price_config = angular.copy($rootScope.pre_scope().data['订单应转'][0].old_group_price_config)||{};
                scope.old_group_price_config = scope.old_group_price_config['参团费用']||{};
                scope.old_num_people = 0;
                _.each(scope.old_group_price_config,function(item){
                    scope.old_num_people += +item.num_of_people;
                });
                if($rootScope.pre_scope().action =='订单应转变更'){
                    scope.isChange =true;
                }
                //若无优惠 则不显示
                //若当前操作人为供应商则不显示
                if(!_.isUndefined(data['自动优惠'])
                    &&!_.isEmpty(data['自动优惠'])
                    &&(_.isUndefined($rootScope.appUser.supplier_id)
                      ||$rootScope.appUser.supplier_id=='0')){
                    scope.loadData('自动优惠',data['自动优惠']);
                }else{
                    scope.block_hide['自动优惠'] =1;
                }

                if(!_.isUndefined(data['手动优惠'])
                    &&!_.isEmpty(data['手动优惠'])
                    &&(_.isUndefined($rootScope.appUser.supplier_id)
                      ||$rootScope.appUser.supplier_id=='0')){
                    scope.loadData('手动优惠',data['手动优惠']);
                }else{
                    scope.block_hide['手动优惠'] = 1;
                }

                calc_acc();
                scope.price_config = $rootScope.pre_scope().price_config;
                // scope.data['团费类型选项'] = {};
                // var price_config = angular.copy($rootScope.pre_scope().price_config);
                // angular.forEach(price_config,function(item){
                //     var name = item.price_type+'-'+(item.comment||'');
                //     scope.data['团费类型选项'][name] = name;
                // });
            }
            // scope.price_type_change = price_type_change;
            //scope.other_fee_change = other_fee_change;
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
                scope.discount_amount = 0;

                //计算自动优惠时需要判断当前团期 是否还存在优惠活动 
                //存在优惠活动
                if(scope.isDiscount){
                    if(scope.data['自动优惠']
                        &&!_.isEmpty(scope.data['自动优惠'])
                        &&scope.data['自动优惠'][0].dct){
                        var dct = EnumSrvc['DctAgreementCfg'][scope.data['自动优惠'][0].dct];
                        if(dct){
                            switch(dct[0]){
                                //自动优惠计算时 不计算其他费用
                                case '1':
                                    scope.discount_amount = ((scope.group_price)*(dct[1]/100)).toFixed(2);
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
                }else{
                    if(scope.isChange){
                        if(scope.data['自动优惠']
                            &&!_.isEmpty(scope.data['自动优惠'])
                            &&scope.data['自动优惠'][0].dct){
                            var dct = EnumSrvc['DctAgreementCfg'][scope.data['自动优惠'][0].dct];
                            var num = (scope.group_price_people>scope.old_num_people)
                                        ?scope.old_num_people
                                        :scope.group_price_people;
                            if(dct){
                                switch(dct[0]){
                                    //自动优惠计算时 不计算其他费用
                                    case '1':
                                        //取价格配置交集
                                        var calc_price_types =_.intersection(
                                            _.pluck(scope.old_group_price_config,'price_type')
                                            ,_.pluck(scope.data['参团费用'],'price_type'));
                                        var calc_amount = 0;
                                        var old = _.indexBy(_.filter(scope.old_group_price_config,function(v){
                                              return calc_price_types.indexOf(v.price_type)!==-1;
                                        }),'price_type');
                                        var new_config = _.indexBy(_.filter(scope.data['参团费用'],function(v){
                                              return calc_price_types.indexOf(v.price_type)!==-1;
                                        }),'price_type'); 
                                        angular.forEach(old,function(item,key){
                                            if(item.num_of_people>new_config[key].num_of_people){
                                                calc_amount +=+ (new_config[key].num_of_people)*(new_config[key].unit_price);
                                            }else{
                                                calc_amount +=+ (item.num_of_people)*(item.unit_price);
                                            }
                                        });
                                        scope.discount_amount = parseFloat(((calc_amount)*(dct[1]/100)).toFixed(2));
                                        break;
                                    case '2':
                                        scope.discount_amount = num *dct[1];
                                        break;
                                }
                                scope.data['自动优惠'][0].amount = scope.discount_amount;
                            }else{
                                scope.data['自动优惠'][0].amount = 0;
                            }
                        } 
                    }
                }

                if(scope.data['手动优惠']
                    &&!_.isEmpty(scope.data['手动优惠'])){
                    _.each(scope.data['手动优惠'],function(item){
                        item['total'] = item['num_of_people']*item['unit_price'];
                        scope.discount_amount += +(item['total']);
                        scope.manual_discount_num += +item['num_of_people'];
                        scope.manual_discount_total += +(item['total']); 
                    });
                }
            }
            function submit(){
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                //检验参团费用 价格类型每种只能出现一次
                //其他费用同上
                var price_type_check = [];
                angular.forEach(scope.data['参团费用'],function(item){
                    price_type_check.push(item.price_type+item.price_type_comment);
                });
                if(price_type_check.length!=_.uniq(price_type_check).length){
                    CommSrvc.error(I18nSrvc.get('GROUP_PRICE_TYPE_MUL'));
                    return;
                }
                var other_fee_types = _.filter(_.pluck(scope.data['其他费用'],'settle_item_id'),function(item){
                    return !_.isUndefined(item);
                });                
                // if(other_fee_types.length!=_.uniq(other_fee_types).length){
                //     CommSrvc.error(I18nSrvc.get('OTHER_FEE_TYPE_MUL'));
                //     return;
                // }
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
                pre_scope.data['订单应转'][0].settled = (!_.isUndefined(pre_scope.data['订单应转'][0].settled)&&!_.isNull(pre_scope.data['订单应转'][0].settled))?pre_scope.data['订单应转'][0].settled:0;
                pre_scope.data['订单应转'][0].settle_diff = pre_scope.data['订单应转'][0].settleable-pre_scope.data['订单应转'][0].settled;
                if(pre_scope.action == '订单应转变更'){
                    pre_scope.settle_change = true;
                }
                calc_order(pre_scope);
                $rootScope.close_view(); 
            }
            function delete_group_price(store_id,data){
                scope.delete_row(store_id,data);
                calc_acc();
            }
            function delete_other_fee(store_id,data){
                scope.delete_row(store_id,data);
                calc_acc();
            }
            // function price_type_change(row){
            //     var price_types = _.pluck(scope.data['参团费用'],'price_type');
            //     if(price_types.length!=_.uniq(price_types).length){
            //         CommSrvc.error(I18nSrvc.get('GROUP_PRICE_TYPE_MUL'));
            //         row.price_type = 0;
            //         row.unit_price = 0;
            //         return;
            //     }
            //     var price_config = angular.copy($rootScope.pre_scope().price_config);
            //     angular.forEach(price_config,function(item){
            //         item.price_type = item.price_type+'-'+(item.comment||'');
            //     });
            //     var price_type = _.indexBy(price_config,'price_type');
            //     row.unit_price = price_type[row.price_type].peer_price;
            // }
            // function other_fee_change(row){
            //     var other_fee_types = _.filter(_.pluck(scope.data['其他费用'],'settle_item_id'),function(item){
            //         return !_.isUndefined(item);
            //     });
            //     if(other_fee_types.length!=_.uniq(other_fee_types).length){
            //         CommSrvc.error(I18nSrvc.get('OTHER_FEE_TYPE_MUL'));
            //         row.settle_item_id = 0;
            //         return;
            //     }
            // }
        } 
        function acc_detail_see(action,meta,cfg,store_id,data){
            switch(data.accounting_type){
                case appConst.ACCOUNTING_ORDER_SETTLE:
                    $rootScope.trigger('查看应转核算明细',meta,store_id,data);
                    break;
                case appConst.ACCOUNTING_GROUP:
                    $rootScope.trigger('查看团队核算明细',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }
        function settle_acc_detail_see(scope){
            var ref  = angular.copy(scope.ref);
            var acc_item   = angular.fromJson(ref.acc_item);
            scope.loadData('参团费用查看',acc_item['参团费用']);
            scope.loadData('其他费用',acc_item['其他费用']);
        }
        function restore_change(action,meta,cfg,store_id,data){
           CommSrvc.confirm(I18nSrvc.get('RESTORE_CHANGE_CONFIRM')).result.then(function(){
                var scope = $rootScope.cur_scope();
                var id = scope.data['订单详情'][0].id;
                AjaxSrvc.submit(cfg.submit.url,{id:id}).then(function(data){
                    CommSrvc.info(data.message).result.then(function(){
                        $rootScope.close_view();
                        $rootScope.cur_scope().load();
                    });
                });
           });
        }

        function papcontract_relate_order(scope){
            scope.action_map = {
                '选定订单-关联合同':select_order_done,
            };
            function select_order_done(){
                var selected = $rootScope.cur_scope().selected;

                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }

                var scope = $rootScope.pre_scope();
                var assoc_id = $rootScope.cur_scope().assoc_store_id;
                scope.loadData(assoc_id,selected);
                $rootScope.close_view();
            }
        }

        function inquiry_edit(scope){
            scope.submit = function(){
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                var dateCheck =true;
                angular.forEach(scope.data['询单需求详情'],function(item){
                    if(!$rootScope.dateCheck(item.dep_date_from,item.dep_date_to)){
                        dateCheck = false;
                    }
                });
                if(!dateCheck){
                    CommSrvc.info(I18nSrvc.get('DATE_INTERVAL_ERROR'));
                    return ; 
                }
                AjaxSrvc.submit(scope.cfg.submit.url,scope.data).then(function(data){
                    CommSrvc.info(data.message).result.then(function(){
                        $rootScope.pre_scope().load();
                        $rootScope.close_view();
                    });
                });
            }
        }
        function inquiry_select_cstm(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            if(!(scope.selected && scope.selected.length)){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var cstm = scope.selected[0];
            var pre_scope = $rootScope.pre_scope();
            var base_info = pre_scope.data[scope.assoc_store_id][0] 
            base_info.cstm_id =  cstm.id;
            base_info.short_name = cstm.short_name;
            base_info.mobile = cstm.mobile;
            $rootScope.close_view();
        }

        function inquiry_add_cstm(scope){
            scope.submit = submit;
            function submit(){
                AjaxSrvc.submit(scope.cfg.submit.url,scope.data).then(function(data){
                    CommSrvc.info(I18nSrvc.get('SAVE_SUC')).result.then(function(){
                        var pre = $rootScope.pre_scope();
                        pre.data[scope.assoc_store_id][0].cstm_id  = data[0].id;
                        pre.data[scope.assoc_store_id][0].short_name = data[0].short_name;
                        pre.data[scope.assoc_store_id][0].mobile = data[0].mobile;
                        $rootScope.close_view();
                    });
                });
            }
        }
        function inquiry_related_order(scope){
            var _data = {
                'id':scope.data.id,
                'order_id':scope.data.order_id,
                'order_num':(scope.data.order_id=='0')?'':('D0'+scope.data.order_id),
            };
            scope.data = _data;
            scope.submit = submit;
            function submit(){
                AjaxSrvc.submit(scope.cfg.submit.url,scope.data).then(function(data){
                    CommSrvc.info(data.message).result.then(function(){
                        $rootScope.pre_scope().load();
                        $rootScope.close_view();
                    });
                });
            }
        }

        function select_order_related_inquiry(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            if(!(scope.selected && scope.selected.length)){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var pre = $rootScope.pre_scope();
            pre.data.order_id = scope.selected[0].id;
            pre.data.order_num = 'D0'+pre.data.order_id;
            $rootScope.close_view();
        }

        function order_modify_receivable(action,meta,cfg,store_id,data){
            if(data.order_yb==appConst.ORDER_YB){
                $rootScope.trigger('修改订单应收-异部',meta,store_id,data);
            }else{
                $rootScope.trigger('修改订单应收-同部',meta,store_id,data);
            }
        }
        function order_receivable_approve(action,meta,cfg,store_id,data){
            if(data.order_yb==appConst.ORDER_YB){
                $rootScope.trigger('订单应收变更审批-异部',meta,store_id,data);
            }else{
                $rootScope.trigger('订单应收变更审批-同部',meta,store_id,data);
            }
        }
        function download_tourist_template(action,meta,cfg,store_id,data){
            AjaxSrvc.get(cfg.read.url).then(function(res){
                var template_path = res['path'];
                window.open(appConst.HOST +'/'+ template_path);
            });
        }
        function order_upload_tourist_excel(action,meta,cfg,store_id,data){
            CommSrvc.confirm(I18nSrvc.get('ARE_YOU_SURE_UPLOAD_ORDER_TEMP')).result.then(function(){
                $rootScope.trigger('订单上传参团',meta,store_id,data);
            });
        }
        function upload_tourist_excel(action,meta,cfg,store_id,data){
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
                            //模板有效性校验
                            var std_array = ['姓名','性别','生日'
                                            ,'证件号码','证件有效期'
                                            ,'游客手机'];
                            if(_.isEmpty(results)){
                                CommSrvc.error(I18nSrvc.get('INVALID_EXCEL'));
                                return ; 
                            }
                            // var keys = _.keys(results[0]);
                            // if(!_.isEmpty(_.difference(std_array,keys))
                            //     ||!_.isEmpty(_.difference(keys,std_array))){
                            //     CommSrvc.error(I18nSrvc.get('INVALID_EXCEL'));
                            //     return ; 
                            // }
                            //列check
                            var std_gender_array = EnumSrvc['Gender'];
                            var check = true;
                            var check_row = 1;
                            var field = '';
                            var valid_value = '';
                            angular.forEach(results,function(item,key){
                                // angular.forEach(std_array,function(v,k){
                                //     if(_.isUndefined(item[v])){
                                //         check = false;
                                //         check_row = key+1;
                                //         field = v;
                                //     }
                                // });
                                if(!_.isUndefined(item['性别'])&&_.isUndefined(_.find(std_gender_array,function(gender_name){ return gender_name===item['性别'];}
                                    ))){
                                    check = false;
                                    check_row = key+1;
                                    field = '性别';
                                    valid_value = '男 或 女';
                                }
                                if(!_.isUndefined(item['生日'])&&!moment(item['生日']).isValid()){
                                    check = false;
                                    check_row = key+1;
                                    field = '生日';
                                    valid_value = '日期格式：1993/02/23,02/23/1993,1993-02-23';
                                }
                                if(!_.isUndefined(item['证件有效期'])&&!moment(item['证件有效期']).isValid()){
                                    check = false;
                                    check_row = key+1;
                                    field = '证件有效期';
                                    valid_value = '日期格式：1993/02/23,02/23/1993,1993-02-23';
                                }
                            });
                            if(!check){
                                CommSrvc.error(I18nSrvc.get('INVALID_EXCEL')+'('+check_row+')'+I18nSrvc.get('ROW')+field
                                                +I18nSrvc.get('VALID_VALUE')+valid_value);
                                return ;
                            }
                            var scope = $rootScope.cur_scope();
                            var start = scope.data['订单参团'].length;
                            for (var i = 0; i<results.length; i++) {
                                scope.add_row('订单参团',{},{});
                            }
                            var map = {
                                name:'姓名',
                                gender:'性别',
                                certificate_num:'证件号码',
                                mobile:'游客手机',
                                birthday:'生日',
                                certificate_valid_period:'证件有效期',
                            };
                            angular.forEach(results,function(row,k){
                                angular.forEach(map,function(_v,_k){
                                    if(!_.isUndefined(row[_v])){
                                        if(_k=='birthday'||_k=='certificate_valid_period'){
                                            scope.data['订单参团'][k+start][_k] = moment(row[_v]).format('YYYY-MM-DD');
                                        }else if(_k=='gender'){
                                            var type_r = _.findKey(std_gender_array,function(type){return type==row[_v];});
                                            if(!_.isUndefined(type_r)){
                                               scope.data['订单参团'][k+start][_k] = 
                                                type_r; 
                                            }
                                        }else{
                                            scope.data['订单参团'][k+start][_k] = 
                                            row[_v]||'';
                                        }
                                    }
                                });
                            });
                        });
                    };
                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });
            el.click();
        }
        function order_set_certificate_type_batch(scope){
            scope.data = {
                type:'Certificate'
            }
            scope.submit = function(){
                var selected = $rootScope.pre_scope().gridSel[scope.assoc_store_id];
                angular.forEach(selected,function(item){
                    item.certificate_type = scope.data.selected;
                });
                $rootScope.close_view();
            }
        }
        function is_order_change_ok(data){
            if(data.contract_id&&data.contract_id!='0'){
                CommSrvc.error(I18nSrvc.get('ORDER_RELATED_CONTRACT_CANT_CHANGE'));
                return false;
            }
            if(data.pap_contract_id&&data.pap_contract_id!='0'){
                CommSrvc.error(I18nSrvc.get('ORDER_RELATED_CONTRACT_CANT_CHANGE'));
                return false;
            }
            return true;
        }
        function order_contract_see(action,meta,cfg,store_id,data){
            if(data.contract_id&&data.contract_id!='0'){
                $rootScope.trigger('查看电子合同',meta,store_id,{id:data.contract_id
                    ,type_id:data.elc_contract_type_id});
            }
        }
        function order_settleable_statistics(scope){
            scope.init = function (){
                var pre = $rootScope.pre_scope();
                var amount_total = 0;
                var discount_amount = 0;
                if(!_.isUndefined(pre.data['手动优惠']) &&!_.isEmpty(pre.data['手动优惠']) 
                   &&(_.isUndefined($rootScope.appUser.supplier_id) ||$rootScope.appUser.supplier_id=='0')){
                    _.each(pre.data['手动优惠'],function(item){
                        item['total']  = parseFloat((item['num_of_people']*item['unit_price']).toFixed(2));
                        discount_amount += +(item['total']);
                    });
                    amount_total = pre.amount.toFixed(2) - discount_amount;
                    var data = {amount:amount_total
                                ,num_of_people:pre.num_of_people};
                }else{
                    var data = {amount:pre.amount.toFixed(2)
                            ,num_of_people:pre.num_of_people};
                }
                scope.items = [
                    {img:'img/expend.png',name:I18nSrvc.get("ORDER_SELLTEABLE_TOTAL"),num:data.amount},
                    {img:'img/people.png',name:I18nSrvc.get("ORDER_TOURIST_NUM"),num:data.num_of_people},
                ];
            }
        }
        function settle_acc_total_see(scope){
            var cur = $rootScope.cur_scope();
            var pre = $rootScope.pre_scope();
            scope.loadData('订单应转',pre.data[cur.assoc_store_id]);
        }
        function order_received_see(){
            var cur = $rootScope.cur_scope();
            if(cur.data['订单详情']
                &&!_.isEmpty(cur.data['订单详情'])
                &&cur.data['订单详情'][0]['id']){
                $rootScope.trigger('查看订单已收',null,null,cur.data['订单详情'][0]);
            }
        }
        function order_settled_see(){
            var cur = $rootScope.cur_scope();
            if(cur.data['订单详情']
                &&!_.isEmpty(cur.data['订单详情'])
                &&cur.data['订单详情'][0]['id']){
                $rootScope.trigger('查看订单已转',null,null,cur.data['订单详情'][0]);
            }
        }
        function select_group_order_change(action,meta,cfg,store_id,data){
            var old_group = $rootScope.cur_scope().data['订单团队'][0];
            var search = {};
            if(!_.isUndefined(old_group.department_id)
                  &&old_group.department_id!='0'){
                search['department_id'] = old_group.department_id;
                search['employee_id'] = old_group.employee_id;
                $rootScope.trigger('选择团队-订单应转变更',null,store_id,{'search':search});
            }else if(!_.isUndefined(old_group.supplier_id)
                  &&old_group.supplier_id!='0'){
                search['supplier_id'] = old_group.supplier_id;
                search['employee_id'] = old_group.employee_id;
                $rootScope.trigger('选择团队-订单应转变更',null,store_id,{'search':search});
            }
        }
        function select_group_done_order_change(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var scope = $rootScope.pre_scope();
            var pd_provider_id = scope.data['订单团队'][0].pd_provider_id; 
            var employee_id = scope.data['订单团队'][0].employee_id;
            if((selected[0].employee_id != employee_id) && (selected[0].pd_provider_id != pd_provider_id)){
                CommSrvc.error(I18nSrvc.get('ONLY_CHOOSE_THE_SAME_SUPPLIER_AND_EMPLOYEE_GROUP'));
                return ;
            }
            scope.loadData('订单团队',selected);
            if(!_.isUndefined(scope.data['订单应转'])&&!_.isEmpty(scope.data['订单应转'])){
                var settle_data = scope.data['订单应转'][0];
                settle_data.settleable = 0;
                settle_data.acc_item ={};
                settle_data.settle_diff = (settle_data.settleable-settle_data.settled).toFixed(2);
                scope.loadData('订单应转',[settle_data]);
                scope.settle_change = true;
            }

            scope.group_change = true;
            
            $rootScope.close_view();
        }
    }
})();