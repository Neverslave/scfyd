package com.ut.scf.reqbean.office;

import java.util.Date;
import java.util.List;

import com.ut.scf.reqbean.BaseReqBean;

public class InternalInformAddReqBean extends BaseReqBean {
	/**
	 * 发布人id
	 */
	private String userId;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 公告内容
	 */
	private String informContent;
	/**
	 * 发布日期
	 */
	//@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private Date informDate;
	
	private List<?> userInfoList;
	
	private List<?> attachInfoList;
	
	private String recUid;
	
	private Date createTime;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getInformContent() {
		return informContent;
	}

	public void setInformContent(String informContent) {
		this.informContent = informContent;
	}

	public Date getInformDate() {
		return informDate;
	}

	public void setInformDate(Date informDate) {
		this.informDate = informDate;
	}

	public List<?> getUserInfoList() {
		return userInfoList;
	}

	public void setUserInfoList(List<?> userInfoList) {
		this.userInfoList = userInfoList;
	}

	public List<?> getAttachInfoList() {
		return attachInfoList;
	}

	public void setAttachInfoList(List<?> attachInfoList) {
		this.attachInfoList = attachInfoList;
	}

	public String getRecUid() {
		return recUid;
	}

	public void setRecUid(String recUid) {
		this.recUid = recUid;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	
}
