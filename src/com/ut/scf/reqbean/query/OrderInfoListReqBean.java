package com.ut.scf.reqbean.query;

import com.ut.scf.reqbean.PageReqBean;

public class OrderInfoListReqBean extends PageReqBean {
	private String orderBatchId;
	private String batchId;
	private String peopleType;
	private String contractNo;
	private String payDate;
	private String financeStartDate;
	private String financeEndDate;
	private String status; 
	private String orderBy;
	private String orderByName;
	public String getOrderBatchId() {
		return orderBatchId;
	}

	public void setOrderBatchId(String orderBatchId) {
		this.orderBatchId = orderBatchId;
	}

	public String getContractNo() {
		return contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}

	public String getPayDate() {
		return payDate;
	}

	public void setPayDate(String payDate) {
		this.payDate = payDate;
	}

	public String getFinanceStartDate() {
		return financeStartDate;
	}

	public void setFinanceStartDate(String financeStartDate) {
		this.financeStartDate = financeStartDate;
	}

	public String getFinanceEndDate() {
		return financeEndDate;
	}

	public void setFinanceEndDate(String financeEndDate) {
		this.financeEndDate = financeEndDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPeopleType() {
		return peopleType;
	}

	public void setPeopleType(String peopleType) {
		this.peopleType = peopleType;
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

	public String getBatchId() {
		return batchId;
	}

	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}

}
