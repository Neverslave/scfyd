package com.ut.scf.web.controller.sys;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.pojo.auto.SysDictItem;
import com.ut.scf.reqbean.sys.DictionaryReqBean;
import com.ut.scf.reqbean.sys.WarningReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.service.sys.IDictionaryService;
import com.ut.scf.service.sys.IWarningService;
import com.ut.scf.web.controller.BaseJsonController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.w3c.dom.ls.LSInput;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/dict")
public class DictionaryController extends BaseJsonController {

	@Resource
	private IDictionaryService dictionaryService;

	// 加载字典信息
	@RequestMapping(value = "/load")
	@ResponseBody
	public List<SysDictItem> loadDict(@RequestBody DictionaryReqBean reqBean) {
		List<SysDictItem> dictItems =  dictionaryService.loadDict(reqBean.getTypeIds());
		return dictItems;
	}
	
	@RequestMapping(value = "/loadAll")
	@ResponseBody
	public BaseRespBean loadAllDict() {
		BaseRespBean respBean = dictionaryService.loadAllDict();
		return respBean;
	}

}
