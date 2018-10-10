package com.ut.scf.dao.query;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IGuaranteeInfoDao {

	List<Map<String, Object>> getGuaranteeQueryList(Map<String, Object> paramMap, PageInfoBean page);

	/*-----------------------------查询统计新需求------------------------------*/
	List<Map<String, Object>> getGuaranteeList(Map<String, Object> paramMap, PageInfoBean page);

	List<Map<String, Object>> getGuaranteeList(Map<String, Object> paramMap);
	/*-----------------------------查询统计新需求------------------------------*/
	List<Map<String, Object>> getFqcrGuaranteeList(Map<String, Object> paramMap, PageInfoBean page);

	List<Map<String, Object>> getFqcrGuaranteeList(Map<String, Object> paramMap);
	
	List<Map<String, Object>> getFqcrGuaranteeThList(Map<String, Object> paramMap, PageInfoBean page);
	
	
	List<Map<String, Object>> getFqcrGuaranteeThAddList(Map<String, Object> paramMap, PageInfoBean page);
	
	Map<String, Object>  getSumFqcrGuaranteeThAddList(Map<String, Object> paramMap);

	List<Map<String, Object>> getFqcrGuaranteeThAddThList(Map<String, Object> paramMap, PageInfoBean page);
	
}
