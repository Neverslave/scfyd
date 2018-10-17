package com.ut.scf.reqbean.supplier;

import java.util.Date;
import java.util.List;

import com.ut.scf.reqbean.PageReqBean;

public class SupplierProjectReqBean extends PageReqBean {
	private String id;
    private String corpId;
    private String corpName;
    private String agencyNum;
    private String projectName;
    private String projectDescribe;
    private String projectContract;
    private String projectInvoice;
    private String projectQua;
    private String projectAccept;
    private List<?> contractInfoList;
    private Date systemTime;
	private Byte status;
	private Date createTime;
	private String taskId;
	private String  agree;
	private String  userID;
	private String userId;
	private String roleId;
	private String activitiKey;
	private String orginName;
	private String advice ;
	private Integer isPage = 1;
	public String getOrginName() {
		return orginName;
	}
	public void setOrginName(String orginName) {
		this.orginName = orginName;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public Byte getStatus() {
		return status;
	}
	public void setStatus(Byte status) {
		this.status = status;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	
	public String getAgree() {
		return agree;
	}
	public void setAgree(String agree) {
		this.agree = agree;
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getActivitiKey() {
		return activitiKey;
	}
	public void setActivitiKey(String activitiKey) {
		this.activitiKey = activitiKey;
	}


	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getAdvice() {
		return advice;
	}
	public void setAdvice(String advice) {
		this.advice = advice;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getProjectDescribe() {
		return projectDescribe;
	}
	public void setProjectDescribe(String projectDescribe) {
		this.projectDescribe = projectDescribe;
	}
	public String getProjectContract() {
		return projectContract;
	}
	public void setProjectContract(String projectContract) {
		this.projectContract = projectContract;
	}
	public String getProjectInvoice() {
		return projectInvoice;
	}
	public void setProjectInvoice(String projectInvoice) {
		this.projectInvoice = projectInvoice;
	}
	public String getProjectQua() {
		return projectQua;
	}
	public void setProjectQua(String projectQua) {
		this.projectQua = projectQua;
	}
	public String getProjectAccept() {
		return projectAccept;
	}
	public void setProjectAccept(String projectAccept) {
		this.projectAccept = projectAccept;
	}
	public Date getSystemTime() {
		return systemTime;
	}
	public void setSystemTime(Date systemTime) {
		this.systemTime = systemTime;
	}
	public Integer getIsPage() {
		return isPage;
	}
	public void setIsPage(Integer isPage) {
		this.isPage = isPage;
	}
	public List<?> getContractInfoList() {
		return contractInfoList;
	}
	public void setContractInfoList(List<?> contractInfoList) {
		this.contractInfoList = contractInfoList;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getAgencyNum() {
		return agencyNum;
	}
	public void setAgencyNum(String agencyNum) {
		this.agencyNum = agencyNum;
	}
	

}
