(function() {
    'use strict';

    angular
    .module('app')
    .factory('I18nSrvc', I18nSrvc);

    I18nSrvc.$inject = ['$window','$rootScope'];
    function I18nSrvc($window,$rootScope) { 

        $rootScope.lang = localStorage.lang || 0;
        $rootScope.set_lang = set_lang;
        $rootScope.pick = pick;

        var c = {
            //菜单
            'NAV':['导航','Navigation'],
            'HOME':['首页','Home'],
            'SHORTCUT':['快捷导航','Shortcut'],
            'MESSAGE':['消息通知','Message'],
            'ANNOUNCE':['公告中心','Announce'],
            'APPROVAL':['审批任务','Task'],
            'LOGOUT':['退出','Logout'],
            'CHANGE_PW':['修改密码','Change Password'],
            'CLOSE_MSG':['关闭消息','Close Messages'],
            'ACTION':['操作','Action'],
            'LOGO':['logo','logo'],
            'SHARE_ICON':['分享图标','share icon'],
            'SET_THEME':['设置皮肤','set theme'],
            //通用
            'ERR_REQ':['请求失败','Request Failed'],
            'ERR_SYS':['系统错误','System Error'],
            'ERR_NW':['网络连接失败','network connect failed'],
            'ERROR':['错误','Error '],
            'INFO':['系统提示','Information '],
            'OK':['确定','OK'],
            'CANCEL':['取消','cancel'],
            'DESCRIPTION':['描述信息','Description'],
            'SEL_ITEM':['请选择项目','Please select item'],
            'SAVE':['保存','Save'],
            'SAVE_SUC':['保存成功','save success'],
            'MORE':['更多','More'],
            'NO_ID':['数据无标识','Data without identity'],
            'NO_RELETED_DOC':['没有相关联的单据','Related document lost'],
            'FLIGHT':['航班','flight'],
            'SEL':['选择','select'],
            'DAY':['天','days '],
            'TH':['号','th day '],
            'FLOW_WAIT':['等待审批', 'is waiting approval '],
            'APPROVE':['审批', 'approve '],
            'RESET':['重置', 'reset '],
            'FLOW_FORBID':['审批状态不匹配该操作', 'approval state error '],
            'TOTAL':['小计','total'],
            'UPLOAD':['上传','upload'],
            'DOWNLOAD':['下载','download'],
            'SUBMIT_APPR':['提交审批','submit approval'],
            'EMPTY':['为空','is empty'],
            'TYPE':['类型','type'],
            'OBJ':['对象','object'],
            'EMPLOYEE':['员工','employee'],
            'DEPARTMENT':['部门','department'],
            'LOGIN_NAME':['登录名','user name'],
            'BEFORE':['修改前','before change'],
            'AFTER':['修改后','after change'],
            'DEL_CONFIRM':['确认删除吗？','Are you sure to delete it?'],
            'REVOKE_CONFIRM':['确认撤销审批吗?','Are you sure to revoke it?'],
            'REVOKE_GROUP_CONFIRM':['确认撤销团队吗？','Are you sure to revoke group?'],
            'CANCEL_CONFIRM':['确认撤回吗？','Are you sure to recall it?'],
            'RESTORE_CHANGE_CONFIRM':['确认还原变更吗?','Are you sure to restore this change?'],
            'REVOKE_ASSOCIATE_CONFIRM':['确认撤销关联吗?','Are you sure to revoke associate ?'],
            'WRITE_OFF_CONFIRM':['确认进行核销吗?','Are you sure to write off this contract'],
            'ABOLISH_CONFIRM':['确认作废吗？','Are you sure to abolish?'],
            'TODAY':['今日','today'],
            'PLEASE_CHOOSE':['请进行选择','please choose'],
            'ADD_BATCH':['批量添加','add batch'],
            'ADD_COSTOM':['新增','add'],
            'SUBMIT':['提交','submit'],
            'REFRESH':['刷新','refresh'],
            //登录
            'REGISTER':['注册','register'],
            'USER_LOGIN':['用户登录','User Login'],
            'LOGIN':['登录','Login'],
            'ACCOUNT':['账号','Account'],
            'PASSWORD':['密码','Password'],
            'ENTERP_NAME':['企业简称','Enterprise Name'],
            'VERIFICATION_CODE':['验证码','Verification Code'],
            'LOGIN_TO':['登录超时','Login Timeout '],
            'AUTO_LOGOUT':['小时无操作自动退出','hours later, auto logout '],

            //流程
            'CANT_SPECIFY': ['该角色不可指定', 'this role can not specify'],

            //权限
            'VISIABLE_DATA':['可见数据','Visiable Data '],
            'UN_LMT':['无限制','Unlimited'],
            'SPEC_LMT':['限指定','Specified'],
            'SELF_LMT':['限本人','Self Limited'],
            'AUTH':['权限','auth'],
            'SEE_SELF_LMT':['只看本人','see self limited'],

            //设置
            'SHARE_CONTACT':['共享联系人','Share Contacts'],
            'ID_CARD_APPCOADE':['身份证识别密钥','id card appcode'],


            //行政
            'LEAVE_APPL':['请假申请','leaving application '],
            'CONT_STATE_ERR':['合同状态不匹配该操作','contract state error '],
            'APPID':['画个押APPID','hua ge ya APPID '],
            'APPSECRECT':['画个押APPSECRECT','hua ge ya APPSECRECT '],
            
            //票务
            'TRAN_NUM':['调用数量','Transfer Number'],
            'TRAN_GRP':['分配团队','Transfer Group'],

            //订单
            'SUPPLIER':['供应商','supplier'],
            'CONTACT':['对接人','contact'],
            'MOBILE':['手机','mobile'],
            'SEL_SAME_CSTM':['请选择同一客户','please select same customer'],
            'NO_PAY_PERIOD':['客户账期未设置','customer does not set payment period '],
            'ADD_VISITOR_BATCH': ['批量增加游客(人)','Batch increase visitors'],
            'RET_PERIOD_NOT_ASSIGNED':['客户未设定账期，无法报名','The customer has not set an account period and can not sign up'],
            'SEL_CSTM':['请选择客户','select customer'],
            'SEL_ASSITANT':['请选择接单人','select assitant'],
            'ORDER_TOURIST_LOCK':['名单锁定','order tourist lock'],
            //发票
            'TITLE_INV':['抬头','title'],
            'AMOUNT':['金额','amount'],
            'INVOICE_ID':['系统编号','system number'],
            'INVOICE_STATE':['发票状态','invoice state'],
            'INVOICE_NUM':['发票编号','invoice number'],
            'INVOICE_DATE':['开票日期','invoice date'],
            'INVOICE_TITLE':['发票抬头','invoice title'],
            'COMMENT':['备注','comment'],
            'INVOICE_RECORD':['发票记录','invoice record'],
            'INVOICE_TYPE':['发票类型','invoice type'],

            //统计
            'PARAM_SET': ['参数设置','parameter'],
            'HOR_AXIS':['横轴类型','Horizontal axis'],
            'VIR_AXIS':['纵轴类型','Vertical axis'],
            'CHART_SET':['图表设置','chart setting'],
            'SERIES':['系列','series'],
            'CONTRAST':['纵轴对比','contrast'],

            //产品模块
            'PRODUCT':['产品','product'],
            '行程详情':['行程详情','itinerary detail'],
            '第':['第',' '],
            '天':['天','day'],
            '产品图片':['产品图片','product picture'],
            '选择图片':['选择图片','select picture'],
            '新增图片':['新增图片','add picture'],
            '上传相册':['上传相册','upload picture'],
            '删除图片':['删除图片','delete picture'],
            '图片名称':['图片名称','picture name'],
            'MIS_PD_NAV':['缺少产品导航','miss product navigation'],
            'MIS_PD_TAG':['缺少产品大类','miss product tag'],
            'MIS_PD_SUBTAG':['缺少产品小类','miss product subtag'],
            //产品行程
            '标题' :['标题','title'],
            '午餐' :['午餐','lunch'],
            '早餐' :['早餐','breakfast'],
            '晚餐' :['晚餐','dinner'],
            '用餐情况' :['用餐情况','eat'],
            '交通信息' :['交通信息','traffic'],
            '酒店住宿' :['酒店住宿','hotel·'],
            '景点' :['景点','scenery'],
            '增加行程':['增加行程','add itinerary'],
            '删除行程':['删除行程','delete itinerary'],
            //开团预算
            'SEAT_TOTAL':['库存位','seat total'],
            'SEAT_PLAN':['计划位','seat plan'],
            'PEER_PRICE':['同行价','peer price'],
            'ZK_PRICE':['直客价','zk price'],
            'SEL_PRODUCT': ['请选择产品','please select product'],
            'GROUP_STATE':['团态','state'],
            'DEP_DATE':['出团日期','departure date'],
            'BACK_DATE':['回团日期','back date'],
            'CLOSE_DATE':['出团前天数','number of days before departure'],
            'PRODUCT_ID':['产品编号','product number'],
            '修改': ['修改','modify'],
            '结团总览':['结团总览','group settlement'],
            '团队名单':['团队名单','group tourist'],
            '团队交通':['团队交通','group traffic'],
            '签证信息':['签证信息','group visa'],
            '保险信息':['保险信息','group insure'],
            '团队日志':['团队日志','group log'],
            'START_DATE':['开始日期','start date'],
            'END_DATE':['结束日期','end date'],
            //领队订单
            'CREATE_LEADER_ORDER':['是否创建领队订单','Whether to create a leader order'],

            //财务
            //'SALE_DOC': ['销售单据','sale doc'],
            //'OP_DOC': ['计调单据','op doc'],
            'DOC_TYPE':['单据类型','doc type'],
            'DOC_TYPE_ERR':['单据类型错误','doc type error'],
            'SEL_SAME_SUPP':['选择相同供应商','please select same supplier'],
            'SEL_SAME_INVOICE_TITLE':['选择相同的发票抬头','please select same invoice title'],
            'PREVIEW':['预览','preview'],
            'EXPORT_PAGE':['导出分页','export page'],
            'REQUIRED':['必填项','required'],
            'OPTIONAL':['可选项','optional'],
            'KEY_WORD':['关键字','key word'],
            'DEP_DATE_FROM':['出团日期起','departure date from'],
            'DEP_DATE_TO':['出团日期止','departure date to'],
            'SIGN_COMPANY':['报名公司','sign company'],
            'SIGN_DEPARTMENT':['报名部门','sign department'],
            'SIGN_EMPLOYEE':['报名人','sign employee'],
            'ASSITANT_COMPANY':['接单公司','assitant company'],
            'ASSITANT_DEPARTMENT':['接单部门','assitant department'],
            'ASSITANT_EMPLOYEE':['接单人','assitant employee'],
            'PD_TYPE':['产品类型','product type'],
            'DEP_CITY':['出发地','departure city'],
            'DEBT':['欠款','debt'],
            'GROUP_NUM':['团号','group number'],
            'ORDER_ID':['订单号','order number'],
            'RETAIL_SHORT_NAME':['报名客户','retail short name'],
            'MANAGE_COMPANY':['控团公司','manage company'],
            'MANAGE_DEPARTMENT':['控团部门','manage department'],
            'MANAGE':['控团人','manage'],
            'ACC_COMPANY':['核算公司','accounting company'],
            'ACC_DEPARTMENT':['核算部门','accounting department'],
            'ACC_EMPLOYEE':['核算人','accounting employee'],
            'ACC_ID':['核算编号','accounting number'],
            'SETTLE_OBJ':['结算对象','settle object'],
            'REQUIRED_ADN_KEY_WORD_EMPTY':['必填项和关键字不能同时为空','required and key word can not be empty at same time'],

            'REQUIRED_EMPTY':['必填项不能为空','required can not be empty'],
            'REQUIRED_START':['开始页数不能大于结束页数','The beginning of the page number cannot be greater than the end of the page number'],
            'REQUIRED_OVER':['页数超出总页数','The number of pages is beyond the total number of pages'],
            'REQUIRED_ROLE':['填写的页数需大于0','The number of pages should be greater than 0'],
            'REQUIRED_POSITIVE_NUMBER':['请输入正整数','Please enter a positive integer.'],
            'REQUIRED_LIMIT_100':['因流量限制,最多允许导出100页,请缩小导出页数范围','Due to limitation of delivery, you can export up to 100 pages at most, Please narrow the number of exported pages'],
            'REQUIRED_LIMIT_50':['因流量限制,最多允许导出50页,请缩小导出页数范围','Due to limitation of delivery, you can export up to 50 pages at most, Please narrow the number of exported pages'],
            'REQUIRED_LIMIT_25':['因流量限制,最多允许导出25页,请缩小导出页数范围','Due to limitation of delivery, you can export up to 25 pages at most, Please narrow the number of exported pages'],

            'DATE_INTERVAL_ERROR':['日期填写有误,日期间隔不可超过90天','Date is incorrect,The date interval can not bigger than 90 days'],
            'DOC_COMPANY':['制单公司','creator company'],
            'DOC_DEPARTMENT':['制单部门','creator department'],
            'DOC_EMPLOYEE':['制单人','creator'],
            'SYS_NUM':['系统编号','system number'],
            'FINANCE_NUM':['财务编号','finance number'],
            'SETTLE_AMOUNT':['结算金额','settle amount'],
            'SUBMIT_FROM':['提交时间起','submit at from'],
            'SUBMIT_TO':['提交时间止','submit at at'],
            'SETTLE_DATE_FROM':['结算时间起','settle date to'],
            'SETTLE_DATE_TO':['结算时间止','settle date from'],
            'APPROVED_AT_FROM':['过审时间起','approved at from'],
            'APPROVED_AT_TO':['过审时间止','approved at to'],
            'FLOW':['审批状态','flow'],
            'INCOME_TOTAL':['收入总计','income total'],
            'TOTAL_EXPENDITURE':['支出总计','total expenditure'],
            'CURRENT_BALANCE':['时时余额','current balance'],
            'FREEZING_BALANCE':['冻结余额','freezing balance'],
            'AVAILABLE_BALANCE':['可用余额','available balance'],
            'DEDUCT_AMOUNT':['扣款金额','deduct amount'],
            //
            'TRANSFER':['调用','transfer'],
            'VISA':['送签','visa'],
            'INSURE':['保险','insure'],
            'INSURANCE_DOWNLOAD_ADD_EPY':['保单下载地址为空','insurance download address is empty'],

            //成本管理
            'ACCOUNTING_TYPE_ERROR':['未知核算类型','accounting type error'],

            //客户
            '直客':['直客','direct sales'],
            '电商':['电商','ota'],
            '同业':['同业','retailer'],
            'EMPTY_AFF_CONFIRM':['将去关联总社下级机构，确认操作吗？','this will no longer associated the affiliates with this head,are you sure to do this?'],
            //
            'SHARE':['共享','share'],
            'NOSHARE':['不共享','not share'],
            'SHARE_MAN':['共享人','share man'],
            //公告
            'CONTEXT':['内容','context'],
            'ANNOUNCE_COMPANY':['发布公司','announce company'],
            'ANNOUNCE_DEPARTMENT':['发布部门','announce department'],
            'ANNOUNCE_EMPLOYEE':['发布人','announce employee'],
            'ANNOUNCE':['公告','ANNOUNCE'],
            //结团
            'SETTLE_CONFIRM':['确认提交结团吗?','Are you sure to settle group'],
            'SETTLE_FLOW':['结团审批','settle flow'],
            'PD_NAME':['产品名称','product name'],
            'ORDER_LOCK':['订单锁定','order lock'],
            'ACC_LOCK':['核算锁定','accounting lock'],
            'LOCKED':['锁定','lock'],
            'UNLOCKED':['解锁','unlocked'],
            'ORDER_LIST_IS_LOCKED':['订单名单已经是锁定状态！','the order list is already locked'],
            'ORDER_LIST_IS_UNLOCKED':['订单名单已经是解锁状态','the order list is already unlocked'],
            'ONLY_CHOOSE_THE_SAME_SUPPLIER_AND_EMPLOYEE_GROUP':['只能选择同一供应商，同一开团人的团','You can only choose the same supplier, the same team members'],
            //订单占位
            'CUR_RESERVE':['当前设定','current reserve time limit'],
            'NEW_RESERVE':['本次设定','new reserve time limit'],
            'NOTICE_RESERVE':['提醒设定','notice reserve time limit'],
            'NOTICE_TIME':['提醒时间','notice time'],
            'NOTICE_TIMER_ERR':['提醒时间设定有误','notice timer error'],
            'RESERVE_TIMER':['占位时限','reserve timer'],
            'PAY_TIMER':['付款时限','pay timer'],
            'SUP_BANK_ACCOUNT_EMPTY':['供应商未设置银行账户，请手动填写','supplier have not set bank account ,please write'],
            //业务设置
            'DATA_TYPE':['数据类型','data type'],
            'NAME':['名称','name'],
            'INSURE_COUNTRY':['投保国家','insure company'],
            'END_TIME_BIGGER_THAN_NOW':['到期时间应晚于当前时间','end time must be later than now'],
            'END_TIME_BIGGER_THAN_NOTICE_TIME':['提醒时间应该早于到期时间','end time must later than notice time'],
            'END_TIMER_ERR':['输入正确的结束时间','input end time correctlly'],
            'PAY_AMOUNT_LIMIT_ERR':['付款金额限制必须大于0','pay amount limit must bigger than zero'],
            'PAY_AMOUNT_LIMIT':['金额限制','pay amount limit'],
            'FILE':['文件','file'],
            'CREATE_TIME':['时间','time'],
            'CREATOR':['创建人','creator'],
            'MSG':['消息','message'],
            'REPLACE_NUMBER':['替换人数','number of replace people'],
            'SALE_COMMENT':['售卖说明','sale comment'],
            'OP_COMMENT':['计调备注','op comment'],
            'GROUP_TOURIST_EMPTY':['团队游客为空','group tourists is empty'],
            'GIVE_WAY_ORDER':['让位订单','give way order'],

            'CALC_DISCOUNT':['启用协议价','enable discount'],
            'NOCALC_DISCOUNT':['停用协议价','disable discount'],
            'ID_CARD':['身份证','id card'],
            'PASSPORT':['护照','passport'],
            'TW_PASSPORT':['台证','tw passport'],
            'HK_PASSPORT':['港证','hk passport'],
            'OPEN_IN_NEW_WIN':['在新窗口打开','open in new window'],
            'PAYBACK_REMIND_DATE':['回款提醒:提前','payback remind ：in advance'],
            'RETURN_TICKET':['回票设置','Return ticket'],

            //上架
            'ON_SHELF_CONFIRM':['确认上架吗？','are you sure to on shelf?'],
            'SET_SETTLE_OBJ':['选择结算对象','select settle obj'],
            'PASS_CONFIRM':['确认通过吗？','are you sure to pass?'],
            'REJECT_CONFIRM':['确认驳回吗？','are you sure to reject'],
            'UNDER_SHELF_CONFIRM':['确认下架吗？','are you sure to under shelf'],
            'ORDER_IS_EXISTING':['订单已经存在,无法下架','The existing order is unable to under shelf'],
            'SUBMIT_CONFIRM':['确认提交吗？','are you sure to submit?'],
            'SEND_MSG_CONFIRM':['确认发送短信？','are you sure to submit?'],
            'CANCEL_ELCCONTRACT_CONFIRM':['确定撤回合同吗？','are you sure to cancel elccontract'],
            'ABOLISH_ELCCONTRACT_CONFIRM':['确定作废合同吗？','are you sure to abolish elccontract'],
            'CLOSE_INQUIRY_CONFIRM':['确认关闭询单吗?','are you sure to close this inquiry?'],
            'OLD_MANAGER_ID':['原控团人','old manager'],
            'NEW_MANAGER_ID':['新控团人','new manager'],
            'REQUIRED_FILED_EMPTY':['必填字段不能为空','require field can not be empty'],
            'CLOSING_DATE':['批量截止日期','close_date'],
            'BATCH_PLANNING':['批量计划','batch planning'],
            'BATCH_INVENTORY':['批量库存','Batch inventory'],
            'BATCH_GROUP_BENCHMARK':['批量成团基准','Batch group benchmark'],            
            'ORDER_CONFIRM_WAY':['报名确认','order confirm way'],
            'GROUP_WAY':['团组类型','group way'],
            'BATCH_REMARK':['批量备注','batch remark'],
            'PD_GROUP_TYPE':['请选择你要新增的团期类型','add group period'],
            'GROUP_TYPE':['选择团期类型','group_type'], 
            'SEL_SAME_SETTLE_GROUP_MANAGE':['可选的控团人不一致','Optional regiment disagreement'],           
            //销售
            'CSTM':['客户','customer'],
            'NUM_OF_PEOPLE':['人数','number of people'],
            'MISS':['缺少','miss'],
            'SEL_SETTLE_OBJ':['请选择结算对象','please select settle object'],
            'EXIT_SAME_SETTLE_OBJ_ACC':['存在结算对象相同的核算,请直接修改原核算 或者选择其他结算对象',
                                    'exit same settle object accounting,please select the other settle obj'],
            //FLOW
            'INVALID_COND':['无效的条件','invalid condition'],

            'ACC_FLOW_NOT_ALLOW_SEL_SETTLE_OBJ':['核算审批状态不允许修改结算对象','accounting flow not allow to edit settle object'],
            'DOC_COMMENT':['单据备注','doc comment'],
            'SEL_SAME_SETTLE_OBJ':['选择相同结算对象','select same settle object'],

            'CONTRACT_TYPE':['合同类型','contract type'],
            'CONTRACT_TYPE_ERR':['合同类型错误','contract type error'],
            'GROUP_PRICE_TYPE_MUL':['参团费用中存在重复的价格类型','type of group price repeat error'],
            'OTHER_FEE_TYPE_MUL':['其他费用中存在重复的费用类型','other fee type repeat error'],
            'ERR_LIMIT_TYPE':['错误的时限类型','limit type error'],
            'CLAIM_CONFIRM':['确认认领吗?','claim confirm'],
            'FORMULA_TYPE':['公式类型','formula type'],
            'COMP_COND':['< 汇款金额 ≤','< settle amount ≤'],
            'FEE':['手续费','fee'],
            'COMP_INC':['< 汇款金额 ,每递增','< settle amount , increment'],
            'FEE_INC':['手续费递增','fee increment'],
            'FORMULA':['计算公式','formula'],
            'INVAILD_FORMULA_TYPE':['未知公式类型','invalid formula type'],
            'CURRENCY':['适用币种','currency'],
            'APPLICABLE_CURRENCY':['适用币种','applicable currency'],

            //资金
            'INVALID_EXCEL':['无效的文件','invalid excel '],
            'EXIST_INVALID_NUMBER':['存在非法字符','exist invalid number'],
            'ROW':['行','row'],
            'DEPARTMENT_CODE_ERROR':['部门编号错误','depaertment_code_error'],
            'BUSSINESS_TYPE_EDITABLE':['业务类型是否可选','bussiness type editable'],
            'IS_NON_ACCOUNT':['是否为非认领方式','is non account type'],
            'IS_E_INVOICE':['是否设为电子票','is e_invoice'],
            //余额设置
            'BALANCE_CHECK':['余额提醒','balance CHECK'],
            'RMB':['人民币','rmb'],
            //
            'EMPLOYEE_COMP':['所属中心','employee company'],
            'EMPLOYEE_DEP':['所属部门','employee depaertment'],
            'SUPP_FULL_NAME':['供应商全称','supplier full name'],
            'SUPP_SHORT_NAME':['供应商简称','supplier short name'],
            'EMPLOYEE_NAME':['姓名','name'],
            //参团模板
            'TOURIST_TEMPLATE':['参团模板','tourist template'],
            'REQUIRED_EMPTY_SEARCH_FUND':['必填字段不能为空(到账日起,到账日止,币种)','required field can not be empty '],
            'REMITTER_AND_AMOUNT_CANT_EMPTY_AT_SAME_TIME':['汇款方与到账金额不能同时为空','remitter and amount can not be empty at same time'],
            'RETURN_FUND_CONFIRM':['确认退回吗？','are you sure to return fund'],
            'REF_DOC':['关联单据','ref doc'],
            'REF_TZ_DOC':['关联调整单据','ref tz doc'],
            'REF_INVOICE':['关联发票','ref invoice'],
            'MISS_CON':['缺少条件','miss condition'],
            'DEPARTMENT_CODE':['部门编号','department code'],
            'VALID_VALUE':['有效值','valid value'],
            //事件日程
            'SCHEDULE_TITLE':['日程标题','schedule title'],
            'SCHEDULE_INFO':['日程内容','schedule info'],
            'MISS_SCHEDULE_TITLE':['缺少日程标题','miss schedule title'],
            'MISS_SCHEDULE_INFO':['缺少日程内容','miss schedule info'],
            'SCHEDULE_TIMER_ERR':['待办时间错误','schedule time error'],
            'SCHEDULE_TIMER_BIGGER_THAN_NOW':['待办时间应晚于当前时间','schedule time should late than now'],
            'SCHEDULE_TIME_BIGGER_THAN_NOTICE_TIME':['提醒时间应当早于待办时间','notice time should ealier than schedule time'],
            'CLSOE_SCHEDULE_CONFIRM':['确认关闭日程吗？','are you sure to close schedule'],
            'RESET_PASSWORD':['重置密码','reset password'],
            'ORDER_PAYABLE_TOTAL':['订单应付总计','order payable total'],
            'ORDER_ACCOUNTING_TOTAL':['订单核算总计','order accounting total'],
            'PD_RELEASE':['进入发布','product release'],
            'PD_TEMPLATE':['通用模板','product template'],
            'PD_TEMP_TYPE_ERR':['产品模板类型错误','product template type error'],
            'ARE_YOU_SURE_UPLOAD_ORDER_TEMP':['名单模板必须使用系统设定模板，请确认您当前要上传的EXCEL名单表是否为系统设定模板','are you sure upload order template?'],
            'SEL_SAME_ACC_TYPE':['请选择相同的核算类型','select same accounting type'],
            'SETTLEABLE':['应转','settleable'],
            'SETTLED':['已转','settled'],
            'SETTLE_DIFF':['未转','settle diff'],
            'ELC_KK_DEPARTMENT':['电子合同扣款部门','elccontract chargeback department'],
            'ELC_KK_EMPLOYEE':['电子合同扣款人','elccontract chargeback employee'],
            'ELC_KK_AMOUNT':['电子合同扣款金额','elccontract chargeback amount'],
            'MISS_PRODUCT_PIC':['缺少产品图片','miss product picture'],
            'ORDER_RELATED_CONTRACT_CANT_CHANGE':['订单已关联合同不能变更'
                              ,'order related contract can not change'],
            'YOU_HAVE_NOT_BIND_PD_TAG':['您未绑定产品分类，无法进行当前操作','you have not bind product tag'],
            'PLEASE_SELECT_PICTURE':['请选择图片','please select picture'],
            'NO_INVOICE_TITLE_ADD':['您未添加过发票抬头','no invoice title add'],
            'MANUALLY_DISCOUNT_BIGGER_THAN_ZERO':['手动优惠必须大于零','manually discount bigger than zero'],
            'SEARCH_CONDTION_CANT_EMPTY':['搜索条件不能为空','search condition cant empty'],
            'ORDER_TOURIST_NUM':['订单游客人数','order tourist number'],
            'ORDER_SELLTEABLE_TOTAL':['订单应转总计','order settleable total'],
            'SEL_SAME_DEPARTMENT_ACC':['请选择相同部门的核算'
                                      ,'select same depaertment accounting'],
            'IS_REMITTANCE_RQ':['汇款方名称必填','is remittance required'],
            'COUNTRY_CITY_REQ':['是否必填国家城市','Country and city required'],
            'EXCLUDE_GROUP':['排除控团人','exclude group'],
            'ONE_BRANCH_TYPE_ONE_COND':['同一种触发类型只能设置一个条件','one branch type one condition'],
            'YW_NZ_ACC_LIMIT':['当前操作人部门必须是核算制单部门或者核算结算部门'
                              ,'current depaertment must be acc making department or settle depaertment'],
            'INVOICE_TITLE_CHECK_INFO':['当前发票申请汇款方名称不一致！是否确认通过？','invoice title check error info'],
            'INVOICE_TITLE_REMITTER_DIFF_ERR':['发票抬头与汇款方名称不一致！请联系财务进行销票','The invoice name is not the same as the name of the remittance party! Please contact Finance to sell your ticket'],
            'LOCK_ORDER_CONFIRM':['确认锁定订单吗?','lock order confirm'],
            'UNLOCK_ORDER_CONFIRM':['确认解锁订单吗?','unlock order confirm'],
            'PLS_SELECT_INVOICE_TYPE':['请先选择发票类型','please select invoice type'],
            'ORDER_YW_NZ_ACC_IS_NOT_ADD':['该订单存在变更待定数据 或者优惠待定数据，无法内转','The order acc is no add'],

            'SELECT_FILTER':['多选项','SELECT'],
            'DEDUCT_COMMENT':['扣款说明','deduct comment'],
            'PIC_POS_ERR':['如您想在轮播大图或分类行条处展示本产品 ，那么请上传相应的展示图片','If you would like to display this product on the rotation map or the classification line, please upload the corresponding display image'],
            'ENABLE_POP_MSG':['启用弹窗','enable pop msg'],
            'DISABLE_POP_MSG':['停用弹窗','disable pop msg'],
            'ONLY_CAN_ONE_RECORD':['只能选择一条记录','only can select one record'],
            'PD_TAG':['产品大类','product tag'],
            'DATE_LIMIT':['日期限制','date limit'],
            'STAT_DATA':['统计数据','stat data'],
            'SELECT_STAT_DATA':['选择统计数据','select stat data'],
            'NO_RQ_DATA':['没有符合要求的数据','no meet the requirements of the data'],
            'SELECTED DATA':['已选数据','selected data']
        };


        var service = {
            get: get,
            pick: pick,
        };
        return service;

        function set_lang(l){
            localStorage.lang = l;
            $window.location.reload();
        }

        function get(code){
            return c[code][$rootScope.lang];
        }

        function pick(str){
            var arr = str.split('$$');
            if(arr.length>1){
                return arr[$rootScope.lang]; 
            }
            return str;
        }

    }

})();