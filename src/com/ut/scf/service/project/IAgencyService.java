package com.ut.scf.service.project;

import java.util.List;

import org.activiti.engine.impl.util.json.JSONObject;

import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.reqbean.project.AgencyFlowReqBean;
import com.ut.scf.reqbean.project.AgencySearchPageReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IAgencyService {

	public BaseRespBean agencyList(AgencySearchPageReqBean searchPage);
	
	public BaseRespBean doAgree(AgencyFlowReqBean reqBean);
	
	public List<CorpInfo> addAgency(AgencyFlowReqBean reqBean);
	
	public BaseRespBean startProcess(JSONObject jsonObject);
	
	public BaseRespBean reApply(JSONObject jsonObject);

	public BaseRespBean isIdExit(String reqBean);
	public BaseRespBean isIdExit2(String reqBean);
}
