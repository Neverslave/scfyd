package com.ut.scf.service.query.impl;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.dao.auto.FactorContractFileInfoMapper;
import com.ut.scf.dao.project.IFactorContractInfoDao;
import com.ut.scf.dao.project.IMainContractInfoDao;
import com.ut.scf.pojo.auto.ContractMain;
import com.ut.scf.pojo.auto.FactorContractFileInfo;
import com.ut.scf.pojo.auto.FactorContractFileInfoExample;
import com.ut.scf.pojo.auto.FactorContractFileInfoExample.Criteria;
import com.ut.scf.reqbean.query.ContractFileListReqBean;
import com.ut.scf.reqbean.query.ContractInfoListReqBean;
import com.ut.scf.reqbean.query.ContractInfoListReqBeanNew;
import com.ut.scf.reqbean.query.MainContractInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IContractQueryService;

@Service("contractQueryService")
public class ContractQueryServiceImpl implements IContractQueryService {

	@Resource
	private FactorContractFileInfoMapper fileMapper;
	
	@Resource
	private IFactorContractInfoDao factorContractInfoDao;
	
	@Resource
	private IMainContractInfoDao mainContractDao;

	@Override
	public BaseRespBean contractInfoList(ContractInfoListReqBean reqBean) {

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		System.out.println("================================");
        System.out.println(reqBean.getContractType());
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		List<Map<String, Object>> resultList = factorContractInfoDao
				.contractListInfo(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}

	@Override
	public BaseRespBean contractInfoFileList(ContractFileListReqBean reqBean) {

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);

		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(20);
		List<Map<String, Object>> resultList = factorContractInfoDao
				.contractFileList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}

	/*-----------------------------查询统计新需求------------------------------*/
	@Override
	public BaseRespBean getContractList(ContractInfoListReqBeanNew reqBean) {
		PageRespBean respBean = new PageRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		List<Map<String, Object>> resultList;
		if ("0".equals(reqBean.getIsPage())){
			resultList = factorContractInfoDao
					.getContractList(paramMap);
		}else{
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(reqBean.getPageNumber());
			page.setPageSize(reqBean.getPageSize());
			resultList = factorContractInfoDao
					.getContractList(paramMap, page);
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
		}
		respBean.setDataList(resultList);
		return respBean;
	}

	@Override
	public BaseRespBean getContractFile(ContractInfoListReqBeanNew reqBean) {
		
		FactorContractFileInfoExample example = new FactorContractFileInfoExample();
		Criteria criteria = example.createCriteria();
		criteria.andContractNoEqualTo(reqBean.getContractNo());
		List<FactorContractFileInfo> listInfo = fileMapper.selectByExample(example);
		ListRespBean respBean = new ListRespBean();
		respBean.setDataList(listInfo);
		return respBean;
	}

	//查询主合同表的数据
	@Override
	public BaseRespBean getMainContractList(MainContractInfoListReqBean reqBean) {
		PageRespBean respBean = new PageRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		List<Map<String, Object>> resultList;
		
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());	
		page.setPageSize(reqBean.getPageSize());
		if(paramMap.get("contractNum") == null ||paramMap.get("contractNum") == ""){
			resultList = mainContractDao.getMainContractList();
		}else {
			resultList = mainContractDao.getContractList(paramMap);
		}
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}

	@Override
	public BaseRespBean isContractNumExit(String contractNum) {
		BaseRespBean respBean = new BaseRespBean();
		ContractMain contractMain =new ContractMain();
		contractMain.setContractNum(contractNum);
		List<ContractMain> list=mainContractDao.selectByContractNum(contractMain);
		if (list.size() > 0) {
			respBean.setResult(1);
		}else{
			respBean.setResult(0);
		}
		return respBean;
	}

	@Override
	public BaseRespBean isRzhgzExit(String rzhgz) {
		BaseRespBean respBean = new BaseRespBean();
		ContractMain contractMain =new ContractMain();
		contractMain.setRzhgz(rzhgz);
		List<ContractMain> list=mainContractDao.selectByContractNum(contractMain);
		if (list.size() > 0) {
			respBean.setResult(1);
		}else{
			respBean.setResult(0);
		}
		return respBean;
	}

	@Override
	public BaseRespBean isFkhgzExit(String fkhgz) {
		BaseRespBean respBean = new BaseRespBean();
		ContractMain contractMain =new ContractMain();
		contractMain.setFkhgz(fkhgz);
		List<ContractMain> list=mainContractDao.selectByContractNum(contractMain);
		if (list.size() > 0) {
			respBean.setResult(1);
		}else{
			respBean.setResult(0);
		}
		return respBean;
	}
}