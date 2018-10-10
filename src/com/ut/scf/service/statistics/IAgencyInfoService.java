package com.ut.scf.service.statistics;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IAgencyInfoService {
	
	BaseRespBean AgencyInfoList(Map<String, Object> paramMap,PageInfoBean page);
	
	String exportExcel(Map<String, Object> paramMap, String path) throws Exception;
	
	BaseRespBean AgencyInfoList(Map<String, Object> paramMap);
}
