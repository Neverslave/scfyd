package com.ut.scf.service.statistics.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.statistics.ISalesInfoStatisticsDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.statistics.ISalesInfoStatisticsService;

@Service("salesInfoStatisticsService")
public class SalesInfoStatisticsServiceImpl implements
		ISalesInfoStatisticsService {
	@Resource
	private ISalesInfoStatisticsDao salesInfoStatisticsDao;

	@Override
	public BaseRespBean findSalesInfos(Map<String, Object> paramMap,
			PageInfoBean page) throws Exception {
		PageRespBean respBean = new PageRespBean();
		List<Map<String, Object>> carInfo = salesInfoStatisticsDao
				.findSalesInfos(paramMap, page);
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(carInfo);
		return respBean;
	}

	@Override
	public List<Map<String, Object>> findSalesInfos(Map<String, Object> paramMap) throws Exception {
		return salesInfoStatisticsDao
				.findSalesInfos(paramMap);
	}

	@Override
	public BaseRespBean staSalesInfos(Map<String, Object> paramMap)
			throws Exception {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> staInfo = salesInfoStatisticsDao
				.staSalesInfos(paramMap);
		respBean.setDataList(staInfo);
		return respBean;
	}

	@Override
	public List<Map<String, Object>> staSalesInfosWX(Map<String, Object> paramMap)
			throws Exception {
		return  salesInfoStatisticsDao
				.staSalesInfos(paramMap);
	}
}
