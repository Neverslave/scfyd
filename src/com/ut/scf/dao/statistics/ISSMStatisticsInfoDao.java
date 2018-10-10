package com.ut.scf.dao.statistics;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ISSMStatisticsInfoDao {

	List<Map<String, Object>> findStuRepayInfos(Map<String, Object> paramMap, PageInfoBean page);

	List<Map<String, Object>> findStuRepayInfos(Map<String, Object> paramMap);
	
	List<Map<String, Object>> findSupRepayInfos(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> findSupRepayInfos(Map<String, Object> paramMap);
}
