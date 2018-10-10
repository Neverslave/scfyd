package com.ut.scf.reqbean.query;

import java.math.BigDecimal;

import com.ut.scf.reqbean.PageReqBean;

public class GuaranteeHistoryQueryReqBean extends PageReqBean {

	private String financeId;
	private String batchId;
	private String payDate;

	private BigDecimal payGuarantee;

	private String payWay;

	private String note;

	private String guaranteeListInfo;
	

	public String getFinanceId() {
		return financeId;
	}

	public void setFinanceId(String financeId) {
		this.financeId = financeId;
	}

	public void setPayDate(String payDate) {
		this.payDate = payDate;
	}
	public String getPayDate() {
		return payDate;
	}

	public void setPayGuarantee(BigDecimal payGuarantee) {
		this.payGuarantee = payGuarantee;
	}
	public BigDecimal getPayGuarantee() {
		return payGuarantee;
	}

	public void setPayWay(String payWay) {
		this.payWay = payWay;
	}
	public String getPayWay() {
		return payWay;
	}

	public void setNote(String note) {
		this.note = note;
	}
	public String getNote() {
		return note;
	}

	public String getGuaranteeListInfo() {
		return guaranteeListInfo;
	}

	public void setGuaranteeListInfo(String guaranteeListInfo) {
		this.guaranteeListInfo = guaranteeListInfo;
	}

	public String getBatchId() {
		return batchId;
	}

	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}
	
}

