function loadDict(selectId) {
    var dict = store.get('dictList');
    if (selectId) {
        var typeId = $("#" + selectId).attr("dictName");
        addOpt($("#" + selectId), typeId, dict);
    } else {
        var selects = $('select');
        for (var i = 0; i < selects.length; i++) {
            var typeId = $(selects[i]).attr("dictName");
            // var selectId = $(selects[i]).attr("id");
            addOpt($(selects[i]), typeId, dict);
        }
    }
}

function loadDictByParent(parentId) {
    var dict = store.get('dictList');
    var selects = $("#" + parentId + ' select');
    for (var i = 0; i < selects.length; i++) {
        var typeId = $(selects[i]).attr("dictName");
        // var selectId = $(selects[i]).attr("id");
        addOpt($(selects[i]), typeId, dict);
    }
}

function addOpt(select, typeId, dict) {
    select.html('');
    if (typeId) {
        var arr = typeId.split("-");
        if (arr.length === 2 && arr[1] === "E") {
            select.append("<option value=''>请选择</option>");
        }
        typeId = arr[0];
        var dicTemp = dict[typeId];
        for (var m = 0; m < dicTemp.length; m++) {
            var opt = "<option value='" + dicTemp[m].itemKey + "'>" + dicTemp[m].itemValue + "</option>";
            select.append(opt);
        }
    }
}


function tableMapperDic(value, dictName) {
    var dict = store.get('dictList')[dictName];
    for (var i = 0; i < dict.length; i++) {
        if (dict[i].itemKey === value) {
            return dict[i].itemValue;
        }
    }
}