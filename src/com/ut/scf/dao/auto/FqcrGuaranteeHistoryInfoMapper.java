package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.FqcrGuaranteeHistoryInfo;
import com.ut.scf.pojo.auto.FqcrGuaranteeHistoryInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface FqcrGuaranteeHistoryInfoMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    long countByExample(FqcrGuaranteeHistoryInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    int deleteByExample(FqcrGuaranteeHistoryInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    int deleteByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    int insert(FqcrGuaranteeHistoryInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    int insertSelective(FqcrGuaranteeHistoryInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    List<FqcrGuaranteeHistoryInfo> selectByExample(FqcrGuaranteeHistoryInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    FqcrGuaranteeHistoryInfo selectByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    int updateByExampleSelective(@Param("record") FqcrGuaranteeHistoryInfo record, @Param("example") FqcrGuaranteeHistoryInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    int updateByExample(@Param("record") FqcrGuaranteeHistoryInfo record, @Param("example") FqcrGuaranteeHistoryInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    int updateByPrimaryKeySelective(FqcrGuaranteeHistoryInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fqcr_guarantee_history_info
     *
     * @mbg.generated Tue Jul 10 10:21:52 GMT+08:00 2018
     */
    int updateByPrimaryKey(FqcrGuaranteeHistoryInfo record);
}