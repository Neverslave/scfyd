package com.ut.scf.reqbean.office;


import com.ut.scf.reqbean.PageReqBean;

public class InternalInformListReqBean extends PageReqBean {

	/**
	 * 所属企业id
	 */
	private String recUid;
	/**
	 * 标题
	 */
	private String title;
	/*
	 * 用户
	 */
	private String informUserId;
	
	private String userId;
	
	private String informrecUid;
	
	public String getInformUserId() {
		return informUserId;
	}
	public void setInformUserId(String informUserId) {
		this.informUserId = informUserId;
	}
	
	public String getRecUid() {
		return recUid;
	}
	public void setRecUid(String recUid) {
		this.recUid = recUid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getInformrecUid() {
		return informrecUid;
	}
	public void setInformrecUid(String informrecUid) {
		this.informrecUid = informrecUid;
	}
	
}
