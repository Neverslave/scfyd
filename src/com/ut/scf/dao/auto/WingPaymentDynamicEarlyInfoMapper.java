package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.WingPaymentDynamicEarlyInfo;
import com.ut.scf.pojo.auto.WingPaymentDynamicEarlyInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface WingPaymentDynamicEarlyInfoMapper {
    int countByExample(WingPaymentDynamicEarlyInfoExample example);

    int deleteByExample(WingPaymentDynamicEarlyInfoExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(WingPaymentDynamicEarlyInfo record);

    int insertSelective(WingPaymentDynamicEarlyInfo record);

    List<WingPaymentDynamicEarlyInfo> selectByExample(WingPaymentDynamicEarlyInfoExample example);

    WingPaymentDynamicEarlyInfo selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") WingPaymentDynamicEarlyInfo record, @Param("example") WingPaymentDynamicEarlyInfoExample example);

    int updateByExample(@Param("record") WingPaymentDynamicEarlyInfo record, @Param("example") WingPaymentDynamicEarlyInfoExample example);

    int updateByPrimaryKeySelective(WingPaymentDynamicEarlyInfo record);

    int updateByPrimaryKey(WingPaymentDynamicEarlyInfo record);

	List<WingPaymentDynamicEarlyInfo> getByCurrentMonth(WingPaymentDynamicEarlyInfo wingPaymentDynamicEarlyInfo);
}