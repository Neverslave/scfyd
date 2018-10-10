package com.ut.scf.service.statistics.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.statistics.ICarInfoStatisticsDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.statistics.ICarInfoStatisticsService;

@Service("carInfoStatisticsService")
public class CarInfoStatisticsServiceImpl implements ICarInfoStatisticsService {
	@Resource
	private ICarInfoStatisticsDao carInfoStatisticsDao;

	@Override
	public BaseRespBean findCarInfos(Map<String, Object> paramMap,
			PageInfoBean page) throws Exception {
		PageRespBean respBean = new PageRespBean();
		List<Map<String, Object>> carInfo = carInfoStatisticsDao.findCarInfos(
				paramMap, page);
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(carInfo);
		return respBean;
	}

	@Override
	public BaseRespBean findCarInfos(Map<String, Object> paramMap) throws Exception {
		List<Map<String, Object>> list = carInfoStatisticsDao.findCarInfos(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}
}
