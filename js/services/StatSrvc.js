(function() {
    'use strict';

    angular
    .module('app')
    .factory('StatSrvc', StatSrvc);

    StatSrvc.$inject = ['AjaxSrvc', 'CommSrvc', 'I18nSrvc', '$uibModal','$location','$rootScope','$timeout','EnumSrvc'];
    function StatSrvc(AjaxSrvc, CommSrvc, I18nSrvc, $uibModal, $location, $rootScope,$timeout,EnumSrvc){

        return {
            //'订单统计': order_stat,
            '询单统计':inquiry_stat,
            '同业采购统计':industry_stat,
            '产品标签统计':product_stat,
            '门市收客统计':store_stat,
            '收支审批统计':doc_approve_stat,
            '发票审批统计':invoice_approve_stat,
            '借票冲抵审批统计':lend_invoice_offset_approve_stat,
        };

        function inquiry_stat(scope){
            $timeout(function() {
                scope.init();
            });
            scope.init = function(){
                var mod_cfg = $rootScope.mods['询单统计']||{};
                var s_regular = [];
                var s_regular = angular.copy(mod_cfg.s_regular);
                
                scope.horizontal_axis = {};
                scope.date_filter = {};
                scope.param = {mod:'询单统计'};
                scope.stat_data_config = {};

                scope.chart_type = '询单统计';
                scope.chart_arr = ['inquiry_c1']; 
                scope.param['chart_arr'] = scope.chart_arr.join(','); 
                scope.mod = '询单统计';

                angular.forEach(['company_id','department_id','employee_id'],function(field){
                    scope.stat_data_config[field] = s_regular[field];
                    scope.stat_data_config[field]['mod'] = scope.mod;
                });
                scope.f_field ='company_id';

                //横轴类型设置
                angular.forEach(['pd_tag_id'
                                ,'pd_subtag_id'
                                ,'employee_id'
                                ],function(field){
                    scope.horizontal_axis[field] = scope.horizontal_axis[field]||s_regular[field];
                });
                scope.horizontal_axis['create_at_year'] = {};
                scope.horizontal_axis['create_at_year']['text'] = '年';
                scope.horizontal_axis['create_at_year']['type'] = 'year';

                scope.horizontal_axis['create_at_month'] = {};
                scope.horizontal_axis['create_at_month']['text'] = '月';
                scope.horizontal_axis['create_at_year']['type'] = 'month';

                //日期限定
                angular.forEach(['create_from'
                                ,'create_to'
                                ],function(field){
                    scope.date_filter[field] = s_regular[field]||{};
                });

            }

            scope.submit_histogram = submit_histogram;
            scope.submit_pie  = submit_pie;

            scope.edit_stat_data = edit_stat_data;

            // 选中
            scope.select = ''
            scope.selected = []
            scope.selected_backup = []
            scope.selectedShow = false
            scope.selDep = -1
            scope.selComInd = 0
        }

        function industry_stat(scope){
            $timeout(function() {
                scope.init();
            });
            scope.init = function(){
                var mod_cfg = $rootScope.mods['同业采购统计']||{};
                var s_regular = [];
                var s_regular = angular.copy(mod_cfg.s_regular);
                
                scope.horizontal_axis = {};
                scope.date_filter = {};
                scope.param = {mod:'同业采购统计'};
                scope.stat_data_config = {};

                scope.chart_type = '同业采购统计';
                scope.chart_arr = ['industry_c1','industry_c2']; 
                scope.param['chart_arr'] = scope.chart_arr.join(',');
                scope.mod = '同业采购统计'; 

                angular.forEach(['company_id','department_id','employee_id'],function(field){
                    scope.stat_data_config[field] = s_regular[field];
                    scope.stat_data_config[field]['mod'] = scope.mod;
                });
                scope.f_field ='company_id';
                

                //横轴类型设置
                angular.forEach(['pd_tag_id'
                                ,'pd_subtag_id'
                                ],function(field){
                    scope.horizontal_axis[field] = scope.horizontal_axis[field]||s_regular[field];
                });
                scope.horizontal_axis['supplier_id'] = {};
                scope.horizontal_axis['supplier_id']['text'] = '供应商';
                scope.horizontal_axis['supplier_id']['type'] = 'Supplier';
                //日期限定
                angular.forEach(['dep_date_from'
                                ,'dep_date_to'
                                ],function(field){
                    scope.date_filter[field] = s_regular[field]||{};
                });

            }

            scope.submit_histogram = submit_histogram;
            scope.submit_pie  = submit_pie;

            scope.edit_stat_data = edit_stat_data;
        }

        function product_stat(scope){
            $timeout(function() {
                scope.init();
            });
            scope.init = function(){
                var mod_cfg = $rootScope.mods['产品标签统计']||{};
                var s_regular = [];
                var s_regular = angular.copy(mod_cfg.s_regular);
                
                scope.horizontal_axis = {};
                scope.date_filter = {};
                scope.param = {mod:'产品标签统计'};
                scope.stat_data_config = {};

                scope.chart_type = '产品标签统计';
                scope.chart_arr = ['product_c1','product_c2']; 
                scope.param['chart_arr'] = scope.chart_arr.join(','); 
                scope.mod = '产品标签统计';

                angular.forEach(['assitant_company_id','assitant_department_id','assitant_id'],function(field){
                    scope.stat_data_config[field] = s_regular[field];
                    scope.stat_data_config[field]['mod'] = scope.mod;
                });
                scope.f_field ='assitant_company_id';

                //横轴类型设置
                angular.forEach(['pd_tag_id'
                                ,'pd_subtag_id'
                                ],function(field){
                    scope.horizontal_axis[field] = scope.horizontal_axis[field]||s_regular[field];
                });

                //日期限定
                angular.forEach(['dep_date_from'
                                ,'dep_date_to'
                                ],function(field){
                    scope.date_filter[field] = s_regular[field]||{};
                });

            }

            scope.submit_histogram = submit_histogram;
            scope.submit_pie  = submit_pie;

            scope.edit_stat_data = edit_stat_data;
        }

        function store_stat(scope){
            $timeout(function() {
                scope.init();
            });
            scope.init = function(){
                var mod_cfg = $rootScope.mods['门市收客统计']||{};
                var s_regular = [];
                var s_regular = angular.copy(mod_cfg.s_regular);
                
                scope.horizontal_axis = {};
                scope.date_filter = {};
                scope.param = {mod:'门市收客统计'};
                scope.stat_data_config = {};

                scope.chart_type = '门市收客统计';
                scope.chart_arr = ['store_c1','store_c2'];
                scope.param['chart_arr'] = scope.chart_arr.join(',');
                scope.mod = '门市收客统计'; 

                angular.forEach(['company_id','department_id','employee_id'],function(field){
                    scope.stat_data_config[field] = s_regular[field];
                    scope.stat_data_config[field]['mod'] = scope.mod;
                });
                scope.f_field ='company_id';

                //横轴类型设置
                angular.forEach(['pd_tag_id'
                                ,'pd_subtag_id'
                                ],function(field){
                    scope.horizontal_axis[field] = scope.horizontal_axis[field]||s_regular[field];
                });

                //日期限定
                angular.forEach(['dep_date_from'
                                ,'dep_date_to'
                                ],function(field){
                    scope.date_filter[field] = s_regular[field]||{};
                });

            }

            scope.submit_histogram = submit_histogram;
            scope.submit_pie  = submit_pie;

            scope.edit_stat_data = edit_stat_data;
        }

        function doc_approve_stat(scope){
            $timeout(function() {
                scope.init();
            });
            scope.init = function(){ 
                var mod_cfg = $rootScope.mods['收支审批统计']||{};
                var s_regular = [];
                var s_regular = angular.copy(mod_cfg.s_regular);

                scope.horizontal_axis = {};
                scope.date_filter = {};
                scope.param = {mod:'收支审批统计'};
                scope.stat_data_config = {};

                scope.chart_type = '收支审批统计';
                scope.chart_arr = ['doc_c1']; 
                scope.param['chart_arr'] = scope.chart_arr.join(','); 
                scope.mod = '收支审批统计';
                angular.forEach(['company_id','department_id','employee_id'],function(field){
                    scope.stat_data_config[field] = s_regular[field];
                    scope.stat_data_config[field]['mod'] = scope.mod;
                });

                scope.f_field ='company_id';

                //横轴类型设置
                angular.forEach(['doc_type_id'
                                ,'employee_id'
                                ],function(field){
                    scope.horizontal_axis[field] = scope.horizontal_axis[field]||s_regular[field];
                });
                scope.horizontal_axis['approve_at_year'] = {};
                scope.horizontal_axis['approve_at_year']['text'] = '年';
                scope.horizontal_axis['approve_at_year']['type'] = 'year';

                scope.horizontal_axis['approve_at_month'] = {};
                scope.horizontal_axis['approve_at_month']['text'] = '月';
                scope.horizontal_axis['approve_at_year']['type'] = 'month';

                //日期限定
                angular.forEach(['approve_at_from'
                                ,'approve_at_to'
                                ],function(field){
                    scope.date_filter[field] = s_regular[field]||{};
                });

            }

            scope.submit_histogram = submit_histogram;
            scope.submit_pie  = submit_pie;

            scope.edit_stat_data = edit_stat_data;
        }

        function invoice_approve_stat(scope){
            $timeout(function() {
                scope.init();
            });
            scope.init = function(){ 
                var mod_cfg = $rootScope.mods['发票审批统计']||{};
                var s_regular = [];
                var s_regular = angular.copy(mod_cfg.s_regular);

                scope.horizontal_axis = {};
                scope.date_filter = {};
                scope.param = {mod:'发票审批统计'};
                scope.stat_data_config = {};

                scope.chart_type = '发票审批统计';
                scope.chart_arr = ['invoice_c1']; 
                scope.param['chart_arr'] = scope.chart_arr.join(','); 
                scope.mod = '发票审批统计';
                angular.forEach(['company_id','department_id','employee_id'],function(field){
                    scope.stat_data_config[field] = s_regular[field];
                    scope.stat_data_config[field]['mod'] = scope.mod;
                });

                scope.f_field ='company_id';

                //横轴类型设置
                angular.forEach(['invoice_type_id'
                                ,'employee_id'
                                ],function(field){
                    scope.horizontal_axis[field] = scope.horizontal_axis[field]||s_regular[field];
                });
                scope.horizontal_axis['approve_at_year'] = {};
                scope.horizontal_axis['approve_at_year']['text'] = '年';
                scope.horizontal_axis['approve_at_year']['type'] = 'year';

                scope.horizontal_axis['approve_at_month'] = {};
                scope.horizontal_axis['approve_at_month']['text'] = '月';
                scope.horizontal_axis['approve_at_year']['type'] = 'month';

                //日期限定
                angular.forEach(['approve_at_from'
                                ,'approve_at_to'
                                ],function(field){
                    scope.date_filter[field] = s_regular[field]||{};
                });

            }

            scope.submit_histogram = submit_histogram;
            scope.submit_pie  = submit_pie;

            scope.edit_stat_data = edit_stat_data;
        }

        function lend_invoice_offset_approve_stat(scope){
            $timeout(function() {
                scope.init();
            });
            scope.init = function(){ 
                var mod_cfg = $rootScope.mods['借票冲抵审批统计']||{};
                var s_regular = [];
                var s_regular = angular.copy(mod_cfg.s_regular);

                scope.horizontal_axis = {};
                scope.date_filter = {};
                scope.param = {mod:'借票冲抵审批统计'};
                scope.stat_data_config = {};

                scope.chart_type = '借票冲抵审批统计';
                scope.chart_arr = ['lend_invoice_offset_c1']; 
                scope.param['chart_arr'] = scope.chart_arr.join(','); 
                scope.mod = '借票冲抵审批统计';
                angular.forEach(['company_id','department_id','employee_id'],function(field){
                    scope.stat_data_config[field] = s_regular[field];
                    scope.stat_data_config[field]['mod'] = scope.mod;
                });

                scope.f_field ='company_id';

                //横轴类型设置
                angular.forEach(['invoice_type_id'
                                ,'employee_id'
                                ],function(field){
                    scope.horizontal_axis[field] = scope.horizontal_axis[field]||s_regular[field];
                });
                scope.horizontal_axis['approve_at_year'] = {};
                scope.horizontal_axis['approve_at_year']['text'] = '年';
                scope.horizontal_axis['approve_at_year']['type'] = 'year';

                scope.horizontal_axis['approve_at_month'] = {};
                scope.horizontal_axis['approve_at_month']['text'] = '月';
                scope.horizontal_axis['approve_at_year']['type'] = 'month';

                //日期限定
                angular.forEach(['approve_at_from'
                                ,'approve_at_to'
                                ],function(field){
                    scope.date_filter[field] = s_regular[field]||{};
                });

            }

            scope.submit_histogram = submit_histogram;
            scope.submit_pie  = submit_pie;

            scope.edit_stat_data = edit_stat_data;
        }

        function submit_histogram(){
            var scope = this;
            var start_date = new Date(scope.param.create_from);
            var end_date = new Date(scope.param.create_to);
            var start = start_date.getTime()/1000;
            var end = end_date.getTime()/1000;
            var interval = end - start;
            if(interval > 3600 * 24 * 30 * 3 || interval < 0) {
                CommSrvc.info(I18nSrvc.get('DATE_INTERVAL_ERROR'));
                return ;
            }
            angular.forEach(scope.chart_arr,function(chart_num){
                if(scope.chart&&scope.chart[chart_num]){
                    scope.chart[chart_num].clear();   
                }
                if(scope.slider&&scope.slider[chart_num]){
                    scope.slider[chart_num].clear();   
                }
            });
            AjaxSrvc.get('/stat/Stat/readChart/'+scope.chart_type,scope.param).then(function(data){
                scope.chart = scope.chart||{};
                scope.view = scope.view||{};
                scope.slider = scope.slider||{};

                angular.forEach(scope.chart_arr,function(chart_num){
                    //数据
                    if(!_.isEmpty(data['统计结果'])&&!_.isEmpty(data['统计结果'][chart_num])){
                        var y_text = data['y'][chart_num];
                        var stat_data = [];
                        var stat_data_index = {};
                        var horizontal_axis = scope.horizontal_axis[scope.param.group_by];
                        if(horizontal_axis.type){
                            if(horizontal_axis.type!='year'&&horizontal_axis.type!='month'){
                                angular.forEach(data['统计结果'][chart_num],function(item,key){
                                    stat_data.push({'x':EnumSrvc[horizontal_axis.type][item.hor_axis]||item.hor_axis,'y':item.result});
                                });
                            }else{
                                angular.forEach(data['统计结果'][chart_num],function(item,key){
                                    stat_data.push({'x':item.hor_axis,'y':item.result});
                                });
                            }
                        }else{
                            angular.forEach(data['统计结果'][chart_num],function(item,key){
                                stat_data.push({'x':item.hor_axis,'y':item.result});
                            });
                        }
                        angular.forEach(stat_data,function(item,key){
                            stat_data_index[item.x] = key;
                        });

                        var end_index = stat_data.length>10?9:stat_data.length-1;
                        var ds = new DataSet({
                          state: {
                            start: stat_data[0].x,
                            end: stat_data[end_index].x
                          }
                        });
                        var dv = ds.createView();
                        dv.source(stat_data)
                          .transform({
                            type: 'filter',
                            callback: obj => { 
                              return stat_data_index[obj.x] <= stat_data_index[ds.state.end] && stat_data_index[obj.x] >= stat_data_index[ds.state.start]; 
                            }
                        });

                        scope.chart[chart_num] = scope.chart[chart_num]||new G2.Chart({
                              container: chart_num,
                              forceFit: true,
                              height : 300,
                              title:true
                        });
                        scope.view[chart_num] = scope.chart[chart_num].view({
                          start: {
                            x: 0,
                            y: 0
                          },
                          end: {
                            x: 1,
                            y: 1
                          }
                        });
                        scope.view[chart_num].clear();
                        scope.view[chart_num].coord('rect'); 

                        //x轴
                        scope.view[chart_num].axis('x', {
                          title: {
                            textStyle: {
                              fontSize: 12, 
                              textAlign: 'center',
                              fill: '#999',
                            }
                          },
                          tickLine: {
                            lineWidth: 2,
                            length: 10,
                            stroke: 'red'
                          }
                        });
                        
                        scope.view[chart_num].scale('x', {
                          alias: horizontal_axis.text
                        });

                        //y轴
                        scope.view[chart_num].axis('y', {
                          title: {
                            textStyle: {
                              fontSize: 12, 
                              textAlign: 'center',
                              fill: '#999',
                            }
                          },
                        });

                        //x y
                        scope.view[chart_num].source(dv,{
                          'y': {
                            type: 'linear',
                            min: 0,
                            alias:y_text,
                          }
                        });
                        scope.view[chart_num].interval().position('x*y').color('x');
                        scope.chart[chart_num].render();

                        //slider
                        if(stat_data.length>1){
                            scope.slider[chart_num]&&scope.slider[chart_num].clear();
                            scope.slider[chart_num] = new Slider({
                              container: 'slider'+chart_num, 
                              start: stat_data[0].x,
                              end: stat_data[end_index].x,
                              data:stat_data, 
                              xAxis: 'x',
                              yAxis: 'y',
                              onChange: ({ startText, endText }) => {
                                ds.setState('start', startText);
                                ds.setState('end', endText);
                              }
                            });
                            scope.slider[chart_num].render(); 
                        }
 
                    }else{                          
                        CommSrvc.error(I18nSrvc.get('NO_RQ_DATA'));
                        return;
                    }
                });
            });
        }
        function submit_pie(){
            var scope = this;
            var start_date = new Date(scope.param.create_from);
            var end_date = new Date(scope.param.create_to);
            var start = start_date.getTime()/1000;
            var end = end_date.getTime()/1000;
            var interval = end - start;
            if(interval > 3600 * 24 * 30 * 3 || interval < 0) {
                CommSrvc.info(I18nSrvc.get('DATE_INTERVAL_ERROR'));
                return ;
            }
            angular.forEach(scope.chart_arr,function(chart_num){
                if(scope.chart&&scope.chart[chart_num]){
                    scope.chart[chart_num].clear();   
                }
                if(scope.slider&&scope.slider[chart_num]){
                    scope.slider[chart_num].clear();   
                }
            });
            AjaxSrvc.get('/stat/Stat/readChart/'+scope.chart_type,scope.param).then(function(data){
                scope.chart = scope.chart||{};
                angular.forEach(scope.chart_arr,function(item){
                    scope.chart[item] = scope.chart[item]||new G2.Chart({
                          container: item,
                          forceFit: true,
                          height : 300,
                          title:true
                    });  
                });

                angular.forEach(scope.chart_arr,function(chart_num){
                    //生成
                    if(!_.isEmpty(data['统计结果'])&&!_.isEmpty(data['统计结果'][chart_num])){
                        var stat_data = [];
                        var horizontal_axis = scope.horizontal_axis[scope.param.group_by];
                        var total = 0;
                        if(horizontal_axis.type){
                            if(horizontal_axis.type!='year'&&horizontal_axis.type!='month'){
                                angular.forEach(data['统计结果'][chart_num],function(item,key){
                                    stat_data.push({'item':EnumSrvc[horizontal_axis.type][item.hor_axis]||item.hor_axis,'result':parseFloat(item.result)});
                                    total +=+ item.result;
                                });
                            }else{
                                angular.forEach(data['统计结果'][chart_num],function(item,key){
                                    stat_data.push({'item':item.hor_axis,'result':parseFloat(item.result)});
                                    total +=+ item.result;
                                });
                            }
                        }else{
                            angular.forEach(data['统计结果'][chart_num],function(item,key){
                                stat_data.push({'item':item.hor_axis,'result':parseFloat(item.result)});
                                total +=+ item.result;
                            });
                        }
                        angular.forEach(stat_data,function(item){
                            item.percent = item.result/total;
                        });
                        scope.chart[chart_num].clear();
                        scope.chart[chart_num].source(stat_data, {
                          percent: {
                            formatter: function formatter(val) {
                              val = (val * 100).toFixed(2) + '%';
                              return val;
                            }
                          }
                        });
                        scope.chart[chart_num].coord('theta', {
                          radius: 0.75
                        });

                        //format
                        scope.chart[chart_num].intervalStack().position('percent').color('item').label('percent', {
                          formatter: function formatter(val, item) {
                            if(horizontal_axis.type!='year'&&horizontal_axis.type!='month'){
                                return item.point.item  + ': ' + val;
                            }else{
                                return item.point.item  + horizontal_axis.text+' '+ ': ' + val;
                            }
                            
                          }
                        }).tooltip('item*percent', function(item, percent) {
                          percent = (percent* 100).toFixed(2)  + '%';
                          return {
                            name: item,
                            value: percent
                          };
                        }).style({
                          lineWidth: 1,
                          stroke: '#fff'
                        });

                        scope.chart[chart_num].render();
                    }else{                          
                        CommSrvc.error(I18nSrvc.get('NO_RQ_DATA'));
                        return;
                    }
                });
            });
        }
        function edit_stat_data(info,f_field,mod){
            var scope = this;
            var cfg = {filter:{},spec:{}};
            cfg.f_field = f_field;
            cfg.cur_data = [];
            cfg.mod = mod;

            angular.forEach(info,function(info_cfg,field){
                cfg.spec[field] = [];
                cfg.filter[field] = info_cfg;
                if(scope.spec){
                    angular.forEach(scope.spec[field],function(item){
                        cfg.spec[field].push(item);
                    });
                }
            });
            if(scope.cur_data){
                angular.forEach(info,function(info_cfg,field){
                    if(scope.cur_data[field]){
                        cfg.cur_data[field] = scope.cur_data[field];
                    }
                });
            }
            
            var win = $uibModal.open({
              templateUrl: 'stat_limit.html',
              controller : 'ModalInstanceCtl',
              backdrop: false,
              resolve:{cfg:cfg}
            });

            cfg.submit = submit;
            function submit(){
                scope.cur_data ={};
                scope.spec = {};
                angular.forEach(info,function(info_cfg,field){
                    if(!_.isEmpty(cfg.spec[field])){
                        scope.spec[field] = angular.copy(cfg.spec[field]);
                        scope.param[field] = angular.copy(cfg.spec[field]).join(',');
                    }else{
                        delete  scope.param[field];
                    }
                    if(cfg.cur_data[field]){
                        scope.cur_data[field] = cfg.cur_data[field];
                    }
                });
                // 每次确定的时候,都要把当前数据保存,要不然点点点半天来个取消就哭了
                scope.selected_backup = scope.selected
                // 把数组变成字符串
                scope.select = ''
                for(let i = 0, len = scope.selected.length; i < len; i++){
                    scope.select = scope.select + " " +scope.selected[i].toString().replace(/,/g, '-')
                }
                // submit 显示 选中数据 div
                if(scope.selected.length){
                    scope.selectedShow = true
                }else{
                    scope.selectedShow = false
                }
                win.close();
            }

            cfg.cancelChange = cancelChange;
            function cancelChange(){
                // 把上一次保存的状态赋值成为当前状态,因为不知道用户有没有点了半天,来个取消,其实selected已经变了
                scope.selected = scope.selected_backup
                $uibModalInstance.dismiss('cancel');
            }

            cfg.set_spec = set_spec;
            function set_spec(field,key,value){
                cfg.cur_data[field] = key ; 
                var idx = cfg.spec[field].indexOf(key);
                if (idx === -1) {
                    cfg.spec[field].push(key);

                    cfg.spec[field] = _.uniq(cfg.spec[field]);
                }

                // // 拼接选择的选项 set_spec
                if(field === 'company_id'){
                    // selected 如果不为空
                    if(scope.selected.length > 0){
                        for(let i = 0, len = scope.selected.length; i < len; i++){
                            let selInd = scope.selected[i][0].indexOf(value)
                            if(selInd === -1){
                                scope.selComInd = -1
                            }else{
                                scope.selComInd = i;
                                break;
                            }
                        }
                        if(scope.selComInd === -1){
                            scope.selected.push([value])
                        }
                    }else{
                        scope.selComInd = -1
                        scope.selected.push([value])
                    }
                }else if(field === 'department_id'){
                    scope.selComInd = scope.selComInd !== -1 ? scope.selComInd : scope.selected.length - 1
                    scope.selDep = -1;
                    // 2级选项是否已经存在,已经存在scope.selDep为当前选项的下标
                    for(let i = 0, len = scope.selected[scope.selComInd].length; i < len; i++){
                        if(scope.selected[scope.selComInd][i].indexOf(value) !== -1){
                            scope.selDep = i
                        }
                    }
                    // 不存在的话 就 添加一个 2级选项 数组
                    if(scope.selDep === -1){
                        scope.selected[scope.selComInd].push([value])
                    }
                    console.log(scope.selected)
                }else{
                    // 如果不是新建的二级选项
                    if(scope.selDep !== -1){
                        // 去重 先判断是否存在,存在则不push进数组
                        if(scope.selected[scope.selComInd][scope.selDep].indexOf(value) === -1){
                            scope.selected[scope.selComInd][scope.selDep].push(value)
                        }
                    }else{
                        if(scope.selected[scope.selComInd][scope.selected[scope.selComInd].length - 1].indexOf(value) === -1){
                            scope.selected[scope.selComInd][scope.selected[scope.selComInd].length - 1].push(value)
                        }
                    }
                }
                console.log(scope.selected)
            }
            cfg.delete_spec = delete_spec;
            function delete_spec(field,key,value){
                if(cfg.cur_data[field] && cfg.cur_data[field] == key){
                    delete cfg.cur_data[field];
                }

                var idx = cfg.spec[field].indexOf(key);
                if (idx > -1) {
                    cfg.spec[field].splice(idx, 1);
                }

                // 删除选中  delete_spec
                if(field === 'company_id'){
                    console.log(scope.selected)
                    for(let i = 0, len = scope.selected.length; i < len; i++){
                        if(scope.selected[i][0].indexOf(value) !== -1){
                            console.log(scope.selected[i])                
                            delete scope.selected[i]
                            scope.selected.length = scope.selected.length - 1
                            break;
                        }
                    }
                    console.log(scope.selected)
                }else if(field === 'department_id'){
                    for(let i = 0, len = scope.selected.length; i < len; i++){
                        let flag = false
                        for(let j = 1, l = scope.selected[i].length; j < l; j++){
                            if(scope.selected[i][j][0].indexOf(value) !== -1){
                                delete scope.selected[i][j]
                                scope.selected[i].length = scope.selected[i].length - 1
                                flag = true
                                break;
                            }
                        }
                        if(flag) break;
                    }
                }else{
                    for(let i = 0, len = scope.selected.length; i < len; i++){
                        let flag = false
                        for(let j = 0, l = scope.selected[i].length; j < l; j++){
                            console.log(value)
                            console.log(scope.selected[i][j])                            
                            if(scope.selected[i][j].indexOf(value) !== -1){
                                console.log(scope.selected[i][j])
                                delete scope.selected[i][j].splice(scope.selected[i][j].indexOf(value),1)
                                console.log(scope.selected[i][j])
                                flag = true
                                break;
                            }
                        }
                        if(flag) break;
                    }
                }
                console.log(scope.selected)
                // end

                switch(cfg.filter[field].type){
                    case 'Company':
                        var i = get_index(cfg.mod,field);

                        var _cfg_dep = {};
                        _cfg_dep[field] = key;
                        var del_dep = $rootScope.get_enum(cfg.filter[get_field(mod,i+1)].type,_cfg_dep);
                        angular.forEach(del_dep,function(dep,dep_key){
                            var idx_dep = cfg.spec[get_field(mod,i+1)].indexOf(dep_key);
                            if(idx_dep > -1) {
                                cfg.spec[get_field(mod,i+1)].splice(idx_dep, 1);
                            }
                            var _cfg_emp = {};
                            _cfg_emp[get_field(mod,i+1)] = dep_key;

                            var del_emp = $rootScope.get_enum(cfg.filter[get_field(mod,i+2)].type,_cfg_emp);
                            angular.forEach(del_emp,function(emp,emp_key){
                                var idx_emp = cfg.spec[get_field(mod,i+2)].indexOf(emp_key);
                                if(idx_emp > -1) {
                                    cfg.spec[get_field(mod,i+2)].splice(idx_emp, 1);
                                }
                            })
                        });

                        delete cfg.cur_data[get_field(mod,i+1)];
                        delete cfg.cur_data[get_field(mod,i+2)];

                        break;
                    case 'Department':
                        var i = get_index(cfg.mod,field);

                        var _cfg_emp = {};
                        _cfg_emp[field] = key;

                        var del_emp = $rootScope.get_enum(cfg.filter[get_field(mod,i+1)].type,_cfg_emp);
                        angular.forEach(del_emp,function(emp,emp_key){
                            var idx_emp = cfg.spec[get_field(mod,i+1)].indexOf(emp_key);
                            if(idx_emp > -1) {
                                cfg.spec[get_field(mod,i+1)].splice(idx_emp, 1);
                            }
                        })

                        delete cfg.cur_data[get_field(mod,i+1)];
                        break;
                    case 'Employee':
                        break; 
                }
            }

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
})();