package com.ut.scf.service.statistics.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.statistics.IProjectOverviewDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.statistics.IProjectOverviewService;

@Service("projectOverviewService")
public class ProjectOverviewServiceImpl implements IProjectOverviewService{

	@Resource
	private IProjectOverviewDao projectOverviewDao;
	
	@Override
	public BaseRespBean ProjectOverviewList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = projectOverviewDao.getProjectOverviewList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public BaseRespBean ProjectOverviewList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = projectOverviewDao.getProjectOverviewList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}
	
}
