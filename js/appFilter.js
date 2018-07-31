(function() {
    'use strict';
    angular
    .module('app')
    .filter('i18n', i18n)
    .filter('colDisplay', colDisplay)
    .filter('PairFilter', PairFilter);


    i18n.$inject = ['I18nSrvc'];
    function i18n(I18nSrvc){
        return I18nSrvc.get;
    }

    colDisplay.$inject = ['EnumSrvc','I18nSrvc','appConst','$rootScope'];
    function colDisplay(EnumSrvc, I18nSrvc,appConst,$rootScope){
        return function(v,cfg,row){
            switch(cfg.type){
                case 'OrderPeople':
                    if(row.is_change){
                        return v+'-<i class="text-danger">'
                            +row.num_of_people_change+'</i>';
                    }
                    return v;
                case 'BranchVarRange':
                    if(row.is_type_branch){
                        var branch_ranges = angular.fromJson(row['branch_range']);
                        var branch_types = angular.fromJson(row['branch_types']);
                        var result = [];
                        angular.forEach(branch_ranges,function(type_vals,type){
                            var arr =[];
                            angular.forEach(type_vals,function(type_val){
                                if(!_.isUndefined(branch_types[type])&&!_.isNull(branch_types[type])){
                                   arr.push(EnumSrvc[branch_types[type]][type_val[1]]); 
                                }
                            })
                            if(!_.isEmpty(arr)){
                                result.push(type+':'+ arr.join('或者'));
                            }
                        });
                        if(!_.isEmpty(v)){
                            return v+';'+result.join(';');
                        }else{
                            return result.join(';');
                        }
                    }
                    return v;
                case'CstmId':
                    return  v?'C0'+v:'';
                case 'PayPeriodName':
                    var append = {1:'DAY',2:'DAY',3:'TH',4:'TH'}[row.pay_period_type];
                    if(!append){
                        return;
                    }
                    if($rootScope.lang == 0){
                        row[cfg.field] = row[cfg.field] || EnumSrvc['PayPeriodType'][row.pay_period_type]+row.day+I18nSrvc.get(append);
                        
                    }else{
                        row[cfg.field] = row[cfg.field] || row.day+I18nSrvc.get(append)+EnumSrvc['PayPeriodType'][row.pay_period_type];
                    }
                    return row[cfg.field];
                case 'DctAgreementName':
                    var dct_append = {1:'%',2:''};
                    row[cfg.field] = (row.dct_type)?(EnumSrvc['DctType'][row.dct_type]+row.dct_num+dct_append[row.dct_type]):'';
                    return row[cfg.field];
                case 'DctAgreementNameList':
                    var dct_list = [];
                    var dct_id = row.dct_id?angular.fromJson(row.dct_id):[];
                    dct_id = _.isArray(dct_id)?dct_id:[dct_id];
                    angular.forEach(dct_id,function(id){
                        dct_list.push(EnumSrvc['DctAgreement'][id]);
                    });
                    return dct_list.join(',');
                case 'DocId':
                    switch(row.doc_type_id){
                        case appConst.DOC_ORDER_SK:
                        case appConst.DOC_ZJ_SK:
                            return v?'SK0'+v:'';
                        case appConst.DOC_YJ:
                            return v?'YJ0'+v:'';
                        case appConst.DOC_YW_TK:
                        case appConst.DOC_YJ_TK:
                        case appConst.DOC_ZJ_TK:
                            return v?'TK0'+v:'';
                        case appConst.DOC_YW_JK:
                        case appConst.DOC_ZJ_JK:
                            return v?'JK0'+v:'';
                        case appConst.DOC_ACC_ZC:
                        case appConst.DOC_ZJ_ZC:
                            return v?'ZC0'+v:'';
                        case appConst.DOC_YC:
                            return v?'YC0'+v:'';
                        case appConst.DOC_YZ:
                            return v?'YZ0'+v:'';
                        case appConst.DOC_YW_NZ:
                        case appConst.DOC_ZJ_NZ:
                            return v?'NZ0'+v:'';
                        case appConst.DOC_TZ:
                            return v?'TZ0'+v:'';
                        case appConst.DOC_KK:
                            return v?'KK0'+v:'';
                        case appConst.DOC_HK:
                            return v?'HK0'+v:'';
                        case appConst.DOC_GZ:
                            return v?'GZ0'+v:'';
                        case appConst.DOC_YW_TH:
                        case appConst.DOC_ZJ_TH:
                            return v?'TH0'+v:'';
                    }
                    break;
                case 'InvoiceId':
                    if(v=='0')
                        return '';
                    return v?'FP0'+v:'';
                case 'VisaId':
                    return v?'VS0'+v:'';
                case 'AirTktId':
                    return v?'JP0'+v:'';
                case 'OrderId':
                    if(v=='0')
                        return '';
                    return  v?'D0'+v:'';
                case 'ReconcileId':
                    return v?'DZ0'+v:'';
                case 'ProductId':
                    return v?'P0'+v:'';
                case 'SupplierId':
                    return v?'S0'+v:'';
                case 'GroupId':
                    return 'T0'+v;
                case 'InsureId':
                    return v?'BX'+v:'';
                case 'AccountingId':
                    return v?'H0'+v:'';
                case 'Lang':
                    return I18nSrvc.pick(v);
                case 'Specify':
                    var rst = [];
                    angular.forEach(v,function(i){
                        rst.push(EnumSrvc['Employee'][i]);
                    });
                    return rst.join(',');
                case 'SpecifyAuth':
                    var rst =[];
                    angular.forEach(v,function(i){
                        rst.push(EnumSrvc['Auth'][i]);
                    });
                    return rst.join(',');
                case 'RetailerId':
                    switch(row.reta_type_id){
                        case '1':
                            return v?'TY0'+v:'';
                        case '2':
                            return v?'DS0'+v:'';
                        case '3':
                            return v?'ZK0'+v:'';
                    }
                    break;
                case 'RetailType':
                    switch(row.reta_type_id){
                        case '1':
                            return I18nSrvc.get('同业');
                        case '2':
                            return I18nSrvc.get('电商');
                        case '3':
                             return I18nSrvc.get('直客');
                    }
                    break;
                case 'InquiryId':
                    return (v&&v!=0)?'XD0'+v:'';
                case 'ChangeColor':
                    if(row.doc_type_id==appConst.DOC_TZ){
                        if(v<0){
                            return '<i style="color:red;">'+Math.abs(v)+'</i>';
                        } else {
                            return v; 
                        }
                    }
                    return v; 
                case 'ExcessColor':
                    if( v >0){
                        return '<i style="color:red;">'+v+'</i>';
                    }else{
                        return v;
                    }
                default:
                    var e = $rootScope.get_enum(cfg,row,null,true);
                    if(e){
                        return e[v];
                    }else{
                        return v;
                    } 
            }
        };
    }


    function PairFilter(){
        return function(pair, search){
            if(!search){
                return pair;
            }
            var ret = {};
            angular.forEach(pair,function(v,k){
                if(v.indexOf(search) !== -1){
                    ret[i] = v;
                }
            });
            return ret;
        }
    }
})();
