package com.ut.scf.service.pub;

import java.util.Map;



import com.ut.scf.core.dict.PageInfoBean;

import com.ut.scf.respbean.BaseRespBean;

public interface IBusinessHallManagerService {
	
	public BaseRespBean getBusinessHallList(Map<String, Object> paramMap, PageInfoBean page);
	

}
