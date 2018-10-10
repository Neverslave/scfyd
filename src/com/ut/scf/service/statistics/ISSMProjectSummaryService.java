package com.ut.scf.service.statistics;

import java.text.ParseException;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.statistics.SSMProjectSummaryListReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ISSMProjectSummaryService {
	BaseRespBean SummaryInfoList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	BaseRespBean SummaryInfoList(Map<String, Object> paramMap);
	BaseRespBean WingRepaymentDynamicList(Map<String, Object> paramMap,
			PageInfoBean page);
	BaseRespBean createWingRepaymentDynamicList(SSMProjectSummaryListReqBean reqBean) throws ParseException;
	
	BaseRespBean WingRepaymentStaticList(Map<String, Object> paramMap,
			PageInfoBean page);
	BaseRespBean createWingRepaymentStaticList(SSMProjectSummaryListReqBean reqBean) throws ParseException;
	
	BaseRespBean WingRepaymentMonthlyList(Map<String, Object> paramMap);

	BaseRespBean CreateWingRepaymentMonthly();
	
	BaseRespBean WingRepaymentYuqiList(Map<String, Object> paramMap);

	BaseRespBean CreateWingRepaymentYuqi();

	BaseRespBean wingPaymentYuqiInfo();

	BaseRespBean justOperate();
}
