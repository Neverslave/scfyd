package com.ut.scf.dao.statistics;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;

import com.ut.scf.core.dict.PageInfoBean;

public interface ISSMProjectSummaryDao {
	List<Map<String, Object>> getSummaryInfoList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	List<Map<String, Object>> getSummaryInfoList(Map<String, Object> paramMap);
	
	@Select("select max(current_month) from wing_payment_dynamic_info where people_type=#{peopleType}")
	String getMaxCurentMonth(String peopleType);
	List<Map<String, Object>> getWingRepaymentDynamicList(Map<String, Object> paramMap,
			PageInfoBean page);
	List<Map<String, Object>> createWingRepaymentDynamicList(Map<String, Object> paramMap);
	
/*	@Select("select max(current_month) from wing_payment_dynamic_info where people_type=#{peopleType}")
	String getMaxStaticCurentMonth(String peopleType);
	@Select("select max(current_month) from wing_payment_dynamic_info where people_type=#{peopleType}")
	String getMaxStaticCurentRepayMonth(String peopleType);*/
	List<Map<String, Object>> getWingRepaymentStaticList(Map<String, Object> paramMap,
			PageInfoBean page);



	List<Map<String, Object>> createWingRepaymentStaticList(Map<String, Object> paramMap);
	List<Map<String, Object>> getWingRepaymentMonthlyList(Map<String, Object> paramMap);
	List<Map<String, Object>> createWingRepaymentMonthlyList(Map<String, Object> paramMap);
	
	List<Map<String, Object>> getWingRepaymentYuqiList(Map<String, Object> paramMap);
	List<Map<String, Object>> createWingRepaymentYuqiList(Map<String, Object> paramMap);


}
