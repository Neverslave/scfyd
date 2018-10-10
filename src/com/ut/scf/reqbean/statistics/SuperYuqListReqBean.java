package com.ut.scf.reqbean.statistics;

import com.ut.scf.reqbean.PageReqBean;

public class SuperYuqListReqBean extends PageReqBean{

	private String orderId;
	private String peopleType;
	private String outerDay;
	private String orderRepayCount;
	private String sumYuQiMoney;
	private String outerDayBetween;
	private String orderBy;
	private String orderByName;
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getPeopleType() {
		return peopleType;
	}
	public void setPeopleType(String peopleType) {
		this.peopleType = peopleType;
	}
	public String getOuterDay() {
		return outerDay;
	}
	public void setOuterDay(String outerDay) {
		this.outerDay = outerDay;
	}
	public String getOrderRepayCount() {
		return orderRepayCount;
	}
	public void setOrderRepayCount(String orderRepayCount) {
		this.orderRepayCount = orderRepayCount;
	}
	public String getSumYuQiMoney() {
		return sumYuQiMoney;
	}
	public void setSumYuQiMoney(String sumYuQiMoney) {
		this.sumYuQiMoney = sumYuQiMoney;
	}
	public String getOuterDayBetween() {
		return outerDayBetween;
	}
	public void setOuterDayBetween(String outerDayBetween) {
		this.outerDayBetween = outerDayBetween;
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
