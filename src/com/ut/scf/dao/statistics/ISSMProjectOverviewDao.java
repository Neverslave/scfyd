package com.ut.scf.dao.statistics;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ISSMProjectOverviewDao {
	List<Map<String, Object>> findThrowInfoList(Map<String, Object> paramMap, PageInfoBean page);

	List<Map<String, Object>> findThrowInfoList(Map<String, Object> paramMap);

	List<Map<String, Object>> findOweInfoList(Map<String, Object> paramMap, PageInfoBean page);

	List<Map<String, Object>> findOweInfoList(Map<String, Object> paramMap);

	
	List<Map<String, Object>> echartsOrderInfos(Map<String, Object> paramMap);

	List<Map<String, Object>> echartsAmtInfos(Map<String, Object> paramMap);

	List<Map<String, Object>> echartsOverdueInfos(Map<String, Object> paramMap);

}
