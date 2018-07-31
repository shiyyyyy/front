(function() {
    'use strict';

    angular
        .module('app')
        .factory('OrgSrvc', OrgSrvc);

    OrgSrvc.$inject = ['AjaxSrvc', 'CommSrvc', 'I18nSrvc','$uibModal','$rootScope','$timeout','$compile','EnumSrvc','FieldSrvc'];
    function OrgSrvc(AjaxSrvc, CommSrvc, I18nSrvc,$uibModal,$rootScope,$timeout,$compile,EnumSrvc,FieldSrvc){

    	return {
            '新增权限': auth_edit,
            '修改权限': auth_edit,
            '复制权限': auth_edit,
            '分配权限': assign_auth,
    		'设置公司领导': leader_edit,
            '设置部门领导': leader_edit,
            '设置员工权限': set_auth,
            '设置供应商账号权限':set_ty_auth,
                        
            '审核头像':approval_photo,
            '供应商头像审批':approval_photo,
            '部门日志':log_see,
            '新增日程':schedule_edit,
            '修改日程':schedule_edit,
            '查看日程':schedule_edit,
            '选定员工-分配权限':select_employee_done_assign_auth,
            '选定权限':select_auth_done,
    	};

        function approval_photo(scope) {
            scope.init = function(){
                scope.data.approval = '1';
            }          
            scope.submit = function(){
                var data = scope.data;
                var post = {id:data.id};
                if(data.approval){
                    post.flow_id = data.flow_id;
                    post.opinion = data.approval;
                    AjaxSrvc.submit(scope.cfg.submit.url,post).then(function(data){
                        CommSrvc.info(data.message).result.then(function(){
                            $rootScope.pre_scope().load();
                            $rootScope.close_view();
                        });
                    });                 
               }else{
                    CommSrvc.error(I18nSrvc.get('PLEASE_CHOOSE'));
                    return;
               }
            }           
        }

        function set_auth(scope){
            var _data = scope.data;
            scope.data = {
                type : 'Auth',
                id : _data.id,
                selected : _data.auth_id,
            };
        }

        function set_ty_auth(scope){
            var _data = scope.data;
            scope.data = {
                type : 'TyAuth',
                id : _data.id,
                selected : _data.auth_id,
            };
        }

        function assign_auth(scope){
            scope.row = scope.data;
            scope.data = {
                single_type : 'Auth',
                single_text:I18nSrvc.get('AUTH'),
                multi_type : 'FullEmployee',
                multi_text:I18nSrvc.get('EMPLOYEE'),
            };
        }

        function leader_edit(scope){
            var _data = scope.data;
            var data = {
                type : 'FullEmployee',
                //cascade:'id',
                id : _data.id,
                selected : angular.isString(_data.leader_ids)?angular.fromJson(_data.leader_ids):_data.leader_ids,
                //cascade_type : 'EmployeeCompany',
            };

            // if(scope.action == '设置部门领导'){
            //     data.cascade = 'company_id';
            //     data.company_id = data.company_id;
            // }
            scope.row = _data;
            scope.data = data;
        }

        function auth_edit(scope){
            scope.edit_pem_filter = edit_pem_filter;
            scope.toggle_mod_box = toggle_mod_box;
            scope.toggle_action_box = toggle_action_box;
        }

        function toggle_mod_box(v,arr,actions){
          var idx = arr.indexOf(v);
          if (idx > -1) {
            arr.splice(idx, 1);
            for (var k in actions) {
                var i = arr.indexOf(k);
                i > -1 && arr.splice(i,1);
            }
          }else {
            arr.push(v);
            for (var k in actions) {
                var i = arr.indexOf(k);
                i == -1 && arr.push(k);
            }
          }
        }

        function toggle_action_box(v,arr,mod){
          var idx = arr.indexOf(v);
          if (idx > -1) {
            arr.splice(idx, 1);
          }else {
            arr.push(v);
            var i = arr.indexOf(mod);
            i == -1 && arr.push(mod);
          }
        }

        function edit_doc_filter(info) {
            var scope = this;
            var cfg = {text:I18nSrvc.get('VISIABLE_DATA')};
            var filter = scope.data.auth.filters;
            var mod = info.mod;
            var f = filter[mod] && filter[mod][info.field];

            var Doc = $rootScope.get_enum({type:'Doc'});
            var data = [];
            for(var key in Doc){
                data.push({id:key, name:Doc[key]});
            }

            cfg.data = data;
            cfg.ids = f || _.keys(Doc);
            cfg.submit = submit;

           var win = $uibModal.open({
              templateUrl: 'CommonCheckbox.html',
              controller : 'ModalInstanceCtl',
              backdrop: false,
              resolve:{cfg:cfg}
            });

            function submit(){
                if(!cfg.ids.length){
                    CommSrvc.info('请选择类型');
                    return;
                }
                if(cfg.ids.length == _.keys(Doc).length){
                    if(f){
                        delete filter[mod][info.field];
                    }
                }else if(cfg.ids.length){
                    filter[mod] = filter[mod] || {};
                    filter[mod][info.field] = cfg.ids;
                }

                win.close();
                // $rootScope.cur_scope().price_types = ids;
                // redraw(ids,'出团详情');
            };
        }

    	function edit_pem_filter(info){
            if(info.type == 'Doc'){
                edit_doc_filter.call(this,info);
                return;
            }
            var scope = this;
            var cfg = {text:I18nSrvc.get('VISIABLE_DATA')};
            var filter = scope.data.auth.filters;
            var mod = info.mod;
            var f = filter[mod] && filter[mod][info.field];
            var s_regular = $rootScope.mods[mod].s_regular;

            cfg.pem = f ? (f[0]==-1 ? 'self' : 'spec') : 'unlmt';
            cfg.spec = angular.copy((cfg.pem == 'spec' ? f : []));
            cfg.submit = submit;
            cfg.group_by_cascade = group_by_cascade;
            cfg.enum_cfg = {type:info.type};

            cfg.spec_ok = true;
            if(info.type != 'Company'){
                var pre_i = get_index(mod,info.field);
                var pre_field = get_field(mod,pre_i-1);
                var pre_f = filter[mod] && filter[mod][pre_field];
                var pre_pem = pre_f ? (pre_f[0]==-1 ? 'self' : 'spec') : 'unlmt';
                cfg.spec_ok = (pre_pem == 'spec');
                if(cfg.spec_ok){
                    cfg.enum_cfg.cascade = pre_field;
                    cfg.enum_row = filter[mod];
                }
            }
            
  
            var win = $uibModal.open({
              templateUrl: 'pem_edit.html',
              controller : 'ModalInstanceCtl',
              backdrop: false,
              resolve:{cfg:cfg}
            });

            function group_by_cascade(cascade_type){
                var pre_field = get_field(mod,get_index(mod,info.field)-1);
                var pre_f = filter[mod]&&filter[mod][pre_field];
                var group = [];
                angular.forEach(EnumSrvc[cascade_type],function(v,k){
                    group.push({id:k,p_id:v});
                });
                if(pre_f){
                    group = _.filter(group,function(i){
                        return _.contains(pre_f,i.p_id);
                    });
                }
                group = _.groupBy(group,function(i){
                    return i.p_id;
                });
                angular.forEach(group,function(cascade_group){
                    angular.forEach(cascade_group,function(item){
                        item.name = EnumSrvc[cfg.enum_cfg.type][item.id];
                    })
                });
                return group;
            }

			function submit(){
            	switch(this.pem){
            		case 'unlmt':
            			if(!filter[mod]){
                            break;
            			}
                        delete filter[mod][info.field];
                        switch(info.type){
                            case 'Company':
                                var i = get_index(mod,info.field);
                                delete filter[mod][get_field(mod,i+1)];
                                delete filter[mod][get_field(mod,i+2)];
                                break;
                            case 'Department':
                                var i = get_index(mod,info.field);
                                delete filter[mod][get_field(mod,i+1)];
                                break;
                            case 'Employee':
                                break; 
                        }
                        if(_.isEmpty(filter[mod])){
                            delete filter[mod];
                        }
            			break;
        			case 'spec':
    					if(_.isEmpty(this.spec)){
    						CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
    						return;
    					}
    					filter[mod] = filter[mod] || {};
    					filter[mod][info.field] = this.spec;
                        switch(info.type){
                            case 'Company':
                                var i = get_index(mod,info.field);
                                delete filter[mod][get_field(mod,i+1)];
                                delete filter[mod][get_field(mod,i+2)];
                                break;
                            case 'Department':
                                var i = get_index(mod,info.field);
                                delete filter[mod][get_field(mod,i+1)];
                                break;
                            case 'Employee':
                                break; 
                        }
        				break;
    				case 'self':
    					filter[mod] = filter[mod] || {};
    					filter[mod][info.field] = [-1];
                        switch(info.type){
                            case 'Company':
                                var i = get_index(mod,info.field);
                                delete filter[mod][get_field(mod,i+1)];
                                delete filter[mod][get_field(mod,i+2)];
                                break;
                            case 'Department':
                                var i = get_index(mod,info.field);
                                filter[mod][get_field(mod,i-1)] = [-1];
                                delete filter[mod][get_field(mod,i+1)];
                                break;
                            case 'Employee':
                                var i = get_index(mod,info.field);
                                var fd = info.field;
                                while(s_regular[fd].cascade){
                                    fd = s_regular[fd].cascade;
                                    filter[mod][fd] = [-1];
                                }
                                break; 
                        }
    					break;

            	}
            	win.close();
            }

            function get_field(mod,i){
                var s_regular = $rootScope.mods[mod].s_regular;
                var cnt = 0;
                for (var field in s_regular) {
                    if(cnt == i){
                        return field;
                    }
                    cnt++;
                }
            }
            function get_index(mod,fd){
                var s_regular = $rootScope.mods[mod].s_regular;
                var cnt = 0;
                for (var field in s_regular) {
                    if(field == fd){
                        return cnt;
                    }
                    cnt++;
                }
            }
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
        function schedule_edit(scope){
            scope.init = function(){
                scope.data['待办日期'] = scope.data['待办日期']||[{}];
                scope.gridCfg = {};
                var cfg = scope.cfg;
                angular.forEach(cfg.block,function(block,index){
                    scope.data[block] = scope.data[block]||[];
                    scope.gridCfg[block] = {
                        columnDefs:FieldSrvc.get_mod_col($rootScope.blocks[block],block,(cfg.ro && cfg.ro[index])),
                        data:scope.data[block],
                        enableCellEditOnFocus:true,
                        enableColumnMenus: false,
                        enableSorting: false,
                        enableHorizontalScrollbar: $rootScope.gridScroll,
                        enableVerticalScrollbar: $rootScope.gridScroll,
                    };
                });
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
            scope.submit = function(){
                var data = scope.data;
                var re_field = scope.submit_check();
                if(!_.isEmpty(re_field)){
                    CommSrvc.error(I18nSrvc.get('MISS')+re_field);
                    return;
                }
                var date = scope.data['待办日期'][0]['date'];
                var time = scope.data['待办日期'][0]['time'];
                var timer_end_date = new Date(date+' '+time);
                var start = (new Date().getTime())/1000;
                var end_time = timer_end_date.getTime()/1000;
                if(isNaN(end_time)){
                    CommSrvc.error(I18nSrvc.get('SCHEDULE_TIMER_ERR'));
                    return;
                }
                if(end_time<=start){
                    CommSrvc.error(I18nSrvc.get('SCHEDULE_TIMER_BIGGER_THAN_NOW'));
                    return;
                }
                var notice_list = [];
                var notice_check = true;
                angular.forEach(scope.data['待办事件提醒'],function(notice,key){
                   var notice_time = new Date(notice.date+' '+notice.time).getTime()/1000;
                   if(notice_time>end_time){
                        notice_check = false;
                   }
                   notice_list.push(new Date(notice.date+' '+notice.time));
                });
                if(!notice_check){
                    CommSrvc.error(I18nSrvc.get('SCHEDULE_TIME_BIGGER_THAN_NOTICE_TIME'));
                    return;
                }
                var title = scope.data.title;
                var body = scope.data.body;
                if(_.isEmpty(title)){
                    CommSrvc.error(I18nSrvc.get('MISS_SCHEDULE_TITLE'));
                    return;
                }
                if(_.isEmpty(body)){
                    CommSrvc.error(I18nSrvc.get('MISS_SCHEDULE_INFO'));
                    return;
                }

                var id = scope.ref?scope.ref.id:0;
                AjaxSrvc.submit(scope.cfg.submit.url,
                                {id:id,timer_end_date:timer_end_date
                                ,notice_list:notice_list,title:title,body:body}).then(function(data){
                        CommSrvc.info(data.message).result.then(function(){
                            $rootScope.pre_scope().load();
                            $rootScope.close_view();
                    });
                 });              
            }
        }

        function select_employee_done_assign_auth(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            if(!(selected && selected.length)){
                CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                return;
            }
            var employee_ids = _.pluck(selected,'id');
            var multi_selected = $rootScope.pre_scope().data.multi_selected||[];
            multi_selected = _.union(multi_selected,employee_ids);
            $rootScope.pre_scope().data.multi_selected = multi_selected;
            $rootScope.close_view();
        }

        function select_auth_done(action,meta,cfg,store_id,data){
            var selected = $rootScope.cur_scope().selected;
            $rootScope.pre_scope().loadData($rootScope.cur_scope().assoc_store_id,selected);
            $rootScope.close_view();
        }
    }
})();