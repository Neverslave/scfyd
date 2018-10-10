package com.ut.scf.service.statistics.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.dao.auto.WingPaymentDynamicInfoMapper;
import com.ut.scf.dao.auto.WingPaymentYuqiInfoMapper;
import com.ut.scf.dao.statistics.ISSMProjectSummaryDao;
import com.ut.scf.pojo.auto.WingPaymentYuqiInfo;
import com.ut.scf.reqbean.statistics.SSMProjectSummaryListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.statistics.ISSMProjectSummaryService;

@Service("ssmProjectSummaryService")
public class SSMProjectSummaryServiceImpl implements ISSMProjectSummaryService{

	@Resource
	private ISSMProjectSummaryDao ssmProjectSummaryDao;
	@Resource
	private WingPaymentDynamicInfoMapper wingPaymentDynamicInfoMapper;
	
	@Resource
	private WingPaymentYuqiInfoMapper wingPaymentYuqiInfoMapper;
	@Override
	public BaseRespBean SummaryInfoList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = ssmProjectSummaryDao.getSummaryInfoList(paramMap, page);
		PageRespBean RespBean = new PageRespBean();
		RespBean.setPages(page.getTotalPage());
		RespBean.setRecords(page.getTotalRecord());
		RespBean.setDataList(list);
		return RespBean;
	}

	@Override
	public BaseRespBean SummaryInfoList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = ssmProjectSummaryDao.getSummaryInfoList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	public BaseRespBean createWingRepaymentDynamicList(SSMProjectSummaryListReqBean reqBean) throws ParseException {
		BaseRespBean respBean=new BaseRespBean();
		try {
			String maxPeopleType=ssmProjectSummaryDao.getMaxCurentMonth("3");
			reqBean.setPstate("0");
			reqBean.setPpeopleType("3");
	
		if(StringUtils.isBlank(maxPeopleType)){
			maxPeopleType="20180430";
		}
			Date dateBegin = new SimpleDateFormat("yyyyMMdd").parse(maxPeopleType);//定义起始日期
			
			Calendar ca = Calendar.getInstance(); 
			ca.setTime(dateBegin);
			ca.add(Calendar.DATE, 1);
			
			dateBegin=ca.getTime();
			
			Calendar cal = Calendar.getInstance(); 
			
				do {
					cal.setTime(dateBegin);
					cal.add(Calendar.MONTH, 1);
					dateBegin=cal.getTime();
					cal.add(Calendar.DATE, -1);
					reqBean.setPorderDate(new SimpleDateFormat("yyyyMMdd").format(dateBegin));
					reqBean.setPrepayDateEnd(new SimpleDateFormat("yyyyMMdd").format(cal.getTime()));
					
					if (dateBegin.before(new Date())) {
						
						Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
						ssmProjectSummaryDao.createWingRepaymentDynamicList(paramMap);
					
					}
					
					
				} while (dateBegin.before(new Date()));
		} catch (Exception e) {
			respBean.setResult(-1);
		}
		return respBean;
	}

	@Override
	public BaseRespBean WingRepaymentDynamicList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = ssmProjectSummaryDao.getWingRepaymentDynamicList(paramMap, page);
		PageRespBean RespBean = new PageRespBean();
		RespBean.setPages(page.getTotalPage());
		RespBean.setRecords(page.getTotalRecord());
		RespBean.setDataList(list);
		return RespBean;
	}
	@Override
	public BaseRespBean createWingRepaymentStaticList(SSMProjectSummaryListReqBean reqBean) throws ParseException {
		BaseRespBean respBean=new BaseRespBean();
		try {
			String maxPeopleType="";
			reqBean.setPstate("0");
			reqBean.setPpeopleType("3");
	
		if(StringUtils.isBlank(maxPeopleType)){
			maxPeopleType="20180430";
		}
			Date dateBegin = new SimpleDateFormat("yyyyMMdd").parse(maxPeopleType);//定义起始日期
			Date dateEnd = new SimpleDateFormat("yyyyMMdd").parse(maxPeopleType);//定义起始日期
			Date dateRepayEnd = new SimpleDateFormat("yyyyMMdd").parse(maxPeopleType);//定义起始日期
			Calendar ca = Calendar.getInstance(); 
			ca.setTime(dateBegin);
			ca.add(Calendar.DATE, 1);
			
			dateBegin=ca.getTime();
			
			ca.add(Calendar.MONTH, 1);
			dateEnd=ca.getTime();
			ca.add(Calendar.MONTH, 1);
			ca.add(Calendar.DATE, -1);
			dateRepayEnd=ca.getTime();
			
			while (dateEnd.before(new Date())) {
				
				while (dateRepayEnd.before(new Date())) {
					
					reqBean.setPorderDate(new SimpleDateFormat("yyyyMMdd").format(dateBegin));
					reqBean.setPorderDateEnd(new SimpleDateFormat("yyyyMMdd").format(dateEnd));
					
					reqBean.setPrepayDateEnd(new SimpleDateFormat("yyyyMMdd").format(dateRepayEnd));
					Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
					ssmProjectSummaryDao.createWingRepaymentStaticList(paramMap);
					Calendar ca2 = Calendar.getInstance(); 
					ca2.setTime(dateRepayEnd);
					ca2.add(Calendar.DATE, 1);
					ca2.add(Calendar.MONTH, 1);
					ca2.add(Calendar.DATE, -1);
					dateRepayEnd=ca2.getTime();
					
				}
				Calendar ca3 = Calendar.getInstance(); 
				ca3.setTime(dateEnd);
				dateBegin=ca3.getTime();
				ca3.add(Calendar.MONTH, 1);
				dateEnd=ca3.getTime();
				ca3.add(Calendar.MONTH, 1);
				ca3.add(Calendar.DATE, -1);
				dateRepayEnd=ca3.getTime();
				
			}
			

		} catch (Exception e) {
			respBean.setResult(-1);
		}
		return respBean;
	}

	@Override
	public BaseRespBean WingRepaymentStaticList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = ssmProjectSummaryDao.getWingRepaymentStaticList(paramMap, page);
		PageRespBean RespBean = new PageRespBean();
		RespBean.setPages(page.getTotalPage());
		RespBean.setRecords(page.getTotalRecord());
		RespBean.setDataList(list);
		return RespBean;
	}

	@Override
	public BaseRespBean WingRepaymentMonthlyList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = ssmProjectSummaryDao.getWingRepaymentMonthlyList(paramMap);
		
		BaseRespBean respBean=new BaseRespBean();
		respBean.setResultMap((list==null||list.size()==0)?null:list.get(0));
		return respBean;
	}
	@Override
	public BaseRespBean CreateWingRepaymentMonthly() {
		
		
		SSMProjectSummaryListReqBean reqBean=new SSMProjectSummaryListReqBean();
		
		
		BaseRespBean respBean=new BaseRespBean();
		try {
			String maxPeopleType="";	
		if(StringUtils.isBlank(maxPeopleType)){
			maxPeopleType="20180430";
		}
			Date dateBegin = new SimpleDateFormat("yyyyMMdd").parse(maxPeopleType);//定义起始日期
			
			Calendar ca = Calendar.getInstance(); 
			ca.setTime(dateBegin);
			ca.add(Calendar.DATE, 1);
			
			dateBegin=ca.getTime();
			
			Calendar cal = Calendar.getInstance(); 
			
				do {
					cal.setTime(dateBegin);
					cal.add(Calendar.MONTH, 1);
					dateBegin=cal.getTime();
					cal.add(Calendar.MONTH, -1);
					reqBean.setPorderDate(new SimpleDateFormat("yyyyMMdd").format(cal.getTime()));
					reqBean.setPorderDateEnd(new SimpleDateFormat("yyyyMMdd").format(dateBegin));
					
					if (dateBegin.before(new Date())) {
						
						Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
						List<Map<String, Object>> list = ssmProjectSummaryDao.createWingRepaymentMonthlyList(paramMap);
					
					}
					
					
				} while (dateBegin.before(new Date()));
		} catch (Exception e) {
			respBean.setResult(-1);
		}
		return respBean;
	}

	@Override
	public BaseRespBean WingRepaymentYuqiList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = ssmProjectSummaryDao.getWingRepaymentMonthlyList(paramMap);
				
				BaseRespBean respBean=new BaseRespBean();
				respBean.setResultMap((list==null||list.size()==0)?null:list.get(0));
				return respBean;
	}

	@Override
	public BaseRespBean CreateWingRepaymentYuqi() {

		SSMProjectSummaryListReqBean reqBean=new SSMProjectSummaryListReqBean();
		
		Calendar ca = Calendar.getInstance(); 
		ca.setTime(new Date());
		int year=ca.get(Calendar.YEAR);
		int month=ca.get(Calendar.MONTH)+1;
		int day =ca.get(Calendar.DATE);
	     if(day<=10){
	    	 month=month-1;
	       }
		String monthStr="";
		if(String.valueOf(month).length()==1){
			monthStr="0"+month;
		}
		BaseRespBean respBean=new BaseRespBean();
  
		reqBean.setPorderDate("20180501");
		reqBean.setPorderDateEnd(String.valueOf(year)+ monthStr+"01");
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		List<Map<String, Object>> list = ssmProjectSummaryDao.createWingRepaymentYuqiList(paramMap);
		return respBean;
		
		
/*		WingPaymentYuqiInfoExample example=new WingPaymentYuqiInfoExample();
		Criteria criteria =example.createCriteria();
		criteria.andCurrentComputeTimeEqualTo(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
		if(wingPaymentYuqiInfoMapper.countByExample(example)>0){
			respBean.setResult(-1);
			respBean.setResultNote("当期已经计算");
			return respBean;
		}else{
			Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
			List<Map<String, Object>> list = ssmProjectSummaryDao.createWingRepaymentYuqiList(paramMap);
			return respBean;
		}*/
	
	}

	@Override
	public BaseRespBean wingPaymentYuqiInfo() {
	
		Date now=new Date();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		Map<String, Object> hashMap=new HashMap<String, Object>();
		hashMap.put("currentComputeTime", sdf.format(now));
		WingPaymentYuqiInfo info=new WingPaymentYuqiInfo();
		info.setCurrentComputeTime(sdf.format(now));
		List<WingPaymentYuqiInfo> wingPaymentYuqiInfoList=wingPaymentYuqiInfoMapper.wingPaymentYuqiInfo(info);
		
		PageRespBean RespBean = new PageRespBean();
		RespBean.setDataList(wingPaymentYuqiInfoList);
		return RespBean;
	}

	@Override
	public BaseRespBean justOperate() {
		PageRespBean respBean = new PageRespBean();
		try{
		Date now=new Date();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		WingPaymentYuqiInfo info=new WingPaymentYuqiInfo();
		info.setCurrentComputeTime(sdf.format(now));
		int res=wingPaymentYuqiInfoMapper.getCountByDate(info);
		
			if(res>0){
				respBean.setResult(1);
			}else{
				respBean.setResult(0);
			}
	
		} catch (Exception e) {
			respBean.setResult(-1);
		}
		return respBean;
	}
}
