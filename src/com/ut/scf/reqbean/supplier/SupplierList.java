package com.ut.scf.reqbean.supplier;

import com.ut.scf.reqbean.PageReqBean;

public class SupplierList extends PageReqBean {
	private String corpName;
	private String  corpId;
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

}
