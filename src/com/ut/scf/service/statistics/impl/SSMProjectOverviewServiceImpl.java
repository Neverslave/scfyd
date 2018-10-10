package com.ut.scf.service.statistics.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.statistics.ISSMProjectOverviewDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.statistics.ISSMProjectOverviewService;

@Service("ssmProjectOverviewService")
public class SSMProjectOverviewServiceImpl implements ISSMProjectOverviewService {

	@Resource
	private ISSMProjectOverviewDao ssmProjectOverviewDao;

	@Override
	public BaseRespBean throwInfoList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = ssmProjectOverviewDao.findThrowInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public BaseRespBean oweInfoList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = ssmProjectOverviewDao.findOweInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public BaseRespBean echartsOrderInfos(Map<String, Object> paramMap) throws Exception {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> staInfo = ssmProjectOverviewDao.echartsOrderInfos(paramMap);
		respBean.setDataList(staInfo);
		return respBean;
	}

	@Override
	public BaseRespBean echartsAmtInfos(Map<String, Object> paramMap) throws Exception {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> staInfo = ssmProjectOverviewDao.echartsAmtInfos(paramMap);
		respBean.setDataList(staInfo);
		return respBean;
	}

	@Override
	public BaseRespBean echartsOverdueInfos(Map<String, Object> paramMap) throws Exception {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> staInfo = ssmProjectOverviewDao.echartsOverdueInfos(paramMap);
		respBean.setDataList(staInfo);
		return respBean;
	}

	@Override
	public BaseRespBean throwInfoList(Map<String, Object> paramMap) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> staInfo = ssmProjectOverviewDao.findThrowInfoList(paramMap);
		respBean.setDataList(staInfo);
		return respBean;
	}

	@Override
	public BaseRespBean oweInfoList(Map<String, Object> paramMap) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> staInfo = ssmProjectOverviewDao.findOweInfoList(paramMap);
		respBean.setDataList(staInfo);
		return respBean;
	}

}
