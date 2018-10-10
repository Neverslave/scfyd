package com.ut.scf.reqbean.statistics;

import com.ut.scf.reqbean.PageReqBean;

public class AgencyInfoListReqBean extends PageReqBean {
	
	private String corpId;
	private String corpName;
	private String agencyNum;
	
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getAgencyNum() {
		return agencyNum;
	}
	public void setAgencyNum(String agencyNum) {
		this.agencyNum = agencyNum;
	}
	
}
