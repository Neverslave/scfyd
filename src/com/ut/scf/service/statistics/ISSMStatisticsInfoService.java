package com.ut.scf.service.statistics;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ISSMStatisticsInfoService {

	BaseRespBean findStuRepayInfos(Map<String, Object> paramMap, PageInfoBean page) throws Exception;

	BaseRespBean findStuRepayInfos(Map<String, Object> paramMap) throws Exception;
	
	BaseRespBean findSupRepayInfos(Map<String, Object> paramMap, PageInfoBean page) throws Exception;
	
	BaseRespBean supRepayInfos(Map<String, Object> paramMap) throws Exception;

}
