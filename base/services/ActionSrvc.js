(function() {
    'use strict';

    angular
    .module('app')
    .factory('ActionSrvc', ActionSrvc);

    ActionSrvc.$inject = ['$rootScope','$compile','$timeout','FieldSrvc','AjaxSrvc','CommSrvc','I18nSrvc','RootSrvc','$uibModal','Srvcs'];
    function ActionSrvc($rootScope, $compile, $timeout, FieldSrvc, AjaxSrvc, CommSrvc, I18nSrvc, RootSrvc, $uibModal,Srvcs){

        var tabs = {};
        var mods = {};

        $rootScope.cur_mod = null;

        $rootScope.tabs = tabs;
        $rootScope.switch_tab = switch_tab;
        $rootScope.close_tab = close_tab;

        $rootScope.cur_scope = cur_scope;
        $rootScope.pre_scope = pre_scope;
        $rootScope.close_view = close_view;
        $rootScope.cancel = close_view;
        $rootScope.open_home = open_home;
        $rootScope.open_mod = open_mod;
        $rootScope.trigger = trigger;


        $rootScope.get_req_data = get_req_data;
        $rootScope.init_data = init_data;
        $rootScope.get_read_param = get_read_param;
        $rootScope.init_block_grid = init_block_grid;
        $rootScope.init_grid_state = init_grid_state;
        $rootScope.init_blocks = init_blocks;

        var map = angular.extend({
            '关闭': close_view,
        },RootSrvc);

        return {};

        function cur_scope(){
            return $rootScope.stack_scope[$rootScope.stack_scope.length-1];
        }

        function pre_scope(){
            return $rootScope.stack_scope[$rootScope.stack_scope.length-2];
        }

        function hide_view(){
            if($rootScope.stack_scope && $rootScope.stack_scope.length && cur_scope().background){
                close_view();
            }
            $rootScope.stack_header && $rootScope.stack_header.length && 
            $rootScope.stack_header[$rootScope.stack_header.length-1].hide();

            if($rootScope.stack_content && $rootScope.stack_header.length){
                var ct = $rootScope.stack_content[$rootScope.stack_content.length-1];
                ct.scroll_height = $('html').scrollTop();
                ct.hide();
                $('html').scrollTop(0);
            } 
            
        }

        function show_view(){
            $rootScope.stack_header[$rootScope.stack_header.length-1].show();
            var ct = $rootScope.stack_content[$rootScope.stack_content.length-1];
            ct.show();
            $('html').scrollTop(ct.scroll_height);
        }

        function delete_view(mod){
            var p = $rootScope;
            if(mod){
                p = mods[mod];
            }
            var s = p.stack_scope.pop();
            var h = p.stack_header.pop();
            var c = p.stack_content.pop();
            if(!s){
                return false;
            }
            if(s.win){
                s.win.close();
            }
            s.$destroy();
            h&&h.remove();
            c&&c.remove();

            return true;
        }

        function clear_view(mod){
            while(delete_view(mod)){}
        };

        function close_view(){
            delete_view();
            show_view();
            // $('.modal').toggle();
        }


        //------------------------------------------------------------------------
        function trigger(action,meta,store_id,data){
            console.log(action);
            var cfg = $rootScope.actions[action] || {};

            meta = meta || {};
            var scope = this;

            var runnable = cfg.runnable || meta.runnable
            if(runnable){

                switch(runnable){
                    case 'blk_sel':
                        if(!(scope.gridSel && scope.gridSel[store_id] && scope.gridSel[store_id].length)){
                            CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                            return;
                        }
                        break;
                    case 'mod_sel':
                        if(!(scope.selected && scope.selected.length)){
                            CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                            return;
                        }
                        break;
                    case 'data_sel':
                        if(!data){
                            CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                            return;
                        }
                        break;
                    default:
                        if(Srvcs[runnable]) {
                            if(!Srvcs[runnable](data,store_id,action)){
                                return ;
                            }
                        }
                        break;
                }
            }
            var cur = $rootScope.cur_scope();
            var pre = $rootScope.pre_scope();
            //关闭之前执行失败的background
            if(cur.background){
                $rootScope.close_view();
            }
            //DEPRECATED(已弃用):勿要在scope里定义action_map,所有action都在后端定义
            if(cur.action_map && cur.action_map[action]){

                cur.action_map[action](store_id,data,meta,action);

            }
            //DEPRECATED(已弃用):勿要在scope里定义action_map,所有action都在后端定义
            else if(pre && pre.action_map && pre.action_map[action]){

                pre.action_map[action](store_id,data,meta,action);

            }else if(meta.mandatory || cfg.view === 'mandatory'){//托管actoin

                Srvcs[action] && Srvcs[action](action,meta,cfg,store_id,data);

            }else if(cfg.view === 'submit'){//提交类action
                if(cfg.confirm){
                    var confirm_text = $rootScope.get_confirm_text(cfg.confirm);
                    CommSrvc.confirm(confirm_text).result.then(function(){
                        AjaxSrvc.submit(cfg.submit.url,get_req_data(cfg.submit.data, data)).then(function(data){
                            scope.load();
                            CommSrvc.info(data.message);
                        });
                    });
                }else{
                    AjaxSrvc.submit(cfg.submit.url,get_req_data(cfg.submit.data, data)).then(function(data){
                        scope.load();
                        CommSrvc.info(data.message);
                    });

                    // scope.submit();
                }

            }else if(cfg.view){//模板类action

                open_action.call(this,action,meta,cfg,store_id,data);

            }else if(map[action]){//共通action

                map[action].call(this,store_id,data,meta);

            }else{
                CommSrvc.error(action+' not found');
            }
        }

        function open_action(action,meta,cfg,store_id,data){

            if(!cfg.read){
                var copy = angular.copy(data);
                if(!data){
                    copy = {};
                    if(cfg.init){
                        angular.forEach(cfg.init,function(v,k){
                            init_data(v,k,copy);
                        });
                    }
                }
                init_action(action,meta,cfg,{
                    assoc_store_id:store_id,
                    data:copy,
                    ref:data,
                });
                return;
            }

            var param = get_read_param(action,cfg,data||$rootScope.cur_scope().data);
            if(cfg.view=='mod'){
                param.limit = 100;
            }
            
            AjaxSrvc.get(cfg.read.url,param,'all').then(function(load_data){
                init_action(action,meta,cfg,{
                    assoc_store_id:store_id,
                    data:load_data.data,
                    ref:data,
                    search:param,
                    total:load_data.total
                });
            });
        }

        function get_read_param(action,cfg,data) {
            var param = {action:action};

            if(cfg.mod){
                param.mod = cfg.mod;
            }
            if(data && data.search){
                angular.extend(param,data.search);
            }

            if(cfg.read.data){
                angular.extend(param, get_req_data(cfg.read.data, data));
            }
            return param;
        }

        function init_action(action,meta,cfg,extra){
            var text = cfg.text || meta.text;

            var scope = $rootScope.$new();
            scope.meta = meta;
            scope.text = text;
            scope.vm = {};
            scope.cfg = cfg;
            scope.action = action;

            _.extend(scope,extra);

            if(cfg.transfer){
                if(Srvcs[cfg.transfer]){
                    scope.data = Srvcs[cfg.transfer](scope.data);
                } 
            }
            
            if(meta.unrefer){
                scope.unrefer = meta.unrefer;
                scope.title = text; 
            }else{
                scope.title = $rootScope.cur_scope().title + ' - ' + text; 
            }

            var tpl;

            switch(cfg.view){
                case 'form':
                    tpl = init_form(scope,action,meta,cfg,extra);
                    break;
                case 'mod':
                    tpl = init_mod(scope,action,meta,cfg,extra);
                    break;
                case 'grid':
                case 'blocks':
                    tpl = init_blocks(scope,action,meta,cfg,extra);
                    break;
                default:
                    tpl = v[cfg.view] || cfg.view;
                    break;
            }

            Srvcs[action] && Srvcs[action](scope);

            if(cfg.modal){
                scope.win = $uibModal.open({
                  templateUrl: tpl,
                  scope: scope,
                  // controller : 'ModalInstanceCtl',
                  backdrop: false,
                  size: cfg.size,
                  keyboard:false,
                });
                var header_dom = {hide:function () {},show:function () {},remove:function () {}};
                var content_dom = {
                    hide:function () {
                        var len = $rootScope.stack_content.length;
                        $rootScope.stack_content[len-1].el = $rootScope.stack_content[len-1].el || $('.modal:visible');
                        $rootScope.stack_content[len-1].el.hide();
                        $rootScope.stack_header[len-2].hide();
                        $rootScope.stack_content[len-2].hide();
                    },
                    show:function () {
                        var len = $rootScope.stack_content.length;
                        $rootScope.stack_content[len-1].el && $rootScope.stack_content[len-1].el.show();
                        $rootScope.stack_header[len-2].show();
                        $rootScope.stack_content[len-2].show();
                    },
                    remove: function () {}
                };
            }else{
                var header =  '<div><ng-include src="\'Header.html\'"></ng-include></div>';
                var content = '<div><ng-include src="\''+tpl+'\'"></ng-include></div>';

                var header_dom = $compile(header)(scope);
                var content_dom = $compile(content)(scope);

                if(meta.background){
                    header_dom.hide();
                    content_dom.hide();
                }else{
                    hide_view();
                }

                $('#header').append(header_dom);
                $('#content').append(content_dom);
            }

            $rootScope.stack_scope.push(scope);
            $rootScope.stack_header.push(header_dom);
            $rootScope.stack_content.push(content_dom);

            // $('.modal').toggle();

            scope.init && scope.init();

            if(meta.background){
                scope.background = meta.background;
                $timeout(function() {
                    scope.submit();
                });
            }
        }

        function init_form(scope,action,meta,cfg,extra) {
            var tpl;
            if(cfg.modalless){
                tpl = 'Form.html';
            }else{
                cfg.modal = 1;
                tpl = 'form_window.html';
            }

            var block_cfg = $rootScope.blocks[cfg.block[0]];
            if(!extra.data.id && block_cfg.init){
                angular.forEach(block_cfg.init,function(v,k){
                    init_data(v,k,scope.data);
                });
            }
            return tpl;
        }

        function init_mod(scope,action,meta,cfg,extra) {

            if(!cfg.list){
                var mod_cfg = $rootScope.mods[cfg.mod];

                angular.forEach(['s_regular','s_text','list'],function(item){
                    cfg[item] = angular.copy(mod_cfg[item]);
                });

                angular.forEach(cfg.read.param,function(v,k){
                    delete cfg.s_regular[k];
                });

            }
            if(cfg.show_regular){
                scope.vm.show_regular = true;
            }
            scope.search = angular.copy(cfg.read.param || {});
            scope.search.mod = cfg.mod;
            if(action){
                scope.search.action = action;
            }
            
            if(extra.ref && extra.ref.search){
                angular.extend(scope.search,extra.ref.search);
            }
            var col_def = FieldSrvc.get_mod_col(cfg);
            scope.gridOptions = {
                columnDefs:col_def,
                data:scope.data,
                enableRowHeaderSelection:false,
                enableHorizontalScrollbar: $rootScope.gridScroll,
                enableVerticalScrollbar: $rootScope.gridScroll,
                multiSelect: !!cfg.multi,
                rowHeight: cfg.rowHeight,
                paginationPageSizes: [50, 100, 200],
                paginationPageSize: 100,
                useExternalPagination: true,
                paginationTemplate: 'Pagination.html',
                totalItems: extra.total,
                onRegisterApi : function(gridApi){

                    init_grid_state(gridApi,cfg.mod,col_def);

                    init_mod_grid(gridApi,scope);
                }
            };

            return 'Mod.html';
        }

        function init_blocks(scope,action,meta,cfg,extra) {

            scope.gridCfg = scope.gridCfg||{};
            scope.gridApi = scope.gridApi||{};
            scope.gridSel = scope.gridSel||{};
            angular.forEach(cfg.block,function(block,index){

                var block_cfg = $rootScope.blocks[block];
                
                if(cfg.view == 'blocks'){
                    scope.data[block] = scope.data[block] || [];
                    
                    if(!scope.data[block].length && block_cfg.init&&(!cfg.ro||!cfg.ro[index])){
                        var row = {};
                        angular.forEach(block_cfg.init,function(v,k){
                            init_data(v,k,row);
                        });
                        scope.data[block].push(row);
                    }
                }
                var init_state = !!(extra && extra.state);
                var col_def = FieldSrvc.get_mod_col(block_cfg,block,(cfg.ro && cfg.ro[index]));
                scope.gridCfg[block] = {
                    columnDefs:col_def,
                    showColumnFooter: has_foot(block_cfg.list),
                    data:(cfg.view == 'blocks'?scope.data[block]:scope.data),
                    enableCellEditOnFocus:true,
                    enableColumnMenus: false,
                    enableSorting: false,
                    enableGridMenu: init_state || !!block_cfg.gridMenu,
                    enableColumnMoving:!block_cfg.colUnmovable,
                    enableGrouping:!!block_cfg.grouping,
                    enableRowHeaderSelection:!!block_cfg.single || !!block_cfg.multi,
                    multiSelect: block_cfg.multi,
                    enableHorizontalScrollbar: $rootScope.gridScroll,
                    enableVerticalScrollbar: $rootScope.gridScroll,
                    onRegisterApi : function(gridApi){
                        if(init_state){
                            init_grid_state(gridApi,block,col_def);
                        }
                        init_block_grid(gridApi,scope,block,block_cfg);
                    }
                };
            });

            return 'Blocks.html';
        }

        //-----------------------------mod---------------------------
        function close_tab(mod) {

            clear_view(mod);

            var next = null;
            for (var m in tabs) {
                if(m == mod){
                    break;
                }
                next = m;
            }
            delete tabs[mod];
            if(!next){
                for (var m in tabs) {
                    next = m;
                    break;
                }
            }

            if(next){
                switch_tab(next);
            }
        }
        
        function switch_tab(mod) {

            if($rootScope.cur_mod == mod){
                return;
            }

            hide_view();
            $rootScope.stack_scope = mods[mod].stack_scope;
            $rootScope.stack_header = mods[mod].stack_header;
            $rootScope.stack_content = mods[mod].stack_content;
            show_view();

            $rootScope.cur_mod = mod;
        }

        

        function open_home(){
            open_mod('HOME',{text:I18nSrvc.get('HOME'),view:'views/home.html',read:{url:'/PublicApi/read_home'}});
        }

        function open_mod(mod,cfg){

            if(tabs[mod]){
                switch_tab(mod);
                return;
            }

            if(!cfg){
                cfg = $rootScope.mods[mod];
                for (var a in cfg.action) {
                    if(cfg.action[a].is_pub_mod_auth && !_.contains($rootScope.pub_mod_auth, a)){
                        delete cfg.action[a];
                    }
                }
            }

            //托管mod
            if(cfg.mandatory){
                Srvcs[mod] && Srvcs[mod](null,cfg);
                return;
            }

            //特殊模板mod
            if(cfg.view){
                if(cfg.read){
                    AjaxSrvc.get(cfg.read.url,{mod:mod}).then(function(data){
                        init_mod_view(mod,cfg,data);
                    });
                }else{
                    init_mod_view(mod,cfg,{});
                }
                return;
            }

            //常规mod
            var param = {mod:mod,start:0,limit:100};
            var mod_cfg = $rootScope.mods[mod];
            angular.forEach(mod_cfg.s_regular,function(_cfg,key) {
                if(_cfg.init){
                    switch(_cfg.init){
                        case 'Today':
                            param[key] = moment().format('YYYY-MM-DD');
                            break;
                        default:
                            param[key]= _cfg.init;
                            break;
                    }
                }
            });
            AjaxSrvc.get(cfg.read.url, param, 'all').then(function(response){
                init_mod_view(mod,cfg,response.data,response.total);
            });

        }

        function init_mod_view(mod,cfg,data,total){

            var scope = $rootScope.$new();
            scope.vm = {};
            scope.cfg = cfg;
            scope.data = data;
            scope.search = {mod:mod};
            scope.title = cfg.text;

            var tpl = 'Mod.html';
            if($rootScope.mods[mod]&&!_.isEmpty($rootScope.mods[mod].s_regular)){
                scope.vm.show_regular = true;
            }
            if(cfg.view){
                //v[cfg.view]含md5摘要
                tpl = v[cfg.view] || cfg.view;
            }else{
                init_mod_data(scope,mod,cfg,data,total);
            }

            Srvcs[mod] && Srvcs[mod](scope);

            var header =  '<div><ng-include src="\'Header.html\'"></ng-include></div>';
            var content = '<div><ng-include src="\''+tpl+'\'"></ng-include></div>';
          
            var header_dom = $compile(header)(scope);
            var content_dom = $compile(content)(scope);


            hide_view();

            mods[mod] = mods[mod] || {
                stack_scope : [],
                stack_header : [],
                stack_content : []
            };
            
            $rootScope.stack_scope = mods[mod].stack_scope;
            $rootScope.stack_header = mods[mod].stack_header;
            $rootScope.stack_content = mods[mod].stack_content;

            $rootScope.cur_mod = mod;
            tabs[mod] = cfg.text;

            // clear_view();
            

            $('#header').append(header_dom);
            $('#content').append(content_dom);
            $rootScope.stack_scope.push(scope);
            $rootScope.stack_header.push(header_dom);
            $rootScope.stack_content.push(content_dom);

        }

        function init_mod_data(scope,mod,cfg,data,total) {
            if(!cfg.list){
                var mod_cfg = $rootScope.mods[mod];
                angular.forEach(['s_regular','s_text','list'],function(item){
                    cfg[item] = mod_cfg[item];
                });
            }
            scope.search.start=0;
            scope.search.limit=100;
            angular.forEach(cfg.s_regular,function(_cfg,key) {
                if(_cfg.init){
                    switch(_cfg.init){
                        case 'Today':
                            scope.search[key] = moment().format('YYYY-MM-DD');
                            break;
                        default:
                            scope.search[key]= _cfg.init;
                            break;
                    }
                }
            });
            var col_def = FieldSrvc.get_mod_col(cfg);
            scope.gridOptions = {
                columnDefs:col_def,
                data:scope.data,
                enableGridMenu: true,
                enableRowHeaderSelection:false,
                enableHorizontalScrollbar: $rootScope.gridScroll,
                enableVerticalScrollbar: $rootScope.gridScroll,
                paginationPageSizes: [50, 100, 200],
                paginationPageSize: 100,
                useExternalPagination: true,
                paginationTemplate: 'Pagination.html',
                totalItems: total,
                rowHeight: cfg.rowHeight,
                onRegisterApi: function(gridApi) {

                    init_grid_state(gridApi,mod,col_def);

                    init_mod_grid(gridApi,scope);
                }
            };
            if($rootScope.bbarInfo && $rootScope.bbarInfo[mod]){
                 scope.gridOptions.bbarInfo = $rootScope.bbarInfo[mod](scope.data);
            }
        }

        //-----------------------------辅助函数---------------------------

        function has_foot(list){
            for (var i in list) {
                if(list[i].foot){
                    return true;
                }
            }
            return false;
        }

        function perfectScroll(){
            if(!$rootScope.gridScroll){
                $timeout(function(){
                    $('.ui-grid-viewport,.mod_filter').each(function () {
                        this.ps = this.ps || new PerfectScrollbar(this);
                    });
                });
            }  
            $timeout(function() {
                $('.ui-grid-focuser').remove();
            })
        }

        function get_req_data(cfg,data){
            if(!cfg){
                return data;
            }
            var rst = {};
            if(angular.isString(cfg)){

                rst = data[cfg];

            }else{

                angular.forEach(cfg,function(item,k){
                    if(item.indexOf('.') > 0){
   
                        var fd = item.split(' ');
                        var flt = item.split('|');

                        if(fd.length>1){
                            fd[fd.length-1] = fd[fd.length-1].split('|')[0];
                        }else{
                            fd = [flt[0]];
                        }
                        if(flt.length>1){
                            flt = flt[1];
                        }else{
                            flt = undefined;
                        }
                        var blk = fd[0].split('.')[0];
                        fd[0] = fd[0].split('.')[1];

                        if(fd.length>1){
                            var pk = [];
                            angular.forEach(data[blk],function(_item){
                                var d = {};
                                angular.forEach(fd,function(f){
                                    d[f] = _item[f];
                                });
                                pk.push(d);
                            });
                        }else{
                            var pk = _.pluck(data[blk],fd[0]);
                        }

                        if(flt){
                            switch(flt){
                                case 'first':
                                    rst[k] = data[blk][0][fd[0]];
                                    break;
                                default:
                                    angular.forEach(data[blk],function(_item){
                                        if(_item[flt]){
                                            rst[k] = _item[fd[0]];
                                        }
                                    });
                                    break;
                            }
                        }else{
                            if(angular.isNumber(k)){
                                rst[blk] = pk;
                            }else{
                                rst[k] = pk;
                            }
                        }
                    }else{
                        if(angular.isNumber(k)){
                            rst[item] = data[item];
                        }else{
                            rst[k] = data[item];
                        }
                    }
                });

            }
            return rst;
        }

        function init_data(v,k,row){
            switch(v){
                case 'Self':
                    row[k] = $rootScope.appUser.employee_id;
                    break;
                case 'SelfName':
                    row[k] = $rootScope.appUser.employee_name;
                    break;
                case 'SelfDepartment':
                    row[k] = $rootScope.appUser.department_id;
                    break;
                case 'SelfDepartmentName':
                    row[k] = $rootScope.appUser.department_name;
                    break;
                case 'SelfCompany':
                    row[k] = $rootScope.appUser.company_id;
                    break;
                case 'SelfCompanyName':
                    row[k] = $rootScope.appUser.company_name;
                    break;
                case 'SelfDepartmentCode':
                    row[k] = $rootScope.appUser.department_code;
                    break;
                case 'Today':
                    row[k] = moment().format('YYYY-MM-DD');
                    break;
                case 'Stamp':
                    row[k] = moment().format('YYYY-MM-DD HH:mm:ss');
                    break;
                default:
                    row[k] = angular.copy(v);
                    break;
            }
        }

        function init_mod_grid(gridApi,scope) {
            perfectScroll();
            gridApi.selection.on.rowSelectionChangedBatch(null,function(row){
                scope.selected = gridApi.selection.getSelectedRows();
            });  
            gridApi.selection.on.rowSelectionChanged(null,function(row){
                scope.selected = gridApi.selection.getSelectedRows();
            });
            gridApi.pagination.on.paginationChanged(null, function (newPage, pageSize) {
                scope.search.limit = pageSize;
                scope.search.start = (newPage-1)*pageSize;
                scope.load();
            });
        }

        function init_block_grid(gridApi,scope,block,block_cfg) {
            perfectScroll();
            gridApi.edit.on.afterCellEdit(null,function(rowEntity, colDef, newValue, oldValue){
                if(newValue != oldValue && colDef.change){
                    scope[colDef.change](rowEntity, colDef);
                }
            });
            
            gridApi.selection.on.rowSelectionChangedBatch(null,function(row){
                scope.gridSel[block] = gridApi.selection.getSelectedRows();
            });  
            gridApi.selection.on.rowSelectionChanged(null,function(row){
                scope.gridSel[block] = gridApi.selection.getSelectedRows();
            });

            scope.gridApi[block] = gridApi;
        }

        function init_grid_state(gridApi,mod,col_def) {
            function save_grid_state(){
                var state = gridApi.saveState.save().columns;
                
                _.each(gridApi.grid.columns,function(col) {
                    if(col.width=='*' && col.drawnWidth < 80){
                        col.width = 80;
                    }
                });

                var obj = _.findWhere(state,{name:I18nSrvc.get('ACTION')});
                if(obj){//操作列可能不存在
                    var col = _.findWhere(gridApi.grid.columns,{name:I18nSrvc.get('ACTION')});
                    if(obj.width=='*'){
                        col.width = col.widthHold || col.width;
                    }
                    state.splice(state.indexOf(obj),1);
                }
                localStorage[mod] = angular.toJson(state);
            }

            gridApi.colMovable && gridApi.colMovable.on.columnPositionChanged( null, save_grid_state);
            gridApi.colResizable.on.columnSizeChanged( null, save_grid_state);
            gridApi.core.on.columnVisibilityChanged( null, save_grid_state);
            gridApi.pinning.on.columnPinned( null, save_grid_state);

            if(localStorage[mod]){
                var saved = angular.fromJson(localStorage[mod]);
                var diff = _.difference(_.pluck(saved,'name'), _.pluck(col_def,'name'));
                if (diff.length > 0) {
                    delete localStorage[mod];
                } else {
                    $timeout(function(){
                        gridApi.saveState.restore(null, {columns: saved});
                    });
                }
            }
        }

    }
})();