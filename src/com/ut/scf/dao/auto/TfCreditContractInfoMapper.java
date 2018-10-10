package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.TfCreditContractInfo;
import com.ut.scf.pojo.auto.TfCreditContractInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TfCreditContractInfoMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    int countByExample(TfCreditContractInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    int deleteByExample(TfCreditContractInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    int deleteByPrimaryKey(String projectId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    int insert(TfCreditContractInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    int insertSelective(TfCreditContractInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    List<TfCreditContractInfo> selectByExample(TfCreditContractInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    TfCreditContractInfo selectByPrimaryKey(String projectId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    int updateByExampleSelective(@Param("record") TfCreditContractInfo record, @Param("example") TfCreditContractInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    int updateByExample(@Param("record") TfCreditContractInfo record, @Param("example") TfCreditContractInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    int updateByPrimaryKeySelective(TfCreditContractInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tf_credit_contract_info
     *
     * @mbggenerated Fri Oct 27 09:39:59 CST 2017
     */
    int updateByPrimaryKey(TfCreditContractInfo record);
}