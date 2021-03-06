package com.ut.scf.reqbean.supplier;

import java.util.Date;
import java.util.List;

import com.ut.scf.reqbean.BaseReqBean;

public class SupplierManagerReqBean extends BaseReqBean {
	
	private String corpId;
	private String corpName;
	private String agencyNum;
	private String  fixedPhone;
	private String sysType;
	private String locationProvince;
	private String locationCity;
	private String locationArea;
	private String locationAddress;
	private String registerProvince;
	private String registerCity;
	private String registerArea;
	private String registerAddress;
	private String  email;
	private String uniformCreditCode;
	private String legalPerson;
	private String cellphone;
	private String idNumber; //身份证号码
	private String businessLicensePath ; //营业执照地址
	private String corpConsitutionDoc; //公司章程地址
	private Byte status;
	private Date createTime;
	private String taskId;
	private String  agree;
	private String  userId;
	private String  businessScope;
	private String corpConsitutionfileUrl;
	private List<?> attachInfoList;
	
	
	public  List<?> getAttachInfoList() {
		return attachInfoList;
	}
	public void setAttachInfoList( List<?> attachInfoList) {
		this.attachInfoList = attachInfoList;
	}
	public String getCorpConsitutionfileUrl() {
		return corpConsitutionfileUrl;
	}
	public void setCorpConsitutionfileUrl(String corpConsitutionfileUrl) {
		this.corpConsitutionfileUrl = corpConsitutionfileUrl;
	}
	public String getAgree() {
		return agree;
	}
	public void setAgree(String agree) {
		this.agree = agree;
	}
	
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Byte getStatus() {
		return status;
	}
	public void setStatus(Byte status) {
		this.status = status;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
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
	public String getFixedPhone() {
		return fixedPhone;
	}
	public void setFixedPhone(String fixedPhone) {
		this.fixedPhone = fixedPhone;
	}
	public String getSysType() {
		return sysType;
	}
	public void setSysType(String sysType) {
		this.sysType = sysType;
	}
	public String getLocationProvince() {
		return locationProvince;
	}
	public void setLocationProvince(String locationProvince) {
		this.locationProvince = locationProvince;
	}
	public String getLocationCity() {
		return locationCity;
	}
	public void setLocationCity(String locationCity) {
		this.locationCity = locationCity;
	}
	public String getLocationArea() {
		return locationArea;
	}
	public void setLocationArea(String locationArea) {
		this.locationArea = locationArea;
	}
	public String getLocationAddress() {
		return locationAddress;
	}
	public void setLocationAddress(String locationAddress) {
		this.locationAddress = locationAddress;
	}
	public String getRegisterProvince() {
		return registerProvince;
	}
	public void setRegisterProvince(String registerProvince) {
		this.registerProvince = registerProvince;
	}
	public String getRegisterCity() {
		return registerCity;
	}
	public void setRegisterCity(String registerCity) {
		this.registerCity = registerCity;
	}
	public String getRegisterArea() {
		return registerArea;
	}
	public void setRegisterArea(String registerArea) {
		this.registerArea = registerArea;
	}
	public String getRegisterAddress() {
		return registerAddress;
	}
	public void setRegisterAddress(String registerAddress) {
		this.registerAddress = registerAddress;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUniformCreditCode() {
		return uniformCreditCode;
	}
	public void setUniformCreditCode(String uniformCreditCode) {
		this.uniformCreditCode = uniformCreditCode;
	}
	public String getLegalPerson() {
		return legalPerson;
	}
	public void setLegalPerson(String legalPerson) {
		this.legalPerson = legalPerson;
	}
	public String getCellphone() {
		return cellphone;
	}
	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}

	public String getCorpConsitutionDoc() {
		return corpConsitutionDoc;
	}
	public void setCorpConsitutionDoc(String corpConsitutionDoc) {
		this.corpConsitutionDoc = corpConsitutionDoc;
	}

	public String getBusinessLicensePath() {
		return businessLicensePath;
	}
	public void setBusinessLicensePath(String businessLicensePath) {
		this.businessLicensePath = businessLicensePath;
	}
	public String getIdNumber() {
		return idNumber;
	}
	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getBusinessScope() {
		return businessScope;
	}
	public void setBusinessScope(String businessScope) {
		this.businessScope = businessScope;
	}

	
	
	
	
	

}
