package com.ut.scf.dao.statistics;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

import com.ut.scf.core.dict.PageInfoBean;

public interface IAmitCashDao {
		
		List<Map<String, Object>> getCashList(Map<String, Object> paramMap,	PageInfoBean page);
		List<Map<String, Object>> getCashList(Map<String, Object> paramMap);
		List<Map<String, Object>> getDetailList(Map<String, Object> paramMap);
		
		List<Map<String, Object>> getCashHistoryList(Map<String, Object> paramMap,	PageInfoBean page);
		List<Map<String, Object>> getCashHistoryList(Map<String, Object> paramMap);
		
		@Insert("insert into dyk_cash_history values(#{payId},#{payAmit},#{payDate},#{payNote})")
		int insertCashHistory(@Param("payId")String payId,@Param("payAmit")BigDecimal payAmit,@Param("payDate")String payDate,@Param("payNote")String payNote);
}
