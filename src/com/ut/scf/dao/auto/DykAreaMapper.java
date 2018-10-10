package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.DykArea;
import com.ut.scf.pojo.auto.DykAreaExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface DykAreaMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_area
     *
     * @mbg.generated Fri Aug 11 11:32:31 CST 2017
     */
    long countByExample(DykAreaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_area
     *
     * @mbg.generated Fri Aug 11 11:32:31 CST 2017
     */
    int deleteByExample(DykAreaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_area
     *
     * @mbg.generated Fri Aug 11 11:32:31 CST 2017
     */
    int insert(DykArea record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_area
     *
     * @mbg.generated Fri Aug 11 11:32:31 CST 2017
     */
    int insertSelective(DykArea record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_area
     *
     * @mbg.generated Fri Aug 11 11:32:31 CST 2017
     */
    List<DykArea> selectByExample(DykAreaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_area
     *
     * @mbg.generated Fri Aug 11 11:32:31 CST 2017
     */
    int updateByExampleSelective(@Param("record") DykArea record, @Param("example") DykAreaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_area
     *
     * @mbg.generated Fri Aug 11 11:32:31 CST 2017
     */
    int updateByExample(@Param("record") DykArea record, @Param("example") DykAreaExample example);
}