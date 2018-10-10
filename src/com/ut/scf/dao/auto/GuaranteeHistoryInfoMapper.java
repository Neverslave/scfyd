package com.ut.scf.dao.auto;

import com.ut.scf.reqbean.query.GuaranteeHistoryQueryReqBean;

public interface GuaranteeHistoryInfoMapper {

	
	int insertSelective(GuaranteeHistoryQueryReqBean record);

	
}