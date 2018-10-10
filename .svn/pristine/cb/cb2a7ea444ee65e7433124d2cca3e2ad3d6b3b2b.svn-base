package com.ut.scf.service.query;

import com.ut.scf.reqbean.query.ContractFileListReqBean;
import com.ut.scf.reqbean.query.ContractInfoListReqBean;
import com.ut.scf.reqbean.query.ContractInfoListReqBeanNew;
import com.ut.scf.reqbean.query.MainContractInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IContractQueryService {
	

	BaseRespBean contractInfoList(ContractInfoListReqBean reqBean);
	
	BaseRespBean contractInfoFileList(ContractFileListReqBean reqBean);

	/*-----------------------------查询统计新需求------------------------------*/
	BaseRespBean getContractList(ContractInfoListReqBeanNew reqBean);
	
	BaseRespBean getMainContractList(MainContractInfoListReqBean reqBean);

	BaseRespBean getContractFile(ContractInfoListReqBeanNew reqBean);

	BaseRespBean isContractNumExit(String contractNum);

	BaseRespBean isRzhgzExit(String rzhgz);

	BaseRespBean isFkhgzExit(String fkhgz);
}
