(function() {
    'use strict';

    angular
    .module('app')
    .factory('EnumSrvc', EnumSrvc);

    EnumSrvc.$inject = ['appConst','$rootScope'];
    function EnumSrvc(appConst,$rootScope){

        $rootScope.get_enum = get_enum;

        var i = localStorage.lang || 0; 
        var e = {
            Dict:{
                //公共
                1:['国家','country'][i],
                2:['城市','city'][i],
                // 3:['相册','album'][i],
                //组织行政
                10:['职位','title'][i],
                11:['学历','education'][i],
                15:['请假类型','leave type'][i],
                16:['合同类型','contract type'][i],
                17:['投诉类型','complaint type'][i],
                //产品
                34:['游玩主题','product theme'][i],


                //操作
                41:['团费类型','group price type'][i],
                42:['送签领区','send district'][i],
                43:['领队类型','leader type'][i],
                //44:['其他费用','other fee'][i],
               
                //财务
                80:['结算项目','settlement item'][i],

                83:['结算方式','settlement way'][i],
                84:['结算银行','settlement bank'][i],
                85:['币种','currency'][i],

                88:['发票项目','invoice for'][i],

                //供应商
                101:['供应商类型','supplier type'][i],
                110:['客户类型','customer type'][i],
                111:['客户来源','customer src'][i],
            },
            Flow:{0:['未进行','not started'][i],1:['未提交','not submitted'][i],2:['待审批','waiting'][i],3:['拒审批','rejected'][i],4:['审批通过','approved'][i]},
            State:{0:['停用','disabled'][i],1:['启用','enabled'][i]},
            StateIcon:{0:'<i class="fa fa-ban text-danger"></i>',1:'<i class="fa fa-check-circle text-success"></i>'},
            PlusDay:['+1','+2'],
            Gender:{0:['男','male'][i],1:['女','female'][i]},
            Opinion:{0:['提交','submit'][i],1:['通过','accept'][i],2:['不通过','reject'][i],3:['取消','cancel'][i],4:['撤销','revoke'][i],5:['通过(越级审批)','leapfrog pass'][i],6:['不通过(越级审批)','leapfrog reject'][i]},
            OpinionEdit:{1:['通过','accept'][i],2:['不通过','reject'][i]},
            YesNo:{1:['是','yes'][i],0:['否','no'][i]},
            HaveId:{gt:['有','have'][i],le:['无','not have'][i]},
            HaveDebt:{gt:['大于0','greater than 0'][i],lt:['小于0','less than 0'][i],eq:['等于0','equal to 0'][i]},

            Greater:{'>':'大于','>=':'大于等于'},
            Less:{'<':'小于','<=':'小于等于'},

            //行政
            LeavePhase:{0:['上午','morning'][i],1:['下午','afternoon'][i]},

            //供应商 账期  协议
            PayPeriodType:{1:['出团前','before departure'][i],2:['回团后','after return'][i],
            3:['出团后次月','in the month after departure'][i],4:['回团后次月','in the month after return'][i]},
            DctType:{1:['流水立减','discount'][i],2:['人头立减','discount(per people)'][i]},

            //订单
            Certificate:{1:['身份证','Id Card'][i],2:['护照','Passport'][i],3:['台证','Taiwan Entry Permit '][i],4:['港证','Hong Kong Certificate'][i]
                ,5:['军官证','Military Documents'][i]},

            OrderState:{1:['未占位','not hold'][i],2:['占位中','holding seat'][i],3:['实报中','waiting'][i],4:['已审核','approved'][i],5:['已确认'
                       ,'confirmed'][i],8:['变更中','changed'][i]},

            //产品
            PdSrc:{1:['同业发布','retailer release'][i],2:['自组自营','self release'][i],3:['数据对接','data api'][i]},
            ProductTemplate:{1:['团队游（常规跟团，自由行，半自助，邮轮等产品）','Team Tour (regular with the group, free exercise, semi-self-help, cruise and other products)'][i]
                ,2:['单签证（签证类产品）','Only visa (visa products)'][i]
                ,3:['单交通（飞机票，火车票产品）','Only traffic (air tickets, train tickets products)'][i]
                ,4:['单订房（酒店，团队房等产品）','Only booking (hotel, team room and other products)'][i]
                ,5:['单门票（景点套票，演出门票，娱乐秀场票等产品）','Tickets (attractions packages, performances tickets, tickets and other entertainment show tickets)'][i]
                ,6:['当地游（一日游，单地接，当地参团等产品）','Local tour (one-day tour, pick-to-order, local delegation and other products)'][i]},

            //单据
            DocSearch:{1:['收款单','receipt'][i],2:['支出单','pay'][i],3:['内转单','internal transfer'][i],
                       4:['退款单','refund'][i],6:['借款单','lend'][i],9:['调整单','variable'][i],
                       10:['扣款单','deduct'][i],11:['还款单','repayment'][i]},
            // DocAdd:[{key:1,name:['收款单','receipt'][i]},{key:6,name:['借款单','lend'][i]},
            //         {key:3,name:['内转单','internal transfer'][i]},{key:2,name:['支出单','pay'][i]},
            //         {key:4,name:['退款单','refund'][i]},{key:11,name:['还款单','repayment'][i]}],
            // bug 4137
            DocAdd:[{key:1,name:['业务收款单','receipt'][i]}
                    ,{key:13,name:['资金收款单','fund receipt'][i]}
                    ,{key:2,name:['业务支出单','pay'][i]}
                    ,{key:16,name:['资金支出单','fund pay'][i]}
                    ,{key:8,name:['业务借款单','lend'][i]}
                    ,{key:15,name:['资金借款单','fund lend'][i]}
                    ,{key:3,name:['业务内转单','business internal transfer'][i]}
                    ,{key:4,name:['资金内转单','fund internal transfer'][i]}
                    ,{key:5,name:['业务退款单(对业务收款单)','receipt refund'][i]}
                    ,{key:14,name:['资金退款单(对资金收款单)','fund refund'][i]}
                    ,{key:20,name:['业务退回单(对业务支出单,业务借款单)','yw return'][i]}
                    ,{key:19,name:['资金退回单(对资金支出/借款单,非现金)','fund return'][i]}
                    ,{key:18,name:['工资单','wage'][i]}
                    ,{key:17,name:['还款单(对资金借款单,限现金)','repayment'][i]}
                    ],
            Doc:{1:['业务收款单','receipt'][i]
                ,2:['业务支出单','pay'][i]
                ,3:['业务内转单','business internal transfer'][i]
                ,4:['资金内转单','fund internal transfer'][i]
                ,5:['业务退款单','receipt refund'][i]
                ,8:['业务借款单','lend'][i]
                ,11:['调整单','variable'][i]
                ,12:['扣款单','deduct'][i]
                ,13:['资金收款单','fund receipt'][i]
                ,14:['资金退款单','fund refund'][i]
                ,15:['资金借款单','fund lend'][i]
                ,16:['资金支出单','fund pay'][i]
                ,17:['还款单','repayment'][i]
                ,18:['工资单','wage'][i]
                ,19:['资金退回单','fund return'][i]
                ,20:['业务退回单','yw return'][i]},
            DocApprove:{1:['业务收款单','receipt'][i]
                ,2:['业务支出单','pay'][i]
                ,5:['业务退款单','receipt refund'][i]
                ,8:['业务借款单','lend'][i]
                ,11:['调整单','variable'][i]
                ,12:['扣款单','deduct'][i]
                ,13:['资金收款单','fund receipt'][i]
                ,14:['资金退款单','fund refund'][i]
                ,15:['资金借款单','fund lend'][i]
                ,16:['资金支出单','fund pay'][i]
                ,17:['还款单','repayment'][i]
                ,18:['工资单','wage'][i]
                ,19:['资金退回单','fund return'][i]
                ,20:['业务退回单','yw return'][i]},

            DocNz:{3:['业务内转单','business internal transfer'][i]
                ,4:['资金内转单','fund internal transfer'][i]
                },
            DocExport:{2:['业务支出单','pay'][i]
                ,5:['业务退款单','receipt refund'][i]
                ,8:['业务借款单','lend'][i]
                ,14:['资金退款单','fund refund'][i]
                ,15:['资金借款单','fund lend'][i]
                ,16:['资金支出单','fund pay'][i]},
            //两种退款单
            RefundDoc:[{key:5,name:['业务退款单','receipt refund'][i]}
                        //,{key:6,name:['押金退款单','deposit refund'][i]}
                        ,{key:14,name:['资金退款单','fund refund'][i]}],
            //两种内转单
            NzDoc:[{key:3,name:['业务内转','business internal transfer'][i]},
                    {key:4,name:['资金内转','fund internal transfer'][i]}],
            //两种收款单
            SkDoc:[{key:1,name:['业务收款','business sk'][i]},
                    {key:13,name:['资金收款','fund sk'][i]}],
            //两种借款单
            JkDOC:[{key:8,name:['业务借款单','lend'][i]},
                    {key:15,name:['资金借款单','fund lend'][i]}
            ],
            //两种支出单
            ZcDOC:[
                {key:2,name:['业务支出单','pay'][i]},
                {key:16,name:['资金支出单','fund pay'][i]}
            ],

            //发票
            Invoice:{1:['开票','invoice'][i],3:['借票','invoice lend'][i]},
            InvoiceState:{1:['待开','making'][i],2:['已开','made'][i],3:['废票','abolish'][i]},
            InvoiceEditState:{1:['待开','making'][i],2:['已开','made'][i]},
            InvoiceBusinessType:{1:['出境','exit'][i],2:['入境','enter'][i],3:['国内','domestic'][i],4:['其他','other'][i]},
            InvoiceType:{1:['普票','common invoice'][i],2:['专票','professional invoice'][i]},

            //统计
            Year:{2017:'2017',2018:'2018',2019:'2019',2020:'2020',2021:'2021',2022:'2022'},
            Month:{1:['一月','January'][i],2:['二月','February'][i],3:['三月','March'][i],
                4:['四月','April'][i],5:['五月','May'][i],6:['六月','June'][i],
                7:['七月','July'][i],8:['八月','August'][i],9:['九月','September'][i],
                10:['十月','October'][i],11:['十一月','November'][i],12:['十二月','December'][i]},
            StatDim:{Year:['年','year'][i],Month:['月','month'][i]},
            StatMeasure:{NumOfPeople:['人数','number of people'][i],
                Receivable:['应收','receivable'][i],Received:['已收','received'][i],
                Payable:['应付','payable'][i],Paid:['已付','paid'][i]},
            //GroupState: {0:['预备','ready'][i] ,1:['可报','able'][i],2:['取消','abolish'][i], 3:['截止','close'][i],4:['结团','finish'][i]},
            GroupState: {1:['<i class="text-success">可报</i>','<i class="text-success">able</i>'][i],
                         2:['<i class="text-warning">取消</i>','<i class="text-warning">abolish</i>'][i], 
                         3:['<i class="text-warning">截止</i>','<i class="text-warning">close</i>'][i],
                         4:['<i class="text-danger">结团</i>','<i class="text-danger">finish</i>'][i]},
            GroupStateEdit:{1:['可报','able'][i],2:['取消','abolish'][i], 3:['截止','close'][i]},

            Continent:{AF:['非洲','Africa'][i],EU:['欧洲','Europe'][i],AS:['亚洲','Asia'][i],OA:['大洋洲','Oceania'][i],NA:['北美洲','North America'][i],SA:['南美洲','South America'][i],AN:['南极洲','Antarctica'][i]},
            Country:{AO:['安哥拉','Angola'][i],AF:['阿富汗','Afghanistan'][i],AL:['阿尔巴尼亚','Albania'][i],DZ:['阿尔及利亚','Algeria'][i],AD:['安道尔共和国','Andorra'][i],AI:['安圭拉岛','Anguilla'][i],AG:['安提瓜和巴布达','Barbuda Antigua'][i],AR:['阿根廷','Argentina'][i],AM:['亚美尼亚','Armenia'][i],AU:['澳大利亚','Australia'][i],AT:['奥地利','Austria'][i],AZ:['阿塞拜疆','Azerbaijan'][i],BS:['巴哈马','Bahamas'][i],BH:['巴林','Bahrain'][i],BD:['孟加拉国','Bangladesh'][i],BB:['巴巴多斯','Barbados'][i],BY:['白俄罗斯','Belarus'][i],BE:['比利时','Belgium'][i],BZ:['伯利兹','Belize'][i],BJ:['贝宁','Benin'][i],BM:['百慕大群岛','Bermuda Is.'][i],BO:['玻利维亚','Bolivia'][i],BW:['博茨瓦纳','Botswana'][i],BR:['巴西','Brazil'][i],BN:['文莱','Brunei'][i],BG:['保加利亚','Bulgaria'][i],BF:['布基纳法索','Burkina-faso'][i],MM:['缅甸','Burma'][i],BI:['布隆迪','Burundi'][i],CM:['喀麦隆','Cameroon'][i],CA:['加拿大','Canada'][i],CF:['中非共和国','Central African Republic'][i],TD:['乍得','Chad'][i],CL:['智利','Chile'][i],CN:['中国','China'][i],CO:['哥伦比亚','Colombia'][i],CG:['刚果','Congo'][i],CK:['库克群岛','Cook Is.'][i],CR:['哥斯达黎加','Costa Rica'][i],CU:['古巴','Cuba'][i],CY:['塞浦路斯','Cyprus'][i],CZ:['捷克','Czech Republic'][i],DK:['丹麦','Denmark'][i],DJ:['吉布提','Djibouti'][i],DO:['多米尼加共和国','Dominica Rep.'][i],EC:['厄瓜多尔','Ecuador'][i],EG:['埃及','Egypt'][i],SV:['萨尔瓦多','EI Salvador'][i],EE:['爱沙尼亚','Estonia'][i],ET:['埃塞俄比亚','Ethiopia'][i],FJ:['斐济','Fiji'][i],FI:['芬兰','Finland'][i],FR:['法国','France'][i],GF:['法属圭亚那','French Guiana'][i],GA:['加蓬','Gabon'][i],GM:['冈比亚','Gambia'][i],GE:['格鲁吉亚','Georgia'][i],DE:['德国','Germany'][i],GH:['加纳','Ghana'][i],GI:['直布罗陀','Gibraltar'][i],GR:['希腊','Greece'][i],GD:['格林纳达','Grenada'][i],GU:['关岛','Guam'][i],GT:['危地马拉','Guatemala'][i],GN:['几内亚','Guinea'][i],GY:['圭亚那','Guyana'][i],HT:['海地','Haiti'][i],HN:['洪都拉斯','Honduras'][i],HK:['香港','Hongkong'][i],HR:['克罗地亚','Croatia'][i],HU:['匈牙利','Hungary'][i],IS:['冰岛','Iceland'][i],IN:['印度','India'][i],ID:['印度尼西亚','Indonesia'][i],IR:['伊朗','Iran'][i],IQ:['伊拉克','Iraq'][i],IE:['爱尔兰','Ireland'][i],IL:['以色列','Israel'][i],IT:['意大利','Italy'][i],JM:['牙买加','Jamaica'][i],JP:['日本','Japan'][i],JO:['约旦','Jordan'][i],KH:['柬埔寨','Kampuchea (Cambodia )'][i],KZ:['哈萨克斯坦','Kazakstan'][i],KE:['肯尼亚','Kenya'][i],KR:['韩国','Korea'][i],KW:['科威特','Kuwait'][i],KG:['吉尔吉斯坦','Kyrgyzstan'][i],LA:['老挝','Laos'][i],LV:['拉脱维亚','Latvia'][i],LB:['黎巴嫩','Lebanon'][i],LS:['莱索托','Lesotho'][i],LR:['利比里亚','Liberia'][i],LY:['利比亚','Libya'][i],LI:['列支敦士登','Liechtenstein'][i],LT:['立陶宛','Lithuania'][i],LU:['卢森堡','Luxembourg'][i],MO:['澳门','Macao'][i],MG:['马达加斯加','Madagascar'][i],MW:['马拉维','Malawi'][i],MY:['马来西亚','Malaysia'][i],MV:['马尔代夫','Maldives'][i],ML:['马里','Mali'][i],MT:['马耳他','Malta'][i],MU:['毛里求斯','Mauritius'][i],MX:['墨西哥','Mexico'][i],MD:['摩尔多瓦','Moldova'][i],MC:['摩纳哥','Monaco'][i],MN:['蒙古','Mongolia'][i],MS:['蒙特塞拉特岛','Montserrat Is.'][i],MA:['摩洛哥','Morocco'][i],MZ:['莫桑比克','Mozambique'][i],NA:['纳米比亚','Namibia'][i],NR:['瑙鲁','Nauru'][i],NP:['尼泊尔','Nepal'][i],NL:['荷兰','Netherlands'][i],NZ:['新西兰','New Zealand'][i],NI:['尼加拉瓜','Nicaragua'][i],NE:['尼日尔','Niger'][i],NG:['尼日利亚','Nigeria'][i],KP:['朝鲜','North Korea'][i],NO:['挪威','Norway'][i],OM:['阿曼','Oman'][i],PK:['巴基斯坦','Pakistan'][i],PA:['巴拿马','Panama'][i],PG:['巴布亚新几内亚','Papua New Cuinea'][i],PY:['巴拉圭','Paraguay'][i],PE:['秘鲁','Peru'][i],PH:['菲律宾','Philippines'][i],PL:['波兰','Poland'][i],PF:['法属玻利尼西亚','French Polynesia'][i],PT:['葡萄牙','Portugal'][i],PR:['波多黎各','Puerto Rico'][i],QA:['卡塔尔','Qatar'][i],RO:['罗马尼亚','Romania'][i],RU:['俄罗斯','Russia'][i],LC:['圣卢西亚','Saint Lueia'][i],VC:['圣文森特岛','Saint Vincent'][i],SM:['圣马力诺','San Marino'][i],ST:['圣多美和普林西比','Sao Tome and Principe'][i],SA:['沙特阿拉伯','Saudi Arabia'][i],SN:['塞内加尔','Senegal'][i],SC:['塞舌尔','Seychelles'][i],SL:['塞拉利昂','Sierra Leone'][i],SG:['新加坡','Singapore'][i],SK:['斯洛伐克','Slovakia'][i],SI:['斯洛文尼亚','Slovenia'][i],SB:['所罗门群岛','Solomon Is.'][i],SO:['索马里','Somali'][i],ZA:['南非','South Africa'][i],ES:['西班牙','Spain'][i],LK:['斯里兰卡','Sri Lanka'][i],SD:['苏丹','Sudan'][i],SR:['苏里南','Suriname'][i],SZ:['斯威士兰','Swaziland'][i],SE:['瑞典','Sweden'][i],CH:['瑞士','Switzerland'][i],SY:['叙利亚','Syria'][i],TW:['台湾省','Taiwan'][i],TJ:['塔吉克斯坦','Tajikstan'][i],TZ:['坦桑尼亚','Tanzania'][i],TH:['泰国','Thailand'][i],TG:['多哥','Togo'][i],TO:['汤加','Tonga'][i],TT:['特立尼达和多巴哥','Trinidad and Tobago'][i],TN:['突尼斯','Tunisia'][i],TR:['土耳其','Turkey'][i],TM:['土库曼斯坦','Turkmenistan'][i],UG:['乌干达','Uganda'][i],UA:['乌克兰','Ukraine'][i],AE:['阿拉伯联合酋长国','United Arab Emirates'][i],GB:['英国','United Kiongdom'][i],US:['美国','United States of America'][i],UY:['乌拉圭','Uruguay'][i],UZ:['乌兹别克斯坦','Uzbekistan'][i],VE:['委内瑞拉','Venezuela'][i],VN:['越南','Vietnam'][i],YE:['也门','Yemen'][i],YU:['南斯拉夫','Yugoslavia'][i],ZW:['津巴布韦','Zimbabwe'][i],ZR:['扎伊尔','Zaire'][i],ZM:['赞比亚','Zambia'][i],},
            CountryBelong:{AO:'AF',AF:'AS',AL:'EU',DZ:'AF',AD:'EU',AI:'SA',AG:'NA',AR:'SA',AM:'AS',AU:'OA',AT:'EU',AZ:'AS',BS:'NA',BH:'AS',BD:'AS',BB:'NA',BY:'EU',BE:'EU',BZ:'NA',BJ:'AF',BM:'NA',BO:'SA',BW:'AF',BR:'SA',BN:'AS',BG:'EU',BF:'AF',MM:'AS',BI:'AF',CM:'AF',CA:'NA',CF:'AF',TD:'AF',CL:'SA',CN:'AS',CO:'SA',CG:'AF',CK:'OA',CR:'NA',CU:'NA',CY:'AS',CZ:'EU',DK:'EU',DJ:'AF',DO:'NA',EC:'SA',EG:'AF',SV:'NA',EE:'EU',ET:'AF',FJ:'OA',FI:'EU',FR:'EU',GF:'SA',GA:'AF',GM:'AF',GE:'AS',DE:'EU',GH:'AF',GI:'EU',GR:'EU',GD:'NA',GU:'OA',GT:'NA',GN:'AF',GY:'SA',HT:'NA',HN:'NA',HK:'AS',HR:'EU',HU:'EU',IS:'EU',IN:'AS',ID:'AS',IR:'AS',IQ:'AS',IE:'EU',IL:'AS',IT:'EU',JM:'NA',JP:'AS',JO:'AS',KH:'AS',KZ:'AS',KE:'AF',KR:'AS',KW:'AS',KG:'AS',LA:'AS',LV:'EU',LB:'AS',LS:'AF',LR:'AF',LY:'AF',LI:'EU',LT:'EU',LU:'EU',MO:'AS',MG:'AF',MW:'AF',MY:'AS',MV:'AS',ML:'AF',MT:'EU',MU:'AF',MX:'NA',MD:'EU',MC:'EU',MN:'AS',MS:'NA',MA:'AF',MZ:'AF',NA:'AF',NR:'OA',NP:'AS',NL:'EU',NZ:'OA',NI:'NA',NE:'AF',NG:'AF',KP:'AS',NO:'EU',OM:'AS',PK:'AS',PA:'NA',PG:'OA',PY:'SA',PE:'SA',PH:'AS',PL:'EU',PF:'OA',PT:'EU',PR:'NA',QA:'AS',RO:'EU',RU:'EU',LC:'NA',VC:'SA',SM:'EU',ST:'AF',SA:'AS',SN:'AF',SC:'AF',SL:'AF',SG:'AS',SK:'EU',SI:'EU',SB:'OA',SO:'AF',ZA:'AF',ES:'EU',LK:'AS',SD:'AF',SR:'SA',SZ:'AF',SE:'EU',CH:'EU',SY:'AS',TW:'AS',TJ:'AS',TZ:'AF',TH:'AS',TG:'AF',TO:'OA',TT:'NA',TN:'AF',TR:'AS',TM:'AS',UG:'AF',UA:'EU',AE:'AS',GB:'EU',US:'NA',UY:'SA',UZ:'AS',VE:'SA',VN:'AS',YE:'AS',YU:'EU',ZW:'AF',ZR:'AF',ZM:'AF'},
            // SendDistrict:{0:['内领','inner district'][i] ,1:['外领','outer district'][i]},

            // FlowCompany:{'all':['所有公司','all company'][i],'self':['本人公司','self company'][i]},

            //结团锁定
            LockedState:{0:['未锁定','unlocked'][i],1:['已锁定','locked'][i]},
            LockedStateIcon:{0:'<i class="fa icon-lock-open text-success"></i>',1:'<i class="fa icon-lock text-danger"></i>'},
            SettleAction:{0:['订单锁定','order lock'][i],1:['核算锁定','accounting lock'][i]},
            SettleMark:{0:['未标记','unmarked'][i],1:['已标记','marked'][i]},
            //合同
            SignState:{0:['未签约','not signed'][i],1:['已签约','signed'][i]},
            //团
            ShelfState:{1:['未提交','not submit'][i],2:['待上架','wait for shelf'][i],3:['已上架','on shelf'][i]},
            OrderConfirmWay:{1:['电话确认','confirm by phone'][i],2:['在线确认','confirm online'][i]},
            GroupWay:{1:['同业散拼','ty'][i],2:['青旅自组','self organized'][i],3:['青旅自营','self employeed'][i],4:['活动专线','activity'][i]},
            GroupWaySelect:{1:['同业散拼','ty'][i],2:['青旅自组','self organized'][i],3:['青旅自营','self employeed'][i],4:['活动专线','activity'][i]},
            GroupWayEdit:{1:['同业散拼','ty'][i],2:['青旅自组','self organized'][i]},
            GroupTypes:{1:['定期发团','regular invoice'][i],2:['天天发团','daliy leave'][i], 3:['按周发团','weekly leave'][i]},
            Week:{1: ['周一','monday'][i], 2:['周二','Tuesday'][i], 3: ['周三','Wednesday'][i], 4:['周四','Thursday'][i], 
                  5: ['周五','Friday'][i], 6:['周六','Saturday'][i], 7:['周日','Sunday'][i]},
            //分支
            BranchCond:{1:['类型条件','type condition'][i],2:['金额条件','amount condition'][i]},
            //财务
            FundClaimState:{0:['未认领','not claim'][i],1:['已认领','claimed'][i]},
            ExchangeState:{0:['未结汇','unexchange'][i],1:['已结汇','exchanged'][i]},
            //质检
            //合同
            ContractType:{1:['出境合同','outbound contract'][i],2:['国内合同','domestic contract'][i],3:['单项合同','single contract'][i]},
            ContractState:{1:['待分配','wait to be assigned'][i],
                          2:['已交付','assigned'][i],
                          3:['已签约','signed'][i],
                          4:['已核销','writed off'][i],
                          5:['已作废','abolished'][i],
            },
            ElcContractState:{1:['未关联','not related'][i],
                          2:['已关联','related'][i],
                          3:['待签字','wait signed'][i],
                          4:['已签字','signed`'][i],
                          5:['已作废','abolished'][i],
                          6:['已盖章','stamped'][i],
            },
            ContractKind:{1:['纸质合同','paper contract'][i],2:['电子合同','electronic contract'][i]},
            InsuranceAgree:{
                1:['自行购买','buy it self'][i],2:['放弃购买','abandon the purchase'][i],
                3:['委托我社购买','Entrusted to buy'][i]
            },
            Agree:{
                0:['不同意','disagree'][i],
                1:['同意','agree'][i],
            },
            // Copies:{
            //     1:['壹份','one copy'][i],
            //     2:['贰份','two copy'][i],
            //     3:['叁份','three copy'][i],
            // },
            //扣款公式类型
            FormulaType:{
                1:['单项扣款','dx formula'][i],
                2:['阶梯扣款','jt formula'][i],
            },
            //日志类型
            LogType:{
                1:['创建','create'][i],
                2:['修改','update'][i],
                3:['启停','toggle'][i],
                4:['删除','delete'][i],
                5:['废除','abolish'][i],
            },
            //询单状态
            InquiryState:{
                1:['跟进中','fllowing'][i],
                2:['已成单','related order'][i],
                3:['已关闭','closed'][i],
            },
            ScheduleState:{
                1:['待办中','to be done'][i],
                2:['已关闭','closed'][i],
            },
            Have:{0:['无','not have'][i],1:['有','have'][i]},
            HotelType:{1:['快捷','Express Inn'][i],2:['客栈','Inn'][i],3:['公寓','Apartment'][i],4:['民宿','Homestay'][i]
                       , 5:['别墅','Villa'][i],6:['商务','Business Hotel'][i],7:['温泉','Hot Springs Hotel'][i]},
            VisaType:{1:['个人旅游','personal travel'][i],2:['商务邀请','Business invitation'][i],3:['探亲访友','Visit friends'][i]},
            SingCollar:{1:['北京领区','Beijing area'][i],2:['上海领区','Shanghai area'][i],3:['广东领区','Guangdong area'][i],
                        4:['成都领区','Chengdu area'][i],5:['沈阳领区','Shenyang area'][i]},
            VisaImmigrationTimes:{1:['单次','single'][i],2:['多次','repeatedly'][i]},
            VisaKind:{1:['是','yes'][i],2:['否','no'][i],3:['抽查','Spot checks'][i]},
            PriceType:{'成人':['成人','adult'][i],'儿童':['儿童','child'][i]},

            SettleRemittance:{1:['未付','NO Remittance'][i],2:['已付','Remittance'][i],3:['退回','returned'][i]},
            ReceiveStatus:{3:['退回','returned'][i]},
            B2cPicPos:{0:'分类小块',1:'分类竖块',2:'分类横条',3:'热卖推荐',4:'超大轮播'},
            OrderKind:{1:['非活动订单','not order kind'][i],2:['活动订单','order kind'][i]}
        };

        apply_color();
        apply_shelf_color();
        return e;

        function apply_color(){
            var color = {
                Flow : {0:'text-light',1:'',2:'text-warning',3:'text-danger',4:'text-success'}
            };
            angular.forEach(color,function(color_cfg,type){
                var item = {};
                angular.forEach(e[type],function(text,k){
                    item[k] = '<span class="'+color_cfg[k]+'">'+text+'</span>';
                });
                e[type+'Color'] = item;
            });
        }
        function apply_shelf_color(){
            var color = {
                ShelfState: {1:'',2:'text-danger',3:'text-success'}
            };
            angular.forEach(color,function(color_cfg,type){
                var item = {};
                angular.forEach(e[type],function(text,k){
                    item[k] = '<span class="'+color_cfg[k]+'">'+text+'</span>';
                });
                e[type+'Color'] = item;
            });
        }

        function get_enum(cfg,row,pem_field,display){

            if(angular.isString(cfg)){
                var type = cfg;
                return e[type];
            }

            if(cfg.edit_path){
                return $rootScope.cur_scope().data[cfg.edit_path] || e[cfg.edit_path];
            }

            var type = cfg.type;

            if(!display && e[type+'Edit']){
                type = type+'Edit';
            }

            var rest = e[type];

            if(cfg.cascade){
                var target = row[cfg.cascade];

                if(cfg.cascaded){
                    
                    rest = rest[target] || {};

                }else{
                    var n_1;
                    var result = {};
                    if(cfg.cascade_type){
                        n_1 = e[cfg.cascade_type];
                    }else{
                        switch(type){
                            case 'Employee':
                            case 'ManagerEmployee':
                                n_1 = e['EmployeeDepartment'];
                                break;
                            case 'Department':
                            case 'ManagerDepartment':
                                n_1 = e['DepartmentCompany'];
                                break;
                            case 'UserPdTag':
                                var nav_type = e['NavToType'][target];
                                switch(nav_type){
                                    case '0':
                                        n_1 = e['PdTagBelong'];
                                        break;
                                    case '1':
                                        result = e['UserCountry'];
                                        break;
                                    case '2':
                                        result = e['UserContinent'];
                                        break;
                                }
                                break; 
                            case 'PdTag':
                                var nav_type = e['NavToType'][target];
                                switch(nav_type){
                                    case '0':
                                        n_1 = e['PdTagBelong'];
                                        break;
                                    case '1':
                                        result = e['Country'];
                                        break;
                                    case '2':
                                        result = e['Continent'];
                                        break;
                                }
                                break; 
                            case 'UserPdSubTag':
                                var _t = row[cfg.cascade2];
                                var nav_type = e['NavToType'][_t];
                                switch(nav_type){
                                    case '0':
                                        n_1 = e['PdSubTagBelong'];
                                        break;
                                    case '1':
                                        n_1 = e['CityCountry'];
                                        rest = e['UserPdSubTagCity'];
                                        break;
                                    case '2':
                                        n_1 = e['CountryBelong'];
                                        rest = e['UserPdSubTagCountry'];
                                        break;
                                }
                                break;
                            case 'PdSubTag':
                                var _t = row[cfg.cascade2];
                                var nav_type = e['NavToType'][_t];
                                switch(nav_type){
                                    case '0':
                                        n_1 = e['PdSubTagBelong'];
                                        break;
                                    case '1':
                                        n_1 = e['CityCountry'];
                                        rest = e['City'];
                                        break;
                                    case '2':
                                        n_1 = e['CountryBelong'];
                                        rest = e['Country'];
                                        break;
                                }
                                break;
                            case 'RetailerContact':
                                n_1 = e['RetailerContactBelong'];
                                break;
                            case 'InvoiceFor':
                                n_1 = e['InvoiceForBelong'];
                                break;
                            case 'City':
                                n_1 = e['CityCountry'];
                                break;
                        }
                    }

                    if(n_1){
                        angular.forEach(n_1,function(v,k){
                            if(angular.isArray(target)){
                                if(target.indexOf(v) !== -1){
                                    result[k] = rest[k];
                                }
                            }else{
                                if(v == target){
                                    result[k] = rest[k];
                                }
                            }
                        });
                    }

                    rest = result;
                }
            }

            if(pem_field){
                var mod = (row && row.mod) || cfg.mod;
                var pem = $rootScope.pem_filters[mod];
                if(pem && pem[pem_field]){
                    var filter = pem[pem_field];
                    var result = {};
                    if(filter[0] == -1 || filter[0] == -2){
                        var target;
                        switch(type){
                            case 'Company':
                            case 'ManagerCompany':
                                target = $rootScope.appUser.company_id;
                                break;
                            case 'Department':
                            case 'ManagerDepartment':
                                target = $rootScope.appUser.department_id;
                                break;
                            case 'Employee':
                            case 'SuppEmployee':
                            case 'ManagerEmployee':
                                target = $rootScope.appUser.employee_id;
                                break;
                        }
                        angular.forEach(rest,function(v,k){
                            if(k == target){
                                result[k] = v;
                            }
                        });
                    }else{
                        angular.forEach(rest,function(v,k){
                            for (var i in filter) {
                                if(filter[i] == k){
                                    result[k] = v;
                                    break;
                                }
                            }
                        });
                    }
                    rest = result;
                }
            }

            if(type == 'Dict'){

                var filter = $rootScope.cur_scope().cfg.filter;
                if(!filter){
                    filter = $rootScope.pre_scope().cfg.filter;
                }

                filter = filter.type_id;
                var result = {};
                angular.forEach(rest,function(v,k){
                    for (var i in filter) {
                        if(filter[i] == k){
                            result[k] = v;
                            break;
                        }
                    }
                });
                rest = result;
            }
            return rest;
        }
    }
})();