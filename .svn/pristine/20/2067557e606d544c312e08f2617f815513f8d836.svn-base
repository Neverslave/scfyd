$(document).ready(function() {
	signDateTime();
	initCntFileListTable();
	initCertifyFileListTable();
	setForm();
	if (taskDefKey == "task_contract_fw") {
		$("#btnAddFileInfo").hide();
		$('#cntFileListTable').bootstrapTable('hideColumn', 'operation');
	} else {
		$("#btnAddFileInfo").show();
	}
	$('#fileModal').on('hidden.bs.modal', function() {
		$("#fileInfoForm")[0].reset();
	});
	ajaxFileUpload();
});

function signDateTime() {
	var date = new Date();
	var signDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
			+ date.getDate();
	$("#signDate").val(signDate);
}

function initCntFileListTable() {
	$('#cntFileListTable').bootstrapTable('destroy');
	$("#cntFileListTable")
			.bootstrapTable(
					{
						method : "post",
						// url: "../..//",
						striped : true, // 表格显示条纹
						pagination : false, // 启动分页
						pageSize : 5, // 每页显示的记录数
						pageNumber : 1, // 当前第几页
						pageList : [ 5, 10, 15, 20, 25 ], // 记录数可选列表
						search : false, // 是否启用查询
						showColumns : false, // 显示下拉框勾选要显示的列
						showRefresh : false, // 显示刷新按钮
						sidePagination : "server", // 表示服务端请求
						// 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
						// 设置为limit可以获取limit, offset, search, sort, order
						queryParamsType : "undefined",
						queryParams : function queryParams(params) { // 设置查询参数
							var data = CloudUtils
									.convertStringJson('searchForm');
							var jsonData = eval("(" + data + ")");
							var param = {
								pageNumber : params.pageNumber,
								pageSize : params.pageSize,
								isPage : 1,
								productName : jsonData.productName,
							};
							return JSON.stringify(param);
						},
						responseHandler : function responseHandler(res) {
							if (res.result == 0) {
								return {
									"rows" : res.dataList,
									"total" : res.records
								};

							} else {
								bootbox.alert(res.resultNote);
								return {
									"rows" : [],
									"total" : 0
								};
							}
						},
						columns : [
								{
									field : 'fileName',
									title : '附件名称',
									align : 'center',
									valign : 'middle',
									formatter : function(value, row) {
										var a = "<a target='view_window' href='/../../.."
												+ row.fileUrl
												+ "' download='"
												+ value + "'>" + value + "</a>"
										return a;
									}
								},
								{
									field : 'fileClass',
									title : '附件类型',
									align : 'center',
									valign : 'middle',
									formatter : function(value, row, index) {
										if (value == '0') {
											return '三方协议';
										} else if (value == '1') {
											return '最高保额合同';
										} else if (value == '2') {
											return '保单附件';
										}
									}
								},
								{
									field : 'fileType',
									title : '文件格式',
									align : 'center',
									valign : 'middle',
								},
								{
									field : 'fileSize',
									title : '文件大小(KB)',
									align : 'center',
									valign : 'middle',
									formatter : function(value) {
										return $.number(value);
									}
								},
								{
									field : 'operation',
									title : '操作',
									align : 'center',
									valign : 'middle',
									formatter : function(value, row, index) {
										var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
										return r;
									},
									events : 'operateEvents'
								} ]
					});
}

function initCertifyFileListTable() {
	$('#certifyFileListTable').bootstrapTable('destroy');
	$("#certifyFileListTable").bootstrapTable(
			{
				method : "post",
				// url: "../../product/list",
				striped : true, // 表格显示条纹
				pagination : false, // 启动分页
				pageSize : 5, // 每页显示的记录数
				pageNumber : 1, // 当前第几页
				pageList : [ 5, 10, 15, 20, 25 ], // 记录数可选列表
				search : false, // 是否启用查询
				showColumns : false, // 显示下拉框勾选要显示的列
				showRefresh : false, // 显示刷新按钮
				sidePagination : "server", // 表示服务端请求
				// 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
				// 设置为limit可以获取limit, offset, search, sort, order
				queryParamsType : "undefined",
				queryParams : function queryParams(params) { // 设置查询参数
					var data = CloudUtils.convertStringJson('searchForm');
					var jsonData = eval("(" + data + ")");
					var param = {
						pageNumber : params.pageNumber,
						pageSize : params.pageSize,
						isPage : 1,
						productName : jsonData.productName,
					};
					return JSON.stringify(param);
				},
				responseHandler : function responseHandler(res) {
					if (res.result == 0) {
						return {
							"rows" : res.dataList,
							"total" : res.records
						};

					} else {
						bootbox.alert(res.resultNote);
						return {
							"rows" : [],
							"total" : 0
						};
					}
				},
				columns : [
						{
							field : 'fileName',
							title : '附件名称',
							align : 'center',
							valign : 'middle',
							formatter : function(value, row) {
								var a = "<a target='view_window' href='"
										+ row.fileUrl + "' download>" + value
										+ "</a>"
								return a;
							}
						}, {
							field : 'fileClass',
							title : '附件类型',
							align : 'center',
							valign : 'middle',
							formatter : function(value) {
								if (value == '0') {
									return '签约视频';
								} else if (value == '1') {
									return '签约文件';
								} else if (value == '2') {
									return '其他';
								}
							}
						}, {
							field : 'fileType',
							title : '文件格式',
							align : 'center',
							valign : 'middle',
						}, {
							field : 'fileSize',
							title : '文件大小(KB)',
							align : 'center',
							valign : 'middle',
							formatter : function(value) {
								return $.number(value);
							}
						} ]
			});
}

function setForm() {
	var data = {};
	data.taskId = taskId;
	var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData = eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData, "infoForm");
				// 初始化table数据
				var tableJsonData = eval("(" + $("#fileInfo").val() + ")");
				$("#certifyFileListTable").bootstrapTable("append",
						tableJsonData);
				if ($("#pmFileInfo").val()) {
					var tableJsonData2 = eval("(" + $("#pmFileInfo").val()
							+ ")");
					$("#cntFileListTable").bootstrapTable("append",
							tableJsonData2);
				}
			}
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	CloudUtils.ajax(options);
}

function saveFun() {
	getInfo($("#agree").val());
}

function fileSelect() {
	document.getElementById("fileupload").value = null;
	document.getElementById("fileupload").click();
}

function ajaxFileUpload() {
	$('#fileupload').fileupload({
		url : "../../file/uploadFile?pathId=2",
		dataType : 'json',
		// 上传完成后的执行逻辑
		done : function(e, data) {
			data = data.result;
			if (data.result == 0) {
				CloudUtils.setForm(data, 'fileInfoForm');
			} else {
				bootbox.alert(data.resultNote);
			}
		}
	});
	$('#fileupload').bind('fileuploadadd', function(e, data) {
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
	$("#cntFileListTable").bootstrapTable("append", data);
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
	var allTableData = $("#cntFileListTable").bootstrapTable('getData');
	if (allTableData.length >= 10) {
		return false;
	}
	return true;
}

function checkFileSize(fileSize) {
	fileSize = Math.round(fileSize / 1024 * 100) / 100; // 单位为KB
	fileSize = Math.round(fileSize / 1024);
	if (fileSize > 50) {
		return false;
	}
	return true;
}

var fileTypes = [ ".doc", ".xls", ".xlsx", ".docx", ".pdf", ".png", ".jpg",
		".mp4", ".avi" ];

function checkFileType(type) {
	var result = $.inArray(type, fileTypes);
	if (result == -1) {
		return false;
	}
	return true;
}

function download() {
	var path = $("#filePath").val();
	$.ajax({
		type : "get",
		dataType : "text",
		url : "http://localhost:8080/Practice/exit",
		data : {
			"filePath" : path
		},
		success : function(data) {
			// window.location.href="http://localhost:8080/Practice/letGo?filePath="
			// + path;
			$("#first").attr("src",
					'http://localhost:8080/Practice/letGo?filePath=' + path);
			// $("#down").attr("href",
			// "http://localhost:8080/Practice/letGo?filePath=" + path);
		}
	});
}

function getInfo(type) {
	if (taskDefKey == "task_contract_pm") {
		var allTableData = $("#cntFileListTable").bootstrapTable('getData');
		$("#pmFileInfo").val(JSON.stringify(allTableData));
	}

	var fileInfo = $("#fileInfo").val();
	if (fileInfo) {
		fileInfo = eval("(" + fileInfo + ")");
	}

	var data = CloudUtils.convertStringJson('infoForm');
	data = eval("(" + data + ")");
	data.agree = type;
	data.advice = $("#advice").val();
	data.taskId = taskId;
	if (type == "0" && taskDefKey == "task_contract_fw") {
		// 添加
		var options = {
			url : '../../contract/add_Task',
			data : JSON.stringify(data),
			callBackFun : function(data) {
				bootbox
						.alert(
								data.resultNote,
								function() {
									window.location.href = '../../project/agencyTask/agencyTask.html';
								});
			},
			errorCallback : function(data) {
				bootbox.alert(data.resultNote);
				return false;
			}
		};
		CloudUtils.ajax(options);

	} else {
		var allTableData = $("#cntFileListTable").bootstrapTable('getData');
		if (type == "0" && (allTableData == null || allTableData == "") ) {
			bootbox.alert("请项目经理上传附件");
			}else if (type == "1"){
				var options = {
						url : '../../contract/doAgree',
						data : JSON.stringify(data),
						callBackFun : function(data) {
							bootbox
									.alert(
											data.resultNote,
											function() {
												window.location.href = '../../project/agencyTask/agencyTask.html';
											});
						},
						errorCallback : function(data) {
							bootbox.alert(data.resultNote);
							return false;
						}
					};
					CloudUtils.ajax(options);
			}else {
				var options = {
						url : '../../contract/doAgree',
						data : JSON.stringify(data),
						callBackFun : function(data) {
							bootbox
									.alert(
											data.resultNote,
											function() {
												window.location.href = '../../project/agencyTask/agencyTask.html';
											});
						},
						errorCallback : function(data) {
							bootbox.alert(data.resultNote);
							return false;
						}
					};
					CloudUtils.ajax(options);
			}
	}
}

window.operateEvents = {
	'click .remove' : function(e, value, row, index) {
		bootbox.confirm("确定删除此条记录?", function(result) {
			if (result) {
				var values = [];
				values.push(row.fileUrl);
				$("#cntFileListTable").bootstrapTable("remove", {
					field : 'fileUrl',
					values : values
				});
				subFileNum();
			}
		});
	},
	'click .modify' : function(e, value, row, index) {
		modFun(row);
	},

};
