$(function() {
	$("form").attr("autocomplete","off");
	//CloudUtils.ajax(CloudUtils.options);
	ajaxWarningCount();
	ajaxNotFlowCount();
	ajaxHandleCount();
	clickHandle();
	ajaxOffice();
	getOfficeNum();
	toWarning();
	setUserName();
	managePwd();
	manageNotice();
	homePageTime.show();

	if(store.get('roleType')!=1){
//		ajaxNotFlowCount();
		$("#toNotFlow").click(function(){
			toNotFlow();
		});
		$("#notFlowCount").click(function(){
			toNotFlow();
		});
	}else{
		$("#toNotFlow").unbind();  
		$("#notFlowCount").unbind();  
	}	
	
});



/**
 * 查询未结流程数目
 */
function ajaxNotFlowCount(){
	var data = '{}';
	var options = {
			url : 'activiti/getAgencyTaskNum',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					$("#notFlowCount").text(data.dataList[0].AgencyTaskNum);
				}else{
					return false;
				}
			}
	};
	CloudUtils.ajax(options);
}

/**
 * 查询已办流程数目
 */
function ajaxHandleCount(){
	var data = '{}';
	var options = {
			url : 'activiti/getHandleTaskNum',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					$("#handleFlowNum").text(data.dataList[0].HandleTaskNum);
				}else{
					return false;
				}
			}
	};
	CloudUtils.ajax(options);
}

/**
 * 点击已办进入列表详情页
 */
function clickHandle(){
	$("#handleFlow,#handleFlowNum").click(function(){
		$('#mainFrame',top.document).attr('src','project/handleTask/handleTask.html');
	});
}

function toNotFlow(){
	$('#mainFrame',top.document).attr('src','project/agencyTask/agencyTask.html');
} 

/********************预警通知*********************/

function toWarning(){
	$("#warnFlow,#warnCount").click(function(){
		$('#mainFrame',top.document).attr('src','sysManager/warningManager/warningManager.html');
	});
}


function ajaxWarningCount(){
	var options = {
			url : 'warning/count',
			data : "{}",
			callBackFun : function(data) {
					$("#warnCount").html(data);
			}
	};
	CloudUtils.ajax(options);
}

function anchor(){
	 $("a").each(function (){
		    var link = $(this);
		    var href = link.attr("href");
		    if(href && href[0] == "#")
		    {
		      var name = href.substring(1);
		      $(this).click(function() {
		        var nameElement = $("[name='"+name+"']");
		        var idElement = $("#"+name);
		        var element = null;
		        if(nameElement.length > 0) {
		          element = nameElement;
		        } else if(idElement.length > 0) {
		          element = idElement;
		        }
		 
		        if(element) {
		          var offset = element.offset();
		          window.parent.scrollTo(offset.left, offset.top);
		        }
		 
		        return false;
		      });
		    }
		  });
}

/*********************************设置用户名称************************************/
function setUserName(){
	var username=store.get('username');
	$("p[id='loginRealName']").text(username);
}

/********************************密码维护跳转*************************************/
function managePwd(){
	$("#pwdManage").click(function(){
		$('#mainFrame',top.document).attr("menuPathNames",JSON.stringify(["系统管理","密码维护"]));
		$('#mainFrame',top.document).attr('src','sysManager/userManager/pwdManager.html');
	});
}

/*********************************内部公告***************************************/
function ajaxOffice(){
	var informUserId = store.get("userId");
	 var param = {
			 isPage :1,
             pageNumber: 1,    
             pageSize: 10,
             informUserId:informUserId
         }; 
	var options = {
			url : 'internalInform/detail',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					var id = "officeTable";
					var control = $('#' + id);
					store.set('informRow',data.dataList);//把数据存储在缓存中
					$.each(data.dataList, function (index, units) {
						control.append("<tr><td class='tableTitleCss' onclick=\"toOfficeDetail('"+index+"')\"><a>" + units.title + "</a></td></tr>");  
					});
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert("error");
			}
	};
	CloudUtils.ajax(options);
}
function toOfficeDetail(index){
	var informRow = store.get('informRow');
	store.set('informRow',informRow[index]);
	$('#mainFrame',top.document).attr('src','office/officeManager/officeAdd.html?isEdit=3');
	//window.location.href="office/officeManager/officeAdd.html?id="+id;
}
//我的公告条数
function getOfficeNum(){
	var informUserId = store.get("userId");
	 var param = {    
             informUserId:informUserId
         }; 
		var options = {
				url : 'internalInform/count',
				data : JSON.stringify(param),
				callBackFun : function(data) {
					if(data.result==0){
						$("#myOfficeNum").text(data.dataList[0].internalInformNum);
					}else{
						bootbox.alert(data.resultNote);
						return false;
					}
				},
				errorCallback:function(data){
					bootbox.alert("error");
				}
		};
		CloudUtils.ajax(options);
}
//我的公告跳转
function manageNotice(){
	$("#myNotice").click(function(){
		$('#mainFrame',top.document).attr("menuPathNames",JSON.stringify(["系统管理","我的公告"]));
		$('#mainFrame',top.document).attr('src','office/officeManager/officeDetail.html');
	});
}
/**************************************echart统计视图************************************/


function showEchart(data){
	//销毁
	echarts.dispose(document.getElementById('echart'));
	 var myChart = echarts.init(document.getElementById('echart'));
	 var financeAlreadyTotal = 0;
	 var financeBalanceTotal = 0;
	 var overdueFinanceAmountTotal = 0;
	 var toBeFinanceAmountTotal = 0;
	 $.each(data, function(index, value) {
		 //financeAlreadyTotal += value.financeAlreadySum;
		 financeAlreadyTotal = CloudUtils.Math(financeAlreadyTotal,value.financeAlreadySum,"add");
		 //financeBalanceTotal += value.financeBalanceSum;
		 financeBalanceTotal = CloudUtils.Math(financeBalanceTotal,value.financeBalanceSum,"add");
		 //overdueFinanceAmountTotal += value.overdueFinanceAmountSum;
		 overdueFinanceAmountTotal = CloudUtils.Math(overdueFinanceAmountTotal,value.overdueFinanceAmountSum,"add");
		 //toBeFinanceAmountTotal += value.toBeFinanceAmountSum
		 toBeFinanceAmountTotal = CloudUtils.Math(toBeFinanceAmountTotal,value.toBeFinanceAmountSum,"add");
		});
     // 指定图表的配置项和数据
 var option = {
     tooltip: {
     trigger: 'item',
     formatter: "{a} <br/>{b}: {c} ({d}%)"
 },
 legend: {
     orient: 'vertical',
	 x: 'left',
	 data:['总计放款金额','总计待放款金额']
	 },
 series: [
     {
         name:'访问来源',
         type:'pie',
         selectedMode: 'single',
         radius: [0, '30%'],

         label: {
             normal: {
                 position: 'inner'
             }
         },
         labelLine: {
             normal: {
                 show: false
             }
         },
         data:[
             {value:financeAlreadyTotal+financeBalanceTotal+overdueFinanceAmountTotal,
            name:'总计放款金额',
            	 label: {
            	    normal: {
            	        textStyle: {
            	            color: 'rgba(255, 255, 255, 0.0)'
            	        }
            	    }
            	}},
             {value:toBeFinanceAmountTotal, 
            name:'总计待放款金额',
	            label: {
	        	    normal: {
	        	        textStyle: {
	        	            color: 'rgba(255, 255, 255, 0.0)'
	        	        }
	        	    }
	        	}
            }
         ]
     },
     {
         name:'访问来源',
         type:'pie',
         radius: ['40%', '55%'],

         data:[
             {value:financeAlreadyTotal, name:'已还融资金额'},
             {value:financeBalanceTotal, name:'未还融资金额'},
             {value:overdueFinanceAmountTotal, name:'逾期融资金额'},
             {value:toBeFinanceAmountTotal, name:'待放款金额'}
         ]
     }
 ]
     };
     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);
     window.onresize = myChart.resize;//宽度自适应
}
var homePageTime = new Object({
	check : function(i){
		if(i<10){  
	          i="0"+i;  
	          //return i;  
	      }  
	      else{  
	          i=i;  
	         // return i;  
	      }  
	return i;  
	},
	show : function(){
		 var now=new Date();  
		    var year=now.getFullYear() ;  
		    var month= now.getMonth()+1 ;  
		    var day=now.getDate() ;  
		    var h=now.getHours();  
		    var m=now.getMinutes() ;  
		    var s=now.getSeconds() ;  
		    m=homePageTime.check(m)  
		    s=homePageTime.check(s)  
		  
		    var weekday=new Array(7)  
		    weekday[0]="星期日"  
		    weekday[1]="星期一"  
		    weekday[2]="星期二"  
		    weekday[3]="星期三"  
		    weekday[4]="星期四"  
		    weekday[5]="星期五"  
		    weekday[6]="星期六"  
		  
		    document.getElementById("jnkc").innerHTML=""+year+"年"+month+"月"+day+"日 "+weekday[now.getDay()] +h+":"+m+":"+s;  
		    t=setTimeout('homePageTime.show()',500) 
	}
})
