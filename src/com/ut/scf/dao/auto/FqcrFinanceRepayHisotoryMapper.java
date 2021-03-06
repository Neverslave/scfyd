package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.FqcrFinanceRepayHisotory;
import com.ut.scf.pojo.auto.FqcrFinanceRepayHisotoryExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface FqcrFinanceRepayHisotoryMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    long countByExample(FqcrFinanceRepayHisotoryExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    int deleteByExample(FqcrFinanceRepayHisotoryExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    int deleteByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    int insert(FqcrFinanceRepayHisotory record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    int insertSelective(FqcrFinanceRepayHisotory record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    List<FqcrFinanceRepayHisotory> selectByExample(FqcrFinanceRepayHisotoryExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    FqcrFinanceRepayHisotory selectByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    int updateByExampleSelective(@Param("record") FqcrFinanceRepayHisotory record, @Param("example") FqcrFinanceRepayHisotoryExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    int updateByExample(@Param("record") FqcrFinanceRepayHisotory record, @Param("example") FqcrFinanceRepayHisotoryExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    int updateByPrimaryKeySelective(FqcrFinanceRepayHisotory record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_finance_repay_hisotory
     *
     * @mbg.generated Fri Aug 31 09:38:08 GMT+08:00 2018
     */
    int updateByPrimaryKey(FqcrFinanceRepayHisotory record);
}