$(document).ready(function () {
    CloudUtils.getMenuNames("nav");
    loadDict();
    initTable();

});

function searchFun() {
    initTable();
}

window.operateEvents = {
    'click .detail': function (e, value, row, index) {
        debugger
        store.set('tf_project_query', row);
        $('#mainFrame', top.document).attr('src', 'query/tfProjectDetail.html');
    }
};

function initTable() {
    $('#financeListTable').bootstrapTable('destroy');
    $("#financeListTable")
        .bootstrapTable(
            {
                method: "post",
                url: "../query/projectInfo/list",
                striped: true, //表格显示条纹
                pagination: true, //启动分页
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
                    var dataTemp = CloudUtils
                        .convertStringJson('searchForm');
                    var jsonData = eval("(" + dataTemp + ")");
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
                columns: [
                    {
                        field: 'projectName',
                        title: '项目名称',
                        align: 'center',
                        valign: 'middle'
                    },
                    {
                        field: 'corpBuyName',
                        title: '买方名称',
                        align: 'center',
                        valign: 'middle'
                    },
                    {
                        field: 'corpSaleName',
                        title: '卖方名称',
                        align: 'center',
                        valign: 'middle'
                    },
                    {
                        field: 'creditMain',
                        title: '授信主体',
                        align: 'center',
                        valign: 'middle',
                        formatter: function (value) {
                            if (value == '0') {
                                return '买方';
                            } else if (value == '1') {
                                return '卖方';
                            }
                        }
                    },
                    {
                        field: 'creditAmount',
                        title: '授信金额',
                        align: 'center',
                        valign: 'middle',
                        formatter: function (value) {
                            return $.number(value, 2);
                        }
                    },
                    {
                        field: 'factoringType',
                        title: '保理类型',
                        align: 'center',
                        valign: 'middle',
                        formatter: function (value) {
                            return tableMapperDic(value,"factoring_type");

                        }
                    }, {
                        field: 'projectStatus',
                        title: '项目状态',
                        align: 'center',
                        valign: 'middle',
                        formatter: function (value) {
                            if (value == '10') {
                                return '已立项';
                            } else if (value == '20') {
                                return '尽调中';
                            } else if (value == '21') {
                                return '尽调完成';
                            } else if (value == '30') {
                                return '预评审中';
                            } else if (value == '31') {
                                return '预评审完成';
                            } else if (value == '40') {
                                return '上会中';
                            } else if (value == '41') {
                                return '上会完成';
                            } else if (value == '50') {
                                return '已批复';
                            }else if (value == '51') {
                                return '待定';
                            }else if (value == '52') {
                                return '批复已关闭';
                            }else if (value == '60') {
                                return '签约申请中';
                            }else if (value == '61') {
                                return '签约完成';
                            }
                        }
                    },
                    {
                        field: 'operation',
                        title: '项目详情',
                        align: 'center',
                        valign: 'middle',
                        formatter: function (value, row, index) {
                            var m = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
                            return m;
                        },
                        events: 'operateEvents'
                    }]
            });
}





