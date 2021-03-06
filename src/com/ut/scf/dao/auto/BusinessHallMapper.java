package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.BusinessHall;
import com.ut.scf.pojo.auto.BusinessHallExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BusinessHallMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    long countByExample(BusinessHallExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    int deleteByExample(BusinessHallExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    int deleteByPrimaryKey(Integer storeId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    int insert(BusinessHall record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    int insertSelective(BusinessHall record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    List<BusinessHall> selectByExample(BusinessHallExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    BusinessHall selectByPrimaryKey(Integer storeId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    int updateByExampleSelective(@Param("record") BusinessHall record, @Param("example") BusinessHallExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    int updateByExample(@Param("record") BusinessHall record, @Param("example") BusinessHallExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    int updateByPrimaryKeySelective(BusinessHall record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table business_hall
     *
     * @mbg.generated Tue Jul 03 17:30:15 GMT+08:00 2018
     */
    int updateByPrimaryKey(BusinessHall record);
}