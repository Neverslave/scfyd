$(function () {
    setForm();    
 });

function setForm(){
	var row = store.get('agencyRow'); //从缓存中获取数据
    var taskId = row.taskId;
	 var options = {
		url : '../../activiti/findDataByTaskId',
		data: '{"taskId":"' + taskId + '"}',
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData,"detailForm");
				initTable(jsonData.signFiles);
			} else {
				return false;
			}
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	 CloudUtils.ajax(options);
}

function initTable(data){
	$('#signDetailFiles').bootstrapTable('destroy');
    $("#signDetailFiles").bootstrapTable({
        method: "post",
        data: data,
        striped: false, //表格显示条纹  
        pagination: false, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "client", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            var param = {
                contractNo: contractNo
            };
            return JSON.stringify(param);
        },
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
        columns: [{
            field: 'fileName',
            title: '文件名称',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row) {
                var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'fileSize',
            title: '文件大小(KB)',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'materialType',
            title: '材料类型',
            align: 'center',
            valign: 'middle',
            formatter: function (value) {
                if (value == '0') {
                    return '签约视频';
                } else if (value == '1') {
                    return '授信合同';
                } else if (value == '2') {
                    return '保理合同';
                } else if (value == '3') {
                    return '中登网登记文件';
                } else if (value == '4') {
                    return '其他';
                }
            }
        }]
    });
}

