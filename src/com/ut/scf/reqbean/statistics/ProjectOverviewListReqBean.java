package com.ut.scf.reqbean.statistics;

import com.ut.scf.reqbean.PageReqBean;

public class ProjectOverviewListReqBean extends PageReqBean{
	private String financeStartDate;
	
	private String payDate;

	public String getFinanceStartDate() {
		return financeStartDate;
	}

	public void setFinanceStartDate(String financeStartDate) {
		this.financeStartDate = financeStartDate;
	}

	public String getPayDate() {
		return payDate;
	}

	public void setPayDate(String payDate) {
		this.payDate = payDate;
	}
	
	
}
