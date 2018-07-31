(function() {
    'use strict';

    angular
    .module('app')
    .factory('Srvcs', Srvcs)
    .factory('RootSrvc', RootSrvc);

    Srvcs.$inject = ['SysSrvc','OrgSrvc','OpSrvc','SaleSrvc','FinSrvc'
                    ,'InvoiceSrvc','ResSrvc','AccSrvc','StatSrvc'
                    ,'ProductSrvc','TySrvc','SuppSrvc','GallerySrvc','HomeSrvc',
                    'QcSrvc','EventOrderSrvc'];
    function Srvcs(SysSrvc,OrgSrvc,OpSrvc,SaleSrvc,FinSrvc,InvoiceSrvc,ResSrvc,AccSrvc,StatSrvc,ProductSrvc,TySrvc,SuppSrvc,GallerySrvc,HomeSrvc,QcSrvc,EventOrderSrvc) {
        var arr = [SysSrvc,OrgSrvc,OpSrvc,SaleSrvc,FinSrvc,InvoiceSrvc,ResSrvc,AccSrvc,StatSrvc,ProductSrvc,TySrvc,SuppSrvc,GallerySrvc,HomeSrvc,QcSrvc,EventOrderSrvc];
        var s = {};
        for (var i in arr) {
            for (var k in arr[i]) {
                if(s[k]){
                    alert(k+' duplicate');
                    return {};
                }
                s[k] = arr[i][k];
            }
        }
        return s;
    }

    RootSrvc.$inject = ['$rootScope','$timeout','$uibModal','I18nSrvc','AjaxSrvc','uiGridEditConstants','i18nService','CommSrvc','EnumSrvc','appConst','BarStatSrvc','FieldSrvc'];
    function RootSrvc($rootScope,$timeout,$uibModal,I18nSrvc, AjaxSrvc,uiGridEditConstants,i18nService,CommSrvc,EnumSrvc,appConst,BarStatSrvc,FieldSrvc) {
        
        var lang_name = {0:'zh-CN',1:'en'}[$rootScope.lang];
        i18nService.setCurrentLang(lang_name);         

        $rootScope.Math = window.Math;
        $rootScope.appConst = appConst;   

        $rootScope.timeMaskOpt = {maskDefinitions: { '2':/[0-2]/, '3':/[0-3]/, '5':/[0-5]/ } };
        
        $rootScope.TOTAL = I18nSrvc.get('TOTAL');
        $rootScope.i18n = I18nSrvc.get;

        //系统类
        $rootScope.dock_height = dock_height;
        $rootScope.expand_height = expand_height;
        $rootScope.cellEditClose = cellEditClose;
        $rootScope.searchChange = searchChange;
        $rootScope.resize_op_col = resize_op_col;
        $rootScope.click_options = click_options;
        $rootScope.update_flow = update_flow;
        $rootScope.clear_cache = clear_cache;
        $rootScope.load = load;
        $rootScope.loadData = loadData;

        //工具类
        $rootScope.isContain = isContain;
        $rootScope.toggleCheckbox = toggleCheckbox;
        $rootScope.toQueryString = toQueryString;
        $rootScope.dateCheck = dateCheck;
        $rootScope.cvtPath = cvtPath;
        //用户菜单
        $rootScope.app_download = app_download;
        $rootScope.close_all_msg = close_all_msg;

        $rootScope.logout = logout;
        //业务相关
        $rootScope.calc_acc = calc_acc;
        $rootScope.choose_settle_obj = choose_settle_obj;

        //map
        $rootScope.select_row_done = select_row_done;
        $rootScope.delete_row = delete_row;
        $rootScope.add_row = add_row;
        $rootScope.submit = submit;
        $rootScope.submit_data = submit_data;
        $rootScope.get_confirm_text = get_confirm_text;
        $rootScope.submit_check = submit_check;
        $rootScope.if_row_btn = if_row_btn;

        var map = {
            '选定单行': select_row_done,
            '选定多行': select_row_done,
            '添加行': add_row,
            '删除行': delete_row,
            '上移行': up_row,
            '下移行': down_row,
            '复制行':copy_row,
            '刷新': refresh,
            '提交': submit,
            '提交审批':submit_approve,
            '快捷审批': approve,
            '快速通过': pass,

            '选择结算对象': choose_settle_obj,
            
        };

        return map;
        function cvtPath(path) {
            if(path.substr(0,4) == 'http'){
                return path;
            }else{
                return appConst.HOST+'/'+path;
            }
        }
        //辅助
        function swapItems(arr, index1, index2) {
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            return arr;
        }
        function diff(src,target,uniq){
            var ids = _.pluck(src,uniq);
            ids = _.compact(ids);
            if(ids.length !== src.length){
                CommSrvc.error(I18nSrvc.get('NO_ID'));
                return;
            }
            ids = _.difference(ids,_.pluck(target,uniq));
            return _.filter(src,function(i){return ids.indexOf(i[uniq]) !== -1;});
        }
        function updateScroll(){
            if(!$rootScope.gridScroll){
                $timeout(function(){
                    $('.ui-grid-viewport').each(function () {
                        this.ps && this.ps.update();
                    });
                });
            }  
        }
        //----------------------------map----------------------------------
        function select_row_done(){
            var cur = this;
            var assoc_store_id  = cur.assoc_store_id;
            var selected        = cur.selected;
            var append          = cur.cfg.multi?true:false;

            if(!selected || !selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }

            $rootScope.pre_scope().loadData(assoc_store_id, selected, append);
            $rootScope.close_view();
            return true;
        }
        function add_row(store_id,data,meta){
            var store = this.data[store_id];
            var row = {}

            if(meta.init){
                angular.forEach(meta.init,function(v,k){
                    $rootScope.init_data(v,k,row);
                });
            }

            store.push(row);       
        }
        function delete_row(store_id,data){
            var store = this.data[store_id];
            var i = store.indexOf(data);
            if(i !== -1){
                store.splice(i,1);
            }
        }
        function move_row(store_id,data,down) {
            var store = this.data[store_id];
            var i = store.indexOf(data);
            if(i === -1){
                return;

            }
            if(down) {
                if(i === store.length -1) {
                    return;
                }
                swapItems(store, i, i + 1);
            } else {
                if(i === 0) {
                    return;
                }
                swapItems(store, i, i - 1);
            }
        }
        function up_row(store_id,data) {
            move_row.call(this,store_id,data);
        }
        function down_row(store_id,data){
            move_row.call(this,store_id,data,true);
        }
        function copy_row(store_id,data){
            var store = this.data[store_id];
            var new_row = angular.copy(data);
            if(new_row['id']){
                delete new_row['id'];
            }
            store.push(new_row);
        }
        function refresh(){
            var scope = $rootScope.cur_scope();
            scope.load();
        }
        function submit_check(){
            var scope = this;
            var cfg = scope.cfg;
            var rq_empty = false;
            switch(cfg.view){
                case 'blocks':
                    var blocks = _.filter(angular.copy(cfg.block),function(item,index){
                        return (!cfg.ro||!cfg.ro[index])&&(!scope.block_hide||!scope.block_hide[item]||scope.block_hide[item]!='1');
                    });
                    angular.forEach(blocks,function(key){
                        var block_cfg = $rootScope.blocks[key];
                        var rq_list = [];
                        angular.forEach(block_cfg.list,function(cfg,field){
                            var ro = _.isUndefined(cfg.ro)?block_cfg.ro:cfg.ro;
                            if(cfg.rq&&!ro){//rq 标记必填字段
                                var _cfg = {field:field};
                                if(cfg.type&&EnumSrvc[cfg.type]){
                                    _cfg['cfg'] = cfg;
                                }
                                rq_list.push(_cfg);
                            }
                        });
                        var data = scope.data[key];
                        angular.forEach(data,function(item){
                            angular.forEach(rq_list,function(_cfg){
                                if(!_cfg.cfg&&!item[_cfg.field]&&!rq_empty){ // 为空 则记录空字段名称
                                    rq_empty = block_cfg.list[_cfg.field].text;
                                    return ;
                                }
                                if(_cfg.cfg&&(_.isUndefined(item[_cfg.field])
                                    ||!$rootScope.get_enum(_cfg.cfg,item)[item[_cfg.field]])){
                                    rq_empty = block_cfg.list[_cfg.field].text;
                                    return ;
                                }
                            });
                        });
                    });
                break;
                default:
                    break;
            }
            return rq_empty;
        }
        function submit_approve(){
            submit.call(this, {approve:1});
        }
        function submit_data(data) {
            submit.call(this, {data:data});
        }
        function submit(p){
            var scope = this;
            var cfg = scope.cfg.submit;
            //
            var re_field = this.submit_check?this.submit_check():'';//submit_check.call(this);
            if(!_.isEmpty(re_field)){
                CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                return;
            }

            var data = $rootScope.get_req_data(cfg.data, (p && p.data) || scope.data);
            data.approve = p && p.approve;

            AjaxSrvc.submit(cfg.url,data).then(function(data){
                CommSrvc.info(data.message).result.then(function(){
                    if(!scope.unrefer){
                        $rootScope.pre_scope().load();
                    }
                    $rootScope.close_view();
                });
            });
        }

        function approve(store_id,data){
            this.trigger(data.action,{'unrefer':0},null,{id:data.assoc_id});
        }

        function pass(store_id,data) {
            this.trigger(data.action,{'background':1},null,{id:data.assoc_id});
        }
        //----------------------------系统类----------------------------------
        function dock_height(show_regular){
            return $(window).height() - 167 -(show_regular?55:0);
        }

        function expand_height(cfg){
            return cfg.data.length*30 + 30 + 2 + (cfg.showColumnFooter?30:0);
        }
        function cellEditClose(scope,isOpen){
            isOpen || scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
        }
        function clearCascade(cfg,field,data){
            for (var i in cfg) {
                if(cfg[i].cascade == field){
                    delete data[i];
                    return i;
                }
            }
        }
        function searchChange(cfg,field,data){
            while(1){
                field = clearCascade(cfg,field,data);
                if(!field){
                    break;
                }
            }
        }
        function resize_op_col(col,row){
            var width = _.reduce(row.btn_len, function(memo, num){ return memo + num; }, 0) + 10;
            if(width<80){
                width = 80;
            }

            if(col.width=='*' || col.width<width){
                col.width = width;
                col.widthHold = width;
            }

            if(col.drawnWidth != col.width){
                col.grid.refresh();
            }
        }
        function if_row_btn(row,action,length,if_show) {
            row.btn_len = row.btn_len || {};
            for (var k in if_show) {
                if(if_show[k][0] == '!='){
                    var cmp = if_show[k][1] == 'Self' ? $rootScope.appUser.employee_id : if_show[k][1];
                    if(!(row.entity[k]!=cmp)){
                        row.btn_len[action] = 0;
                        return false;
                    }
                }else if(if_show[k][0] == '=='){
                    var cmp = if_show[k][1] == 'Self' ? $rootScope.appUser.employee_id : if_show[k][1];
                    if(!(row.entity[k]==cmp)){
                        row.btn_len[action] = 0;
                        return false;
                    }
                }else{
                    if(!isContain(if_show[k],row.entity[k])){
                        row.btn_len[action] = 0;
                        return false;
                    }
                }
            }
 
            row.btn_len[action] = length;
            return true;
        }

       function click_options(mod,cfg) {
            return [        
                    {
                    text: I18nSrvc.get('OPEN_IN_NEW_WIN'),
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        window.open('./');
                        localStorage.new_window_mod = angular.copy(mod);
                        localStorage.new_window_cfg = angular.toJson(angular.copy(cfg));
                    }
                }
            ];
        }
        function update_flow(){
            AjaxSrvc.get('/comm/Flow/update_flow').then(function(){CommSrvc.info('done')});
        }

        function clear_cache(){
            AjaxSrvc.get('/sys/Config/clear_cache').then(function(){CommSrvc.info('done')});
        }
        function loadData(store_id,data,uniq){
            var scope = this;
            if(uniq == 'new'){
                //pass
            }else if(uniq){
                data = diff(data,scope.data[store_id],(uniq===true?'id':uniq));
                if(!data){
                    return;
                }
            }else{
                scope.data[store_id].splice(0);
            }
            Array.prototype.push.apply(scope.data[store_id], data);
        }
        function load() {
            var scope = this;
            if(!(scope.cfg && scope.cfg.read)){
                return;
            }
            AjaxSrvc.get(scope.cfg.read.url,scope.search,'all').then(function(response){
                if(scope.gridOptions){
                    scope.gridOptions.totalItems = response.total;
                }
                scope.data.splice(0);
                Array.prototype.push.apply(scope.data, response.data);
                if($rootScope.bbarInfo[scope.search.mod]){
                     scope.gridOptions.bbarInfo = $rootScope.bbarInfo[scope.search.mod](scope.data);
                }
                updateScroll();
            });
        }


        //----------------------------工具类----------------------------------
        function isContain(arr,item){
            for (var i in arr) {
                if(arr[i] == item){
                    return true;
                }
            }
            return false;
        }
        function toggleCheckbox(v,arr) {
            var idx = arr.indexOf(v);
            if (idx > -1) {
                arr.splice(idx, 1);
            }else {
                arr.push(v);
            }
        }
        function toQueryString(params){
            var e = [];
            for(var key in params) {
                if(params[key]){
                    var q = key+'='+params[key];
                    e.push(q);
                }
            }
            return e.join("&");
        }

        function dateCheck(date_from,date_to){
            var start_date = new Date(date_from);
            var end_date = new Date(date_to);
            var start = start_date.getTime()/1000;
            var end = end_date.getTime()/1000;
            var interval = end - start;
            if(interval > 3600 * 24 * 30 * 3 || interval < 0) {
                return false;
            }
            return true;
        }
        //----------------------------用户菜单----------------------------------
        function app_download(){
            AjaxSrvc.get('/PublicApi/app_qrcode_url').then(
                function (data) {
          
                    var win = $uibModal.open({
                      template: '<div class="modal-body wrapper-lg" style="text-align:center">'+
                        '<button type="button" class="close" aria-label="Close" ng-click="cancel()"><span aria-hidden="true">&times;</span></button>'+
                        '<img src="'+data+'"></img></div>',
                      controller : 'ModalInstanceCtl',
                      backdrop: false,
                      resolve:{cfg:{}}
                    });
                }
            );

        }
        function close_all_msg(){
            $('button.toast-close-button').click();
        }

        function logout(){
            AjaxSrvc.get('/Session/logout');
        }    
        //----------------------------业务相关----------------------------------
        function calc_acc(){
            var data = this.data;

            _.each(['本次核算','历史核算','投保核算','送签核算'],function(i){

                _.each(data[i],function(item){

                    item.rate = EnumSrvc.CurrencyRate[item.currency_id];
                    if(item.num_of_people
                       &&item.unit_price
                       &&item.rate){
                        item.local_currency_total  = (item.num_of_people*item.unit_price).toFixed(2);
                        item.RMB_total = (item.num_of_people*item.unit_price*item.rate).toFixed(2);
                    }else{
                        item.local_currency_total = 0;
                        item.RMB_total = 0;
                    }
                });

            });

        }

        function choose_settle_obj(store_id,data,meta,action){
            var selected = $rootScope.cur_scope().gridSel[store_id];

            if(!selected||!selected.length){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }

            var scope = $rootScope.cur_scope();
            if(scope.cfg.ro){
                var index = scope.cfg.block.indexOf(store_id);
                if(scope.cfg.ro[index]){
                    return;
                }
            }
            var mcfg = {
                text : meta.text,
                data : {settle_obj_type : 'Supplier'},
                submit : function(){
                    var data = this.data;
                    if(!(data.settle_obj_id > 0)){
                        CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                        return;
                    }
                    angular.forEach(selected,function(item){
                        if(data.settle_obj_type == 'Supplier'){
                            item.pay_supplier_id = data.settle_obj_id;
                            item.pay_employee_id = 0;
                            item.pay_department_id = 0;
                        }else if(data.settle_obj_type == 'Employee'){
                            item.pay_employee_id = data.settle_obj_id;
                            item.pay_supplier_id = 0;
                            item.pay_department_id = 0;
                        }else{
                            item.pay_department_id = data.settle_obj_id;
                            item.pay_employee_id = 0;
                            item.pay_supplier_id = 0;
                        }
                        item.settle_obj = data.settle_obj;
                    });
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

        function get_confirm_text(confirm){
            var confirm_text = ''
            switch(confirm){
                case 'delete':
                    confirm_text = I18nSrvc.get('DEL_CONFIRM');
                    break;
                case 'revoke':
                    confirm_text = I18nSrvc.get('REVOKE_CONFIRM');
                    break;
                case 'cancel':
                    confirm_text = I18nSrvc.get('CANCEL_CONFIRM');
                    break;
                case 'settle':
                    confirm_text = I18nSrvc.get('SETTLE_CONFIRM');
                    break;
                case 'revokeGroup':
                    confirm_text = I18nSrvc.get('REVOKE_GROUP_CONFIRM');
                    break;
                case 'revoke_associate':
                    confirm_text = I18nSrvc.get('REVOKE_ASSOCIATE_CONFIRM');
                    break;
                case 'on_shelf':
                    confirm_text = I18nSrvc.get('ON_SHELF_CONFIRM');
                    break;
                case 'pass':
                    confirm_text = I18nSrvc.get('PASS_CONFIRM');
                    break;
                case 'reject':
                    confirm_text = I18nSrvc.get('REJECT_CONFIRM');
                    break;
                case 'under_shelf':
                    confirm_text = I18nSrvc.get('UNDER_SHELF_CONFIRM');
                    break;
                case 'write_off':
                    confirm_text = I18nSrvc.get('WRITE_OFF_CONFIRM');
                    break;
                case 'abolish':
                    confirm_text = I18nSrvc.get('ABOLISH_CONFIRM');
                    break;
                case 'submit':
                    confirm_text = I18nSrvc.get('SUBMIT_CONFIRM');
                    break;
                case 'send_msg':
                    confirm_text = I18nSrvc.get('SEND_MSG_CONFIRM');
                    break; 
                case 'cancel_elcContract':
                    confirm_text = I18nSrvc.get('CANCEL_ELCCONTRACT_CONFIRM');
                    break;
                case 'abolish_elcContract':
                    confirm_text = I18nSrvc.get('ABOLISH_ELCCONTRACT_CONFIRM');
                    break;
                case 'claim_confirm':
                    confirm_text = I18nSrvc.get('CLAIM_CONFIRM');
                    break;
                case 'close_inquiry':
                    confirm_text = I18nSrvc.get('CLOSE_INQUIRY_CONFIRM');
                    break;
                case 'return_fund':
                    confirm_text = I18nSrvc.get('RETURN_FUND_CONFIRM');
                    break;
                case 'close_schedule':
                    confirm_text = I18nSrvc.get('CLSOE_SCHEDULE_CONFIRM');
                    break;
                case 'settle':
                    confirm_text = I18nSrvc.get('SETTLE_CONFIRM');
                    break;
                case 'lock_order':
                    confirm_text = I18nSrvc.get('LOCK_ORDER_CONFIRM');
                    break;
                case 'unlock_order':
                    confirm_text = I18nSrvc.get('UNLOCK_ORDER_CONFIRM');
                    break;
                default :
                    confirm_text = confirm;
                    break;
                }
            return confirm_text;
        }
    }

})();