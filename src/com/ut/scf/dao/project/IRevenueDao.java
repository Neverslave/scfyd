package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IRevenueDao {
	
	List<Map<String, Object>> getRevenueInfoByAgency(Map<String, Object> paramMap,PageInfoBean page);
	List<Map<String, Object>> getRevenueInfoByAgency(Map<String, Object> paramMap);
}
