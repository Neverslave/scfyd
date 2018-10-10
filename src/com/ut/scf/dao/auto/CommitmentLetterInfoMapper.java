package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.CommitmentLetterInfo;
import com.ut.scf.pojo.auto.CommitmentLetterInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CommitmentLetterInfoMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    int countByExample(CommitmentLetterInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    int deleteByExample(CommitmentLetterInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    int deleteByPrimaryKey(String templateKey);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    int insert(CommitmentLetterInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    int insertSelective(CommitmentLetterInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    List<CommitmentLetterInfo> selectByExample(CommitmentLetterInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    CommitmentLetterInfo selectByPrimaryKey(String templateKey);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    int updateByExampleSelective(@Param("record") CommitmentLetterInfo record, @Param("example") CommitmentLetterInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    int updateByExample(@Param("record") CommitmentLetterInfo record, @Param("example") CommitmentLetterInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    int updateByPrimaryKeySelective(CommitmentLetterInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table commitment_letter_info
     *
     * @mbggenerated Wed Jul 05 10:15:33 CST 2017
     */
    int updateByPrimaryKey(CommitmentLetterInfo record);
}