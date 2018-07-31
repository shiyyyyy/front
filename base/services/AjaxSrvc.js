(function() {
    'use strict';

    angular
    .module('app')
    .factory('AjaxSrvc', AjaxSrvc);

    AjaxSrvc.$inject = ['EnumSrvc','I18nSrvc','$http','$q','CommSrvc','appConst','$rootScope','$filter'];
    function AjaxSrvc(EnumSrvc, I18nSrvc, $http, $q, CommSrvc, appConst, $rootScope, $filter) { 
        var front_enum = '';
        var enum_updating = false;
        var user_enum_updating = false;
        var host = '';
        var service = {
            get: get,
            submit: submit,
            upload: upload,
            update_enum: update_enum,
            update_user_enum: update_user_enum,
        };
        return service;

        // ret: 
        //      raw     返回原始字符串
        //      all     返回所有内容
        //      其他     返回response.data 
        function get(url, data, ret, cfg){
            cfg = cfg || {};
            if(front_enum){
                data = data || {};
                data.front_enum = front_enum;
            }
            
            cfg.params = data;
            if(!cfg.timeout){
                cfg.timeout = appConst.AJAX_TIMEOUT;
            }
            return $q(function(resolve,reject){
                $http.get(appConst.HOST+url,cfg).then(
                    function(http_response){
                        if(ret == 'raw'){
                            resolve && resolve(http_response.data);
                        }else{
                            ajax_success(http_response.data,resolve,reject,ret);
                        }
                    },
                    function(http_response){
                        ajax_failure(http_response.data,reject);
                    }
                );
            });
        }

        function submit(url, data, cfg){
            cfg = cfg || {};
            if(front_enum){
                url += '?front_enum='+front_enum;
            }

            if(!cfg.timeout){
                cfg.timeout = appConst.AJAX_TIMEOUT;
            }
            return $q(function(resolve,reject){
                $http.post(appConst.HOST+url,data,cfg).then(
                    function(http_response){
                        ajax_success(http_response.data,resolve,reject);
                    },
                    function(http_response){
                        ajax_failure(http_response.data,reject);
                    }
                );
            });
        }

        function upload(data,type){
            return submit('/PublicApi/upload/'+type,data,{headers: {'Content-Type': undefined}});
        }

        function ajax_success(response,resolve,reject,ret){
            if(response.enum){
                update_enum(response.enum);
            }else{
                front_enum = '';
            }

            if(response.user_enum){
                update_user_enum();
            }

            if(angular.isString(response)){
                CommSrvc.error( response );
                reject && reject(response);
                return;
            }
            if(!response.success){
                if(response.message == -1){
                    window.location = './?login';
                }else{
                    CommSrvc.error(response.message);
                }
                reject && reject(response);
                return;
            }

            if(ret == 'all'){
                resolve && resolve(response);
            }else{
                resolve && resolve(response.data || response);
            }
        }

        function ajax_failure(response,reject){
            CommSrvc.error(response.message || I18nSrvc.get('ERR_NW'));
            reject && reject(response);
        }

        function convert_enum(data){
            data.SelfCompanyEmployee = {};
            angular.forEach(data.EmployeeCompany,function(value,key){
                if(value ==  data.EmployeeCompany[$rootScope.appUser.employee_id]){
                    data.SelfCompanyEmployee[key] = data.Employee[key]
                }
            });
            data.FlowCompany = {'all':'所有公司'};
            angular.forEach(data.Company,function(value,key){
                data.FlowCompany[key] = value;
            });
        }

        function convert_user_enum(data){
            data.PayPeriod = {};
            angular.forEach(data.PayPeriodCfg,function(arr,id){
                data.PayPeriod[id] = $filter('colDisplay')(
                    null,
                    {type:'PayPeriodName'},
                    {pay_period_type:arr[0],day:arr[1]}
                );
            });
            data.DctAgreement = {};
            angular.forEach(data.DctAgreementCfg,function(arr,id){
                data.DctAgreement[id] = $filter('colDisplay')(
                    null,
                    {type:'DctAgreementName'},
                    {dct_type:arr[0],dct_num:arr[1]}
                );
            });
            // data.UserPdNav = data.UserPdNav||EnumSrvc['PdNav'];
            // data.UserPdTag = data.UserPdTag||EnumSrvc['PdTag'];
            // data.UserPdSubTag = data.UserPdSubTag||EnumSrvc['PdSubTag'];

            if(!_.isUndefined(data.UserCountry)&&_.isArray(data.UserCountry)){
                var rst_country =  {};
                angular.forEach(EnumSrvc['Country'],function(country,key){
                    if(data.UserCountry.indexOf(key)!==-1){
                        rst_country[key] = country;
                    }
                })
                data.UserCountry = rst_country;
            }else{
                data.UserCountry = EnumSrvc['Country'];
            }
            if(!_.isUndefined(data.UserPdSubTagCountry)&&_.isArray(data.UserPdSubTagCountry)){
                rst_country =  {};
                angular.forEach(EnumSrvc['Country'],function(country,key){
                    if(data.UserPdSubTagCountry.indexOf(key)!==-1){
                        rst_country[key] = country;
                    }
                })
                data.UserPdSubTagCountry = rst_country;
            }else{
                data.UserPdSubTagCountry = EnumSrvc['Country'];
            }
            if(!_.isUndefined(data.UserContinent)&&_.isArray(data.UserContinent)){
                var rst_continent =  {};
                angular.forEach(EnumSrvc['Continent'],function(continent,key){
                    if(data.UserContinent.indexOf(key)!==-1){
                        rst_continent[key] = continent;
                    }
                })
                data.UserContinent = rst_continent;
            }else{
                data.UserContinent = EnumSrvc['Continent'];
            }
        }

        function update_enum(ver){
            
            if(enum_updating){
                return;
            }

            if(EnumSrvc.ver == ver){
                return;
            }
            
            enum_updating = true;
            var app = $rootScope.appUser.app_name;
            get('/files/'+app+'/cache/Enum.js',{ver:ver},'all').then(
                function(data){
                    convert_enum(data);
                    angular.extend(EnumSrvc,data);
                    
                    front_enum = EnumSrvc.ver;

                    enum_updating = false;
                },
                function(){
                    enum_updating = false;
                }
            );
        }

        function update_user_enum(){
            if(user_enum_updating){
                return;
            }
            user_enum_updating = true;
            return get('/PublicApi/get_user_enum').then(
                function(data){
                    convert_user_enum(data);
                    angular.extend(EnumSrvc,data);
                    user_enum_updating = false;
                },
                function(){
                    user_enum_updating = false;
                }
            );
        }
    }
})();
