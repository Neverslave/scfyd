package com.ut.scf.dao.tradfact;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IProjectAdjustDao {
	
	List<Map<String, Object>> selectProjectInfo(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> selectRiskManagerInfo(Map<String, Object> paramMap, PageInfoBean page);
	
}
