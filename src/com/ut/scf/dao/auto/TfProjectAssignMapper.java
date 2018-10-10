package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.TfProjectAssign;
import com.ut.scf.pojo.auto.TfProjectAssignExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TfProjectAssignMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	int countByExample(TfProjectAssignExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	int deleteByExample(TfProjectAssignExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	int deleteByPrimaryKey(String id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	int insert(TfProjectAssign record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	int insertSelective(TfProjectAssign record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	List<TfProjectAssign> selectByExample(TfProjectAssignExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	TfProjectAssign selectByPrimaryKey(String id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	int updateByExampleSelective(@Param("record") TfProjectAssign record,
			@Param("example") TfProjectAssignExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	int updateByExample(@Param("record") TfProjectAssign record,
			@Param("example") TfProjectAssignExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	int updateByPrimaryKeySelective(TfProjectAssign record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_assign
	 * @mbggenerated  Thu Nov 30 14:03:20 CST 2017
	 */
	int updateByPrimaryKey(TfProjectAssign record);

	/**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_project_assign
     *
     * @mbg.generated Mon Nov 27 19:31:46 CST 2017
     */
    
}