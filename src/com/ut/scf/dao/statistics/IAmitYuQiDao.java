package com.ut.scf.dao.statistics;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

import com.ut.scf.core.dict.PageInfoBean;

public interface IAmitYuQiDao {
	List<Map<String, Object>> getYuQiList(Map<String, Object> paramMap,	PageInfoBean page);
	List<Map<String, Object>> getYuQiList(Map<String, Object> paramMap);
	
	List<Map<String, Object>> getYuQiHistoryList(Map<String, Object> paramMap,	PageInfoBean page);
	List<Map<String, Object>> getYuQiHistoryList(Map<String, Object> paramMap);
	
	@Insert("insert into yuqi_history values(#{financeId},#{yuqiDate},#{yuqiAmit},#{yuqiDay})")
	int insertYuQiHistory(@Param("financeId")String financeId,@Param("yuqiDate")String yuqiDate,@Param("yuqiAmit")BigDecimal yuqiAmit,@Param("yuqiDay")int yuqiDay);
	
	List<Map<String, Object>> getYuQiRepaySum(Map<String, Object> paramMap,PageInfoBean page);
	List<Map<String, Object>> getLsYuQiList(Map<String, Object> paramMap);
	List<Map<String, Object>> getLsYuQiXiangXiList(Map<String, Object> paramMap);
	List<Map<String, Object>> getQuYuHuanKuanLsList(Map<String, Object> paramMap);
}
