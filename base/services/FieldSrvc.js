(function() {
    'use strict';

    angular
    .module('app')
    .factory('FieldSrvc', FieldSrvc);

    FieldSrvc.$inject = ['I18nSrvc','appConst','EnumSrvc','$rootScope'];
    function FieldSrvc(I18nSrvc, appConst,EnumSrvc,$rootScope){

        var editable = {
            flow_editable: flow_editable,
            //invoice_title_editable:invoice_title_editable,
            group_way_editable:group_way_editable,
            into_amount_edit:into_amount_edit,
            fund_claim_edit:fund_claim_edit,
            invoice_business_edit:invoice_business_edit,
            doc_comment_editable:doc_comment_editable,
            insurance_product_editable:insurance_product_editable,
            order_comment_editable:order_comment_editable,
            doc_bank_editable:doc_bank_editable,
            pd_dist_editable:pd_dist_editable,
            e_invoice_editable:e_invoice_editable,
        };

    	var service = {
            get_col:get_col,
    		get_mod_col: get_mod_col
    	};
    	return service;

        function doc_bank_editable(scope){
            var cur_scope = $rootScope.cur_scope();
            var editable = true;
            if(cur_scope.data['退款调用资金收款']
                &&!_.isEmpty(cur_scope.data['退款调用资金收款'])){
                var ref = cur_scope.data['退款调用资金收款'][0];
                if(ref.fund_id&&ref.fund_id!=0){
                    editable = false;
                }
            }
            if(cur_scope.data['退款调用收款']
                &&!_.isEmpty(cur_scope.data['退款调用收款'])){
                var ref = cur_scope.data['退款调用收款'][0];
                if(ref.fund_id&&ref.fund_id!=0){
                    editable = false;
                }
            }
            return editable;
        }

        function flow_editable(scope){
            return scope.row.entity.editable;
        }

        function doc_comment_editable(scope){
            return scope.row.entity.editable;
        }

        function order_comment_editable(scope){
            return scope.row.entity.editable;
        }

        // function invoice_title_editable(scope){
        //         var blk = '';
        //         var editable = true;
        //         var cur_scope = $rootScope.cur_scope();
        //         if(cur_scope.data['开票调用明细']){
        //             blk = '开票调用明细';
        //         }
        //         if(cur_scope.data['借票调用明细']){
        //             blk = '借票调用明细';
        //         }

        //         angular.forEach(cur_scope.data[blk],function(item){
        //             if(!_.isEmpty(item.invoice_title)){
        //                 editable = false;
        //             }
        //         });
        //         return editable;
        // }

        //根据当前单据是否引用入账明细确定是否可编辑
        function into_amount_edit(scope){
            var editable = true;
            var cur_scope = $rootScope.cur_scope();
            if(cur_scope.data['入账详情']
                &&!_.isEmpty(cur_scope.data['入账详情'])){
                var fund = cur_scope.data['入账详情'][0];
                if(fund.fund_id&&fund.fund_id!=0){
                    editable = false;
                }
            }
            return editable;
        }

        function group_way_editable(scope){
            var editable = true;
            var cur_scope = $rootScope.cur_scope();
            if(cur_scope.action == '新增团队'
                ||cur_scope.action == '修改预算'){
                editable = false;
            }
            return editable;
        }

        function fund_claim_edit(scope){
            var editable = false;
            var cur_scope = $rootScope.cur_scope();
            if(cur_scope.action == '新增资金收款单'
                ||cur_scope.action == '修改资金收款单'){
                editable = true;
            }
            return editable;
        }

        function invoice_business_edit(scope){
            var editable = false;
            if(scope.row.entity.invoice_item_id){
                var item_id = scope.row.entity.invoice_item_id;
                editable = (EnumSrvc['InvoiceBusinessEditable'][item_id]==appConst.YES);
            }
            return editable;
        }

        function insurance_product_editable(scope){
            var editable = true;
            var cur_scope = $rootScope.cur_scope();
            if(cur_scope.data['保险详情']
                &&!_.isEmpty(cur_scope.data['保险详情'])){
                var agree = cur_scope.data['保险详情'][0];
                if(agree['agree']==3){
                    editable = false;
                }
            }
            return editable;
        }

        function pd_dist_editable(scope){
            var editable = false;
            var cur_scope = $rootScope.cur_scope();
            if(cur_scope.action == '新增分团设置'){
                editable = true;
            }
            return editable;
        }

    	function get_col(field,cfg,store_id,width,ro){
    		var col = {
                field:field,
                name:cfg.text,
                width:width,
                change:cfg.change,
                edit_path:cfg.edit_path,
                cascade:cfg.cascade,
                cascaded:cfg.cascaded,
            };
            if(cfg.headerCellClass){
                col.headerCellClass = cfg.headerCellClass;
            }

            if(cfg.cascade2){
                col.cascade2 = cfg.cascade2;
            }

            if(cfg.ro){
                col.enableCellEdit = false;
            }
            if(ro){
                col.enableCellEdit = false;
            }

            if(cfg.editable){
                col.cellEditableCondition = editable[cfg.editable];
            }

            if(cfg.foot){
                col.footerCellTemplate = '<div class="ui-grid-cell-contents">{{grid.appScope.'+cfg.foot+'}}</div>';
            }

            var tip='';
            if(cfg.tip){
                tip = 'uib-tooltip="'+cfg.tip.split('{{').join('{{row.entity.')+'" tooltip-append-to-body="true" ';
                // tip = cfg.tip.split('{{').join('{{row.entity.');
            }

            var bind = '',text='';
            if(cfg.type){
                col.type = cfg.type;
                switch(cfg.type){
                    case 'img':
                        text = '<img ng-src="{{\''+appConst.HOST+'/\'+COL_FIELD}}" class="img-responsive" '+
                            'style="max-height:'+cfg.maxHeight+'px"/>';
                        break;
                    case 'checkbox':
                            col.enableCellEdit = false;
                            var col_ro = (ro||cfg.ro)?true:false;
                            text = '<input type="checkbox" ng-model="MODEL_COL_FIELD" ng-change="grid.appScope.'+col.change+'(row.entity,col)" ng-true-value="1" ng-false-value="0" ng-disabled="'+col_ro+'"/>';
                        break;
                    case 'seq':
                        text = '<div class="ui-grid-cell-contents no-padder">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>';
                        break;
                    case 'transparent':
                        text = '<a class="small text-info" ng-if="COL_FIELD" href="{{\''+appConst.HOST+'/PublicApi/transparent?img=\'+COL_FIELD}}" target="_blank"><em>'+I18nSrvc.get('DOWNLOAD')+'</em></a>';
                        break;
                    case 'file':
                        if(col.enableCellEdit === false){
                            text = '<a class="small text-info" ng-if="COL_FIELD && !row.entity._deleted" href="{{\''+appConst.HOST+'/\'+COL_FIELD}}" target="_blank"><em>'+I18nSrvc.get('DOWNLOAD')+'</em></a>';
                        }else{
                            col.enableCellEdit = false;
                            text = '<input type="file" name="file" class="hidden" ui-file="'+cfg.upload+'" />' +
                                '<a class="small text-info" onclick="$(this).prev().click()"><em>'+I18nSrvc.get('UPLOAD')+'</em></a>&nbsp;'+
                                '<a class="small text-info" ng-if="COL_FIELD" href="{{\''+appConst.HOST+'/\'+COL_FIELD}}" target="_blank"><em>'+I18nSrvc.get('DOWNLOAD')+'</em></a>';
                        }
                        break;
                    case 'filelist':
                        if(col.enableCellEdit === false){
                            text = '<a class="small text-info" ng-if="COL_FIELD" ng-click="grid.appScope.trigger(\''+
                                    '下载文件'+"',col.colDef.action,"+(store_id?"'"+store_id+"'":'null')+',row.entity.'+field+')" ><em>'+
                                    I18nSrvc.get('DOWNLOAD')+'</em></a>';
                        }else{
                            col.enableCellEdit = false;
                            text = '<input type="file" name="file" class="hidden" ui-file-list="'+cfg.upload+'" />' +
                                '<a class="small text-info" onclick="$(this).prev().click()"><em>'+I18nSrvc.get('UPLOAD')+'</em></a>&nbsp;'+
                                '<a class="small text-info" ng-if="COL_FIELD" ng-click="grid.appScope.trigger(\''+
                                    '下载文件'+"',col.colDef.action,"+(store_id?"'"+store_id+"'":'null')+',row.entity.'+field+')" ><em>'+
                                    I18nSrvc.get('DOWNLOAD')+'</em></a>';
                        }
                        break;
                    case 'number':
                        col.editableCellTemplate = 'NumEdit.html';
                        text = '{{COL_FIELD}}';
                        break;
                    case 'date':
                        col.editableCellTemplate = 'DateEdit.html';
                        text = '{{COL_FIELD}}';
                        break;
                    case 'time':
                        col.editableCellTemplate = 'TimeEdit.html';
                        text = '{{COL_FIELD}}';
                        break;
                    case 'ArrayEdit':
                        col.editableCellTemplate = 'ArrayEdit.html';
                        text = '{{COL_FIELD}}';
                        break;
                    default:
                        col.editableCellTemplate = cfg.edit_tpl || 'PairEdit.html';
                        bind = 'ng-bind-html="COL_FIELD | colDisplay:col.colDef:row.entity" ';
                        if(EnumSrvc[cfg.type]){
                            for (var i in EnumSrvc[cfg.type]) {
                                if(EnumSrvc[cfg.type][i][0] != '<'){
                                    tip = tip || 'uib-tooltip="{{COL_FIELD | colDisplay:col.colDef:row.entity}}" tooltip-append-to-body="true" ';
                                }
                                break;
                            }   
                        }else{
                            tip = tip || 'uib-tooltip="{{COL_FIELD | colDisplay:col.colDef:row.entity}}" tooltip-append-to-body="true" ';
                        }
                        break;
                }
            }else{
                col.type = 'string';
                text = '{{COL_FIELD}}';
                tip = tip || 'uib-tooltip="{{COL_FIELD}}" tooltip-append-to-body="true" ';
            }
            var tpl;
            var ngClass = ['deleted:row.entity._deleted'];
            if(cfg.rq){
                if(cfg.type&&EnumSrvc[cfg.type]){
                    ngClass.push('invalid:!grid.appScope.get_enum(\''+cfg.type+"'"+')[row.entity.'+field+']');
                }else{
                    ngClass.push('invalid:!row.entity.'+field);
                }
            }
            if(cfg.highlight){
                ngClass.push('cellhighlight:row.entity.'+field+'_highlight');
            }
            ngClass = 'ng-class="{' + ngClass.join(',') + '}" ';

            if(cfg.trigger){
                tpl = '<div class="ui-grid-cell-contents" '+ngClass+tip+'>'+
                        '<a class="text-action" ng-click="!row.entity._deleted && !row.entity._ro && grid.appScope.trigger(\''+
                        cfg.trigger[0]+"',col.colDef.action,"+(store_id?"'"+store_id+"'":'null')+',row.entity)" '+
                        bind+'>'+text+'</a></div>';
                col.action = cfg.trigger[1] || {};
            }else if(cfg.click){

                tpl = '<div class="ui-grid-cell-contents" ng-click="!row.entity._deleted && !row.entity._ro && grid.appScope.trigger(\''+
                        cfg.click[0]+"',col.colDef.action,"+(store_id?"'"+store_id+"'":'null')+',row.entity)" '+ngClass+tip+bind+'>'
                        +text+'</div>';
                col.action = cfg.click[1] || {};
            }else{
                tpl = '<div class="ui-grid-cell-contents" '+ngClass+tip+bind+'>'+text+'</div>';                
            }
            col.cellTemplate = tpl;
            col.sortingAlgorithm = function(a, b, rowA, rowB, direction) {
                a = +(a) || a;
                b = +(b) || b;
                // console.log(a,b,a===b ? 0 :(a>b?1:-1));
                return a===b ? 0 :(a>b?1:-1);
            }
            return col;
    	}

        function get_action_col(action,store_id,action_col_short){
            var op = false;
            var win_width = $(window).width();

            var lang = localStorage.lang || 0;
            var len = {0:14,1:7}[lang];
            var sep = {0:10,1:5}[lang];
            var expand_btn = true;
            if(action_col_short==1||win_width<1000){
                expand_btn = false;
            }

            
            if(expand_btn){
                var tpl = '<div class="ui-grid-cell-contents">';
            }else{
                var tpl = '<div class="ui-grid-cell-contents">'+
                    '<div uib-dropdown dropdown-append-to-body="true">'+
                    '<a uib-dropdown-toggle>&nbsp;<i class="fa fa-pencil"></i>&nbsp;</a>'+
                    '<ul class="dropdown-menu dropdown-menu-left-fix" uib-dropdown-menu><li>';  
            }
            

            for (var i in action) {
                if(!(action[i].bind=='row')){
                    continue;
                }
                if(action[i].hide){
                    continue;
                }
                if(action[i].pem_in_mod){
                    var pem_cfg = action[i].pem_in_mod.split('.');
                    if(pem_cfg.length<2){
                        return false;
                    }
                    var pem_mod = pem_cfg[0];
                    var pem_action = pem_cfg[1];

                    var menu = _.find($rootScope.menu,function(item){
                        return !_.isUndefined(item[pem_mod]);
                    });
                    if (!menu){
                        continue;
                    }else{
                        if(!menu[pem_mod]['action'][pem_action]){
                            continue;
                        }
                    }
                }

                var if_show = [];
                for (var k in action[i].show) {
                    if_show.push(k +':'+ action[i].show[k]);
                }
                if_show = '{'+if_show.join(',')+'}';

                var ngIf = 'ng-if="grid.appScope.if_row_btn(row,'+
                        '\''+i+'\','+
                        (action[i].text.length*len+sep)+','+
                        if_show+')"';

                if(expand_btn){

                    tpl +=  '<span class="mx-1" '+ngIf+' >'+
                                '<a class="small text-info op-btn" '+
                                    'ng-click="grid.appScope.trigger(\''+i+"',col.colDef.actions['"+i+"'],"+
                                        (store_id?"'"+store_id+"'":'null')+',row.entity)">'+action[i].text+
                                '</a>'+
                            '</span>';
                }else{

                    tpl += '<a style="display:inline-block;"'+ngIf+
                        'ng-click="grid.appScope.trigger(\''+i+"',col.colDef.actions['"+i+"'],"+
                        (store_id?"'"+store_id+"'":'null')+',row.entity)">'+action[i].text+'</a>';    
                }   

                op = true;        
            }

            
            if(expand_btn){
                tpl += '{{::grid.appScope.resize_op_col(col,row)}}</div>';
            }else{
                tpl += '</li></ul></div></div>';
            }
            var col = {
                actions: action,
                name: I18nSrvc.get('ACTION'),
                cellTemplate: tpl,
                pinnedRight:true,
                enableCellEdit: false,
                enableColumnMenu: false,
            }
            if(!expand_btn){
                col.width = 80;
            }
            return op && col;
        }

        function get_mod_col(cfg,store_id,ro){
            var action = get_action_col(cfg.action,store_id,cfg.action_col_short);

            var width,win_width = $(window).width();
            var action_len = (action && action.width) || 0;
            if(_.keys(cfg.list).length*80 > win_width*0.85-action_len){
                width = 80;
            }

            var cols =[];
            var col_width = 0;
            for (var field in cfg.list) {
                if(cfg.list[field].ro === undefined && angular.isNumber(cfg.ro)){
                    cfg.list[field].ro=cfg.ro;
                }
                col_width = width;
                if(cfg.list[field].width){
                    col_width = cfg.list[field].width;
                }
                var col = get_col(field, cfg.list[field],store_id,col_width,ro);
                // if(ro == 1){
                //     col.enableCellEdit = false;
                // }
                cols.push(col);
            }
            if(ro!=1){
               action && cols.push(action); 
            }
            return cols;
        }

        function e_invoice_editable(scope){
            var editable = false;
            if(scope.row.entity.invoice_type_id ==appConst.COMMON_INVOICE ){
                editable = true;
            }
            return editable;
        }
    }
})();