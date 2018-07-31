(function() {
    'use strict';

    angular
    .module('app')
    .factory('ProductSrvc', ProductSrvc)
    .directive('uiSortable',uiSortable)
    ;

    uiSortable.$inject = ['$timeout'];
    function uiSortable($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                function refresh(){
                    el.sortable('destroy');
                    el.sortable({
                        handle: '.sort-handle'
                    });    
                }
                el.on('refresh',refresh);
                $timeout(refresh);

                el.bind('sortupdate', function(e,ui) {
                    var oldIndex = ui.item.scope().$index;
                    var newIndex = ui.item.index();

                    var oldValue = scope.data['行程详情'][oldIndex];
                    var newValue = scope.data['行程详情'][newIndex];
                    scope.data['行程详情'][oldIndex] = newValue;
                    scope.data['行程详情'][newIndex] = oldValue;
                    scope.$apply();
                });
            } 
        };
    }

    ProductSrvc.$inject = ['AjaxSrvc', 'CommSrvc','FieldSrvc','I18nSrvc','$uibModal','$rootScope','$compile','$timeout','appConst','EnumSrvc','PdfSrvc'];
    function ProductSrvc(AjaxSrvc, CommSrvc, FieldSrvc,I18nSrvc,$uibModal,$rootScope,$compile,$timeout,appConst,EnumSrvc,PdfSrvc){

        return {
            //产品
            '新增产品':product_add,
            '新增产品-团队游':product_edit,
            '新增产品-单交通':product_edit,
            '新增产品-单签证':product_edit,
            '新增产品-单订房':product_edit,
            '新增产品-单门票':product_edit,
            '新增产品-当地游':product_edit,

            '新增产品-同业':product_add_ty,
            '新增产品-团队游-同业':product_edit,
            '新增产品-单交通-同业':product_edit,
            '新增产品-单签证-同业':product_edit,
            '新增产品-单订房-同业':product_edit,
            '新增产品-单门票-同业':product_edit,
            '新增产品-当地游-同业':product_edit,

            '修改产品':product_modify,
            '修改产品-团队游':product_edit,
            '修改产品-单交通':product_edit,
            '修改产品-单签证':product_edit,
            '修改产品-单订房':product_edit,
            '修改产品-单门票':product_edit,
            '修改产品-当地游':product_edit,

            '修改产品-同业':product_modify_ty,
            '修改产品-团队游-同业':product_edit,
            '修改产品-单交通-同业':product_edit,
            '修改产品-单签证-同业':product_edit,
            '修改产品-单订房-同业':product_edit,
            '修改产品-单门票-同业':product_edit,
            '修改产品-当地游-同业':product_edit,

            '查看产品':product_view,
            '复制产品':product_copy,
            '复制产品-团队游':product_edit,
            '复制产品-单交通':product_edit,
            '复制产品-单签证':product_edit,
            '复制产品-单订房':product_edit,
            '复制产品-单门票':product_edit,
            '复制产品-当地游':product_edit,
            
            
            '查看产品-同业':product_view_ty,
            '复制产品-同业':product_copy_ty,
            '复制产品-团队游-同业':product_edit,
            '复制产品-单交通-同业':product_edit,
            '复制产品-单签证-同业':product_edit,
            '复制产品-单订房-同业':product_edit,
            '复制产品-单门票-同业':product_edit,
            '复制产品-当地游-同业':product_edit,


            '产品审批-同业':product_approve_ty,
            '产品审批-团队游-同业':product_approve,
            '产品审批-单交通-同业':product_approve,
            '产品审批-单签证-同业':product_approve,
            '产品审批-单订房-同业':product_approve,
            '产品审批-单门票-同业':product_approve,
            '产品审批-当地游-同业':product_approve,

            '产品审批-操作':product_approve_op,
            '产品审批-团队游':product_approve,
            '产品审批-单交通':product_approve,
            '产品审批-单签证':product_approve,
            '产品审批-单订房':product_approve,
            '产品审批-单门票':product_approve,
            '产品审批-当地游':product_approve,

            '上传行程':upload_product_attach,
            '是否可选产品主题':is_select_product_theme_ok,
            '选择游玩主题':select_product_theme,
            '选择产品途径城市':select_product_through_city,
            

            '新增产品图片':picture_add,
            '删除产品图片':picture_delete,
            '可否删除产品图片':delete_picture_enable,
            '可否新增产品':product_add_enable,
            '可否修改产品':product_edit_enable,
            '可否复制产品':product_copy_enable,

            '选定推荐产品': select_recommend_done,

            '查看产品-团队游': product_flow_block,
            '查看产品-单签证': product_flow_block,
            '查看产品-单交通': product_flow_block,
            '查看产品-单订房': product_flow_block,
            '查看产品-单门票': product_flow_block,
            '查看产品-当地游': product_flow_block,
            '查看产品-团队游-同业': product_flow_block,
            '查看产品-单签证-同业': product_flow_block,
            '查看产品-单交通-同业': product_flow_block,
            '查看产品-单订房-同业': product_flow_block,
            '查看产品-单门票-同业': product_flow_block,
            '查看产品-当地游-同业': product_flow_block,

            '产品网站推荐':product_recommend_edit,
            '产品行程管理-同业':product_file_edit,
            '产品行程管理':product_file_edit,
        };

        function select_recommend_done() {
            var cur = $rootScope.cur_scope();
            var pre = $rootScope.pre_scope();
            pre.data.pd_id = cur.selected[0].id;
            pre.data.pd_name = cur.selected[0].pd_name;
            $rootScope.close_view();
        }

        function picture_add(action,meta,cfg,store_id,data){
            var el = $("#comm_upload");
            var scope = $rootScope.cur_scope();
            el.unbind('change');
            el.bind('change',function(){
                var data = new FormData();
                data.append('file', el[0].files[0]);
                el.val('');
                AjaxSrvc.upload(data,'gallery').then(function(response){
                    scope.data['产品图片'].push({path:response.save_path,thumbnail:response.thumbnail});
                    CommSrvc.info(response.message);
                });
            });
            el.click();
        }

        function delete_picture_enable(){
            var scope = $rootScope.cur_scope();
            if(_.isUndefined(scope.data.picture_selected)||(scope.data.picture_selected == -1)){
                CommSrvc.error(I18nSrvc.get('PLEASE_SELECT_PICTURE'));
                return false;
            }
            return true;
        }

        function is_select_product_theme_ok(data,store_id){
            var scope = $rootScope.cur_scope();
            if(scope.cfg.ro){
                var index = scope.cfg.block.indexOf(store_id);
                if(scope.cfg.ro[index]){
                    return false;
                }
            }
            return true;
        }

        function picture_delete(action,meta,cfg,store_id,data){
            var scope  = $rootScope.cur_scope();
            if(scope.data['产品图片'][scope.data.picture_selected]){
                scope.data['产品图片'].splice(scope.data.picture_selected,1);
            }
            scope.data.picture_selected = -1;
        }

        function product_view(action,meta,cfg,store_id,data) {
            var action = '';
            switch(data.pd_template_type){
                case appConst.PD_TEMP_TEAMTOUR:
                    action  = '查看产品-团队游';
                    break;
                case appConst.PD_TEMP_ONLYVISA:
                    action  = '查看产品-单签证';
                    break;
                case appConst.PD_TEMP_ONLYTRAFFIC:
                    action  = '查看产品-单交通';
                    break;
                case appConst.PD_TEMP_ONLYBOOKING:
                    action  = '查看产品-单订房';
                    break;
                case appConst.PD_TEMP_ONLYTICKETS:
                    action  = '查看产品-单门票';
                    break;
                case appConst.PD_TEMP_LOCALTOUR:
                    action  = '查看产品-当地游';
                    break;
                default:
                    CommSrvc.error(I18nSrvc.get('PD_TEMP_TYPE_ERR'));
                    return;
            }
            $rootScope.trigger(action,meta,store_id,data);    
        }

        function product_flow_block(scope){
            scope.download = download;
            function download(){
                var scope = $rootScope.cur_scope();
                var url = appConst.HOST + '/' + scope.data.attach
                window.open(url)
            }
            if (!scope.data['产品审批记录']||_.isEmpty(scope.data['产品审批记录'])) {
                scope.block_hide = scope.block_hide||{};
                angular.forEach(['产品审批记录'],function(i){
                   scope.block_hide[i] = 1;
                });
            }
            scope.PdfSrvc = PdfSrvc;

            if(scope.data['attach']){
                scope.data.attach = scope.data['attach'];
                $timeout(function() {
                    PdfSrvc.loadPdf(appConst.HOST+'/'+scope.data['attach'],$("#pdfCanvas")[0],$("#pdfCt")[0].offsetWidth); 
                });
            }
        }
        function product_view_ty(action,meta,cfg,store_id,data) {
            var action = '';
            switch(data.pd_template_type){
                case appConst.PD_TEMP_TEAMTOUR:
                    action  = '查看产品-团队游-同业';
                    break;
                case appConst.PD_TEMP_ONLYVISA:
                    action  = '查看产品-单签证-同业';
                    break;
                case appConst.PD_TEMP_ONLYTRAFFIC:
                    action  = '查看产品-单交通-同业';
                    break;
                case appConst.PD_TEMP_ONLYBOOKING:
                    action  = '查看产品-单订房-同业';
                    break;
                case appConst.PD_TEMP_ONLYTICKETS:
                    action  = '查看产品-单门票-同业';
                    break;
                case appConst.PD_TEMP_LOCALTOUR:
                    action  = '查看产品-当地游-同业';
                    break;
                default:
                    CommSrvc.error(I18nSrvc.get('PD_TEMP_TYPE_ERR'));
                    return;
            }
            $rootScope.trigger(action,meta,store_id,data);    
        }
        function product_approve(scope){
            scope.download = download;
            function download(){
                var scope = $rootScope.cur_scope();
                var url = appConst.HOST + '/' + scope.data.attach
                window.open(url)
            }
            scope.PdfSrvc = PdfSrvc;
            if(scope.data['attach']){
                scope.data.attach = scope.data['attach'];
                $timeout(function() {
                    PdfSrvc.loadPdf(appConst.HOST+'/'+scope.data['attach'],$("#pdfCanvas")[0],$("#pdfCt")[0].offsetWidth); 
                });
            }
            scope.get_label_name = function(name){
                if(!isNaN(name)){
                    return I18nSrvc.get('第')+' '+name+' '+I18nSrvc.get('天')
                }else{
                    return I18nSrvc.get(name)||name;   
                }
            };
        }

        function product_edit(scope){
            scope.action_map = {
                '选定图片':selected_picture_done,
                '提交':submit,
                '提交审批':submit_approve,
            };
            scope.change_own_expense_setting = change_own_expense_setting;
            scope.change_shopping_setting = change_shopping_setting;

            function change_own_expense_setting(row,col){
                scope.block_hide = scope.block_hide||{};
                scope.block_hide['自费项目'] = (row[col.field]!=='1'?true:false);
                if(row[col.field]!=='1'){
                    scope.data['自费项目'].splice(0,scope.data['自费项目'].length); 
                }
            }
            function change_shopping_setting(row,col){
                scope.block_hide = scope.block_hide||{};
                scope.block_hide['购物场所'] = (row[col.field]!=='1'?true:false);
                if(row[col.field]!=='1'){
                    scope.data['购物场所'].splice(0,scope.data['购物场所'].length); 
                }
            }

            function submit_approve(){
                submit({approve:1});
            }

            function submit(p){
                //跟团游
                if(scope.product_temp_type ==appConst.PD_TEMP_TEAMTOUR||scope.product_temp_type == appConst.PD_TEMP_LOCALTOUR){
                    if(!_.isEmpty(scope.data['产品团队属性'])){
                        var group_attr = scope.data['产品团队属性'][0];
                        angular.forEach(['dep_city_id','nights','days','theme_ids'],function(key){
                            scope.data[scope.base_blk][0][key] = group_attr[key];
                        })
                    }
                }
                scope.data['产品信息编辑'] = scope.data[scope.base_blk];
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                if(_.isEmpty(scope.data['产品图片'])){
                    CommSrvc.error(I18nSrvc.get('MISS_PRODUCT_PIC'));
                    return ;
                }
                scope.data.approve = p&&p.approve;
                AjaxSrvc.submit(scope.cfg.submit.url,scope.data).then(function(data){
                    CommSrvc.info(data.message).result.then(function(){
                        $rootScope.pre_scope().load();
                        $rootScope.close_view();
                    });
                });
            }
            scope.init = function () {
                //数据初始化
                // if(_.isUndefined(scope.data['产品模块'])||!_.isArray(scope.data['产品模块'])){
                //     scope.data['产品模块'] = {};
                // }else{
                //     scope.data['产品模块'] = _.isEmpty(scope.data['产品模块'][0])?{}:scope.data['产品模块'][0];
                // }

                scope.product_temp_type = '';
                scope.base_blk = '';
                scope.product_route = product_route;
                scope.download = download;
                //新增产品
                var create_action = ['新增产品-团队游','新增产品-单交通','新增产品-单签证','新增产品-单订房','新增产品-单门票','新增产品-当地游',
                                    '新增产品-团队游-同业','新增产品-单交通-同业','新增产品-单签证-同业','新增产品-单订房-同业','新增产品-单门票-同业'
                                    ,'新增产品-当地游-同业'];
                if(create_action.indexOf(scope.action)!==-1){
                    scope.product_temp_type = scope.ref?scope.ref[scope.ref.blk][0]['pd_template_type']:'1';
                    scope.base_blk = scope.ref.blk;
                }else{
                    scope.product_temp_type = scope.data['产品信息编辑'][0].pd_template_type;
                    switch(scope.product_temp_type){
                        case appConst.PD_TEMP_TEAMTOUR:
                            scope.base_blk = '产品信息编辑';
                            break;
                        case appConst.PD_TEMP_ONLYVISA:
                            scope.base_blk = '产品信息编辑-单签证';
                            break;
                        case appConst.PD_TEMP_ONLYTRAFFIC:
                            scope.base_blk = '产品信息编辑-单项';
                            break;
                        case appConst.PD_TEMP_ONLYBOOKING:
                            scope.base_blk = '产品信息编辑-单项';
                            break;
                        case appConst.PD_TEMP_ONLYTICKETS:
                            scope.base_blk = '产品信息编辑-单项';
                            break;
                        case appConst.PD_TEMP_LOCALTOUR:
                            scope.base_blk = '产品信息编辑';
                            break;
                    }
                }
                if(create_action.indexOf(scope.action)!==-1){
                    scope.itinerary_add();
                } 

                scope.PdfSrvc = PdfSrvc;
                
                if(scope.data['attach']){
                    scope.data.attach = scope.data['attach'];
                    $timeout(function() {
                        PdfSrvc.loadPdf(appConst.HOST+'/'+scope.data['attach'],$("#pdfCanvas")[0],$("#pdfCt")[0].offsetWidth); 
                    });
                }
                
                function product_route(){
                    var scope = $rootScope.cur_scope();
                    var el = $("#comm_upload");
                    el.unbind('change');
                    el.bind('change',function(){
                        var data = new FormData();
                        data.append('file', el[0].files[0]);
                        el.val('');
                        AjaxSrvc.upload(data,'product_itinerary').then(function(response){
                            
                            scope.data.attach = response.save_path;

                            // $('.pdfCtrl').removeClass('hide');
                            
                            scope.PdfSrvc = PdfSrvc;
                            $timeout(function() {
                                PdfSrvc.loadPdf(appConst.HOST+'/'+response.save_path,$("#pdfCanvas")[0],$("#pdfCt")[0].offsetWidth);                                 
                            });

                            CommSrvc.info(response.message);
                        });
                    });
                    el.click();
                }      
                
                function download(){
                    var scope = $rootScope.cur_scope();
                    var url = appConst.HOST + '/' + scope.data.attach
                    window.open(url)
                }
            };


            scope.picture_add = function(){
                var el = $("#comm_upload");
                el.unbind('change');
                el.bind('change',function(){
                    var data = new FormData();
                    data.append('file', el[0].files[0]);
                    el.val('');
                    AjaxSrvc.upload(data,'gallery').then(function(response){
                        scope.data['产品图片'].push({path:response.save_path,thumbnail:response.thumbnail});
                        CommSrvc.info(response.message);
                    });
                });
                el.click();
            }

            function selected_picture_done(store_id,data,meta,action){
                var product_picture_arr = angular.copy(scope.data['产品图片']);
                var selected = $rootScope.cur_scope().selected;
                if(!selected||!selected.length){
                    CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                    return;
                }
                var selected_pic = [];
                angular.forEach(selected,function(pic){
                    selected_pic.push({id:pic.id,thumbnail:pic.thumbnail,path:pic.path}); 
                });
                var ids = _.difference(_.pluck(selected_pic,'id'),_.pluck(product_picture_arr,'id'));
                Array.prototype.push.apply(
                    product_picture_arr,
                    _.filter(selected_pic,function(i){return ids.indexOf(i['id']) !== -1;})
                );
                scope.data['产品图片'] = product_picture_arr;
                $rootScope.close_view();
            }

            scope.itinerary_add = function(){
                if(scope.data['行程详情']){
                    var itinerary = {};
                    scope.data['行程详情'].push(itinerary);
                    $timeout(function(){
                        $('ul[ui-sortable]').trigger('refresh');
                    });
                }
            };

            scope.itinerary_delete = function (index) {
                if(index>=1){
                    scope.data['行程详情'].splice(index, 1);
                }else{
                    return false;
                }
            };

            scope.itinerary_copy = function (index){
                if(index>=-1){
                    var itinerary = angular.copy(scope.data['行程详情'][index]);
                    scope.data['行程详情'].push(itinerary);
                    $timeout(function(){
                        $('ul[ui-sortable]').trigger('refresh');
                    });
                }else{
                    return false;
                }
            }

            scope.get_label_name = function(name){
                if(!isNaN(name)){
                    return I18nSrvc.get('第')+' '+name+' '+I18nSrvc.get('天')
                }else{
                    return I18nSrvc.get(name)||name;   
                }
            };
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
        function select_product_theme(scope){
            scope.data = {
                selected:$rootScope.cur_scope().data[scope.assoc_store_id][0].theme_ids,
                type:'PdTheme',
            };
            scope.submit = function(){
                var pre_scope = $rootScope.pre_scope();
                pre_scope.data[scope.assoc_store_id][0].theme_ids = scope.data.selected;
                pre_scope.data[scope.assoc_store_id][0].pd_theme_see = [];
                angular.forEach(scope.data.selected,function(key){
                    pre_scope.data[scope.assoc_store_id][0].pd_theme_see.push($rootScope.get_enum('PdTheme')[key]);
                });
                pre_scope.data[scope.assoc_store_id][0].pd_theme_see = pre_scope.data[scope.assoc_store_id][0].pd_theme_see.join(',');
                $rootScope.close_view();
            }
        }
        function select_product_through_city(scope){
            scope.data = {
                selected:scope.ref.city_ids,
                type:'City',
                cascade:'country',
            };
            scope.row = scope.ref;
            scope.submit = function(){
                scope.ref.city_ids = scope.data.selected;
                scope.ref.pd_city_see = [];
                angular.forEach(scope.data.selected,function(key){
                    scope.ref.pd_city_see.push($rootScope.get_enum('City')[key]);
                });
                scope.ref.pd_city_see = scope.ref.pd_city_see.join(',');
                $rootScope.close_view();
            }
        }
        function product_add(scope){
            scope.data ={
                type:'ProductTemplate'
            }
            var employee_name = $rootScope.appUser.employee_name;
            if($rootScope.appUser.department_name){
                var pd_provider = $rootScope.appUser.department_name;
            }else{
                var pd_provider = $rootScope.appUser.short_name;         
            }
            scope.submit = function(){
                var pd_template_type = scope.data.pd_template_type;
                var action = '';
                var blk = '';
                if(pd_template_type){
                    switch(pd_template_type){
                        case appConst.PD_TEMP_TEAMTOUR:
                            action  = '新增产品-团队游';
                            blk = '产品信息编辑';
                            break;
                        case appConst.PD_TEMP_ONLYVISA:
                            action  = '新增产品-单签证';
                            blk = '产品信息编辑-单签证';
                            break;
                        case appConst.PD_TEMP_ONLYTRAFFIC:
                            action  = '新增产品-单交通';
                            blk = '产品信息编辑-单项';
                            break;
                        case appConst.PD_TEMP_ONLYBOOKING:
                            action  = '新增产品-单订房';
                            blk = '产品信息编辑-单项';
                            break;
                        case appConst.PD_TEMP_ONLYTICKETS:
                            action  = '新增产品-单门票';
                            blk = '产品信息编辑-单项';
                            break;
                        case appConst.PD_TEMP_LOCALTOUR:
                            action  = '新增产品-当地游';
                            blk = '产品信息编辑';
                            break;
                        default:
                            CommSrvc.error(I18nSrvc.get('PD_TEMP_TYPE_ERR'));
                            return;
                    }
                    var params = {};
                    params['blk'] = blk;
                    params[blk] = [{'pd_template_type':pd_template_type,'pd_provider':pd_provider,'employee_name':employee_name}];
                    $rootScope.close_view();
                    $rootScope.trigger(action,{text:scope.text},null,params);
                    
               }else{
                    CommSrvc.error(I18nSrvc.get('PD_TEMP_TYPE_ERR'));
                    return;
               }
            };
        }
        function product_add_ty(scope){
            scope.data ={
                type:'ProductTemplate'
            }

            var employee_name = $rootScope.appUser.employee_name;
            if($rootScope.appUser.department_name){
                var pd_provider = $rootScope.appUser.department_name;
            }else{
                var pd_provider = $rootScope.appUser.short_name;         
            }
            
            scope.submit = function(){
                var pd_template_type = scope.data.pd_template_type;
                var action = '';
                var blk = '';
                if(pd_template_type){
                    switch(pd_template_type){
                        case appConst.PD_TEMP_TEAMTOUR:
                            action  = '新增产品-团队游-同业';
                            blk = '产品信息编辑';
                            break;
                        case appConst.PD_TEMP_ONLYVISA:
                            action  = '新增产品-单签证-同业';
                            blk = '产品信息编辑-单签证';
                            break;
                        case appConst.PD_TEMP_ONLYTRAFFIC:
                            action  = '新增产品-单交通-同业';
                            blk = '产品信息编辑-单项';
                            break;
                        case appConst.PD_TEMP_ONLYBOOKING:
                            action  = '新增产品-单订房-同业';
                            blk = '产品信息编辑-单项';
                            break;
                        case appConst.PD_TEMP_ONLYTICKETS:
                            action  = '新增产品-单门票-同业';
                            blk = '产品信息编辑-单项';
                            break;
                        case appConst.PD_TEMP_LOCALTOUR:
                            action  = '新增产品-当地游-同业';
                            blk = '产品信息编辑';
                            break;
                        default:
                            CommSrvc.error(I18nSrvc.get('PD_TEMP_TYPE_ERR'));
                            return;
                    }
                    var params = {};
                    params['blk'] = blk;
                    params[blk] = [{'pd_template_type':pd_template_type,'pd_provider':pd_provider,'employee_name':employee_name
                            }];
                    $rootScope.close_view();
                    $rootScope.trigger(action,{text:scope.text},null,params);
                    
               }else{
                    CommSrvc.error(I18nSrvc.get('PD_TEMP_TYPE_ERR'));
                    return;
               }
            }
        }
        function product_modify(action,meta,cfg,store_id,data){
            var action = '';
            switch(data.pd_template_type){
                case appConst.PD_TEMP_TEAMTOUR:
                    action  = '修改产品-团队游';
                    break;
                case appConst.PD_TEMP_ONLYVISA:
                    action  = '修改产品-单签证';
                    break;
                case appConst.PD_TEMP_ONLYTRAFFIC:
                    action  = '修改产品-单交通';
                    break;
                case appConst.PD_TEMP_ONLYBOOKING:
                    action  = '修改产品-单订房';
                    break;
                case appConst.PD_TEMP_ONLYTICKETS:
                    action  = '修改产品-单门票';
                    break;
                case appConst.PD_TEMP_LOCALTOUR:
                    action  = '修改产品-当地游';
                    break;
                default:
                    CommSrvc.error(I18nSrvc.get('PD_TEMP_TYPE_ERR'));
                    return;
            }
            $rootScope.trigger(action,meta,store_id,data);
        }
        function product_copy(action,meta,cfg,store_id,data){
            var action = '';
            switch(data.pd_template_type){
                case appConst.PD_TEMP_TEAMTOUR:
                    action  = '复制产品-团队游';
                    break;
                case appConst.PD_TEMP_ONLYVISA:
                    action  = '复制产品-单签证';
                    break;
                case appConst.PD_TEMP_ONLYTRAFFIC:
                    action  = '复制产品-单交通';
                    break;
                case appConst.PD_TEMP_ONLYBOOKING:
                    action  = '复制产品-单订房';
                    break;
                case appConst.PD_TEMP_ONLYTICKETS:
                    action  = '复制产品-单门票';
                    break;
                case appConst.PD_TEMP_LOCALTOUR:
                    action  = '复制产品-当地游';
                    break;
                default:
                    CommSrvc.error(I18nSrvc.get('PD_TEMP_TYPE_ERR'));
                    return;
            }
            $rootScope.trigger(action,meta,store_id,data);
        }

        function product_modify_ty(action,meta,cfg,store_id,data){
            var action = '';
            switch(data.pd_template_type){
                case appConst.PD_TEMP_TEAMTOUR:
                    action  = '修改产品-团队游-同业';
                    break;
                case appConst.PD_TEMP_ONLYVISA:
                    action  = '修改产品-单签证-同业';
                    break;
                case appConst.PD_TEMP_ONLYTRAFFIC:
                    action  = '修改产品-单交通-同业';
                    break;
                case appConst.PD_TEMP_ONLYBOOKING:
                    action  = '修改产品-单订房-同业';
                    break;
                case appConst.PD_TEMP_ONLYTICKETS:
                    action  = '修改产品-单门票-同业';
                    break;
                case appConst.PD_TEMP_LOCALTOUR:
                    action  = '修改产品-当地游-同业';
                    break;
                default:
                    CommSrvc.error(I18nSrvc.get('PD_TEMP_TYPE_ERR'));
                    return;
            }
            $rootScope.trigger(action,meta,store_id,data);
        } 
        function product_copy_ty(action,meta,cfg,store_id,data){
            var action = '';
            switch(data.pd_template_type){
                case appConst.PD_TEMP_TEAMTOUR:
                    action  = '复制产品-团队游-同业';
                    break;
                case appConst.PD_TEMP_ONLYVISA:
                    action  = '复制产品-单签证-同业';
                    break;
                case appConst.PD_TEMP_ONLYTRAFFIC:
                    action  = '复制产品-单交通-同业';
                    break;
                case appConst.PD_TEMP_ONLYBOOKING:
                    action  = '复制产品-单订房-同业';
                    break;
                case appConst.PD_TEMP_ONLYTICKETS:
                    action  = '复制产品-单门票-同业';
                    break;
                case appConst.PD_TEMP_LOCALTOUR:
                    action  = '复制产品-当地游-同业';
                    break;
                default:
                    CommSrvc.error(I18nSrvc.get('PD_TEMP_TYPE_ERR'));
                    return;
            }
            $rootScope.trigger(action,meta,store_id,data);
        }

        function product_approve_ty(action,meta,cfg,store_id,data){
            var action = '';
            switch(data.pd_template_type){
                case appConst.PD_TEMP_TEAMTOUR:
                    action  = '产品审批-团队游-同业';
                    break;
                case appConst.PD_TEMP_ONLYVISA:
                    action  = '产品审批-单签证-同业';
                    break;
                case appConst.PD_TEMP_ONLYTRAFFIC:
                    action  = '产品审批-单交通-同业';
                    break;
                case appConst.PD_TEMP_ONLYBOOKING:
                    action  = '产品审批-单订房-同业';
                    break;
                case appConst.PD_TEMP_ONLYTICKETS:
                    action  = '产品审批-单门票-同业';
                    break;
                case appConst.PD_TEMP_LOCALTOUR:
                    action  = '产品审批-当地游-同业';
                    break;
                default:
                    action  = '产品审批-团队游-同业';
                    break;
            }
            $rootScope.trigger(action,meta,store_id,data);
        }

        function product_approve_op(action,meta,cfg,store_id,data){
            var action = '';
            switch(data.pd_template_type){
                case appConst.PD_TEMP_TEAMTOUR:
                    action  = '产品审批-团队游';
                    break;
                case appConst.PD_TEMP_ONLYVISA:
                    action  = '产品审批-单签证';
                    break;
                case appConst.PD_TEMP_ONLYTRAFFIC:
                    action  = '产品审批-单交通';
                    break;
                case appConst.PD_TEMP_ONLYBOOKING:
                    action  = '产品审批-单订房';
                    break;
                case appConst.PD_TEMP_ONLYTICKETS:
                    action  = '产品审批-单门票';
                    break;
                case appConst.PD_TEMP_LOCALTOUR:
                    action  = '产品审批-当地游';
                    break;
                default:
                    action  = '产品审批-团队游';
                    break;
            }
            $rootScope.trigger(action,meta,store_id,data);
        }

        function product_add_enable(action,meta,cfg,store_id,data){
            if(_.isEmpty(EnumSrvc['UserPdNav'])||_.isEmpty(EnumSrvc['UserPdTag'])){
                CommSrvc.error(I18nSrvc.get('YOU_HAVE_NOT_BIND_PD_TAG'));
                return false;
            }
            return true;
        }
        function product_edit_enable(action,meta,cfg,store_id,data){
            if(_.isEmpty(EnumSrvc['UserPdNav'])||_.isEmpty(EnumSrvc['UserPdTag'])){
                CommSrvc.error(I18nSrvc.get('YOU_HAVE_NOT_BIND_PD_TAG'));
                return false;
            }
            return true;
        }
        function product_copy_enable(action,meta,cfg,store_id,data){
            if(_.isEmpty(EnumSrvc['UserPdNav'])||_.isEmpty(EnumSrvc['UserPdTag'])){
                CommSrvc.error(I18nSrvc.get('YOU_HAVE_NOT_BIND_PD_TAG'));
                return false;
            }
            return true;
        }

        function product_recommend_edit(scope){
            scope.data.pd_name = scope.ref.pd_name;
            scope.data.pos_arr = [];
            scope.data.pic_arr = [];
            scope.data.show_pic_arr = ['2','4'];

            scope.init = function(){
                if(!_.isEmpty(scope.data['推荐详情'])){
                    scope.data.pos_arr = _.pluck(scope.data['推荐详情'],'pic_pos');
                    angular.forEach(scope.data['推荐详情'],function(item){
                        scope.data.pic_arr[item.pic_pos] = item.pic;
                    });
                }
            }
            scope.toggleCheckbox = function(v,arr){
                var idx = arr.indexOf(v);
                if (idx > -1) {
                    arr.splice(idx, 1);
                    delete scope.data.pic_arr[v] ;
                }else {
                    arr.push(v);
                }
            }
            scope.submit = function(){
                var param = {};
                param.product_id = scope.ref.product_id;
                param.recommend = [];
                var submit_check = true;
                angular.forEach(scope.data.pos_arr,function(pos){
                    if(_.isUndefined(scope.data.pic_arr[pos])||_.isNull(scope.data.pic_arr[pos])){
                        if(pos==2||pos==4){
                           submit_check = false;
                           return;
                        }
                    }
                    if(submit_check){
                        var record = {'pic_pos':pos};
                        if(!_.isUndefined(scope.data.pic_arr[pos])&&!_.isNull(scope.data.pic_arr[pos])){
                            record['pic'] = scope.data.pic_arr[pos];
                        }
                        param.recommend.push(record);
                    }
                });
                if(!submit_check){
                    CommSrvc.error(I18nSrvc.get('PIC_POS_ERR'));
                    return;
                }
                AjaxSrvc.submit(scope.cfg.submit.url,param).then(function(data){
                    CommSrvc.info(data.message).result.then(function(){
                        $rootScope.pre_scope().load();
                        $rootScope.close_view();
                    });
                }); 
            }
        }

        function product_file_edit(scope){
            scope.loadData('产品行程文件列表',angular.fromJson(scope.ref.attach));
        }   
    }
})();