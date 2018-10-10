

$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
    signDateTime(); 
    ajaxFileUpload();
    formValidator();

    initCertifyFileListTable();
    initCorpInfo();
    checkFactorContract();
    
});

function signDateTime() {
	var date = new Date();
	var signDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
			+ date.getDate();
	$("#signDate").val(signDate);
}

function checkFactorContract() {
    var data = {
        agencyCorpId: $('#agencyCorpId').val()
    };
    var options = {
        url: '../../contract/checkProcess',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result != 0) {
                bootbox.alert(data.resultNote);
                $("#btn_save").attr("disabled", true);
            }
        },
        errorCallback: function(data) {
            bootbox.alert("error");
        }
    };
    CloudUtils.ajax(options);
}

function initCorpInfo() {
    var options = {
        url: '../../corp/dyk',
        data: {},
        callBackFun: function(data) {
            $("#corpName").val(data.corpName);
            $("#corpOrgnNum").val(data.orgnNum);
        },
        errorCallback: function(data) {
            return false;
        }
    };
    CloudUtils.ajax(options);
    var data = {};
    data.userId = store.get('userId');
    var options2 = {
        url: '../../corp/userCorpInfo',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            $("#supplierName").val(data.corpName);
            $("#supplierOrgnNum").val(data.orgnNum);
            $("#agencyCorpId").val(data.corpId);
            $("#agencyNum").val(data.agencyNum);
        },
        errorCallback: function(data) {
            return false;
        }
    };
    CloudUtils.ajax(options2);


}


function initCertifyFileListTable() {
    $('#certifyFileListTable').bootstrapTable('destroy');
    $("#certifyFileListTable").bootstrapTable({
        method: "post",
        //         url: "../..//", 
        striped: true, //表格显示条纹  
        pagination: false, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) {
            return {};
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
            title: '附件名称',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
        }, {
            field: 'fileClass',
            title: '附件类型',
            align: 'center',
            formatter: function(value) {
                if (value == '0') {
                    return '签约视频';
                } else if (value == '1') {
                    return '签约文件';
                } else if (value == '2') {
                    return '其他';
                }
            }

        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'fileSize',
            title: '文件大小(KB)',
            align: 'center',
            valign: 'middle',
            formatter:function(value){
            	return $.number(value);
            }
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                return r;
            },
            events: 'operateEvents'
        }]
    });
}

function fileSelect() {
    document.getElementById("fileupload").value = null;
    document.getElementById("fileupload").click();
}



function submitContract() {
	var list = $("#certifyFileListTable").bootstrapTable('getData');
	if(list == null||list == ""){
		bootbox.alert("请上传附件！");
	}else{
		 $('#infoForm').data('bootstrapValidator').validate();
		    if (!$('#infoForm').data('bootstrapValidator').isValid()) {
		        //没有通过校验 
		        return false;
		    } else {
		        var allTableData = $("#certifyFileListTable").bootstrapTable('getData');
		        $("#fileInfo").val(JSON.stringify(allTableData));
		        var data = CloudUtils.convertStringJson('infoForm');
		        var jsonData = eval("(" + data + ")");
		        var options = {
		            url: '../../contract/startProcess',
		            data: JSON.stringify(jsonData),
		            callBackFun: function(data) {
		                if (data.result == 0) {
		                    bootbox.alert(data.resultNote, function() {
		                        window.location.href = "../../homePage.html";
		                    });

		                } else {
		                    return false;
		                }
		            },
		            errorCallback: function(data) {
		                return false;
		            }
		        };
		        CloudUtils.ajax(options);
		    }
	}
}

function cancel() {
    window.location.href = "../../homePage.html";
}


function ajaxFileUpload() {
 	$('#fileupload').fileupload({
 		  url:"../../file/uploadFile?pathId=2",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	CloudUtils.setForm(data, 'fileInfoForm');
	            } else {
	            	bootbox.alert(data.resultNote);
	            }
	            
	     }

 	    
    });
 	$('#fileupload').bind('fileuploadadd', function (e, data) {
 		var obj = data.files[0];
 		var name = obj.name;
 		var size = obj.size;
 		if (!checkFileNum()) {
	            bootbox.alert("上传的附件数不能超过10个");
	            return false;
	        }
	        var type = name.substr(name.lastIndexOf(".")).toLowerCase();
	        if (!checkFileType(type)) {
	            bootbox.alert("仅支持上传word、excel、pdf、png、jpg类型的文件");
	            return false;
	        }
 		
 		 if (!checkFileSize(size)) {
            bootbox.alert("上传文件不超过50M");
	            return false;
	        }
	   
 	});
}



function addFile() {
    if (!$("#fileName").val()) {
        bootbox.alert("请选择文件");
        return false;
    }
    var data = CloudUtils.convertStringJson('fileInfoForm');
    data = eval("(" + data + ")");
    $("#certifyFileListTable").bootstrapTable("append", data);
    $('#fileModal').modal('hide');
    $("#fileInfoForm")[0].reset();
    addFileNum();
}

function addFileNum() {
    var num = Number($("#fileNum").val());
    $("#fileNum").val(num + 1);
}

function subFileNum() {
    var num = Number($("#fileNum").val());
    $("#fileNum").val(num - 1);
}

function checkFileNum() {
    var num = Number($("#fileNum").val());
    if (num >= 10) {
        return false;
    }
    return true;
}

var fileTypes = [".doc",".xls",".xlsx",".docx", ".pdf", ".png", ".jpg", ".mp4", ".avi"];

function checkFileType(type) {
    var result = $.inArray(type, fileTypes);
    if (result == -1) {
        return false;
    }
    return true;
}


function checkFileSize(fileSize) {
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    fileSize = Math.round(fileSize / 1024);
    if (fileSize > 50) {
        return false;
    }
    return true;
}


window.operateEvents = {
    'click .remove': function(e, value, row, index) {
        bootbox.confirm("确定删除此条记录?", function(result) {
            if (result) {
                var values = [];
                values.push(row.fileUrl);
                $("#certifyFileListTable").bootstrapTable("remove", { field: 'fileUrl', values: values });
                subFileNum();
            }
        });
    },
    'click .modify': function(e, value, row, index) {
        modFun(row);
    },

};

function formValidator() {
    $('#infoForm').bootstrapValidator({
        message: 'This value is not valid',
        excluded: ':disabled',
        group: ".valid_group",
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            remark: {
                validators: {
                    notEmpty: { message: '备注不能为空' },
                    stringLength: {
                    max: 128,
                    message: '备注长度不能超过128'
  	  } 
                }
            }
        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();
        //submitContract();
        //$(e.target).bootstrapValidator('resetForm', true);
    });
}
