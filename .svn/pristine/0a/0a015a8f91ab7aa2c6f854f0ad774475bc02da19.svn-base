package com.ut.scf.service.statistics.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.statistics.ISSMStatisticsInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.statistics.ISSMStatisticsInfoService;

@Service("ssmStatisticsInfoService")
public class SSMStatisticsInfoServiceImpl implements ISSMStatisticsInfoService {
	@Resource
	private ISSMStatisticsInfoDao ssmStatisticsInfoDao;

	@Override
	public BaseRespBean findStuRepayInfos(Map<String, Object> paramMap, PageInfoBean page) throws Exception {
		PageRespBean respBean = new PageRespBean();
		List<Map<String, Object>> ssmStuRepayInfo = ssmStatisticsInfoDao.findStuRepayInfos(paramMap, page);
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(ssmStuRepayInfo);
		return respBean;
	}

	@Override
	public BaseRespBean findSupRepayInfos(Map<String, Object> paramMap, PageInfoBean page) throws Exception {
		PageRespBean respBean = new PageRespBean();
		List<Map<String, Object>> ssmStuRepayInfo = ssmStatisticsInfoDao.findSupRepayInfos(paramMap, page);
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(ssmStuRepayInfo);
		return respBean;
	}

	@Override
	public BaseRespBean findStuRepayInfos(Map<String, Object> paramMap) throws Exception {
		List<Map<String, Object>> list = ssmStatisticsInfoDao.findStuRepayInfos(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	public BaseRespBean supRepayInfos(Map<String, Object> paramMap)
			throws Exception {
		List<Map<String, Object>> ssmStuRepayInfo = ssmStatisticsInfoDao.findSupRepayInfos(paramMap);
		ListRespBean respBean = new ListRespBean();
		respBean.setDataList(ssmStuRepayInfo);
		return respBean;
	}
}
