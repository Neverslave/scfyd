package com.ut.scf.reqbean.query;

import com.ut.scf.reqbean.PageReqBean;

public class InterestInfoListReqBean extends PageReqBean {
	private String agencyNum;// 经销商代码
	private String corpName;// 经销商名称
	private String repaymentDate;// 还款日期

	public String getAgencyNum() {
		return agencyNum;
	}

	public void setAgencyNum(String agencyNum) {
		this.agencyNum = agencyNum;
	}

	public String getCorpName() {
		return corpName;
	}

	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}

	public String getRepaymentDate() {
		return repaymentDate;
	}

	public void setRepaymentDate(String repaymentDate) {
		this.repaymentDate = repaymentDate;
	}

}
