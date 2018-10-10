package com.ut.scf.reqbean.query;

import com.ut.scf.reqbean.PageReqBean;

public class GuaranteeQueryReqBean extends PageReqBean {

	private String financeId;

	private String agencyName;

	private String agencyNum;

	private String orgnNum;

	private String corpId;

	private String guaranteePayDate;

	private String orderBy;
	private String orderByName;
	private String ywlxId;

	public String getYwlxId() {
		return ywlxId;
	}

	public void setYwlxId(String ywlxId) {
		this.ywlxId = ywlxId;
	}

	public String getFinanceId() {
		return financeId;
	}

	public void setFinanceId(String financeId) {
		this.financeId = financeId;
	}

	public String getAgencyName() {
		return agencyName;
	}

	public void setAgencyName(String agencyName) {
		this.agencyName = agencyName;
	}

	public String getAgencyNum() {
		return agencyNum;
	}

	public void setAgencyNum(String agencyNum) {
		this.agencyNum = agencyNum;
	}

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getGuaranteePayDate() {
		return guaranteePayDate;
	}

	public void setGuaranteePayDate(String guaranteePayDate) {
		this.guaranteePayDate = guaranteePayDate;
	}

	public String getOrgnNum() {
		return orgnNum;
	}

	public void setOrgnNum(String orgnNum) {
		this.orgnNum = orgnNum;
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

}
