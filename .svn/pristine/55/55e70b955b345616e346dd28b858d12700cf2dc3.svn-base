package com.ut.scf.service.pub;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.pub.BusinessTypeReqBean;
import com.ut.scf.reqbean.pub.PrdUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IPrdManagerService {

	public BaseRespBean getProductList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	public BaseRespBean getBusinessList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	public BaseRespBean insertProduct(Map<String, Object> paramMap);

	public BaseRespBean insertBusiness(Map<String, Object> paramMap);
	
	public BaseRespBean deleteProduct(String productId);
	
	public BaseRespBean deleteBusiness(String typeId);

	public BaseRespBean updateProduct(PrdUpdateReqBean productUpdataBean);

	public BaseRespBean updateBusiness(BusinessTypeReqBean productUpdataBean);
	
	public String findTypeById(String productId);
}
