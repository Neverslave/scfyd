package com.ut.scf.service.pub.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.pub.IContractInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.pub.IContractInfoService;

@Service("ContractInfoService")
public class ContractInfoServiceImpl implements IContractInfoService {

	private static final Logger log = LoggerFactory
			.getLogger(ContractInfoServiceImpl.class);
	
	@Resource IContractInfoDao contractInfoDao;
	//企业经销商附件
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addContract(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum =  contractInfoDao.insertContract(paramMap);
		log.debug("insert resultnum num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}
	@Override
	public BaseRespBean getContractList(Map<String, Object> paramMap, PageInfoBean page) {
		PageRespBean respBean = new PageRespBean();
		List<Map<String, Object>> list = contractInfoDao.selectContractList(paramMap,page);
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	public BaseRespBean deleteContract(String fileId) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum =  contractInfoDao.deleteContract(fileId);
		log.debug("delete resultnum num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
