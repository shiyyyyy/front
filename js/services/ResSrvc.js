(function() {
    'use strict';

    angular
        .module('app')
        .factory('ResSrvc', ResSrvc);

    ResSrvc.$inject = ['CommSrvc', 'I18nSrvc','$rootScope','appConst','AjaxSrvc','EnumSrvc'];
    function ResSrvc(CommSrvc, I18nSrvc,$rootScope,appConst,AjaxSrvc,EnumSrvc){

        return {
            '新增领队':leader_add,
            '修改领队':leader_edit,
            '查看领队':leader_add,
            '领队请假':leader_leave,
            '新增领队请假':leave_edit,
            '修改领队请假':leave_edit,
        };
        function leader_add(scope){
            scope.calc_age = calc_age;
            scope.change_certificate_type = change_certificate_type;
            scope.on_certificate_num_change = on_certificate_num_change;
            scope.on_issue_place_change = on_issue_place_change;
            scope.on_valid_period_change = on_valid_period_change;
        
            init();
            function init(){
                angular.forEach(scope.data['领队信息'],function(item){
                    var now = new Date().getTime()/1000;
                    var birthday = new Date(item['birthday']).getTime()/1000;
                    item['age']  = parseInt(((now-birthday)>0?(now-birthday):0)/(3600*24*365));
                    var type = get_certificate_type(item);
                    var prefix = get_certificate_prefix(type);
                    item['certificate_type'] = type;
                    item['certificate_num'] = item[prefix+'_num']||'';
                    item['issue_place'] = item[prefix+'_issue_place']||'';
                    item['valid_period'] = item[prefix+'_valid_period']||'';
                });
            }
            function calc_age(rowEntity,colDef){
                var now = new Date().getTime()/1000;
                var birthday = new Date(rowEntity['birthday']).getTime()/1000;
                rowEntity['age']  = parseInt(((now-birthday)>0?(now-birthday):0)/(3600*24*365));
            }
            function change_certificate_type(rowEntity,colDef){
                var prefix = get_certificate_prefix(rowEntity['certificate_type']);
                rowEntity['certificate_num'] = rowEntity[prefix+'_num']||'';
                rowEntity['issue_place'] = rowEntity[prefix+'_issue_place']||'';
                rowEntity['valid_period'] = rowEntity[prefix+'_valid_period']||'';
            }
            function on_certificate_num_change(rowEntity,colDef){
                var prefix = get_certificate_prefix(rowEntity['certificate_type']);
                rowEntity[prefix+'_num'] =  rowEntity['certificate_num'];
                change_certificate_name(rowEntity);
            }
            function on_issue_place_change(rowEntity,colDef){
                var prefix = get_certificate_prefix(rowEntity['certificate_type']);
                rowEntity[prefix+'_issue_place'] = rowEntity['issue_place'];
            }
            function on_valid_period_change(rowEntity,colDef){
                var prefix = get_certificate_prefix(rowEntity['certificate_type']);
                 rowEntity[prefix+'_valid_period'] = rowEntity['valid_period'];
            }
        }
        function leader_edit(scope){
            scope.calc_age = calc_age;
            scope.change_certificate_type = change_certificate_type;
            scope.on_certificate_num_change = on_certificate_num_change;
            scope.on_issue_place_change = on_issue_place_change;
            scope.on_valid_period_change = on_valid_period_change;
            init();
            function init(){
                var data = scope.data;
                var now = new Date().getTime()/1000;
                var birthday = new Date(data['birthday']).getTime()/1000;
                data['age']  = parseInt(((now-birthday)>0?(now-birthday):0)/(3600*24*365));
                var type = get_certificate_type(data);
                var prefix = get_certificate_prefix(type);
                data['certificate_type'] = type;
                data['certificate_num'] = data[prefix+'_num']||'';
                data['issue_place'] = data[prefix+'_issue_place']||'';
                data['valid_period'] = data[prefix+'_valid_period']||'';
            }
            function calc_age(){
                var data = scope.data;
                var now = new Date().getTime()/1000;
                var birthday = new Date(data['birthday']).getTime()/1000;
                data['age']  = parseInt(((now-birthday)>0?(now-birthday):0)/(3600*24*365));
            }
            function change_certificate_type(){
                var data = scope.data;
                var prefix = get_certificate_prefix(data['certificate_type']);
                data['certificate_num'] = data[prefix+'_num']||'';
                data['issue_place'] = data[prefix+'_issue_place']||'';
                data['valid_period'] = data[prefix+'_valid_period']||'';
            }
            function on_certificate_num_change(){
                var data = scope.data;
                var prefix = get_certificate_prefix(data['certificate_type']);
                data[prefix+'_num'] =  data['certificate_num'];
                change_certificate_name(rowEntity);
            }
            function on_issue_place_change(){
                var data = scope.data;
                var prefix = get_certificate_prefix(data['certificate_type']);
                data[prefix+'_issue_place'] = data['issue_place'];
            }
            function on_valid_period_change(){
                var data = scope.data;
                var prefix = get_certificate_prefix(data['certificate_type']);
                data[prefix+'_valid_period'] = data['valid_period'];
            }
        }

        function leave_edit(scope){
            scope.action_map = {
                '提交':leave_submit,
            };
            scope.change_days = change_days;
            function leave_submit(store_id,data,meta,action){
                var cur_scope = $rootScope.cur_scope();
                var cfg = cur_scope.cfg;
                var data = cur_scope.data;
                var leader_id = data.leader_id;
                AjaxSrvc.submit(cfg.submit.url,data).then(function(data){
                    CommSrvc.info(data.message).result.then(function(){
                        var pre_scope = $rootScope.pre_scope();
                        var pre_cfg = pre_scope.cfg;
                        AjaxSrvc.get(pre_cfg.read.url,{id:leader_id}).then(function(data){
                            pre_scope.load();
                            $rootScope.close_view();
                        })
                    });
                });
            }
            function change_days(){
                var data = scope.data;
                if(data.start_date&&data.end_date){
                    var start = new Date(data.start_date).getTime()/1000;
                    var end = new Date(data.end_date).getTime()/1000;
                    data.total_day =  1+parseInt(((end-start)>0?(end-start):0)/(3600*24));
                }
            }
        }
        function leader_leave(scope){
            scope.action_map = {
                '新增请假':leave_add,
                '撤销领队请假':leave_revoke,
            };
            scope.load = load;
            scope.leader_id = scope.ref? scope.ref.id:0;
            function load(){
                AjaxSrvc.get(scope.cfg.read.url,{id:scope.leader_id},'all').then(function(response){
                    scope.gridOptions.totalItems = response.total;
                    scope.data.splice(0);
                    Array.prototype.push.apply(scope.data, response.data);
                });
            }
            function leave_add(store_id,data,meta,action){
                var scope = $rootScope.cur_scope();
                $rootScope.trigger('新增领队请假',meta,store_id,{leader_id:scope.leader_id});
            }

            function leave_revoke(store_id,data,meta,action){
                AjaxSrvc.submit('/res/Leader/leave_destroy',data).then(function(data){
                    CommSrvc.info(data.message).result.then(function(){
                        scope.load();
                    });
                });
            }
        }
        function get_certificate_prefix(type){
            var prefix = ''
            switch(type){
                case appConst.ID_CARD:
                    prefix = 'id';
                    break;
                case appConst.PASSPORT: 
                    prefix = 'passport';
                    break;
                case appConst.TW_PASSPORT:
                    prefix = 'tw_passport';
                    break;
                case appConst.HK_PASSPORT:
                    prefix = 'hk_passport';
                    break;
                default :
                    return;
            }
            return prefix;
        }
        function get_certificate_type(item){
            if(!_.isUndefined(item.passport_num)&&!_.isEmpty(item.passport_num)&&!(item.passport_num==0)){
                return appConst.PASSPORT;
            }else{
                if(!_.isUndefined(item.id_num)&&!_.isEmpty(item.id_num)&&!(item.id_num==0)){
                    return appConst.ID_CARD;
                }else{
                    if(!_.isUndefined(item.hk_passport_num)&&!_.isEmpty(item.hk_passport_num)
                        &&!(item.hk_passport_num==0)){
                        return appConst.HK_PASSPORT;
                    }else
                    {
                        if(!_.isUndefined(item.tw_passport_num)&&!_.isEmpty(item.tw_passport_num)
                            &&!(item.tw_passport_num==0)){
                            return appConst.TW_PASSPORT;
                        }else
                        {
                            return '';
                        }
                    }
                }
            }
        }
        function change_certificate_name(rowEntity){
            var name_arr = [];
            angular.forEach({'id_num':appConst.ID_CARD,'passport_num':appConst.PASSPORT,'hk_passport_num':appConst.HK_PASSPORT,
                'tw_passport_num': appConst.TW_PASSPORT},function(key,item){
                if(!_.isUndefined(rowEntity[item])&&!_.isEmpty(rowEntity[item])){
                    var name = EnumSrvc['Certificate'][key];
                    if(!_.contains(name_arr,name)){
                        name_arr.push(name);
                    }
                }
            });
            rowEntity.certificate_name = name_arr.join(',');
        }
    }
})();