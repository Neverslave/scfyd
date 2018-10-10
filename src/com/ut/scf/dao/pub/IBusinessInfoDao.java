package com.ut.scf.dao.pub;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.auto.BusinessTypeInfo;

public interface IBusinessInfoDao {
	
	List<Map<String, Object>> getBusinessIfnoPageList(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> getTypes();
	
	@Insert("insert into business_type_info(type_id, type_name,type_describe,status) values(#{typeId}, #{typeName},#{typeDescribe},1)")
	int insertBusiness(Map<String, Object> paramMap);
	@Select("select count(*) from business_type_info where type_name=#{typeName}")
	int selectCountById(String typeName);
	
	@Select("select count(*) from business_type_info where type_name=#{typeName} and type_id<>#{typeId}")
	int selectCountByIdExcepid(@Param("typeId")String typeId,@Param("typeName")String typeName);
	
	@Update("UPDATE business_type_info SET status = 0 WHERE type_id = #{typeId}")
	int deleteBusiness(String typeId);
	@Update("UPDATE business_type_info SET type_name=#{typeName},type_describe=#{typeDescribe}  WHERE type_id = #{typeId}")
	int updateBusiness(Map<String, Object> paramMap);
	@Select("select max(type_id) from business_type_info")
	String selectMaxId();
}
