package com.ut.scf.reqbean.query;

import com.ut.scf.reqbean.PageReqBean;

public class GuaranteeThQueryReqBean extends PageReqBean {



	private String cashdateFrom;
	private String cashId;
	private String cashdateTo;
	private String  orderBy;
	private String orderByName;
	private String totalCount;
	private String totalEnsureAmt;
	private String checkCount;
	private String checkEnsureAmt;
	private String replaymentIdListInfo;
	private String note;
	public String getCashdateFrom() {
		return cashdateFrom;
	}

	public void setCashdateFrom(String cashdateFrom) {
		this.cashdateFrom = cashdateFrom;
	}

	public String getCashdateTo() {
		return cashdateTo;
	}

	public void setCashdateTo(String cashdateTo) {
		this.cashdateTo = cashdateTo;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public String getOrderByName() {
		return orderByName;
	}

	public void setOrderByName(String orderByName) {
		this.orderByName = orderByName;
	}

	public String getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(String totalCount) {
		this.totalCount = totalCount;
	}

	public String getTotalEnsureAmt() {
		return totalEnsureAmt;
	}

	public void setTotalEnsureAmt(String totalEnsureAmt) {
		this.totalEnsureAmt = totalEnsureAmt;
	}

	public String getCheckCount() {
		return checkCount;
	}

	public void setCheckCount(String checkCount) {
		this.checkCount = checkCount;
	}

	public String getCheckEnsureAmt() {
		return checkEnsureAmt;
	}

	public void setCheckEnsureAmt(String checkEnsureAmt) {
		this.checkEnsureAmt = checkEnsureAmt;
	}

	public String getReplaymentIdListInfo() {
		return replaymentIdListInfo;
	}

	public void setReplaymentIdListInfo(String replaymentIdListInfo) {
		this.replaymentIdListInfo = replaymentIdListInfo;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getCashId() {
		return cashId;
	}

	public void setCashId(String cashId) {
		this.cashId = cashId;
	}

	

}
