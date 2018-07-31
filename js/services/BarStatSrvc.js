(function() {
    'use strict';

    angular
    .module('app')
    .factory('BarStatSrvc', BarStatSrvc);

    BarStatSrvc.$inject = ['$rootScope','appConst'];
    function BarStatSrvc($rootScope,appConst) {

        $rootScope.bbarInfo = {
            //'账户监管':accountViewStat
            '待开发票':makeInvoiceStat,
            '资金认领':makeFundStat,
            '内转审批':documentApprove,
            '订单管理':ordercount,
            '订单受理':orderAcceptStat,
            '订单对账':OrderCheckUpStat,
            '团队管理':GroupCtrl,
            '对账确认-同业':OrderAccount,
            '订单受理':OrderAccept,
        };

        return {};
        function OrderAccept(data){
            // 人数：   应收/转：  已收/转：  未收/转：
            var num_of_people,receivable_settle_see,received_settled_see,receive_settle_diff_see;
            num_of_people = receivable_settle_see = received_settled_see = receive_settle_diff_see = 0;

            _.each(data,function(item){
                num_of_people +=+ item.num_of_people;
                receivable_settle_see +=+ item.receivable_settle_see;
                received_settled_see +=+ item.received_settled_see;
                receive_settle_diff_see +=+ item.receive_settle_diff_see;
            });
            var Info = '人数 ：'+ num_of_people+'人&nbsp;&nbsp;&nbsp;&nbsp;' + '应收/转 ：'+receivable_settle_see.toFixed(2)+'元&nbsp;&nbsp;&nbsp;&nbsp;'+' 已收/转 ： ' +received_settled_see.toFixed(2)+ '元&nbsp;&nbsp;&nbsp;&nbsp;' +' 未收/转 ：' + receive_settle_diff_see.toFixed(2)+'元';
            return Info;
        }

        function OrderAccount(data){
            // 人数：237人   应付款：22323元  已付款：2312   未付款：229932
            var num_of_people,payable,paid,pay_diff;
            num_of_people = payable = paid = pay_diff = 0;

            _.each(data,function(item){
                num_of_people +=+ item.num_of_people;
                payable +=+ item.payable;
                paid +=+ item.paid;
                pay_diff +=+ item.pay_diff;
            });
            var Info = '人数 ：'+ num_of_people+'人&nbsp;&nbsp;&nbsp;&nbsp;' + '应付款 ：'+payable+'元&nbsp;&nbsp;&nbsp;&nbsp;'+' 已付款 ： ' +paid+ '元&nbsp;&nbsp;&nbsp;&nbsp;' +' 未付款 ：' + pay_diff+'元';
            return Info;
        }

        function GroupCtrl(data){
            var inventory,canceled_cheque,perch,residue;
            inventory = canceled_cheque = perch = residue = 0;
            // 库存数：2893个   已收:233人  占位：283人  剩余：2992个

            _.each(data,function(item){
                inventory +=+ item.seat_total;  // 库存
                canceled_cheque +=+ item.seat_used; // 已收
                perch +=+ item.hold_num; // 占位
                residue +=+ item.seat_surplus; // 剩余
            });
            var Info = '库存数 ：'+ inventory+'个&nbsp;&nbsp;&nbsp;&nbsp;' + '已收 ：'+canceled_cheque+'人&nbsp;&nbsp;&nbsp;&nbsp;'+' 占位： ' +perch+ '人&nbsp;&nbsp;&nbsp;&nbsp;' +' 剩余：' + residue+'人';            
            return Info;
        }

        function ordercount(data){
            var pepole_num,not_occupied,occupieding,expenses,audit,affirm,change;
            pepole_num = not_occupied = occupieding = expenses = audit = affirm = change = 0;
            _.each(data,function(item){
                pepole_num +=+ item.num_of_people;  // 人数
                if (item.state == appConst.ORDER_NOT_HOLD) {
                    not_occupied ++   // 未占位
                }else if(item.state == appConst.ORDER_HOLDING){
                    occupieding ++    // 占位中
                }else if(item.state == appConst.ORDER_WAITING){
                    expenses ++       // 实报中 
                }else if(item.state == appConst.ORDER_APPROVED){
                    audit ++          // 已审核
                }else if(item.state == appConst.ORDER_CONFIRMED){
                    affirm ++         // 已确认
                }else if(item.state == appConst.ORDER_CHANGING){
                    change ++         // 变更中
                }
                
            });
            var Info = '人数 ：'+ pepole_num+'&nbsp;&nbsp;&nbsp;&nbsp;' + '未占位(订单数) ：'+not_occupied+'&nbsp;&nbsp;&nbsp;&nbsp;'+' 占位中(订单数)： ' +occupieding+ '&nbsp;&nbsp;&nbsp;&nbsp;' +' 实报中(订单数)：' + expenses+ '&nbsp;&nbsp;&nbsp;&nbsp;已审核(订单数) ：'+ audit +'&nbsp;&nbsp;&nbsp;&nbsp;' + '已确认(订单数) ：' + affirm + '&nbsp;&nbsp;&nbsp;&nbsp;变更中(订单数)：'+change;
            return Info;
        }
        function orderAcceptStat(data){
            var pepole_num,receivable_settle_see,received_settled_see,receive_settle_diff_see;
            pepole_num = receivable_settle_see = received_settled_see = receive_settle_diff_see  = 0;
            _.each(data,function(item){
                pepole_num +=+ item.num_of_people;  // 人数
                receivable_settle_see +=+ item.receivable_settle_see;
                received_settled_see +=+ item.received_settled_see;
                receive_settle_diff_see +=+ item.receive_settle_diff_see;
            });
            var Info = '人数 ：'+ pepole_num+'&nbsp;&nbsp;&nbsp;&nbsp;' + '应收/转 ：'+receivable_settle_see.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;'+' 已收/转： ' +received_settled_see.toFixed(2)+ '&nbsp;&nbsp;&nbsp;&nbsp;' +' 未收/转：' + receive_settle_diff_see.toFixed(2);
            return Info;
        }

        function OrderCheckUpStat(data){
            var pepole_num,receivable_settle_see,received_settled_see,receive_settle_diff_see;
            pepole_num = receivable_settle_see = received_settled_see = receive_settle_diff_see  = 0;
            _.each(data,function(item){
                pepole_num +=+ item.num_of_people;  // 人数
                receivable_settle_see +=+ item.receivable_settle_see;
                received_settled_see +=+ item.received_settled_see;
                receive_settle_diff_see +=+ item.receive_settle_diff_see;
            });
            var Info = '人数 ：'+ pepole_num+'&nbsp;&nbsp;&nbsp;&nbsp;' + '应收/转 ：'+receivable_settle_see.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;'+' 已收/转： ' +received_settled_see.toFixed(2)+ '&nbsp;&nbsp;&nbsp;&nbsp;' +' 未收/转：' + receive_settle_diff_see.toFixed(2);
            return Info;
        }


        // 资金认领表格下面的统计
        function makeFundStat(data){
            var exchange_amount,used,used_diff;
            exchange_amount = used = used_diff = 0;
            _.each(data,function(item){
                exchange_amount +=+ item.exchange_amount;
                used +=+ item.used;
                used_diff +=+ item.used_diff;
            });
            var Info = '结汇金额 ：'+ exchange_amount.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;' + '已用金额 ：'+used.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;'+'未用金额 :'+used_diff.toFixed(2);
            return Info;
        }

        function makeInvoiceStat(data){
            var invoice_total,invoice_amount,invoice_remain;
            invoice_remain = invoice_amount = invoice_total = 0;
            _.each(data,function(item){
                invoice_total +=+ item.invoice_total;
                invoice_amount +=+ item.invoice_amount;
                invoice_remain +=+ item.invoice_remain;
            });
            var Info = '可开票额 ：'+ invoice_total.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;' + '已开票额 ：'+invoice_amount.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;'+'未开票额 :'+invoice_remain.toFixed(2);
            return Info;
        }
        // function accountViewStat(data){
        //     var income,expense,freeze,variable,deduct_amount,balance,avail_balance;
        //     income =expense = freeze = variable= deduct_amount= balance= avail_balance=0;
        //     _.each(data,function(item){
        //         income +=+ item.income;
        //         expense +=+ item.expense;
        //         freeze +=+ item.freeze;
        //         variable +=+ item.variable;
        //         deduct_amount +=+ item.deduct_amount;
        //         balance +=+ item.balance;
        //         avail_balance +=+ item.avail_balance;
        //     });
        //     var Info = 
        //             ' 收入 ：'+income.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;'+
        //             ' 支出 ：'+expense.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;'+
        //             ' 扣款 ：'+deduct_amount.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;'+
        //             ' 调整 ：'+variable.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;'+
        //             ' 余额 ：'+balance.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;'+
        //             ' 冻结 ：'+freeze.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;'+
        //             ' 可用余额 :'+avail_balance.toFixed(2);
        //     return Info;
        // }

        function documentApprove(data){
            var wait_approval = 0;
            var approved = 0;
            _.each(data, function (item) {
                switch(item.flow){
                    case appConst.FLOW_WAIT:
                        wait_approval += +item.settle_amount;
                        break;
                    case appConst.FLOW_APPROVED:
                        approved += +item.settle_amount;
                        break;
                }
            });
            var info =  
                    '　审批通过：'+approved.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp;' + 
                    '　待审批：'+wait_approval.toFixed(2)+'&nbsp;&nbsp;&nbsp;&nbsp'; 
            return info;
        }

    }
})();