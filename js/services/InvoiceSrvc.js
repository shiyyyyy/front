(function() {
    'use strict';

    angular
        .module('app')
        .factory('InvoiceSrvc', InvoiceSrvc);

    InvoiceSrvc.$inject = ['AjaxSrvc', 'CommSrvc','FieldSrvc','I18nSrvc','$rootScope','appConst','$uibModal','EnumSrvc','$timeout','$compile'];
    function InvoiceSrvc(AjaxSrvc, CommSrvc, FieldSrvc,I18nSrvc,$rootScope,appConst,$uibModal,EnumSrvc,$timeout,$compile){

        return {
            '新增开票':invoice_edit,
            '修改开票':invoice_edit,
            '查看开票':invoice_edit,
            '开发票审批':invoice_edit,

            '新增借票':invoice_edit,
            '修改借票':invoice_edit,
            '查看借票':invoice_edit,
            '借发票审批':invoice_edit,

            '修改发票':modify_invoice,
            '提交发票':submit_invoice,
            '取消发票':cancel_invoice,


            '借票冲抵':lend_offset_edit,
            '借票冲抵审批':lend_offset_edit,
            '查看借票-冲抵':lend_offset_edit,
            //'借票销票':lend_offset_edit,

            '审批发票': invoice_approve,
            '发票完善': invoice_manage,
            '查看发票': invoice_see,

            '凭证上传':upload_write_off,
            '可否删除凭证图片':is_delete_write_off_photee_ok,
            '删除凭证图片':delete_write_off_photo,

            '新增发票项目':invoice_item_edit,
            '修改发票项目':invoice_item_edit,

            '废除发票':invoice_abolish_edit,
            '删除废票调用明细':delete_abolish_detail,
            '发票日志':log_see,

            //发票block
            '复制发票明细':invoice_copy,
            '复制借票明细':invoice_copy,
            '删除借票明细':invoice_delete,
            '删除发票明细':invoice_delete,

            '选定借票限定':lend_invoice_limit,
            '批量限定借票':set_lend_invoice_bacth,

            //'选择发票抬头':select_invoice_title,
            '选定发票抬头':selected_invoice_title_done,
            //'选择借票抬头':select_invoice_title,
            '选定借票抬头':selected_invoice_title_done,
            //'选择抬头':select_invoice_title_done,
            //导出
            '导出开票':invoice_to_export,
            '导出借票':invoice_to_export,
            '导出发票':invoice_to_export_selected,
            '提交开发票审批':make_invoice_approve,

            '提交借票调账':lend_invoice_variable,

            '可否添加发票明细':is_add_invoice_detail_ok,
            '可否添加借票明细':is_add_lend_invoice_detail_ok,
            //'保存发票明细':save_invoice_detail,
            '完善发票明细':perfect_invoice_detail,
            '完善借票明细':perfect_invoice_detail,
            '查看发票明细-抬头':see_invoice_detail,
            '提交单据发票调账':doc_invoice_variable_submit,
            '选定借票':select_lend_invoice_done,
            '查看发票-单据':invoice_see_doc,
            '删除借票-冲抵':delete_lend_invoice_offset,
            '选定冲销单据':select_offset_doc_done,
            '收支冲销':doc_offset,
            '删除冲销调用明细':delete_offset_call_doc,
            '发票核销':invoice_offset,
            '发票审批次数':invoice_approve_frequency,
            '发票冲抵审批次数':invoice_offset_approve_frequency,
            '替换发票明细':invoice_replace_detail,
            '替换开票明细':invoice_replace_edit,
            '替换借票明细':invoice_replace_edit,
            '选定开票单据':make_invoice_select_doc_done,
            '选定借票单据':lend_invoice_select_doc_done,
            '删除发票替换明细':delete_invoice_replace_detail,
        };

        function invoice_edit(scope){
            scope.change_word = change_word;  // 将发票抬头中文括号改为英文括号  ，改为,
            function change_word(scope){
                var str = scope.title;
                var reg = /[\（]/g,reg2 = /[\）]/g,reg3 = /[\，]/g;
                str = str.replace(reg,"(").replace(reg2,")").replace(reg3,",");
                
                scope.title = str;
            }
            scope.action_map = {

                '删除发票调用明细':delete_doc_detail_done,
                '添加发票明细':add_invoice_detail,
                '添加借票明细':add_lend_detail,
            };
            scope.init = init;

            scope.calc_invoice = calc_invoice;
            scope.calc_tax_amount = calc_tax_amount;
            scope.change_invoice_type = change_invoice_type;
            scope.change_lend_invoice_type = change_lend_invoice_type;
            scope.change_invoice_item = change_invoice_item;
            scope.change_invoice_e_type = change_invoice_e_type;
            //scope.data['title'] = '';
            function init(){
                if(scope.action == '修改开票'){
                    var invoice_type_id = scope.data['发票详情'][0].invoice_type_id; 
                    var e_invoice_type = scope.data['发票详情'][0].e_invoice_type;
                    if(invoice_type_id == appConst.COMMON_INVOICE && e_invoice_type == appConst.YES){
                        scope.data['可选发票项目'] =  EnumSrvc['InvoiceForE'];
                    } else {
                        scope.data['可选发票项目'] =  $rootScope.get_enum({type:'InvoiceFor',cascade:'invoice_type_id'},scope.data['发票详情'][0]);
                    }   
                }
                if(scope.action == '修改借票'){
                    var invoice_type_id = scope.data['借票详情'][0].invoice_type_id;
                    var e_invoice_type = scope.data['借票详情'][0].e_invoice_type;
                    if(invoice_type_id == appConst.COMMON_INVOICE && e_invoice_type == appConst.YES){
                        scope.data['可选发票项目'] =  EnumSrvc['InvoiceForE'];
                    } else {
                        scope.data['可选发票项目'] =  $rootScope.get_enum({type:'InvoiceFor',cascade:'invoice_type_id'},scope.data['借票详情'][0]);

                    }
                }
                scope.calc_invoice();
            }
            function change_invoice_type(row,colDef){
                var scope = $rootScope.cur_scope();
                if(row[colDef.field] == appConst.PERFESSIONAL_INVOICE){
                    scope.data['发票详情'][0].e_invoice_type = 0;
                }
                angular.forEach(scope.data['发票明细'],function(item){
                    item.invoice_item_id = 0;
                    item.invoice_type_id = row[colDef.field];
                });
                var invoiceForAll = $rootScope.get_enum({type:'InvoiceFor',cascade:'invoice_type_id'},row);
                scope.data['可选发票项目'] =  invoiceForAll;
            }
            function change_lend_invoice_type(row,colDef){
                var scope = $rootScope.cur_scope();
                if(row[colDef.field] == appConst.PERFESSIONAL_INVOICE){
                    scope.data['借票详情'][0].e_invoice_type = 0;
                }
                angular.forEach(scope.data['借票明细'],function(item){
                    item.invoice_item_id = 0;
                    item.invoice_type_id = row[colDef.field];
                });
                scope.data['可选发票项目'] = $rootScope.get_enum({type:'InvoiceFor',cascade:'invoice_type_id'},row);
            }
            function change_invoice_item(row,field){
                row.business_type = 0;
                calc_invoice();
            }
            function change_invoice_e_type(row,colDef){
                if(!_.isUndefined(scope.data['借票明细'])){
                    angular.forEach(scope.data['借票明细'],function(item){
                        item.invoice_item_id = 0;
                    });
                }
                if(!_.isUndefined(scope.data['发票明细'])){
                    angular.forEach(scope.data['发票明细'],function(item){
                        item.invoice_item_id = 0;
                    });
                }
                if(row[colDef.field] == appConst.YES){ //是电子发票
                    scope.data['可选发票项目'] =  EnumSrvc['InvoiceForE'];
                } else {
                    scope.data['可选发票项目'] = $rootScope.get_enum({type:'InvoiceFor',cascade:'invoice_type_id'},row);
                }
            }
            function calc_tax_amount(item){
                item.tax_amount = 0;
                if(item.invoice_item_id
                    &&item.amount){
                    var InvoiceFormula = EnumSrvc['InvoiceFormula'][item.invoice_item_id];
                    if(_.isEmpty(InvoiceFormula)){
                        item.tax_amount = 0;
                    }else{
                        var scale = 0;
                        item.tax_amount = 0;
                        var formulas = angular.fromJson(InvoiceFormula);
                        angular.forEach(formulas,function(formula_key){
                            try{
                                var formula = EnumSrvc['Formula'][formula_key];
                                formula = angular.fromJson(formula);
                                if(!_.isNull(formula)&&!_.isEmpty(formula)){
                                    if(_.isNull(formula.match(/[^\d\.]+/))){
                                        item.tax_amount += +formula;
                                    }else{
                                        scale = eval(formula);
                                        item.tax_amount += + (item.amount * scale);
                                    }
                                }
                            }catch(e){
                                CommSrvc.error(e);
                            }
                        });
                        item.tax_amount = item.tax_amount.toFixed(2);
                    }
                }
            }

            function calc_invoice(){
                var invoiced = 0;
                var invoice_remain = 0;
                var amount = 0;
                var invoice_amount =0;
                var lend_invoice_amount = 0;
                var invoice_total = 0;
                var tax_amount = 0;
                var call_doc_amount = 0;
                
                angular.forEach(scope.data['开票调用明细'],function(i){
                    invoiced += + (i.invoice_amount);
                    invoice_total += +(i.invoice_total);
                    invoice_remain += + (i.invoice_remain);
                    i.amount = i.amount?(parseFloat(i.amount).toFixed(2)):0;
                    amount += +i.amount;
                });
                angular.forEach(scope.data['发票明细'],function(i){
                    i.amount = i.amount?(parseFloat(i.amount).toFixed(2)):0;
                    calc_tax_amount(i);
                    tax_amount += +i.tax_amount;
                    invoice_amount += +i.amount;
                });
                angular.forEach(scope.data['借票明细'],function(i){
                    i.amount = i.amount?(parseFloat(i.amount).toFixed(2)):0;
                    calc_tax_amount(i);
                    tax_amount += +i.tax_amount;
                    lend_invoice_amount += +i.amount;
                    amount += +i.amount;
                    invoice_amount += +i.amount;
                });
                angular.forEach(scope.data['借票冲抵明细'],function(i){
                    i.amount = i.amount?(parseFloat(i.amount).toFixed(2)):0;
                    lend_invoice_amount += +i.amount;
                    amount += +i.amount;
                });

                angular.forEach(scope.data['借票调用明细'],function(i){
                    call_doc_amount += +i.amount;
                });
                angular.forEach({invoiced:invoiced,invoice_remain:invoice_remain,
                                amount:amount,invoice_amount:invoice_amount,
                                lend_invoice_amount:lend_invoice_amount,
                                invoice_total:invoice_total,
                                tax_amount:tax_amount,
                                call_doc_amount:call_doc_amount
                            },function(item,key){
                    item = item.toFixed(2);
                    scope[key] = item;
                });
            }

            function select_order_done(){
                var selected = $rootScope.cur_scope().selected;
                if(!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var arr = _.pluck(selected,'reta_id');
                arr = _.uniq(arr);
                if(arr.length>1){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_CSTM'));
                    return;
                }
                var orders = scope.data['借票订单详情'];
                var old = _.pluck(orders,'reta_id');
                if(old.length && old[0] != arr[0]){
                    CommSrvc.error(I18nSrvc.get('SEL_SAME_CSTM'));
                    return;
                }

                angular.forEach(selected,function(item){
                    item['receive_diff'] = item['receivable']-item['received'];
                    item['order_id'] = item['id'];
                });
                scope.data['借票详情'][0].settle_obj = selected[0].retail_short_name;
                scope.data['借票详情'][0].settle_obj_id = selected[0].reta_id;
                scope.loadData('借票订单详情',selected,true);
                calc_invoice();
                $rootScope.close_view();
            }

            function delete_doc_detail_done(store_id,data){
                scope.delete_row(store_id,data);
                // if(scope.data['title'])
                //     scope.data['title'] =  scope.data[store_id][0]?scope.data[store_id][0].invoice_title:'';
                scope.calc_invoice();
            }
            function add_invoice_detail(store_id,data,meta,action){
                var invoice_type_id = scope.data['发票详情'][0]['invoice_type_id']||0;
                var row = {'invoice_type_id':invoice_type_id,'invoice_state':1};
                scope.loadData(store_id,[row],'new');
            }
            
            function add_lend_detail(store_id,data,meta,action){
                var invoice_type_id = scope.data['借票详情'][0]['invoice_type_id']||0;
                var row = {
                            'invoice_type_id':invoice_type_id
                            ,'invoice_state':1
                          };
                scope.loadData(store_id,[row],'new');
            }
        }

        function perfect_invoice_detail(scope){
            scope.submit = function(){
                _.extend(scope.ref,scope.data);
                $rootScope.close_view();
            }
        }

        function see_invoice_detail(scope){
            scope.submit = function(){
                $rootScope.close_view();
            }
        }

        function invoice_approve(action,meta,cfg,store_id,data){
            switch(data.type_id){
                case appConst.INVOICE_MAKE:
                    $rootScope.trigger('开发票审批',null,store_id,data);
                    break;
                case appConst.INVOICE_LEND:
                    $rootScope.trigger('借发票审批',null,store_id,data);
                    break;
            }
        }

        function invoice_manage(scope){
            var _data = scope.data;
            var id = _data.id;
            var data = {
                id:['INVOICE_ID','FP0'+_data.id,1],
                title:['INVOICE_TITLE',_data.title,1],
                invoice_state:['INVOICE_STATE',_data.invoice_state,0],
                invoice_num:['INVOICE_NUM',_data.invoice_num,0],
                invoice_date:['INVOICE_DATE',_data.invoice_date,0],
                //comment:['COMMENT',_data.comment]
            };
            if(data['invoice_date'][1]=='0000-00-00'){
                data['invoice_date'][1] = moment().format('YYYY-MM-DD');
            }
            if(_data.invoice_state == appConst.INVOICE_ABOLISH){
                data.invoice_state = ['INVOICE_STATE',_data.invoice_state,1],
                scope.InvoiceEnum = EnumSrvc['InvoiceState'];
            }else{
                data.invoice_state = ['INVOICE_STATE',_data.invoice_state,0],
                scope.InvoiceEnum = EnumSrvc['InvoiceEditState'];
            }
            scope.data = data;
            scope.submit = function(){
                var new_data = {};
                for (var key in data) {
                    new_data[key] = data[key][1];
                }
                new_data['id'] = id;
                scope.submit_data(new_data);
            };
        }

        function invoice_see(action,meta,cfg,store_id,data){
            switch(data.type_id){
                case appConst.INVOICE_MAKE:
                    $rootScope.trigger('查看开票',meta,store_id,data);
                    break;
                case appConst.INVOICE_LEND:
                    $rootScope.trigger('查看借票',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }

        function lend_offset_edit(scope){
            scope.action_map = {
                '删除借票调用明细':delete_doc_detail_done,
            };
            scope.calc_invoice = calc_invoice;
            //scope.data['title'] = '';
            scope.init = function(){
                scope.calc_invoice();
            }
            function delete_doc_detail_done(store_id,data){
                scope.delete_row(store_id,data);
                scope.calc_invoice();
            }
            function calc_invoice(){
                var invoiced = 0;
                var invoice_remain = 0;
                var amount = 0;
                var invoice_total = 0;
                var offset_amount =0;
                var invoice_amount = 0;
                var call_doc_amount = 0;

                angular.forEach(scope.data['借票冲抵明细'],function(i){
                    i.invoice_enable_amount = i.invoice_enable_amount?(parseFloat(i.invoice_enable_amount).toFixed(2)):0;
                    invoice_amount += +i.invoice_enable_amount;
                });

                angular.forEach(scope.data['借票调用明细'],function(i){
                    invoice_total += +(i.invoice_total);
                    invoiced += + (i.invoice_amount);
                    invoice_remain += + (i.invoice_remain);
                    i.amount = i.amount?(parseFloat(i.amount).toFixed(2)):0;
                    amount += +i.amount;
                    call_doc_amount += + i.amount;
                });
                angular.forEach(scope.data['借票冲抵明细'],function(i){
                    i.amount = i.amount?(parseFloat(i.amount).toFixed(2)):0;
                    offset_amount += +i.amount;
                });
                angular.forEach({invoiced:invoiced,invoice_remain:invoice_remain,
                                amount:amount,offset_amount:offset_amount,
                                invoice_total:invoice_total,
                                invoice_amount:invoice_amount,
                                call_doc_amount:call_doc_amount
                            },function(item,key){
                    item = item.toFixed(2);
                    scope[key] = item;
                });
            }
        }

        function upload_write_off(action,meta,cfg,store_id,data){
            var el = $("#comm_upload");
                el.unbind('change');
                el.bind('change',function(){
                    var data = new FormData();
                    data.append('file', el[0].files[0]);
                    el.val('');
                    AjaxSrvc.upload(data,'doc_write_off').then(function(response){
                        CommSrvc.info(response.message);
                        var scope  = $rootScope.cur_scope();
                        var pictures = scope.data['核销凭证'];
                        var picture = {};
                        picture.path = response.save_path;
                        picture.save_path = response.save_path;
                        picture.date = moment().format('YYYY-MM-DD HH:mm:ss');
                        picture.employee_id = $rootScope.appUser.employee_id;
                        pictures.push(picture);
                    });
                });
            el.click();
        }

        function is_delete_write_off_photee_ok(){
            var scope = $rootScope.cur_scope();
            if(_.isUndefined(scope.data.picture_selected)||(scope.data.picture_selected == -1)){
                CommSrvc.error(I18nSrvc.get('PLEASE_SELECT_PICTURE'));
                return false;
            }
            return true;
        }
        function delete_write_off_photo(){
            var scope = $rootScope.cur_scope();
            var index = -1;
            if(!_.isUndefined(scope.data.picture_selected)){
                if(!_.isUndefined(scope.data['核销凭证'][scope.data.picture_selected])){
                    scope.data['核销凭证'].splice(scope.data.picture_selected,1);
                }
                scope.data.picture_selected = -1;
            }
        }

        function invoice_item_edit(scope){
            scope.init = function(){
                var _data = angular.copy(scope.data);
                if(!_.isEmpty(_data.kk_calc_formula)){
                    _data.kk_calc_formula = angular.fromJson(_data.kk_calc_formula);
                }
                scope.data = _data;
            }
        }

        function invoice_abolish_edit(scope){
            scope.calc_invoice = calc_invoice;
            scope.init = function(){
                scope.calc_invoice();
            }
            function calc_invoice(){
                scope.amount = 0;
                angular.forEach(scope.data['废票调用明细'],function(item){
                    item.amount = parseFloat(item.amount).toFixed(2);
                    scope.amount += +parseFloat(item.amount);
                    scope.amount = scope.amount.toFixed(2);
                });
            }
        }

        function delete_abolish_detail(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            scope.delete_row(store_id,data);
            scope.calc_invoice();
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

        function invoice_copy(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            var store = scope.data[store_id];
            var new_row = angular.copy(data);
            if(new_row['id']){
                delete new_row['id'];
            }
            store.push(new_row);
            scope.calc_invoice();
        }
        function invoice_delete(action,meta,cfg,store_id,data){
            $rootScope.cur_scope().delete_row(store_id,data);
            $rootScope.cur_scope().calc_invoice();
        }

        function lend_invoice_limit(scope){
            var scope = $rootScope.cur_scope();
            var selected = scope.selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            $rootScope.pre_scope().loadData('借票批量限定',selected);
            $rootScope.close_view();
        }
        function set_lend_invoice_bacth(scope){
            scope.submit = function(){
                var pre_scope = $rootScope.pre_scope();
                var selected = $rootScope.pre_scope().gridSel[scope.assoc_store_id];
                angular.forEach(selected,function(item){
                    item['lend_invoice_times_limit'] =scope.data.lend_invoice_times_limit;
                    item['lend_invoice_amount_limit'] = scope.data.lend_invoice_amount_limit;
                });
                $rootScope.close_view();
            }
        }

        function selected_invoice_title_done(scope){
            var pre = $rootScope.pre_scope();
            var cur = $rootScope.cur_scope();
            var selected = $rootScope.cur_scope().selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            cur.ref.title = selected[0]['title'];
            cur.ref.taxpayer_number = selected[0]['taxpayer_number'];
            cur.ref.taxpayer_bank = selected[0]['taxpayer_bank'];
            cur.ref.taxpayer_bank_account = selected[0]['taxpayer_bank_account'];
            cur.ref.taxpayer_address = selected[0]['taxpayer_address'];
            cur.ref.taxpayer_mobile = selected[0]['taxpayer_mobile'];
            $rootScope.close_view();
        }
        // function select_invoice_title(action,meta,cfg,store_id,data){
        //     AjaxSrvc.get(cfg.read.url).then(function(res){
        //         if(_.isEmpty(res.titles)){
        //             CommSrvc.error(I18nSrvc.get('NO_INVOICE_TITLE_ADD'));
        //             return;
        //         }else{
        //             res.index = $rootScope.cur_scope().data[store_id].indexOf(data);
        //             $rootScope.trigger('选择抬头',null,store_id,res);
        //         }
        //     });
        // }
        // function select_invoice_title_done(scope){
        //     var _data = {};
        //     var invoice_titles = scope.data['invoice_titles'];
        //     _data['edit_path'] = '发票抬头';
        //     _data['发票抬头'] = scope.data['titles'];
        //     scope.data = _data;
        //     scope.submit = function(){
        //         var info = invoice_titles[scope.data.selected];
        //         delete info['id'];
        //         if(!_.isUndefined(info)&&scope.ref.index!==-1){
        //             var pre_scope = $rootScope.pre_scope();
        //             pre_scope.data[scope.assoc_store_id][scope.ref.index] = _.extend(pre_scope.data[scope.assoc_store_id][scope.ref.index],info);
        //         }
        //         $rootScope.close_view();
        //     }
        // }
        function invoice_to_export(action,meta,cfg,store_id,data){
            var invoice = $rootScope.cur_scope().data['发票明细'] ||$rootScope.cur_scope().data['借票明细'];
            var invoice_id = invoice[0].id;
            window.open(appConst.HOST+'/fin/InvoiceExport/invoice_to_export?id=' 
                                + invoice_id);
        }

        function invoice_to_export_selected(action,meta,cfg,store_id,data){
            var cur_scope = $rootScope.cur_scope();
            var selected  = cur_scope.selected;
            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var ids = _.pluck(selected,'id');
            if(!_.isEmpty(ids)){
                window.open(appConst.HOST+'/fin/InvoiceExport/selected_invoice_export?ids=' + ids.join(','));
            }else{
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return ;
            }
        }
        function make_invoice_approve(action,meta,cfg,store_id,data){
            var cur_scope = $rootScope.cur_scope();
            var remitters = _.uniq(_.pluck(cur_scope.data['开票调用明细'],'remitter'));
            var titles = _.uniq(_.pluck(cur_scope.data['发票明细'],'title'));
            var title_check = true;

            var re_field = cur_scope.submit_check();
            if(!_.isEmpty(re_field)){
                CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                return;
            }

            //通过时判断
            var param = $rootScope.get_req_data(cur_scope.cfg.submit.data, cur_scope.data);

            if(param.opinion==1){
                angular.forEach(remitters,function(remitter){
                    if(!title_check){
                        return ; 
                    }
                    angular.forEach(titles,function(title){
                        if(!title_check){
                            return ;
                        }
                        if(remitter!=title){
                            title_check = false;
                        }
                    });
                });
                if(!title_check){
                    CommSrvc.confirm(I18nSrvc.get('INVOICE_TITLE_CHECK_INFO')).result.then(function(){
                        AjaxSrvc.submit(cur_scope.cfg.submit.url,param).then(function(data){
                            CommSrvc.info(data.message);
                            $rootScope.close_view();
                            $rootScope.cur_scope().load();
                        });
                    });
                }else{
                    AjaxSrvc.submit(cur_scope.cfg.submit.url,param).then(function(data){
                        CommSrvc.info(data.message);
                        $rootScope.close_view();
                        $rootScope.cur_scope().load();
                    });
                }
            }else{
                AjaxSrvc.submit(cur_scope.cfg.submit.url,param).then(function(data){
                    CommSrvc.info(data.message);
                    $rootScope.close_view();
                    $rootScope.cur_scope().load();
                });
            }
        }
        function lend_invoice_variable(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            AjaxSrvc.submit(scope.cfg.submit.url,{'id':scope.ref.id,'本次调账':scope.data['本次调账']}).then(function(res){
                CommSrvc.info(res.message);
                $rootScope.close_view();
                $rootScope.cur_scope().load();
            });
        }
        function modify_invoice(action,meta,cfg,store_id,data){
            switch(data.type_id){
                case appConst.INVOICE_MAKE:
                    $rootScope.trigger('修改开票',meta,store_id,data);
                    break;
                case appConst.INVOICE_LEND:
                    $rootScope.trigger('修改借票',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }
        function submit_invoice(action,meta,cfg,store_id,data){
            switch(data.type_id){
                case appConst.INVOICE_MAKE:
                    $rootScope.trigger('提交开票',meta,store_id,data);
                    break;
                case appConst.INVOICE_LEND:
                    $rootScope.trigger('提交借票',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }
        function cancel_invoice(action,meta,cfg,store_id,data){
            switch(data.type_id){
                case appConst.INVOICE_MAKE:
                    $rootScope.trigger('取消开票',meta,store_id,data);
                    break;
                case appConst.INVOICE_LEND:
                    $rootScope.trigger('取消借票',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }

        function is_add_invoice_detail_ok(){
            var scope = $rootScope.cur_scope();
            var invoice = scope.data['发票详情'][0];
            if(_.isUndefined(invoice['invoice_type_id'])||invoice['invoice_type_id']=='0'){
                CommSrvc.error(I18nSrvc.get('PLS_SELECT_INVOICE_TYPE'));
                return false;
            }
            return true;
        }
        function is_add_lend_invoice_detail_ok(){
            var scope = $rootScope.cur_scope();
            var invoice = scope.data['借票详情'][0];
            if(_.isUndefined(invoice['invoice_type_id'])||invoice['invoice_type_id']=='0'){
                CommSrvc.error(I18nSrvc.get('PLS_SELECT_INVOICE_TYPE'));
                return false;
            }
            return true;
        }
        function doc_invoice_variable_submit(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            AjaxSrvc.submit(scope.cfg.submit.url,{id:scope.ref.id,'本次调账':scope.data['本次调账']}).then(function(data){
                CommSrvc.info(data.message);
                $rootScope.close_view();
                $rootScope.cur_scope().load();
            })
        }

        function select_lend_invoice_done(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var cur_scope = $rootScope.cur_scope();
            $rootScope.pre_scope().loadData(cur_scope.assoc_store_id,selected,'id');
            $rootScope.pre_scope().calc_invoice();
            $rootScope.close_view();
        }

        function invoice_see_doc(action,meta,cfg,store_id,data){
            switch(data.type_id){
                case appConst.INVOICE_MAKE:
                    $rootScope.trigger('查看开票',meta,store_id,data);
                    break;
                case appConst.INVOICE_LEND:
                    $rootScope.trigger('查看借票-冲抵',meta,store_id,data);
                    break;
                default:
                    break;
            }
        }
        function delete_lend_invoice_offset(action,meta,cfg,store_id,data){
            $rootScope.cur_scope().delete_row(store_id,data);
            $rootScope.cur_scope().calc_invoice();
        }
        function select_offset_doc_done(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var cur_scope = $rootScope.cur_scope();

            angular.forEach(selected,function(item){
                item.amount = parseFloat(item.invoice_remain).toFixed(2);
            });
            $rootScope.pre_scope().loadData(cur_scope.assoc_store_id,selected,'id');
            $rootScope.pre_scope().calc_offset();
            $rootScope.close_view();
        }
        function doc_offset(scope){
            scope.calc_offset = calc_offset;
            scope.init = function(){
                scope.calc_offset();
            }
            function calc_offset(){
                var amount = 0;
                var invoice_remain = 0;
                var invoice_total = 0 ;
                angular.forEach(scope.data['冲销单据'],function(item){
                    item.amount = parseFloat(item.amount).toFixed(2);
                    amount +=+ item.amount;
                    invoice_total +=+ item.invoice_total;
                    invoice_remain +=+ item.invoice_remain
                });
                scope.invoice_total = invoice_total.toFixed(2);
                scope.invoice_remain = invoice_remain.toFixed(2);
                scope.amount = amount.toFixed(2);
            }
        }
        function invoice_offset(scope){
            scope.calc_offset = calc_offset;
            scope.init = function(){
                scope.block_hide = scope.block_hide||{};
                if(_.isEmpty(scope.data['冲销单据'])){
                    scope.block_hide['冲销单据'] =1;
                }
                scope.calc_offset();
            }
            function calc_offset(){
                var amount = 0;
                var invoice_remain = 0;
                var invoice_total = 0 ;
                angular.forEach(scope.data['冲销单据'],function(item){
                    item.amount = parseFloat(item.amount).toFixed(2);
                    amount +=+ item.amount;
                    invoice_total +=+ item.invoice_total;
                    invoice_remain +=+ item.invoice_remain
                });
                scope.invoice_total = invoice_total.toFixed(2);
                scope.invoice_remain = invoice_remain.toFixed(2);
                scope.amount = amount.toFixed(2);
            }
        }
        function delete_offset_call_doc(action,meta,cfg,store_id,data){
            $rootScope.cur_scope().delete_row(store_id,data);
            $rootScope.cur_scope().calc_offset();
        }

        function invoice_approve_frequency(scope){
            var mod_cfg = $rootScope.mods['发票审批统计']||{};
            var s_regular = [];
            var s_regular = angular.copy(mod_cfg.s_regular);
            var s_text = angular.copy(mod_cfg.s_text);
            
            var required_filter = {};
            var optional_filter = {};
            var select_filter = {};

            angular.forEach(['approve_at_from','approve_at_to'],function(field){
                required_filter[field] = s_regular[field]||{};
            });

            angular.forEach(['company_id'
                            ,'department_id'
                            ,'employee_id'
                            ],function(field){
                optional_filter[field] = s_regular[field]||{};
                optional_filter[field]['mod'] = '发票审批统计';
            });
            
            // 多选
            select_filter['invoice_type_id'] = s_regular['invoice_type_id'];
            var search = {'mod':'发票审批统计'};

            scope.required_filter = required_filter;
            scope.optional_filter = optional_filter;
            scope.select_filter = select_filter;

            scope.search = search;
            scope.submit = function(){
                if((_.isEmpty(search.approve_at_from)||_.isEmpty(search.approve_at_to)) ){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
                    return ;
                }
                if(!_.isEmpty(search['invoice_type_id'])){
                    search['invoice_type_id'] = search['invoice_type_id'].join(',');
                }
                $rootScope.close_view();
                window.open(appConst.HOST + '/fin/InvoiceExport/export_approve_frequency?action=' + scope.action+'&' + $rootScope.toQueryString(scope.search));
            }
        }
        function invoice_offset_approve_frequency(scope){
            var mod_cfg = $rootScope.mods['借票冲抵审批统计']||{};
            var s_regular = [];
            var s_regular = angular.copy(mod_cfg.s_regular);
            var s_text = angular.copy(mod_cfg.s_text);
            
            var required_filter = {};
            var optional_filter = {};
            var select_filter = {};

            angular.forEach(['approve_at_from','approve_at_to'],function(field){
                required_filter[field] = s_regular[field]||{};
            });

            angular.forEach(['company_id'
                            ,'department_id'
                            ,'employee_id'
                            ],function(field){
                optional_filter[field] = s_regular[field]||{};
                optional_filter[field]['mod'] = '借票冲抵审批统计';
            });
            
            // 多选
            select_filter['invoice_type_id'] = s_regular['invoice_type_id'];
            var search = {'mod':'借票冲抵审批统计'};

            scope.required_filter = required_filter;
            scope.optional_filter = optional_filter;
            scope.select_filter = select_filter;

            scope.search = search;
            scope.submit = function(){
                if((_.isEmpty(search.approve_at_from)||_.isEmpty(search.approve_at_to)) ){
                    CommSrvc.info(I18nSrvc.get('REQUIRED_ADN_KEY_WORD_EMPTY'));
                    return ;
                }
                if(!_.isEmpty(search['invoice_type_id'])){
                    search['invoice_type_id'] = search['invoice_type_id'].join(',');
                }
                $rootScope.close_view();
                window.open(appConst.HOST + '/fin/InvoiceExport/export_offset_approve_frequency?action=' + scope.action+'&' + $rootScope.toQueryString(scope.search));
            }
        }

        function invoice_replace_detail(action,meta,cfg,store_id,data){
            if(data['type_id']== appConst.INVOICE_MAKE){
                $rootScope.trigger('替换开票明细',meta,store_id,data);
            }else if(data['type_id'] == appConst.INVOICE_LEND){
                $rootScope.trigger('替换借票明细',meta,store_id,data);
            }
        }
        function invoice_replace_edit(scope){
            scope.calc_invoice = calc_invoice;
            function calc_invoice(){
                var invoice_amount = 0;
                var tax_amount =0 ;

                var invoice_total = 0;
                var invoiced = 0;
                var invoice_remain = 0;
                var amount = 0;
                
                angular.forEach(scope.data['发票明细-替换'],function(i){

                    invoice_amount += + (i.amount);
                    tax_amount += +(i.tax_amount);
                });
                angular.forEach(scope.data['借票替换明细'],function(i){
                    invoice_total += +(i.invoice_total);
                    invoice_remain += +(i.invoice_remain);
                    amount += +(i.amount);
                });
                angular.forEach(scope.data['开票替换明细'],function(i){
                    invoice_total += +(i.invoice_total);
                    invoice_remain += +(i.invoice_remain);
                    amount += +(i.amount);
                });

                angular.forEach({invoiced:invoiced,invoice_remain:invoice_remain,
                                amount:amount,invoice_amount:invoice_amount,
                                invoice_total:invoice_total,
                                tax_amount:tax_amount,
                            },function(item,key){
                    item = item.toFixed(2);
                    scope[key] = item;
                });
            }
            calc_invoice();
        }
        function make_invoice_select_doc_done(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var cur_scope = $rootScope.cur_scope();
            var scope = $rootScope.pre_scope();
            scope.loadData(cur_scope.assoc_store_id,selected);
            scope.calc_invoice();
            $rootScope.close_view();
        }

        function lend_invoice_select_doc_done(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var cur_scope = $rootScope.cur_scope(); 
            angular.forEach(selected,function(item){
                item.amount = item.invoice_remain;
            });
            var scope = $rootScope.pre_scope();
            scope.loadData(cur_scope.assoc_store_id,selected,'doc_id');
            scope.calc_invoice();
            $rootScope.close_view();
        }

        function delete_invoice_replace_detail(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();
            scope.delete_row(store_id,data);
            scope.calc_invoice();
        }
    }
})();