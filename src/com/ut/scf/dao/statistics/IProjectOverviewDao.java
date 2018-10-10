package com.ut.scf.dao.statistics;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IProjectOverviewDao {
	
	List<Map<String, Object>> getProjectOverviewList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	List<Map<String, Object>> getProjectOverviewList(Map<String, Object> paramMap);
}
