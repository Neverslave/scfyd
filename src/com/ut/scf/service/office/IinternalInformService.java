package com.ut.scf.service.office;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.office.InternalInformAddReqBean;
import com.ut.scf.reqbean.office.InternalInformUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IinternalInformService {
	public BaseRespBean getInternalInformList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addInternalInform(InternalInformAddReqBean internalInformAddReqBean);

	public BaseRespBean updateInternalInform(Map<String, Object> paramMap);

	public BaseRespBean deleteInternalInform(String recUid);
	
	public BaseRespBean getInternalInform(Map<String, Object> paramMap, PageInfoBean page);
	
	public BaseRespBean countInternalInform(Map<String, Object> paramMap);

	public BaseRespBean deleteMyInform(String recUid);



	BaseRespBean updateInternalformInfo(InternalInformUpdateReqBean reqBean);

	
}
