(function() {
    'use strict';

    angular
    .module('app')
    .factory('SysSrvc', SysSrvc);

    SysSrvc.$inject = ['AjaxSrvc', 'CommSrvc', 'I18nSrvc', 'FieldSrvc','$uibModal','$location','$rootScope','appConst','EnumSrvc'];
    function SysSrvc(AjaxSrvc, CommSrvc, I18nSrvc, FieldSrvc,$uibModal,$location,$rootScope,appConst,EnumSrvc){

    	return {
            '参数设置': param_setting,  
            '修改非财务流程':  flow_edit,
            '修改财务流程':flow_edit,
            '新增非财务分支': flow_branch,
            '修改非财务分支':flow_branch,
            '新增财务分支': flow_branch,
            '修改财务分支':flow_branch,
            '指定专人': specify,
            '指定不参与人':excluded,
            '选定员工-审批流程':selected_employee_specify,
            '选定权限-审批流程':selected_auth_specify,
            '下载文件转换':download_attach_transfer,
            '弃用文件':deprecated_files,
            '启用文件':enable_files,
            //'下载文件':download_attach,
            '修改密码':set_password,
            '编辑分支条件':add_branch_cond,
            '设置分支条件':set_branch_cond,
            '设置类型分支条件':set_type_branch_cond,
            '设置金额分支条件':set_amount_branch_cond,
            '设定分支条件':set_cond_done,
    	};
        function set_password(scope){
            scope.type = 'text';
        }  

        function download_attach_transfer(data) {
            var _data =[];
            try{
                _data = angular.fromJson(data);
                _data = _.sortBy(_data,'date');
            }catch(err){
                _data.push({save_path:data});
            }
            return _data;
        }

        function param_setting(scope){
            scope.vm.items = ['系统参数','保险设置','财务设置','发票设置'
                              ,'合同设置','余额设置','订单设置','排除控团人'];
            if($location.search()['sys']){
                scope.vm.items.unshift('系统配置');
            }
            scope.data['系统参数']=scope.data['系统参数']||{};
            scope.data['保险设置']=scope.data['保险设置']||{'dadi':{},'cpic':{},'anman':{}};
            scope.data['订单设置']=scope.data['订单设置']||{};
            scope.data['合同设置']=scope.data['合同设置']||{};
            scope.Days = [];
            for(var i=1;i<=20;i++)
                scope.Days.push(i);
            var gp_num = [
                ['公司代码',1,'-','GS'],
                ['部门代码',1,'-','BM'],
                // ['出发地',1,'-','BJ'],
                // ['产品大类',1,'-','TH'],
                // ['产品小类',1,'-','TYD'],
                ['年',1,'','2018'],
                ['月',1,'','01'],
                ['日',1,'-','01'],
                ['序列号',1,'','P01']
            ];
            if(scope.data['团号设置']){
                var valid = _.map(gp_num,function(i){return i[0];});
                var new_gp_num = [];
                _.each(scope.data['团号设置'],function(i){
                    if(_.contains(valid,i[0])){
                        new_gp_num.push(i);
                    }
                });
                scope.data['团号设置'] = new_gp_num;
            }else{
                scope.data['团号设置'] = gp_num;
            }


            var block = '团号设置';
            var block_cfg = $rootScope.blocks[block];

            scope.groupNumGrid = {
                columnDefs:FieldSrvc.get_mod_col(block_cfg,block),
                data:scope.data['团号设置'],
                enableCellEditOnFocus:true,
                enableColumnMenus: false,
                enableSorting: false,
                //enableGridMenu: false,
                enableRowHeaderSelection: !!block_cfg.multi,
                multiSelect: block_cfg.multi,
                enableHorizontalScrollbar: $rootScope.gridScroll,
                enableVerticalScrollbar: $rootScope.gridScroll,
            };

            scope.vm.selected = '系统参数';
            scope.submit = submit;
            scope.insure_plans = insure_plans;

            function submit(){
                var s = scope.vm.selected;
                var data = {key:s, value: scope.data[s]};
                if(s == '团号设置'){
                    if(data.value[data.value.length-1][0] != '序列号'){
                        CommSrvc.error('序列号必须放在最后');
                        return;
                    }
                }
                if(s == '合同设置'){
                    var check = true;
                    angular.forEach(['hgy_tokenurl','hgy_signurl'
                                ,'hgy_getsignproofurl','hgy_signbyproofurl'
                                ,'hgy_entname','hgy_bussLicence'
                                ,'hgy_grantorname','hgy_grantorhandphone'
                                ,'hgy_app_id','hgy_app_secrect'
                                ,'kk_department_id','kk_employee_id'],function(field){
                        if(_.isUndefined(data.value[field])||_.isEmpty(data.value[field])){
                            check = false;
                        }
                    });
                    if(!check){
                        CommSrvc.error('电子合同配置错误');
                        return;
                    }
                    if(_.isUndefined(data.value['kk_amount'])||data.value['kk_amount']<=0){
                        CommSrvc.error('电子合同扣款金额必须大于零');
                        return;
                    }
                }
                AjaxSrvc.submit(scope.cfg.submit.url,data).then(function(data){CommSrvc.info(data.message);});
            }

            function insure_plans(company){
                AjaxSrvc.submit('/op/Insurance/insurance_plans',{company:company}).then(function(data){CommSrvc.info(data.message);});
            }
        }

        function flow_edit(scope){
            scope.action_map = {
                '解除模块绑定':unbind_mod,
            };

            var schema_name = scope.ref.name;
            var titles = scope.title.split('-');
            scope.title = titles[0]+'-'+schema_name+ '-' +(titles[1]||'');
        }

        function flow_branch(scope) {
            scope.data['分支定义编辑'][0].branch_belong = scope.data['分支所属'];
            scope.action_map = {
                '解除模块绑定':unbind_mod,
            };
            scope.init = function(){
                var schema = scope.data['分支定义编辑'][0];
                var enum_cond = scope.data['类型对应枚举'];
                schema['branch_cond'] = '';
                if(!_.isEmpty(schema['branch_cond_config'])){
                    angular.forEach(schema['branch_cond_config'],function(item){
                        if(!_.isUndefined(item['type_equal'])){
                            item['branch_cond'] = item['branch_var']+EnumSrvc[enum_cond[item['branch_var']]][item['equal_val']];
                            schema['branch_cond'] += item['branch_cond']+';';
                        }else if(!_.isUndefined(item['greater'])){
                            item['branch_cond'] = item['branch_var']+ EnumSrvc['Greater'][item['greater']]
                                                    +item['greater_val'];
                            schema['branch_cond'] += item['branch_var']+ EnumSrvc['Greater'][item['greater']]
                                                    +item['greater_val'];
                            if(!_.isUndefined(item['less'])){
                                item['branch_cond'] += ',并且'+ EnumSrvc['Less'][item['less']]+item['less_val']
                                                        ;
                                schema['branch_cond'] += ',并且'+ EnumSrvc['Less'][item['less']]+item['less_val']
                                                        +';';
                            }
                        }else if(!_.isUndefined(item['less'])){
                            item['branch_cond'] = item['branch_var']+ EnumSrvc['Less'][item['less']] 
                                                + item['less_val'];
                            schema['branch_cond'] += item['branch_var'] + EnumSrvc['Less'][item['less']]+item['less_val']+';';
                        }
                    });
                }
            }
            scope.change_branch_company = change_branch_company;
            function change_branch_company(row,col){
                row['branch_department_id'] = 0;
            }
        }

        function specify(scope){
            var _data = scope.data;
            var data = {type:'FullEmployee',selected:_data.specify};
            scope.data = data;
            scope.submit = function(){
                scope.ref.specify = data.selected;
                $rootScope.close_view();
            }
        }
        function excluded(scope){
            var _data = scope.data;
            var data = {type:'FullEmployee',selected:_data.excluded};
            scope.data = data;
            scope.submit = function(){
                scope.ref.excluded = data.selected;
                $rootScope.close_view();
            } 
        }
        function selected_employee_specify(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();

            if(!(scope.selected && scope.selected.length)){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var selected_ids = _.pluck(scope.selected,'id');
            scope.ref.specify = selected_ids;
            $rootScope.close_view();
        }

        function selected_auth_specify(action,meta,cfg,store_id,data){
            var scope = $rootScope.cur_scope();

            if(!(scope.selected && scope.selected.length)){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var selected_ids = _.pluck(scope.selected,'id');
            scope.ref.specify_auth = selected_ids;
            $rootScope.close_view();
        }
        function unbind_mod(store_id,data,meta){
            //data.mod_check = '';
            delete data.mod_check;
        }

        function add_branch_cond(scope){
            var cur_scope = $rootScope.cur_scope();
            scope.data['类型对应枚举'] = cur_scope.data['类型对应枚举'];
            scope.data['类型触发条件'] = cur_scope.data['类型触发条件'];
            scope.data['触发条件'] = cur_scope.data['触发条件'];
            scope.loadData('流程触发条件',cur_scope.data['分支定义编辑'][0]['branch_cond_config']||[]);
        }
        function set_branch_cond(scope){
            scope.data = {
                type:'BranchCond',
                cond_type:appConst.TYPE_COND,
            };
            scope.submit = function(){
                var data =scope.data;
                var branch_cond = $rootScope.pre_scope().data['流程触发条件'];
                switch(data.cond_type){
                    case appConst.TYPE_COND:
                        $rootScope.close_view();
                        $rootScope.trigger('设置类型分支条件',null,null,{});
                        break;
                    case appConst.AMOUNT_COND:
                        $rootScope.close_view();
                        $rootScope.trigger('设置金额分支条件',null,null,{});
                        break;
                    default :
                        CommSrvc.error(I18nSrvc.get('INVALID_COND'));
                        return;
                }
            }
        }

        function set_type_branch_cond(scope){
            var cur_scope = $rootScope.cur_scope();
            var enum_cond = cur_scope.data['类型对应枚举'];
            scope.init = function(){
                scope.data['类型触发条件'] = cur_scope.data['类型触发条件'];
                scope.data['触发类型'] = EnumSrvc[enum_cond[scope.data['branch_var']]]||{};
            }
            scope.branch_var_change = branch_var_change;
            function branch_var_change(){
                scope.data['触发类型'] = EnumSrvc[enum_cond[scope.data['branch_var']]];
            }
            scope.submit = function(){
                var pre_scope = $rootScope.pre_scope();
                var data = {
                    'branch_var':scope.data['branch_var'],
                    'type_equal':'T=',
                    'equal_val':scope.data['type_val'],
                    'branch_cond':scope.data['branch_var']+scope.data['触发类型'][scope.data['type_val']]
                };
                pre_scope.loadData('流程触发条件',[data],'new');

                $rootScope.close_view();
            }

        }
        function set_amount_branch_cond(scope){
            var cur_scope = $rootScope.cur_scope();
            scope.init =function(){
                scope.data['触发条件'] = cur_scope.data['触发条件'];
            }
            scope.submit = function(){
                var pre_scope = $rootScope.pre_scope();
                if(_.isUndefined(scope.data['branch_var'])){
                    CommSrvc.error(I18nSrvc.get('MISS_CON'));
                    return;
                }
                if(!_.isUndefined(scope.data['greater'])&&_.isUndefined(scope.data['greater_val'])){
                    CommSrvc.error(I18nSrvc.get('MISS_CON'));
                    return;
                }
                if(!_.isUndefined(scope.data['less'])&&_.isUndefined(scope.data['less_val'])){
                    CommSrvc.error(I18nSrvc.get('MISS_CON'));
                    return;
                }
                var data = scope.data;
                data['branch_cond'] = '';
                if(!_.isUndefined(scope.data['greater'])&&!_.isUndefined(scope.data['greater_val'])){
                     data['branch_cond'] += scope.data['branch_var']+ EnumSrvc['Greater'][scope.data['greater']]
                                            +scope.data['greater_val'];
                    if(!_.isUndefined(scope.data['less'])&&!_.isUndefined(scope.data['less_val'])){
                        data['branch_cond'] += ',并且'+ EnumSrvc['Less'][scope.data['less']]+scope.data['less_val'];
                    }
                }else{
                    if(!_.isUndefined(scope.data['less'])&&!_.isUndefined(scope.data['less_val'])){
                        data['branch_cond'] +=  EnumSrvc['Less'][scope.data['less']]+scope.data['less_val'];
                        
                    }
                }
                pre_scope.loadData('流程触发条件',[data],'new');
                $rootScope.close_view();
            }
        }

        function set_cond_done(action,meta,cfg,store_id,data){
            var pre_scope = $rootScope.pre_scope();
            var cur_scope = $rootScope.cur_scope();
            if(cur_scope.data['流程触发条件'].length 
                != _.uniq(_.pluck(cur_scope.data['流程触发条件'],'branch_var')).length){
                CommSrvc.error(I18nSrvc.get('ONE_BRANCH_TYPE_ONE_COND'));
                return;
            }
            var branch_cond = _.pluck(cur_scope.data['流程触发条件'],'branch_cond').join(';');
            pre_scope.data['分支定义编辑'][0]['branch_cond'] = branch_cond;
            pre_scope.data['分支定义编辑'][0]['branch_cond_config'] = cur_scope.data['流程触发条件'];
            $rootScope.close_view();
        }
        function deprecated_files(action,meta,cfg,stord_id,data){
            data._deleted = true;
        }
        function enable_files(action,meta,cfg,stord_id,data){
            delete data._deleted;
        }
    }
})();
