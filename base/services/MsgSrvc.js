(function() {
    'use strict';

    angular
    .module('app')
    .factory('MsgSrvc', MsgSrvc);

    MsgSrvc.$inject = ['$http', 'appConst', '$cookies', '$interval', 'CommSrvc' ,'$sce', 'I18nSrvc','$rootScope'];
    function MsgSrvc($http, appConst, $cookies, $interval, CommSrvc, $sce, I18nSrvc, $rootScope) {
        var polling_url = window.location.protocol+'//'+window.location.host.split(':')[0]+':'+appConst.POLLING_PORT
                            + appConst.POLLING_PATH
                            +'?sid='+$cookies.get(appConst.APP_NAME);
        var running = false;
                    
        var window_id = new Date().getTime();
        
        var msg_arr = [];
        
        localStorage.polling_msg = '[]';
        
        function proc_message(p){
            // if(p.msg_type == -1){
            //     $rootScope.update_enum(p.extra.ver);
            //     return;
            // }
            // p.title = I18nSrvc.pick(p.title);

            if(p.extra && p.extra.action && p.extra.assoc_id){
                CommSrvc.toa_approve(p.msg_level,p.title,p.extra.action,p.extra.assoc_id);
                return;
            }

            switch(p.msg_level){
                case appConst.LV_ERROR:
                    CommSrvc.toa_error(p.title);
                    break;
                case appConst.LV_WARNING:
                    CommSrvc.toa_warn(p.title);
                    break;
                case appConst.LV_INFO:
                    CommSrvc.toa_info(p.title);
                    break;
                case appConst.LV_SUCCESS:
                    CommSrvc.toa_succ(p.title);
                    break;
            }
        }

        function get_message(){
            running = true;
            $http.jsonp($sce.trustAsResourceUrl(polling_url),{jsonpCallbackParam: 'cb'}).then(
                function(p){
                    if(!p.data){
                        running = false;
                        return
                    }
                    msg_arr.push(p.data);
                    proc_message(p.data);
                    get_message();
                },
                function(){
                    running = false;
                }
            );
        }

        function check_window(){
            var polling_window = $cookies.get(appConst.APP_NAME+'_polling');
            if(!polling_window || polling_window == window_id){
                var expires = new Date().getTime() + (appConst.POLLING_CHECK_INTERVAL+5) * 1000;
                expires = new Date(expires);
                $cookies.put(appConst.APP_NAME+'_polling', window_id, {expires : expires});
                localStorage.polling_msg = angular.toJson(msg_arr);
                msg_arr = [];
            }else{
                var msgs = angular.fromJson(localStorage.polling_msg);
                _.each(msgs,function(m){proc_message(m);});
            }
            if(!polling_window ||
                    (polling_window == window_id && !running)){
                get_message();
            }
        }
        function init(){
            check_window();
            $interval(check_window,appConst.POLLING_CHECK_INTERVAL*1000);
        }

        return {
            init:init,
        };
    }
})();
