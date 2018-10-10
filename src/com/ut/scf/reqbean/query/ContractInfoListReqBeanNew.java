package com.ut.scf.reqbean.query;

import com.ut.scf.reqbean.PageReqBean;

public class ContractInfoListReqBeanNew extends PageReqBean {

	private String contractNo;
	
	private String agencyName;
	
	private String corpId;

	private String isPage;

	public String getContractNo() {
		return contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}

	public String getAgencyName() {
		return agencyName;
	}

	public void setAgencyName(String agencyName) {
		this.agencyName = agencyName;
	}

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getIsPage() {
		return isPage;
	}

	public void setIsPage(String isPage) {
		this.isPage = isPage;
	}
}
