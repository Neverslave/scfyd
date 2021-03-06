$(function() {
    getVariableByTaskId();
    numFormat();
    $('#detailHisForm input').attr('readonly', true);
    $("#detailHisForm select").attr("disabled", true);
});

function getVariableByTaskId() {
    var row = store.get('agencyRow'); //从缓存中获取数据
    var taskId = row.taskId;
    var options = {
        url: '../../activiti/findDataByTaskId',
        data: '{"taskId":"' + taskId + '"}',
        callBackFun: function(data) {
            if (data.result == 0) {
                var jsonData = eval("(" + data.str + ")");
               // changeArea(jsonData.area);
                CloudUtils.setForm(jsonData, "detailHisForm");
                $("#attachInfoTable").bootstrapTable('append', data.attachInfoList);
                if(jsonData.companyPicturePath1!=null && jsonData.companyPicturePath1!=''){
					$("#detailHisForm #Path1").attr("src",jsonData.companyPicturePath1);
					$("#detailHisForm #cp1").attr("href",jsonData.companyPicturePath1);
				}
				if(jsonData.companyPicturePath2!=null && jsonData.companyPicturePath2!=''){
					$("#detailHisForm #Path2").attr("src",jsonData.companyPicturePath2);
					$("#detailHisForm #cp2").attr("href",jsonData.companyPicturePath2);
				}
				if(jsonData.companyPicturePath3!=null && jsonData.companyPicturePath3!=''){
					$("#detailHisForm #Path3").attr("src",jsonData.companyPicturePath3);
					$("#detailHisForm #cp3").attr("href",jsonData.companyPicturePath3);
				}
				if(jsonData.companyPicturePath4!=null && jsonData.companyPicturePath4!=''){
					$("#detailHisForm #Path4").attr("src",jsonData.companyPicturePath4);
					$("#detailHisForm #cp4").attr("href",jsonData.companyPicturePath4);
				}
				if(jsonData.companyPicturePath5!=null && jsonData.companyPicturePath5!=''){
					$("#detailHisForm #Path5").attr("src",jsonData.companyPicturePath5);
					$("#detailHisForm #cp5").attr("href",jsonData.companyPicturePath5);
				}
				if(jsonData.companyPicturePath6!=null && jsonData.companyPicturePath6!=''){
					$("#detailHisForm #Path6").attr("src",jsonData.companyPicturePath6);
					$("#detailHisForm #cp6").attr("href",jsonData.companyPicturePath6);
				}
				if(jsonData.businessLicensePath!=null && jsonData.businessLicensePath!=''){
					$("#detailHisForm #businessLicensePath2").attr("src",jsonData.businessLicensePath);
					$("#detailHisForm #bl").attr("href",jsonData.businessLicensePath);
				}
				if(jsonData.permissionAccountPath!=null && jsonData.permissionAccountPath!=''){
					$("#detailHisForm #permissionAccountPath2").attr("src",jsonData.permissionAccountPath);
					$("#detailHisForm #pa").attr("href",jsonData.permissionAccountPath);
				}
				if(jsonData.legalIdNumberPath1!=null && jsonData.legalIdNumberPath1!=''){
					$("#detailHisForm #legalIdNumberPath11").attr("src",jsonData.legalIdNumberPath1);
					$("#detailHisForm #lin1").attr("href",jsonData.legalIdNumberPath1);
				}
				if(jsonData.legalIdNumberPath2!=null && jsonData.legalIdNumberPath2!=''){
					$("#detailHisForm #legalIdNumberPath22").attr("src",jsonData.legalIdNumberPath2);
					$("#detailHisForm #lin2").attr("href",jsonData.legalIdNumberPath2);
				}
                $(".required").hide();
                custManage.initShareHolderTable(jsonData.shareInfoList);
                custManage.attachInfoTable(jsonData.attachInfoList);
                //custManage.contractInfoTable(jsonData.contractInfoList);
            } else {
                bootbox.alert(data.resultNote);
                return false;
            }
        },
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}
var custManage = new Object({　　　　
    initShareHolderTable: function(data) {　　　　　　
        $('#detailHisForm #shareHolderInfoTableHis').bootstrapTable('destroy');
        $("#detailHisForm #shareHolderInfoTableHis").bootstrapTable({
            method: "post",
            data: data,
            striped: false, //表格显示条纹  
            search: false, //是否启用查询  
            showColumns: false, //显示下拉框勾选要显示的列  
            showRefresh: false, //显示刷新按钮  
            sidePagination: "server", //表示服务端请求  
            //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
            //设置为limit可以获取limit, offset, search, sort, order  
            queryParamsType: "undefined",
            responseHandler: function responseHandler(res) {
                if (res.result == 0) {
                    return {
                        "rows": res.dataList,
                        "total": res.records
                    };

                } else {
                    alert(res.resultNote);
                    return {
                        "rows": [],
                        "total": 0
                    };
                }
            },
            columns: [{
                field: 'shareName',
                title: '股东名称',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'shareProportion',
                title: '持股比例',
                align: 'center',
                valign: 'middle',
                formatter: function(value) {
                    return $.number(value, 2);
                }
            }, {
                field: 'registeredCapital',
                title: '注册资本份额',
                align: 'center',
                valign: 'middle',
                formatter: function(value) {
                    return $.number(value, 2);
                }
            }, {
                field: 'registeredCapitalProportion',
                title: '注册资本占比(%)',
                align: 'center',
                valign: 'middle',
                formatter: function(value) {
                    return $.number(value, 2);
                }
            }]
        });　　　　
    },
    　　　　attachInfoTable: function (data){
        $('#attachInfoTable').bootstrapTable('destroy');
        $("#attachInfoTable").bootstrapTable({
            method: "post",
            //url: "../uploadFile/list",
            search: false,  //是否启用查询
            showColumns: false,  //显示下拉框勾选要显示的列
            showRefresh: false,  //显示刷新按钮
            sidePagination: "client", //表示服务端请求
            //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
            //设置为limit可以获取limit, offset, search, sort, order
            data : data,
            queryParamsType : "undefined",
            responseHandler:function responseHandler(res) {
                if (res.result==0) {
                    return {
                        "rows": res.dataList,
                        "total": res.records
                    };

                } else {
                    bootbox.alert(res.resultNote);
                    return {
                        "rows": [],
                        "total": 0
                    };
                }
            },
            columns: [{
                field: 'corpConsitutionfileUrl',
                title: '附件地址',
                align: 'center',
                valign: 'middle',
                visible: false
            },{
                field: 'uploadType',
                title: '附件格式',
                align: 'center',
                valign: 'middle',
                visible: false
            },{
                field: 'corpConsitutionfileName',
                title: '附件名称',
                align: 'center',
                valign: 'middle',

            }, {
                field: 'attachType',
                title: '附件格式',
                align: 'center',
                valign: 'middle',
                visible: false
            }, {
                field: 'attachSize',
                title: '附件大小(KB)',
                align: 'center',
                valign: 'middle',
                visible: false
            }, {
                field: 'operation',
                title: '操作',
                align: 'center',
                valign: 'middle',
                formatter:function(value,row,index){
                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
                    var m = '<a class = "glyphicon glyphicon-file yulan" style="color:#d864fd;padding:0px 5px;" title="预览" data-type="attach" href="javascript:void(0)"></a>';
                    return r+"  "+m;
                },
                events: 'operateEvents'
            }]
        });
    },
    contractInfoTable: function(data) {
        $('#detailHisForm #contractInfoTable').bootstrapTable('destroy');
        $("#detailHisForm #contractInfoTable").bootstrapTable({
            method: "post",
            data: data,
            striped: false, //表格显示条纹  
            search: false, //是否启用查询  
            showColumns: false, //显示下拉框勾选要显示的列  
            showRefresh: false, //显示刷新按钮  
            sidePagination: "server", //表示服务端请求  
            //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
            //设置为limit可以获取limit, offset, search, sort, order  
            queryParamsType: "undefined",
            responseHandler: function responseHandler(res) {
                if (res.result == 0) {
                    return {
                        "rows": res.dataList,
                        "total": res.records
                    };

                } else {
                    bootbox.alert(res.resultNote);
                    return {
                        "rows": [],
                        "total": 0
                    };
                }
            },
            columns: [
  	            {
  		 	        field: 'contractid',
  		 	        title: '合同id',
  		 	        align: 'center',
  		            valign: 'middle',
  		            visible:false
  		 	    },{
  		 	        field: 'contractName',
  		 	        title: '合同名称',
  		 	        align: 'center',
  		            valign: 'middle',
  		 	    },{
  		 	        field: 'contractNum',
  		 	        title: '合同编号',
  		 	        align: 'center',
  		 	        valign: 'middle'
  		 	    }, {
  		 	        field: 'contractType',
  		 	        title: '业务类型',
  		 	        align: 'center',
  		             valign: 'middle',
  		 	    }, {
  		 	        field: 'endDate',
  		 	        title: '合同到期日',
  		 	        align: 'center',
  		             valign: 'middle',
  		 	    },{
  		 	        field: 'fileName',
  		 	        title: '合同pdf名称',
  		 	        align: 'center',
  		            valign: 'middle',
  		            visible:false
  		 	    },{
  		 	        field: 'fileUrl',
  		 	        title: '合同地址',
  		 	        align: 'center',
  		            valign: 'middle',
  		            visible:false
  		 	    }, {
  		 	        field: 'operation',
  		 	        title: '操作',
  		 	        align: 'center',
  		            valign: 'middle',
  		 	        formatter:function(value,row,index){
  		 	        	var m = '<a class = "glyphicon glyphicon-file yulan" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="contract" href="javascript:void(0)"></a>';
  		 	            return  m;
  		 	        },
  		 	        events: 'operateEvents'
  		 	    }
  	 	    ]
        });　　　　
    }
});

function numFormat() {
    $("#detailHisForm #maxCreditAmount").number(true, 2);
    $("#detailHisForm #regCap").number(true, 2);
    $("#detailHisForm #shareProportion").number(true, 2);
    $("#detailHisForm #registeredCapital").number(true, 2);
    $("#detailHisForm #registeredCapitalProportion").number(true, 2);
    $("#detailHisForm #lsMaxCreditAmount").number(true, 2);
 	$("#detailHisForm #dzMaxCreditAmount").number(true, 2);
}
window.operateEvents = {
    'click .yulan': function (e, value, row, index) {
    	window.open("/../.." + row.corpConsitutionfileUrl);//预览pdf的js方法
    }
 };

