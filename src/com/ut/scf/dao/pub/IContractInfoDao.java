package com.ut.scf.dao.pub;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.ut.scf.core.dict.PageInfoBean;


public interface IContractInfoDao {
	List<Map<String, Object>> selectContractList(Map<String, Object> paramMap,PageInfoBean page);
	
	@Insert("insert into contract_info (contractid, corp_id,contract_name,contract_num,contract_type,end_date,ls_max_credit_amount,dz_max_credit_amount,status,file_name,file_url) values(#{contractid}, #{corpId},#{contractName},#{contractNum},#{contractType},#{endDate},#{lsMaxCreditAmount},#{dzMaxCreditAmount},1,#{fileName},#{fileUrl})")
	int insertContract(Map<String, Object> paramMap);
	
	@Update("UPDATE contract_info SET status = 0 WHERE corp_id = #{corpId}")
	int deleteContract(String corpId);
	
	@Select("SELECT contract_num from  contract_info WHERE corp_id = #{corpId} and contract_name=#{contractName} and  status = 1 LIMIT 1")
	String selectByCorpIdAndYwxlAndName(@Param("corpId")String corpId,@Param("contractName")String contractName);
	

	
}
