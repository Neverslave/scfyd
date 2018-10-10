package com.ut.scf.service.statistics.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.dao.auto.WingPaymentDynamicEarlyInfoMapper;
import com.ut.scf.pojo.auto.WingPaymentDynamicEarlyInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.statistics.WingPaymentDynamicEarlyInfoService;

@Service("wingPaymentDynamicEarlyInfoService")
public class WingPaymentDynamicEarlyInfoServiceImpl implements WingPaymentDynamicEarlyInfoService {
	@Resource
	private WingPaymentDynamicEarlyInfoMapper wingPaymentDynamicEarlyInfoMapper;

	@Override
	public BaseRespBean getByCurrentMonth(WingPaymentDynamicEarlyInfo wingPaymentDynamicEarlyInfo) {
		
		List<WingPaymentDynamicEarlyInfo> list=wingPaymentDynamicEarlyInfoMapper.getByCurrentMonth(wingPaymentDynamicEarlyInfo);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}

	
}
