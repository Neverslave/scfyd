package com.ut.scf.service.query.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.project.IFinanceInfoDao;
import com.ut.scf.dao.query.ICarInfoListDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IFinanceQueryService;

@Service("financeQuerySevice")
public class FinanceQueryServiceImpl implements IFinanceQueryService {
	@Resource
	private ICarInfoListDao carInfoListDao;
	
	@Resource
	private IFinanceInfoDao financeInfoDao;

	// 根据融资id查询车辆信息
	@Override
	public BaseRespBean getCarInfoList(Map<String, Object> paramMap,PageInfoBean page) {
		paramMap.get("financeId");
		List<Map<String, Object>> list = carInfoListDao.getcarInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	/*-----------------------------查询统计新需求------------------------------*/
	@Override
	public BaseRespBean getFinanceInfoList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = financeInfoDao.getFinanceInfoQueryList(
				paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public BaseRespBean getFinanceInfoList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = financeInfoDao.getFinanceInfoQueryList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}
}
