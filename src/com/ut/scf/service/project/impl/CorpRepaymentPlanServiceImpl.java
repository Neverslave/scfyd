package com.ut.scf.service.project.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ut.scf.dao.auto.RepaymentPlanUserInfoMapper;
import com.ut.scf.dao.auto.RepaymentPlanUserUnInfoMapper;
import com.ut.scf.pojo.auto.RepaymentPlanUserInfo;
import com.ut.scf.pojo.auto.RepaymentPlanUserInfoExample;
import com.ut.scf.pojo.auto.RepaymentPlanUserInfoExample.Criteria;
import com.ut.scf.pojo.auto.RepaymentPlanUserUnInfo;
import com.ut.scf.pojo.auto.RepaymentPlanUserUnInfoExample;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.project.ICorpRepaymentPlanService;

@Service("corpRepaymentPlanService")
public class CorpRepaymentPlanServiceImpl implements ICorpRepaymentPlanService {

    Logger log = LoggerFactory.getLogger(this.getClass());

	@Resource
	private RepaymentPlanUserInfoMapper repaymentPlanUserInfoMapper;
	@Resource
	private RepaymentPlanUserUnInfoMapper repaymentPlanUserUnInfoMapper;

	@Override
	public PageRespBean repayMentInfoByOrderList(String orderId) {
		PageRespBean pageRespBean=new PageRespBean();
		RepaymentPlanUserInfoExample example=new RepaymentPlanUserInfoExample();
		example.setOrderByClause("loan_tenor asc");
		Criteria criteria=example.createCriteria();
		criteria.andOrderIdEqualTo(orderId);
		List<RepaymentPlanUserInfo> dataList= repaymentPlanUserInfoMapper.selectByExample(example);
		pageRespBean.setDataList(dataList);
		return pageRespBean;
	}

	@Override
	public PageRespBean repayMentInfoByOrderUnList(String orderId) {
		PageRespBean pageRespBean=new PageRespBean();
		RepaymentPlanUserUnInfoExample example=new RepaymentPlanUserUnInfoExample();
		example.setOrderByClause("loan_tenor asc");
		com.ut.scf.pojo.auto.RepaymentPlanUserUnInfoExample.Criteria criteria=example.createCriteria();
		criteria.andOrderIdEqualTo(orderId);
		List<RepaymentPlanUserUnInfo> dataList= repaymentPlanUserUnInfoMapper.selectByExample(example);
		pageRespBean.setDataList(dataList);
		return pageRespBean;
	}
    

	

}
