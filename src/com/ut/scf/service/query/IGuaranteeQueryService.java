package com.ut.scf.service.query;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.query.GuaranteeHistoryQueryReqBean;
import com.ut.scf.reqbean.query.GuaranteeThQueryReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IGuaranteeQueryService {

	BaseRespBean getGuaranteeQueryList(Map<String, Object> paramMap, PageInfoBean page);

	/*-----------------------------查询统计新需求------------------------------*/
	BaseRespBean getGuaranteeList(Map<String, Object> paramMap, PageInfoBean page);
	/*-----------------------------保证金管理最新需求------------------------------*/
	BaseRespBean getGuaranteeHistoryList(Map<String, Object> paramMap, PageInfoBean page);
	/*-----------------------------保证金管理最新需求------------------------------*/
	BaseRespBean getGuaranteeHistoryInsert(GuaranteeHistoryQueryReqBean paramMap);
	
	BaseRespBean getGuaranteeList(Map<String, Object> paramMap);

	String exportExcel(Map<String, Object> paramMap, String path) throws Exception;

	BaseRespBean getFqcrGuaranteeHistoryList(Map<String, Object> paramMap, PageInfoBean page);

	BaseRespBean getFqcrGuaranteeList(Map<String, Object> paramMap, PageInfoBean page);

	BaseRespBean getFqcrGuaranteeThList(Map<String, Object> paramMap, PageInfoBean page);
	
	BaseRespBean getfqcrGuaranteeHistoryInsert(GuaranteeHistoryQueryReqBean reqBean);

	BaseRespBean getFqcrGuaranteeThAddList(Map<String, Object> paramMap, PageInfoBean page);

	BaseRespBean getFqcrGuaranteeThAddListInsert(GuaranteeThQueryReqBean reqBean);

	BaseRespBean getFqcrGuaranteeThAddThList(Map<String, Object> paramMap, PageInfoBean page);
}
