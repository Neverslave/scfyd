package com.ut.scf.service.project;

import java.util.Date;
import java.util.Map;

import com.ut.scf.reqbean.project.CommonInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ICommonService {
	/**
	 * 判断日期是否为收息日
	 * @param date
	 * @return
	 */
	boolean isInterestDate(Date date,String productId);
	
	/**
	 * 预警情报登入
	 * @param paramMap
	 */
	void insertWarningInfo(Map<String, Object> paramMap);
	
	/**
	 * 承诺函模板取得
	 * @param reqBean
	 */
	BaseRespBean getTemplateList(CommonInfoReqBean reqBean);
	
	/**
	 * 承诺函模板地址取得
	 * @param reqBean
	 */
	BaseRespBean getTemplateUrl(CommonInfoReqBean reqBean);
}
