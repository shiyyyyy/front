(function() {
    'use strict';

    angular
        .module('app')
        .factory('HomeSrvc', HomeSrvc);

    HomeSrvc.$inject = ['$rootScope','I18nSrvc','appConst','AjaxSrvc','$timeout','CommSrvc'];
    function HomeSrvc($rootScope ,I18nSrvc,appConst,AjaxSrvc,$timeout,CommSrvc){
        return {
            'HOME':home,
            '修改头像':edit_photo,
            '回票设置':return_ticket_to_set,
        };
        function home(scope){
            var lang = localStorage.lang || 0;
            var i18n = [{
                previousMonth : '上一月',
                nextMonth     : '下一月',
                monthNames        : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                dayNames       : ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                dayNamesShort  : ["日", "一", "二", "三", "四", "五", "六"],
            },{
                previousMonth : 'Previous Month',
                nextMonth     : 'Next Month',
                monthNames        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
                monthNamesShort:['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
                dayNames      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                dayNamesShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            }];
            scope.uiConfig = {
              calendar:{
                height: 412,
                editable: true,
                header:{
                  left: 'title',
                  center: '',
                  right: 'today prev,next'
                },
                buttonText: {
                    today:I18nSrvc.get('TODAY'),
                },
                eventClick: event_click

              }
            };
            _.extend(scope.uiConfig.calendar,i18n[lang]);

            //日程相关
            function event_click(data){
               $rootScope.trigger('查看日程',null,null,data);
            }
            scope.events = [];
            function eventf(start, end, timezone,cb) {
                var start = new Date(start);
                var end = new Date(end);
                AjaxSrvc.get('/PublicApi/get_schedule/',{start:start,end:end}).then(function(data){
                    if(!_.isEmpty(data['日程安排'])){
                        scope.events = [];
                        angular.forEach(data['日程安排'],function(item,key){
                            scope.events.push({
                                id:item.id,
                                title:item.title,
                                start:item.waiting_date,
                                allDay:false,
                            });
                        });
                        cb(scope.events);
                    }
                });
            };

            scope.eventSources = [eventf];


            if(!_.isUndefined(scope.data['订单数据']['mod'])){
                //查找menu
                var mod = scope.data['订单数据']['mod'];
                var menu = _.find($rootScope.menu,function(item){
                    return !_.isUndefined(item[mod]);
                });
                if(!_.isUndefined(menu)){
                    scope.data['订单数据']['cfg'] = menu[mod];
                }
            }
            if(!_.isUndefined(scope.data['账户数据']['mod'])){
                //查找menu
                var mod = scope.data['账户数据']['mod'];
                var menu = _.find($rootScope.menu,function(item){
                    return !_.isUndefined(item[mod]);
                });
                if(!_.isUndefined(menu)){
                    scope.data['账户数据']['cfg'] = menu[mod];
                }
            }
            //员工数据
            if(!_.isEmpty(scope.data['员工数据'])){
                var employee_data = scope.data['员工数据'][0];
                if(employee_data.department_id&&employee_data.department_id!='0'){
                    scope.data.company_info = I18nSrvc.get('EMPLOYEE_COMP')+' :'+employee_data.company_name;
                    scope.data.department_info = I18nSrvc.get('EMPLOYEE_DEP')+' :'+employee_data.department_name;
                    scope.data.employee_info = I18nSrvc.get('EMPLOYEE_NAME')+' :'+employee_data.employee_name;
                }else{
                    if(employee_data.supplier_id!=0){
                        scope.data.company_info = I18nSrvc.get('SUPP_FULL_NAME')+' :'+employee_data.full_name;
                        scope.data.department_info = I18nSrvc.get('SUPP_SHORT_NAME')+' :'+employee_data.short_name;
                        scope.data.employee_info = I18nSrvc.get('EMPLOYEE_NAME')+' :'+employee_data.employee_name;
                    }

                } 
            }
            $timeout(function(){
                $rootScope.trigger('回票设置',null,null,null);
            });   
        }
        function return_ticket_to_set(scope){
            scope.init = function(){
                if(_.isEmpty(scope.data)){
                    $rootScope.close_view();
                }
            }
        }
        function edit_photo(scope){
            scope.data.photo=_.isEmpty(scope.data.photo)?(appConst.HOST+'/'+'profile.png'):(appConst.HOST+'/'+scope.data.photo);
            scope.data.myCroppedImage='';
            scope.init = function(){
                $timeout(function() {
                    var el = $("#fileInput");
                    el.unbind('change');
                    el.bind('change',function(evt){
                        var file=evt.currentTarget.files[0];
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                        scope.$apply(function($scope){
                            scope.data.photo=evt.target.result;
                        });
                        };
                        reader.readAsDataURL(file);
                    });
                });

            }

            scope.submit = function(){
                var binary = atob(scope.data.myCroppedImage.split(',')[1]);
                var array = [];
                for(var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                  }
                var blob = new Blob([new Uint8Array(array)], {type:"image/png" });
                var data = new FormData();
                data.append('file',blob);
                AjaxSrvc.upload(data,'photo').then(function(response){
                  CommSrvc.info(response.message).result.then(function(){
                        $rootScope.close_view();
                    });
                });
            }           
        }
    }
})();