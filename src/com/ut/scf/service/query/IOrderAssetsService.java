package com.ut.scf.service.query;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.auto.FqcrFinanceRepayHisotory;
import com.ut.scf.respbean.BaseRespBean;

public interface IOrderAssetsService {

/*	public BaseRespBean getFqcrFinaceRepayHistoryList(Map<String, Object> paramMap,PageInfoBean page)  throws Exception ;*/

	public Map<String, Object> exportExcel(Map<String, Object> paramMap, String path,String signPath)  throws Exception ;

	public BaseRespBean getFqcrOrderComputeHistoryList(Map<String, Object> paramMap, PageInfoBean page);
	
	
/*	public BaseRespBean saveFinanceFun(FqcrFinanceRepayHisotory reqBean)  throws Exception ;
	public BaseRespBean confirmFinanceFun(FqcrFinanceRepayHisotory reqBean)  throws Exception ;
	public BaseRespBean deleteFinanceFun(FqcrFinanceRepayHisotory reqBean)  throws Exception ;

	BaseRespBean getLastFinanceDate(String peopleType);

	Map<String, Object> exportJtkdExcel(Map<String, Object> paramMap, String path) throws Exception;*/
	
}
