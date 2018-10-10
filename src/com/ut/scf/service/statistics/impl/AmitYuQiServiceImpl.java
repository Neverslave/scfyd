package com.ut.scf.service.statistics.impl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.auto.DykYuqiFachebiliMapper;
import com.ut.scf.dao.statistics.IAmitYuQiDao;
import com.ut.scf.pojo.auto.DykYuqiFachebili;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.statistics.IAmitYuQiService;

@Service("amitYuQiService")
public class AmitYuQiServiceImpl implements IAmitYuQiService{

	@Resource
	private IAmitYuQiDao amitYuQiDao;
	
	@Resource
	private DykYuqiFachebiliMapper dykYuqiFachebiliMapper;
	
	
	@Override
	public BaseRespBean AmitYuQiList(Map<String, Object> paramMap,PageInfoBean page) {
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
/*		Map<String, Object> hashMap=new HashMap<String, Object> ();*/
		
		list=amitYuQiDao.getYuQiList(paramMap,page);
		
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	public BaseRespBean AmitYuQiHistoryList(Map<String, Object> paramMap,PageInfoBean page) {
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
/*		Map<String, Object> hashMap=new HashMap<String, Object> ();*/
		
		list=amitYuQiDao.getYuQiHistoryList(paramMap,page);
		
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	public BaseRespBean YuQiRepaySum(Map<String, Object> paramMap,PageInfoBean page) {
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
/*		Map<String, Object> hashMap=new HashMap<String, Object> ();*/
		
		list=amitYuQiDao.getYuQiRepaySum(paramMap,page);
		
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	public static BigDecimal getBigDecimal(Object value) {
        BigDecimal ret = null;
        if (value != null) {
            if (value instanceof BigDecimal) {
                ret = (BigDecimal) value;
            } else if (value instanceof String) {
                ret = new BigDecimal((String) value);
            } else if (value instanceof BigInteger) {
                ret = new BigDecimal((BigInteger) value);
            } else if (value instanceof Number) {
                ret = new BigDecimal(((Number) value).doubleValue());
            } else {
                throw new ClassCastException("Not possible to coerce [" + value + "] from class " + value.getClass() + " into a BigDecimal.");
            }
        }
        return ret;
    }

	@Override
	public BaseRespBean getLsYuQiList(Map<String, Object> paramMap) {
		
		//默认获取当年的数据
		if(StringUtils.isBlank((String) paramMap.get("startTime"))){
			Date date =new Date();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy");
			String firTime=sdf.format(date)+"-01";
			String secTime=sdf.format(date)+"-12";
			paramMap.put("startTime", firTime);
			paramMap.put("endTime", secTime);
		}
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		list=amitYuQiDao.getLsYuQiList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public BaseRespBean getLsYuQiXiangXiList(Map<String, Object> paramMap) {
		
		//默认获取当月的数据
		if(StringUtils.isBlank((String) paramMap.get("startTime"))){
			Date date =new Date();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM");
			String firTime=sdf.format(date);
			paramMap.put("startTime", firTime);
		}
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		list=amitYuQiDao.getLsYuQiXiangXiList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
		
	}

	@Override
	@Transactional
	public BaseRespBean fachebili(DykYuqiFachebili dykYuqiFachebili) {
		BaseRespBean respBean=new BaseRespBean();
		DykYuqiFachebili dykYuqiFachebili1=dykYuqiFachebiliMapper.getFachebili(dykYuqiFachebili);
		if(dykYuqiFachebili1==null){
			try {
				dykYuqiFachebiliMapper.insertSelective(dykYuqiFachebili);
			} catch (Exception e) {
				respBean.setResult(ErrorCodeEnum.ADD_FAILED);
				respBean.setResultNote("新增失败");
			}
		}else{
			try {
				dykYuqiFachebili.setId(dykYuqiFachebili1.getId());
				dykYuqiFachebiliMapper.updateByPrimaryKeySelective(dykYuqiFachebili);
			} catch (Exception e) {
				respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
				respBean.setResultNote("更新失败");
			}
		}
		return respBean;
	}

	@Override
	public BaseRespBean getQuYuHuanKuanLsList(Map<String, Object> paramMap) {
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		list=amitYuQiDao.getQuYuHuanKuanLsList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
		
	}
}
