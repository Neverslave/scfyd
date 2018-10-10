package com.ut.scf.reqbean.tradfact;

import java.util.Date;

public class SendBookBean {
	//合同编号
	private String contractId;
	//放款编号
	private String loanId;
	//项目名称
	private String projectName;
	//买方名称
	private String buyerName;
	//卖方名称
	private String sellerName;
	//货款人
	private String moneyPerson;
	//支付通知书编号
	private String noticeNo;
	//寄送日期
	private Date sendDate;
	//快递公司名称
	private String expressName;
	//运单号
	private String expressNo;
	
	
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	public String getLoanId() {
		return loanId;
	}
	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getBuyerName() {
		return buyerName;
	}
	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
	}
	public String getSellerName() {
		return sellerName;
	}
	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}
	public String getMoneyPerson() {
		return moneyPerson;
	}
	public void setMoneyPerson(String moneyPerson) {
		this.moneyPerson = moneyPerson;
	}
	public String getNoticeNo() {
		return noticeNo;
	}
	public void setNoticeNo(String noticeNo) {
		this.noticeNo = noticeNo;
	}
	public Date getSendDate() {
		return sendDate;
	}
	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}
	public String getExpressName() {
		return expressName;
	}
	public void setExpressName(String expressName) {
		this.expressName = expressName;
	}
	public String getExpressNo() {
		return expressNo;
	}
	public void setExpressNo(String expressNo) {
		this.expressNo = expressNo;
	}
	
	
}
