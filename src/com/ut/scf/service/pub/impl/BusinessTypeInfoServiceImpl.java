package com.ut.scf.service.pub.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.dao.pub.IBusinessInfoDao;
import com.ut.scf.service.pub.IBusinessTypeInfoService;

@Service("businessTypeInfoService")
public class BusinessTypeInfoServiceImpl implements IBusinessTypeInfoService {
	
	@Resource
    private IBusinessInfoDao businessInfo;

	
	@Override
	public List<Map<String, Object>> getTypes() {
		List<Map<String, Object>> businessInfos = businessInfo.getTypes();
		return businessInfos;
	}

	
}
