package com.ut.scf.dao.query;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;

import com.ut.scf.core.dict.PageInfoBean;

public interface IGuaranteeHistoryInfoDao {

	List<Map<String, Object>> getGuaranteeHistoryQueryList(Map<String, Object> paramMap, PageInfoBean page);

	/*-----------------------------查询统计新需求------------------------------*/
	List<Map<String, Object>> getGuaranteeHistoryList(Map<String, Object> paramMap, PageInfoBean page);

	List<Map<String, Object>> getGuaranteeHistoryList(Map<String, Object> paramMap);
	
	@Select("select SUM(pay_guarantee) from guarantee_history_info WHERE finance_id=#{financeId}")
	String selectSumPayGuarantee(String financeId);

	@Select("select SUM(pay_guarantee) from fqcr_guarantee_history_info WHERE batch_id=#{batchId}")
	String selectSumFqcrPayGuarantee(String batchId);
	
	List<Map<String, Object>> getFqcrGuaranteeHistoryList(Map<String, Object> paramMap, PageInfoBean page);

	@Select("select SUM(pay_guarantee) from fqcr_guarantee_history_info WHERE batch_id=#{bactchId}")
	String selectFqcrSumPayGuarantee(String string);
}
