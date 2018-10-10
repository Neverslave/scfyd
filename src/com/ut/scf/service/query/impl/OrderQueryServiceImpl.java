package com.ut.scf.service.query.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.auto.RepaymentPlanInfoMapper;
import com.ut.scf.dao.project.IBatchInfoDao;
import com.ut.scf.dao.query.IOrderInfoDao;
import com.ut.scf.pojo.auto.RepaymentPlanInfo;
import com.ut.scf.pojo.auto.RepaymentPlanInfoExample;
import com.ut.scf.pojo.auto.RepaymentPlanInfoExample.Criteria;
import com.ut.scf.reqbean.query.OrderInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IOrderQueryService;

@Service("orderQuerySevice")
public class OrderQueryServiceImpl implements IOrderQueryService {
	@Resource
	private IOrderInfoDao orderInfoDao;
	@Resource
	private IBatchInfoDao batchInfoDao;
	
	@Resource
	private RepaymentPlanInfoMapper repaymentPlanInfoMapper;

	// 查询订单信息
	@Override
	public BaseRespBean orderInfoInfoList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = orderInfoDao.orderInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	@Override
	public BaseRespBean orderInfoInfoListCheck(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = batchInfoDao.getBatchInfoListCheck(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	/*-----------------------------查询统计新需求------------------------------*/

	@Override
	public BaseRespBean getRepayInfo(OrderInfoListReqBean reqBean) {
		RepaymentPlanInfoExample example = new RepaymentPlanInfoExample();
		Criteria criteria = example.createCriteria();
		criteria.andOrderBatchIdEqualTo(reqBean.getOrderBatchId());
		List<RepaymentPlanInfo> listInfo = repaymentPlanInfoMapper.selectByExample(example);
		ListRespBean respBean = new ListRespBean();
		respBean.setDataList(listInfo);
		return respBean;
	}

	@Override
	public BaseRespBean getOrderInfoList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = orderInfoDao.orderInfoList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}
	
	
}
