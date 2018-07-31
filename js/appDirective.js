(function() {
    'use strict';
    angular
    .module('app')
    .directive('uiToggleClass',uiToggleClass)
    .directive('uiScroll',uiScroll)
    .directive('uiValidate',uiValidate)

    .directive('uiSelectWrap',uiSelectWrap)
    .directive('uiDatepicker', uiDatepicker)
    .directive('uiPikaday', uiPikaday)
    .directive('uiFile', uiFile)
    .directive('uiFileList', uiFileList)
    .directive('uiGridCell', uiGridCell)
    .directive('modalMovable', modalMovable)
    
    .directive('uiAutoTextarea', uiAutoTextarea)

    modalMovable.$inject = ['$document'];
    function modalMovable($document) {
        return {
            restrict: 'AC',
            link: function(scope, iElement, iAttrs) {
                var startX = 0,
                    startY = 0,
                    x = 0,
                    y = 0;

                var dialogWrapper = iElement.parent();

                dialogWrapper.css({
                    position: 'relative'
                });

                iElement.on('mousedown', function(event) {
                    if(event.target.type){
                        return;
                    }
                    if(iAttrs.modalMovable){
                      var _cfgs = iAttrs.modalMovable.split('.');
                      if(_cfgs[0]&&_cfgs[1]){
                        if(!scope.$parent[_cfgs[0]][_cfgs[1]]){
                          return;
                        }
                      }
                    }                 
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    dialogWrapper.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }

                function mouseup() {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }
            }
        };
    }

    function uiGridCell() {
        return {
            priority: -100, // run after the actual uiGridCell directive and ui.grid.edit uiGridCell
            restrict: 'A',
            require: ['^uiGrid', '?^uiGridCellnav'],
            scope: false,
            link: function ($scope, $elm, $attrs, controllers) {
                var uiGridCtrl = controllers[0];

                $elm.off('mousedown');

                //turn on and off for edit events
                if (uiGridCtrl.grid.api.edit) {
                    uiGridCtrl.grid.api.edit.on.beginCellEdit($scope, function () {
                        $elm.off('mousedown');
                    });

                    uiGridCtrl.grid.api.edit.on.afterCellEdit($scope, function () {
                        $elm.off('mousedown');
                    });

                    uiGridCtrl.grid.api.edit.on.cancelCellEdit($scope, function () {
                        $elm.off('mousedown');
                    });
                }
            }
        }
    }

    uiToggleClass.$inject = ['$timeout','$document'];
    function uiToggleClass($timeout, $document) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                el.on('click', function(e) {
                    e.preventDefault();
                    var classes = attr.uiToggleClass.split(','),
                    targets = (attr.target && attr.target.split(',')) || Array(el),
                    key = 0;
                    angular.forEach(classes, function( _class ) {
                        var target = targets[(targets.length && key)];            
                        ( _class.indexOf( '*' ) !== -1 ) && magic(_class, target);
                        $( target ).toggleClass(_class);
                        key ++;
                    });
                    $(el).toggleClass('active');

                    function magic(_class, target){
                        var patt = new RegExp( '\\s' + 
                            _class.replace( /\*/g, '[A-Za-z0-9-_]+' ).split( ' ' ).join( '\\s|\\s' ) + 
                            '\\s', 'g' );
                        var cn = ' ' + $(target)[0].className + ' ';
                        while ( patt.test( cn ) ) {
                            cn = cn.replace( patt, ' ' );
                        }
                        $(target)[0].className = $.trim( cn );
                    }
                });
            }
        };
    }

    uiScroll.$inject = ['$location','$anchorScroll'];
    function uiScroll($location, $anchorScroll) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                el.on('click', function(e) {
                    $location.hash(attr.uiScroll);
                    $anchorScroll();
                });
            }
        };
    }

    function uiValidate() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
              var validateFn, validators = {},
                  validateExpr = scope.$eval(attrs.uiValidate);

              if (!validateExpr){ return;}

              if (angular.isString(validateExpr)) {
                validateExpr = { validator: validateExpr };
              }

              angular.forEach(validateExpr, function (exprssn, key) {
                validateFn = function (valueToValidate) {
                  var expression = scope.$eval(exprssn, { '$value' : valueToValidate });
                  if (angular.isObject(expression) && angular.isFunction(expression.then)) {
                    // expression is a promise
                    expression.then(function(){
                      ctrl.$setValidity(key, true);
                    }, function(){
                      ctrl.$setValidity(key, false);
                    });
                    return valueToValidate;
                  } else if (expression) {
                    // expression is true
                    ctrl.$setValidity(key, true);
                    return valueToValidate;
                  } else {
                    // expression is false
                    ctrl.$setValidity(key, false);
                    return valueToValidate;
                  }
                };
                validators[key] = validateFn;
                ctrl.$formatters.push(validateFn);
                ctrl.$parsers.push(validateFn);
              });

              function apply_watch(watch)
              {
                  //string - update all validators on expression change
                  if (angular.isString(watch))
                  {
                      scope.$watch(watch, function(){
                          angular.forEach(validators, function(validatorFn){
                              validatorFn(ctrl.$modelValue);
                          });
                      });
                      return;
                  }

                  //array - update all validators on change of any expression
                  if (angular.isArray(watch))
                  {
                      angular.forEach(watch, function(expression){
                          scope.$watch(expression, function()
                          {
                              angular.forEach(validators, function(validatorFn){
                                  validatorFn(ctrl.$modelValue);
                              });
                          });
                      });
                      return;
                  }

                  //object - update appropriate validator
                  if (angular.isObject(watch))
                  {
                      angular.forEach(watch, function(expression, validatorKey)
                      {
                          //value is string - look after one expression
                          if (angular.isString(expression))
                          {
                              scope.$watch(expression, function(){
                                  validators[validatorKey](ctrl.$modelValue);
                              });
                          }

                          //value is array - look after all expressions in array
                          if (angular.isArray(expression))
                          {
                              angular.forEach(expression, function(intExpression)
                              {
                                  scope.$watch(intExpression, function(){
                                      validators[validatorKey](ctrl.$modelValue);
                                  });
                              });
                          }
                      });
                  }
              }
              // Support for ui-validate-watch
              if (attrs.uiValidateWatch){
                  apply_watch( scope.$eval(attrs.uiValidateWatch) );
              }
            }
          };
    }

    function uiSelectWrap() {
        return {
            require: 'uiSelect',
            link: function(scope, el, attr,$select) {
                $select.activate();
            } 
        };
    }

    uiDatepicker.$inject = ['$parse'];
    function uiDatepicker($parse){

        var lang = localStorage.lang || 0;

        $.fn.datepicker.dates['zh-CN'] ={
            days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysShort: ["日", "一", "二", "三", "四", "五", "六", "七"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "七"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今天",
            clear: "清除",
            format: "yyyy-mm-dd",
            titleFormat: "yyyy MM",
            weekStart: 0
        };

        return {
            restrict: 'AC',
            replace: true,
            link: link
        };

        function link(scope, el, attr) {
            function _link() {
              if(attr.seq&&attr.page){
                  var today = new Date();
                  var year = today.getFullYear();
                  var month = today.getMonth();

                  var start_date = new Date(+attr.page+year, +attr.seq+month,1);
          
                  var startDate = moment(start_date).format('YYYY-MM-DD');
                  var endDate = moment(start_date).endOf('month').format('YYYY-MM-DD');

                  el.datepicker({language: {0:'zh-CN',1:'en'}[lang],
                        startDate:startDate,
                        endDate:endDate,
                        defaultViewDate:startDate,
                        multidate: true,
                      }).on('changeDate',function(e){
                          var selected = el.datepicker('getDates', '');
                          var rst = [];
                          angular.forEach(selected,function(i){
                              rst.push(i);
                          });
                          $parse(attr['ngModel']).assign(scope, rst);
                    });
              }else{
                  el.datepicker({language: {0:'zh-CN',1:'en'}[lang]});
              }
            }

            _link();
            scope.$watch('page',function(newvalue,oldvalue){
              if(newvalue!==oldvalue){
                el.datepicker('destroy');
                _link();
              }
            });
        }
    }

    function uiPikaday(){

        var lang = localStorage.lang || 0;

        var i18n = [{
            previousMonth : '上一月',
            nextMonth     : '下一月',
            months        : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            weekdays      : ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            weekdaysShort : ["日", "一", "二", "三", "四", "五", "六"]
        },{
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
            weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        }];
        return {
            restrict: 'AC',
            replace: true,
            link: link
        };

        function link(scope, el, attr) {

            new Pikaday({ field: el[0] ,yearRange:100,format: 'YYYY-MM-DD',i18n:i18n[lang],onClose:onClose});
            scope.grid && el.focus();
            function onClose(){
                scope.grid && scope.grid.appScope.cellEditClose(scope);
            }
        }
    }

    uiFile.$inject = ['$http','AjaxSrvc','CommSrvc'];
    function uiFile($http,AjaxSrvc, CommSrvc) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                el.bind('change', function () {
                    var data = new FormData();
                    data.append('file', el[0].files[0]);
                    el.val('');
                    AjaxSrvc.upload(data,attr.uiFile).then(function(response){
                        if(scope.row && scope.col){
                            scope.row.entity[scope.col.field] = response.save_path;
                        }else{
                            if(attr.path.indexOf('.')!=-1){
                              var paths =  attr.path.split('.');
                              if(paths.length>2){
                                scope.data[paths[0]][paths[1]][paths[2]] = response.save_path;
                              }else{
                                scope.data[paths[0]][paths[1]] = response.save_path;
                              }
                              
                            }else{
                              scope.data[attr.path] = response.save_path;
                            }
                            if(attr.thumbnail){
                                scope.data[attr.thumbnail] = response.thumbnail;
                            }
                        }
                        CommSrvc.info(response.message);
                    });
                });
            }
        };
    }

    uiFileList.$inject = ['$http','AjaxSrvc','CommSrvc','appConst'];
    function uiFileList($http,AjaxSrvc, CommSrvc,appConst) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                el.bind('change', function () {
                    var data = new FormData();
                    data.append('file', el[0].files[0]);
                    el.val('');
                    var employee_id = angular.fromJson(localStorage[appConst.APP_NAME]).employee_id;
                    AjaxSrvc.upload(data,attr.uiFileList).then(function(response){
                        if(scope.row && scope.col){
                          var list =[];
                          if(!_.isEmpty(scope.row.entity[scope.col.field])){
                             try{
                                list = angular.fromJson(scope.row.entity[scope.col.field]);
                             }catch(err){
                                list.unshift({save_path:scope.row.entity[scope.col.field]});
                             }finally{
                                if(attr.added){
                                   list.splice(0,1);
                                }
                                list.unshift({save_path:response.save_path,date:moment().format('YYYY-MM-DD HH:mm:ss')
                                            ,employee_id: employee_id});
                                scope.row.entity[scope.col.field] = angular.toJson(list);
                                attr.added = true;
                             }
                          }else{
                            list.unshift({save_path:response.save_path,date:moment().format('YYYY-MM-DD HH:mm:ss')
                                            ,employee_id:employee_id});
                            scope.row.entity[scope.col.field] = angular.toJson(list);
                            attr.added = true;
                          }
                        }else{
                            if(attr.path.indexOf('.')!=-1){
                              var paths =  attr.path.split('.');
                              var list =[];
                              if(!_.isEmpty(scope.data[paths[0]][paths[1]])){
                                 try{
                                  list = angular.fromJson(scope.data[paths[0]][paths[1]]);
                                }catch(err){
                                  list.unshift({save_path:scope.data[paths[0]][paths[1]]});
                                }finally{
                                  if(attr.added){
                                     list.splice(0,1);
                                  }
                                  list.unshift({save_path:response.save_path,date:moment().format('YYYY-MM-DD HH:mm:ss')
                                              ,employee_id:employee_id});
                                  scope.data[paths[0]][paths[1]]= angular.toJson(list);
                                  attr.added = true;
                                }
                              }else{
                                list.unshift({save_path:response.save_path,date:moment().format('YYYY-MM-DD HH:mm:ss')
                                              ,employee_id:employee_id});
                                scope.data[paths[0]][paths[1]]= angular.toJson(list);
                                attr.added = true;
                              }
                            }else{
                              var list =[];
                              if(!_.isEmpty(scope.data[attr.path])){
                                try{
                                  list = angular.fromJson(scope.data[attr.path]);
                                }catch(err){
                                  list.unshift({save_path:scope.data[attr.path]});
                                }finally{
                                  if(attr.added){
                                     list.splice(0,1);
                                  }
                                  list.unshift({save_path:response.save_path,date:moment().format('YYYY-MM-DD HH:mm:ss')
                                              ,employee_id:employee_id});
                                  scope.data[attr.path]= angular.toJson(list);
                                  attr.added = true;
                                }
                              }else{
                                list.unshift({save_path:response.save_path,date:moment().format('YYYY-MM-DD HH:mm:ss')
                                              ,employee_id:employee_id});
                                scope.data[attr.path]= angular.toJson(list);
                                attr.added = true;
                              }
                            }
                        }
                        CommSrvc.info(response.message);
                    });
                });
            }
        };
    }

    uiAutoTextarea.$inject = ['$timeout'];
    function uiAutoTextarea($timeout){
        function autoHeight(elem){
            elem.style.height = 'auto';
            elem.scrollTop = 0; //防抖动
            elem.style.height = elem.scrollHeight + 'px';
        }

        return {
            scope: {},
            link: function (scope, ele, attrs) {
                var oriEle = $(ele).get(0);
                $(oriEle).bind('keydown scroll', function(e) {
                    autoHeight($(this).get(0));
                });
                $timeout(function(){
                    if($(oriEle).val()) {
                        autoHeight(oriEle);
                    }
                });
            }
        };
    }

})();