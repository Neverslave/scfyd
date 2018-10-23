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
   // private List<?> contractInfoList;
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
	private String legalID1;
	private String legalID2;
	private String authID1;
	private String authID2;
	private String noObjectionfileUrl;
	private String noObjectionfileName;
	private String acceptfileUrl;
	private String acceptfileName;
	private String quafileUrl;
	private String quafileName;
	private String invoicefileUrl;
	private String invoicefileName;
	private String contractName;
	private String contractNum;
	private List<?> contractInfoList;
	private List<?> invoiceInfoList;
	private List<?> quaInfoList;
	private List<?> acceptInfoList;
	private List<?> noObjectionInfoList;

	public List<?> getContractInfoList() {
		return contractInfoList;
	}
	public void setContractInfoList(List<?> contractInfoList) {
		this.contractInfoList = contractInfoList;
	}
	public List<?> getInvoiceInfoList() {
		return invoiceInfoList;
	}
	public void setInvoiceInfoList(List<?> invoiceInfoList) {
		this.invoiceInfoList = invoiceInfoList;
	}
	public List<?> getQuaInfoList() {
		return quaInfoList;
	}
	public void setQuaInfoList(List<?> quaInfoList) {
		this.quaInfoList = quaInfoList;
	}
	public List<?> getAcceptInfoList() {
		return acceptInfoList;
	}
	public void setAcceptInfoList(List<?> acceptInfoList) {
		this.acceptInfoList = acceptInfoList;
	}
	public List<?> getNoObjectionInfoList() {
		return noObjectionInfoList;
	}
	public void setNoObjectionInfoList(List<?> noObjectionInfoList) {
		this.noObjectionInfoList = noObjectionInfoList;
	}
	public String getLegalID1() {
		return legalID1;
	}
	public void setLegalID1(String legalID1) {
		this.legalID1 = legalID1;
	}
	public String getLegalID2() {
		return legalID2;
	}
	public void setLegalID2(String legalID2) {
		this.legalID2 = legalID2;
	}
	public String getAuthID1() {
		return authID1;
	}
	public void setAuthID1(String authID1) {
		this.authID1 = authID1;
	}
	public String getAuthID2() {
		return authID2;
	}
	public void setAuthID2(String authID2) {
		this.authID2 = authID2;
	}
	public String getNoObjectionfileUrl() {
		return noObjectionfileUrl;
	}
	public void setNoObjectionfileUrl(String noObjectionfileUrl) {
		this.noObjectionfileUrl = noObjectionfileUrl;
	}
	public String getNoObjectionfileName() {
		return noObjectionfileName;
	}
	public void setNoObjectionfileName(String noObjectionfileName) {
		this.noObjectionfileName = noObjectionfileName;
	}
	public String getAcceptfileUrl() {
		return acceptfileUrl;
	}
	public void setAcceptfileUrl(String acceptfileUrl) {
		this.acceptfileUrl = acceptfileUrl;
	}
	public String getAcceptfileName() {
		return acceptfileName;
	}
	public void setAcceptfileName(String acceptfileName) {
		this.acceptfileName = acceptfileName;
	}
	public String getQuafileUrl() {
		return quafileUrl;
	}
	public void setQuafileUrl(String quafileUrl) {
		this.quafileUrl = quafileUrl;
	}
	public String getQuafileName() {
		return quafileName;
	}
	public void setQuafileName(String quafileName) {
		this.quafileName = quafileName;
	}
	public String getInvoicefileUrl() {
		return invoicefileUrl;
	}
	public void setInvoicefileUrl(String invoicefileUrl) {
		this.invoicefileUrl = invoicefileUrl;
	}
	public String getInvoicefileName() {
		return invoicefileName;
	}
	public void setInvoicefileName(String invoicefileName) {
		this.invoicefileName = invoicefileName;
	}
	public String getContractName() {
		return contractName;
	}
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	public String getContractNum() {
		return contractNum;
	}
	public void setContractNum(String contractNum) {
		this.contractNum = contractNum;
	}
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
