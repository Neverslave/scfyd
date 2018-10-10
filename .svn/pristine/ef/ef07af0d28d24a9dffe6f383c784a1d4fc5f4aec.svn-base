package com.ut.scf.dao.project;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.ut.scf.core.dict.PageInfoBean;

public interface ISignContractDao {

	List<Map<String, Object>> orderInfoByBatchId(Map<String, Object> paramMap,
			PageInfoBean page);
	List<Map<String, Object>> orderInfoByBatchId(Map<String, Object> paramMap);
	
	String getMaxContratNo(Map<String, Object> paramMap);
	Map<String, Object> getRejOrderSum(Map<String, Object> paramMap);
	Map<String, Object> getRecOrderSum(Map<String, Object> paramMap);
	
	Map<String, Object> getRejOrderCatchSum(Map<String, Object> paramMap);
	Map<String, Object> getRecOrderCatchSum(Map<String, Object> paramMap);
	List<Map<String, Object>> getRecOrderAndPeopleType(Map<String, Object> paramMap);
	@Update("delete from repayment_plan_info where order_batch_id=#{batchId} ")
	int deleteRepayPlanByBatchId( String batchId);
	@Update("delete from repayment_plan_user_info where batch_id=#{batchId} ")
	int deleteRepayUserPlanByBatchId( String batchId);
	@Update("delete from repayment_plan_user_info where order_id=#{orderId} ")
	int deleteRepayUserPlanByOrderId( String orderId);
	int orderCheckCatchInsert(Map<String, Object> paramMap);
	
	List<Map<String, Object>> selectOrderCheckCatch(Map<String, Object> paramMap);
	
	
	@Select("SELECT temp.order_id FROM ( SELECT order_id, order_id_yi FROM order_info WHERE batch_id = #{batchId} ) temp WHERE NOT EXISTS ( SELECT 1 FROM ( SELECT order_id_yi FROM order_info_yi WHERE order_id_yi IN ( SELECT order_id_yi FROM order_info WHERE batch_id = #{batchId} ) ) temp2 WHERE temp.order_id_yi = temp2.order_id_yi ) ")
	List<String> validateOrderCheckCatch(String batchId);
	
	@Update("delete from order_check_catch where batchId=#{batchId} ")
	void truncateCheckCatch( String batchId);
	
	@Select("SELECT	order_id FROM	order_info a WHERE	batch_id = #{batchId} AND state = '1' AND NOT EXISTS (	SELECT 1 FROM 	repayment_plan_info b	WHERE 	batch_id = #{batchId} and a.order_id=b.order_id)")
	List<String> checkRepayment(String batchId);
	@Select("select order_id,batch_id,people_type from order_no_repay")
	List<Map<String, String>> selectOrderCatch111();
	void updateOrderInfoIrr(Map<String, Object> paramMapOrder);
	
	@Select("select order_id,need_money from qqq_aaaa")
	List<Map<String, Object>> selee();
	@Select("select needmoney as need_money  from order_info where order_id=#{order_id}")
	String selbb(String order_id);
	@Update("update  qqq_aaaa set yinxf_money=#{money} where order_id=#{order_id} ")
	void updateaaa(@Param("order_id")String order_id,@Param("money")String money);
	

}
