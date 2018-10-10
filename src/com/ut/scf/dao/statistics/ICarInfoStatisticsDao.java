package com.ut.scf.dao.statistics;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ICarInfoStatisticsDao {

	List<Map<String, Object>> findCarInfos(Map<String, Object> paramMap,
			PageInfoBean page);
	
	List<Map<String, Object>> findCarInfos(Map<String, Object> paramMap);
}
