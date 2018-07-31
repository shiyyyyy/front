(function() {
    'use strict';

    angular
    .module('app')
    .controller('ModalInstanceCtl', ModalInstanceCtl)
    .factory('CommSrvc', CommSrvc);

    ModalInstanceCtl.$inject = ['$scope', '$uibModalInstance','cfg','$rootScope','$timeout'];
    function ModalInstanceCtl($scope, $uibModalInstance, cfg, $rootScope, $timeout) {

        angular.extend($scope,cfg);
        $scope.ok = function () {
            $uibModalInstance.close('ok');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

    CommSrvc.$inject = ['$uibModal','I18nSrvc','$rootScope'];
    function CommSrvc($uibModal, I18nSrvc, $rootScope) { 

        $rootScope.approve = approve;

        var service = {
            error: error,
            info: info,
            confirm: confirm,
            chk_sel: chk_sel,
            toa_approve: toa_approve,
            toa_info: toa_info,
            toa_succ: toa_succ,
            toa_warn: toa_warn,
            toa_error: toa_error,
        };
        return service;

        function chk_sel(data){
            if(!data[0]){
                error(I18nSrvc.get('SEL_ITEM'));
                return false;
            }
            return true;
        }

        function error(p){
            var cfg = {};
            cfg.title = p.title || I18nSrvc.get('ERROR');
            cfg.msg = p.msg || p;
  
            return $uibModal.open({
              templateUrl: 'Error.html',
              controller : 'ModalInstanceCtl',
              backdrop: 'static',
              resolve:{cfg:cfg}
            });
        }

        function info(p){
            var cfg = {};
            cfg.title = p.title || I18nSrvc.get('INFO');
            cfg.msg = p.msg || p;
  
            return $uibModal.open({
              templateUrl: 'Info.html',
              controller : 'ModalInstanceCtl',
              backdrop: 'static',
              resolve:{cfg:cfg}
            });
        }

        function confirm(p){
            var cfg = {};
            cfg.title = p.title || I18nSrvc.get('INFO');
            cfg.msg = p.msg || p;
  
            return $uibModal.open({
              templateUrl: 'Confirm.html',
              controller : 'ModalInstanceCtl',
              backdrop: 'static',
              resolve:{cfg:cfg}
            });
        }


        function approve(action,assoc_id){
            $rootScope.trigger(action,{'unrefer':1},null,{id:assoc_id});
        }

        function toa_approve(lv,content,action,assoc_id){
            var fun = ['info','error','warning','info','success'];
            content = content.replace('\n','<br/>');
            toastr[fun[lv]]('<div><p>'+content+'</p><button class="btn btn-xs btn-default" '+
                    "onclick=\"angular.element(document.body).scope().$root.approve('"+action+"',"+assoc_id+");"+
                    "$(this).parents('div.toast').children('button').trigger('click');\">"+
                    I18nSrvc.get('APPROVE')+'</button></div>');
        };
        function toa_info(body,title){
            toastr.info(body,title);
        };
        function toa_succ(body,title){
            toastr.success(body,title);
        };
        function toa_warn(body,title){
            toastr.warning(body,title);
        };
        function toa_error(body,title){
            toastr.error(body,title);
        };


    }
    
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-left",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": 0,
      "extendedTimeOut": 0,
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut",
      "tapToDismiss": false
    };

})();