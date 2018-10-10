package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.TfProjectCreditFlow;
import com.ut.scf.pojo.auto.TfProjectCreditFlowExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TfProjectCreditFlowMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	long countByExample(TfProjectCreditFlowExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	int deleteByExample(TfProjectCreditFlowExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	int deleteByPrimaryKey(String id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	int insert(TfProjectCreditFlow record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	int insertSelective(TfProjectCreditFlow record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	List<TfProjectCreditFlow> selectByExample(TfProjectCreditFlowExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	TfProjectCreditFlow selectByPrimaryKey(String id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	int updateByExampleSelective(@Param("record") TfProjectCreditFlow record,
			@Param("example") TfProjectCreditFlowExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	int updateByExample(@Param("record") TfProjectCreditFlow record,
			@Param("example") TfProjectCreditFlowExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	int updateByPrimaryKeySelective(TfProjectCreditFlow record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table tf_project_credit_flow
	 * @mbg.generated  Wed Nov 01 15:01:00 CST 2017
	 */
	int updateByPrimaryKey(TfProjectCreditFlow record);
}