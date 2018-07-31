(function() {
    'use strict';

    angular
    .module('app')
    .factory('InitSrvc', InitSrvc);


    InitSrvc.$inject = ['AjaxSrvc','$rootScope','I18nSrvc','$window','$log','EnumSrvc','MsgSrvc','appConst'];
    function InitSrvc(AjaxSrvc, $rootScope, I18nSrvc, $window, $log, EnumSrvc, MsgSrvc, appConst) {

        $rootScope._ = _;
        $rootScope.$log = $log;
        $rootScope.appUser = angular.fromJson(localStorage[appConst.APP_NAME]);
        
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        if(isSmartDevice( $window )){
            angular.element($window.document.body).addClass('smart');
        }else{
            $rootScope.gridScroll = 0;
        }

        // config
        $rootScope.app = {
            name: '同业聚',
	        subhead: '零售商总社',
            logo: localStorage.logo,
            version: '3.0.0',
            // for chart colors
            color: {
                primary: '#7266ba',
                info:    '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger:  '#f05050',
                light:   '#e8eff0',
                dark:    '#3a3f51',
                black:   '#1c2b36'
            },
            settings: {
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-collapse',
                navbarTabColor:'bg-black-tab',
                bgChange:'bg-black-change',
                asideBackground:'bg-black',
                headerBackground:'',
                contentBackground:'#fff',
                headerFixed: true,
                asideFixed: true,
                asideFolded: false,
                asideDock: false,
                container: false
            },
            theme_id: 0,
            themes : {
                0:{
                    navbarHeaderColor: 'bg-black',
                    navbarCollapseColor: 'bg-white-collapse',
                    navbarTabColor:'bg-black-tab',
                    bgChange:'bg-black-change',
                    asideBackground:'bg-black',
                    headerBackground:'',
                    contentBackground:'#fff',
                    miniHeadL:'bg-black',
                    miniHeadR:'bg-white-collapse',
                    miniBodyL:'bg-black',
                },
                1:{
                    navbarHeaderColor:'bg-dark',
                    navbarCollapseColor:'bg-white-collapse',
                    navbarTabColor:'bg-dark-tab',
                    bgChange:'bg-dark-change',
                    asideBackground:'bg-dark',
                    headerBackground:'',
                    contentBackground:'#fff',
                    miniHeadL:'bg-dark',
                    miniHeadR:'bg-white-collapse',
                    miniBodyL:'bg-dark',
                },
                2:{
                    navbarHeaderColor:'bg-blue',
                    navbarCollapseColor:'bg-white-collapse',
                    navbarTabColor:'bg-blue-tab',
                    bgChange:'bg-blue-change',
                    asideBackground:'bg-blue',
                    headerBackground:'',
                    contentBackground:'#fff',
                    miniHeadL:'bg-blue',
                    miniHeadR:'bg-white-collapse',
                    miniBodyL:'bg-blue',
                },
                3:{
                    navbarHeaderColor:'bg-gray',
                    navbarCollapseColor:'bg-white-collapse',
                    navbarTabColor:'bg-gray-tab',
                    bgChange:'bg-gray-change',
                    asideBackground:'bg-gray-aside',
                    headerBackground:'',
                    contentBackground:'#fff',
                    miniHeadL:'bg-black',
                    miniHeadR:'bg-white-collapse',
                    miniBodyL:'bg-black',
                },
                4:{
                    navbarHeaderColor:'bg-primary dker',
                    navbarCollapseColor:'bg-primary dk',
                    navbarTabColor:'bg-primary',
                    bgChange:'bg-primary dker',
                    asideBackground:'bg-light bg',
                    headerBackground:'',
                    contentBackground:'#fff',
                    miniHeadL:'bg-primary dker',
                    miniHeadR:'bg-primary dk',
                    miniBodyL:'bg-light',
                },
                5:{
                    navbarHeaderColor:'bg-dbColor1 bg-dbColor',
                    navbarCollapseColor:'bg-dbColor1-collapse bg-dbColor-collapse',
                    navbarTabColor:'bg-dbColor1-tab',
                    bgChange:'bg-dbColor1-change',
                    asideBackground:'bg-dbColor-aside',
                    headerBackground:'',
                    contentBackground:'#fff',
                    miniHeadL:'bg-dbColor1',
                    miniHeadR:'bg-dbColor1',
                    miniBodyL:'bg-dbColor-aside',
                },
                6:{//moon night
                    navbarHeaderColor:'bg-moon',
                    navbarCollapseColor:'bg-moon-collapse',
                    navbarTabColor:'bg-moon-tab',
                    bgChange:'bg-moon-change',
                    asideBackground:'bg-moon bg-moon-aside',
                    headerBackground:'bg-moon-head',
                    contentBackground:'#f4faff',
                    contentBackground:'#fff',
                    miniHeadL:'skin-moon',
                    miniHeadR:'skin-moon',
                    miniBodyL:'skin-moon',
                },
                7:{//pink lady
                    navbarHeaderColor:'bg-pink',
                    navbarCollapseColor:'bg-pink-collapse',
                    navbarTabColor:'bg-pink-tab',
                    bgChange:'bg-pink-change',
                    asideBackground:'bg-pink bg-pink-aside',
                    headerBackground:'bg-pink-head',
                    contentBackground:'#fcf7f8',
                    miniHeadL:'skin-pink',
                    miniHeadR:'skin-pink',
                    miniBodyL:'skin-pink',
                },
                8:{//王者农药 蔡文姬
                    navbarHeaderColor:'bg-cwj',
                    navbarCollapseColor:'bg-cwj-collapse',
                    navbarTabColor:'bg-cwj-tab',
                    bgChange:'bg-cwj-change',
                    asideBackground:'bg-cwj bg-cwj-aside',
                    headerBackground:'bg-cwj-head',
                    contentBackground:'#f4f2fa',
                    miniHeadL:'skin-cwj',
                    miniHeadR:'skin-cwj',
                    miniBodyL:'skin-cwj',
                },
                9:{//王者农药 诸葛亮
                    navbarHeaderColor:'bg-zgl',
                    navbarCollapseColor:'bg-zgl-collapse',
                    navbarTabColor:'bg-zgl-tab',
                    bgChange:'bg-zgl-change',
                    asideBackground:'bg-zgl bg-zgl-aside',
                    headerBackground:'bg-zgl-head',
                    contentBackground:'#faf7f2',
                    miniHeadL:'skin-zgl',
                    miniHeadR:'skin-zgl',
                    miniBodyL:'skin-zgl',
                },
                10:{//王者农药 刘备
                    navbarHeaderColor:'bg-liubei',
                    navbarCollapseColor:'bg-liubei-collapse',
                    navbarTabColor:'bg-liubei-tab',
                    bgChange:'bg-liubei-change',
                    asideBackground:'bg-liubei bg-liubei-aside',
                    headerBackground:'bg-liubei-head',
                    contentBackground:'#faf7f2',
                    miniHeadL:'skin-liubei',
                    miniHeadR:'skin-liubei',
                    miniBodyL:'skin-liubei',
                },
                11:{//王者农药 吕布
                    navbarHeaderColor:'bg-lvbu',
                    navbarCollapseColor:'bg-lvbu-collapse',
                    navbarTabColor:'bg-lvbu-tab',
                    bgChange:'bg-lvbu-change',
                    asideBackground:'bg-lvbu bg-lvbu-aside',
                    headerBackground:'bg-lvbu-head',
                    contentBackground:'#faf2f4',
                    miniHeadL:'skin-lvbu',
                    miniHeadR:'skin-lvbu',
                    miniBodyL:'skin-lvbu',
                },
                12:{//王者农药 貂蝉
                    navbarHeaderColor:'bg-dc',
                    navbarCollapseColor:'bg-dc-collapse',
                    navbarTabColor:'bg-dc-tab',
                    bgChange:'bg-dc-change',
                    asideBackground:'bg-dc bg-dc-aside',
                    headerBackground:'bg-dc-head',
                    contentBackground:'#f5f2fa',
                    miniHeadL:'skin-dc',
                    miniHeadR:'skin-dc',
                    miniBodyL:'skin-dc',
                },
                13:{//李白
                    navbarHeaderColor:'bg-lb',
                    navbarCollapseColor:'bg-lb-collapse',
                    navbarTabColor:'bg-lb-tab',
                    bgChange:'bg-lb-change',
                    asideBackground:'bg-lb bg-lb-aside',
                    headerBackground:'bg-lb-head',
                    contentBackground:'#f2f5fa',
                    miniHeadL:'skin-lb',
                    miniHeadR:'skin-lb',
                    miniBodyL:'skin-lb',
                },
                14:{//绝地求生1
                    navbarHeaderColor:'bg-cj',
                    navbarCollapseColor:'bg-cj-collapse',
                    navbarTabColor:'bg-cj-tab',
                    bgChange:'bg-cj-change',
                    asideBackground:'bg-cj bg-cj-aside',
                    headerBackground:'bg-cj-head',
                    contentBackground:'#f2f7fa',
                    miniHeadL:'skin-cj',
                    miniHeadR:'skin-cj',
                    miniBodyL:'skin-cj',
                },
                15:{//绝地求生2
                    navbarHeaderColor:'bg-cj2',
                    navbarCollapseColor:'bg-cj2-collapse',
                    navbarTabColor:'bg-cj2-tab',
                    bgChange:'bg-cj2-change',
                    asideBackground:'bg-cj2 bg-cj2-aside',
                    headerBackground:'bg-cj2-head',
                    contentBackground:'#f2f7fa',
                    miniHeadL:'skin-cj2',
                    miniHeadR:'skin-cj2',
                    miniBodyL:'skin-cj2',
                },
                16:{//小乔
                    navbarHeaderColor:'bg-xq',
                    navbarCollapseColor:'bg-xq-collapse',
                    navbarTabColor:'bg-xq-tab',
                    bgChange:'bg-xq-change',
                    asideBackground:'bg-xq bg-xq-aside',
                    headerBackground:'bg-xq-head',
                    contentBackground:'#f1f8fa',
                    miniHeadL:'skin-xq',
                    miniHeadR:'skin-xq',
                    miniBodyL:'skin-xq',
                },
            }
        };

        if(localStorage.theme){
            if($rootScope.app.themes[localStorage.theme]){
                $rootScope.app.theme_id = localStorage.theme;
                _.extend($rootScope.app.settings,$rootScope.app.themes[localStorage.theme]);
            }
        }
        $rootScope.set_theme = function (theme_id) {
            _.extend($rootScope.app.settings,$rootScope.app.themes[theme_id]);
            localStorage.theme = theme_id;
        };
        var service = {
            get_init: get_init,
        };
        return service;


        function get_init(){
            return AjaxSrvc.get('/PublicApi/get_init',{lang:$rootScope.lang}).then(function(data){
                if(!data.enum_ver){
                    data.enum_ver = new Date().getTime();
                }
                AjaxSrvc.update_enum(data.enum_ver);
                AjaxSrvc.update_user_enum();
                angular.extend($rootScope,data);
                if(localStorage.new_window_mod&&localStorage.new_window_cfg){
                    var mod = angular.copy(localStorage.new_window_mod);
                    var cfg = angular.fromJson(localStorage.new_window_cfg);
                    delete localStorage.new_window_mod;
                    delete localStorage.new_window_cfg;
                    $rootScope.open_mod(mod,cfg);
                }else{
                    $rootScope.open_home();
                }
                MsgSrvc.init();
                Pace.stop();
            });
        }

        function isSmartDevice( $window )
        {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

    }
})();