package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IBatchInfoDao {
	List<Map<String, Object>> getBatchInfoList(Map<String, Object> param,
			PageInfoBean page);
	
	List<Map<String, Object>> getBatchInfoListCheck(Map<String, Object> param,
			PageInfoBean page);
	
	
	List<Map<String, Object>> getBatchInfoListAll(Map<String, Object> param,
			PageInfoBean page);

	List<Map<String, Object>> getBatchInfoListAllSigned(Map<String, Object> param, PageInfoBean page);
	
}
