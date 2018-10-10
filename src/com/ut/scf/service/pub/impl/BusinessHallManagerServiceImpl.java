package com.ut.scf.service.pub.impl;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.pub.IBusinessHallDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.pub.IBusinessHallManagerService;

@Service("businessHallManagerService")
public class BusinessHallManagerServiceImpl implements IBusinessHallManagerService {
	private static final Logger log = LoggerFactory
			.getLogger(BusinessHallManagerServiceImpl.class);

	private static final SimpleDateFormat SDF = new SimpleDateFormat(
			"yyyy-MM-dd");

	@Resource
	private IBusinessHallDao businessHallDao;
	
	@Override
	public BaseRespBean getBusinessHallList(Map<String, Object> paramMap, PageInfoBean page) {
		// TODO Auto-generated method stub
		
		List<Map<String, Object>> list=businessHallDao.getBusinessHallPageList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	
	
}
