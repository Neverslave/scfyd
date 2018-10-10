package com.ut.scf.service.statistics;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ISSMProjectOverviewService {
	BaseRespBean throwInfoList(Map<String, Object> paramMap, PageInfoBean page);
	
	BaseRespBean throwInfoList(Map<String, Object> paramMap);

	BaseRespBean oweInfoList(Map<String, Object> paramMap, PageInfoBean page);
	
	BaseRespBean oweInfoList(Map<String, Object> paramMap);

	BaseRespBean echartsOrderInfos(Map<String, Object> paramMap) throws Exception;

	
	BaseRespBean echartsAmtInfos(Map<String, Object> paramMap) throws Exception;

	BaseRespBean echartsOverdueInfos(Map<String, Object> paramMap) throws Exception;
}
