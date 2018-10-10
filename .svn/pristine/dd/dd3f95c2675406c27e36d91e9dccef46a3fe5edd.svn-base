$(document).ready(function() {
    $("form").attr("autocomplete", "off");
    CloudUtils.getMenuNames("nav");

    $('#bookInfoModal').on('hidden.bs.modal', function() {
        $("#bookSearchForm")[0].reset();
    });
    loadDict();
    formValidator();
    dateLoad();
}); 

function submit() {
    if (!$('#loanId').val()) {
        bootbox.alert("请选择支付通知书信息");
        return false;
    }

    $('#addForm').data('bootstrapValidator').validate();
    if (!$('#addForm').data('bootstrapValidator').isValid()) {
        //校验不通过 
        return false;
    }
    var data = CloudUtils.convertStringJson('addForm');
    var options = {
    	method:"post",
        url: "../../tradfact/sendNotice",
        data: data,
        callBackFun: function(data) {
            if (data.result == 0) {
                bootbox.alert(data.resultNote, function() {
                    window.location.href = '../../homePage.html';
                });
            } else {
                bootbox.alert(data.resultNote);
                return false;
            }
        },
        errorCallback: function(data) {
            bootbox.alert("error");
            return false;
        }
    };
    CloudUtils.ajax(options);
}

function searchBook() {
    $("#bookInfoModal").modal();
    initBookListTable();
}

function searchBookNo() {
    initBookListTable();
}

function initBookListTable() {
	debugger;
    $('#bookListTable').bootstrapTable('destroy');
    $("#bookListTable").bootstrapTable({
        method: "post",
        url: "../../tradfact/bookInfo",
        striped: true, // 表格显示条纹
        pagination: true, // 启动分页
        pageSize: 5, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [5, 10, 15, 20, 25], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        clickToSelect: true, //是否启用点击选中行
        sidePagination: "server", // 表示服务端请求
        queryParamsType: "undefined",
        singleSelect: true,
        queryParams: function queryParams(params) { // 设置查询参数
        	var data = CloudUtils.convertStringJson('bookSearchForm');
        	var jsonData = eval("(" + data + ")");
        	jsonData.pageNumber = params.pageNumber;
            jsonData.pageSize = params.pageSize;
            return JSON.stringify(jsonData);
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
            checkbox: true
        }, {
            field: 'loanId',
            title: '放款编号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'projectName',
            title: '项目名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'buyerName',
            title: '买方名称',
            align: 'center',
            valign: 'middle'
            
        }, {
            field: 'sellerName',
            title: '卖方名称',
            align: 'center',
            valign: 'middle'
        }, {
        	field: 'moneyPerson',
            title: '贷款人',
            align: 'center',
            valign: 'middle',
            formatter:function (value){
            	if(value == '0'){
            		return '买方';
            	}else if(value == '1'){
            		return '卖方';
            	}
            }
        },{
            field: 'noticeNo',
            title: '支付通知书编号',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row) {
                var a = "<a target='view_window' href='/../../.." + row.noticePath + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
        }]
    });
}
function bookInfo() {
    var rows = $('#bookListTable').bootstrapTable('getSelections');
    if (rows.length > 0) {
        var row = $('#bookListTable').bootstrapTable('getSelections')[0];
        $('#loanId').val(row.loanId);
        $('#projectName').val(row.projectName);
        $('#buyerName').val(row.buyerName);
        $('#sellerName').val(row.sellerName);
        $('#noticeNo').val(row.noticeNo);
        $('#moneyPerson').val(row.moneyPerson);
        $('#contractId').val(row.contractId);
    }

}
//form验证规则
function formValidator() {
    $('#addForm').bootstrapValidator({
            message: 'This value is not valid',
            excluded: ':disabled',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            	expressName:{
            		validators:{
            			notEmpty:{message:'快递公司不能为空'},
            		}
            	},
            	expressNo:{
            		validators:{
            			notEmpty:{message:'运单号不能为空'},
            		}
            	}
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
        });
}
function dateLoad(){
	$("#sendDate").val(store.get("serverDate"));
	$("#sendDate").datetimepicker({
		language:'zh-CN',
		autoclose:1,
		todayBtn:true,
		pickerPosition:"bottom-left",
		minuteStep:5,
		format:'yyyy-mm-dd',
		minView:'month'
	}).on('hide', function(e){
		$('#addForm').data('bootstrapValidator')
        .updateStatus('sendDate', 'NOT_VALIDATED', null)
        .validateField('sendDate');
	});
}

function cancel(){
	window.location.href = "../../homePage.html";
}


