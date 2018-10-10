package com.ut.scf.service.pub;

import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.pub.LoanInfoProcessReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IBusinessTypeInfoService {
	
	public List<Map<String, Object>> getTypes();
	
}
