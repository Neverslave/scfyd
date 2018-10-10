package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import com.ut.scf.core.dict.PageInfoBean;

public interface IPayCommitmentDao {

	List<Map<String, Object>> getPayInfoList(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> getAgencyFinanceList(Map<String, Object> paramMap, PageInfoBean page);
	@Update("update finance_info set fk_template_url_new=#{commintModel} where finance_id=#{financeId} and pay_id=#{payId}")
	int updateCommintmentModel(@Param("commintModel")String commintModel,@Param("financeId")String financeId,@Param("payId")String payId);
	

}
