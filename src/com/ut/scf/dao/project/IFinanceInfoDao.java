package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.auto.FinanceInfo;

public interface IFinanceInfoDao {

	List<Map<String, Object>> getFinanceInfoList(Map<String, Object> paramMap,PageInfoBean page);
	
	List<Map<String, Object>> getFinanceInfoGroupByName(Map<String, Object> paramMap,PageInfoBean page);
	
	List<Map<String, Object>> getFinanceInfoGroupByName(Map<String, Object> paramMap);
	
	List<Map<String, Object>> getRefundDepositInfo(Map<String, Object> paramMap,PageInfoBean page);
	
	List<Map<String, Object>> getFinanceList(Map<String, Object> paramMap);
	
	List<Map<String, Object>> getOverdueInfoGroupByName(Map<String, Object> paramMap,PageInfoBean page);
	
	List<Map<String, Object>> getOverdueInfoGroupByYear(Map<String, Object> paramMap);
	
	/*-----------------------------查询统计新需求------------------------------*/
	List<Map<String, Object>> getFinanceInfoQueryList(Map<String, Object> paramMap,PageInfoBean page);

	List<Map<String, Object>> getFinanceInfoQueryList(Map<String, Object> paramMap);
	//2018-08-22日DYK业务数据概况统计
	List<Map<String, Object>> getDYKFinancePayAndRepayList(Map<String, Object> paramMap);

	FinanceInfo getDYKOccupyMoneyByDay(String dateDay);

	FinanceInfo getPayGuaranteeSum(String dateDay);

	FinanceInfo getPayAmitSum(String dateDay);

	FinanceInfo getActRepayAmtSum(String dateDay);

	FinanceInfo getDykCashHistoryList(String dateDay);
	
}
