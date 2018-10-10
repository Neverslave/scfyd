package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface ICarInfoDao {
	List<Map<String, Object>> getCarInfo(Map<String, Object> paramMap);
	
	@Select("select count(*) from car_info where car_frame_num=#{carFrameNum} and finance_id<>#{financeId} and sale_status<>99")
	int getcountByExcepFinanceId(@Param("carFrameNum")String carFrameNum,@Param("financeId")String financeId);

	@Select("select car_frame_num from car_info where finance_id=#{financeId} and sale_status=0")
	List<String> getCarFrameNumList(String financeId);
	
	@Select("select sum(car_actual_price) from car_info where finance_id=#{financeId} and sale_status=0")
	String getCarSumPrice(String financeId);
	
	@Select("select sum(car_actual_price) from car_info where finance_id=#{financeId} and sale_status=1")
	String getCarSumPriceSale(String financeId);
	
	@Select("select sum(car_actual_price) from car_info where finance_id=#{financeId} and sale_status<>99")
	String getCarSumPriceAll(String financeId);
}
