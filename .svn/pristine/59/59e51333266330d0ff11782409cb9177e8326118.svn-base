var url = "";
$(document).ready(function() {
    getTaskData();


});

function getTaskData() {
    debugger;
    var row = store.get('agencyRow'); //从缓存中获取数据
    var taskId = row.taskId;
    var options = {
        url: '../../activiti/findDataByTaskId',
        data: '{"taskId":"' + taskId + '"}',
        callBackFun: function(data) {
            if (data.result == 0) {
                debugger;
                viewContract(data.str);

            } else {
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

//预览合同
function viewContract(data) {
    var tempdata = eval("(" + data + ")");
    var jsonData = {
        signId: tempdata.signId,
        fileId: tempdata.fileId
    };
    jsonData = JSON.stringify(jsonData);
    var options = {

        url: '../../sign/view',
        data: jsonData,
        callBackFun: function(data) {
            // reqContractPage(data);
            $('#contractFrame').attr('src', data);        }

    };
    CloudUtils.ajax(options);
}


