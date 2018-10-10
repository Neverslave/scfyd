package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.FqcrGuaranyeeCashHistory;
import com.ut.scf.pojo.auto.FqcrGuaranyeeCashHistoryExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface FqcrGuaranyeeCashHistoryMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    long countByExample(FqcrGuaranyeeCashHistoryExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    int deleteByExample(FqcrGuaranyeeCashHistoryExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    int deleteByPrimaryKey(String cashId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    int insert(FqcrGuaranyeeCashHistory record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    int insertSelective(FqcrGuaranyeeCashHistory record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    List<FqcrGuaranyeeCashHistory> selectByExample(FqcrGuaranyeeCashHistoryExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    FqcrGuaranyeeCashHistory selectByPrimaryKey(String cashId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    int updateByExampleSelective(@Param("record") FqcrGuaranyeeCashHistory record, @Param("example") FqcrGuaranyeeCashHistoryExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    int updateByExample(@Param("record") FqcrGuaranyeeCashHistory record, @Param("example") FqcrGuaranyeeCashHistoryExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    int updateByPrimaryKeySelective(FqcrGuaranyeeCashHistory record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guaranyee_cash_history
     *
     * @mbg.generated Mon Jul 16 11:44:40 GMT+08:00 2018
     */
    int updateByPrimaryKey(FqcrGuaranyeeCashHistory record);
}